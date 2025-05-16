package com.arkdev.z9tkvtu.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.MembershipPlan}
 */
@AllArgsConstructor
@Getter
public class MembershipPlanRequest implements Serializable {
    @NotNull(message = "Plan name must be not null")
    @NotBlank(message = "Plan name must be not null")
    private String planName;

    private String description;

    @NotNull(message = "Price must be not null")
    private BigDecimal price;

    @NotNull(message = "Duration days must be not null")
    private Integer durationDays;
}