package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.RoleType;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Role}
 */
public record RoleResponse(
        Integer id,
        RoleType roleType,
        String description) implements Serializable {
}