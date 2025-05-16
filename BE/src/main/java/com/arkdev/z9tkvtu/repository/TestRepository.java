package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Test;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    Optional<Test> findByTestType(@NotNull(message = "Test type must be not null") String testType);
    List<Test> findAllByOrderByTestType();

    @Query(value = """
        SELECT COUNT(DISTINCT uta.user_id)
        FROM user_test_attempt uta
        WHERE uta.exam_id = :examId
        AND uta.complete = true
    """, nativeQuery = true)
    Integer countByUserTestAttempt(@Param("examId") Integer examId);
}