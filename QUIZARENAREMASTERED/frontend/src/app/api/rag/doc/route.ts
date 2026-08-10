import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }

    const docId = Number(id);

    await prisma.generatedQuestion.deleteMany({
      where: {
        docId: docId,
        status: 'REJECTED' 
      }
    });

    await prisma.generatedQuestion.updateMany({
      where: { docId: docId },
      data: { docId: null }
    });

    await prisma.syllabusDoc.delete({
      where: { id: docId }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}