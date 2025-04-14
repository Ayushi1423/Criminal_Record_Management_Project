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

    // Add conditions based on query parameters
    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`); // Use LIKE for partial matching
    }
    if (crime_type) {
      query += ' AND crime_type = ?';
      params.push(crime_type);
    }
    if (status) {
      query += ' AND case_status = ?';
      params.push(status);
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