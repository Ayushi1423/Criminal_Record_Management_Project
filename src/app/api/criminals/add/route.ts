import { NextRequest, NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

// Define the directory to save uploaded images
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'criminals');

// Ensure the upload directory exists
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

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
    
    // Handle file upload
    let photo_path: string | null = null;
    const photo = formData.get('photo');
    
    if (photo && photo instanceof Blob) {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_criminal_photo.jpg`;
      const filepath = path.join(UPLOAD_DIR, filename);
      
      // Ensure directory exists
      await mkdir(UPLOAD_DIR, { recursive: true });
      
      // Read the file as ArrayBuffer and write to disk
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);
      
      // Save the relative path to the database
      photo_path = path.join('/uploads', 'criminals', filename).replace(/\\/g, '/');
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
      { message: 'Criminal record added successfully', id: result.lastID || result.rows?.[0]?.id },
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