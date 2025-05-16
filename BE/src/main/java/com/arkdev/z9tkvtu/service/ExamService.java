package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.ExamRequest;
import com.arkdev.z9tkvtu.dto.Response.*;
import com.arkdev.z9tkvtu.mapper.ExamMapper;
import com.arkdev.z9tkvtu.mapper.PartMapper;
import com.arkdev.z9tkvtu.mapper.QuestionMapper;
import com.arkdev.z9tkvtu.model.Exam;
import com.arkdev.z9tkvtu.model.Part;
import com.arkdev.z9tkvtu.model.Question;
import com.arkdev.z9tkvtu.model.Test;
import com.arkdev.z9tkvtu.repository.ExamRepository;
import com.arkdev.z9tkvtu.repository.TestRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExamService {
    TestRepository testRepository;
    ExamRepository examRepository;
    ExamMapper examMapper;
    PartMapper partMapper;
    QuestionMapper questionMapper;

    public List<ExamListResponse> getExams(Integer testId) {
        return examRepository.findByTestIdOrderByCreatedAt(testId)
                .stream()
                .map(exam -> {
                    Integer questions = 0;
                    for (Part part : exam.getParts()) {
                        questions += part.getQuestionCount();
                    }
                    Integer students = testRepository.countByUserTestAttempt(exam.getId());
                    return new ExamListResponse(
                            exam.getId(),
                            exam.getExamName(),
                            exam.getTotalScore(),
                            exam.getTest().getTestType(),
                            exam.getDuration(),
                            questions,
                            students
                    );
                })
                .toList();
    }

    public ExamContentResponse<?> getExam(Integer examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        ExamResponse examResponse = examMapper.toExamResponse(exam);
        List<Part> parts = exam.getParts().stream().toList();
        List<PartAttemptResponse<?, ?>> partAttemptRespons = new ArrayList<>();
        for (Part part : parts) {
            PartResponse partResponse = partMapper.toPartResponse(part);
            List<Question> questions = part.getQuestions().stream().toList();
            List<QuestionResponse> questionResponses = new ArrayList<>();
            for (Question question : questions) {
                QuestionResponse questionResponse = questionMapper.toQuestionResponse(question);
                questionResponses.add(questionResponse);
            }
            partAttemptRespons.add(new PartAttemptResponse<>(partResponse, questionResponses));
        }
        return new ExamContentResponse<>(
                examResponse,
                partAttemptRespons
        );
    }

    @Transactional
    public void addExam(Integer testId, ExamRequest request) {
        examRepository.findByExamName(request.getExamName())
            .ifPresent(exam -> {
                throw new RuntimeException("Exam name already exists");
            });
        if (!testRepository.existsById(testId))
            throw new RuntimeException("test not found");
        Test test = testRepository.getReferenceById(testId);
        Exam exam = examMapper.toExam(request);
        exam.setTest(test);
        examRepository.save(exam);
    }

    @Transactional
    public void updateExam(Integer examId, ExamRequest request) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        examMapper.updateExam(exam, request);
    }

    @Transactional
    public void deleteExam(Integer examId) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));
        examRepository.delete(exam);
    }
}
