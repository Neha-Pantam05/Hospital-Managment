package com.hms.server.controller;

import com.hms.server.dto.PatientRequest;
import com.hms.server.entity.Patient;
import com.hms.server.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")

public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatient());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody PatientRequest request
    ) {
        return ResponseEntity.ok(patientService.createPatient(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("id") Long id, @RequestBody PatientRequest request) {
        return ResponseEntity.ok(patientService.updatePatient(id, request));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable("id") Long id) {
       patientService.deletePatient(id);
       return ResponseEntity.ok().build();
    }
}
