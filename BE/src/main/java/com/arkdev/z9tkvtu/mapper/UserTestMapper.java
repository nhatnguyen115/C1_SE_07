package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Response.UserAnswerResponse;
import com.arkdev.z9tkvtu.dto.Response.UserTestHistoryResponse;
import com.arkdev.z9tkvtu.model.UserAnswer;
import com.arkdev.z9tkvtu.model.UserTestAttempt;
import org.springframework.stereotype.Component;

@Component
public class UserTestMapper {
    public UserTestHistoryResponse toTestHistoryResponse(UserTestAttempt testAttempt) {
        if (testAttempt == null) return null;
        return new UserTestHistoryResponse(
                testAttempt.getId(),
                testAttempt.getExam().getExamName(),
                testAttempt.getTotalScore(),
                testAttempt.getStartTime(),
                testAttempt.getEndTime()
        );
    }
}
