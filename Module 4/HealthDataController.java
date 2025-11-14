package com.fitmate.controller;

import com.fitmate.model.HealthData;
import com.fitmate.service.HealthDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health")
@CrossOrigin("*")
public class HealthDataController {

    private final HealthDataService service;

    public HealthDataController(HealthDataService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public HealthData submit(@RequestBody HealthData data) {
        return service.saveData(data);
    }

    @GetMapping("/all")
    public List<HealthData> getAll() {
        return service.getAllData();
    }

    @GetMapping("/{id}")
    public HealthData getOne(@PathVariable Long id) {
        return service.getSingleRecord(id);
    }
}
