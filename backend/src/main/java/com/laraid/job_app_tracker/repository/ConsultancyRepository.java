package com.laraid.job_app_tracker.repository;

import com.laraid.job_app_tracker.model.Consultancy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultancyRepository extends JpaRepository<Consultancy, Long> {}