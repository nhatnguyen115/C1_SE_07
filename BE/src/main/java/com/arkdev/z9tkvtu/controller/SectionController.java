package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.LessonRequest;
import com.arkdev.z9tkvtu.dto.Request.PartRequest;
import com.arkdev.z9tkvtu.dto.Request.SectionRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.LessonService;
import com.arkdev.z9tkvtu.service.PartService;
import com.arkdev.z9tkvtu.service.SectionService;
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
@RequestMapping("/sections")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SectionController {
    SectionService sectionService;
    LessonService lessonService;
    PartService partService;

    @GetMapping("")
    public ResponseData<?> getSections(@RequestParam(required = false) Integer moduleId,
                                       @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size) {
        try {
            if (moduleId != null) {
                return new ResponseData<>(HttpStatus.OK.value(), "Get Sections Successfully",
                        Pagination.paginate(sectionService.getSections(moduleId), PageRequest.of(page, size)));
            } else {
                return new ResponseData<>(HttpStatus.OK.value(), "Get All Sections Successfully",
                        Pagination.paginate(sectionService.getSections(), PageRequest.of(page, size)));
            }
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Sections Failed");
        }
    }

    @GetMapping("/{sectionId}")
    public ResponseData<?> getSection(@PathVariable Integer sectionId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Section Successfully",
                    sectionService.getSection(sectionId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Section Failed");
        }
    }

    @PostMapping("/{sectionId}/lessons")
    public ResponseData<?> addLesson(@PathVariable Integer sectionId,
                                     @RequestBody @Valid LessonRequest request) {
        try {
            lessonService.addLesson(sectionId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Lesson Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Lesson could not be added");
        }
    }

    @PostMapping("/{sectionId}/parts")
    public ResponseData<?> addPart(@PathVariable Integer sectionId ,
                                   @Valid @RequestBody PartRequest request) {
        try {
            partService.addPartToSection(sectionId, request);
            return new ResponseData<>(HttpStatus.CREATED.value(), "Add Part To Section Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Part could not be added");
        }
    }

    @PutMapping("/{sectionId}")
    public ResponseData<?> updateSection(@PathVariable Integer sectionId,
                                         @Valid @RequestBody SectionRequest sectionRequest) {
        try {
            sectionService.updateSection(sectionId, sectionRequest);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Section Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Section could not be updated");
        }
    }

    @DeleteMapping("/{sectionId}")
    public ResponseData<?> deleteSection(@PathVariable Integer sectionId) {
        try {
            sectionService.deleteSection(sectionId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Section Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Section could not be deleted");
        }
    }
}
