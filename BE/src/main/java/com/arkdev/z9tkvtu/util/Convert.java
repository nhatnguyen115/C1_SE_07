package com.arkdev.z9tkvtu.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class Convert {
    public static String getString(Object value) {
        return value != null ? value.toString() : null;
    }

    public static <E extends Enum<E>> E getEnum(Class<E> enumType, Object value) {
        return value != null ? Enum.valueOf(enumType, value.toString()) : null;
    }

    public static Integer getInt(Object value) {
        return value != null ? ((Number) value).intValue() : null;
    }

    public static Map<String, Object> parseOptions(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return Map.of();
        }
    }
}
