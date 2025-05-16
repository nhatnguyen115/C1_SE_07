package com.arkdev.z9tkvtu.dto.Response;

public class ResponseError<T> extends ResponseData<T> {

    public ResponseError(int status, String message) {
        super(status, message);
    }
}
