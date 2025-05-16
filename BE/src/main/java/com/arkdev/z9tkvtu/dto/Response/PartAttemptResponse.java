package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Part}
 */
public record PartAttemptResponse<P, T>(
        P part,
        List<T> questions) implements Serializable {
}