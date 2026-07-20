package com.edusphere.controller;

import com.edusphere.notification.Notification;
import com.edusphere.user.User;
import com.edusphere.repository.NotificationRepository;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications() {
        User user = authService.getCurrentUser();
        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount() {
        User user = authService.getCurrentUser();
        long count = notificationRepository.countByUserIdAndReadFalse(user.getId());
        return ResponseEntity.ok(count);
    }

    @PostMapping("/mark-read")
    @Transactional
    public ResponseEntity<Void> markAllRead() {
        User user = authService.getCurrentUser();
        notificationRepository.markAllReadByUser(user.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/read")
    @Transactional
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found with id: " + id));
        notification.setRead(true);
        Notification saved = notificationRepository.save(notification);
        return ResponseEntity.ok(saved);
    }
}
