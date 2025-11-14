package com.fitmate.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class HealthData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer heartRate;     // bpm
    private Double sleepHours;     // in hours
    private Integer steps;         // step count
    private Double weight;
    private Double height;         // in meters

    public double getBMI() {
        if (height == null || height == 0) return 0;
        return weight / (height * height);
    }
}
