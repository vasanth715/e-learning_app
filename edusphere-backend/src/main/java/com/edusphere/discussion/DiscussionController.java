package com.edusphere.discussion;

import com.edusphere.user.User;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses/{courseId}/discussions")
@RequiredArgsConstructor
@CrossOrigin
public class DiscussionController {

    private final DiscussionRepository discussionRepository;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<DiscussionResponse>> getDiscussions(@PathVariable Long courseId) {
        List<Discussion> list = discussionRepository.findByCourseIdOrderByCreatedAtDesc(courseId);
        List<DiscussionResponse> dtoList = list.stream()
                .map(d -> new DiscussionResponse(
                        d.getId(),
                        d.getUser().getName(),
                        getUserInitials(d.getUser().getName()),
                        d.getBody(),
                        d.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                        d.getVotes()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoList);
    }

    @PostMapping
    public ResponseEntity<DiscussionResponse> postDiscussion(
            @PathVariable Long courseId,
            @RequestBody DiscussionRequest request) {
        
        User user = authService.getCurrentUser();
        Discussion d = Discussion.builder()
                .user(user)
                .courseId(courseId)
                .lessonId(request.getLessonId())
                .body(request.getBody())
                .votes(0)
                .build();

        Discussion saved = discussionRepository.save(d);
        return ResponseEntity.ok(new DiscussionResponse(
                saved.getId(),
                saved.getUser().getName(),
                getUserInitials(saved.getUser().getName()),
                saved.getBody(),
                saved.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                saved.getVotes()
        ));
    }

    private String getUserInitials(String name) {
        if (name == null || name.trim().isEmpty()) return "U";
        String[] parts = name.trim().split("\\s+");
        if (parts.length >= 2) {
            return (parts[0].substring(0, 1) + parts[1].substring(0, 1)).toUpperCase();
        }
        return name.substring(0, Math.min(2, name.length())).toUpperCase();
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class DiscussionRequest {
        private Long lessonId;
        private String body;
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class DiscussionResponse {
        private Long id;
        private String userName;
        private String userInitials;
        private String body;
        private String createdDate;
        private int votes;
    }
}
