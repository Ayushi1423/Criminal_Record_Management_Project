import { initializeDb } from '../src/lib/db';
import * as path from 'path';

console.log('Starting database initialization script...');
console.log('Current working directory:', process.cwd());
console.log('Expected data.sql path:', path.resolve(process.cwd(), 'data.sql'));
console.log('Expected database path:', path.resolve(process.cwd(), 'data.sqlite'));

initializeDb()
	.then(() => {
		console.log('Database initialization script finished successfully.');
		process.exit(0); // Exit with success code
	})
	.catch((error) => {
		console.error('Error running database initialization script:', error);
		process.exit(1); // Exit with error code
	}); 