import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import fs from 'fs';
import path from 'path';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Make sure to await the params
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
    
    // If there's a photo, delete it from the filesystem
    if (criminal.photo_path) {
      try {
        // Convert the relative path to the absolute path
        const photoPath = path.join(process.cwd(), 'public', criminal.photo_path);
        
        // Check if the file exists
        if (fs.existsSync(photoPath)) {
          // Delete the file
          fs.unlinkSync(photoPath);
        }
      } catch (fileError) {
        console.error('Error deleting photo file:', fileError);
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