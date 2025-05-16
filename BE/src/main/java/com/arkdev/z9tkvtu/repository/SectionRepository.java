package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.dto.Response.SectionContentResponse;
import com.arkdev.z9tkvtu.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {
    Optional<Section> findBySectionName(String sectionName);
    List<Section> findByModuleIdOrderByOrderNumber(Integer moduleId);
    @Query(value = """
        select MAX(s.order_number) from section s where s.module_id = :moduleId
    """, nativeQuery = true)
    Integer findMaxOrderNumberByModuleId(Integer moduleId);
    SectionContentResponse findSectionDetailsById(Integer id);

    List<Section> findAllByOrderByOrderNumber();
}