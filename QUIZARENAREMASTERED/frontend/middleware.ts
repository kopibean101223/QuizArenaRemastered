import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// 1. Define Role Page Access Rules
const STUDENT_PAGES = ['lobby', 'battle', 'results', 'student_dashboard', 'history', 'classes', 'profile']
const PROFESSOR_PAGES = ['dashboard', 'sections', 'questions', 'aigen', 'matchmaking', 'analyzer']

export default async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 2. Initialize Supabase Server Client
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
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Authenticate User
  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  // Resolve requested route safely (handles both pathname and ?page= parameter)
  const pageParam = url.searchParams.get('page')?.toLowerCase()
  const pathName = url.pathname.toLowerCase().replace(/^\/+|\/+$/g, '') // Strips leading/trailing slashes
  const activeRoute = pageParam || pathName // Evaluates the targeted view/page

  const isAuthPage = activeRoute === 'login' || activeRoute === 'register'
  const isRolePage = activeRoute === 'role'
  const isRootPath = !pageParam && pathName === ''

  // Helper to construct redirect URLs while preserving auth cookies & preventing cache
  const redirectWithNoCache = (targetPage: string, extraParam?: { key: string; val: string }) => {
    const targetUrl = request.nextUrl.clone()
    targetUrl.pathname = '/'
    targetUrl.search = '' // Clear existing params
    targetUrl.searchParams.set('page', targetPage)
    if (extraParam) {
      targetUrl.searchParams.set(extraParam.key, extraParam.val)
    }

    const redirectRes = NextResponse.redirect(targetUrl)

    // Copy updated auth cookies to redirect response
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie)
    })

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
    return supabaseResponse
  }

  // ----------------------------------------------------
  // CASE B: Resolve User Role
  // ----------------------------------------------------
  let role: 'student' | 'professor' | null = user.user_metadata?.role || null

  if (!role) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    role = profile?.role || null
  }

  // ----------------------------------------------------
  // CASE C: Authenticated User WITHOUT Role
  // ----------------------------------------------------
  if (!role) {
    if (!isRolePage) {
      return redirectWithNoCache('role')
    }
    return supabaseResponse
  }

  // ----------------------------------------------------
  // CASE D: Role-Based Routing & Authorization Checks
  // ----------------------------------------------------
  const defaultPage = role === 'professor' ? 'dashboard' : 'student_dashboard'

  // Block logged-in users from Auth, Role Selection, or root '/'
  if (isAuthPage || isRolePage || isRootPath) {
    return redirectWithNoCache(defaultPage);
  }

  // Prevent Students from accessing Professor pages
  if (role === 'student' && PROFESSOR_PAGES.includes(activeRoute)) {
    return redirectWithNoCache('student_dashboard', { key: 'error', val: 'unauthorized_professor_access' })
  }

  // Prevent Professors from accessing Student pages
  if (role === 'professor' && STUDENT_PAGES.includes(activeRoute)) {
    return redirectWithNoCache('dashboard', { key: 'error', val: 'unauthorized_student_access' })
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}