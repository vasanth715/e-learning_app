package com.edusphere.course;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Course extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description")
    private String shortDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @Builder.Default
    private double price = 0.0;

    @Column(name = "original_price")
    private double originalPrice;

    @Builder.Default
    private String level = "Beginner";

    @Column(nullable = false)
    private String category;

    private String subCategory;
    private String thumbnail;
    private String thumbnailGradient;
    private String language;

    @Builder.Default
    private double rating = 0.0;

    @Builder.Default
    private int reviewCount = 0;

    @Builder.Default
    private int students = 0;

    @Builder.Default
    private int totalLessons = 0;

    private String totalDuration;

    @Column(nullable = false)
    @Builder.Default
    private String status = "draft"; // draft, pending_review, published

    @Builder.Default
    private boolean free = false;

    @Builder.Default
    private boolean hasCertificate = true;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private List<Section> sections = new ArrayList<>();
}
