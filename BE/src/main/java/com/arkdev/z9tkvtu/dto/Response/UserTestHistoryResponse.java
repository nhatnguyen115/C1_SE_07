package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.UserTestAttempt}
 */
public record UserTestHistoryResponse(
        Integer  id,
        String examName,
        Integer totalScore,
        Timestamp startTime,
        Timestamp endTime) implements Serializable {
}