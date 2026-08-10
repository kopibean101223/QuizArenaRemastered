import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { questionId, status } = await req.json(); 
    if (status === 'REJECTED') {
      await prisma.generatedQuestion.delete({
        where: { id: Number(questionId) },
      });
      return NextResponse.json({ status: 'REJECTED', deleted: true });
    }

    const updated = await prisma.generatedQuestion.update({
      where: { id: Number(questionId) },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}