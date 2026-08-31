import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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

 
    const { count, difficulty, types, document_id, category } = await req.json();

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
        category: 'Mathematics', 
        requireRubric: true
      }),
    });

    const pyData = await pyRes.json();

    if (!pyRes.ok) {
      const errorMessage = pyData?.detail || pyData?.error || 'FastAPI generation failed';
      return NextResponse.json({ error: errorMessage }, { status: pyRes.status });
    }

   const rawQuestions = Array.isArray(pyData) ? pyData : pyData.questions || [];
    const validQuestions = rawQuestions.filter((q: any) => 
      q.text && 
      q.answer && 
      q.citation && 
      (!types.includes("Step-by-step Solution") || (q.stepWeights && q.partialCreditRules))
    );

    if (validQuestions.length === 0) {
      return NextResponse.json({ error: 'AI failed to generate valid Mathematics schemas with partial credit rubrics.' }, { status: 422 });
    }

    const savedQuestions = await Promise.all(
      rawQuestions.map((q: any) =>
        prisma.generatedQuestion.create({
          data: {
            userId: userId, 
            docId: doc.id,
            text: q.text,
            type: q.type || 'Multiple Choice',
            difficulty: q.difficulty || difficulty || 'Medium',
            topic: category && category !== 'General' ? category : (doc.filename || 'General'),
            answer: q.answer || '',
            status: 'PENDING',
            choices: {
                create: (q.choices || []).map((c: any) => ({
                    label: c.label || '',
                    text: c.text || '',
                    isCorrect: !!c.isCorrect,
                }))
            },
            citation: q.citation ? {
                create: {
                    docName: q.citation.docName || doc.filename || '',
                    section: q.citation.section || '',
                    pageRange: q.citation.pageRange || '',
                    excerpt: q.citation.excerpt || '',
                    confidence: q.citation.confidence || 'medium'
                }
            } : undefined
          },
          include: { choices: true, citation: true }
        })
      )
    );

    return NextResponse.json(savedQuestions);
  } catch (error: any) {
    console.error('Error in /api/rag/generate:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}