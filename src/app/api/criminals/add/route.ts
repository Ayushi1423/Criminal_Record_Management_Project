import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import { uploadToBlob } from '@/lib/blob';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

// This tells Next.js that this route should use streaming responses for larger files
export const maxDuration = 60; // Set to 60 seconds for larger file uploads

export async function POST(request: NextRequest) {
  try {
    // In App Router we need to handle multipart/form-data differently
    const formData = await request.formData();
    
    // Extract fields
    const name = formData.get('name') as string;
    const ageStr = formData.get('age') as string;
    const age = ageStr ? parseInt(ageStr, 10) : null;
    const gender = formData.get('gender') as string;
    const crime_type = formData.get('crime_type') as string;
    const crime_severity = formData.get('crime_severity') as string;
    const arrest_date = formData.get('arrest_date') as string;
    const arrest_location = formData.get('arrest_location') as string;
    const officer_in_charge = formData.get('officer_in_charge') as string;
    const case_status = formData.get('case_status') as string;
    const description = formData.get('description') as string;
    const prison_name = formData.get('prison_name') as string || null;
    const release_date = formData.get('release_date') as string || null;
    
    // Basic validation
    if (!name || !age || !gender || !crime_type || !crime_severity || !arrest_date || 
        !arrest_location || !officer_in_charge || !case_status || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Handle file upload to Vercel Blob
    let photo_path: string | null = null;
    const photo = formData.get('photo');
    
    if (photo && photo instanceof Blob) {
      try {
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}_criminal_photo.jpg`;
        
        // Get file content as ArrayBuffer
        const bytes = await photo.arrayBuffer();
        
        // Upload to Vercel Blob
        photo_path = await uploadToBlob(filename, bytes);
        
        console.log('File uploaded to Vercel Blob:', photo_path);
      } catch (uploadError) {
        console.error('Failed to upload file to Vercel Blob:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload criminal photo', details: uploadError instanceof Error ? uploadError.message : 'Unknown error' },
          { status: 500 }
        );
      }
    }
    
    const db = await openDb();
    const result = await db.run(
      `INSERT INTO criminals (name, age, gender, crime_type, crime_severity, arrest_date, arrest_location, officer_in_charge, case_status, description, prison_name, release_date, photo_path)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        name,
        age,
        gender,
        crime_type,
        crime_severity,
        arrest_date,
        arrest_location,
        officer_in_charge,
        case_status,
        description,
        prison_name,
        release_date,
        photo_path,
      ]
    );
    
    await db.close();
    
    return NextResponse.json(
      { message: 'Criminal record added successfully', id: result.lastID },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Error adding criminal record:', error);
    return NextResponse.json(
      { error: 'Failed to add criminal record', details: error.message },
      { status: 500 }
    );
  }
}