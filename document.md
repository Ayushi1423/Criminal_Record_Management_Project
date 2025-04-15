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
    -   **Add Record:** Form (`/criminals/add`) to input criminal details and upload a photograph. Uses API route `/api/criminals/add` which handles file uploads and database insertion. Photos are stored in Vercel Blob cloud storage.
    -   **List Records:** Page (`/criminals`) to display all criminal records fetched from `/api/criminals`.
    -   **Search Records:** Page (`/criminals/search`) with inputs to search criminals by various criteria (name, crime type, status). Uses API route `/api/criminals/search`.
    -   **Delete Records:** API endpoint (`/api/criminals/delete/[id]`) to remove criminal records from the database and their associated photos from Vercel Blob storage.
-   **Dashboard:** Basic dashboard page (`/dashboard`) accessible after login.
-   **Database:**
    -   Uses PostgreSQL hosted on Neon.tech cloud database.
    -   Tables: `users`, `criminals`.
    -   `criminals` table includes fields for personal details, crime information, and `photo_path`.

## 3. Technology Stack
-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **UI Library:** @once-ui (custom component library)
-   **Authentication:** NextAuth.js v4
-   **Database:** PostgreSQL (via `pg` package) hosted on Neon.tech
-   **Image Storage:** Vercel Blob (cloud storage for criminal photos)
-   **Deployment:** Vercel
-   **Styling:** SCSS Modules (within `once-ui`)

## 4. API Endpoints
-   `POST /api/auth/signup`: Handles user registration.
-   `GET /api/auth/[...nextauth]`: NextAuth.js authentication routes.
-   `POST /api/auth/[...nextauth]`: NextAuth.js authentication routes.
-   `POST /api/criminals/add`: Adds a new criminal record with photo upload to Vercel Blob.
-   `GET /api/criminals`: Retrieves all criminal records.
-   `GET /api/criminals/search`: Searches criminal records based on query parameters.
-   `GET /api/criminals/delete/[id]`: Deletes a criminal record and its associated photo.

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

## 6. Cloud Infrastructure
-   **Database:** PostgreSQL database hosted on Neon.tech with the following features:
    -   Serverless architecture with auto-scaling
    -   Connection pooling for optimal performance
    -   Automatic backups and high availability
    -   SSL encryption for secure data transmission
-   **Image Storage:** Vercel Blob for storing and serving criminal photos:
    -   Global CDN for fast image loading
    -   Secure URL generation
    -   Persistent cloud storage that works across deployments
    -   No local filesystem dependencies
-   **Deployment:** Vercel platform for hosting the application:
    -   Automatic deployments from Git
    -   Global edge network for optimal performance
    -   Integrated with Vercel Blob for seamless image handling
    -   Environment variables management for secure credential storage

## 7. Database Architecture
The PostgreSQL database contains two main tables:
-   **users:** Stores user credentials and information for authentication
-   **criminals:** Stores all criminal record data including:
    -   Personal information (name, age, gender)
    -   Crime details (type, severity, description)
    -   Case information (arrest date, location, officer in charge, status)
    -   Optional prison information (prison name, release date)
    -   Photo reference (a URL pointing to the Vercel Blob storage)

## 8. Setup and Running
-   Install dependencies: `npm install`
-   Create `.env.local` file with necessary environment variables:
    -   PostgreSQL connection string
    -   Vercel Blob token
    -   NextAuth configuration
-   Run development server: `npm run dev`
-   Build for production: `npm run build`
-   Start production server: `npm run start`