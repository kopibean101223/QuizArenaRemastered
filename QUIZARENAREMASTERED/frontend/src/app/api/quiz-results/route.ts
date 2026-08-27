import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side ONLY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request
    if (!body.session_id || !body.user_id) {
      return NextResponse.json({ error: "Missing session_id or user_id" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('quiz_results').insert([{
      session_id: body.session_id,
      user_id: body.user_id,
      score: body.score || 0,
      correct_answers: body.correct_answers || 0,
      total_questions: body.total_questions || 0,
      accuracy: body.accuracy || 0,
    }]);

    if (error) {
      console.error("Supabase API Insert Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

