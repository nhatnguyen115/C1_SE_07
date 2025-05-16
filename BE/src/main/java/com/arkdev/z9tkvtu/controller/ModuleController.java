package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.ModuleRequest;
import com.arkdev.z9tkvtu.dto.Request.SectionRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.ModuleService;
import com.arkdev.z9tkvtu.service.SectionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/modules")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ModuleController {
    ModuleService moduleService;
    SectionService sectionService;

    @GetMapping("")
    public ResponseData<?> getModules() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Modules Successfully",
                    moduleService.getModules());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Modules Failed");
        }
    }

    @GetMapping("/{moduleId}")
    public ResponseData<?> getModule(@PathVariable("moduleId") Integer moduleId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Module Successfully",
                    moduleService.getModule(moduleId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Module Failed");
        }
    }

    @PostMapping("")
    public ResponseData<?> addModule(@RequestBody @Valid ModuleRequest request) {
        try {
            moduleService.addModule(request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Module Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Module could not be added");
        }
    }

    @PutMapping("/{moduleId}")
    public ResponseData<?> updateModule(@PathVariable Integer moduleId,
                                        @RequestBody @Valid ModuleRequest request) {
        try {
            moduleService.updateModule(moduleId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Module Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Module could not be updated");
        }
    }

    @DeleteMapping("/{moduleId}")
    public ResponseData<?> deleteModule(@PathVariable Integer moduleId) {
        try {
            moduleService.deleteModule(moduleId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Module Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Module could not be deleted");
        }
    }

    @PostMapping("/{moduleId}/sections")
    public ResponseData<?> addSection(@Valid @RequestBody SectionRequest sectionRequest,
                                      @PathVariable Integer moduleId) {
        try {
            sectionService.addSection(moduleId, sectionRequest);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Section Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Section could not be added");
        }
    }
}
