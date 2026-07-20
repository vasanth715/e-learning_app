package com.edusphere.service;

import com.edusphere.enrollment.Enrollment;
import com.edusphere.course.Course;
import com.edusphere.course.Section;
import com.edusphere.certificate.Certificate;
import com.edusphere.user.User;
import com.edusphere.repository.EnrollmentRepository;
import com.edusphere.repository.CourseRepository;
import com.edusphere.repository.CertificateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final CertificateRepository certificateRepository;

    public Enrollment enroll(User user, Long courseId) {
        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(user.getId(), courseId);
        if (existing.isPresent()) {
            return existing.get();
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + courseId));

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .progressPercent(0)
                .status("active")
                .enrolledDate(LocalDate.now())
                .build();

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment getEnrollment(Long userId, Long courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new IllegalArgumentException("No enrollment found for user ID " + userId + " and course ID " + courseId));
    }

    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public Enrollment completeLesson(Long enrollmentId, String lessonId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment not found with id: " + enrollmentId));

        if (!enrollment.getCompletedLessonIds().contains(lessonId)) {
            enrollment.getCompletedLessonIds().add(lessonId);
        }

        // Calculate progress percentage
        int totalLessons = 0;
        for (Section section : enrollment.getCourse().getSections()) {
            totalLessons += section.getLessons().size();
        }

        if (totalLessons > 0) {
            int pct = (enrollment.getCompletedLessonIds().size() * 100) / totalLessons;
            enrollment.setProgressPercent(Math.min(100, pct));
        } else {
            enrollment.setProgressPercent(100);
        }

        if (enrollment.getProgressPercent() >= 100 && !"completed".equals(enrollment.getStatus())) {
            enrollment.setStatus("completed");
            
            // Issue Certificate automatically
            Certificate cert = Certificate.builder()
                    .credentialId("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                    .user(enrollment.getUser())
                    .course(enrollment.getCourse())
                    .issueDate(LocalDate.now())
                    .build();
            certificateRepository.save(cert);
        }

        return enrollmentRepository.save(enrollment);
    }
}
