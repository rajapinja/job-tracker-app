package com.laraid.job_app_tracker.mapper;

import com.laraid.job_app_tracker.dto.PositionDto;
import com.laraid.job_app_tracker.model.Company;
import com.laraid.job_app_tracker.model.Position;
import com.laraid.job_app_tracker.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PositionMapper {

    private final CompanyRepository companyRepo;

    public Position dtoToModel(PositionDto dto) {
        Position pos = new Position();
        pos.setId(dto.getId());
        pos.setTitle(dto.getTitle());
        pos.setExperienceLevel(dto.getExperienceLevel());
        pos.setSkills(dto.getSkills());
        pos.setDepartment(dto.getDepartment());
        pos.setJobType(dto.getJobType());
        pos.setEmploymentType(dto.getEmploymentType());
        pos.setSalaryRange(dto.getSalaryRange());
        pos.setJobDescription(dto.getJobDescription());
        pos.setPracticeAnswer(dto.getPracticeAnswer());

        // ✅ fetch Company by ID
        if(dto.getCompanyId() != null) {
            Company company = companyRepo.findById(dto.getCompanyId())
                    .orElseThrow(() -> new RuntimeException("Company not found"));
            pos.setCompany(company);
        }

        return pos;
    }

    public PositionDto modelToDto(Position pos) {
        PositionDto dto = new PositionDto();
        dto.setId(pos.getId());
        dto.setTitle(pos.getTitle());
        dto.setExperienceLevel(pos.getExperienceLevel());
        dto.setSkills(pos.getSkills());
        dto.setDepartment(pos.getDepartment());
        dto.setJobType(pos.getJobType());
        dto.setEmploymentType(pos.getEmploymentType());
        dto.setSalaryRange(pos.getSalaryRange());
        dto.setJobDescription(pos.getJobDescription());
        dto.setPracticeAnswer(pos.getPracticeAnswer());

        // ✅ return companyId instead of full object
        if(pos.getCompany() != null) {
            dto.setCompanyId(pos.getCompany().getId());
        }

        return dto;
    }
}
