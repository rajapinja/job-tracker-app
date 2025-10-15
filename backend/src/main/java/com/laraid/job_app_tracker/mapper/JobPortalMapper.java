package com.laraid.job_app_tracker.mapper;

import com.laraid.job_app_tracker.dto.JobPortalDto;
import com.laraid.job_app_tracker.model.JobPortal;
import org.springframework.stereotype.Component;

@Component
public class JobPortalMapper {
    public JobPortal dtoToModel(JobPortalDto dto) {
        JobPortal portal = new JobPortal();
        portal.setId(dto.getId());
        portal.setName(dto.getName());
        portal.setUrl(dto.getUrl());
        portal.setContactEmail(dto.getContactEmail());
        portal.setActive(dto.getActive());
        return portal;
    }

    public JobPortalDto modelToDto(JobPortal portal) {
        JobPortalDto dto = new JobPortalDto();
        dto.setId(portal.getId());
        dto.setName(portal.getName());
        dto.setUrl(portal.getUrl());
        dto.setContactEmail(portal.getContactEmail());
        dto.setActive(portal.getActive());
        return dto;
    }
}

