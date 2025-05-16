package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.TestRequest;
import com.arkdev.z9tkvtu.dto.Response.TestResponse;
import com.arkdev.z9tkvtu.model.Test;
import org.springframework.stereotype.Component;

@Component
public class TestMapper {
    public Test toTest(TestRequest request) {
        if (request == null) return null;
        Test test = new Test();
        test.setTestType(request.getTestType());
        return test;
    }

    public void updateTest(Test test, TestRequest request) {
        if (request == null) return;
        test.setTestType(request.getTestType());
    }

    public TestResponse toTestResponse(Test test) {
        if (test == null) return null;
        return new TestResponse(
                test.getId(),
                test.getTestType()
        );
    }
}
