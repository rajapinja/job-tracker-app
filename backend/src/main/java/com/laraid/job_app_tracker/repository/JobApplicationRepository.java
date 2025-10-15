package com.laraid.job_app_tracker.repository;

import com.laraid.job_app_tracker.dto.ApplicationResponseDTO;
import com.laraid.job_app_tracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

//    @Query("""
//    SELECT
//        ja.id AS id,
//        COALESCE(c.name, 'N/A') AS companyName,
//        COALESCE(p.title, 'N/A') AS position,
//        COALESCE(jp.name, 'N/A') AS portalName,
//        COALESCE(con.name, 'N/A') AS consultancyName,
//        COALESCE(c.location, 'N/A') AS city,
//        ja.applicationDate AS dateApplied,
//        COALESCE(ja.status, 'N/A') AS status,
//        COALESCE(p.jobType, 'N/A') AS jobType,
//        COALESCE(p.employmentType, 'N/A') AS employmentType
//    FROM JobApplication ja
//        LEFT JOIN ja.company c
//        LEFT JOIN ja.position p
//        LEFT JOIN ja.jobPortal jp
//        LEFT JOIN ja.consultancy con
//""")
//    List<ApplicationResponseDTO> fetchAllApplications();
//@Query("""
//    SELECT new com.laraid.job_app_tracker.dto.ApplicationResponseDTO(
//        ja.id,
//        COALESCE(c.name, 'N/A'),
//        COALESCE(p.title, 'N/A'),
//        COALESCE(jp.name, 'N/A'),
//        COALESCE(con.name, 'N/A'),
//        COALESCE(c.location, 'N/A'),
//        ja.applicationDate,
//        COALESCE(ja.status, 'N/A'),
//        COALESCE(p.jobType, 'N/A'),
//        COALESCE(p.employmentType, 'N/A')
//    )
//    FROM JobApplication ja
//        LEFT JOIN ja.company c
//        LEFT JOIN ja.position p
//        LEFT JOIN ja.jobPortal jp
//        LEFT JOIN ja.consultancy con
//""")
//List<ApplicationResponseDTO> fetchAllApplications();


}
