package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.dto.Request.QuestionRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.QuestionService;
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
@RequestMapping("/questions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionController {
    QuestionService questionService;

    @GetMapping("")
    public ResponseData<?> getQuestions(@RequestParam Integer partId,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "10") int size) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Questions Successfully",
                    Pagination.paginatePart(questionService.getQuestions(partId), PageRequest.of(page, size)));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Questions Failed");
        }
    }

    @GetMapping("/{questionId}")
    public ResponseData<?> getQuestion(@PathVariable Integer questionId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Question Successfully",
                    questionService.getQuestion(questionId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Question Failed");
        }
    }

    @PutMapping("/{questionId}")
    public ResponseData<?> updateQuestion(@PathVariable Integer questionId,
                                          @RequestBody QuestionRequest request) {
        try {
            questionService.updateQuestion(questionId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Question Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Question could not be updated");
        }
    }

    @DeleteMapping("/{questionId}")
    public ResponseData<?> deleteQuestion(@PathVariable Integer questionId) {
        try {
            questionService.deleteQuestion(questionId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Question Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Question could not be deleted");
        }
    }

    @PostMapping("/{questionId}/media")
    public ResponseData<?> addMediaToQuestion(@PathVariable Integer questionId,
                                              @RequestBody MediaRequest request) {
        try {
            questionService.addMediaToQuestion(questionId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Media To Question Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Media could not be added");
        }
    }
}
