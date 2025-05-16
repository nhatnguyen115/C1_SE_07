package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.ResourceAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResourceAccessRepository extends JpaRepository<ResourceAccess, Integer> {
    Optional<ResourceAccess> findByResourceId(Integer resourceId);
}