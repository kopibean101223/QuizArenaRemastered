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
      orderBy: { id: 'desc' }
    });
    
    // Use Supabase for questions to get answerData and estimatedDifficulty which are not in Prisma schema
    const { data: qData } = await supabase
      .from('GeneratedQuestion')
      .select('*, choices:QuestionChoice(*), citation:QuestionCitation(*)')
      .eq('userId', userId)
      .order('id', { ascending: false });

    return NextResponse.json({ docs, questions: qData || [] });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
  }
}