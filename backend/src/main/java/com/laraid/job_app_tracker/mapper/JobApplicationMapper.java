package com.laraid.job_app_tracker.mapper;

import com.laraid.job_app_tracker.dto.JobApplicationDto;
import com.laraid.job_app_tracker.model.*;
import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapper {

    public JobApplication dtoToModel(JobApplicationDto dto,
                                     Company company,
                                     Position position,
                                     JobPortal portal,
                                     Consultancy consultancy) {
        JobApplication job = new JobApplication();
        job.setId(dto.getId());
        job.setApplicationDate(dto.getApplicationDate());
        job.setStatus(dto.getStatus());
        job.setInterviewRound(dto.getInterviewRound());
        job.setInterviewDate(dto.getInterviewDate());
        job.setSalaryOffered(dto.getSalaryOffered());
        job.setExpectedJoiningDate(dto.getExpectedJoiningDate());
        job.setEndDate(dto.getEndDate());
        job.setDomain(dto.getDomain());
        job.setCloudPlatform(dto.getCloudPlatform());
        job.setAiPlatform(dto.getAiPlatform());
        job.setNotes(dto.getNotes());

        job.setCompany(company);
        job.setPosition(position);
        job.setJobPortal(portal);
        job.setConsultancy(consultancy);

        return job;
    }

//    public JobApplicationDto modelToDto(JobApplication job) {
//        JobApplicationDto dto = new JobApplicationDto();
//        dto.setId(job.getId());
//        dto.setApplicationDate(job.getApplicationDate());
//        dto.setStatus(job.getStatus());
//        dto.setInterviewRound(job.getInterviewRound());
//        dto.setInterviewDate(job.getInterviewDate());
//        dto.setSalaryOffered(job.getSalaryOffered());
//        dto.setExpectedJoiningDate(job.getExpectedJoiningDate());
//        dto.setEndDate(job.getEndDate());
//        dto.setDomain(job.getDomain());
//        dto.setCloudPlatform(job.getCloudPlatform());
//        dto.setAiPlatform(job.getAiPlatform());
//        dto.setNotes(job.getNotes());
//
//        if(job.getCompany() != null) dto.setCompanyId(job.getCompany().getId());
//        if(job.getPosition() != null) dto.setPositionId(job.getPosition().getId());
//        if(job.getJobPortal() != null) dto.setJobPortalId(job.getJobPortal().getId());
//        if(job.getConsultancy() != null) dto.setConsultancyId(job.getConsultancy().getId());
//
//        return dto;
//    }

    public JobApplicationDto modelToDto(JobApplication ja) {
        if (ja == null) return null;

        Position p = ja.getPosition();

        return JobApplicationDto.builder()
                .id(ja.getId())
                .applicationDate(ja.getApplicationDate())
                .status(ja.getStatus())
                .interviewRound(ja.getInterviewRound())
                .interviewDate(ja.getInterviewDate())
                .salaryOffered(ja.getSalaryOffered())
                .currency(ja.getCurrency())
                .expectedJoiningDate(ja.getExpectedJoiningDate())
                .endDate(ja.getEndDate())
                .domain(ja.getDomain())
                .cloudPlatform(ja.getCloudPlatform())
                .aiPlatform(ja.getAiPlatform())
                .notes(ja.getNotes())
                .companyId(ja.getCompany() != null ? ja.getCompany().getId() : null)
                .jobPortalId(ja.getJobPortal() != null ? ja.getJobPortal().getId() : null)
                .consultancyId(ja.getConsultancy() != null ? ja.getConsultancy().getId() : null)
                .positionId(p != null ? p.getId() : null)
                .jobType(p != null ? p.getJobType() : null)
                .employmentType(p != null ? p.getEmploymentType() : null)
                .build();
    }
}

