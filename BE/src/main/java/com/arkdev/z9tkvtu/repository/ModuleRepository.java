package com.arkdev.z9tkvtu.repository;

import com.arkdev.z9tkvtu.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {

    Optional<Module> findByModuleName(String moduleName);

    List<Module> findAllByOrderByModuleName();
}