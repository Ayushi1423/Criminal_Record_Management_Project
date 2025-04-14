# Criminal Record Management System - Project Documentation

## 1. Overview
This project is a web-based Criminal Record Management System built using Next.js (App Router) and TypeScript. It allows authorized users to manage criminal records, including adding new records with photos, searching existing records, and viewing all records. User authentication is handled using NextAuth.js.

## 2. Features Implemented
-   **User Authentication:**
    -   Login (`/auth/login`) and Signup (`/auth/signup`) pages.
    -   Credentials-based authentication using NextAuth.js.
    -   Session management and protected routes via middleware (`src/middleware.ts`).
    -   API endpoints for signup (`/api/auth/signup`) and NextAuth handlers (`/api/auth/[...nextauth]`).
-   **Criminal Record Management:**
    -   **Add Record:** Form (`/criminals/add`) to input criminal details and upload a photograph. Uses API route `/api/criminals/add` which handles file uploads (`formidable`) and database insertion. Photos are stored locally in `public/uploads/criminals/`.
    -   **List Records:** Page (`/criminals`) to display all criminal records fetched from `/api/criminals`.
    -   **Search Records:** Page (`/criminals/search`) with inputs to search criminals by various criteria (name, crime type, status). Uses API route `/api/criminals/search`.
-   **Dashboard:** Basic dashboard page (`/dashboard`) accessible after login.
-   **Database:**
    -   Uses SQLite (`data.sqlite`).
    -   Schema defined in `data.sql` and initialized using `npm run init-db` (via `scripts/initialize-db.ts`).
    -   Tables: `users`, `criminals`.
    -   `criminals` table includes fields for personal details, crime information, and `photo_path`.

## 3. Technology Stack
-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **UI Library:** @once-ui (custom component library)
-   **Authentication:** NextAuth.js v4
-   **Database:** SQLite (via `sqlite` and `sqlite3` packages)
-   **File Uploads:** `formidable`
-   **Styling:** SCSS Modules (within `once-ui`)

## 4. API Endpoints
-   `POST /api/auth/signup`: Handles user registration.
-   `GET /api/auth/[...nextauth]`: NextAuth.js authentication routes.
-   `POST /api/auth/[...nextauth]`: NextAuth.js authentication routes.
-   `POST /api/criminals/add`: Adds a new criminal record with photo upload.
-   `GET /api/criminals`: Retrieves all criminal records.
-   `GET /api/criminals/search`: Searches criminal records based on query parameters.

## 5. Frontend Structure (`src/app`)
-   **/ (root):** Redirects to `/auth/login`.
-   **/auth:** Layout, Login, Signup pages.
-   **/criminals:** Layout, Add, Search, List pages.
-   **/dashboard:** Main dashboard page after login.
-   **/api:** Contains all backend API route handlers.
-   **/components:** Shared React components (e.g., `MainLayout`).
-   **/lib:** Core logic like database connection (`db.ts`).
-   **/once-ui:** Custom UI component library.
-   **/providers.tsx:** Wraps the application (likely includes `SessionProvider`).
-   **middleware.ts:** Handles request middleware (e.g., authentication checks).

## 6. Setup and Running
-   Install dependencies: `npm install`
-   Initialize database: `npm run init-db` (creates `data.sqlite` from `data.sql`)
-   Run development server: `npm run dev`