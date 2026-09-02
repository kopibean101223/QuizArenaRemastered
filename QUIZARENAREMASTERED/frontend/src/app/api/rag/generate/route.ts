import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }
    const userId = user.id;

    const { count, types, document_id, category } = await req.json();

    if (!document_id) {
      return NextResponse.json({ error: 'document_id is required' }, { status: 400 });
    }

    const doc = await prisma.syllabusDoc.findFirst({
      where: { id: Number(document_id), userId },
    });

    if (!doc) {
      return NextResponse.json({ error: 'Document not found in database' }, { status: 404 });
    }

    const fastapiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
    const pyRes = await fetch(fastapiUrl + '/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        count: Number(count) || 5,
        types: Array.isArray(types) ? types : ['Multiple Choice'],
        document_id: doc.id,
        filename: doc.filename,
        category: category || 'Mathematics'
      }),
    });

    const pyData = await pyRes.json();
    return NextResponse.json(pyData, { status: pyRes.status });

  } catch (error: any) {
    console.error('Error in /api/rag/generate:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
