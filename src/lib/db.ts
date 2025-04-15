import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to get a database connection
async function getConnection() {
  return await pool.connect();
}

// Function to execute a query
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Helper to convert legacy parameter style ($1, $2, etc. for PostgreSQL)
function convertPlaceholders(query: string): string {
  // Don't modify queries that already use PostgreSQL-style placeholders
  if (query.includes('$1')) {
    return query;
  }
  
  let paramIndex = 1;
  return query.replace(/\?/g, () => `$${paramIndex++}`);
}

// Create a database interface with common methods
async function openDb() {
  return {
    all: async (text: string, params?: any[]) => {
      const convertedText = convertPlaceholders(text);
      const result = await query(convertedText, params);
      return result.rows;
    },
    get: async (text: string, params?: any[]) => {
      const convertedText = convertPlaceholders(text);
      const result = await query(convertedText, params);
      return result.rows[0];
    },
    run: async (text: string, params?: any[]) => {
      // Check if the query needs RETURNING id for PostgreSQL
      let convertedText = convertPlaceholders(text);
      
      // Add RETURNING id to INSERT queries if not already present
      if (
        convertedText.trim().toUpperCase().startsWith('INSERT') && 
        !convertedText.includes('RETURNING')
      ) {
        convertedText += ' RETURNING id';
      }
      
      const result = await query(convertedText, params);
      return {
        lastID: result.rows[0]?.id || null,
        changes: result.rowCount
      };
    },
    exec: async (text: string) => {
      return await query(text);
    },
    close: async () => {
      // Pool connections are released automatically
      return;
    }
  };
}

// Export the functions for use in API routes
export { openDb, getConnection };