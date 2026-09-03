import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    const userId = user.id;

    // Use Prisma for docs
    const docs = await prisma.syllabusDoc.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      include: {
        questions: {
          include: {
            choiceRows: true,
            citationRow: true,
          }
        }
      }
    });

    const questions = await prisma.generatedQuestion.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      include: {
        choiceRows: true,
        citationRow: true,
      }
    });

    const normalizeQuestion = (question: any) => ({
      ...question,
      choices: Array.isArray(question.choiceRows)
        ? question.choiceRows
            .map((choice: any) => ({
              id: choice.id,
              label: choice.label,
              text: choice.text,
              isCorrect: choice.isCorrect,
            }))
            .sort((a: any, b: any) => String(a.label).localeCompare(String(b.label)))
        : [],
      citation: question.citationRow ? {
        id: question.citationRow.id,
        docName: question.citationRow.docName,
        section: question.citationRow.section,
        pageRange: question.citationRow.pageRange,
        excerpt: question.citationRow.excerpt,
        confidence: question.citationRow.confidence,
      } : null,
      choiceRows: undefined,
      citationRow: undefined,
    });

    const normalizedDocs = docs.map((doc) => ({
      ...doc,
      questions: Array.isArray(doc.questions) ? doc.questions.map(normalizeQuestion) : [],
    }));

    return NextResponse.json({ docs: normalizedDocs, questions: questions.map(normalizeQuestion) });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
  }
}
