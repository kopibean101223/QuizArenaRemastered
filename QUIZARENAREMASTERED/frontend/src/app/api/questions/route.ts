import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const professorId = searchParams.get('professor_id');
    const sessionId = searchParams.get('sessionId');

    let targetUserId = user.id;

    if (sessionId) {
      const { data: session } = await supabase.from('quiz_sessions').select('professor_id').eq('id', sessionId).single();
      if (session && session.professor_id) {
        targetUserId = session.professor_id;
      }
    } else if (professorId) {
      targetUserId = professorId;
    }

    // Filter questions by the target user ID
    const questions = await prisma.generatedQuestion.findMany({
      where: { 
        userId: targetUserId // Scope questions to the target professor
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(questions);
  } catch (error: any) {
    console.error("DETAILED GET /api/questions ERROR:", error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await req.json();

    const newQuestion = await prisma.generatedQuestion.create({
      data: {
        userId: user.id, // Explicitly assign ownership to the logged-in professor
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        topic: body.topic,
        answer: body.answer,
     choices: body.choices || [],
        testCases: body.testCases || [],
        timeLimit: Number(body.timeLimit) || 60,
        status: "APPROVED",
      },
    });

    return NextResponse.json(newQuestion);
  } catch (error: any) {
    console.error("DETAILED POST /api/questions ERROR:", error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Question ID is required for updating" }, { status: 400 });
    }

    // Ensure the professor updating the question actually owns it
    const updatedQuestion = await prisma.generatedQuestion.update({
      where: { 
        id: body.id,
        userId: user.id 
      },
      data: {
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        topic: body.topic,
        answer: body.answer,
       choices: body.choices || [],
        testCases: body.testCases || [],
        timeLimit: Number(body.timeLimit) || 60,
      },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error: any) {
    console.error("DETAILED PUT /api/questions ERROR:", error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
