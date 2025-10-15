package com.laraid.job_app_tracker.dto;

import lombok.Data;

import java.util.Set;

@Data
public class PositionUpdateDTO {
    private Long positionId;
    private String jobDescription;
    private String practiceAnswer;
}
