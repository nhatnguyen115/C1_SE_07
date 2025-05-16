package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.ExamRequest;
import com.arkdev.z9tkvtu.dto.Request.PartRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.model.Exam;
import com.arkdev.z9tkvtu.service.ExamService;
import com.arkdev.z9tkvtu.service.PartService;
import com.arkdev.z9tkvtu.service.UploadExamService;
import com.arkdev.z9tkvtu.service.UserMembershipService;
import com.arkdev.z9tkvtu.util.Pagination;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Validated
@RequestMapping("/exams")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExamController {
    ExamService examService;
    PartService partService;

    @GetMapping("")
    public ResponseData<?> getExams(@RequestParam(required = false) Integer testId,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Exams Successfully",
                    Pagination.paginate(examService.getExams(testId), PageRequest.of(page, size)));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Exams Failed");
        }
    }

    @GetMapping("/{examId}")
    public ResponseData<?> getExam(@PathVariable Integer examId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Exam Successfully",
                    examService.getExam(examId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Exam Failed");
        }
    }

    @PostMapping("/{examId}/parts")
    public ResponseData<?> addPart(@PathVariable Integer examId,
                                   @Valid @RequestBody PartRequest request) {
        try {
            partService.addPartToExam(examId, request);
            return new ResponseData<>(HttpStatus.CREATED.value(), "Add Part To Exam Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Part could not be added");
        }
    }

    @PutMapping("/{examId}")
    public ResponseData<?> updateExam(@PathVariable Integer examId,
                                      @Valid @RequestBody ExamRequest request) {
        try {
            examService.updateExam(examId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Exam Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Exam could not be updated");
        }
    }

    @DeleteMapping("/{examId}")
    public ResponseData<?> deleteExam(@PathVariable Integer examId) {
        try {
            examService.deleteExam(examId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Exam Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Exam could not be deleted");
        }
    }
}
