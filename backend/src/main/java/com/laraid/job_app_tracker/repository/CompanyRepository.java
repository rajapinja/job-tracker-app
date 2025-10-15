package com.laraid.job_app_tracker.repository;

import com.laraid.job_app_tracker.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
//    Optional<Company> findByName(String companyName);
}
