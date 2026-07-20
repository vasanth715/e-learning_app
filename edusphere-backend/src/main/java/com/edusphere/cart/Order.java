package com.edusphere.cart;

import com.edusphere.core.BaseEntity;
import com.edusphere.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Order extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder.Default
    private double totalAmount = 0.0;

    @Builder.Default
    private String currency = "USD";

    @Builder.Default
    private String status = "completed"; // pending, completed, refunded

    private String paymentMethod;
    private String transactionId;

    @ElementCollection
    @CollectionTable(name = "order_courses", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "course_id")
    @Builder.Default
    private List<Long> courseIds = new ArrayList<>();
}
