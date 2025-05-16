package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.SectionRequest;
import com.arkdev.z9tkvtu.dto.Response.SectionResponse;
import com.arkdev.z9tkvtu.model.Section;
import org.springframework.stereotype.Component;

@Component
public class SectionMapper {
    public Section toSection(SectionRequest request) {
        if (request == null) return null;
        Section section = new Section();
        section.setSectionName(request.getSectionName());
        section.setDescription(request.getDescription());
        section.setSectionType(request.getSectionType());
        return section;
    }

    public void updateSection(Section section, SectionRequest request) {
        if (request == null) return;
        section.setSectionName(request.getSectionName());
        section.setDescription(request.getDescription());
        section.setSectionType(request.getSectionType());
    }

    public SectionResponse toSectionResponse(Section section) {
        if (section == null) return null;
        return new SectionResponse(
                section.getId(),
                section.getSectionName(),
                section.getDescription(),
                section.getSectionType());
    }
}
