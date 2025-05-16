package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.Content;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Lesson}
 */
public record LessonDetailsResponse(
        String lessonName,
        Content contentType,
        String articleText,
        Integer duration) implements Serializable {
}