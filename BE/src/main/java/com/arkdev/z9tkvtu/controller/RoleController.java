package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.RoleRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/roles")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleController {
    RoleService roleService;

    @GetMapping("")
    public ResponseData<?> getRoles() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get Roles Successfully", roleService.getRoles());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Roles Failed");
        }
    }

    @GetMapping("/{roleId}")
    public ResponseData<?> getRole(@PathVariable("roleId") Integer roleId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get Role Successfully", roleService.getRole(roleId));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("")
    public ResponseData<?> addRole(@RequestBody @Validated RoleRequest request) {
        try {
            roleService.addRole(request);
            return new ResponseData<>(HttpStatus.OK.value(), "Add Role Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Role could not be added");
        }
    }

    @PutMapping("/{roleId}")
    public ResponseData<?> updateRole(@PathVariable("roleId") Integer roleId,
                                      @RequestBody @Valid RoleRequest request) {
        try {
            roleService.updateRole(roleId, request);
            return new ResponseData<>(HttpStatus.OK.value(), "Update Role Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Role could not be updated");
        }
    }

    @DeleteMapping("/{roleId}")
    public ResponseData<?> deleteRole(@PathVariable("roleId") Integer roleId) {
        try {
            roleService.deleteRole(roleId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Role Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Role could not be deleted");
        }
    }
}
