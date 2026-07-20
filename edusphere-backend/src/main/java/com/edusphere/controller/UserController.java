package com.edusphere.controller;

import com.edusphere.user.User;
import com.edusphere.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody ProfileUpdateRequest request) {
        if (request.getEmail() == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        if (request.getName() != null) user.setName(request.getName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getHeadline() != null) user.setHeadline(request.getHeadline());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getPresetAvatar() != null) user.setPresetAvatar(request.getPresetAvatar());

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    @Getter @Setter
    public static class ProfileUpdateRequest {
        private String name;
        private String email;
        private String phone;
        private String bio;
        private String headline;
        private String location;
        private String avatarUrl;
        private String presetAvatar;
    }
}
