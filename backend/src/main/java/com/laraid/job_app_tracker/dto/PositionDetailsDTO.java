package com.laraid.job_app_tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PositionDetailsDTO {
    private Long id;
    private String title;
    private String jobType;
    private String employmentType;
    private Set<String> skills;
    private String jobDescription;
    private String practiceAnswer; // optional field you can add to table
    private String salaryRange;
}