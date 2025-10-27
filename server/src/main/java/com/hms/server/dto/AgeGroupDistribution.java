package com.hms.server.dto;

import lombok.Data;

@Data
public class AgeGroupDistribution {
    private String ageGroup; // e.g., "0-19", "20-39", "40-59", "60+"
    private long count;

    public AgeGroupDistribution(String ageGroup, long count) {
        this.ageGroup = ageGroup;
        this.count = count;
    }
}
