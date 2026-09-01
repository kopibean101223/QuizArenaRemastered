import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { applyBKTUpdate, applyIRTAbilityUpdate } from '@/lib/adaptive';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { studentId, questionId, battleId, isCorrect } = await req.json();
    console.log('═'.repeat(80));
    console.log('[ADAPTIVE] ╔════ SUBMIT_ANSWER ════╗');
    console.log('[ADAPTIVE] INPUT:', { studentId, questionId, battleId, isCorrect });

    if (!studentId || !questionId) {
      console.warn('[ADAPTIVE] ✗ Missing required parameters');
      return NextResponse.json(
        { error: 'studentId and questionId are required' },
        { status: 400 }
      );
    }

    const question = await prisma.generatedQuestion.findUnique({
      where: { id: questionId },
      include: { itemParameters: true },
    });
    if (!question) {
      console.warn('[ADAPTIVE] ✗ Question not found in DB:', { questionId });
      return NextResponse.json({ error: 'question not found' }, { status: 404 });
    }

    const topic = question.topic ?? 'General';
    console.log('[ADAPTIVE] QUESTION LOADED:', {
      questionId,
      topic,
      difficulty: question.difficulty,
      hasItemParams: !!question.itemParameters,
    });

    // BKT update
    console.log(`[ADAPTIVE] ┌─ BKT UPDATE (Mastery: ${topic})`);
    const existingMastery = await prisma.studentMastery.findUnique({
      where: { studentId_knowledgeComponentId: { studentId, knowledgeComponentId: topic } },
    });
    
    const priorMastery = existingMastery?.pLt ?? '(new)';
    console.log(`[ADAPTIVE] │ Prior mastery (pLt): ${priorMastery}`);
    
    const newMastery = applyBKTUpdate(
      existingMastery
        ? { studentId, knowledgeComponentId: topic, pLt: existingMastery.pLt, responseCount: existingMastery.responseCount, updatedAt: existingMastery.updatedAt.toISOString() }
        : null,
      studentId,
      topic,
      isCorrect
    );
    
    console.log(`[ADAPTIVE] │ Response: ${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}`);
    console.log(`[ADAPTIVE] │ New mastery (pLt): ${newMastery.pLt.toFixed(4)}`);
    console.log(`[ADAPTIVE] │ Response count: ${newMastery.responseCount}`);
    
    await prisma.studentMastery.upsert({
      where: { studentId_knowledgeComponentId: { studentId, knowledgeComponentId: topic } },
      update: { pLt: newMastery.pLt, responseCount: newMastery.responseCount },
      create: { studentId, knowledgeComponentId: topic, pLt: newMastery.pLt, responseCount: newMastery.responseCount },
    });
    console.log(`[ADAPTIVE] └─ BKT saved to DB`);

    // IRT update
    console.log(`[ADAPTIVE] ┌─ IRT UPDATE (Ability: theta)`);
    const bI = question.itemParameters?.bI ?? 0;
    console.log(`[ADAPTIVE] │ Question difficulty (b_i): ${bI.toFixed(4)}`);
    
    const existingAbility = await prisma.studentAbility.findUnique({ where: { studentId } });
    const priorTheta = existingAbility?.theta ?? 0;
    console.log(`[ADAPTIVE] │ Prior ability (theta): ${priorTheta.toFixed(4)}`);
    
    const newAbility = applyIRTAbilityUpdate(
      existingAbility
        ? { studentId, theta: existingAbility.theta, responseCount: existingAbility.responseCount, updatedAt: existingAbility.updatedAt.toISOString() }
        : null,
      studentId,
      bI,
      isCorrect
    );
    
    console.log(`[ADAPTIVE] │ New ability (theta): ${newAbility.theta.toFixed(4)}`);
    console.log(`[ADAPTIVE] │ Delta: ${(newAbility.theta - priorTheta).toFixed(4)}`);
    console.log(`[ADAPTIVE] │ Response count: ${newAbility.responseCount}`);
    
    await prisma.studentAbility.upsert({
      where: { studentId },
      update: { theta: newAbility.theta, responseCount: newAbility.responseCount },
      create: { studentId, theta: newAbility.theta, responseCount: newAbility.responseCount },
    });
    console.log(`[ADAPTIVE] └─ IRT saved to DB`);

    // Response log (needed for R(q), coverage, and future recalibration)
    await prisma.studentResponseLog.create({
      data: { studentId, questionId, battleId, isCorrect, thetaAtTime: newAbility.theta, bIAtTime: bI },
    });
    console.log(`[ADAPTIVE] Response log created`);
    console.log(`[ADAPTIVE] ╚════ SUBMIT_ANSWER COMPLETE ════╝`);
    console.log('═'.repeat(80));

    return NextResponse.json({ mastery: newMastery, ability: newAbility });
  } catch (err) {
    console.error('[api/adaptive/submit-answer] error:', err);
    return NextResponse.json(
      { error: 'Failed to process answer', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}