import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin


  if (code) {
    const cookieStore = await cookies()
    const cookiesToSetInResponse: { name: string; value: string; options: any }[] = []


    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
              cookiesToSetInResponse.push({ name, value, options })
            })
          },
        },
      }
    ) 

  
    const { data: authData, error: authError } = await supabase.auth.exchangeCodeForSession(code)

    if (authError) {
      console.error("❌ [Callback Route] Code exchange error:", authError.message)
      return NextResponse.redirect(`${origin}/?page=login&error=${encodeURIComponent(authError.message)}`)
    }

    if (authData?.user) {
      console.log("✅ [Callback Route] User authenticated:", authData.user.id)

 
    // 3. Resolve role from metadata or profiles table
      let role = authData.user.user_metadata?.role

      if (!role) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', authData.user.id) // Query exact column 'user_id'
          .maybeSingle()

        if (profileError) {
          console.error("⚠️ [Callback Route] Profile query error:", profileError.message)
        }

        role = profile?.role
      }
      console.log("👉 [Callback Route] Resolved role:", role)

      // 4. Determine destination URL
      let targetUrl = `${origin}/?page=role`
      if (role === 'professor') {
        targetUrl = `${origin}/?page=dashboard`
      } else if (role === 'student') {
        targetUrl = `${origin}/?page=lobby`
      }

    
      const response = NextResponse.redirect(targetUrl)
      cookiesToSetInResponse.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })

      return response
    }
  }

  return NextResponse.redirect(`${origin}/?page=login&error=Authentication-Failed`)
}