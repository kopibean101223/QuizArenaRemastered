import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { ids, status } = await req.json(); 

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No question IDs provided' }, { status: 400 });
    }

      const updated = await prisma.generatedQuestion.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); 

    await prisma.generatedQuestion.deleteMany({
      where: { status: 'REJECTED' },
    });

    return NextResponse.json({ message: 'All rejected questions deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}