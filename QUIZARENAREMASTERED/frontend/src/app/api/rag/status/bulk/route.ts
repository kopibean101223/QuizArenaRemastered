import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { ids, status } = await req.json(); // ids: number[], status: 'APPROVED' | 'REJECTED'

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No question IDs provided' }, { status: 400 });
    }

    if (status === 'REJECTED') {
      // Deleting rejected questions immediately prevents database bloat
      await prisma.generatedQuestion.deleteMany({
        where: { id: { in: ids } },
      });
      return NextResponse.json({ message: 'Questions rejected and removed from database' });
    }

    // Update status for approved questions
    const updated = await prisma.generatedQuestion.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}