package com.laraid.job_app_tracker.dto;

import lombok.Data;

@Data
public class JobPortalDto {
    private Long id;
    private String name;
    private String url;
    private String contactEmail;
    private Boolean active;

    // getters and setters
}

