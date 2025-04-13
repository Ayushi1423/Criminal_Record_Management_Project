import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Define the path to the database file
const dbPath = path.resolve(process.cwd(), 'data.sqlite');

// Function to open the database connection
async function openDb() {
	return open({
		filename: dbPath,
		driver: sqlite3.Database,
	});
}

// Function to initialize the database schema
async function initializeDb() {
	const db = await openDb();
	console.log('Initializing database schema...');

	// Create users table
	await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL 
    );
  `);
	console.log('Users table created or already exists.');

	// Create criminals table based on system-prompt.md
	await db.exec(`
    CREATE TABLE IF NOT EXISTS criminals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      crime_type TEXT NOT NULL,
      crime_severity TEXT NOT NULL,
      arrest_date TEXT NOT NULL, -- Consider using ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ)
      arrest_location TEXT NOT NULL,
      officer_in_charge TEXT NOT NULL,
      case_status TEXT NOT NULL,
      description TEXT NOT NULL, -- Added description field
      prison_name TEXT,          -- Optional
      release_date TEXT          -- Optional, Consider using ISO 8601 format
    );
  `);
	console.log('Criminals table created or already exists.');

	// Example: Insert a default user if the table is empty (for testing)
	const userCount = await db.get('SELECT COUNT(*) as count FROM users');
	if (userCount && userCount.count === 0) {
		// IMPORTANT: Hash passwords in a real application!
		await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [
			'admin',
			'password',
		]); // Use a secure password hashing method in production
		console.log('Default admin user created.');
	}

	await db.close();
	console.log('Database initialization complete.');
}

// Export the openDb function for use in API routes
export { openDb, initializeDb };

// Optional: Run initialization immediately if needed,
// or create a separate script/command to run it.
// initializeDb().catch(console.error); 