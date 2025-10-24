package com.hms.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String patientName;
    private long mob;
    private LocalDate date;
    private LocalTime time;
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
