package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.PermissionRequest;
import com.arkdev.z9tkvtu.dto.Response.PermissionResponse;
import com.arkdev.z9tkvtu.model.Permission;
import org.springframework.stereotype.Component;

@Component
public class PermissionMapper {
    public Permission toPermission(PermissionRequest request) {
        if (request == null) return null;
        Permission permission = new Permission();
        permission.setPermissionName(request.getPermissionName());
        permission.setDescription(request.getDescription());
        return permission;
    }

    public void updatePermission(Permission permission, PermissionRequest request) {
        if (permission == null) return;
        permission.setPermissionName(request.getPermissionName());
        permission.setDescription(request.getDescription());
    }

    public PermissionResponse toPermissionResponse(Permission permission) {
        if (permission == null) return null;
        return new PermissionResponse(
                permission.getId(),
                permission.getPermissionName(),
                permission.getDescription()
        );
    }
}
