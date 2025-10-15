package com.laraid.job_app_tracker.controller;

import com.laraid.job_app_tracker.dto.CompanyDetailsDTO;
import com.laraid.job_app_tracker.dto.CompanyDto;
import com.laraid.job_app_tracker.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @GetMapping
    public List<CompanyDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public CompanyDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public CompanyDto create(@RequestBody CompanyDto company) {
        return service.create(company);
    }

    @PutMapping("/{id}")
    public CompanyDto update(@PathVariable Long id, @RequestBody CompanyDto company) {
        return service.update(id, company);
    }

    @PatchMapping
    public CompanyDto patchCompany(@RequestBody CompanyDto company){
        return service.patchCompany(company);
    }

    @GetMapping("/company/{id}/details")
    public ResponseEntity<CompanyDetailsDTO> getCompanyDetails(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCompanyDetails(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

