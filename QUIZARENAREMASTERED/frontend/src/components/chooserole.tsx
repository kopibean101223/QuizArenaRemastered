'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { useApp } from '@/context/AppContext'

const supabase = createBrowserSupabaseClient()

export default function ChooseRole() {
  const router = useRouter()
  const { setPage } = useApp() // 1. Pull setPage from AppContext

  const [selectedRole, setSelectedRole] = useState<'student' | 'professor' | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleConfirmRole = async () => {
    if (!selectedRole) return
    setLoading(true)
    setErrorMessage(null)

    try {
      // 1. Get current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw new Error('User session not found. Please log in again.')

      // 2. Update user_metadata in Supabase Auth
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: selectedRole },
      })
      if (metadataError) throw metadataError

      // 3. Upsert into 'profiles' table for DB persistence
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          { 
            user_id: user.id, 
            role: selectedRole
          
          },
          { onConflict: 'user_id' }
        )

      if (profileError) throw profileError

      // 4. Update AppContext state & URL search params
      if (selectedRole === 'professor') {
        if (setPage) setPage('dashboard')
        router.push('/?page=dashboard')
      } else {
        if (setPage) setPage('lobby')
        router.push('/?page=lobby')
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update role. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Welcome to QuizArena
          </h1>
          <p className="text-slate-400 text-sm">
            Select your account type to customize your workspace
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Student Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('student')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
              selectedRole === 'student'
                ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/20'
                : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 text-2xl font-bold">
              ⚔️
            </div>
            <h2 className="text-lg font-bold mb-1">Student</h2>
            <p className="text-xs text-slate-400 text-center">
              Join live quiz battles, enter match lobbies, and track your scores
            </p>
          </button>

          {/* Professor Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('professor')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer ${
              selectedRole === 'professor'
                ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/20'
                : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 text-2xl font-bold">
              🎓
            </div>
            <h2 className="text-lg font-bold mb-1">Professor</h2>
            <p className="text-xs text-slate-400 text-center">
              Generate AI questions, manage section rosters, and launch arena games
            </p>
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmRole}
          disabled={!selectedRole || loading}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
            selectedRole && !loading
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Saving Role...' : 'Continue to Arena'}
        </button>
      </div>
    </div>
  )
}