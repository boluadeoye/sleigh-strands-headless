import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin')) {
    return NextResponse.redirect('https://sleighstrands.com/admin/wp-admin/', 307)
  }
  return NextResponse.next()
}
export const config = { matcher: '/admin/:path*' }
