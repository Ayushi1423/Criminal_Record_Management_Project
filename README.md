# Criminal Record Management System

This project is a web-based Criminal Record Management System built with Next.js 15 (App Router), TypeScript, and NextAuth.js.

## Features

-   User Authentication (Login/Signup)
-   Add New Criminal Records (with Photo Upload)
-   List All Criminal Records
-   Search Criminal Records
-   Dashboard Overview

## Getting Started

### Prerequisites

-   Node.js (version recommended by your Next.js version)
-   npm (or yarn/pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```
3.  **Set up Environment Variables:**
    -   Copy `.env.local.example` (if it exists, otherwise create `.env.local`).
    -   Update `.env.local` with necessary variables:
        -   `NEXTAUTH_URL=http://localhost:3000` (Required for local development)
        -   `NEXTAUTH_SECRET=` (Required: Generate a strong secret key, e.g., `openssl rand -base64 32`)

4.  **Initialize the Database:**
    -   The database uses SQLite (`data.sqlite`) and the schema is defined in `data.sql`.
    -   Run the initialization script:
        ```bash
        npm run init-db
        ```
    -   **What it does:** This command executes the `scripts/initialize-db.ts` script, which reads `data.sql` to create the `data.sqlite` database file. It sets up the `users` and `criminals` tables and may insert demo data (check `data.sql`).
    -   **Default Admin User:** The script creates a default admin user with the following credentials:
        -   **Username:** `admin@admin.com`
        -   **Password:** `AdminAdminAdmin`
    -   **Re-initializing:** If you need to reset the database, delete the `data.sqlite` file and run `npm run init-db` again.

### Running the Development Server

1.  **Start the server:**
    ```bash
npm run dev
# or yarn dev / pnpm dev
    ```
2.  **Access the application:**
    -   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
    -   Log in using the default admin credentials.

### Modifying the Project

-   **Source Code:** Edit files within the `src/` directory. The Next.js development server (`npm run dev`) provides Hot Module Replacement (HMR), so changes to components and pages should reflect automatically in the browser.
-   **Database Schema:** To change the database structure, modify the SQL commands in `data.sql` *before* running `npm run init-db` (or after deleting `data.sqlite`).
-   **Configuration:** Adjust application settings or add new environment variables in `.env.local`.
-   **Dependencies:** Add or remove packages using `npm install <package>` or `npm uninstall <package>`.

## Important Notes

-   **Photo Uploads:** Photos are stored locally in the `public/uploads/criminals/` directory by default.
-   **Production Build:** The previous `README` mentioned build issues due to client/server component conflicts. Running in `dev` mode is the primary way to use this application currently.
-   **Demo Data:** The `npm run init-db` script may insert demo criminal data. Check the `data.sql` script for details.
