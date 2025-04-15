import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const crime_type = searchParams.get('crime_type');
  const status = searchParams.get('status');

  try {
    const db = await openDb();
    let query = 'SELECT * FROM criminals WHERE 1=1'; // Start with a base query
    const params: (string | number)[] = [];
    let paramIndex = 1; // For PostgreSQL parameter placeholders ($1, $2, etc.)

    // Add conditions based on query parameters
    if (name) {
      query += ` AND name ILIKE $${paramIndex}`;
      params.push(`%${name}%`); // Use ILIKE for case-insensitive partial matching in PostgreSQL
      paramIndex++;
    }
    if (crime_type) {
      query += ` AND crime_type = $${paramIndex}`;
      params.push(crime_type);
      paramIndex++;
    }
    if (status) {
      query += ` AND case_status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ' ORDER BY id DESC'; // Optional ordering

    const criminals = await db.all(query, params);
    await db.close();

    return NextResponse.json(criminals);
  } catch (error: any) {
    console.error('Error searching criminals:', error);
    return NextResponse.json(
      { error: 'Failed to search criminal records', details: error.message },
      { status: 500 }
    );
  }
}