/**
 * This script migrates existing criminal photos from the file system to Vercel Blob
 * 
 * Usage: 
 * 1. Make sure your BLOB_READ_WRITE_TOKEN is set in .env
 * 2. Run: npx ts-node -r dotenv/config scripts/migrations/migrate-photos-to-blob.ts
 */

import { openDb } from '../../src/lib/db';
import { uploadToBlob } from '../../src/lib/blob';
import path from 'path';
import fs from 'fs';

// Define the directory where criminal photos are stored
const CRIMINALS_DIR = path.join(process.cwd(), 'public', 'uploads', 'criminals');

async function migratePhotosToBlob() {
  console.log('Starting migration of criminal photos to Vercel Blob...');
  
  // Open database connection
  const db = await openDb();

  try {
    // Get all criminals with photo paths
    const criminals = await db.all('SELECT id, name, photo_path FROM criminals WHERE photo_path IS NOT NULL');
    
    console.log(`Found ${criminals.length} criminals with photos to migrate.`);
    
    for (const criminal of criminals) {
      try {
        // Skip if the photo path already points to a Vercel Blob URL
        if (criminal.photo_path.startsWith('https://')) {
          console.log(`Criminal #${criminal.id} (${criminal.name}) already has a Blob URL: ${criminal.photo_path}`);
          continue;
        }
        
        // Convert relative path to absolute path
        const relativePath = criminal.photo_path.replace(/^\/uploads\/criminals\//, '');
        const absolutePath = path.join(CRIMINALS_DIR, relativePath);
        
        // Check if file exists
        if (!fs.existsSync(absolutePath)) {
          console.error(`Photo file not found for criminal #${criminal.id} (${criminal.name}): ${absolutePath}`);
          continue;
        }
        
        // Read file
        const fileBuffer = fs.readFileSync(absolutePath);
        
        // Upload to Vercel Blob
        const blobUrl = await uploadToBlob(relativePath, fileBuffer);
        
        // Update database record
        await db.run(
          'UPDATE criminals SET photo_path = $1 WHERE id = $2',
          [blobUrl, criminal.id]
        );
        
        console.log(`Migrated photo for criminal #${criminal.id} (${criminal.name}): ${blobUrl}`);
        
      } catch (error) {
        console.error(`Error migrating photo for criminal #${criminal.id} (${criminal.name}):`, error);
      }
    }
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close database connection
    await db.close();
  }
}

// Run the migration
migratePhotosToBlob().catch(console.error);
