// middleware.ts (En la raíz de tu proyecto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const tieneSesion = request.cookies.get('sesion_mambo')?.value;
  const rutaSolicitada = request.nextUrl.pathname;

  if (!tieneSesion) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/mi-cuenta/:path*',  
    '/checkout/:path*',   
    '/favoritos/:path*'    
  ],
};