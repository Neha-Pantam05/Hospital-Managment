package com.hms.server.service;

import com.hms.server.dto.AppointmentRequest;
import com.hms.server.entity.Appointment;
import com.hms.server.repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    AppointmentRepo appointmentRepo;

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Appointment createAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setMob(Long.parseLong(request.getMobile()));
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setPatientName(request.getPatientName());
        appointment.setStatus("Pending");

        return appointmentRepo.save(appointment);


    }

    public Appointment updateAppointmentStatus(Long id, String status) {
        Appointment appointment = appointmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);

        return appointmentRepo.save(appointment);
    }

    public void deleteAppointment(Long id) {
        Appointment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointmentRepo.delete(appointment);
    }

}
