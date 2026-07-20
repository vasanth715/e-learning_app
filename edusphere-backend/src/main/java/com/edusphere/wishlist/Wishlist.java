package com.edusphere.wishlist;

import com.edusphere.core.BaseEntity;
import com.edusphere.course.Course;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "wishlists")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Wishlist extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}
