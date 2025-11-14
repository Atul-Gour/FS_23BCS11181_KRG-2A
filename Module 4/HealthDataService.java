package com.fitmate.service;

import com.fitmate.model.HealthData;
import com.fitmate.repository.HealthDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthDataService {

    private final HealthDataRepository repository;

    public HealthDataService(HealthDataRepository repository) {
        this.repository = repository;
    }

    public HealthData saveData(HealthData data) {
        return repository.save(data);
    }

    public List<HealthData> getAllData() {
        return repository.findAll();
    }

    public HealthData getSingleRecord(Long id) {
        return repository.findById(id).orElse(null);
    }
}
