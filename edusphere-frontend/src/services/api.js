// API Integration Service with H2 backend and mock local storage fallback
const BASE_URL = '/api';

export const api = {
  getToken() {
    return localStorage.getItem('edusphere_token');
  },

  setSession(token, user) {
    localStorage.setItem('edusphere_token', token);
    localStorage.setItem('edusphere_user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('edusphere_token');
    localStorage.removeItem('edusphere_user');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('edusphere_user'));
    } catch (e) {
      return null;
    }
  },

  async updateProfile(profileData) {
    const updated = await this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
    if (updated) {
      const currentToken = this.getToken() || 'mock_jwt_token';
      this.setSession(currentToken, updated);
    }
    return updated;
  },

  async request(path, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
      });

      if (response.status === 204) return null;
      if (!response.ok) {
        throw new Error(`API error (${response.status})`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`Backend connection failed on ${path}. Falling back to mock local storage:`, err);
      return this.fallbackMock(path, options);
    }
  },

  // Fallback Mock data engine when backend is offline
  fallbackMock(path, options = {}) {
    const method = options.method || 'GET';

    // Auth logins
    if (path === '/auth/login' && method === 'POST') {
      const body = JSON.parse(options.body);
      const email = body.email;
      let role = 'student';
      if (email.includes('instructor')) role = 'instructor';
      if (email.includes('orgadmin')) role = 'orgadmin';
      if (email.includes('admin')) role = 'admin';

      const mockUser = {
        id: Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email,
        roles: [role],
        xp: 450,
        streak: 3,
        instructorRating: 4.9,
        totalStudents: 320,
      };

      this.setSession('mock_token_' + Date.now(), mockUser);
      return { token: 'mock_jwt_token', user: mockUser };
    }

    if (path === '/auth/register' && method === 'POST') {
      const body = JSON.parse(options.body);
      const mockUser = {
        id: Date.now(),
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        roles: [body.role || 'student'],
        xp: 0,
        streak: 0,
      };
      this.setSession('mock_token_' + Date.now(), mockUser);
      return { token: 'mock_jwt_token', user: mockUser };
    }

    if (path === '/auth/me') {
      const user = this.getUser();
      if (user) return user;
      throw new Error("Unauthorized");
    }

    if (path === '/users/profile' && (method === 'PUT' || method === 'POST')) {
      const updatedUser = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      localStorage.setItem('edusphere_user', JSON.stringify(updatedUser));
      return updatedUser;
    }

    // Courses catalog listing
    if (path.startsWith('/courses') && method === 'GET') {
      let stored = localStorage.getItem('edusphere_mock_courses');
      if (!stored) {
        const seedCourses = [
          {
            id: 1,
            title: "Java Full Stack Development 2026",
            description: "Learn how to build enterprise Java backends and connect them to React frontends.",
            shortDescription: "Java + Spring Boot + React.",
            price: 999.0,
            originalPrice: 1999.0,
            level: "intermediate",
            category: "Development",
            thumbnail: "💻",
            rating: 4.8,
            reviewCount: 2400,
            students: 120,
            totalLessons: 35,
            status: "published",
            sections: [
              {
                id: 1,
                title: "Section 1 - Introduction",
                lessons: [
                  { id: "l1", title: "1. What is Java?", type: "video", duration: "12", videoUrl: "https://example.com" },
                  { id: "l2", title: "2. Java Setup", type: "video", duration: "15", videoUrl: "https://example.com" },
                  { id: "l3", title: "3. Your First Program", type: "quiz", duration: "10", content: "[]" }
                ]
              }
            ]
          },
          {
            id: 2,
            title: "Python for Beginners",
            description: "An absolute beginners guide to variables, loops and OOP in Python.",
            price: 799.0,
            originalPrice: 1599.0,
            category: "Development",
            thumbnail: "🐍",
            rating: 4.7,
            reviewCount: 1800,
            status: "published",
            sections: []
          },
          {
            id: 3,
            title: "UI/UX Design Masterclass",
            description: "Master user research, wireframing and interactive prototypes in Figma.",
            price: 899.0,
            originalPrice: 1799.0,
            category: "Design",
            thumbnail: "🎨",
            rating: 4.6,
            reviewCount: 1200,
            status: "published",
            sections: []
          }
        ];
        localStorage.setItem('edusphere_mock_courses', JSON.stringify(seedCourses));
        stored = JSON.stringify(seedCourses);
      }
      const all = JSON.parse(stored);
      return { content: all };
    }

    // Users fallback for admin/analytics
    if (path.startsWith('/users') && method === 'GET') {
      const seedUsers = [
        { id: 1, name: 'Diya Khere', email: 'diya@example.com', role: 'student', active: true },
        { id: 2, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student', active: true },
        { id: 3, name: 'Sneha Patil', email: 'sneha@example.com', role: 'student', active: true },
        { id: 4, name: 'Amit Verma', email: 'instructor@edusphere.com', role: 'instructor', active: true },
        { id: 5, name: 'Ed Admin', email: 'admin@edusphere.com', role: 'admin', active: true }
      ];
      return seedUsers;
    }

    // Enrollments
    if (path.startsWith('/enrollments/my')) {
      const stored = localStorage.getItem('edusphere_mock_enrolls') || '[]';
      return JSON.parse(stored);
    }

    if (path.startsWith('/enrollments/courses/')) {
      const courseId = parseInt(path.split('/').pop());
      const stored = localStorage.getItem('edusphere_mock_enrolls') || '[]';
      const enrolls = JSON.parse(stored);
      
      const existing = enrolls.find(e => e.courseId === courseId);
      if (existing) return existing;

      const newEnroll = {
        id: Date.now(),
        courseId,
        progressPercent: 0,
        status: 'active',
        completedLessonIds: []
      };
      enrolls.push(newEnroll);
      localStorage.setItem('edusphere_mock_enrolls', JSON.stringify(enrolls));
      return newEnroll;
    }

    if (path.includes('/lessons/') && path.endsWith('/complete')) {
      const parts = path.split('/');
      const enrollmentId = parseInt(parts[2]);
      const lessonId = parts[4];
      
      const stored = localStorage.getItem('edusphere_mock_enrolls') || '[]';
      const enrolls = JSON.parse(stored);
      const enroll = enrolls.find(e => e.id === enrollmentId);
      if (enroll) {
        if (!enroll.completedLessonIds.includes(lessonId)) {
          enroll.completedLessonIds.push(lessonId);
          enroll.progressPercent = Math.min(100, Math.round((enroll.completedLessonIds.length / 3) * 100));
        }
        localStorage.setItem('edusphere_mock_enrolls', JSON.stringify(enrolls));
        return enroll;
      }
    }

    // Wishlist fallback
    if (path === '/wishlist' && method === 'GET') {
      const stored = localStorage.getItem('edusphere_mock_wishlist') || '[]';
      return JSON.parse(stored);
    }

    if (path.startsWith('/wishlist/courses/')) {
      const courseId = parseInt(path.split('/').pop());
      const stored = localStorage.getItem('edusphere_mock_wishlist') || '[]';
      let wishlist = JSON.parse(stored);
      if (method === 'POST') {
        if (!wishlist.includes(courseId)) wishlist.push(courseId);
      } else if (method === 'DELETE') {
        wishlist = wishlist.filter(id => id !== courseId);
      }
      localStorage.setItem('edusphere_mock_wishlist', JSON.stringify(wishlist));
      return null;
    }

    // Default notifications
    if (path === '/notifications' && method === 'GET') {
      const stored = localStorage.getItem('edusphere_mock_notifications');
      if (!stored) {
        const seedNotifs = [
          { id: 1, title: "Welcome to EduSphere! 🎉", message: "Explore the catalog to start learning.", read: false },
          { id: 2, title: "Course Enrolled", message: "You enrolled in Java Full Stack.", read: true },
          { 
            id: 3, 
            title: "💼 Exclusive Hiring Invitation", 
            message: "Congratulations! Gopiverse partner companies have flagged your profile for interview calls after completing your required skill set exams and coding practices.", 
            read: false 
          }
        ];
        localStorage.setItem('edusphere_mock_notifications', JSON.stringify(seedNotifs));
        return seedNotifs;
      }
      return JSON.parse(stored);
    }

    if (path === '/notifications/unread/count') {
      const stored = localStorage.getItem('edusphere_mock_notifications') || '[]';
      const list = JSON.parse(stored);
      return list.filter(n => !n.read).length;
    }

    // Fallback stub for rest
    return {};
  }
};
