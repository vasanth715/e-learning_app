package com.edusphere.course;

import com.edusphere.core.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "lessons")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Lesson extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;

    @Column(nullable = false)
    private String title;

    @Builder.Default
    private String type = "video"; // video, quiz, article, live

    private String duration;
    private String videoUrl;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Builder.Default
    private boolean preview = false;

    @Builder.Default
    private int orderIndex = 0;
}
