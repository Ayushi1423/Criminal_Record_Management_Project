import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import { deleteFromBlob } from '@/lib/blob';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

// Use the correct typing for Next.js 15.3.0 App Router
interface RouteContext {
  params: {
    id: string;
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Get the ID from params
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json({ error: 'Criminal ID is required' }, { status: 400 });
    }

    const db = await openDb();
    
    // First, get the criminal record to check if there's an image to delete
    const criminal = await db.get('SELECT * FROM criminals WHERE id = $1', [id]);
    
    if (!criminal) {
      await db.close();
      return NextResponse.json({ error: 'Criminal record not found' }, { status: 404 });
    }

    // Delete the record from the database
    await db.run('DELETE FROM criminals WHERE id = $1', [id]);
    
    // If there's a photo, delete it from Vercel Blob
    if (criminal.photo_path) {
      try {
        // Delete the file from Vercel Blob
        await deleteFromBlob(criminal.photo_path);
        console.log('Successfully deleted photo from Vercel Blob:', criminal.photo_path);
      } catch (fileError) {
        console.error('Error deleting photo from Vercel Blob:', fileError);
        // Continue execution even if file deletion fails
      }
    }
    
    await db.close();
    
    return NextResponse.json({ 
      message: 'Criminal record deleted successfully', 
      id: id 
    });
    
  } catch (error: any) {
    console.error('Error deleting criminal record:', error);
    return NextResponse.json(
      { error: 'Failed to delete criminal record', details: error.message },
      { status: 500 }
    );
  }
}