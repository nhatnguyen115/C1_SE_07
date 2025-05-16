package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.UserCreationRequest;
import com.arkdev.z9tkvtu.dto.Request.UserUpdateRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.model.UserLoginData;
import com.arkdev.z9tkvtu.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping("/list")
    public ResponseData<?> getUsers() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get All Users Successfully", userService.getUsers());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get All Users Failed");
        }
    }

    @GetMapping("")
    public ResponseData<?> getUserById() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(),
                    "Get User Successfully", userService.getUser());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get User Failed");
        }
    }

    @PostMapping("")
    public ResponseData<?> addUser(@RequestBody @Valid UserCreationRequest request) {
        try {
            userService.addUser(request);
            return new ResponseData<>(HttpStatus.CREATED.value(), "User added successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), "User could not be added");
        }
    }

    @PutMapping("")
    public ResponseData<?> updateUser(@RequestBody @Valid UserUpdateRequest request) {
        try {
            userService.updateUser(request);
            return new ResponseData<>(HttpStatus.OK.value(), "User updated successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), "User could not be updated");
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseData<?> deleteUser(@PathVariable("userId") UUID userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseData<>(HttpStatus.OK.value(), "User deleted successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), "User could not be deleted");
        }
    }
}
