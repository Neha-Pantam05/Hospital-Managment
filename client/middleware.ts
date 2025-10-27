import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Since middleware can't access localStorage, we'll check differently
  const isLoginPage = request.nextUrl.pathname === '/';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isPatients = request.nextUrl.pathname.startsWith('/patients');
  const isAppointments = request.nextUrl.pathname.startsWith('/appointments');
  
  const isProtectedPage = isDashboard || isPatients || isAppointments;


  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/patients/:path*',
    '/appointments/:path*',
    '/',
  ],
};