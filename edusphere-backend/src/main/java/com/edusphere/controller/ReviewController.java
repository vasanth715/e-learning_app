package com.edusphere.controller;

import com.edusphere.review.Review;
import com.edusphere.course.Course;
import com.edusphere.user.User;
import com.edusphere.repository.ReviewRepository;
import com.edusphere.repository.CourseRepository;
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
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final CourseRepository courseRepository;
    private final AuthService authService;

    @PostMapping("/{courseId}/reviews")
    public ResponseEntity<Review> submitReview(@PathVariable Long courseId, @RequestBody ReviewRequest request) {
        User user = authService.getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + courseId));

        Review review = Review.builder()
                .course(course)
                .user(user)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        Review saved = reviewRepository.save(review);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{courseId}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable Long courseId) {
        List<Review> list = reviewRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        return ResponseEntity.ok(list);
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class ReviewRequest {
        private int rating;
        private String comment;
    }
}
