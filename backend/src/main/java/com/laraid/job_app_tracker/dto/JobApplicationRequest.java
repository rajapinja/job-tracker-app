package com.laraid.job_app_tracker.dto;

import lombok.Data;
import org.springframework.core.SpringVersion;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class JobApplicationRequest {

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
    private Long companyId;
    private Long positionId;
    private Long jobPortalId;
    private Long consultancyId;
    private boolean resumeSent = true;
    private String resumeUrl;
    private String jobUrl;
    private String jobType;
    private String employmentType;

}
