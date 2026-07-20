package com.edusphere.repository;

import com.edusphere.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByStatus(String status);
    List<Course> findByCategoryAndStatus(String category, String status);
    List<Course> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String queryTitle, String queryDesc);
    List<Course> findByInstructorId(Long instructorId);
}
