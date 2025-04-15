import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import { deleteFromBlob } from '@/lib/blob';

export const dynamic = 'force-dynamic';

// Define DELETE handler instead of GET for deletion
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'Criminal ID is required' }, { status: 400 });
    }

    const db = await openDb();
    
    const criminal = await db.get('SELECT * FROM criminals WHERE id = $1', [id]);
    
    if (!criminal) {
      await db.close();
      return NextResponse.json({ error: 'Criminal record not found' }, { status: 404 });
    }

    await db.run('DELETE FROM criminals WHERE id = $1', [id]);
    
    if (criminal.photo_path) {
      try {
        await deleteFromBlob(criminal.photo_path);
      } catch (fileError) {
        console.error('Error deleting photo from Vercel Blob:', fileError);
      }
    }
    
    await db.close();
    
    return NextResponse.json({ 
      message: 'Criminal record deleted successfully', 
      id
    });
    
  } catch (error: any) {
    console.error('Error deleting criminal record:', error);
    return NextResponse.json(
      { error: 'Failed to delete criminal record', details: error.message },
      { status: 500 }
    );
  }
}

// Keep GET method for backward compatibility but implement it properly
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Simply call the DELETE handler to avoid code duplication
  return DELETE(request, { params });
}
