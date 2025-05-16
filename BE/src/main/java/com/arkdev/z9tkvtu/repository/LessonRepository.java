package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Lesson;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    Optional<Lesson> findByLessonName(@NotNull(message = "Lesson name must be not null") String lessonName);

    List<Lesson> findBySectionIdOrderByOrderNumber(Integer sectionId);
    @Query(value = """
        select MAX(l.order_number) from lesson l where l.section_id = :sectionId
    """, nativeQuery = true)
    Integer findMaxOrderNumberBySectionId(Integer sectionId);
}