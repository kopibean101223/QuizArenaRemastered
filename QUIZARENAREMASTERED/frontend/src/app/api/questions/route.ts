import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const normalizeQuestion = (question: any) => ({
  ...question,
  choices: Array.isArray(question.choiceRows)
    ? question.choiceRows
        .map((choice: any) => ({
          id: choice.id,
          label: choice.label,
          text: choice.text,
          isCorrect: choice.isCorrect,
        }))
        .sort((a: any, b: any) => String(a.label).localeCompare(String(b.label)))
    : [],
  citation: question.citationRow
    ? {
        id: question.citationRow.id,
        docName: question.citationRow.docName,
        section: question.citationRow.section,
        pageRange: question.citationRow.pageRange,
        excerpt: question.citationRow.excerpt,
        confidence: question.citationRow.confidence,
      }
    : null,
  choiceRows: undefined,
  citationRow: undefined,
});

const normalizeChoiceRows = (choices: any[] = []) =>
  choices.map((choice: any) => {
    if (typeof choice === "string") {
      return {
        label: "",
        text: choice,
        isCorrect: false,
      };
    }

    return {
      label: choice.label ?? choice.value ?? "",
      text: choice.text ?? choice.value ?? "",
      isCorrect: Boolean(choice.isCorrect),
    };
  });

const buildCitationPayload = (citation: any) => ({
  docName: citation?.docName || "",
  section: citation?.section || "",
  pageRange: citation?.pageRange || "",
  excerpt: citation?.excerpt || "",
  confidence: citation?.confidence || "medium",
});

export async function GET(req: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const professorId = searchParams.get("professor_id");
    const sessionId = searchParams.get("sessionId");

    let targetUserId = user.id;

    if (sessionId) {
      const { data: session } = await supabase.from("quiz_sessions").select("professor_id").eq("id", sessionId).single();
      if (session && session.professor_id) {
        targetUserId = session.professor_id;
      }
    } else if (professorId) {
      targetUserId = professorId;
    }

    const questions = await prisma.generatedQuestion.findMany({
      where: {
        userId: targetUserId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        choiceRows: true,
        citationRow: true,
      },
    });

    return NextResponse.json(questions.map(normalizeQuestion));
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
    const rawChoices = Array.isArray(body.choices) ? body.choices : [];

    const newQuestion = await prisma.generatedQuestion.create({
      data: {
        userId: user.id,
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        topic: body.topic,
        answer: body.answer,
        testCases: body.testCases || [],
        timeLimit: Number(body.timeLimit) || 60,
        status: "APPROVED",
        choiceRows: {
          create: normalizeChoiceRows(rawChoices),
        },
        citationRow: body.citation
          ? {
              create: buildCitationPayload(body.citation),
            }
          : undefined,
      },
      include: {
        choiceRows: true,
        citationRow: true,
      },
    });

    return NextResponse.json(normalizeQuestion(newQuestion));
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

    const rawChoices = Array.isArray(body.choices) ? body.choices : [];
    const updatedQuestion = await prisma.generatedQuestion.update({
      where: {
        id: body.id,
        userId: user.id,
      },
      data: {
        text: body.text,
        type: body.type,
        difficulty: body.difficulty,
        topic: body.topic,
        answer: body.answer,
        testCases: body.testCases || [],
        timeLimit: Number(body.timeLimit) || 60,
        choiceRows: {
          deleteMany: {},
          create: normalizeChoiceRows(rawChoices),
        },
        citationRow: body.citation
          ? {
              upsert: {
                create: buildCitationPayload(body.citation),
                update: buildCitationPayload(body.citation),
              },
            }
          : { delete: true },
      },
      include: {
        choiceRows: true,
        citationRow: true,
      },
    });

    return NextResponse.json(normalizeQuestion(updatedQuestion));
  } catch (error: any) {
    console.error("DETAILED PUT /api/questions ERROR:", error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
