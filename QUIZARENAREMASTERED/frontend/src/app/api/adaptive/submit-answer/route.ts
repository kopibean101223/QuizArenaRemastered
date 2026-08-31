import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { applyBKTUpdate, applyIRTAbilityUpdate } from '@/lib/adaptive';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { studentId, questionId, battleId, isCorrect } = await req.json();
  console.log('[api/adaptive/submit-answer] received', { studentId, questionId, isCorrect });

  const question = await prisma.generatedQuestion.findUnique({
    where: { id: questionId },
    include: { itemParameters: true },
  });
  if (!question) return NextResponse.json({ error: 'question not found' }, { status: 404 });

  const topic = question.topic ?? 'General';

  // BKT update
  const existingMastery = await prisma.studentMastery.findUnique({
    where: { studentId_knowledgeComponentId: { studentId, knowledgeComponentId: topic } },
  });
  const newMastery = applyBKTUpdate(
    existingMastery
      ? { studentId, knowledgeComponentId: topic, pLt: existingMastery.pLt, responseCount: existingMastery.responseCount, updatedAt: existingMastery.updatedAt.toISOString() }
      : null,
    studentId,
    topic,
    isCorrect
  );
  await prisma.studentMastery.upsert({
    where: { studentId_knowledgeComponentId: { studentId, knowledgeComponentId: topic } },
    update: { pLt: newMastery.pLt, responseCount: newMastery.responseCount },
    create: { studentId, knowledgeComponentId: topic, pLt: newMastery.pLt, responseCount: newMastery.responseCount },
  });

  // IRT update
  const bI = question.itemParameters?.bI ?? 0;
  const existingAbility = await prisma.studentAbility.findUnique({ where: { studentId } });
  const newAbility = applyIRTAbilityUpdate(
    existingAbility
      ? { studentId, theta: existingAbility.theta, responseCount: existingAbility.responseCount, updatedAt: existingAbility.updatedAt.toISOString() }
      : null,
    studentId,
    bI,
    isCorrect
  );
  await prisma.studentAbility.upsert({
    where: { studentId },
    update: { theta: newAbility.theta, responseCount: newAbility.responseCount },
    create: { studentId, theta: newAbility.theta, responseCount: newAbility.responseCount },
  });

  // Response log (needed for R(q), coverage, and future recalibration)
  await prisma.studentResponseLog.create({
    data: { studentId, questionId, battleId, isCorrect, thetaAtTime: newAbility.theta, bIAtTime: bI },
  });

  console.log('[api/adaptive/submit-answer] done', {
    newMastery: newMastery.pLt.toFixed(4),
    newTheta: newAbility.theta.toFixed(4),
  });

  return NextResponse.json({ mastery: newMastery, ability: newAbility });
}