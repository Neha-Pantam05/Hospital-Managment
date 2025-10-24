package com.hms.server.service;

import com.hms.server.dto.MedicalRecordRequest;
import com.hms.server.entity.MedicalRecord;
import com.hms.server.entity.Patient;
import com.hms.server.repository.MedicalRecordRepo;
import com.hms.server.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MedicalRecordService {
    @Autowired
    MedicalRecordRepo medicalRecordRepo;

    @Autowired
    PatientRepo patientRepo;

    public List<MedicalRecord> getPatientMedicalRecords(Long patientId) {
        Patient patient = patientRepo.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));
        return medicalRecordRepo.findByPatientId(patientId);
    }

    public MedicalRecord createMedicalRecord(MedicalRecordRequest request) {
        Patient patient = patientRepo.findById(request.getPatientId()).orElseThrow(() -> new RuntimeException("Patient not found"));

        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(patient);
        medicalRecord.setNote(request.getNote());
        medicalRecord.setMedicines(request.getMedicines());
        medicalRecord.setDiagnosis(request.getDiagnosis());
        medicalRecord.setVisitedAt(request.getVisitDate());

        patient.setLastVisited(LocalDate.now());
        patientRepo.save(patient);

        return medicalRecordRepo.save(medicalRecord);
    }
    public void deleteRecord(Long id) {
        MedicalRecord record = medicalRecordRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
        medicalRecordRepo.delete(record);
    }
}
