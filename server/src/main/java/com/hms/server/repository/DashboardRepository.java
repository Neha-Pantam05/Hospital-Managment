package com.hms.server.repository;

import com.hms.server.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Appointment, Long> {

    // Count appointments by status
    Long countByStatus(String status);

    // Get today's appointments
    List<Appointment> findByDateOrderByTimeAsc(LocalDate date);

    // Count appointments by day of week (last 7 days)
// In your DashboardRepository
    @Query("SELECT " +
            "CASE " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 1 THEN 'Sunday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 2 THEN 'Monday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 3 THEN 'Tuesday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 4 THEN 'Wednesday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 5 THEN 'Thursday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 6 THEN 'Friday' " +
            "WHEN FUNCTION('DAYOFWEEK', p.lastVisited) = 7 THEN 'Saturday' " +
            "END as day, " +
            "COUNT(p) as count " +
            "FROM Patient p " +
            "WHERE p.lastVisited >= :startDate " +
            "GROUP BY FUNCTION('DAYOFWEEK', p.lastVisited)")
    List<Object[]> countPatientVisitsByDayOfWeek(LocalDate startDate);
}