package com.hms.server.service;

import com.hms.server.dto.PatientRequest;
import com.hms.server.entity.Patient;
import com.hms.server.repository.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;

    public List<Patient> getAllPatient() {
        return patientRepo.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepo.findById(id).orElseThrow(() -> new RuntimeException(("Patient not found")));
    }

    public Patient createPatient(PatientRequest request) {
        if (patientRepo.existsByMob(request.getMob())) {
            throw new RuntimeException("Mobile number already present");
        }

        Patient patient = new Patient();

        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setMob(request.getMob());
        patient.setName(request.getName());
        patient.setLastVisited(LocalDate.now());

        return patientRepo.save(patient);

    }

    public Patient updatePatient(Long id, PatientRequest request) {
        Patient patient = getPatientById(id);
        patient.setName(request.getName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setMob(request.getMob());


        return patientRepo.save(patient);
    }

    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);
        patientRepo.delete(patient);
    }

}
