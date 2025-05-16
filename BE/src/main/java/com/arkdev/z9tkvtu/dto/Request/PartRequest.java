package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.QuestionType;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Part}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PartRequest implements Serializable {
    @NotNull(message = "Part name must be not null")
    String partName;

    String description;

    @NotNull(message = "Quest type must be not null")
    QuestionType questionType;

    String instructions;

    @NotNull(message = "Question count must be not null")
    Integer questionCount;
}