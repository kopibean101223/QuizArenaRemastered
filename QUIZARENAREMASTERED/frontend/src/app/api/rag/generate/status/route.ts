import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const url = new URL(req.url);
    const request_id = url.searchParams.get('request_id');
    if (!request_id) return NextResponse.json({ error: 'Missing request_id' }, { status: 400 });

    const fastapiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
    const pyRes = await fetch(fastapiUrl + '/generate/status/' + request_id);
    
    if (!pyRes.ok) {
        if (pyRes.status === 404) return NextResponse.json({ status: 'NOT_FOUND' }, { status: 404 });
        return NextResponse.json({ error: 'Backend error' }, { status: pyRes.status });
    }

    const pyData = await pyRes.json();
    return NextResponse.json(pyData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
