package com.laraid.job_app_tracker.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ApplicationResponseDTO {

    private Long id;
    private String companyName;
    private String position;
    private String positionSkills; // comma-separated skills
    private String portalName;
    private String consultancyName;
    private String city;
    private LocalDate dateApplied;
    private String status;
    private String jobType; // Remote, Hybrid, Office
    private String employmentType; //FullTime, Contract
    private Long positionId;
    private BigDecimal salaryOffered;

    public ApplicationResponseDTO(Long id, String companyName, String position, String positionSkills,
                                  String portalName, String consultancyName, String city,
                                  LocalDate dateApplied, String status,BigDecimal salaryOffered,
                                  String jobType, String employmentType,Long positionId) {
        this.id = id;
        this.companyName = companyName;
        this.position = position;
        this.positionSkills = positionSkills;
        this.portalName = portalName;
        this.consultancyName = consultancyName;
        this.city = city;
        this.dateApplied = dateApplied;
        this.status = status;
        this.salaryOffered = salaryOffered;
        this.jobType = jobType;
        this.employmentType = employmentType;
        this.positionId = positionId;

    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getPositionSkills(){return positionSkills;}

    public void setPositionSkills(String positionSkills) {this.positionSkills = positionSkills;}

    public String getPortalName() { return portalName; }
    public void setPortalName(String portalName) { this.portalName = portalName; }

    public String getConsultancyName() { return consultancyName; }
    public void setConsultancyName(String consultancyName) { this.consultancyName = consultancyName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public LocalDate getDateApplied() { return dateApplied; }
    public void setDateApplied(LocalDate dateApplied) { this.dateApplied = dateApplied; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getJobType() {return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public String getEmploymentType() {return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }

    public Long getPositionId() { return positionId;  }
    public void setPositionId(Long positionId) { this.positionId = positionId;  }

    public BigDecimal getSalaryOffered() { return salaryOffered; }
    public void setSalaryOffered(BigDecimal salaryOffered) { this.salaryOffered = salaryOffered; }
}

