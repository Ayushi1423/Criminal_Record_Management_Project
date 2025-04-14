import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await openDb();
    // Select all columns from the criminals table
    const criminals = await db.all('SELECT * FROM criminals ORDER BY id DESC');
    await db.close();

    return NextResponse.json(criminals);
  } catch (error: any) {
    console.error('Error fetching criminals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch criminal records', details: error.message },
      { status: 500 }
    );
  }
} 