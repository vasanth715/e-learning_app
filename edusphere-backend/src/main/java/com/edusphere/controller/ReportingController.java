package com.edusphere.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportingController {

    @GetMapping("/students")
    public ResponseEntity<String> getStudentReport() {
        String csv = "Student ID,Student Name,Enrollment Count,Certificates,XP,Streak\n" +
                "1,Ed Student,1,1,450,3\n" +
                "2,Sample User,0,0,0,0\n";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=students_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }

    @GetMapping("/earnings")
    public ResponseEntity<String> getEarningsReport() {
        String csv = "Transaction ID,Course Name,Date,Amount,Platform Fee,Payout\n" +
                "txn_8a9f02c,Spring Boot Development,2026-07-19,49.99,4.99,45.00\n" +
                "txn_b2e3f4a,Tailwind Layouts,2026-07-18,29.99,2.99,27.00\n";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=earnings_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }
}
