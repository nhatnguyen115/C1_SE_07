package com.arkdev.z9tkvtu.dto.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SectionPartRequest {
    Integer partId;
    Integer totalTime;
    List<UserAnswerRequest> answers;
}
