package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.SectionPartAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionPartAnswerRepository extends JpaRepository<SectionPartAnswer, Integer> {
    Optional<SectionPartAnswer> findByQuestionIdAndPracticeId(Integer questionId, Integer practiceId);

    @Query(value = """
        SELECT
            q.question_id AS id,
            q.content AS content,
            m.url AS url,
            m.media_type AS mediaType,
            q.options AS options,
            q.correct_answer AS correctAnswer,
            q.explanation AS explanation,
            q.difficulty AS difficulty,
            spa.selected_answer AS selectedAnswer
        FROM question q
        INNER JOIN part p ON q.part_id = p.part_id
        LEFT JOIN section_part_answer spa ON q.question_id = spa.question_id AND spa.practice_id = :practiceId
        LEFT JOIN media m ON m.media_id = q.media_id
        WHERE p.part_id = :partId
    """, nativeQuery = true)
    List<Object[]> findByPracticeIdWithPartId(@Param("practiceId") Integer practiceId,
                                              @Param("partId") Integer partId);
}