package com.edusphere.service;

import com.edusphere.user.User;
import com.edusphere.repository.UserRepository;
import com.edusphere.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        if (!user.isActive()) {
            throw new IllegalArgumentException("Your user account has been put on hold / suspended by Super Admin.");
        }

        String role = user.getRoles().isEmpty() ? "student" : user.getRoles().iterator().next();
        return jwtUtil.generateToken(user.getEmail(), user.getId(), role);
    }

    public String register(String name, String email, String password, String role) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .roles(Set.of(role != null ? role.toLowerCase() : "student"))
                .joinDate(LocalDate.now())
                .active(true)
                .build();

        User saved = userRepository.save(user);
        return jwtUtil.generateToken(saved.getEmail(), saved.getId(), role);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || !(principal instanceof String)) {
            throw new IllegalArgumentException("Unauthorized session.");
        }
        String email = (String) principal;
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
    }
}
