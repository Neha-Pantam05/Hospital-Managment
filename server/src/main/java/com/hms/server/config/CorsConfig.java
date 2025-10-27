package com.hms.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS to all paths
                .allowedOrigins("http://localhost:3000") // Explicitly allow your Next.js origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all methods
                .allowedHeaders("Authorization", "Content-Type") // Explicitly allow these custom headers
                .allowCredentials(true); // Must be true since you're using authentication
    }
}