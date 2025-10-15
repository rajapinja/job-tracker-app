package com.laraid.job_app_tracker.dto;

import lombok.Data;

@Data
public class CompanyDto {
    private Long id;
    private String name;
    private String industry;
    private String location;
    private String website;
    private String description;

    // getters and setters
}
