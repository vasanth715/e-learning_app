package com.edusphere.enrollment;

import com.edusphere.core.BaseEntity;
import com.edusphere.course.Course;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "enrollments")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Enrollment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Builder.Default
    private int progressPercent = 0;

    @Builder.Default
    private String status = "active"; // active, completed

    private LocalDate enrolledDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "enrollment_completed_lessons", joinColumns = @JoinColumn(name = "enrollment_id"))
    @Column(name = "lesson_id")
    @Builder.Default
    private List<String> completedLessonIds = new ArrayList<>();
}
