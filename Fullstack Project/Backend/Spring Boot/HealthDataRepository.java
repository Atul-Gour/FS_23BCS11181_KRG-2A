package com.fitmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitmate.model.HealthData;

public interface HealthDataRepository extends JpaRepository<HealthData, Long> {
}
