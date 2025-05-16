package com.arkdev.z9tkvtu.dto.Response;

import java.io.Serializable;
import java.util.List;

public record SectionContentResponse(
        List<LessonResponse> lessons,
        List<PartResponse> parts)implements Serializable {
}
