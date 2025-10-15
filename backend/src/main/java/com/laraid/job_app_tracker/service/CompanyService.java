package com.laraid.job_app_tracker.service;

import com.laraid.job_app_tracker.dto.CompanyDetailsDTO;
import com.laraid.job_app_tracker.dto.CompanyDto;
import com.laraid.job_app_tracker.dto.PositionDetailsDTO;
import com.laraid.job_app_tracker.mapper.CompanyMapper;
import com.laraid.job_app_tracker.model.Company;
import com.laraid.job_app_tracker.model.Position;
import com.laraid.job_app_tracker.repository.CompanyRepository;
import com.laraid.job_app_tracker.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository repo;
    private final CompanyMapper mapper;
    private final PositionRepository positionRepository;


    public List<CompanyDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::modelToDto)
                .collect(Collectors.toList());
    }

    public CompanyDto getById(Long id) {
        return mapper.modelToDto(repo.findById(id).orElseThrow(() -> new RuntimeException("Company not found")));
    }

    public CompanyDto create(CompanyDto company) {
        return mapper.modelToDto(repo.save(mapper.dtoToModel(company)));
    }

    public CompanyDto update(Long id, CompanyDto company) {
        company.setId(id);
        return mapper.modelToDto(repo.save(mapper.dtoToModel(company)));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public CompanyDetailsDTO getCompanyDetails(Long companyId) {
        Company company = repo.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        List<PositionDetailsDTO> positions = positionRepository.findByCompanyId(companyId)
                .stream()
                .map(pos -> new PositionDetailsDTO(
                        pos.getId(),
                        pos.getTitle(),
                        pos.getJobType(),
                        pos.getEmploymentType(),
                        pos.getSkills(),
                        pos.getJobDescription(),
                        pos.getPracticeAnswer(),
                        pos.getSalaryRange()
                ))
                .toList();

        return new CompanyDetailsDTO(company, positions);
    }

    public CompanyDto patchCompany(CompanyDto dto) {
        Company company = repo.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (dto.getDescription() != null)
            company.setDescription(dto.getDescription());

        return mapper.modelToDto(repo.save(company));
    }
}

