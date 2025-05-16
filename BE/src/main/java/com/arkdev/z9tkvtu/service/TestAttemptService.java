package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.UserAnswerRequest;
import com.arkdev.z9tkvtu.dto.Response.*;
import com.arkdev.z9tkvtu.mapper.ExamMapper;
import com.arkdev.z9tkvtu.mapper.PartMapper;
import com.arkdev.z9tkvtu.mapper.UserTestMapper;
import com.arkdev.z9tkvtu.model.*;
import com.arkdev.z9tkvtu.repository.*;
import com.arkdev.z9tkvtu.util.DifficultyLevel;
import com.arkdev.z9tkvtu.util.MediaType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.arkdev.z9tkvtu.util.Convert.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestAttemptService {
    UserTestAttemptRepository userTestAttemptRepository;
    UserAnswerRepository userAnswerRepository;
    ExamRepository examRepository;
    QuestionRepository questionRepository;
    UserTestMapper userTestMapper;
    PartMapper partMapper;
    ExamMapper examMapper;

    public List<UserTestHistoryResponse> getTestHistories() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        return userTestAttemptRepository.findByUser(user)
                .stream()
                .map(userTestMapper::toTestHistoryResponse)
                .toList();
    }

    public AttemptDetailsResponse<?> getAttemptDetails(Integer attemptId) {
        UserTestAttempt attempt = userTestAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("attempt not found"));
        List<Part> parts = attempt.getExam().getParts().stream().toList();
        ExamDetailsResponse detailsResponse = examMapper.toExamDetailsResponse(attempt);
        List<PartAttemptResponse<?, ?>> partAttemptRespons = new ArrayList<>();
        for (Part part : parts) {
            PartResponse partResponse = partMapper.toPartResponse(part);
            List<UserAnswerResponse> answerResponses = userAnswerRepository.findByUserAnswerWithPartId(part.getId(), attemptId)
                    .stream().map(r -> new UserAnswerResponse(
                            getInt(r[0]),
                            getString(r[1]),
                            getString(r[2]),
                            getEnum(MediaType.class, r[3]),
                            parseOptions(getString(r[4])),
                            getString(r[5]),
                            getString(r[6]),
                            getEnum(DifficultyLevel.class, r[7]),
                            getString(r[8])
                    )).toList();
            partAttemptRespons.add(new PartAttemptResponse<>(partResponse, answerResponses));
        }
        return new AttemptDetailsResponse<>(
                detailsResponse,
                partAttemptRespons
        );
    }

    public List<UserRankResponse> getUserRanks(Integer examId) {
        return userTestAttemptRepository.findByUserOfRank(examId).stream()
                .map(r -> new UserRankResponse(
                        getString(r[0]),
                        getInt(r[1]),
                        getInt(r[2])
                )).toList();
    }

    @Transactional
    public Integer startTest(Integer examId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();

        if (!examRepository.existsById(examId))
            throw new RuntimeException("exam not found");
        Exam exam = examRepository.getReferenceById(examId);

        UserTestAttempt testAttempt = new UserTestAttempt();
        testAttempt.setExam(exam);
        testAttempt.setUser(user);
        testAttempt.setStartTime(Timestamp.valueOf(LocalDateTime.now()));
        testAttempt.setComplete(false);

        testAttempt = userTestAttemptRepository.save(testAttempt);
        return testAttempt.getId();
    }

    @Transactional
    public void submitTest(Integer attemptId,
                           List<UserAnswerRequest> answers) {
        UserTestAttempt attempt = userTestAttemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        attempt.setEndTime(Timestamp.valueOf(LocalDateTime.now()));
        attempt.setComplete(true);

        List<Integer> questionIds = answers.stream()
                .map(UserAnswerRequest::getQuestionId)
                .toList();

        Map<Integer, Question> questions = questionRepository.findAllById(questionIds)
                .stream()
                .collect(Collectors.toMap(Question::getId, Function.identity()));
        AtomicInteger result = new AtomicInteger();
        List<UserAnswer> userAnswers = answers.stream()
                .map(answerRequest -> {
                    Question question = Optional.ofNullable(questions.get(answerRequest.getQuestionId()))
                            .orElseThrow(() -> new RuntimeException("Question not found"));
                    if (question.getCorrectAnswer().equals(answerRequest.getSelectedAnswer())) {
                        result.set(result.get() + 5);
                    }
                    return new UserAnswer(
                            attempt,
                            question,
                            answerRequest.getSelectedAnswer()
                    );
                }).toList();
        attempt.setTotalScore(result.get());
        userAnswerRepository.saveAll(userAnswers);
    }

    @Transactional
    public void deleteTest(Integer attemptId) {
        UserTestAttempt attempt = userTestAttemptRepository.findById(attemptId)
                        .orElseThrow(() -> new RuntimeException("Attempt not found"));
        userTestAttemptRepository.delete(attempt);
    }
}
