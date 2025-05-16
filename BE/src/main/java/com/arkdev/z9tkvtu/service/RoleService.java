package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.RoleRequest;
import com.arkdev.z9tkvtu.dto.Response.RoleResponse;
import com.arkdev.z9tkvtu.mapper.RoleMapper;
import com.arkdev.z9tkvtu.model.Role;
import com.arkdev.z9tkvtu.repository.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public List<RoleResponse> getRoles() {
        return roleRepository.findAll()
                .stream()
                .map(roleMapper::toRoleResponse).toList();
    }

    public RoleResponse getRole(Integer roleId) {
        return roleRepository.findById(roleId)
                .map(roleMapper::toRoleResponse)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    @Transactional
    public void addRole(RoleRequest request) {
        roleRepository.findByRoleType(request.getRoleType())
                .ifPresent(role -> {
                    throw new RuntimeException("Role already exists");
                });
        Role role = roleMapper.toRole(request);
        roleRepository.save(role);
    }

    @Transactional
    public void updateRole(Integer roleId, RoleRequest request) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleMapper.updateRole(role, request);
    }

    @Transactional
    public void deleteRole(Integer roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roleRepository.delete(role);
    }
}
