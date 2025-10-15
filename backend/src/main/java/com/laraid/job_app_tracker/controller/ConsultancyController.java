package com.laraid.job_app_tracker.controller;

import com.laraid.job_app_tracker.dto.ConsultancyDto;
import com.laraid.job_app_tracker.model.Consultancy;
import com.laraid.job_app_tracker.service.ConsultancyService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/consultancies")
public class ConsultancyController {

    private final ConsultancyService service;

    public ConsultancyController(ConsultancyService service) {
        this.service = service;
    }

    @GetMapping
    public List<ConsultancyDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ConsultancyDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ConsultancyDto create(@RequestBody ConsultancyDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ConsultancyDto update(@RequestBody ConsultancyDto dto) {
        return service.update(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
