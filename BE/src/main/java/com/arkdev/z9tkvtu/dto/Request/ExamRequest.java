package com.arkdev.z9tkvtu.dto.Request;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Exam}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExamRequest implements Serializable {
    @NotNull(message = "Exam name must be not null")
    String examName;
    
    @NotNull(message = "Total score must be not null")
    Integer totalScore;
    
    Integer duration;
}