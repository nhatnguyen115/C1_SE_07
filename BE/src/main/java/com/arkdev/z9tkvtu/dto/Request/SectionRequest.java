package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.SectionType;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Section}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SectionRequest implements Serializable {
    @NotNull(message = "Section name must be not null")
    String sectionName;
    
    String description;

    @NotNull(message = "Section type must be not null")
    SectionType sectionType;
}