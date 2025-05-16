package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Integer> {
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
            ua.selected_answer AS selectedAnswer
        FROM question q
        INNER JOIN part p ON q.part_id = p.part_id
        LEFT JOIN user_answer ua ON q.question_id = ua.question_id AND ua.attempt_id = :attemptId
        LEFT JOIN media m ON m.media_id = q.media_id
        WHERE p.part_id = :partId
    """,  nativeQuery = true)
    List<Object[]> findByUserAnswerWithPartId(@Param("partId") Integer partId,
                                              @Param("attemptId") Integer attemptId);
}