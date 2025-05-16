package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByPartIdOrderByOrderNumber(Integer partId);
    @Query(value = """
        select MAX(q.order_number) from question q where q.part_id = :partId
    """, nativeQuery = true)
    Integer findMaxOrderNumberByPartId(Integer partId);
}