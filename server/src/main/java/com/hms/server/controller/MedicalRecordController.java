package com.hms.server.controller;

import com.hms.server.dto.MedicalRecordRequest;
import com.hms.server.entity.MedicalRecord;
import com.hms.server.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")

public class MedicalRecordController {
    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getPatientMedicalRecords(@PathVariable("patientId") Long patientId) {
        return ResponseEntity.ok(medicalRecordService.getPatientMedicalRecords(patientId));
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createRecord(@RequestBody MedicalRecordRequest request) {
        return ResponseEntity.ok(medicalRecordService.createMedicalRecord(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        medicalRecordService.deleteRecord(id);
        return ResponseEntity.ok().build();
    }

}
