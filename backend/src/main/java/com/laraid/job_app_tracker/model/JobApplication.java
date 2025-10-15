package com.laraid.job_app_tracker.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate applicationDate  = LocalDate.now();;
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
    private boolean resumeSent = true;
    private String resumeUrl;
    private String jobUrl;

    @Column(name = "job_type")
    private String jobType; // e.g., Remote, Hybrid, Office

    @Column(name = "employment_type")
    private String employmentType; // e.g., FullTime, Contract

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "job_portal_id")
    private JobPortal jobPortal;

    @ManyToOne
    @JoinColumn(name = "consultancy_id")
    private Consultancy consultancy;
}
