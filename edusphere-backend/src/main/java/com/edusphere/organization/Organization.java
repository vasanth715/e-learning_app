package com.edusphere.organization;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "organizations")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Organization extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String domainName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Builder.Default
    private int seatCount = 0;

    @Builder.Default
    private int seatOccupied = 0;
}
