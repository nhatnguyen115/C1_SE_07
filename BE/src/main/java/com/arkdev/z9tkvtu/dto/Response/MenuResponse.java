package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;
import java.util.List;

public record MenuResponse(
        Integer id,
        String label,
        String url,
        String description,
        String icon,
        Integer itemId,
        List<MenuResponse> children) implements Serializable {
}
