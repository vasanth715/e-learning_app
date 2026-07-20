package com.edusphere.controller;

import com.edusphere.user.User;
import com.edusphere.repository.UserRepository;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin
public class SettingsController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<UserSettingResponse> getSettings() {
        User user = authService.getCurrentUser();
        return ResponseEntity.ok(new UserSettingResponse(
                user.getLanguage() != null ? user.getLanguage() : "English",
                user.getTimezone() != null ? user.getTimezone() : "UTC"
        ));
    }

    @PutMapping
    public ResponseEntity<UserSettingResponse> updateSettings(@RequestBody UserSettingRequest request) {
        User user = authService.getCurrentUser();
        user.setLanguage(request.getLanguage());
        user.setTimezone(request.getTimezone());
        userRepository.save(user);
        return ResponseEntity.ok(new UserSettingResponse(user.getLanguage(), user.getTimezone()));
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class UserSettingRequest {
        private String language;
        private String timezone;
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class UserSettingResponse {
        private String language;
        private String timezone;
    }
}
