package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.SectionRequest;
import com.arkdev.z9tkvtu.dto.Response.SectionResponse;
import com.arkdev.z9tkvtu.mapper.SectionMapper;
import com.arkdev.z9tkvtu.model.Menu;
import com.arkdev.z9tkvtu.model.Module;
import com.arkdev.z9tkvtu.model.Section;
import com.arkdev.z9tkvtu.repository.MenuRepository;
import com.arkdev.z9tkvtu.repository.ModuleRepository;
import com.arkdev.z9tkvtu.repository.SectionRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SectionService {
    SectionRepository sectionRepository;
    ModuleRepository moduleRepository;
    MenuRepository menuRepository;
    SectionMapper sectionMapper;

    public List<SectionResponse> getSections() {
        return sectionRepository.findAllByOrderByOrderNumber()
                .stream()
                .map(sectionMapper::toSectionResponse)
                .toList();
    }

    public List<SectionResponse> getSections(Integer moduleId) {
        return sectionRepository.findByModuleIdOrderByOrderNumber(moduleId)
                .stream()
                .map(sectionMapper::toSectionResponse)
                .toList();
    }

    public SectionResponse getSection(Integer sectionId) {
        return sectionRepository.findById(sectionId)
                .map(sectionMapper::toSectionResponse)
                .orElseThrow(() -> new RuntimeException("Section not found"));
    }

    @Transactional
    public void addSection(Integer moduleId, SectionRequest request) {
        sectionRepository.findBySectionName(request.getSectionName())
                .ifPresent(section -> {
                    throw new RuntimeException("Section already exists");
                });
        if (!moduleRepository.existsById(moduleId))
            throw new RuntimeException("Module not found");
        Module module = moduleRepository.getReferenceById(moduleId);
        Integer max = sectionRepository.findMaxOrderNumberByModuleId(moduleId);
        Section section = sectionMapper.toSection(request);
        section.setOrderNumber(max != null ? max + 1 : 1);
        section.setModule(module);
        Section item = sectionRepository.save(section);
        addMenu(moduleId, item);
    }

    private void addMenu(Integer moduleId, Section item) {
        Menu parent = menuRepository.findByItemId(moduleId)
                .orElseThrow(() -> new RuntimeException("Menu not found"));
        Integer max = menuRepository.findMaxOByParentId(parent.getId());
        Menu menu = new Menu("/sections?moduleId=", item.getSectionName(),
                item.getDescription(), true, item.getId(), parent, max != null ? max + 1 : 1);
        parent.getSubmenus().add(menu);
        menuRepository.save(menu);
    }

    @Transactional
    public void updateSection(Integer sectionId, SectionRequest request) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        sectionMapper.updateSection(section, request);
    }

    @Transactional
    public void deleteSection(Integer sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        sectionRepository.delete(section);
    }
}
