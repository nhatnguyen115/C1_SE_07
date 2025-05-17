package com.arkdev.z9tkvtu.mapper;

import com.arkdev.z9tkvtu.dto.Request.PartRequest;
import com.arkdev.z9tkvtu.dto.Response.PartDetailsResponse;
import com.arkdev.z9tkvtu.dto.Response.PartResponse;
import com.arkdev.z9tkvtu.model.Part;
import com.arkdev.z9tkvtu.model.SectionPartPractice;
import org.springframework.stereotype.Component;

@Component
public class PartMapper {
    public Part toPart(PartRequest request) {
        if(request == null) return null;
        Part part = new Part();
        part.setPartName(request.getPartName());
        part.setQuestionType(request.getQuestionType());
        part.setDescription(request.getDescription());
        part.setInstructions(request.getInstructions());
        part.setQuestionCount(request.getQuestionCount());
        return part;
    }

    public void updatePart(Part part, PartRequest request) {
        if(request == null) return;
        part.setPartName(request.getPartName());
        part.setQuestionType(request.getQuestionType());
        part.setDescription(request.getDescription());
        part.setInstructions(request.getInstructions());
        part.setQuestionCount(request.getQuestionCount());
    }

    public PartResponse toPartResponse(Part part) {
        if(part == null) return null;
        return new PartResponse(
                part.getId(),
                part.getPartName(),
                part.getQuestionType(),
                part.getQuestionCount(),
                part.getDescription(),
                part.getInstructions(),
                part.getMedia() != null ?
                        part.getMedia().getUrl() : null,
                part.getMedia() != null ?
                        part.getMedia().getMediaType() : null
        );
    }
    public PartDetailsResponse toPartDetailsResponse(SectionPartPractice practice) {
        if(practice == null) return null;
        return new PartDetailsResponse(
                practice.getPart().getId(),
                practice.getPart().getPartName(),
                practice.getPart().getQuestionType(),
                practice.getPart().getQuestionCount(),
                practice.getPart().getDescription(),
                practice.getPart().getInstructions(),
                practice.getCorrectCount(),
                practice.getTotalTime(),
                practice.getPart().getMedia() != null ?
                        practice.getPart().getMedia().getUrl() : null,
                practice.getPart().getMedia() != null ?
                        practice.getPart().getMedia().getMediaType() : null
        );
    }

    public PartDetailsResponse toPartDetailsResponse(Part part) {
        if(part == null) return null;
        return new PartDetailsResponse(
                part.getId(),
                part.getPartName(),
                part.getQuestionType(),
                part.getQuestionCount(),
                part.getDescription(),
                part.getInstructions(),
                null,
                null,
                part.getMedia() != null ?
                        part.getMedia().getUrl() : null,
                part.getMedia() != null ?
                        part.getMedia().getMediaType() : null
        );
    }
}
