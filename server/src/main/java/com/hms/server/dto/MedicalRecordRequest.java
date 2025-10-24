package com.hms.server.dto;

import com.hms.server.entity.Medicine;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MedicalRecordRequest {
    private Long patientId;
    private LocalDate visitDate;
    private  String diagnosis;
    private List<Medicine> medicines;
    private String note;
}
