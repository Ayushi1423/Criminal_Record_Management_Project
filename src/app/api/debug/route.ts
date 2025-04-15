import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      authenticated: !!session,
      session,
      message: "This route helps debug the session state"
    });
  } catch (error) {
    console.error('Error in debug session route:', error);
    return NextResponse.json({
      error: 'Failed to get session information',
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}