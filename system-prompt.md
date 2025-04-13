# Criminal Record Management System

## Project Overview
A web-based Criminal Record Management System that allows authorized users to manage and track criminal records with secure authentication and comprehensive record management capabilities.

## System Architecture

### Backend (Nextjs Node)
- **Authentication System**
  - JWT-based authentication
  - Login endpoint (/login)
  - Token verification middleware
  - Environment-based secret key configuration

- **Database Integration**
  - MySQLLite database connection
  - Tables: users, criminals
  - Secure password handling

- **API Endpoints**
  1. Authentication
     - POST /login - User authentication
  2. Criminal Records
     - GET /criminals - Fetch all criminal records
     - POST /criminals - Add new criminal record

### Frontend (Netx.js/ReatJs)
1. **Login Page (login)**
   - Username and password fields
   - Authentication form
   - JWT token storage
   - Redirect to dashboard on success

2. **Dashboard (dashboard)**
   - Navigation menu
   - Overview of system features
   - Quick access to main functions

3. **Criminals Management (criminals)**
   - Display criminal records in a table
   - Columns:
     - Name
     - Age
     - Gender
     - Crime Type
     - Crime Severity
     - Arrest Date
     - Arrest Location
     - Officer in Charge
     - Case Status
     - Prison Name
     - Release Date

4. **Add Criminal Form Fields**
   Required Fields:
   - Name
   - Age
   - Gender
   - Crime Type
   - Crime Severity
   - Arrest Date
   - Arrest Location
   - Officer in Charge
   - Case Status
   - Description
   
   Optional Fields:
   - Prison Name
   - Release Date

## Security Features
- JWT-based authentication
- Protected routes requiring valid tokens
- Server-side validation for all inputs
- Environment-based configuration
- CORS enabled
- Secure password handling

## Workflow
1. User accesses the system through login page
2. Upon successful authentication:
   - JWT token is generated and stored
   - User is redirected to dashboard
3. From dashboard, users can:
   - View list of criminals
   - Add new criminal records
   - Navigate between different sections
4. Criminal records can be:
   - Added with comprehensive details
   - Viewed in a tabular format
   - Managed with proper authorization

## Technical Requirements
- Next.js Full stack Web Application
- Express.js framework
- MySQLLite database
- Frontend: HTML5, CSS3, JavaScript, TypeScript
- JWT for authentication
- CORS enabled for cross-origin requests