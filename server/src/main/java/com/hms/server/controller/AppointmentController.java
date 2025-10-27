package com.hms.server.controller;

import com.hms.server.dto.AppointmentRequest;
import com.hms.server.entity.Appointment;
import com.hms.server.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")

public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointment() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest request) {
        IO.print(request);
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable("id") Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable("id") Long id, @RequestBody String status) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, status));
    }

}
