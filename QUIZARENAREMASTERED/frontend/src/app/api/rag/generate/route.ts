import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    // 1. Authenticate user using getUser() (fixes security warning)
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    const userId = user.id;

    // 2. Parse payload
   // 2. Parse payload
    const { count, difficulty, types, document_id, category } = await req.json(); // <-- Add category here  

    if (!document_id) {
      return NextResponse.json({ error: 'document_id is required' }, { status: 400 });
    }

    // 3. Fetch syllabus doc from Supabase
    const doc = await prisma.syllabusDoc.findUnique({
      where: { id: Number(document_id) },
    });

    if (!doc) {
      return NextResponse.json({ error: 'Document not found in database' }, { status: 404 });
    }

    // 4. Send request to Python FastAPI Engine
    const fastapiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
    const pyRes = await fetch(`${fastapiUrl}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        count: Number(count) || 5,
        difficulty: difficulty || 'Medium',
        types: Array.isArray(types) ? types : ['Multiple Choice'],
        document_id: doc.id,
        chunks: doc.chunks || [],
        filename: doc.filename,
        category: category || 'General',
      }),
    });

    const pyData = await pyRes.json();

    if (!pyRes.ok) {
      const errorMessage = pyData?.detail || pyData?.error || 'FastAPI generation failed';
      return NextResponse.json({ error: errorMessage }, { status: pyRes.status });
    }

    const rawQuestions = Array.isArray(pyData) ? pyData : pyData.questions || [];

    // 5. Save generated questions in Supabase with userId
    const savedQuestions = await Promise.all(
      rawQuestions.map((q: any) =>
        prisma.generatedQuestion.create({
          data: {
            userId: userId, // <-- Solves "Argument userId is missing"
            docId: doc.id,
            text: q.text,
            type: q.type || 'Multiple Choice',
            difficulty: q.difficulty || difficulty || 'Medium',
            topic: q.topic || 'General',
            answer: q.answer || '',
            choices: q.choices || [],
            citation: q.citation || {},
            status: 'PENDING',
          },
        })
      )
    );

    return NextResponse.json(savedQuestions);
  } catch (error: any) {
    console.error('Error in /api/rag/generate:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}