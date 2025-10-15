package com.laraid.job_app_tracker.dto;

import com.laraid.job_app_tracker.model.Company;
import lombok.Data;

import java.util.Set;

@Data
public class PositionDto {
    private Long id;
    private String title;
    private String experienceLevel;
    private Set<String> skills;
    private String jobType;
    private String employmentType;
    private String salaryRange;
    private String department;
    private String jobDescription;
    private String practiceAnswer;
    private Long companyId;  // 👈 instead of Company
    // getters and setters
}
