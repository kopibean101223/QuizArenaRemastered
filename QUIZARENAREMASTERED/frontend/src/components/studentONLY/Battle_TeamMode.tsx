'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, MessageSquare, Crown, CheckCircle, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  formatBattleQuestions,
  getStudentIdentity,
  computeTimeLeft,
  parseNumericValue,
} from '@/lib/student/battle/useBattleConnection';
import type { BattleQuestion } from '@/lib/student/battle/useBattleConnection';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { CountdownBar } from './LiveBattleCOMPONENTONLY/CountdownBar';
import { AnswerInput } from './battle/Answer_Input';
import { BattleChat, BattleChatMessage } from './battle/BattleChat';
import { PowerCardTray } from './PowerCards/PowerCardTray';
import { TEAM_MODE_CARDS } from './PowerCards/CardCatalog';
import type { PowerCardData } from './PowerCards/types';
export interface TeamMemberAnswer {
  memberId: string;
  memberName: string;
  selectedOption: string;
  submittedAt: number;
}

// NEW: was a Multiple-Choice-only shape (options/correct). Now reuses the
// same normalized BattleQuestion union AnswerInput expects, so every
// question type (not just MCQ) carries its type-specific fields through.
type TeamQuestion = BattleQuestion;

// Stringifies whatever AnswerInput hands back (number/boolean/string,
// depending on question.type) into the same "selectedOption: string" shape
// the team-vote feed and server already expect — same wire format as MCQ's
// letter keys, just not restricted to A/B/C/D anymore.
function stringifyAnswerValue(value: any): string {
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  return String(value ?? '');
}

function getMajorityVote(answers: TeamMemberAnswer[]): string {
  if (!answers.length) return '';

  const counts: Record<string, number> = {};
  answers.forEach((entry) => {
    const normalized = String(entry.selectedOption || '').trim();
    if (!normalized) return;
    counts[normalized] = (counts[normalized] || 0) + 1;
  });

  let bestValue = '';
  let bestCount = 0;
  Object.entries(counts).forEach(([value, count]) => {
    if (count > bestCount) {
      bestValue = value;
      bestCount = count;
    }
  });

  return bestValue;
}

function doesAnswerMatchQuestion(question: TeamQuestion | undefined, answer: string): boolean {
  if (!question || !answer) return false;

  const normalizedAnswer = answer.trim();

  if (question.type === 'Multiple Choice') {
    const optionIndex = Number(question.correct ?? 0);
    if (Array.isArray(question.options) && question.options[optionIndex]) {
      return (
        String(question.options[optionIndex]) === normalizedAnswer ||
        String(optionIndex) === normalizedAnswer ||
        OPTION_KEYS[optionIndex] === normalizedAnswer
      );
    }
    return String(optionIndex) === normalizedAnswer || OPTION_KEYS[optionIndex] === normalizedAnswer;
  }

  if (question.type === 'True / False') {
    return stringifyAnswerValue(question.correct) === normalizedAnswer;
  }

  if (question.type === 'Mathematics') {
    return normalizeChoiceText(question.correctExpression) === normalizeChoiceText(normalizedAnswer);
  }

  if (question.type === 'Short Answer' || question.type === 'Identification' || question.type === 'Step-by-step Solution') {
    return question.acceptedAnswers.some((value) => normalizeChoiceText(value) === normalizeChoiceText(normalizedAnswer));
  }

  if (question.type === 'Numerical Input') {
    const expected = question.correctValue;
    const submitted = parseNumericValue(normalizedAnswer);
    return Number.isFinite(expected) && submitted != null && Math.abs(expected - submitted) <= (question.tolerance ?? 0);
  }

  return false;
}

function normalizeChoiceText(value: unknown): string {
  return String(value ?? '').trim().toLowerCase();
}

function estimatePowerupBoost(card: PowerCardData): number {
  const effect = card.effect;
  if (!effect) return 0;
  if (effect.category === 'points') return Number(effect.amount ?? 0);
  if (effect.category === 'removeChoices') return 10;
  if (effect.category === 'selfTimer') return Number(effect.amount ?? 0);
  return 5;
}

export interface TeamBattleProps {
  battleId?: string;
  onLeaveBattle?: () => void;
  // Which team this player picked in the lobby — needed so the shared
  // socket's JOIN_TEAM_BATTLE (sent by BattleSocketProvider) tells the
  // server which team's chat this player should join.
  teamId?: string | null;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'];
const DEFAULT_TIME_LIMIT = 30;

/**
 * No longer owns a WebSocket (useBattleSocket) — connection now lives in
 * BattleSocketProvider, mounted with mode="TEAM" (and extraJoinPayload:
 * { teamId }) above this component, so JOIN_TEAM_BATTLE goes out on the
 * same socket the lobby already opened.
 *
 * Message handling that used to live in useBattleSocket's onMessage is now
 * a useEffect watching `lastMessage` from context.
 */
export function TeamBattle({ battleId = '', onLeaveBattle, teamId = null }: TeamBattleProps) {
  const { user, navigate } = useApp();  
  const { send, lastMessage } = useBattleSocketContext();

  const [questions, setQuestions] = useState<TeamQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = questions[questionIndex];

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLimit, setTimeLimit] = useState<number>(DEFAULT_TIME_LIMIT);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIME_LIMIT);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [teamMemberAnswers, setTeamMemberAnswers] = useState<TeamMemberAnswer[]>([]);

  const [chatMessages, setChatMessages] = useState<BattleChatMessage[]>([]);
  
  // Power-up card system states
  const [collectedPowerCards, setCollectedPowerCards] = useState<PowerCardData[]>([]);
  const [showChoosePowerUP, setShowChoosePowerUP] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [teamWins, setTeamWins] = useState(0);
  const [teamScore, setTeamScore] = useState(0);
  const [lastResolvedQuestionIndex, setLastResolvedQuestionIndex] = useState<number | null>(null);
  const [roundOutcome, setRoundOutcome] = useState('');
  const [opponentTeamName, setOpponentTeamName] = useState('Rival Squad');

  const { studentName: memberName, currentUserId: memberId } = getStudentIdentity(user);

  function applyTeamQuestions(rawQuestions: unknown[]) {
    setQuestions(formatBattleQuestions(rawQuestions));
  }

  // Fallback loader only — real source of truth is always the WS payload.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (questions.length > 0) return;
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data) && data.length > 0) {
            applyTeamQuestions(data);
          }
        }
      } catch (err) {
        console.error('[TeamBattle] Failed to load fallback questions:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [questions.length]);

  // Message routing — same logic as the old onMessage callback, now
  // reacting to the shared socket's lastMessage instead of owning the
  // connection itself.
  useEffect(() => {
    const data = lastMessage;
    if (!data) return;

    if (data.type === 'TEAM_STATE_SYNC' || data.type === 'ROOM_STATE_SYNC') {
      if (typeof data.questionIndex === 'number' || typeof data.currentIndex === 'number') {
        setQuestionIndex(data.questionIndex ?? data.currentIndex);
      }
      if (typeof data.startedAt === 'number') setStartedAt(data.startedAt);
      if (typeof data.timeLimit === 'number') setTimeLimit(data.timeLimit);
      if (Array.isArray(data.teamAnswers)) setTeamMemberAnswers(data.teamAnswers);
      if (Array.isArray(data.questions) && data.questions.length > 0) {
        applyTeamQuestions(data.questions);
      }
      if (data.type === 'TEAM_STATE_SYNC') {
        setSelectedOption('');
        setConfirmed(false);
      }
    }

    // The server broadcasts this when its own timer fires (or a professor
    // manually advances) — the ONLY thing that should move every teammate
    // to the next question at the same time.
    if (data.type === 'TEAM_QUESTION_ADVANCED') {
      setQuestionIndex(data.questionIndex);
      setStartedAt(data.startedAt);
      setTimeLimit(data.timeLimit);
      setTeamMemberAnswers(Array.isArray(data.teamAnswers) ? data.teamAnswers : []);
      setSelectedOption('');
      setConfirmed(false);
    }

    if (data.type === 'TEAM_ANSWERS_UPDATED') {
      if (Array.isArray(data.teamAnswers)) setTeamMemberAnswers(data.teamAnswers);
    }

    if (data.type === 'TEAM_BATTLE_COMPLETED') {
    }

    // Teammate-only chat — the server only forwards this to sockets on the
    // same team, so anything received here is safe to show as-is.
    if (data.type === 'TEAM_CHAT_MESSAGE' && data.message) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `${data.userId || data.sender}-${data.timestamp || Date.now()}`,
          sender: data.sender || 'Anonymous',
          text: data.message,
          isMe: data.userId === memberId,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  // Countdown driven off the server's startedAt/timeLimit.
  useEffect(() => {
    if (!startedAt) {
      setTimeLeft(timeLimit);
      return;
    }
    const tick = () => {
      const left = computeTimeLeft(timeLimit, startedAt);
      setTimeLeft(left);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startedAt, timeLimit]);

  const handleSelectOption = (optionKey: string) => {
    if (confirmed) return;
    setSelectedOption(optionKey);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || confirmed) return;
    setConfirmed(true);

    const myAnswer: TeamMemberAnswer = {
      memberId,
      memberName,
      selectedOption,
      submittedAt: Date.now(),
    };

    send({
      type: 'SUBMIT_TEAM_MEMBER_ANSWER',
      battleId,
      questionIndex,
      answer: myAnswer,
    });

    const newCount = correctAnswersCount + 1;
    setCorrectAnswersCount(newCount);

    if (newCount >= 2) {
      setShowChoosePowerUP(true);
      setCorrectAnswersCount(0);
    }
  };

  const handleAnswerInputSubmit = (value: any) => {
    if (confirmed) return;
    const stringValue = stringifyAnswerValue(value);
    setSelectedOption(stringValue);
    setConfirmed(true);

    const myAnswer: TeamMemberAnswer = {
      memberId,
      memberName,
      selectedOption: stringValue,
      submittedAt: Date.now(),
    };

    send({
      type: 'SUBMIT_TEAM_MEMBER_ANSWER',
      battleId,
      questionIndex,
      answer: myAnswer,
    });

    const newCount = correctAnswersCount + 1;
    setCorrectAnswersCount(newCount);

    if (newCount >= 2) {
      setShowChoosePowerUP(true);
      setCorrectAnswersCount(0);
    }
  };

  const getOptionPercentage = (optionKey: string) => {
    if (teamMemberAnswers.length === 0) return 0;
    const count = teamMemberAnswers.filter((a) => a.selectedOption === optionKey).length;
    return Math.round((count / teamMemberAnswers.length) * 100);
  };

  const majorityVote = getMajorityVote(teamMemberAnswers);
  const roundResultLabel = majorityVote
    ? `Team vote: ${majorityVote}${currentQuestion ? ` • ${doesAnswerMatchQuestion(currentQuestion, majorityVote) ? 'Round won' : 'Round challenge'}` : ''}`
    : 'Waiting for team vote…';

  useEffect(() => {
    if (!currentQuestion || teamMemberAnswers.length === 0 || lastResolvedQuestionIndex === questionIndex) return;

    const winningTeamAnswer = getMajorityVote(teamMemberAnswers);
    if (!winningTeamAnswer) return;

    const resolvedWin = doesAnswerMatchQuestion(currentQuestion, winningTeamAnswer);
    setRoundOutcome(
      resolvedWin
        ? `Majority voted ${winningTeamAnswer}. Your team takes the round.`
        : `Majority voted ${winningTeamAnswer}. This round needs a recalibration.`
    );

    setLastResolvedQuestionIndex(questionIndex);

    if (resolvedWin) {
      setTeamWins((prev) => {
        const nextWins = prev + 1;
        if (nextWins > 0 && nextWins % 2 === 0) {
          setShowChoosePowerUP(true);
        }
        return nextWins;
      });
      setTeamScore((prev) => prev + 25);
    }
  }, [currentQuestion, questionIndex, teamMemberAnswers, lastResolvedQuestionIndex]);

  useEffect(() => {
    const bracketName = teamId === null || teamId === undefined ? 'Team Blue' : `Team ${teamId}`;
    setOpponentTeamName(bracketName === 'Team 1' ? 'Team 2' : 'Team 1');
  }, [teamId]);

  const handleSendChat = (text: string) => {
    send({
      type: 'TEAM_CHAT_MESSAGE',
      battleId,
      userId: memberId,
      teamId,
      sender: memberName,
      message: text,
    });
  };

  function handleChoosePowerUP(cardIndex: number) {
    const selectedCard = TEAM_MODE_CARDS[cardIndex];
    if (!selectedCard) return;

    setCollectedPowerCards((prev) => [...prev, { ...selectedCard, id: `${selectedCard.id}-${Date.now()}` }]);
    setTeamScore((prev) => prev + estimatePowerupBoost(selectedCard));
    setRoundOutcome(`${selectedCard.name} activated for the team. Auto-applied via majority vote.`);
    setShowChoosePowerUP(false);
    setCorrectAnswersCount(0);
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#131524] text-white flex items-center justify-center font-sans">
        Waiting for questions to load…
      </div>
    );
  }

  const isMultipleChoice = currentQuestion.type === 'Multiple Choice';
  const options = isMultipleChoice
    ? currentQuestion.options.map((text, i) => ({ key: OPTION_KEYS[i] || String(i), text }))
    : [];

  return (
    <div className="min-h-screen bg-[#131524] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 font-extrabold text-lg">
          <div className="size-7 bg-[#5B3DF6] rounded-lg flex items-center justify-center">
            <Zap size={16} fill="#FFF" color="transparent" />
          </div>
          <span className="rounded-lg border border-[#5B3DF6]/60 bg-[#5B3DF6]/20 px-3 py-1 text-sm font-extrabold uppercase tracking-wider text-[#A98CFF] shadow-[0_0_18px_rgba(91,61,246,0.2)]">Team Battle</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-40">
            <CountdownBar timeLeft={timeLeft} timeLimit={timeLimit} />
          </div>
          <span className="text-xs text-[#8F93A8] font-bold">
            Question {currentQuestion.number} / {currentQuestion.total}
          </span>
        </div>
      </header>

      <div className="flex items-center justify-between gap-3 px-6 py-3 border-b border-white/10 bg-[#181b2d]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#8F93A8]">Bracket</div>
          <div className="text-sm font-black text-white">{teamId ? `Team ${teamId}` : 'Team Blue'} vs {opponentTeamName}</div>
        </div>
        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8F93A8]">Team wins</div>
            <div className="text-lg font-black text-[#2ED47A]">{teamWins}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8F93A8]">Points</div>
            <div className="text-lg font-black text-[#FFC93C]">{teamScore}</div>
          </div>
        </div>
      </div>

      <PowerCardTray
        topClassName="top-60"
        cards={collectedPowerCards.length > 0 ? collectedPowerCards : TEAM_MODE_CARDS.slice(0, 3)}
      />


      {/* Content */}
<div className="flex-1 p-5 pl-5 lg:pl-44 grid grid-cols-[1fr_280px] gap-5">      
    <div className="flex flex-col gap-4">
          <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-6">
            <span className="bg-[#5B3DF6]/20 text-[#5B3DF6] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              {currentQuestion.subject}
            </span>
            <h2 className="mt-2 text-xl font-bold">{currentQuestion.text}</h2>
          </div>

          <div className="bg-[#12182b] border border-[#5B3DF6]/30 rounded-xl px-3 py-2 text-xs font-bold text-[#D8D9F5]">
            <span className="text-[#8F93A8] uppercase tracking-[0.16em]">Team majority</span>
            <div className="mt-1 text-base text-white">{roundResultLabel}</div>
          </div>

          {isMultipleChoice ? (
            <>
              <div className="flex flex-col gap-3">
                {options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  const percentage = getOptionPercentage(opt.key);
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`relative p-4 rounded-xl border flex items-center justify-between overflow-hidden ${
                        confirmed ? 'cursor-default' : 'cursor-pointer'
                      } ${isSelected ? 'bg-[#632A38] border-[#FF5C5C]' : 'bg-white/[0.03] border-white/10'}`}
                    >
                      <div className="flex items-center gap-3 z-10">
                        <span className="size-7 bg-white/10 rounded-lg flex items-center justify-center font-extrabold text-sm">
                          {opt.key}
                        </span>
                        <span className="font-bold">{opt.text}</span>
                      </div>
                      <span className="font-extrabold text-xs z-10 text-[#FF5C5C]">{percentage}%</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!selectedOption || confirmed}
                onClick={handleConfirmAnswer}
                className="w-full bg-[#2ED47A] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <Crown size={18} fill="#000" />
                {confirmed ? 'Answer Locked In — waiting for the timer…' : 'Confirm Final Answer'}
                <CheckCircle size={18} />
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <AnswerInput
                key={currentQuestion.id}
                question={currentQuestion}
                disabled={confirmed}
                revealed={false}
                onSubmit={handleAnswerInputSubmit}
              />
              {confirmed && (
                <div className="w-full bg-[#2ED47A]/15 border border-[#2ED47A]/40 text-[#2ED47A] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2">
                  <Crown size={18} fill="#2ED47A" color="transparent" />
                  Answer Locked In — waiting for the timer…
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Team Member Answers Feed Panel */}
        <div className="bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
          <span className="text-xs font-extrabold text-[#8F93A8] uppercase flex items-center gap-2">
            <MessageSquare size={14} /> Team Answers Received ({teamMemberAnswers.length})
          </span>

          <div className="flex flex-col gap-2">
            {teamMemberAnswers.length === 0 ? (
              <span className="text-xs text-white/30 italic">Waiting for teammates…</span>
            ) : (
              teamMemberAnswers.map((ans) => (
                <div
                  key={ans.memberId}
                  className="bg-white/5 p-2.5 rounded-lg flex items-center justify-between border border-white/5"
                >
                  <span className="text-xs font-semibold text-white/80">
                    {ans.memberId === memberId ? `${ans.memberName} (You)` : ans.memberName}
                  </span>
                  <span className="text-xs font-black bg-[#5B3DF6] px-2 py-0.5 rounded text-white">
                    {ans.selectedOption}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Teammate-only chat — free text, not visible outside this team. */}
          <div style={{ padding: "10px", borderTop: "1.5px solid rgba(255,255,255,0.06)" }}>
            <BattleChat
              mode="free"
              title="Team Chat"
              messages={chatMessages}
              onSend={handleSendChat}
              placeholder="Message your team…"
              height={260}
            />
          </div>
        </div>
      </div>
    {showChoosePowerUP && (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-4xl rounded-3xl border border-[#5B3DF6]/40 bg-[#171b2d] p-6 shadow-[0_0_30px_rgba(91,61,246,0.3)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8F93A8]">Team power-up</div>
              <h3 className="mt-1 text-2xl font-black text-white">2 wins unlocked</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowChoosePowerUP(false)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/80"
            >
              Skip
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {TEAM_MODE_CARDS.map((card, index) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleChoosePowerUP(index)}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-[#5B3DF6] hover:bg-[#5B3DF6]/10"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A98CFF]">{card.rarity}</div>
                <div className="mt-2 text-lg font-black text-white">{card.name}</div>
                <p className="mt-2 text-sm text-white/70">{card.description}</p>
                <div className="mt-4 inline-flex rounded-full bg-[#5B3DF6]/20 px-2.5 py-1 text-xs font-black text-[#A98CFF]">
                  +{estimatePowerupBoost(card)} team points
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default TeamBattle;