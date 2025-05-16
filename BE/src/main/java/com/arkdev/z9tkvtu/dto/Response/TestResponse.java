package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Test}
 */
public record TestResponse(
        Integer id,
        String testType) implements Serializable {
}