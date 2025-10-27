package com.hms.server.dto;

import lombok.Data;

@Data
public class GenderDistribution {
    private String gender; // e.g., "Male", "Female", "Other"
    private long count;

    public GenderDistribution(String gender, long count) {
        this.gender = gender;
        this.count = count;
    }
}
