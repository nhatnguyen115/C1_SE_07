package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Exam;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
    Optional<Exam> findByExamName(@NotNull(message = "Exam name must be not null") String examName);

    @Query(value = """
        SELECT e FROM Exam e
        WHERE (:testId IS NULL OR e.test.id = :testId)
        ORDER BY e.createdAt desc
    """)
    List<Exam> findByTestIdOrderByCreatedAt(@Param("testId") Integer testId);
}