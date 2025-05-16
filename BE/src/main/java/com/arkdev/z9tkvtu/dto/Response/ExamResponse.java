package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Exam}
 */
public record ExamResponse(
        Integer id,
        String examName,
        Integer totalScore,
        String testType,
        Integer duration) implements Serializable {
}