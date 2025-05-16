package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Module}
 */
public record ModuleResponse(
        Integer id,
        String moduleName) implements Serializable {
}