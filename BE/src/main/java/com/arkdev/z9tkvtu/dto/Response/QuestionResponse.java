package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.DifficultyLevel;
import com.arkdev.z9tkvtu.util.MediaType;

import java.io.Serializable;
import java.util.Map;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Question}
 */
public record QuestionResponse(
        Integer id,
        String content,
        String url,
        MediaType mediaType,
        Map<String, Object> options,
        String explanation,
        DifficultyLevel difficulty) implements Serializable {
}