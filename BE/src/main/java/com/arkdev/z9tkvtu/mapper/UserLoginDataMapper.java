package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.UserCreationRequest;
import com.arkdev.z9tkvtu.dto.Request.UserUpdateRequest;
import com.arkdev.z9tkvtu.dto.Response.UserResponse;
import com.arkdev.z9tkvtu.model.UserLoginData;
import org.springframework.stereotype.Component;

@Component
public class UserLoginDataMapper {
    public UserLoginData toUserLoginData(UserCreationRequest request) {
        UserLoginData userLoginData = new UserLoginData();
        userLoginData.setFirstName(request.getFirstName());
        userLoginData.setLastName(request.getLastName());
        userLoginData.setGender(request.getGender());
        userLoginData.setDob(request.getDob());
        userLoginData.setEmail(request.getEmail());
        userLoginData.setPhoneNumber(request.getPhoneNumber());
        userLoginData.setUsername(request.getUsername());
        return userLoginData;
    }

    public void updateUserLoginData(UserLoginData userLoginData, UserUpdateRequest request) {
        if (userLoginData == null) return;
        userLoginData.setFirstName(request.getFirstName());
        userLoginData.setLastName(request.getLastName());
        userLoginData.setGender(request.getGender());
        userLoginData.setDob(request.getDob());
        userLoginData.setEmail(request.getEmail());
        userLoginData.setPhoneNumber(request.getPhoneNumber());
    }

    public UserResponse toUserResponse(UserLoginData userLoginData) {
        if (userLoginData == null) return null;
        return new UserResponse(
                userLoginData.getId(),
                userLoginData.getFirstName(),
                userLoginData.getLastName(),
                userLoginData.getGender(),
                userLoginData.getDob(),
                userLoginData.getEmail(),
                userLoginData.getPhoneNumber()
        );
    }
}
