package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;

public record ExamListResponse (
        Integer id,
        String examName,
        Integer totalScore,
        String testType,
        Integer duration,
        Integer questions,
        Integer students) implements Serializable {
}
