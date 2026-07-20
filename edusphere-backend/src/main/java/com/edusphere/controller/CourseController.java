package com.edusphere.controller;

import com.edusphere.course.Course;
import com.edusphere.user.User;
import com.edusphere.service.CourseService;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseService courseService;
    private final AuthService authService;

    @GetMapping("/courses")
    public ResponseEntity<PageResponse<Course>> getCatalog(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        
        List<Course> list = courseService.getCatalog(category, q);
        return ResponseEntity.ok(new PageResponse<>(list));
    }

    @PostMapping("/instructor/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        User user = authService.getCurrentUser();
        Course created = courseService.createCourse(user, course);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/admin/courses/{id}/approve")
    public ResponseEntity<Course> approveCourse(@PathVariable Long id) {
        Course approved = courseService.approveCourse(id);
        return ResponseEntity.ok(approved);
    }

    @Getter
    @RequiredArgsConstructor
    public static class PageResponse<T> {
        private final List<T> content;
        public int getTotalPages() { return 1; }
        public long getTotalElements() { return content.size(); }
    }
}
