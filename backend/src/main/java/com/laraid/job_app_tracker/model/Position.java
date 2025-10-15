package com.laraid.job_app_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Position {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String experienceLevel;
    private String salaryRange;
    private String jobType; // Remote, Hybrid, Office
    private String employmentType; //FullTime, Contract
    private String department;

    @ElementCollection
    @CollectionTable(name = "position_skills", joinColumns = @JoinColumn(name = "position_id"))
    @Column(name = "skill")
    private Set<String> skills; // e.g. "Java", "Spring Boot", "Kafka"

    @Lob
    @Column(name = "job_description")
    private String jobDescription; // stored as CLOB

    @Lob
    @Column(name = "practice_answer")
    private String practiceAnswer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")  // 👈 foreign key column in DB
    private Company company;
}
