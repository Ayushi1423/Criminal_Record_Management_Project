import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

// Define the path to the database file
const dbPath = path.resolve(process.cwd(), 'data.sqlite');
// Define the path to the SQL file
const sqlPath = path.resolve(process.cwd(), 'data.sql');
// Define path to a log file
const logPath = path.resolve(process.cwd(), 'db-init.log');

// Helper function to log to file and console
function log(message: string) {
	console.log(message);
	fs.appendFileSync(logPath, message + '\n');
}

// Function to open the database connection
async function openDb() {
	return open({
		filename: dbPath,
		driver: sqlite3.Database,
	});
}

// Function to initialize the database schema
async function initializeDb() {
	let db;
	try {
		// Start with a new log file
		fs.writeFileSync(logPath, `DB Initialization Started: ${new Date().toISOString()}\n`);
		log(`Working directory: ${process.cwd()}`);
		log(`Database path: ${dbPath}`);
		log(`SQL file path: ${sqlPath}`);
		
		db = await openDb();
		log('Database connection opened.');

		// Check if SQL file exists
		if (!fs.existsSync(sqlPath)) {
			const error = `SQL file not found at ${sqlPath}`;
			log(error);
			throw new Error(error);
		}
		log('SQL file found, reading content...');

		// Read SQL file
		const sqlScript = fs.readFileSync(sqlPath, 'utf8');
		log(`SQL script loaded, size: ${sqlScript.length} characters`);
		
		// Split the script into individual statements
		const statements = sqlScript.split(';').filter(stmt => stmt.trim());
		log(`Found ${statements.length} SQL statements to execute`);
		
		// Execute each statement
		for (let i = 0; i < statements.length; i++) {
			const statement = statements[i];
			if (statement.trim()) {
				log(`Executing statement ${i+1}/${statements.length}...`);
				await db.exec(statement);
				log(`Statement ${i+1} executed successfully.`);
			}
		}
		
		log('Database initialization complete.');
		return { success: true };

	} catch (error) {
		log(`Error during database initialization: ${error}`);
		throw error;
	} finally {
		// Ensure the database connection is closed even if an error occurs
		if (db) {
			await db.close();
			log('Database connection closed.');
		}
	}
}

// Export the openDb function for use in API routes
export { openDb, initializeDb };

// Optional: Run initialization immediately if needed,
// or create a separate script/command to run it.
// initializeDb().catch(console.error); 