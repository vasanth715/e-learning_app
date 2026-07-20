package com.edusphere.subscription;

import com.edusphere.user.User;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@CrossOrigin
public class SubscriptionController {

    private final SubscriptionRepository subscriptionRepository;
    private final AuthService authService;

    @GetMapping("/my")
    public ResponseEntity<Subscription> getMySubscription() {
        User user = authService.getCurrentUser();
        return subscriptionRepository.findByUserIdAndStatus(user.getId(), "active")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Subscription> subscribe(@RequestBody SubscribeRequest request) {
        User user = authService.getCurrentUser();
        
        // Deactivate previous active subscription if any
        subscriptionRepository.findByUserIdAndStatus(user.getId(), "active").ifPresent(sub -> {
            sub.setStatus("expired");
            subscriptionRepository.save(sub);
        });

        Subscription subscription = Subscription.builder()
                .user(user)
                .planType(request.getPlanType())
                .status("active")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusYears(1))
                .build();

        return ResponseEntity.ok(subscriptionRepository.save(subscription));
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class SubscribeRequest {
        private String planType;
    }
}
