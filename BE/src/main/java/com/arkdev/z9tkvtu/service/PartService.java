package com.arkdev.z9tkvtu.service;

import com.arkdev.z9tkvtu.dto.Request.MediaRequest;
import com.arkdev.z9tkvtu.dto.Request.PartRequest;
import com.arkdev.z9tkvtu.dto.Response.PartResponse;
import com.arkdev.z9tkvtu.mapper.MediaMapper;
import com.arkdev.z9tkvtu.mapper.PartMapper;
import com.arkdev.z9tkvtu.model.*;
import com.arkdev.z9tkvtu.repository.ExamRepository;
import com.arkdev.z9tkvtu.repository.PartRepository;
import com.arkdev.z9tkvtu.repository.SectionRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PartService {
    SectionRepository sectionRepository;
    PartRepository partRepository;
    ExamRepository examRepository;
    UploadMediaService uploadMediaService;
    PartMapper partMapper;

    public List<PartResponse> getPartsToSection(Integer sectionId) {
        return partRepository.findBySectionsIdOrderByOrderNumber(sectionId)
                .stream()
                .map(partMapper::toPartResponse)
                .toList();
    }

    public List<PartResponse> getPartsToExam(Integer examId) {
        return partRepository.findByExamsIdOrderByOrderNumber(examId)
                .stream()
                .map(partMapper::toPartResponse)
                .toList();
    }

    public PartResponse getPart(Integer partId) {
        return partRepository.findById(partId)
                .map(partMapper::toPartResponse)
                .orElseThrow(() -> new RuntimeException("part not found"));
    }

    @Transactional
    public void addPartToSection(Integer sectionId, PartRequest request) {
        partRepository.findByPartNameAndSectionsId(request.getPartName(), sectionId)
            .ifPresent(part -> {
                throw new RuntimeException("Part already exists");
            });
        if (!sectionRepository.existsById(sectionId))
            throw new RuntimeException("Section not found");
        Section section = sectionRepository.getReferenceById(sectionId);
        Integer max = partRepository.findMaxOrderNumberBySectionsId(sectionId);
        Part part = partMapper.toPart(request);
        part.setOrderNumber(max != null ? max + 1 : 1);
        part.getSections().add(section);
        section.getParts().add(part);
        partRepository.save(part);
    }

    @Transactional
    public void addPartToExam(Integer examId, PartRequest request) {
        partRepository.findByPartNameAndExamsId(request.getPartName(), examId)
                .ifPresent(part -> {
                    throw new RuntimeException("Part already exists");
                });
        if (!examRepository.existsById(examId))
            throw new RuntimeException("Exam not found");
        Exam exam = examRepository.getReferenceById(examId);
        Integer max = partRepository.findMaxOrderNumberByExamsId(examId);
        Part part = partMapper.toPart(request);
        part.setOrderNumber(max != null ? max + 1 : 1);
        part.getExams().add(exam);
        exam.getParts().add(part);
        partRepository.save(part);
    }

    @Transactional
    public void updatePart(Integer partId, PartRequest request) {
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new RuntimeException("part not found"));
        partMapper.updatePart(part, request);
        partRepository.save(part);
    }

    @Transactional
    public void deletePart(Integer partId) {
        Part part= partRepository.findById(partId)
                .orElseThrow(() -> new RuntimeException("part not found"));
        partRepository.delete(part);
    }

    @Transactional
    public void addMediaToPart(Integer partId, MediaRequest request) throws IOException {
        Part part = partRepository.findById(partId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        Media media = uploadMediaService.updateMedia(part.getMedia(),
                request.getFile(), request.getMediaType());
        part.setMedia(media);
        partRepository.save(part);
    }
}
