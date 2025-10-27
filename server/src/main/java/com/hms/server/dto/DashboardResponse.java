package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    // Stats Cards
    private StatsData stats;

    // Graph Data
    private GraphData graphs;

    // Today's Appointments
    private List<TodayAppointmentData> todayAppointments;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatsData {
        private Long totalPatients;
        private Long totalAppointments;
        private Long completedAppointments;
        private Long missedAppointments;
        private Long pendingAppointments;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GraphData {
        private List<VisitByDayData> visitsByDay;
        private List<GenderDistributionData> genderDistribution;

        // --- ADDED ---
        private List<AgeDistributionData> ageDistribution;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VisitByDayData {
        private String day;  // Monday, Tuesday, etc.
        private Long visits;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GenderDistributionData {
        private String gender;  // Male, Female, Other
        private Long count;
        private Double percentage;
    }

    // --- NEW DTO CLASS ADDED ---
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AgeDistributionData {
        private String ageGroup; // e.g., "0-19", "20-39"
        private Long count;
    }
    // --- END OF NEW DTO CLASS ---

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TodayAppointmentData {
        private Long id;
        private String patientName;
        private String time;
        private String status;
        private String mobile;
    }
}
