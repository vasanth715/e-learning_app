-- EduSphere LMS Database Schema Initialization
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    xp INT DEFAULT 0,
    streak INT DEFAULT 0,
    instructor_rating DOUBLE DEFAULT 0.0,
    total_students INT DEFAULT 0,
    join_date DATE,
    language VARCHAR(50),
    timezone VARCHAR(50),
    avatar_url TEXT,
    preset_avatar VARCHAR(50),
    phone VARCHAR(50),
    bio TEXT,
    headline VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price DOUBLE DEFAULT 0.0,
    original_price DOUBLE DEFAULT 0.0,
    level VARCHAR(50),
    category VARCHAR(100),
    thumbnail VARCHAR(255),
    rating DOUBLE DEFAULT 4.8,
    review_count INT DEFAULT 0,
    students INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'published',
    instructor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    progress_percent INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
