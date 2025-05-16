package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.SectionPartPractice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SectionPartPracticeRepository extends JpaRepository<SectionPartPractice, Integer> {
    Optional<SectionPartPractice> findByUserIdAndPartId(UUID id, Integer partId);
}