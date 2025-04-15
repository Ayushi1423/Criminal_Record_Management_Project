import { NextRequest, NextResponse } from 'next/server';

declare global {
  // Define App Router params type
  type RouteParams<T extends Record<string, string>> = {
    params: T;
  };
  
  // Common route handler types
  type RouteHandler<T extends Record<string, string> = Record<string, string>> = (
    req: NextRequest,
    context: RouteParams<T>
  ) => Promise<NextResponse> | NextResponse;
}

export {};
