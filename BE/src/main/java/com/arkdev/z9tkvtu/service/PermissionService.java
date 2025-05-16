package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.PermissionRequest;
import com.arkdev.z9tkvtu.dto.Response.PermissionResponse;
import com.arkdev.z9tkvtu.mapper.PermissionMapper;
import com.arkdev.z9tkvtu.model.Permission;
import com.arkdev.z9tkvtu.repository.PermissionRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public List<PermissionResponse> getPermissions() {
        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toPermissionResponse)
                .toList();
    }

    public PermissionResponse getPermission(Integer permissionId) {
        return permissionRepository.findById(permissionId)
                .map(permissionMapper::toPermissionResponse)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
    }

    @Transactional
    public void addPermission(PermissionRequest request) {
        permissionRepository.findByPermissionName(request.getPermissionName())
                .ifPresent(permission -> {
                    throw new RuntimeException("Permission already exists");
                });
        Permission permission = permissionMapper.toPermission(request);
        permissionRepository.save(permission);
    }

    @Transactional
    public void updatePermission(Integer permissionId, PermissionRequest request) {
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        permissionMapper.updatePermission(permission, request);
        permissionRepository.save(permission);
    }

    @Transactional
    public void deletePermission(Integer permissionId) {
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        permissionRepository.delete(permission);
    }
}
