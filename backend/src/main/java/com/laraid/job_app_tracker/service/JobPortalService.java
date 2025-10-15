package com.laraid.job_app_tracker.service;

import com.laraid.job_app_tracker.dto.JobPortalDto;
import com.laraid.job_app_tracker.mapper.JobPortalMapper;
import com.laraid.job_app_tracker.model.JobPortal;
import com.laraid.job_app_tracker.repository.JobPortalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobPortalService {

    private final JobPortalRepository repo;
    private final JobPortalMapper mapper;

    public List<JobPortalDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::modelToDto)
                .collect(Collectors.toList());
    }

    public JobPortalDto getById(Long id) {
        return mapper.modelToDto(repo.findById(id).orElseThrow(() -> new RuntimeException("JobPortal not found")));
    }

    public JobPortalDto create(JobPortalDto dto) {
        return mapper.modelToDto(repo.save(mapper.dtoToModel(dto)));
    }

    public JobPortalDto update(JobPortalDto dto) {
         return mapper.modelToDto(repo.save(mapper.dtoToModel(dto)));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
