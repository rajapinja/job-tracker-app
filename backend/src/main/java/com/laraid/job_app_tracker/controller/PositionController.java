package com.laraid.job_app_tracker.controller;

import com.laraid.job_app_tracker.dto.PositionDetailsDTO;
import com.laraid.job_app_tracker.dto.PositionDto;
import com.laraid.job_app_tracker.dto.PositionUpdateDTO;
import com.laraid.job_app_tracker.model.Position;
import com.laraid.job_app_tracker.service.PositionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/positions")
public class PositionController {

    private final PositionService service;

    public PositionController(PositionService service) {
        this.service = service;
    }

    @GetMapping
    public List<PositionDto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public PositionDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public PositionDto create(@RequestBody PositionDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public PositionDto update(@PathVariable Long id, @RequestBody Position position) {
        return service.update(id, position);
    }

    @PatchMapping
    public ResponseEntity<PositionDetailsDTO> updatePosition(@RequestBody PositionUpdateDTO payload) {
        PositionDetailsDTO updated = service.updatePosition(payload);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/job-details/{id}")
    public ResponseEntity<PositionDetailsDTO> getPositionDetails(@PathVariable Long id) {
         PositionDetailsDTO details  = service.getPositionDetails(id);
        return ResponseEntity.ok(details);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
