package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.dto.Request.PartRequest;
import com.arkdev.z9tkvtu.dto.Request.QuestionRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.PartService;
import com.arkdev.z9tkvtu.service.QuestionService;
import com.arkdev.z9tkvtu.util.MediaType;
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
@RequestMapping("/parts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PartController {
    PartService partService;
    QuestionService questionService;

    @GetMapping("")
    public ResponseData<?> getParts(@RequestParam Integer selectedId,
                                    @RequestParam boolean checked,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "100") int size) {
        try {
            if (checked) {
                return new ResponseData<>(HttpStatus.OK.value(), "Get Parts To Section Successfully",
                        Pagination.paginate(partService.getPartsToSection(selectedId), PageRequest.of(page, size)));
            } else {
                return new ResponseData<>(HttpStatus.OK.value(), "Get Parts To Exam Successfully",
                        Pagination.paginate(partService.getPartsToExam(selectedId), PageRequest.of(page, size)));
            }
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Parts Failed");
        }
    }

    @GetMapping("/{partId}")
    public ResponseData<?> getPart(@PathVariable Integer partId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Part Successfully",
                    partService.getPart(partId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Part Failed");
        }
    }

    @PostMapping("/{partId}/question")
    public ResponseData<?> addQuestion(@PathVariable Integer partId,
                                       @Valid @RequestBody QuestionRequest request) {
        try {
            questionService.addQuestion(partId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Question Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Question could not be added");
        }
    }

    @PutMapping("/{partId}")
    public ResponseData<?> updatePart(@PathVariable Integer partId, @RequestBody PartRequest request) {
        try {
            partService.updatePart(partId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Part Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Part could not be updated");
        }
    }

    @DeleteMapping("/{partId}")
    public ResponseData<?> deletePart(@PathVariable Integer partId) {
        try {
            partService.deletePart(partId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Part Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Part could not be deleted");
        }
    }

    @PostMapping(value = "/{partId}/media")
    public ResponseData<?> addMediaToPart(@PathVariable Integer partId,
                                          @RequestPart("mediaType") String mediaType,
                                          @RequestPart("file") MultipartFile file) {
        try {
            MediaRequest request = new MediaRequest(MediaType.valueOf(mediaType), file);
            partService.addMediaToPart(partId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Media To Part Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Media could not be added");
        }
    }

    @PostMapping("/{partId}/excel-question")
    public ResponseData<?> addQuestionsFromExcel(@PathVariable Integer partId,
                                                 @RequestParam MultipartFile file) {
        try {
            questionService.addQuestionsFromExcel(partId, file);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Questions From Excel Successfully");
        } catch (IOException e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Excel could not be added");
        }
    }
}
