package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.TestRequest;
import com.arkdev.z9tkvtu.dto.Response.TestResponse;
import com.arkdev.z9tkvtu.mapper.TestMapper;
import com.arkdev.z9tkvtu.model.Module;
import com.arkdev.z9tkvtu.model.Test;
import com.arkdev.z9tkvtu.repository.ModuleRepository;
import com.arkdev.z9tkvtu.repository.TestRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestService {
    ModuleRepository moduleRepository;
    TestRepository testRepository;
    TestMapper testMapper;

    public List<TestResponse> getTests() {
        return testRepository.findAllByOrderByTestType()
                .stream()
                .map(testMapper::toTestResponse)
                .toList();
    }

    public TestResponse getTest(Integer testId) {
        return testRepository.findById(testId)
                .map(testMapper::toTestResponse)
                .orElseThrow(() -> new EntityNotFoundException("Test not found"));
    }

    @Transactional
    public void addTest(TestRequest request) {
        testRepository.findByTestType(request.getTestType())
                .ifPresent(test -> {
                    throw new EntityExistsException("Test " + request.getTestType() + " already exists");
                });
        Test test = testMapper.toTest(request);
        testRepository.save(test);
    }

    @Transactional
    public void updateTest(Integer testId, TestRequest request) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found"));
        testMapper.updateTest(test, request);
    }

    @Transactional
    public void deleteTest(Integer testId) {
        if (!testRepository.existsById(testId))
            throw new RuntimeException("Test not found");
        testRepository.deleteById(testId);
    }
}

