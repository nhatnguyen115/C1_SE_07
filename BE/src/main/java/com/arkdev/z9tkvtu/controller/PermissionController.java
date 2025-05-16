package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.PermissionRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.PermissionService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
    PermissionService permissionService;

    @GetMapping("")
    public ResponseData<?> getPermissions() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get Permissions Successfully", permissionService.getPermissions());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Permissions failed");
        }
    }

    @GetMapping("/{permissionId}")
    public ResponseData<?> getPermission(@PathVariable Integer permissionId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get Permission Successfully", permissionService.getPermission(permissionId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Permission failed");
        }
    }

    @PostMapping("")
    public ResponseData<?> addPermission(@RequestBody @Valid PermissionRequest request) {
        try {
            permissionService.addPermission(request);
            return new ResponseData<>(HttpStatus.OK.value(), "Permission Added Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Permission could not be added");
        }
    }

    @PutMapping("/{permissionId}")
    public ResponseData<?> updatePermission(@PathVariable Integer permissionId,
                                            @RequestBody @Valid PermissionRequest request) {
        try {
            permissionService.updatePermission(permissionId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Permission Updated Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Permission could not be updated");
        }
    }

    @DeleteMapping("/{permissionId}")
    public ResponseData<?> deletePermission(@PathVariable Integer permissionId) {
        try {
            permissionService.deletePermission(permissionId);
            return new ResponseData<>(HttpStatus.OK.value(), "Permission Deleted Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Permission could not be deleted");
        }
    }
}
