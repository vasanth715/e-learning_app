package com.edusphere.service;

import com.edusphere.course.Course;
import com.edusphere.user.User;
import com.edusphere.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getCatalog(String category, String query) {
        List<Course> list = courseRepository.findByStatus("published");
        
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            list = list.stream()
                    .filter(c -> c.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        if (query != null && !query.trim().isEmpty()) {
            String lowerQuery = query.toLowerCase();
            list = list.stream()
                    .filter(c -> c.getTitle().toLowerCase().contains(lowerQuery) || 
                                 c.getDescription().toLowerCase().contains(lowerQuery))
                    .collect(Collectors.toList());
        }

        return list;
    }

    public Course createCourse(User instructor, Course course) {
        course.setInstructor(instructor);
        course.setStatus("pending_review"); // Sent to admins for approval
        return courseRepository.save(course);
    }

    public Course approveCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + courseId));
        course.setStatus("published");
        return courseRepository.save(course);
    }

    public List<Course> getInstructorCourses(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }
}
