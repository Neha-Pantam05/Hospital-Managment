package com.hms.server.service;

import com.hms.server.entity.Appointment;
import com.hms.server.entity.Patient;
import com.hms.server.repository.AppointmentRepo;
import com.hms.server.repository.DashboardRepository;
import com.hms.server.repository.PatientRepo;
import com.hospital.dto.DashboardResponse; // <-- FIX 1: ADD THIS IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private PatientRepo patientRepository;

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private DashboardRepository dashboardRepository;

    public DashboardResponse getDashboardData() {
        DashboardResponse response = new DashboardResponse();
        response.setStats(getStats());
        response.setGraphs(getGraphData());
        response.setTodayAppointments(getTodayAppointments());
        return response;
    }

    private DashboardResponse.StatsData getStats() {
        Long totalPatients = patientRepository.count();
        Long totalAppointments = appointmentRepository.count();
        Long completedAppointments = dashboardRepository.countByStatus("Completed");
        Long missedAppointments = dashboardRepository.countByStatus("Missed");
        Long pendingAppointments = dashboardRepository.countByStatus("Pending");

        return new DashboardResponse.StatsData(
                totalPatients,
                totalAppointments,
                completedAppointments != null ? completedAppointments : 0L,
                missedAppointments != null ? missedAppointments : 0L,
                pendingAppointments != null ? pendingAppointments : 0L
        );
    }

    // FIX 2: Use the imported class (DashboardResponse.GraphData)
    private DashboardResponse.GraphData getGraphData() {
        List<DashboardResponse.VisitByDayData> visitsByDay = getVisitsByDay();
        // FIX 3: Use the imported class (DashboardResponse.GenderDistributionData)
        List<DashboardResponse.GenderDistributionData> genderDistribution = getGenderDistribution();
        // ADDED:
        List<DashboardResponse.AgeDistributionData> ageDistribution = getAgeDistribution();

        // UPDATED CONSTRUCTOR:
        return new DashboardResponse.GraphData(visitsByDay, genderDistribution, ageDistribution);
    }

    private List<DashboardResponse.VisitByDayData> getVisitsByDay() {
        LocalDate startDate = LocalDate.now().minusDays(6); // Last 7 days
        List<Object[]> results = dashboardRepository.countPatientVisitsByDayOfWeek(startDate);

        List<String> daysOfWeek = Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        List<DashboardResponse.VisitByDayData> visitsByDay = new ArrayList<>();

        for (String day : daysOfWeek) {
            visitsByDay.add(new DashboardResponse.VisitByDayData(day, 0L));
        }

        for (Object[] result : results) {
            String day = (String) result[0];
            Long count = ((Number) result[1]).longValue();

            for (DashboardResponse.VisitByDayData visitData : visitsByDay) {
                if (visitData.getDay().equalsIgnoreCase(day)) {
                    visitData.setVisits(count);
                    break;
                }
            }
        }
        return visitsByDay;
    }

    // FIX 4: Use the imported class (DashboardResponse.GenderDistributionData)
    private List<DashboardResponse.GenderDistributionData> getGenderDistribution() {
        List<Object[]> results = patientRepository.countByGender();
        Long totalPatients = patientRepository.count();

        if (totalPatients == 0) {
            return new ArrayList<>();
        }

        return results.stream()
                .map(result -> {
                    String gender = (String) result[0];
                    Long count = ((Number) result[1]).longValue();
                    Double percentage = (count * 100.0) / totalPatients;
                    return new DashboardResponse.GenderDistributionData(gender, count, Math.round(percentage * 100.0) / 100.0);
                })
                .collect(Collectors.toList());
    }

    // --- NEW METHOD (Corrected) ---
    /**
     * Calculates the patient distribution across predefined age groups.
     * Fetches all patients and processes them in Java.
     */
    // FIX 5: Use the imported class (DashboardResponse.AgeDistributionData)
    private List<DashboardResponse.AgeDistributionData> getAgeDistribution() {
        List<Patient> patients = patientRepository.findAll();
        if (patients.isEmpty()) {
            return new ArrayList<>();
        }

        Map<String, Long> ageGroupMap = patients.stream()
                .collect(Collectors.groupingBy(
                        patient -> mapAgeToGroup(patient.getAge()),
                        Collectors.counting()
                ));

        return ageGroupMap.entrySet().stream()
                // FIX 6: Use the imported class (DashboardResponse.AgeDistributionData)
                .map(entry -> new DashboardResponse.AgeDistributionData(entry.getKey(), entry.getValue()))
                .sorted((a, b) -> a.getAgeGroup().compareTo(b.getAgeGroup()))
                .collect(Collectors.toList());
    }

    /**
     * Helper method to map a patient's age to a specific group.
     */
    private String mapAgeToGroup(int age) {
        if (age <= 19) {
            return "0-19";
        } else if (age <= 39) {
            return "20-39";
        } else if (age <= 59) {
            return "40-59";
        } else {
            return "60+";
        }
    }
    // --- END OF NEW METHOD ---

    private List<DashboardResponse.TodayAppointmentData> getTodayAppointments() {
        LocalDate today = LocalDate.now();
        List<Appointment> appointments = dashboardRepository.findByDateOrderByTimeAsc(today);

        return appointments.stream()
                // FIX 7: Use the imported class (DashboardResponse.TodayAppointmentData)
                .map(appointment -> new DashboardResponse.TodayAppointmentData(
                        appointment.getId(),
                        appointment.getPatientName(),
                        appointment.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        appointment.getStatus(),
                        String.valueOf(appointment.getMob())
                ))
                .collect(Collectors.toList());
    }
}

