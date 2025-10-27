package com.hms.server.controller;

import com.hms.server.service.DashboardService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<com.hospital.dto.DashboardResponse> getDashboardData() {
        return ResponseEntity.ok(dashboardService.getDashboardData());
    }
}