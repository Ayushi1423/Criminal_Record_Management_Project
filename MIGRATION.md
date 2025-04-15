# PostgreSQL Database Guide

This document outlines the PostgreSQL database implementation for the Criminal Record Management Project.

## Database Configuration

The application uses a Neon PostgreSQL database with the following configuration:

- **Host**: ep-lucky-bush-a4njp5sk-pooler.us-east-1.aws.neon.tech
- **Database**: neondb
- **User**: neondb_owner
- **Connection Pooling**: Enabled

## Connection Details

All database connection details are stored in the `.env.local` file with the following parameters:

```
DATABASE_URL=postgres://neondb_owner:npg_95VomSJKzcXL@ep-lucky-bush-a4njp5sk-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Database Structure

The database consists of two main tables:

### Users Table
```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL 
);
```

### Criminals Table
```sql
CREATE TABLE IF NOT EXISTS criminals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  crime_type TEXT NOT NULL,
  crime_severity TEXT NOT NULL,
  arrest_date TEXT NOT NULL,
  arrest_location TEXT NOT NULL,
  officer_in_charge TEXT NOT NULL,
  case_status TEXT NOT NULL,
  description TEXT NOT NULL,
  prison_name TEXT,
  release_date TEXT,
  photo_path TEXT
);
```

## Database Connection Layer

The application uses a custom database layer (`src/lib/db.ts`) that provides the following features:

- Connection pooling for better performance
- Parameter conversion to handle legacy query formats
- Consistent interface for database operations
- Error handling and logging

## API Integration

The database is accessed through the following API endpoints:

- `/api/criminals` - List all criminals
- `/api/criminals/add` - Add a new criminal record
- `/api/criminals/search` - Search for criminal records
- `/api/auth/[...nextauth]` - Authentication
- `/api/auth/signup` - User registration

## Testing Database Connection

To test the database connection, visit:

```
GET /api/test
```

## Troubleshooting

If you encounter database issues:

1. Check your PostgreSQL credentials in `.env.local`
2. Visit `/api/debug` to verify authentication status
3. Ensure your PostgreSQL instance is accessible from your network
4. Check the application logs for specific error messages
