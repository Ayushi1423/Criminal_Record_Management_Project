/**
 * Database initialization script for PostgreSQL
 */
import * as dotenv from 'dotenv';
import { initializeDb } from '../src/lib/db';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Initialize the database
console.log('Starting database initialization...');
initializeDb()
  .then((result) => {
    console.log('Database initialization completed successfully.');
    process.exit(0); 
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
