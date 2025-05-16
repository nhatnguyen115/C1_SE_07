package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.QuestionType;

import java.util.List;

public record QuestionDetailsResponse<T>(
        QuestionType questionType,
        String instructions,
        List<T> list) {
}
