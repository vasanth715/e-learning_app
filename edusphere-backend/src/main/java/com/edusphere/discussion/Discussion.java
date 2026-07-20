package com.edusphere.discussion;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "discussions")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Discussion extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "lesson_id")
    private Long lessonId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    @Builder.Default
    private int votes = 0;
}
