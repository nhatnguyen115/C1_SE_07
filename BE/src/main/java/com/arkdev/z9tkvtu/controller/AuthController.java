package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.SignInRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.configuration.JwtProvider;
import com.arkdev.z9tkvtu.dto.Response.TokenResponse;
import com.arkdev.z9tkvtu.model.UserLoginData;
import com.arkdev.z9tkvtu.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
@Validated
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthController {
    JwtProvider jwtProvider;
    UserService userService;
    AuthenticationManager manager;

    @Autowired
    private SecurityContextRepository securityContextRepository;
    @PostMapping("/introspect")
    public ResponseData<?> introspect(@RequestBody @Valid SignInRequest request) {
        try {
            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),
                            request.getPassword()));
            if (auth.isAuthenticated()) {
                return new ResponseData<>(HttpStatus.OK.value(),
                        "Introspect Successful!",
                        jwtProvider.getToken(auth));
            } else {
                return new ResponseData<>(HttpStatus.UNAUTHORIZED.value(),
                        "Introspect Failed!");
            }
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), "Introspect Error!");
        }
    }

    @GetMapping("/external/callback")
    public ResponseData<?> externalCallback(@RequestHeader("Authorization") String authHeader, HttpServletRequest request, HttpServletResponse response) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Missing or invalid Authorization header!");
            }

            String token = authHeader.substring(7);
            String usernameOrEmail = jwtProvider.extractUsername(token);

            // Gọi hàm mới trong UserService
            UserLoginData userDetails = userService.loadUserByUsernameOrEmail(usernameOrEmail);

            if (!jwtProvider.validateToken(token, userDetails)) {
                return new ResponseData<>(HttpStatus.UNAUTHORIZED.value(), "Invalid or expired token!");
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            if (authentication.isAuthenticated()) {
                SecurityContext sc = SecurityContextHolder.getContextHolderStrategy().createEmptyContext();
                sc.setAuthentication(authentication);
                securityContextRepository.saveContext(sc, request, response);
            }
            TokenResponse tokenResponse = jwtProvider.getToken(authentication);

            return new ResponseData<>(HttpStatus.OK.value(), "Introspect Successful!", tokenResponse);

        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.BAD_REQUEST.value(), "Get External Info Error!");
        }
    }


}

