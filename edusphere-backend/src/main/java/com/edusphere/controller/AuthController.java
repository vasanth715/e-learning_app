package com.edusphere.controller;

import com.edusphere.user.User;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        String token = authService.register(request.getName(), request.getEmail(), request.getPassword(), request.getRole());
        User user = authService.getUserByEmail(request.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        User user = authService.getUserByEmail(request.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMe() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private User user;
    }
}
