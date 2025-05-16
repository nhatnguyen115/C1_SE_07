package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.DifficultyLevel;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Map;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Question}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class QuestionRequest implements Serializable {
    @NotNull(message = "Content must be not null")
    String content;

    @NotNull(message = "Options must be not null")
    Map<String, Object> options;

    @NotNull(message = "Correct answer must be not null")
    String correctAnswer;

    String explanation;

    DifficultyLevel difficulty;
}