# EduSphere — Project Customization Rules

These guidelines govern architectural decisions, folder structures, and coding practices.

---

## Part 1: Frontend Architecture & UI Guidelines

### 1. Framework & Styling Preferences
*   Use **React.js** as the primary frontend framework/library for web applications.
*   Use **Tailwind CSS** as the standard styling system to construct responsive utility-first layouts.
*   **Device Responsiveness**: Every React.js application must be fully responsive across all device form factors (mobile, tablet, and desktop screens).

### 2. Modular Folder Architecture
To keep the codebase readable, maintainable, and well-optimized, frontend scripts must be organized into separate module subdirectories:
*   `js/student/` - Views and business logic for student dashboards, enrolled course listings, progress, and course players.
*   `js/instructor/` - Course builders, publishing requests, and teaching analytics.
*   `js/admin/` - Platform moderation, approving/rejecting submitted courses, and system health checks.
*   `js/orgadmin/` - Organization dashboard, enterprise team subscriptions, and seat management.

### 3. UI References & Mockups
*   Before starting any frontend implementation or layout design, always ask the user if they have any UI mockup images, reference screenshots, or Figma designs to follow.
*   If reference images are provided, align the implementation to match the designs. Otherwise, proceed with default premium aesthetic designs.

### 4. UI Color Palette Customization
*   Before defining or implementing UI color themes, always ask the user for their preferred color schemes for each application module (e.g., student/user side, admin, superadmin, and vendor).
*   Support distinct and separate color palettes for different role dashboards when requested.

### 5. API Integration with Local Mock Fallbacks
*   All web interactions (`fetch`/REST APIs) must implement a safe offline fallback.
*   If the backend server is unreachable, catch the connection error, print a warning to the console, and fallback to mock local storage records to ensure demo capabilities are preserved.

### 6. Code Optimization and Modularization
*   Maintain clean, isolated React files for every single page/dashboard sub-screen. 
*   Avoid grouping multiple distinct UI sub-screens, trackers, forums, and chatbots into a single large component file. Instead, break them down into separate module files under the respective subdirectory (e.g., `src/components/student/ActivityTrackerCalendar.jsx`, `src/components/student/StudentHome.jsx`, etc.) and import them dynamically to ensure optimum readability, maintenance, and test coverage.

### 7. Centralized Design Theme Configuration
*   Maintain all global styling parameters (e.g. colors, font sizes, font families) inside the central `src/index.css` file using the Tailwind CSS v4 `@theme` directive.
*   Do not define hardcoded colors or ad-hoc custom font sizing styles directly in the React views. Instead, change variables in the `@theme` block of the central stylesheet to ensure styling consistency and allow seamless site-wide design changes.

### 8. Micro-Mobile Layout Responsiveness & Toggles
*   For any dashboard, layout, or viewport, always maintain a clean hamburger menu navigation toggle icon on mobile devices.
*   Support micro-mobile form factors down to screen widths of 375px and 325px.
*   Eliminate empty white spaces and layout gaps on small viewports by reducing padding and margins (e.g., using `p-3 sm:p-4 md:p-6` and `gap-3 sm:gap-4 md:gap-6` styling) to ensure text remains clear, readable, and fits the screen margins without clipping.

---

## Part 2: Backend Architecture & Java Guidelines

### 1. Technology Stack & Selection
*   Use **Java** and **Spring Boot** as the default technology stack for backend development.
*   **Tech Stack Consultation**: Before starting any new project or major architecture layout, always ask the user to confirm their preferred tech stack, as they may want to switch or modify it.

### 2. Java Lombok & Inheritance Rules
*   Do not combine standard Lombok `@Builder` and `@AllArgsConstructor` annotations on classes that participate in OOP inheritance.
*   For entity mappings and DTO subclass configurations, always use `@SuperBuilder` from `lombok.experimental.SuperBuilder` on both parent classes (e.g. `Summary`) and subclasses (e.g. `Detail`) to enable correct field mapping.
