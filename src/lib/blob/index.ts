import { put, del, list } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob
 * @param {string} filename - The filename for the blob
 * @param {Buffer | ArrayBuffer | Blob} content - The file content
 * @param {boolean} isPublic - Whether the file should be publicly accessible
 * @returns {Promise<string>} - Returns the URL of the uploaded blob
 */
export async function uploadToBlob(
  filename: string, 
  content: Buffer | ArrayBuffer | Blob,
  isPublic: boolean = true
): Promise<string> {
  try {
    const { url } = await put(`criminals/${filename}`, content, { 
      access: isPublic ? 'public' : 'private' 
    });
    return url;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw error;
  }
}

/**
 * Delete a file from Vercel Blob
 * @param {string} url - The URL of the blob to delete
 * @returns {Promise<void>}
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error);
    throw error;
  }
}

/**
 * List all blobs in the criminals folder
 * @returns {Promise<Array>} - Returns list of blobs
 */
export async function listBlobs() {
  try {
    const { blobs } = await list({ prefix: 'criminals/' });
    return blobs;
  } catch (error) {
    console.error('Error listing Vercel Blobs:', error);
    throw error;
  }
}