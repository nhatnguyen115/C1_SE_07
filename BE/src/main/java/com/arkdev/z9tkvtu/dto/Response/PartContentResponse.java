package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.QuestionType;

import java.util.List;

public record PartContentResponse<T>(
        QuestionType questionType,
        String instructions,
        List<T> items,
        int totalPages,
        long totalElements,
        int PageNumber,
        int PageSize) {
}
