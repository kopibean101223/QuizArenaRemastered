'use client';

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  Crown, Zap, Star, Trophy, Flame, MessageCircle,
  CheckCircle2, Wifi, WifiOff, Volume2, VolumeX, ArrowRight
} from "lucide-react";

import {
  C, OPTION_COLORS, AVATAR_COLORS, QuestionData,
  Player, Vote,
} from "./LiveBattleCOMPONENTONLY/Constants";
import { CountdownBar } from "./LiveBattleCOMPONENTONLY/CountdownBar";
import { AnswerBtn } from "./LiveBattleCOMPONENTONLY/AnswerButton";
import { LeaderRow } from "./LiveBattleCOMPONENTONLY/LeaderRow";

export function LiveBattle({ battleId }: { battleId: string }) {
  const { navigate, user } = useApp();
  const socketRef = useRef<WebSocket | null>(null);
  // Tracks how many questions this player has gotten right across the
  // whole quiz, so the results screen can show real correct/accuracy
  // numbers instead of the last-question-only value the server used to see.
  const correctCountRef = useRef(0);

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [myVote, setMyVote] = useState<number | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [mode, setMode] = useState<"solo" | "discussion">("discussion");
  const [speedMode] = useState(true);
  const [reactionBursts, setReactionBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const studentName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Student";
  const currentUserId = user?.id || "local-me";

  const computeTimeLeft = (limit: number, startTs: number | null) => {
    if (!startTs) return limit;
    const elapsedSeconds = Math.floor((Date.now() - startTs) / 1000);
    return Math.max(limit - elapsedSeconds, 0);
  };

  // Helper to format incoming raw question objects into QuestionData format
  const formatQuestions = (rawQuestions: any[]): QuestionData[] => {
    return rawQuestions.map((q: any, idx: number) => {
      let parsedChoices: string[] = [];
      try {
        let rawChoices = q.choices || q.options;
        if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
        if (Array.isArray(rawChoices)) {
          parsedChoices = rawChoices.map((c: any) => String(typeof c === 'object' && c !== null ? c.text || c.label || String(c) : c));
        }
      } catch (e) {
        parsedChoices = [];
      }
      const correctIdx = parsedChoices.findIndex(c => c === q.answer);

      return {
        id: q.id || idx,
        number: idx + 1,
        total: rawQuestions.length,
        subject: q.topic || q.subject || "General Knowledge",
        text: q.text || q.question,
        options: parsedChoices,
        correct: correctIdx !== -1 ? correctIdx : (Number(q.correct) || 0),
        points: Number(q.points) || 10,
        timeLimit: Number(q.timeLimit) || 60
      };
    });
  };

  // 1. Fallback Questions Loader
  useEffect(() => {
    async function loadFallbackQuestions() {
      if (questions.length > 0) return;
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setQuestions(formatQuestions(data));
          }
        }
      } catch (err) {
        console.error("Failed to load fallback questions:", err);
      }
    }
    loadFallbackQuestions();
  }, [questions.length]);

  // 2. WebSocket Sync Connection
  useEffect(() => {
    let socket: WebSocket | null = null;
    let isMounted = true;

    function connectWs() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        socket?.send(JSON.stringify({
          type: "JOIN_BATTLE",
          battleId: battleId || "room_101",
          userId: currentUserId,
          sender: studentName
        }));
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Extract questions from room sync or payload
          const rawQuestions = data.questions || data.roomState?.questions || data.payload?.questions;
          if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
            setQuestions(formatQuestions(rawQuestions));
          }

          // State synchronization events
          if (data.type === "ROOM_STATE_SYNC" || data.type === "QUESTION_ADVANCED" || data.type === "PROF_START_BATTLE") {
            if (typeof data.currentIndex === "number") {
              setCurrentIndex(data.currentIndex);
            }
            if (data.startedAt) {
              setStartedAt(data.startedAt);
            }
          }

          // Live Leaderboard / Score Sync
          if (data.type === "SCORE_UPDATED" || data.type === "LEADERBOARD_UPDATE") {
            if (Array.isArray(data.leaderboard)) {
              const formattedPlayers: Player[] = data.leaderboard.map((item: any, idx: number) => ({
                id: item.id || item.userId,
                name: item.name || item.sender || `Player ${idx + 1}`,
                initials: (item.name || "P").substring(0, 2).toUpperCase(),
                color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                score: item.score || 0,
                streak: item.streak || 0,
                isMe: (item.id || item.userId) === currentUserId,
                isLeader: idx === 0
              }));
              setPlayers(formattedPlayers);
            }
          }

          if (data.type === "QUIZ_COMPLETED") {
            navigate("results");
          }
        } catch (err) {
          console.error("WS message parse error:", err);
        }
      };

      socket.onclose = () => {
        if (isMounted) setTimeout(connectWs, 2000);
      };
    }

    connectWs();
    return () => {
      isMounted = false;
      if (socket) socket.close();
      socketRef.current = null;
    };
  }, [battleId, user, navigate, currentUserId, studentName]);

  // Reset state on question change
  useEffect(() => {
    if (!currentQuestion) return;
    setSelected(null);
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

  function handleSelect(i: number) {
    if (revealed || selected !== null) return;
    setSelected(i);
    if (mode === "solo") setTimeout(() => processAnswer(i), 1000);
  }

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

  function processAnswer(userChoice: number) {
    setRevealed(true);
    const isCorrect = userChoice === currentQuestion?.correct;
    const scoreAdd = isCorrect ? (currentQuestion.points || 10) : 0;

    // Update local state temporarily
    setPlayers((prev) => {
      if (prev.length === 0) {
        return [{
          id: currentUserId,
          name: studentName,
          initials: studentName.substring(0, 2).toUpperCase(),
          color: AVATAR_COLORS[0],
          score: scoreAdd,
          streak: isCorrect ? 1 : 0,
          isMe: true,
          isLeader: true
        }];
      }
      return prev.map((p) => p.isMe ? { ...p, score: p.score + scoreAdd, streak: isCorrect ? p.streak + 1 : 0 } : p);
    });

    // FIX: track the running correct-answer count ourselves. The server
    // fully overwrites this player's leaderboard entry on every submit
    // (it doesn't increment anything), so unless we send the cumulative
    // count each time, only the most recent question's result survives.
    if (isCorrect) correctCountRef.current += 1;

    // Send score to server so Redis & Supabase update
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: "SUBMIT_SCORE",
        battleId: battleId || "room_101",
        playerData: {
          id: currentUserId,
          name: studentName,
          score: (players.find(p => p.isMe)?.score || 0) + scoreAdd,
          // FIX: was "correctCount" - the results screen reads "correct",
          // so the old field name was never picked up at all. "total" is
          // now the real question count instead of the missing/defaulted
          // value the results screen used to fall back to.
          correct: correctCountRef.current,
          total: questions.length,
        }
      }));
    }
  }

  const totalVotes = votes.reduce((a, v) => a + v.count, 0);
  function voteFor(i: number) { const v = votes.find((x) => x.option === i); return totalVotes ? ((v?.count ?? 0) / totalVotes) * 100 : 0; }

  if (!currentQuestion) {
    return (
      <div style={{ color: "white", padding: 40, textAlign: "center", minHeight: "100vh", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
        Waiting for Professor to initialize questions...
      </div>
    );
  }

  return (
    <>
      <StudentTopBar />
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
              {currentQuestion.options.map((opt, i) => (
                <AnswerBtn key={i} index={i} text={opt} selected={mode === "discussion" ? myVote === i : selected === i} revealed={revealed} isCorrect={i === currentQuestion.correct} disabled={revealed || (mode === "solo" && selected !== null)} onClick={() => (mode === "discussion" ? handleVote(i) : handleSelect(i))} votePct={mode === "discussion" ? voteFor(i) : undefined} />
              ))}
            </div>

            {revealed && (
              <div style={{ marginTop: 14, padding: "14px 18px", borderRadius: 18, background: selected === currentQuestion.correct ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)", border: `2px solid ${selected === currentQuestion.correct ? C.green : C.red}`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{selected === currentQuestion.correct ? "🎉" : "❌"}</span>
                <div>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: selected === currentQuestion.correct ? C.green : C.red, margin: 0 }}>{selected === currentQuestion.correct ? `Correct! +${currentQuestion.points || 10} pts` : "Wrong Answer"}</p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>Correct answer: <strong style={{ color: "#fff" }}>{currentQuestion.options[currentQuestion.correct]}</strong></p>
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
          </div>
        </div>

        {mode === "discussion" && !revealed && (
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
