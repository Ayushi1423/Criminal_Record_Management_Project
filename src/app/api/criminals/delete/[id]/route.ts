import { NextRequest, NextResponse } from 'next/server';

// Simple placeholder route that returns a message - functionality to be implemented later
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Delete functionality will be implemented later',
    status: 'not_implemented'
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Delete functionality will be implemented later',
    status: 'not_implemented'
  });
}
