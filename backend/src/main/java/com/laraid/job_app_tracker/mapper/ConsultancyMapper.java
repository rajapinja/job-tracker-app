package com.laraid.job_app_tracker.mapper;

import com.laraid.job_app_tracker.dto.ConsultancyDto;
import com.laraid.job_app_tracker.model.Consultancy;
import org.springframework.stereotype.Component;

@Component
public class ConsultancyMapper {
    public Consultancy dtoToModel(ConsultancyDto dto) {
        Consultancy c = new Consultancy();
        c.setId(dto.getId());
        c.setName(dto.getName());
        c.setContactPerson(dto.getContactPerson());
        c.setEmail(dto.getEmail());
        c.setPhone(dto.getPhone());
        c.setSpecialization(dto.getSpecialization());
        return c;
    }

    public ConsultancyDto modelToDto(Consultancy c) {
        ConsultancyDto dto = new ConsultancyDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setContactPerson(c.getContactPerson());
        dto.setEmail(c.getEmail());
        dto.setPhone(c.getPhone());
        dto.setSpecialization(c.getSpecialization());
        return dto;
    }
}

