package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Part;
import com.arkdev.z9tkvtu.model.SectionPartPractice;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PartRepository extends JpaRepository<Part, Integer> {
    List<Part> findBySectionsIdOrderByOrderNumber(Integer sectionId);
    List<Part> findByExamsIdOrderByOrderNumber(Integer examId);
    Optional<Part> findByPartNameAndSectionsId(@NotNull(message = "Part name must be not null") String partName, Integer sectionId);

    Optional<Part> findByPartNameAndExamsId(@NotNull(message = "Part name must be not null") String partName, Integer examId);

    @Query(value = """
        select MAX(p.order_number) from part p
        join section_part sp on sp.part_id = p.part_id
        where sp.section_id = :sectionId
    """, nativeQuery = true)
    Integer findMaxOrderNumberBySectionsId(Integer sectionId);

    @Query(value = """
        select MAX(p.order_number) from part p
        join exam_structure es on es.part_id = p.part_id
        where es.exam_id = :examId
    """, nativeQuery = true)
    Integer findMaxOrderNumberByExamsId(Integer examId);

    @Query("select p from Part p join p.exams e join UserTestAttempt uta on uta.exam = e where uta.id = :attemptId")
    List<Part> findPartsByAttemptId(@Param("attemptId") Integer attemptId);
}