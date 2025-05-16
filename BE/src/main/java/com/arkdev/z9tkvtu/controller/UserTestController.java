package com.arkdev.z9tkvtu.controller;

import com.arkdev.z9tkvtu.dto.Request.UserAnswerRequest;
import com.arkdev.z9tkvtu.dto.Response.ResponseData;
import com.arkdev.z9tkvtu.dto.Response.ResponseError;
import com.arkdev.z9tkvtu.service.TestAttemptService;
import com.arkdev.z9tkvtu.service.UserMembershipService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/user-test")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserTestController {
    TestAttemptService testAttemptService;
    UserMembershipService userMembershipService;

    @GetMapping("")
    public ResponseData<?> getTestHistories() {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Test Histories Successfully",
                    testAttemptService.getTestHistories());
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Test Histories Failed");
        }
    }

    @GetMapping("/get-result")
    public ResponseData<?> getTestResult(@RequestParam Integer attemptId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get Test Result Successfully",
                    testAttemptService.getAttemptDetails(attemptId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get Test Result Failed");
        }
    }

    @GetMapping("/user-rank")
    public ResponseData<?> getUserRank(@RequestParam Integer examId) {
        try {
            return new ResponseData<>(HttpStatus.OK.value(), "Get User Rank Successfully",
                    testAttemptService.getUserRanks(examId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Get User Rank Failed");
        }
    }

    @PostMapping("/start-test")
    public ResponseData<?> startTest(@RequestParam Integer examId) {
        try {
            if (userMembershipService.checkResourceAccess(examId, "EXAM"))
                return new ResponseData<>(HttpStatus.EXPECTATION_FAILED.value(), "Request membership package",
                        "MEMBERSHIP_REQUIREMENTS");
            return new ResponseData<>(HttpStatus.OK.value(), "Start Test Successfully",
                    testAttemptService.startTest(examId));
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Start Test Failed");
        }
    }

    @PostMapping("/submit-test")
    public ResponseData<?> submitTest(@RequestParam Integer attemptId,
                                      @RequestBody List<UserAnswerRequest> answers) {
        try {
            testAttemptService.submitTest(attemptId, answers);
            return new ResponseData<>(HttpStatus.OK.value(), "Submit Test Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Submit Test Failed");
        }
    }

    @DeleteMapping("/delete-test")
    public ResponseData<?> deleteTest(@RequestParam Integer attemptId) {
        try {
            testAttemptService.deleteTest(attemptId);
            return new ResponseData<>(HttpStatus.OK.value(), "Delete Test Successfully");
        } catch (Exception e) {
            return new ResponseError<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Delete Test Failed");
        }
    }
}
