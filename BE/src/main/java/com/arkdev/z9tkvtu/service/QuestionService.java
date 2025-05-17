package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.dto.Request.QuestionRequest;
import com.arkdev.z9tkvtu.dto.Response.QuestionDetailsResponse;
import com.arkdev.z9tkvtu.dto.Response.QuestionResponse;
import com.arkdev.z9tkvtu.mapper.MediaMapper;
import com.arkdev.z9tkvtu.mapper.QuestionMapper;
import com.arkdev.z9tkvtu.model.Media;
import com.arkdev.z9tkvtu.model.Part;
import com.arkdev.z9tkvtu.model.Question;
import com.arkdev.z9tkvtu.repository.ExamRepository;
import com.arkdev.z9tkvtu.repository.PartRepository;
import com.arkdev.z9tkvtu.repository.QuestionRepository;
import com.arkdev.z9tkvtu.util.DifficultyLevel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionService {
    QuestionRepository questionRepository;
    PartRepository partRepository;
    MediaMapper mediaMapper;
    QuestionMapper questionMapper;
    UploadMediaService uploadMediaService;

    public QuestionDetailsResponse<?> getQuestions(Integer partId) {
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new IllegalArgumentException("Part Not Found"));
        List<QuestionResponse> list = questionRepository.findByPartIdOrderByOrderNumber(partId)
                .stream()
                .map(questionMapper::toQuestionResponse)
                .toList();
        return new QuestionDetailsResponse<>(
                part.getQuestionType(), part.getInstructions(), list
        );
    }

    public QuestionResponse getQuestion(Integer questionId) {
        return questionRepository.findById(questionId)
                .map(questionMapper::toQuestionResponse)
                .orElseThrow(() -> new RuntimeException("question not found"));
    }

    @Transactional
    public void addQuestion(Integer partId, QuestionRequest request) {
        if (!partRepository.existsById(partId))
            throw new RuntimeException("part not found");
        Part part = partRepository.getReferenceById(partId);
        Integer max = questionRepository.findMaxOrderNumberByPartId(partId);
        Question question = questionMapper.toQuestion(request);
        question.setOrderNumber(max != null ? max + 1 : 1);
        question.setPart(part);
        questionRepository.save(question);
    }

    @Transactional
    public void updateQuestion(Integer questionId, QuestionRequest request) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("question not found"));
        questionMapper.updateQuestion(question, request);
    }

    @Transactional
    public void deleteQuestion(Integer questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("question not found"));
        questionRepository.delete(question);
    }

    @Transactional
    public void addMediaToQuestion(Integer questionId, MediaRequest request) throws IOException {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        Media media = uploadMediaService.updateMedia(question.getMedia(),
                request.getFile(), request.getMediaType());
        question.setMedia(media);
        questionRepository.save(question);
    }

    public void addQuestionsFromExcel(Integer partId, MultipartFile file) throws IOException {
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new RuntimeException("part not found"));
        try (Workbook workbook= new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {

                Question question = new Question();
                question.setContent(row.getCell(0).getStringCellValue());
                question.setOptions(new ObjectMapper().readValue(row.getCell(1).getStringCellValue(),
                        new TypeReference<>() {}));
                question.setCorrectAnswer(row.getCell(2).getStringCellValue());
                question.setExplanation(row.getCell(3).getStringCellValue());
                question.setDifficulty(DifficultyLevel.valueOf(row.getCell(4).getStringCellValue()));
                part.getQuestions().add(question);
            }
            partRepository.save(part);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
