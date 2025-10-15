package com.laraid.job_app_tracker.repository;

import com.laraid.job_app_tracker.model.JobAcknowledgment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobAcknowledgmentRepository extends JpaRepository<JobAcknowledgment, Long> {}

