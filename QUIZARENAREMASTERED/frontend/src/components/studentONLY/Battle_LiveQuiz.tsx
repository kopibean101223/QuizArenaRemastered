'use client';

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  Crown, Zap, Star, Trophy, Flame, MessageCircle,
  CheckCircle2, Wifi, WifiOff, Volume2, VolumeX, ArrowRight
} from "lucide-react";

import {
  C, OPTION_COLORS, AVATAR_COLORS,
  Vote,
} from "./LiveBattleCOMPONENTONLY/Constants";
import { CountdownBar } from "./LiveBattleCOMPONENTONLY/CountdownBar";
import { AnswerBtn } from "./LiveBattleCOMPONENTONLY/AnswerButton";
import { AnswerInput } from "./battle/Answer_Input";
import { BattleChat } from "./battle/BattleChat";
import { LeaderRow } from "./LiveBattleCOMPONENTONLY/LeaderRow";
import {
  getStudentIdentity,
  computeTimeLeft,
} from "@/lib/student/battle/useBattleConnection";
import type { NormalizedQuestion } from "@/lib/student/battle/useBattleConnection";
import { useBattleSocketContext } from "@/lib/student/battle/useBattleSocketProvider";

function checkAnswer(question: NormalizedQuestion, value: any): boolean {
  switch (question.type) {
    case "Multiple Choice":
      return value === question.correct;
    case "True / False":
      return value === question.correct;
    case "Identification":
    case "Short Answer": {
      const normalize = (s: string) => (question.caseSensitive ? s.trim() : s.trim().toLowerCase());
      const answer = normalize(String(value ?? ""));
      if (!answer) return false;
      return question.acceptedAnswers.some((a) => normalize(a) === answer);
    }
    case "Numerical Input": {
      const num = Number(value);
      if (Number.isNaN(num)) return false;
      const tolerance = question.tolerance ?? 0;
      return Math.abs(num - question.correctValue) <= tolerance;
    }
    case "Mathematics": {
      const normalize = (s: string) => s.replace(/\s+/g, "").toLowerCase();
      return normalize(String(value ?? "")) === normalize(question.correctExpression);
    }
    default:
      return false;
  }
}

function getCorrectAnswerDisplay(question: NormalizedQuestion): string {
  switch (question.type) {
    case "Multiple Choice":
      return question.options[question.correct] ?? "";
    case "True / False":
      return question.correct ? "True" : "False";
    case "Identification":
    case "Short Answer":
      return question.acceptedAnswers[0] ?? "";
    case "Numerical Input":
      return `${question.correctValue}${question.unit ? " " + question.unit : ""}`;
    case "Mathematics":
      return question.correctExpression;
    default:
      return "";
  }
}

/**
 * No longer owns a WebSocket (useBattleSocket) — connection now lives in
 * BattleSocketProvider, mounted once above Lobby_LiveQuiz *and* this
 * component (see StudentDashboard.tsx), so the same socket that was opened
 * when the student joined the lobby is still the one in use here. This
 * component no longer sends its own JOIN_BATTLE on mount — the provider
 * already did that when the socket first opened, during the lobby phase.
 */
export function LiveBattle({ battleId }: { battleId: string }) {
  const { navigate, user } = useApp();
  // Tracks how many questions this player has gotten right across the
  // whole quiz, so the results screen can show real correct/accuracy
  // numbers instead of the last-question-only value the server used to see.
  const correctCountRef = useRef(0);

  const {
    questions,
    currentIndex,
    startedAt,
    leaderboard: players,
    chatMessages,
    lastMessage,
    send,
  } = useBattleSocketContext();

  const currentQuestion = questions[currentIndex];

  const [timeLeft, setTimeLeft] = useState(15);
  // Holds whatever the player submitted for the current question — a
  // number (Multiple Choice/Numerical Input), boolean (True/False), or
  // string (Identification/Short Answer/Mathematics). `any` here because
  // the shape genuinely varies by question.type; checkAnswer() is what
  // narrows it back down per-type.
  const [selected, setSelected] = useState<any>(null);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [myVote, setMyVote] = useState<number | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  const [mode, setMode] = useState<"solo" | "discussion">("discussion");
  const [speedMode] = useState(true);
  const [reactionBursts, setReactionBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const { studentName, currentUserId } = getStudentIdentity(user);


  useEffect(() => {
    if (lastMessage?.type === "QUIZ_COMPLETED" || lastMessage?.type === "ROOM_COMPLETED") {
      navigate("results");
    }
  }, [lastMessage, navigate]);

  // Reset state on question change
  useEffect(() => {
    if (!currentQuestion) return;
    setSelected(null);
    setLastCorrect(false);
    setRevealed(false);
    setMyVote(null);
    setVotes([]);
  }, [currentIndex, currentQuestion]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!currentQuestion) return;
    const limit = currentQuestion.timeLimit || 60;
    const activeStart = startedAt || Date.now();

    setTimeLeft(computeTimeLeft(limit, activeStart));
    if (revealed) return;

    const interval = setInterval(() => {
      const remaining = computeTimeLeft(limit, activeStart);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setRevealed(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, currentQuestion, revealed]);

  // Handles submissions coming from AnswerInput for every non-MCQ-discussion
  // path — i.e. solo mode and every question type other than Multiple
  // Choice. Mirrors the old handleSelect's 1s suspense delay before reveal.
  function handleAnswerSubmit(value: any) {
    if (revealed || selected !== null) return;
    setSelected(value);
    setTimeout(() => processAnswer(value), 1000);
  }

  // Multiple Choice + discussion mode only: voting stays index-based and
  // funnels through the existing AnswerBtn grid + Confirm Choice button,
  // unchanged from before.
  function handleVote(i: number) {
    setMyVote(i);
    setVotes((v) => {
      const newV = v.filter((x) => !x.voters.includes("You")).map((x) => ({ ...x, count: x.count - 1 }));
      const existing = newV.find((x) => x.option === i);
      if (existing) return newV.map((x) => x.option === i ? { ...x, count: x.count + 1, voters: [...x.voters, "You"] } : x);
      return [...newV, { option: i, count: 1, voters: ["You"] }];
    });
    setSelected(i);
  }

  function handleConfirmLeader() {
    if (myVote !== null) processAnswer(myVote);
  }

  function processAnswer(userAnswer: any) {
    setRevealed(true);
    const isCorrect = checkAnswer(currentQuestion, userAnswer);
    setLastCorrect(isCorrect);
    const scoreAdd = isCorrect ? (currentQuestion.points || 10) : 0;

    // FIX: track the running correct-answer count ourselves.
    if (isCorrect) correctCountRef.current += 1;

    // Send answer to professor chat stream
    send({
      type: "BATTLE_ACTION",
      battleId: battleId || "room_101",
      userId: currentUserId,
      sender: studentName,
      message: `answered: ${userAnswer} (${isCorrect ? 'Correct' : 'Incorrect'})`,
    });

    // Send score to server so Redis & Supabase update
    send({
      type: "SUBMIT_SCORE",
      battleId: battleId || "room_101",
      playerData: {
        id: currentUserId,
        userId: currentUserId,
        name: studentName,
        score: (players.find(p => p.isMe)?.score || 0) + scoreAdd,
        correct: correctCountRef.current,
        correctAnswers: correctCountRef.current,
        total: questions.length,
        totalQuestions: questions.length,
        accuracy: questions.length > 0 ? Math.round((correctCountRef.current / questions.length) * 100) : 0,
      }
    });
  }

  const totalVotes = votes.reduce((a, v) => a + v.count, 0);
  function voteFor(i: number) { const v = votes.find((x) => x.option === i); return totalVotes ? ((v?.count ?? 0) / totalVotes) * 100 : 0; }

  // NEW: sends a preset chat phrase to the whole match via BATTLE_ACTION —
  // the same room-wide relay RoomPresenceHandler already uses for presence.
  function handleSendChat(text: string) {
    send({
      type: "BATTLE_ACTION",
      battleId: battleId || "room_101",
      userId: currentUserId,
      sender: studentName,
      message: text,
    });
  }

  if (!currentQuestion) {
    return (
      <div style={{ color: "white", padding: 40, textAlign: "center", minHeight: "100vh", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        Waiting for Professor to initialize questions...
      </div>
    );
  }

  const isDiscussionMCQ = currentQuestion.type === "Multiple Choice" && mode === "discussion";

  return (
    <>
      <StudentTopBar mode="Live Battle" />
      <style>{`
        @keyframes timerPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes rankPop      { 0%{transform:scale(0.9)} 60%{transform:scale(1.05)} 100%{transform:scale(1)} }
        @keyframes reactionFloat{ 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-80px) scale(1.5)} }
      `}</style>

      {reactionBursts.map((r) => (
        <div key={r.id} style={{ position: "fixed", left: r.x, top: r.y, fontSize: 28, pointerEvents: "none", zIndex: 1000, animation: "reactionFloat 1.1s ease-out forwards" }}>{r.emoji}</div>
      ))}

      <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at 20% 20%, rgba(91,61,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.1) 0%, transparent 50%), ${C.navy}`, display: "flex", flexDirection: "column", overflow: "hidden", paddingTop: 48 }}>
        <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 14, background: "rgba(0,0,0,0.25)", borderBottom: "1.5px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: C.indigo, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 12px rgba(91,61,246,0.4)" }}>
              <Trophy fill={C.yellow} color="transparent" size={18} />
            </div>
            <div>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>Question</p>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "#fff", margin: 0 }}>{currentQuestion.number} <span style={{ color: "rgba(255,255,255,0.3)" }}>/ {questions.length}</span></p>
            </div>
          </div>
          <CountdownBar timeLeft={timeLeft} timeLimit={currentQuestion.timeLimit || 60} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {speedMode && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.35)", borderRadius: 20, padding: "5px 12px" }}>
                <Zap size={13} fill={C.yellow} color="transparent" />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow }}>SPEED MODE</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 12px" }}>
              <Star size={12} fill={C.yellow} color="transparent" />
              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>{currentQuestion.points || 10} pts</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", minWidth: 0 }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "22px 26px", marginBottom: 16, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ background: C.indigoLight, border: "1.5px solid rgba(91,61,246,0.3)", borderRadius: 8, padding: "3px 10px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "#A08FFF" }}>{currentQuestion.subject}</span>
              </div>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>{currentQuestion.text}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {isDiscussionMCQ ? (
                currentQuestion.options.map((opt, i) => (
                  <AnswerBtn
                    key={i}
                    index={i}
                    text={opt}
                    selected={myVote === i}
                    revealed={revealed}
                    isCorrect={i === currentQuestion.correct}
                    disabled={revealed}
                    onClick={() => handleVote(i)}
                    votePct={voteFor(i)}
                  />
                ))
              ) : (
                <AnswerInput
                  key={currentQuestion.id}
                  question={currentQuestion}
                  disabled={revealed || selected !== null}
                  revealed={revealed}
                  onSubmit={handleAnswerSubmit}
                />
              )}
            </div>

            {revealed && (
              <div style={{ marginTop: 14, padding: "14px 18px", borderRadius: 18, background: lastCorrect ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)", border: `2px solid ${lastCorrect ? C.green : C.red}`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{lastCorrect ? "🎉" : "❌"}</span>
                <div>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: lastCorrect ? C.green : C.red, margin: 0 }}>{lastCorrect ? `Correct! +${currentQuestion.points || 10} pts` : "Wrong Answer"}</p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>Correct answer: <strong style={{ color: "#fff" }}>{getCorrectAnswerDisplay(currentQuestion)}</strong></p>
                </div>
              </div>
            )}
          </div>

          <div style={{ width: 240, minWidth: 240, background: "rgba(0,0,0,0.2)", borderLeft: "1.5px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px", borderBottom: "1.5px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 17, fontWeight: 700, color: "#fff" }}>Live Leaderboard</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: 5 }}>
              {[...players].sort((a, b) => b.score - a.score).map((p, idx) => (
                <LeaderRow key={p.id} player={{ ...p, rank: idx + 1 }} />
              ))}
            </div>
            {/* NEW: global match chat — everyone in the room sees this, preset messages only. */}
            <div style={{ padding: "10px", borderTop: "1.5px solid rgba(255,255,255,0.06)" }}>
              <BattleChat
                mode="preset"
                title="Match Chat"
                messages={chatMessages}
                onSend={handleSendChat}
                height={800}
              />
            </div>
          </div>
        </div>

        {isDiscussionMCQ && !revealed && (
          <div style={{ background: "rgba(0,0,0,0.3)", borderTop: "1.5px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "center", padding: "16px" }}>
            <div style={{ width: 320 }}>
              <button type="button" onClick={handleConfirmLeader} disabled={myVote === null} style={{ width: "100%", background: myVote !== null ? C.green : "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: "10px", color: "#fff", fontWeight: 700, cursor: myVote !== null ? "pointer" : "default" }}>Confirm Choice</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}