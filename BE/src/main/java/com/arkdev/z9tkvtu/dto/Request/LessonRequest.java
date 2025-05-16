package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.Content;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Lesson}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LessonRequest implements Serializable {
    @NotNull(message = "Lesson name must be not null")
    String lessonName;

    @NotNull(message = "Content type must be not null")
    Content contentType;

    String articleText;

    Integer duration;
}