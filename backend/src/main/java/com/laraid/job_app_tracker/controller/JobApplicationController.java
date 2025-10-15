package com.laraid.job_app_tracker.controller;


import com.laraid.job_app_tracker.dto.ApplicationResponseDTO;
import com.laraid.job_app_tracker.dto.JobApplicationDto;
import com.laraid.job_app_tracker.dto.JobApplicationRequest;
import com.laraid.job_app_tracker.dto.JobApplicationUpdateDTO;
import com.laraid.job_app_tracker.model.JobApplication;
import com.laraid.job_app_tracker.service.JobApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/apps")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobApplicationDto> listAll() {
        return service.getAll();
    }

    // Without skillSet
    @GetMapping("/all")
    public List<ApplicationResponseDTO> getAllApplications() {
        return service.getAllApplications();
    }

    // Included skillSet
    @GetMapping("/all/data")
    public List<ApplicationResponseDTO> fetchAllApplications() {
        return service.fetchAllApplications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDto> get(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public JobApplicationDto createJobApplication(@RequestBody JobApplicationRequest app) {
        return service.createJobApplication(app);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplication(
            @PathVariable Long id,
            @RequestBody JobApplicationUpdateDTO dto) {

        JobApplication updated = service.updateApplication(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.findById(id).map(existing -> {
            service.delete(id);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
