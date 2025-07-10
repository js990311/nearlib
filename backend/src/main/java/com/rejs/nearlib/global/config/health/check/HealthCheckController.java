package com.rejs.nearlib.global.config.health.check;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/health")
    public ResponseEntity<String> getHealthCheck(){
        return ResponseEntity.ok("OK");
    }
}
