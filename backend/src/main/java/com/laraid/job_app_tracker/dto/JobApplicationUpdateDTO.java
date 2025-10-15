package com.laraid.job_app_tracker.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class JobApplicationUpdateDTO {
    private Long companyId;
    private Long positionId;
    private Long jobPortalId;
    private Long consultancyId;
    private String status;
    private LocalDate dateApplied;
    private String interviewRound;
    private BigDecimal salaryOffered;
    private String notes;
    private String positionTitle;
    private String jobType;
    private String employmentType;


}
