import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const docs = await prisma.syllabusDoc.findMany({ orderBy: { id: 'desc' } });
    const questions = await prisma.generatedQuestion.findMany({ orderBy: { id: 'desc' } });
    return NextResponse.json({ docs, questions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch database records' }, { status: 500 });
  }
}