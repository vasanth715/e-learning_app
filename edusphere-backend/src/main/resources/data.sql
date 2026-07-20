-- EduSphere Database Seed Records
INSERT INTO users (id, name, email, password, active, xp, streak, instructor_rating, total_students, phone, headline, location, preset_avatar, created_at, updated_at) 
VALUES 
(1, 'Diya Khere', 'student@edusphere.com', 'student123', true, 450, 3, 0.0, 0, '+1 (555) 019-2834', 'Full Stack Student Developer', 'San Francisco, CA', '🎓', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Instructor Alex', 'instructor@edusphere.com', 'instructor123', true, 1200, 14, 4.9, 320, '+1 (555) 987-6543', 'Senior Java & Spring Boot Architect', 'Seattle, WA', '💻', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Org Admin Mark', 'orgadmin@edusphere.com', 'orgadmin123', true, 800, 7, 0.0, 0, '+1 (555) 345-6789', 'Gopiverse Team Lead', 'New York, NY', '🏢', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'System Admin', 'admin@edusphere.com', 'admin123', true, 3000, 30, 0.0, 0, '+1 (555) 000-1111', 'EduSphere Platform Moderator', 'Global', '🛡️', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO user_roles (user_id, role) VALUES 
(1, 'student'),
(2, 'instructor'),
(3, 'orgadmin'),
(4, 'admin');

INSERT INTO courses (id, title, description, short_description, price, original_price, level, category, thumbnail, rating, review_count, students, total_lessons, status, free, has_certificate, instructor_id, created_at, updated_at)
VALUES 
(1, 'Java Full Stack Development 2026', 'Learn how to build enterprise Java backends with Spring Boot and connect them to modern React frontends.', 'Java + Spring Boot + React', 999.0, 1999.0, 'intermediate', 'Development', '💻', 4.8, 2400, 120, 35, 'published', false, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Python for Beginners & Data Science', 'An absolute beginners guide to variables, loops, object-oriented programming, and pandas in Python.', 'Python + OOP + Data Analysis', 799.0, 1599.0, 'beginner', 'Development', '🐍', 4.7, 1800, 85, 28, 'published', false, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'UI/UX Design Masterclass 2026', 'Master user research, wireframing, design systems, and interactive prototypes in Figma.', 'Figma + Wireframes + UX Research', 899.0, 1799.0, 'intermediate', 'Design', '🎨', 4.6, 1200, 64, 20, 'published', false, true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
