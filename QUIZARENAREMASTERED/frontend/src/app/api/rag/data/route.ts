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

    const docs = await prisma.syllabusDoc.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    });
    
    const questions = await prisma.generatedQuestion.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    });

    return NextResponse.json({ docs, questions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
  }
}