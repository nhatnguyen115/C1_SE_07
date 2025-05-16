package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.mapper.MediaMapper;
import com.arkdev.z9tkvtu.mapper.QuestionMapper;
import com.arkdev.z9tkvtu.model.*;
import com.arkdev.z9tkvtu.repository.ExamRepository;
import com.arkdev.z9tkvtu.repository.PartRepository;
import com.arkdev.z9tkvtu.repository.QuestionRepository;
import com.arkdev.z9tkvtu.repository.TestRepository;
import com.arkdev.z9tkvtu.util.DifficultyLevel;
import com.arkdev.z9tkvtu.util.MediaType;
import com.arkdev.z9tkvtu.util.QuestionType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.poi.ss.formula.functions.T;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,  makeFinal = true)
public class UploadExamService {
    PartRepository partRepository;
    TestRepository testRepository;

    @Transactional
    public void addExamFromExcel(Integer testId, MultipartFile file) {
        try (Workbook workbook= new XSSFWorkbook(file.getInputStream())) {
            Test test = testRepository.findById(testId)
                    .orElseThrow(() -> new RuntimeException("test not found"));
            setExamData(workbook, test);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void setExamData(Workbook workbook, Test test) throws JsonProcessingException {
        Row row = workbook.getSheet("EXAM").getRow(1);
        Exam exam = new Exam();
        exam.setExamName(row.getCell(0).getStringCellValue());
        exam.setTotalScore((int) row.getCell(1).getNumericCellValue());
        exam.setDuration((int) row.getCell(2).getNumericCellValue());
        test.getExams().add(exam);
        exam.setTest(test);
        setPartsData(workbook, exam);
    }

    private void setPartsData(Workbook workbook, Exam exam) throws JsonProcessingException {
        Sheet sheet = workbook.getSheet("PART");
        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue;
            Part part = new Part();
            part.setOrderNumber((int) row.getCell(0).getNumericCellValue());
            part.setPartName(row.getCell(1).getStringCellValue());
            part.setDescription(row.getCell(2).getStringCellValue());
            part.setQuestionType(QuestionType.valueOf(row.getCell(3).getStringCellValue()));
            part.setInstructions(row.getCell(4).getStringCellValue());
            part.setQuestionCount((int) row.getCell(5).getNumericCellValue());
            part.setMedia(setMediaData(row));
            part = partRepository.save(part);
            exam.getParts().add(part);
            setQuestionsData(workbook, part);
        }
    }

    private void setQuestionsData(Workbook workbook, Part part) throws JsonProcessingException {
        Sheet sheet = workbook.getSheet(part.getPartName());
        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue;
            Question question = new Question();
            question.setOrderNumber((int) row.getCell(0).getNumericCellValue());
            question.setContent(row.getCell(1).getStringCellValue());
            question.setOptions(new ObjectMapper().readValue(row.getCell(2).getStringCellValue(),
                    new TypeReference<>() {}));
            question.setCorrectAnswer(row.getCell(3).getStringCellValue());
            question.setExplanation(row.getCell(4).getStringCellValue());
            question.setDifficulty(DifficultyLevel.valueOf(row.getCell(5).getStringCellValue()));
            question.setMedia(setMediaData(row));
            part.getQuestions().add(question);
            question.setPart(part);
        }
    }
    private Media setMediaData(Row row) {
        if (row.getCell(6) != null &&
                !row.getCell(6).getStringCellValue().isEmpty() &&
                !row.getCell(6).getStringCellValue().isBlank()) {
            Media media = new Media();
            media.setMediaType(MediaType.valueOf(row.getCell(6).getStringCellValue()));
            media.setUrl(row.getCell(7).getStringCellValue());
            return media;
        }
        return null;
    }
}
