import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

  
    const questions = await prisma.generatedQuestion.findMany({
      where: {
        status: "APPROVED"
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(questions);
  } catch (error: any) {
    console.error("Error fetching question bank API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
        userId: user.id,
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        topic: body.topic,
        answer: body.answer,
        choices: body.choices || [],
        testCases: body.testCases || [],
        timeLimit: Number(body.timeLimit) || 60,
        status: "APPROVED", // Auto-approve manual creations
      }
    });

    return NextResponse.json(newQuestion);
  } catch (error: any) {
    console.error("Error saving manual question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
      }
    });

    return NextResponse.json(updatedQuestion);
  } catch (error: any) {
    console.error("Error updating question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}