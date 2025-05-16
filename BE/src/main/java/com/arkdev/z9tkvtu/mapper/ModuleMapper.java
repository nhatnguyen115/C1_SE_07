package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.ModuleRequest;
import com.arkdev.z9tkvtu.dto.Response.ModuleResponse;
import com.arkdev.z9tkvtu.model.Module;
import org.springframework.stereotype.Component;

@Component
public class ModuleMapper {
    public Module toModule(ModuleRequest request) {
        if (request == null) return null;
        Module module = new Module();
        module.setModuleName(request.getModuleName());
        return module;
    }

    public void UpdateModule(Module module, ModuleRequest request) {
        if (request == null) return;
        module.setModuleName(request.getModuleName());
    }

    public ModuleResponse toModuleResponse(Module module) {
        if (module == null) return null;
        return new ModuleResponse(
                module.getId(),
                module.getModuleName());
    }
}
