package com.laraid.job_app_tracker.service;

import com.laraid.job_app_tracker.dto.PositionDetailsDTO;
import com.laraid.job_app_tracker.dto.PositionDto;
import com.laraid.job_app_tracker.dto.PositionUpdateDTO;
import com.laraid.job_app_tracker.mapper.PositionMapper;
import com.laraid.job_app_tracker.model.Position;
import com.laraid.job_app_tracker.repository.CompanyRepository;
import com.laraid.job_app_tracker.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PositionService {

    private final PositionRepository repo;
    private final PositionMapper mapper;
    private final CompanyRepository companyRepository;

    public List<PositionDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::modelToDto)
                .collect(Collectors.toList());
    }

    public PositionDto getById(Long id) {
        return mapper.modelToDto(repo.findById(id).orElseThrow(() -> new RuntimeException("Position not found")));
    }

    public PositionDto create(PositionDto dto) {
        return mapper.modelToDto(repo.save(mapper.dtoToModel(dto)));
    }

    public PositionDto update(Long id, Position position) {
        position.setId(id);
        return mapper.modelToDto(repo.save(position));
    }

    @Transactional
    public PositionDetailsDTO updatePosition(PositionUpdateDTO dto) {
        Position position = repo.findById(dto.getPositionId())
                .orElseThrow(() -> new RuntimeException("Position not found"));

        if (dto.getJobDescription() != null)
            position.setJobDescription(dto.getJobDescription());

        if (dto.getPracticeAnswer() != null)
            position.setPracticeAnswer(dto.getPracticeAnswer());

        return modelToDto(repo.save(position));
    }

    @Transactional
    public PositionDetailsDTO getPositionDetails(@PathVariable Long id) {
        Position position = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Position not found"));

        PositionDetailsDTO dto = new PositionDetailsDTO(
                position.getId(),
                position.getTitle(),
                position.getJobType(),
                position.getEmploymentType(),
                position.getSkills(),
                position.getJobDescription(),
                position.getPracticeAnswer(),
                position.getSalaryRange()
        );
        return dto;
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public PositionDetailsDTO modelToDto(Position model){
        PositionDetailsDTO dto = new PositionDetailsDTO();
        dto.setId(model.getId());
        dto.setTitle(model.getTitle());
        dto.setJobType(model.getJobType());
        dto.setEmploymentType(model.getEmploymentType());
        dto.setSkills(model.getSkills());
        dto.setJobDescription(model.getJobDescription());
        dto.setPracticeAnswer(model.getPracticeAnswer());
        return dto;
    }

}

