package com.laraid.job_app_tracker.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class JobApplicationDto {
    private Long id;
    private LocalDate applicationDate;
    private String status;
    private String interviewRound;
    private LocalDateTime interviewDate;
    private BigDecimal salaryOffered;
    private String currency;
    private LocalDate expectedJoiningDate;
    private LocalDate endDate;
    private String domain;
    private String cloudPlatform;
    private String aiPlatform;
    private String notes;
    private String jobType; // Remote, Hybrid, Office
    private String employmentType; //FullTime, Contract
    private boolean resumeSent = true;
    private String resumeUrl;
    private String jobUrl;

    private Long companyId;
    private Long positionId;
    private Long jobPortalId;
    private Long consultancyId;

    // getters and setters
}
