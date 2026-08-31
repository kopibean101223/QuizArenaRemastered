import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  selectNextQuestion,
  recordAnswerInSession,
  SessionState,
  QuestionMeta,
  BKTState,
  StudentAbility,
  ItemParams,
} from '@/lib/adaptive';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { studentId, battleId, docId } = await req.json();
  console.log('[api/adaptive/next-question] request', { studentId, battleId, docId });

  // 1. Pull the approved question bank for this doc/section
  const bankRows = await prisma.generatedQuestion.findMany({
    where: { docId, status: 'APPROVED' },
    include: { itemParameters: true },
  });

  const questionBank: QuestionMeta[] = bankRows.map((q) => ({
    questionId: q.id,
    topic: q.topic ?? 'General',
    questionType: q.type,
    llmDifficulty: (q.difficulty as 'Easy' | 'Medium' | 'Hard') ?? 'Medium',
    choices: Array.isArray(q.choices) ? (q.choices as any) : [],
    correctAnswer: q.answer ?? '',
    embeddingVector: (q.citation as any)?.embedding ?? [], // wire to your real embedding field
  }));

  // 2. Load student's BKT states for every topic present in this bank
  const topics = Array.from(new Set(questionBank.map((q) => q.topic)));
  const masteryRows = await prisma.studentMastery.findMany({
    where: { studentId, knowledgeComponentId: { in: topics } },
  });
  const bktStates = new Map<string, BKTState>(
    masteryRows.map((m) => [
      m.knowledgeComponentId,
      {
        studentId,
        knowledgeComponentId: m.knowledgeComponentId,
        pLt: m.pLt,
        responseCount: m.responseCount,
        updatedAt: m.updatedAt.toISOString(),
      },
    ])
  );

  // 3. Load student ability
  const abilityRow = await prisma.studentAbility.findUnique({ where: { studentId } });
  const studentAbility: StudentAbility | null = abilityRow && {
    studentId,
    theta: abilityRow.theta,
    responseCount: abilityRow.responseCount,
    updatedAt: abilityRow.updatedAt.toISOString(),
  };

  // 4. Load item params
  const itemRows = await prisma.itemParameters.findMany({
    where: { questionId: { in: questionBank.map((q) => q.questionId as number) } },
  });
  const itemParamsByQuestionId = new Map<number, ItemParams>(
    itemRows.map((i) => [
      i.questionId,
      {
        questionId: i.questionId,
        bI: i.bI,
        aI: i.aI ?? undefined,
        cI: i.cI ?? undefined,
        responseCount: i.responseCount,
        llmDifficultyLabel: i.llmDifficultyLabel as any,
        isCalibrated: i.isCalibrated,
      },
    ])
  );

  // 5. Rebuild session state (in production, cache this in Redis per battleId+studentId
  //    instead of recomputing every request — see note at bottom)
  const answeredRows = await prisma.studentResponseLog.findMany({
    where: { studentId, battleId },
  });
  const session: SessionState = {
    studentId,
    battleId,
    answeredQuestionIds: new Set(answeredRows.map((r) => r.questionId)),
    recentQuestions: [], // hydrate from Redis in production for accurate R(q)
    topicCoverageCounts: {}, // same — hydrate from Redis
    isCalibrationPhase: answeredRows.length < 5,
    calibrationQuestionsServed: answeredRows.length,
  };

  const result = selectNextQuestion({
    session,
    questionBank,
    studentAbility,
    bktStates,
    itemParamsByQuestionId,
    hasStudentHistory: !!abilityRow,
    hasItemResponseData: itemRows.length > 0,
  });

  console.log('[api/adaptive/next-question] result', {
    mode: result.mode,
    reason: result.reason,
    selectedQuestionId: result.selected?.questionId,
  });

  return NextResponse.json(result);
}