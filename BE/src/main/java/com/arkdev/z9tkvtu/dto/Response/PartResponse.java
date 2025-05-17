package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.MediaType;
import com.arkdev.z9tkvtu.util.QuestionType;

import java.io.Serializable;

public record PartResponse(
        Integer id,
        String partName,
        QuestionType questionType,
        Integer questionCount,
        String description,
        String instructions,
        String url,
        MediaType mediaType)implements Serializable {
}
