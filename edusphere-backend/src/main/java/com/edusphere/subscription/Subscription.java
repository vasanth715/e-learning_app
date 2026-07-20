package com.edusphere.subscription;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDate;

@Entity
@Table(name = "subscriptions")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Subscription extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String planType; // individual, corporate

    @Column(nullable = false)
    private String status; // active, cancelled, expired

    private LocalDate startDate;
    private LocalDate endDate;
}
