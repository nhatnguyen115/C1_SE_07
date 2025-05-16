package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.Gender;
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
public class UserUpdateRequest implements Serializable {
    @NotNull(message = "First name must be not null")
    @Size(message = "First name must be less than 20", max = 20)
    String firstName;

    @NotNull(message = "Last name must be not null")
    @Size(message = "Last name must be less than 20", max = 20)
    String lastName;

    @NotNull(message = "Gender must be not null")
    Gender gender;

    @NotNull(message = "Date of birth must be not null")
    Date dob;

    @NotNull(message = "Email must be not null")
    @Size(message = "Email must be less than 20", max = 20)
    String email;

    @NotNull(message = "Phone number must be not null")
    @Size(message = "Phone number must be less than 10", max = 10)
    String phoneNumber;
}