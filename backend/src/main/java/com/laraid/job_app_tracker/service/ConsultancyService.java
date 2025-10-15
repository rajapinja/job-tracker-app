package com.laraid.job_app_tracker.service;

import com.laraid.job_app_tracker.dto.ConsultancyDto;
import com.laraid.job_app_tracker.mapper.ConsultancyMapper;
import com.laraid.job_app_tracker.model.Consultancy;
import com.laraid.job_app_tracker.repository.ConsultancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultancyService {

    private final ConsultancyRepository repo;
    private final ConsultancyMapper mapper;


    public List<ConsultancyDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::modelToDto)
                .collect(Collectors.toList());
    }

    public ConsultancyDto getById(Long id) {
        return mapper.modelToDto(repo.findById(id).orElseThrow(() -> new RuntimeException("Consultancy not found")));
    }

    public ConsultancyDto create(ConsultancyDto dto) {
        return mapper.modelToDto(repo.save(mapper.dtoToModel(dto)));
    }

    public ConsultancyDto update(ConsultancyDto dto) {
        return mapper.modelToDto(repo.save(mapper.dtoToModel(dto)));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

