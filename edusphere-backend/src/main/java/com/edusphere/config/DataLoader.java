package com.edusphere.config;

import com.edusphere.user.User;
import com.edusphere.course.Course;
import com.edusphere.course.Section;
import com.edusphere.course.Lesson;
import com.edusphere.notification.Notification;
import com.edusphere.repository.UserRepository;
import com.edusphere.repository.CourseRepository;
import com.edusphere.repository.NotificationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.Set;
import java.util.ArrayList;

/**
 * Automatically initializes database with test accounts, seed notifications, and quiz lessons.
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, 
                      CourseRepository courseRepository,
                      NotificationRepository notificationRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Student account
        User student = userRepository.findByEmail("student@edusphere.com").orElse(null);
        if (student == null) {
            student = userRepository.save(User.builder()
                .name("Ed Student")
                .email("student@edusphere.com")
                .password(passwordEncoder.encode("student123"))
                .roles(Set.of("student"))
                .joinDate(LocalDate.now())
                .xp(450)
                .streak(3)
                .active(true)
                .build());
        }

        // 2. Instructor / Teacher account
        User instructor = userRepository.findByEmail("instructor@edusphere.com").orElse(null);
        if (instructor == null) {
            instructor = userRepository.save(User.builder()
                .name("Ed Instructor")
                .email("instructor@edusphere.com")
                .password(passwordEncoder.encode("instructor123"))
                .roles(Set.of("instructor"))
                .joinDate(LocalDate.now())
                .instructorRating(4.9)
                .totalStudents(320)
                .active(true)
                .build());
        }

        // 3. Super Admin / Corporate OrgAdmin account
        User orgadmin = userRepository.findByEmail("orgadmin@edusphere.com").orElse(null);
        if (orgadmin == null) {
            orgadmin = userRepository.save(User.builder()
                .name("Ed OrgAdmin")
                .email("orgadmin@edusphere.com")
                .password(passwordEncoder.encode("orgadmin123"))
                .roles(Set.of("orgadmin"))
                .joinDate(LocalDate.now())
                .active(true)
                .build());
        }

        // 4. System Admin account
        User admin = userRepository.findByEmail("admin@edusphere.com").orElse(null);
        if (admin == null) {
            admin = userRepository.save(User.builder()
                .name("Ed Admin")
                .email("admin@edusphere.com")
                .password(passwordEncoder.encode("admin123"))
                .roles(Set.of("admin"))
                .joinDate(LocalDate.now())
                .active(true)
                .build());
        }

        // Seed notifications
        if (notificationRepository.count() == 0) {
            notificationRepository.save(Notification.builder()
                .user(student)
                .title("Welcome to EduSphere!")
                .message("Start exploring the course catalog to allocate your skills.")
                .type("info")
                .read(false)
                .build());

            notificationRepository.save(Notification.builder()
                .user(student)
                .title("New Certificate Issued")
                .message("Congratulations! You completed 'Tailwind CSS Layouts'.")
                .type("success")
                .read(false)
                .build());
            notificationRepository.save(Notification.builder()
                .user(student)
                .title("💼 Exclusive Hiring Invitation")
                .message("Congratulations! Gopiverse partner companies have flagged your profile for interview calls after completing your required skill set exams and coding practices.")
                .type("success")
                .read(false)
                .build());
        }

        // Seed a sample java course if none exist
        if (courseRepository.count() == 0) {
            Course javaCourse = Course.builder()
                .title("Spring Boot REST API Development 2026")
                .description("Learn how to build enterprise REST APIs using Spring Boot, Hibernate, JPA and Spring Security from scratch.")
                .shortDescription("Build enterprise Spring Boot APIs.")
                .instructor(instructor)
                .price(49.99)
                .originalPrice(99.99)
                .level("intermediate")
                .category("Programming")
                .thumbnail("💻")
                .thumbnailGradient("linear-gradient(135deg, #0ea5e9 0%, #1e3a8a 100%)")
                .status("published")
                .free(false)
                .hasCertificate(true)
                .build();

            // Create Section
            Section section = Section.builder()
                .course(javaCourse)
                .title("Introduction and Assessments")
                .lessons(new ArrayList<>())
                .build();

            // Create video lesson
            Lesson lesson1 = Lesson.builder()
                .section(section)
                .title("Spring Boot Overview & Setup")
                .type("video")
                .duration("15")
                .videoUrl("https://example.com/video")
                .preview(true)
                .build();

            // Create quiz lesson (with JSON questions encoded in the content field)
            Lesson lesson2 = Lesson.builder()
                .section(section)
                .title("Assessment: REST APIs Core Concepts")
                .type("quiz")
                .duration("10")
                .content("[\n" +
                        "  {\n" +
                        "    \"id\": \"q1\",\n" +
                        "    \"question\": \"What annotation is used to create a REST controller in Spring Boot?\",\n" +
                        "    \"options\": [\"@RestController\", \"@Controller\", \"@Service\", \"@Repository\"],\n" +
                        "    \"answer\": \"@RestController\"\n" +
                        "  },\n" +
                        "  {\n" +
                        "    \"id\": \"q2\",\n" +
                        "    \"question\": \"Which HTTP method is typically used to update an existing resource?\",\n" +
                        "    \"options\": [\"GET\", \"POST\", \"PUT\", \"DELETE\"],\n" +
                        "    \"answer\": \"PUT\"\n" +
                        "  }\n" +
                        "]")
                .preview(false)
                .build();

            section.getLessons().add(lesson1);
            section.getLessons().add(lesson2);

            javaCourse.getSections().add(section);
            courseRepository.save(javaCourse);
        }
    }
}
