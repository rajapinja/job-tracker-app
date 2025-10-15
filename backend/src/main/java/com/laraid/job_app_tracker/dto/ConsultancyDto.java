package com.laraid.job_app_tracker.dto;

import lombok.Data;

@Data
public class ConsultancyDto {
    private Long id;
    private String name;
    private String contactPerson;
    private String email;
    private String phone;
    private String specialization;

    // getters and setters
}

