import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next'

export default async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 1. Initialize Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: MUST use getUser() to validate auth on server
  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  // 2. Resolve requested page state safely
  const pageParam = url.searchParams.get('page')?.toLowerCase()
  const pathName = url.pathname.toLowerCase().replace(/^\/+|\/+$/g, '') // Strips leading/trailing slashes clean

  // Explicitly identify routes
  const isAuthPage = pageParam === 'login' || pageParam === 'register' || pathName === 'login' || pathName === 'register'
  const isRolePage = pageParam === 'role' || pathName === 'role'
  const isRootPath = !pageParam && pathName === ''

  // Helper to construct clean redirect URL while PRESERVING updated auth cookies
  const redirectWithNoCache = (targetPage: string, extraParam?: { key: string; val: string }) => {
    const targetUrl = request.nextUrl.clone()
    targetUrl.pathname = '/'
    targetUrl.search = '' // Clear existing params
    targetUrl.searchParams.set('page', targetPage)
    if (extraParam) {
      targetUrl.searchParams.set(extraParam.key, extraParam.val)
    }

    const redirectRes = NextResponse.redirect(targetUrl)

    // FIX: Copy all updated session cookies from `response` to the redirect response
    response.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie)
    })

    // Prevent browser back-button caching
    redirectRes.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    return redirectRes
  }

  // ----------------------------------------------------
  // CASE A: Unauthenticated User
  // ----------------------------------------------------
  if (!user) {
    if (!isAuthPage) {
      return redirectWithNoCache('login')
    }
    return response
  }

  // ----------------------------------------------------
  // CASE B: Authenticated User -> Lookup Role
  // ----------------------------------------------------
  let role = user.user_metadata?.role

  if (!role) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    role = profile?.role
  }

  // ----------------------------------------------------
  // CASE C: Authenticated User WITHOUT Role
  // ----------------------------------------------------
  if (!role) {
    if (!isRolePage) {
      return redirectWithNoCache('role')
    }
    return response
  }

  // ----------------------------------------------------
  // CASE D: Authenticated User WITH Role
  // ----------------------------------------------------
  const defaultPage = role === 'professor' ? 'dashboard' : 'lobby'

  // Block logged-in users from accessing Auth, Role selection, or Root '/'
  if (isAuthPage || isRolePage || isRootPath) {
    return redirectWithNoCache(defaultPage)
  }

  // Role authorization checks
  if ((pageParam === 'dashboard' || pathName === 'dashboard') && role !== 'professor') {
    return redirectWithNoCache('lobby', { key: 'error', val: 'unauthorized_professor' })
  }

  if ((pageParam === 'lobby' || pathName === 'lobby') && role !== 'student') {
    return redirectWithNoCache('dashboard', { key: 'error', val: 'unauthorized_student' })
  }

  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}