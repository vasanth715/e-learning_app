package com.edusphere.controller;

import com.edusphere.user.User;
import com.edusphere.service.AuthService;
import com.edusphere.repository.EnrollmentRepository;
import com.edusphere.repository.CertificateRepository;
import com.edusphere.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin
public class AnalyticsController {

    private final AuthService authService;
    private final EnrollmentRepository enrollmentRepository;
    private final CertificateRepository certificateRepository;
    private final CourseRepository courseRepository;

    @GetMapping("/student")
    public ResponseEntity<Map<String, Object>> getStudentAnalytics() {
        User user = authService.getCurrentUser();
        long enrollCount = enrollmentRepository.findByUserId(user.getId()).size();
        long certCount = certificateRepository.findByUserId(user.getId()).size();

        Map<String, Object> data = new HashMap<>();
        data.put("xp", user.getXp());
        data.put("streak", user.getStreak());
        data.put("enrolledCourses", enrollCount);
        data.put("certificatesAwarded", certCount);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/instructor")
    public ResponseEntity<Map<String, Object>> getInstructorAnalytics() {
        User user = authService.getCurrentUser();
        long courseCount = courseRepository.findByInstructorId(user.getId()).size();

        Map<String, Object> data = new HashMap<>();
        data.put("totalStudents", user.getTotalStudents());
        data.put("instructorRating", user.getInstructorRating());
        data.put("totalCourses", courseCount);
        data.put("totalEarnings", user.getTotalStudents() * 24.99); // simulated payout average
        return ResponseEntity.ok(data);
    }
}
