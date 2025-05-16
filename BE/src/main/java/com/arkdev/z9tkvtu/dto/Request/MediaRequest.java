package com.arkdev.z9tkvtu.dto.Request;

import com.arkdev.z9tkvtu.util.MediaType;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

/**
 * DTO for {@link com.arkdev.z9tkvtu.model.Media}
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MediaRequest implements Serializable {
    @NotNull(message = "Media type must be not null")
    MediaType mediaType;
    
    @NotNull(message = "Url must be not null")
    String url;
}