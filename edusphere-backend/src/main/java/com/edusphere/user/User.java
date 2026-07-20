package com.edusphere.user;

import com.edusphere.core.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Builder.Default
    private Set<String> roles = new HashSet<>();

    @Builder.Default
    private boolean active = true;

    // Student Progress metrics
    @Builder.Default
    private int xp = 0;

    @Builder.Default
    private int streak = 0;

    // Instructor metrics
    @Builder.Default
    private double instructorRating = 0.0;

    @Builder.Default
    private int totalStudents = 0;

    private LocalDate joinDate;
    private String language;
    private String timezone;

    // Profile Details & Avatar
    @Column(columnDefinition = "TEXT")
    private String avatarUrl;
    private String presetAvatar;
    private String phone;
    @Column(columnDefinition = "TEXT")
    private String bio;
    private String headline;
    private String location;
}
