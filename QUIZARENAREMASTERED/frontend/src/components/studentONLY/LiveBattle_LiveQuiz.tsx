//try live battle sync with prof
'use client';

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  Crown, Zap, Star, Trophy, Flame, MessageCircle,
  CheckCircle2, Wifi, WifiOff, Volume2, VolumeX, Send, ArrowRight
} from "lucide-react";

import {
  C, OPTION_COLORS, AVATAR_COLORS, REACTIONS, QuestionData,
  INIT_CHAT, Player, ChatMsg, Vote,
} from "./LiveBattleCOMPONENTONLY/Constants";
import { CountdownBar } from "./LiveBattleCOMPONENTONLY/CountdownBar";
import { AnswerBtn } from "./LiveBattleCOMPONENTONLY/AnswerButton";
import { LeaderRow } from "./LiveBattleCOMPONENTONLY/LeaderRow";
import { ChatBubble } from "./LiveBattleCOMPONENTONLY/ChatBubble";

export function LiveBattle({ battleId }: { battleId: string }) {
  const { navigate, user } = useApp();
  const socketRef = useRef<WebSocket | null>(null);

  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [myVote, setMyVote] = useState<number | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);

  // 🔥 FIX: Start empty, NO MOCK PLAYERS
  const [players, setPlayers] = useState<Player[]>([]); 
  const [chat, setChat] = useState<ChatMsg[]>(INIT_CHAT);
  const [chatInput, setChatInput] = useState("");
  const [mode, setMode] = useState<"solo" | "discussion">("discussion");
  const [speedMode] = useState(true);
  const [reactionBursts, setReactionBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isLeader = players.find((p) => p.isMe)?.isLeader || false;

  const computeTimeLeft = (limit: number, startTs: number | null) => {
    if (!startTs) return limit;
    const elapsedSeconds = Math.floor((Date.now() - startTs) / 1000);
    return Math.max(limit - elapsedSeconds, 0);
  };


  useEffect(() => {
    async function loadSyncedQuestions() {
      // 1. If questions are already loaded in state, do nothing
      if (questions.length > 0) return;

      try {
        // 2. Fallback fetch to pull the exact same questions from the API if WS payload hasn't arrived
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted: QuestionData[] = data.map((q: any, idx: number) => {
              let parsedChoices: string[] = [];
              try {
                let rawChoices = q.choices;
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
                total: data.length, 
                subject: q.topic || "General Knowledge",
                text: q.text, 
                options: parsedChoices, 
                correct: correctIdx !== -1 ? correctIdx : 0,
                points: Number(q.points) || 10,
                timeLimit: Number(q.timeLimit) || 60
              };
            });
            setQuestions(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to load fallback questions:", err);
      }
    }

    loadSyncedQuestions();
  }, [questions.length]);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let isMounted = true;

    const studentName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Unknown Student";

    function connectWs() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        socket?.send(JSON.stringify({
          type: "JOIN_BATTLE", battleId: battleId || "room_101", userId: user?.id, sender: studentName
        }));

        setPlayers([{
          id: user?.id || "local-me", name: studentName, initials: studentName.substring(0, 2).toUpperCase(),
          color: AVATAR_COLORS[0], score: 0, streak: 0, isMe: true, isLeader: true 
        }]);
      };

     socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
// 🔥 Synchronize questions strictly from the broadcasted deck
          if (data.questions && Array.isArray(data.questions)) {
            const formatted: QuestionData[] = data.questions.map((q: any, idx: number) => {
              let parsedChoices: string[] = Array.isArray(q.choices) ? q.choices : [];
              const correctIdx = parsedChoices.findIndex((c: string) => c === q.answer);
              return { 
                id: q.id || idx, 
                number: idx + 1, 
                total: data.questions.length, 
                subject: q.topic || "General Knowledge",
                text: q.text, 
                options: parsedChoices, 
                correct: correctIdx !== -1 ? correctIdx : 0,
                points: Number(q.points) || 10,       
                timeLimit: Number(q.timeLimit) || 60   
              };
            });
            setQuestions(formatted);
          }

          if (data.type === "ROOM_STATE_SYNC" || data.type === "QUESTION_ADVANCED") {
            if (typeof data.currentIndex === "number") {
              setCurrentIndex(data.currentIndex);
            }
            setStartedAt(data.startedAt || Date.now()); 
          }

          if (data.type === "QUIZ_COMPLETED") {
            navigate("results");
          }
        } catch (err) {
          console.error("WS error:", err);
        }
      };

      socket.onclose = () => { if (isMounted) setTimeout(connectWs, 2000); };
    }

    connectWs();
    return () => { isMounted = false; if (socket) socket.close(); socketRef.current = null; };
  }, [battleId, user, navigate]);

  useEffect(() => {
    if (!currentQuestion) return;
    setSelected(null);
    setRevealed(false);
    setMyVote(null);
    setVotes([]);
    
    // 🔥 FIX: Safety catch in case websocket fires out of order
    if (!startedAt) setStartedAt(Date.now());
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (!currentQuestion) return;
    const limit = currentQuestion.timeLimit || 60;
    const activeStart = startedAt || Date.now(); // 🔥 FIX: Fallback applied to interval math

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  function handleSelect(i: number) {
    if (revealed || selected !== null) return;
    setSelected(i);
    if (mode === "solo") setTimeout(() => processAnswer(i), 1200);
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
    
    if (isCorrect) {
      setPlayers((prev) => prev.map((p) => p.isMe ? { ...p, score: p.score + (currentQuestion.points || 10), streak: p.streak + 1 } : p));
    } else {
      setPlayers((prev) => prev.map((p) => p.isMe ? { ...p, streak: 0 } : p));
    }

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: "BATTLE_ACTION", battleId: battleId || "room_101", userId: user?.id,
        sender: user?.username || user?.user_metadata?.full_name || "Student",
        scoreIncrement: isCorrect ? (currentQuestion.points || 10) : 0, message: `submitted an answer.`
      }));
    }
  }

  function handleNextQuestion() {
    const isLastQuestion = currentIndex >= questions.length - 1;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "ADVANCE_QUESTION", battleId: battleId || "room_101", isLastQuestion }));
    } else if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setStartedAt(Date.now());
    } else {
      navigate("results");
    }
  }

  function sendChat() {
    if (!chatInput.trim()) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: "BATTLE_ACTION", battleId: battleId || "room_101", userId: user?.id,
        sender: user?.username || user?.user_metadata?.full_name || "You", message: chatInput.trim(),
      }));
    } else {
      setChat((c) => [...c, { id: Date.now(), player: "You", initials: "ME", color: AVATAR_COLORS[0], text: chatInput.trim(), ts: "now" }]);
    }
    setChatInput("");
  }

  const totalVotes = votes.reduce((a, v) => a + v.count, 0);
  function voteFor(i: number) { const v = votes.find((x) => x.option === i); return totalVotes ? ((v?.count ?? 0) / totalVotes) * 100 : 0; }

  if (!currentQuestion) return <div style={{ color: "white", padding: 40, textAlign: "center", minHeight: "100vh", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>Waiting for Professor to initialize questions...</div>;

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
            <div style={{ display: "flex", background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "3px 4px", gap: 3 }}>
              {(["solo", "discussion"] as const).map((v) => (
                <button key={v} type="button" onClick={() => setMode(v)} style={{ background: mode === v ? C.indigo : "transparent", border: "none", borderRadius: 16, padding: "4px 10px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: mode === v ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer" }}>{v === "solo" ? "⚡ Solo" : "👥 Team"}</button>
              ))}
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

        {mode === "discussion" && (
          <div style={{ height: 180, background: "rgba(0,0,0,0.3)", borderTop: "1.5px solid rgba(255,255,255,0.07)", display: "flex" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: "1.5px solid rgba(255,255,255,0.06)" }}>
              <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                {chat.map((m) => <ChatBubble key={m.id} msg={m} />)}
                <div ref={chatEndRef} />
              </div>
              <div style={{ padding: "8px 10px", display: "flex", gap: 7, alignItems: "center" }}>
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Type to discuss…" style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "7px 12px", color: "#fff" }} />
                <button type="button" onClick={sendChat} style={{ width: 32, height: 32, background: C.indigo, border: "none", borderRadius: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={14} color="#fff" /></button>
              </div>
            </div>
            <div style={{ width: 220, padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {isLeader && !revealed && (
                <button type="button" onClick={handleConfirmLeader} disabled={myVote === null} style={{ width: "100%", background: myVote !== null ? C.green : "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: "10px", color: "#fff", fontWeight: 700, cursor: myVote !== null ? "pointer" : "default" }}>Confirm Choice</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
//nasa livebatlle.txt orig code mo miguel
