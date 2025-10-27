package com.hms.server.dto;

import lombok.Data;

@Data
public class DailyAppointmentsSummary {
    private String dayOfWeek; // e.g., "Monday"
    private long appointmentCount;

    public DailyAppointmentsSummary(String dayOfWeek, long appointmentCount) {
        this.dayOfWeek = dayOfWeek;
        this.appointmentCount = appointmentCount;
    }
}
