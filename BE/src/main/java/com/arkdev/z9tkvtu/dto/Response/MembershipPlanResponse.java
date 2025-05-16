package com.arkdev.z9tkvtu.dto.Response;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.MembershipPlan}
 */
public record MembershipPlanResponse(
        Integer id,
        String planName,
        String description,
        BigDecimal price,
        Integer durationDays) implements Serializable {
}