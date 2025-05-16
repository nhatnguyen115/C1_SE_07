package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.UserAccount;
import com.arkdev.z9tkvtu.model.UserTestAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTestAttemptRepository extends JpaRepository<UserTestAttempt, Integer> {
    List<UserTestAttempt> findByUser(UserAccount user);

    @Query(value = """
            SELECT
                e.examName AS examName,
                uta.totalScore AS totalScore,
                p.partName AS partName,
                q.content AS content,
                q.options AS options,
                q.explanation AS explanation,
                q.correctAnswer AS correctAnswer,
                ua.selectedAnswer AS selectedAnswer
            FROM Exam e
            JOIN UserTestAttempt uta ON e.id = uta.exam.id
            JOIN UserAnswer ua ON ua.attempt.id = uta.id
            JOIN Question q ON q.id = ua.question.id
            JOIN Part p ON p.id = q.part.id
            WHERE uta.id = :attemptId
            ORDER BY p.orderNumber, q.orderNumber
            """)
    List<Object[]> findByAttemptWithAnswersByAttemptId(@Param("attemptId") Integer attemptId);

    @Query(value = """
        SELECT
            COALESCE(uld.username, uld.email) AS username,
            uta.total_score as totalScore,
            CAST(ROUND(EXTRACT(EPOCH FROM (end_time - start_time)) / 60) AS BIGINT) as totalTime
        FROM user_test_attempt uta
        JOIN user_login_data uld ON uld.user_id = uta.user_id
        WHERE uta.exam_id = :examId AND  uta.complete = true
        ORDER BY uta.total_score DESC
        LIMIT 20;
    """, nativeQuery = true)
    List<Object[]> findByUserOfRank(@Param("examId") Integer examId);
}