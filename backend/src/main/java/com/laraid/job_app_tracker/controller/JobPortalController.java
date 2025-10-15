package com.laraid.job_app_tracker.controller;

import com.laraid.job_app_tracker.dto.JobPortalDto;
import com.laraid.job_app_tracker.service.JobPortalService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/job-portals")
public class JobPortalController {

    private final JobPortalService service;

    public JobPortalController(JobPortalService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobPortalDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public JobPortalDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public JobPortalDto create(@RequestBody JobPortalDto dto) {
        return service.create(dto);
    }

    @PutMapping
    public JobPortalDto update(@RequestBody JobPortalDto dto) {
        return service.update(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

