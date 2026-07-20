package com.edusphere.controller;

import com.edusphere.enrollment.Enrollment;
import com.edusphere.user.User;
import com.edusphere.service.EnrollmentService;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
@CrossOrigin
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final AuthService authService;

    @PostMapping("/courses/{courseId}")
    public ResponseEntity<Enrollment> enroll(@PathVariable Long courseId) {
        User user = authService.getCurrentUser();
        Enrollment enrollment = enrollmentService.enroll(user, courseId);
        return ResponseEntity.ok(enrollment);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Enrollment>> getMyEnrollments() {
        User user = authService.getCurrentUser();
        List<Enrollment> list = enrollmentService.getUserEnrollments(user.getId());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/{id}/lessons/{lessonId}/complete")
    public ResponseEntity<EnrollmentResponse> completeLesson(
            @PathVariable Long id,
            @PathVariable String lessonId) {
        Enrollment enrollment = enrollmentService.completeLesson(id, lessonId);
        return ResponseEntity.ok(new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getProgressPercent(),
                enrollment.getStatus(),
                enrollment.getCompletedLessonIds()
        ));
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class EnrollmentResponse {
        private Long id;
        private int progressPercent;
        private String status;
        private List<String> completedLessonIds;
    }
}
