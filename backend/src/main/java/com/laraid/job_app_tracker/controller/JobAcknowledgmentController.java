package com.laraid.job_app_tracker.controller;

import com.laraid.job_app_tracker.model.JobAcknowledgment;
import com.laraid.job_app_tracker.repository.JobAcknowledgmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/acknowledgments")
@RequiredArgsConstructor
public class JobAcknowledgmentController {

    private final JobAcknowledgmentRepository repo;

    @GetMapping
    public List<JobAcknowledgment> getAll() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "dateReceived"));
    }

    @PostMapping
    public JobAcknowledgment create(@RequestBody JobAcknowledgment ack) {
        return repo.save(ack);
    }

    @PutMapping("/{id}")
    public JobAcknowledgment update(@PathVariable Long id, @RequestBody JobAcknowledgment ack) {
        ack.setId(id);
        return repo.save(ack);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
