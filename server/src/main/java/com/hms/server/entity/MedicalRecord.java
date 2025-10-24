package com.hms.server.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long m_id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Patient patient;
    private String diagnosis;
    @ElementCollection
    @CollectionTable(name = "prescription_medicines",
            joinColumns = @JoinColumn(name = "prescription_id"))
    private List<Medicine> medicines = new ArrayList<>();
    private String note;
    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDate visitedAt;
}
