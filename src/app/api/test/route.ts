import { NextRequest, NextResponse } from 'next/server';
import { openDb, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Test 1: Direct PostgreSQL query (should work)
    const directResult = await query('SELECT NOW() as current_time');
    
    // Test 2: Using openDb interface
    const db = await openDb();
    
    // Test with parameters using question mark style (should be converted)
    const sqliteStyleResult = await db.all(
      'SELECT * FROM criminals WHERE id > ? LIMIT ?',
      [0, 3]
    );
    
    // Test with PostgreSQL style parameters
    const pgStyleResult = await db.all(
      'SELECT * FROM criminals WHERE id > $1 LIMIT $2',
      [0, 3]
    );
    
    await db.close();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection tests completed successfully',
      directResult: directResult.rows,
      sqliteStyleResult,
      pgStyleResult,
      sqliteStyleCount: sqliteStyleResult.length,
      pgStyleCount: pgStyleResult.length
    });
  } catch (error: any) {
    console.error('Error testing database connection:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database connection test failed',
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}