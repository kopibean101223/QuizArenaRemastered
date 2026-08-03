'use client'

import { createBrowserSupabaseClient } from '@/lib/supabase/client'

const supabase = createBrowserSupabaseClient()

export async function signUpUser(email: string, password: string, name: string, role: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: role,
      },
    },
  })

  if (error) throw error
  return data
}

export async function loginUserAndFetchRole(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error


  let role = data.user?.user_metadata?.role


  if (!role && data.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle()

    role = profile?.role
  }

  return role
}

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        hd: 'umak.edu.ph',
      },
    },
  })

  if (error) throw error
  return data
}