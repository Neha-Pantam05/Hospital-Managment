package com.hms.server.controller;

import com.hms.server.dto.AuthResponse;
import com.hms.server.dto.LoginRequest;
import com.hms.server.dto.RegisterRequest;
import com.hms.server.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public  ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return  ResponseEntity.ok(authService.login(request));
    }

}
