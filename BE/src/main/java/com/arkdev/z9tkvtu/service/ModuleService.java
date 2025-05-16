package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.ModuleRequest;
import com.arkdev.z9tkvtu.dto.Response.ModuleResponse;
import com.arkdev.z9tkvtu.mapper.ModuleMapper;
import com.arkdev.z9tkvtu.model.Module;
import com.arkdev.z9tkvtu.repository.ModuleRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ModuleService {
    ModuleRepository moduleRepository;
    ModuleMapper moduleMapper;

    public List<ModuleResponse> getModules() {
        return moduleRepository.findAllByOrderByModuleName()
                .stream()
                .map(moduleMapper::toModuleResponse)
                .toList();
    }

    public ModuleResponse getModule(Integer moduleId) {
        return moduleRepository.findById(moduleId)
                .map(moduleMapper::toModuleResponse)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }

    @Transactional
    public void addModule(ModuleRequest request) {
        moduleRepository.findByModuleName(request.getModuleName())
                .ifPresent(module -> {
                    throw new EntityExistsException("Module " + request.getModuleName() + " already exists");
                });
        Module module = moduleMapper.toModule(request);
        moduleRepository.save(module);
    }

    @Transactional
    public void updateModule(Integer moduleId, ModuleRequest request) {
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        moduleMapper.UpdateModule(module, request);
    }

    @Transactional
    public void deleteModule(Integer moduleId) {
        Module module = moduleRepository.findById(moduleId)
                        .orElseThrow(() -> new RuntimeException("Module not found"));
        moduleRepository.delete(module);
    }
}
