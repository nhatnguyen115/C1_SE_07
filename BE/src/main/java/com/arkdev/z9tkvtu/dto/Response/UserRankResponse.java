package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;

public record UserRankResponse(
        String username,
        Integer totalScore,
        long totalTime) implements Serializable {
}
