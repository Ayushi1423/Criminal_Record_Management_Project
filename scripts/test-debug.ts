console.log('Debug test script');
console.log('Current working directory:', process.cwd());

// Try to access the data.sql file
import * as fs from 'fs';
import * as path from 'path';

const sqlPath = path.resolve(process.cwd(), 'data.sql');
console.log('SQL path:', sqlPath);
console.log('SQL file exists:', fs.existsSync(sqlPath));

// Exit with success code
process.exit(0); 