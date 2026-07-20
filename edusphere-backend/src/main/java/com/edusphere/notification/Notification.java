package com.edusphere.notification;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "notifications")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Notification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    private String message;

    @Builder.Default
    private String type = "info";

    private String icon;

    @Builder.Default
    private boolean read = false;

    private String actionUrl;
}
