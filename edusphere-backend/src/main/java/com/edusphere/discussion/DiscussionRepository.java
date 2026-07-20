package com.edusphere.discussion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    List<Discussion> findByCourseIdOrderByCreatedAtDesc(Long courseId);
    List<Discussion> findByCourseIdAndLessonIdOrderByCreatedAtDesc(Long courseId, Long lessonId);
}
