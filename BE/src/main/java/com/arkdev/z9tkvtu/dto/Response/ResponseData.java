package com.arkdev.z9tkvtu.dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseData<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    final int status;

    final String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    T data;

    public ResponseData(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
