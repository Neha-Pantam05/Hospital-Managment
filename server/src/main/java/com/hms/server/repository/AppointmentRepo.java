package com.hms.server.repository;

import com.hms.server.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo  extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDate(LocalDate date);

}
