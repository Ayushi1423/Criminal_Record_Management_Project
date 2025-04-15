# Criminal Record Management System

A comprehensive web-based solution for managing criminal records with modern cloud infrastructure.

## Technology Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon DB)
- **Authentication**: NextAuth.js
- **Image Storage**: Vercel Blob
- **Deployment**: Vercel

## Features

- 🔐 Secure User Authentication (Login/Signup)
- ✏️ Add, Edit and Delete Criminal Records
- 📊 Dashboard with Statistics Overview
- 🔍 Advanced Search and Filter Capabilities
- 📸 Criminal Photo Management with Cloud Storage
- 📱 Responsive Design for All Devices

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Ayushi1423/Criminal_Record_Management_Project.git
cd Criminal_Record_Management_Project
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up Environment Variables:**

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXT_DISABLE_STATIC_OPTIMIZATION=true

# PostgreSQL Database (Neon)
DATABASE_URL=postgres://your_username:your_password@your_host/your_database?sslmode=require

# Vercel Blob Storage for criminal photos
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
```

You can use the `.env.local.example` file provided in the repository as a template.

### Database Setup

This project uses a PostgreSQL database hosted on Neon. You have two options:

#### Option 1: Use the Provided Cloud Database (Recommended)

1. Request database credentials from the project maintainer
2. Add the credentials to your `.env.local` file

#### Option 2: Set Up Your Own Database

1. Create a PostgreSQL database (locally or using a cloud provider like Neon)
2. Execute the SQL schema in `data.sql.bak` to create the necessary tables
3. Update your `.env.local` with your database connection string

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

Login with the default admin credentials:
- **Username:** `admin@admin.com`
- **Password:** `AdminAdminAdmin`

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## Project Structure

```
Criminal_Record_Management_Project/
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages and layouts
│   │   ├── api/        # API routes
│   │   ├── auth/       # Authentication pages
│   │   ├── criminals/  # Criminal management pages
│   │   └── dashboard/  # Dashboard page
│   ├── components/     # Reusable components
│   ├── lib/            # Utility functions and database connection
│   ├── middleware.ts   # NextAuth middleware
│   └── once-ui/        # UI component library
├── scripts/            # Utility scripts for database operations
├── next.config.mjs     # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Image Storage with Vercel Blob

This project uses Vercel Blob for storing criminal photos, which offers:

- Persistent cloud storage that works in production environments
- Automatic CDN distribution for faster loading
- No local filesystem dependencies
- Secure URL generation

To set up Vercel Blob:

1. Create a Vercel Blob store in your Vercel dashboard
2. Add your Blob token to your environment variables

## Database Migration

The project has been migrated from SQLite to PostgreSQL. If you need to work with the old SQLite database format, reference files with `.bak` extensions, which contain the original SQLite configuration.

## Deployment on Vercel

The easiest way to deploy this application is through Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAyushi1423%2FCriminal_Record_Management_Project)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.