package com.laraid.job_app_tracker.dto;

import com.laraid.job_app_tracker.model.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDetailsDTO {
    private Long id;
    private String name;
    private String industry;
    private String location;
    private String website;
    private String description;
    private List<PositionDetailsDTO> positions;

    public CompanyDetailsDTO(Company company, List<PositionDetailsDTO> positions) {
        this.id = company.getId();
        this.name = company.getName();
        this.industry = company.getIndustry();
        this.location = company.getLocation();
        this.website = company.getWebsite();
        this.description = company.getDescription();
        this.positions = positions;
    }
}
