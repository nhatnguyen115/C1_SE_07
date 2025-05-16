package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.UserCreationRequest;
import com.arkdev.z9tkvtu.dto.Request.UserUpdateRequest;
import com.arkdev.z9tkvtu.dto.Response.UserResponse;
import com.arkdev.z9tkvtu.mapper.UserLoginDataMapper;
import com.arkdev.z9tkvtu.model.Role;
import com.arkdev.z9tkvtu.model.UserLoginData;
import com.arkdev.z9tkvtu.repository.RoleRepository;
import com.arkdev.z9tkvtu.repository.UserLoginDataRepository;
import com.arkdev.z9tkvtu.util.RoleType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserLoginDataRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserLoginDataMapper dataMapper;
    private final PasswordEncoder passwordEncoder;
    private Role userRole;

    @PostConstruct
    private void init() {
        userRole = roleRepository.findByRoleType(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }
    public UserDetailsService getUserDetailsService() {
        return username -> userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(dataMapper::toUserResponse)
                .toList();
    }

    public UserResponse getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        return userRepository.findById(user.getId())
                .map(dataMapper::toUserResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public void addUser(UserCreationRequest request) {
        UserLoginData user = dataMapper.toUserLoginData(request);
        user.setRole(userRole);
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(UserUpdateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserLoginData user = (UserLoginData) auth.getPrincipal();
        dataMapper.updateUserLoginData(user, request);
    }

    @Transactional
    public void updateUser(UUID userId, UserUpdateRequest request) {
        UserLoginData user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        dataMapper.updateUserLoginData(user, request);
    }

    @Transactional
    public void deleteUser(UUID userId) {
        UserLoginData userLoginData = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(userLoginData);
    }

    public UserLoginData loadUserByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsername(usernameOrEmail)
                .or(() -> userRepository.findByEmail(usernameOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail));
    }


}
