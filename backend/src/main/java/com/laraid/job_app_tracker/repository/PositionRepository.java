package com.laraid.job_app_tracker.repository;

import com.laraid.job_app_tracker.dto.PositionDetailsDTO;
import com.laraid.job_app_tracker.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Optional<Position> findByTitle(String positionTitle);

    List<Position> findByCompanyId(Long companyId);
//    Optional<Position> findByName(String positionName);
}
