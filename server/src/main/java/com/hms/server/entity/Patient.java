package com.hms.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity


@Table(name = "patients")
@Data
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String mob;
    private int age;
    private String gender;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private LocalDate lastVisited;

    @OneToMany(mappedBy = "patient",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MedicalRecord> medicalRecordList = new ArrayList<>();
}
