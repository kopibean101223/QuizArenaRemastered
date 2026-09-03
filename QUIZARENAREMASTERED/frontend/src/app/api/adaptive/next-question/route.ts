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
  try {
    const { studentId, battleId, docId } = await req.json();
    console.log('═'.repeat(80));
    console.log('[ADAPTIVE] ╔════ NEXT_QUESTION SELECTION ════╗');
    console.log('[ADAPTIVE] INPUT:', { studentId, battleId, docId });

    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
    }

    // 1. Pull the approved question bank for this doc/section
    console.log(`[ADAPTIVE] ┌─ STEP 1: Load Question Bank`);
    const bankRows = await prisma.generatedQuestion.findMany({
      where: {
        ...(docId ? { docId: Number(docId) } : {}),
        status: 'APPROVED',
      },
      include: {
        itemParameters: true,
        choiceRows: true,
        citationRow: true,
      },
    });

    console.log(`[ADAPTIVE] │ Found ${bankRows.length} approved questions`);
    if (bankRows.length === 0) {
      console.warn(`[ADAPTIVE] ✗ No approved questions in bank`);
      return NextResponse.json(
        { error: 'no approved questions found in bank', selected: null, mode: 'adaptive', reason: 'empty question bank' },
        { status: 200 }
      );
    }

    const questionBank: QuestionMeta[] = bankRows.map((q) => {
      const legacyChoices = Array.isArray((q as any).choices) ? (q as any).choices : [];
      const relationChoices = Array.isArray((q as any).choiceRows) ? (q as any).choiceRows : [];
      const choiceTexts = (relationChoices.length > 0 ? relationChoices : legacyChoices)
        .map((choice: any) => typeof choice === 'string' ? choice : choice?.text ?? choice?.label ?? '')
        .filter(Boolean);

      const citationValue = (q as any).citationRow ?? (q as any).citation ?? null;
      const embeddingVector = Array.isArray((citationValue as any)?.embedding)
        ? (citationValue as any).embedding
        : [];
      const correctChoice = (relationChoices.length > 0 ? relationChoices : legacyChoices).find((choice: any) => {
        if (typeof choice === 'string') return false;
        return Boolean(choice?.isCorrect);
      });

      return {
        questionId: q.id,
        topic: q.topic ?? 'General',
        questionType: q.type,
        llmDifficulty: (q.difficulty as 'Easy' | 'Medium' | 'Hard') ?? 'Medium',
        choices: choiceTexts,
        correctAnswer: q.answer ?? (correctChoice ? String(correctChoice.text ?? correctChoice.label ?? '') : ''),
        embeddingVector,
      };
    });
    console.log(`[ADAPTIVE] └─ Bank loaded: [${questionBank.map(q => `Q${q.questionId}(${q.llmDifficulty})`).join(', ')}]`);

    // 2. Load student's BKT states for every topic present in this bank
    console.log(`[ADAPTIVE] ┌─ STEP 2: Load BKT Mastery States`);
    const topics = Array.from(new Set(questionBank.map((q) => q.topic)));
    console.log(`[ADAPTIVE] │ Topics in bank: [${topics.join(', ')}]`);
    
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
    
    console.log(`[ADAPTIVE] │ BKT states loaded: ${masteryRows.length}/${topics.length}`);
    masteryRows.forEach(m => {
      console.log(`[ADAPTIVE] │   ${m.knowledgeComponentId}: pLt=${m.pLt.toFixed(4)} (n=${m.responseCount})`);
    });
    console.log(`[ADAPTIVE] └─ BKT ready`);

    // 3. Load student ability
    console.log(`[ADAPTIVE] ┌─ STEP 3: Load IRT Ability (theta)`);
    const abilityRow = await prisma.studentAbility.findUnique({ where: { studentId } });
    const studentAbility: StudentAbility | null = abilityRow && {
      studentId,
      theta: abilityRow.theta,
      responseCount: abilityRow.responseCount,
      updatedAt: abilityRow.updatedAt.toISOString(),
    };
    
    const theta = studentAbility?.theta ?? 0;
    console.log(`[ADAPTIVE] │ Student ability (theta): ${theta.toFixed(4)}`);
    console.log(`[ADAPTIVE] │ Response count: ${abilityRow?.responseCount ?? 0}`);
    console.log(`[ADAPTIVE] └─ IRT ability ready`);

    // 4. Load item params
    console.log(`[ADAPTIVE] ┌─ STEP 4: Load Item Parameters`);
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
    
    console.log(`[ADAPTIVE] │ Item params loaded: ${itemRows.length}/${questionBank.length}`);
    itemRows.forEach(i => {
      console.log(`[ADAPTIVE] │   Q${i.questionId}: b_i=${i.bI.toFixed(4)}, calibrated=${i.isCalibrated}, n=${i.responseCount}`);
    });
    console.log(`[ADAPTIVE] └─ Item parameters ready`);

    // 5. Rebuild session state
    console.log(`[ADAPTIVE] ┌─ STEP 5: Build Session State`);
    const answeredRows = await prisma.studentResponseLog.findMany({
      where: { studentId, battleId },
    });
    
    const session: SessionState = {
      studentId,
      battleId,
      answeredQuestionIds: new Set(answeredRows.map((r) => r.questionId)),
      recentQuestions: [],
      topicCoverageCounts: {},
      isCalibrationPhase: answeredRows.length < 5,
      calibrationQuestionsServed: answeredRows.length,
    };
    
    console.log(`[ADAPTIVE] │ Questions answered: ${answeredRows.length}`);
    console.log(`[ADAPTIVE] │ Unanswered: ${questionBank.length - answeredRows.length}`);
    console.log(`[ADAPTIVE] │ Calibration phase: ${session.isCalibrationPhase ? 'YES (n<5)' : 'NO (full adaptive)'}`);
    console.log(`[ADAPTIVE] │ Answered question IDs: [${Array.from(session.answeredQuestionIds).join(', ')}]`);
    console.log(`[ADAPTIVE] └─ Session state built`);

    // 6. SCORE ALL CANDIDATES
    console.log(`[ADAPTIVE] ┌─ STEP 6: Score Candidates (Adaptive Loop)`);
    
    const result = selectNextQuestion({
      session,
      questionBank,
      studentAbility,
      bktStates,
      itemParamsByQuestionId,
      hasStudentHistory: !!abilityRow,
      hasItemResponseData: itemRows.length > 0,
    });

    console.log(`[ADAPTIVE] │ Selection mode: ${result.mode.toUpperCase()}`);
    console.log(`[ADAPTIVE] │ Reason: ${result.reason}`);
    console.log(`[ADAPTIVE] │ Selected question: Q${result.selected?.questionId} (${result.selected?.llmDifficulty})`);
    
    if (result.ranked && result.ranked.length > 0) {
      console.log(`[ADAPTIVE] │ ═══ TOP 5 CANDIDATES ═══`);
      result.ranked.slice(0, 5).forEach((item, idx) => {
        console.log(`[ADAPTIVE] │ [${idx + 1}] Q${item.question.questionId} - Score: ${item.score.toFixed(4)}`);
        console.log(`[ADAPTIVE] │     │ I(θ)=${item.I.toFixed(4)}, W(q)=${item.W.toFixed(4)}, D(q)=${item.D.toFixed(4)}, R(q)=${item.R.toFixed(4)}`);
        console.log(`[ADAPTIVE] │     │ Topic: ${item.question.topic}, Difficulty: ${item.question.llmDifficulty}`);
      });
    }
    
    console.log(`[ADAPTIVE] └─ Selection complete`);
    console.log(`[ADAPTIVE] ╚════ NEXT_QUESTION COMPLETE ════╝`);
    console.log('═'.repeat(80));

    return NextResponse.json(result);
  } catch (err) {
    console.error('[api/adaptive/next-question] error:', err);
    return NextResponse.json(
      {
        error: 'Failed to select next question',
        details: err instanceof Error ? err.message : 'Unknown error',
        selected: null,
        mode: 'adaptive' as const,
        reason: 'error in adaptive selection',
      },
      { status: 500 }
    );
  }
}