import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function PATCH(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    const userId = user.id;
    const { ids, status } = await req.json(); 

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No question IDs provided' }, { status: 400 });
    }

    const updated = await prisma.generatedQuestion.updateMany({
      where: { id: { in: ids }, userId },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized user' }, { status: 401 });
    }

    const userId = user.id;

    await prisma.generatedQuestion.deleteMany({
      where: { status: 'REJECTED', userId },
    });

    return NextResponse.json({ message: 'All rejected questions deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}