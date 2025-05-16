package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.LessonRequest;
import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.LessonService;
import com.arkdev.z9tkvtu.util.Pagination;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/lessons")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LessonController {
    LessonService lessonService;

    @GetMapping("")
    public ResponseData<?> getLessons(@RequestParam Integer sectionId,
                                      @RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Lessons Successfully",
                    Pagination.paginate(lessonService.getLessons(sectionId), PageRequest.of(page, size)));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Lessons Failed");
        }
    }

    @GetMapping("/{lessonId}")
    public ResponseData<?> getLesson(@PathVariable Integer lessonId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Lesson Successfully",
                    lessonService.getLesson(lessonId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Lesson Failed");
        }
    }

    @PutMapping("/{lessonId}")
    public ResponseData<?> updateLesson(@PathVariable Integer lessonId,
                                        @RequestBody @Valid LessonRequest request) {
        try {
            lessonService.updateLesson(lessonId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Lesson Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Lesson could not be updated");
        }
    }

    @DeleteMapping("/{lessonId}")
    public ResponseData<?> deleteLesson(@PathVariable Integer lessonId) {
        try {
            lessonService.deleteLesson(lessonId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Lesson Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Lesson could not be deleted");
        }
    }

    @PostMapping("/{lessonId}/media")
    public ResponseData<?> addMediaToLesson(@PathVariable Integer lessonId,
                                            @RequestBody @Valid MediaRequest request) {
        try {
            lessonService.addMediaToLesson(lessonId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Media Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Media could not be added");
        }
    }
}
