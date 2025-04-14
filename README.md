# Criminal Record Management System

This project is a criminal record management system built with Next.js 15, using App Router and React server components.

## Getting Started

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build Issue Explanation

The project currently has an issue with production builds (`npm run build`) due to a conflict between:

1. **Server Components** - Next.js tries to prerender pages during build
2. **Client Components** - Many pages use client-only React hooks (useState, useEffect, etc.)
3. **Authentication** - The project relies on NextAuth.js which requires client-side execution

When Next.js tries to prerender pages during the build process, it encounters client-only code (like React hooks) in what it's treating as server components, causing errors like:

```
TypeError: Cannot read properties of null (reading 'useState')
```

### Solutions

For now, use development mode (`npm run dev`) to run the application. 

For a production environment, these options could be explored:

1. **Component Restructuring** - Refactor components to better separate server and client code
2. **Configuration Changes** - Set `runtime = 'edge'` or adjust dynamic settings per route
3. **Migration to Pages Router** - Consider reverting to Pages Router which has fewer restrictions

### Application Features

- User authentication
- Criminal record management
- Search functionality
- File upload for criminal photos
- Dashboard analytics

## Database Setup

The database will be initialized using the SQL file `data.sql` and will create a SQLite database file `data.sqlite`.

### Steps to Initialize Database:

1. Make sure you have Node.js installed
2. Run the following command to initialize the database:

```bash
npm run init-db
```

This will:
- Create the necessary database tables (users and criminals)
- Insert demo criminal records with image paths pointing to `/mnt/data/`
- Create a default admin user with credentials:
  - Username: admin@admin.com
  - Password: AdminAdminAdmin

## Image Paths

The demo data uses image paths in the `/mnt/data/` directory. Make sure your images are properly placed in this location or update the paths in the `data.sql` file before initialization. 