package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.RoleRequest;
import com.arkdev.z9tkvtu.dto.Response.RoleResponse;
import com.arkdev.z9tkvtu.model.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleMapper {
    public Role toRole(RoleRequest request) {
        if (request == null) return null;
        Role role = new Role();
        role.setRoleType(request.getRoleType());
        role.setDescription(request.getDescription());
        return role;
    }

    public void updateRole(Role role, RoleRequest request) {
        if (role == null) return;
        role.setRoleType(request.getRoleType());
        role.setDescription(request.getDescription());
    }

    public RoleResponse toRoleResponse(Role role) {
        if (role == null) return null;
        return new RoleResponse(
                role.getId(),
                role.getRoleType(),
                role.getDescription());
    }
}
