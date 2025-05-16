package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Permission;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    Optional<Permission> findByPermissionName(@Size(max = 20) String permissionName);
}