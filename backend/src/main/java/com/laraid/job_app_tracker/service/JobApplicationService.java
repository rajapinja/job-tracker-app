package com.laraid.job_app_tracker.service;

import com.laraid.job_app_tracker.dto.ApplicationResponseDTO;
import com.laraid.job_app_tracker.dto.JobApplicationDto;
import com.laraid.job_app_tracker.dto.JobApplicationRequest;
import com.laraid.job_app_tracker.dto.JobApplicationUpdateDTO;
import com.laraid.job_app_tracker.mapper.JobApplicationMapper;
import com.laraid.job_app_tracker.model.Company;
import com.laraid.job_app_tracker.model.JobApplication;
import com.laraid.job_app_tracker.model.Position;
import com.laraid.job_app_tracker.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobApplicationService {

    private final JobApplicationRepository repo;
    private final JobApplicationMapper mapper;
    private final CompanyRepository companyRepository;
    private final PositionRepository positionRepository;
    private final ConsultancyRepository consultancyRepository;
    private final JobPortalRepository jobPortalRepository;

    // For CRUD using DTO mapping
    public List<JobApplicationDto> getAll() {
        return repo.findAll().stream()
                .map(mapper::modelToDto)
                .collect(Collectors.toList());
    }

    public JobApplicationDto create(JobApplication job) {
        return mapper.modelToDto(repo.save(job));
    }

//    public JobApplicationDto update(Long id, JobApplication job) {
//        job.setId(id);
//        return mapper.modelToDto(repo.save(job));
//    }

    @Transactional
    public JobApplication updateApplication(Long id, JobApplicationUpdateDTO dto) {
        JobApplication app = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        if (dto.getPositionId() != null) {
            Position position = positionRepository.findById(dto.getPositionId())
                    .orElseThrow(() -> new RuntimeException("Position not found"));

            // Update Position fields if provided
            if (dto.getPositionTitle() != null) position.setTitle(dto.getPositionTitle());
            if (dto.getJobType() != null) position.setJobType(dto.getJobType());
            if (dto.getEmploymentType() != null) position.setEmploymentType(dto.getEmploymentType());

            positionRepository.save(position);  // persist changes

            app.setPosition(position);           // link to JobApplication
            app.setJobType(position.getJobType());
            app.setEmploymentType(position.getEmploymentType());
        }

        // Update other JobApplication fields
        if (dto.getStatus() != null) app.setStatus(dto.getStatus());
        if (dto.getInterviewRound() != null) app.setInterviewRound(dto.getInterviewRound());
        if (dto.getSalaryOffered() != null) app.setSalaryOffered(dto.getSalaryOffered());
        if (dto.getDateApplied() != null) app.setApplicationDate(dto.getDateApplied());
        if (dto.getNotes() != null) app.setNotes(dto.getNotes());

        return repo.save(app);
    }

    public Optional<JobApplicationDto> findById(Long id) {
        return repo.findById(id)
                .map(mapper::modelToDto);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // This is the new method using DTO projection
    public List<ApplicationResponseDTO> getAllApplications() {
        return null; //repo.fetchAllApplications();
    }

   public JobApplicationDto createJobApplication(@RequestBody JobApplicationRequest dto) {
        JobApplication ja = new JobApplication();
        ja.setApplicationDate(dto.getApplicationDate());
        ja.setStatus(dto.getStatus());
        ja.setInterviewRound(dto.getInterviewRound());
        ja.setInterviewDate(dto.getInterviewDate());
        ja.setSalaryOffered(dto.getSalaryOffered());
        ja.setCurrency(dto.getCurrency());
        ja.setExpectedJoiningDate(dto.getExpectedJoiningDate());
        ja.setEndDate(dto.getEndDate());
        ja.setDomain(dto.getDomain());
        ja.setCloudPlatform(dto.getCloudPlatform());
        ja.setAiPlatform(dto.getAiPlatform());
        ja.setNotes(dto.getNotes());
        ja.setResumeSent(dto.isResumeSent());
        ja.setResumeUrl(dto.getResumeUrl());
        ja.setJobUrl(dto.getJobUrl());
        ja.setJobType(dto.getJobType());
        ja.setEmploymentType(dto.getEmploymentType());

        // 🔥 Link existing entities using IDs
        ja.setCompany(companyRepository.findById(dto.getCompanyId()).orElse(null));
        ja.setJobPortal(jobPortalRepository.findById(dto.getJobPortalId()).orElse(null));
        ja.setConsultancy(consultancyRepository.findById(dto.getConsultancyId()).orElse(null));
        ja.setPosition(positionRepository.findById(dto.getPositionId()).orElse(null));

        JobApplication saved = repo.save(ja);
        return mapper.modelToDto(saved);
    }

    public List<ApplicationResponseDTO> fetchAllApplications() {
        return repo.findAll().stream()
                .map(ja -> {
                    Position pos = ja.getPosition();
                    String skills = pos != null && pos.getSkills() != null
                            ? String.join(", ", pos.getSkills())
                            : "N/A";
                    return new ApplicationResponseDTO(
                            ja.getId(),
                            ja.getCompany() != null ? ja.getCompany().getName() : "N/A",
                            pos != null ? pos.getTitle() : null,
                            skills,
                            ja.getJobPortal() != null ? ja.getJobPortal().getName() : "N/A",
                            ja.getConsultancy() != null ? ja.getConsultancy().getName() : "N/A",
                            ja.getCompany() != null ? ja.getCompany().getLocation() : "N/A",
                            ja.getApplicationDate(),
                            ja.getStatus() != null ? ja.getStatus() : "N/A",
                            ja.getSalaryOffered(),
                            pos != null ? pos.getJobType() : "N/A",
                            pos != null ? pos.getEmploymentType() : "N/A",
                            pos != null ? pos.getId() : null // <-- include positionId

                    );
                })
                .collect(Collectors.toList());
    }

}
