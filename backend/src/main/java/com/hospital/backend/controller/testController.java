package com.hospital.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    @GetMapping("/")
    public String home() {
        return "Hospital Management System Backend is Running";
    }

    @GetMapping("/test")
    public String test() {
        return "Backend connected successfully";
    }
}