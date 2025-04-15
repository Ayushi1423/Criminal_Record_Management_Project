import { NextRequest, NextResponse } from 'next/server';

// This tells Next.js that this route should be dynamically rendered at runtime
export const dynamic = 'force-dynamic';

// Vercel Blob webhook handler
export async function POST(request: NextRequest) {
  try {
    // Verify the request is coming from Vercel Blob
    // In a real implementation, you would validate the signature
    // But for now, we'll just parse the webhook payload
    
    const payload = await request.json();
    
    // Handle the webhook event
    console.log('Blob webhook received:', payload);
    
    // If this is an upload completion event
    if (payload.type === 'upload.complete') {
      const { url, pathname } = payload.blob || {};
      
      console.log('Blob upload completed:', url);
      
      // Example: If this is a criminal photo, you could trigger additional processing
      if (pathname?.startsWith('criminals/')) {
        console.log('Criminal photo uploaded:', url);
        // Additional actions for criminal photos if needed
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling blob webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}