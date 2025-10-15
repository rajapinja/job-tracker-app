package com.laraid.job_app_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "job_acknowledgments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobAcknowledgment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private String position;
    private String jobId;
    private String userName;
    private String code;
    private String email;
    private String status; // e.g., Acknowledged, Interview Scheduled, Offer, Rejected


    @Column(name = "date_received")
    private LocalDate dateReceived;

    @Column(length = 1000)
    private String notes;
}

