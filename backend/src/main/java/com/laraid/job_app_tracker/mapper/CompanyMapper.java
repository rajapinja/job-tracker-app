package com.laraid.job_app_tracker.mapper;

import com.laraid.job_app_tracker.dto.CompanyDto;
import com.laraid.job_app_tracker.model.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {
    public Company dtoToModel(CompanyDto dto) {
        Company company = new Company();
        company.setId(dto.getId());
        company.setName(dto.getName());
        company.setIndustry(dto.getIndustry());
        company.setLocation(dto.getLocation());
        company.setWebsite(dto.getWebsite());
        return company;
    }

    public CompanyDto modelToDto(Company company) {
        CompanyDto dto = new CompanyDto();
        dto.setId(company.getId());
        dto.setName(company.getName());
        dto.setIndustry(company.getIndustry());
        dto.setLocation(company.getLocation());
        dto.setWebsite(company.getWebsite());
        return dto;
    }
}

