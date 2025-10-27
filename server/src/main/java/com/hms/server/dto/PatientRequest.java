package com.hms.server.dto;

import lombok.Data;

@Data
public class PatientRequest {
    private String name;
    private String gender;
    private String mob;
    private Integer age;
}
