import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Get authenticated user session from Supabase
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
if (error || !user) {
  return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
}

    const userId = user.id;

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

  
    const docRecord = await prisma.syllabusDoc.create({
      data: {
        userId: userId,
        filename: file.name,
      },
    });

    const pythonFormData = new FormData();
    pythonFormData.append("file", file);
    pythonFormData.append("docId", String(docRecord.id));

    const pyRes = await fetch(
      `${process.env.FASTAPI_URL || "http://127.0.0.1:8000"}/ingest`,
      {
        method: "POST",
        body: pythonFormData,
      }
    );

    if (!pyRes.ok) {
      throw new Error("FastAPI PDF ingestion failed");
    }

    const pyData = await pyRes.json();

    const updatedDoc = await prisma.syllabusDoc.update({
      where: { id: docRecord.id },
      data: {
        chunks: pyData.chunks || [],
      },
    });

    return NextResponse.json({
      id: updatedDoc.id,
      filename: updatedDoc.filename,
      pages: pyData.pages || 0,
      status: "ready",
    });
  } catch (error: any) {
    console.error("Error in /api/rag/upload:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}