package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.UserLoginData}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest implements Serializable {
    String firstName;

    String lastName;

    Gender gender;

    Date dob;

    String email;

    String phoneNumber;

    @NotNull(message = "Username must be not null")
    @Size(message = "Username must be greater than 50 char", max = 50)
    @NotBlank(message = "Username must be not blank")
    String username;

    @NotNull(message = "Password must be not null")
    @NotBlank(message = "Password must be not blank")
    String password;
}