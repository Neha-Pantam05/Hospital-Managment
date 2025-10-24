package com.hms.server.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Medicine {
    private  String medicineName;
    private  String medicineType;
}
