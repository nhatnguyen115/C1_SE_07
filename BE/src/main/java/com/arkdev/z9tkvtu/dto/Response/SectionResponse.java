package com.arkdev.z9tkvtu.dto.Response;

import com.arkdev.z9tkvtu.util.SectionType;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Section}
 */
public record SectionResponse(
        Integer id,
        String sectionName,
        String description,
        SectionType sectionType) implements Serializable {
}