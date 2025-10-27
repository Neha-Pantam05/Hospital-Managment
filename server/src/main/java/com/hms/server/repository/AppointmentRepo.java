package com.hms.server.repository;

import com.hms.server.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepo  extends JpaRepository<Appointment, Long> {
    long countByStatus(String status);
    List<Appointment> findByDateOrderByTimeAsc(LocalDate date);
    @Query("SELECT FUNCTION('DAYOFWEEK', a.date), COUNT(a.id) FROM Appointment a " +
            "WHERE a.date >= ?1 GROUP BY FUNCTION('DAYOFWEEK', a.date) ORDER BY FUNCTION('DAYOFWEEK', a.date)")
    List<Object[]> countAppointmentsByDayOfWeekForLastWeek(LocalDate startDate);
    List<Appointment> findByDate(LocalDate date);

}
