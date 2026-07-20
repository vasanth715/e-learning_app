package com.edusphere.wishlist;

import com.edusphere.course.Course;
import com.edusphere.user.User;
import com.edusphere.repository.CourseRepository;
import com.edusphere.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final CourseRepository courseRepository;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<List<Course>> getMyWishlist() {
        User user = authService.getCurrentUser();
        List<Wishlist> wishlist = wishlistRepository.findByUserId(user.getId());
        List<Course> courses = wishlist.stream()
                .map(Wishlist::getCourse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(courses);
    }

    @PostMapping("/courses/{courseId}")
    public ResponseEntity<Wishlist> addToWishlist(@PathVariable Long courseId) {
        User user = authService.getCurrentUser();
        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndCourseId(user.getId(), courseId);
        if (existing.isPresent()) {
            return ResponseEntity.ok(existing.get());
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found: " + courseId));

        Wishlist item = Wishlist.builder()
                .user(user)
                .course(course)
                .build();

        return ResponseEntity.ok(wishlistRepository.save(item));
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long courseId) {
        User user = authService.getCurrentUser();
        Optional<Wishlist> existing = wishlistRepository.findByUserIdAndCourseId(user.getId(), courseId);
        existing.ifPresent(wishlistRepository::delete);
        return ResponseEntity.noContent().build();
    }
}
