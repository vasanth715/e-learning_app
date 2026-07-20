package com.edusphere.controller;

import com.edusphere.cart.Order;
import com.edusphere.user.User;
import com.edusphere.repository.OrderRepository;
import com.edusphere.service.AuthService;
import com.edusphere.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderRepository orderRepository;
    private final AuthService authService;
    private final EnrollmentService enrollmentService;

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(@RequestBody CheckoutRequest request) {
        User user = authService.getCurrentUser();

        Order order = Order.builder()
                .user(user)
                .totalAmount(request.getTotalAmount())
                .currency("USD")
                .status("completed")
                .paymentMethod(request.getPaymentMethod())
                .transactionId("txn_" + UUID.randomUUID().toString().substring(0, 8))
                .courseIds(request.getCourseIds())
                .build();

        Order saved = orderRepository.save(order);

        // Auto enroll the user in each course purchased
        if (request.getCourseIds() != null) {
            for (Long cid : request.getCourseIds()) {
                try {
                    enrollmentService.enroll(user, cid);
                } catch (Exception e) {
                    System.err.println("Enrollment warning for course id " + cid + ": " + e.getMessage());
                }
            }
        }

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders() {
        User user = authService.getCurrentUser();
        List<Order> list = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return ResponseEntity.ok(list);
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class CheckoutRequest {
        private List<Long> courseIds;
        private double totalAmount;
        private String paymentMethod;
    }
}
