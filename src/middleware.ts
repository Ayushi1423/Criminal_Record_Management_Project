import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

// Configure paths that require authentication
const authenticatedPaths = ['/dashboard', '/criminals']
// Configure paths that should be accessible only for non-authenticated users
const nonAuthenticatedPaths = ['/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if the path should be protected
  const isAuthenticatedPath = authenticatedPaths.some(route => path.startsWith(route))
  const isNonAuthenticatedPath = nonAuthenticatedPaths.some(route => path === route)
  
  // Get the authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  const isAuthenticated = !!token
  
  // Redirect authenticated users away from login/signup pages
  if (isAuthenticated && isNonAuthenticatedPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Redirect non-authenticated users to login
  if (!isAuthenticated && isAuthenticatedPath) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }
  
  // Allow the request to proceed normally
  return NextResponse.next()
}

// Configure paths that should be checked by the middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}