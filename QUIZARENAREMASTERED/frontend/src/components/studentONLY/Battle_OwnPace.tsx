'use client';

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  Trophy,
  Zap,
  Star,
  Send,
  ArrowRight
} from "lucide-react";

import {
  C,
  AVATAR_COLORS,
  QuestionData,
  INIT_PLAYERS,
  INIT_CHAT,
  Player,
  ChatMsg,
} from "./LiveBattleCOMPONENTONLY/Constants";
import { CountdownBar } from "./LiveBattleCOMPONENTONLY/CountdownBar";
import { AnswerBtn } from "./LiveBattleCOMPONENTONLY/AnswerButton";
import { LeaderRow } from "./LiveBattleCOMPONENTONLY/LeaderRow";
import { ChatBubble } from "./LiveBattleCOMPONENTONLY/ChatBubble";
import {
  useBattleSocket,
  getStudentIdentity,
  computeTimeLeft,
} from "@/lib/student/battle/useBattleConnection";

const MANUAL_QUESTIONS: QuestionData[] = [
  {
    id: 1,
    number: 1,
    total: 5,
    subject: "Data Structures",
    text: "What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1,
    points: 200,
    timeLimit: 15,
  },
  {
    id: 2,
    number: 2,
    total: 5,
    subject: "Algorithms",
    text: "Which sorting algorithm has an average time complexity of O(n log n) and operates in-place?",
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    correct: 2,
    points: 250,
    timeLimit: 20,
  },
  {
    id: 3,
    number: 3,
    total: 5,
    subject: "Computer Networks",
    text: "Which layer of the OSI model is responsible for end-to-end communication and logical addressing (IP addresses)?",
    options: ["Data Link Layer", "Network Layer", "Transport Layer", "Application Layer"],
    correct: 1,
    points: 200,
    timeLimit: 15,
  },
  {
    id: 4,
    number: 4,
    total: 5,
    subject: "Operating Systems",
    text: "What condition is NOT required for a deadlock to occur in an operating system?",
    options: ["Mutual Exclusion", "Hold and Wait", "Preemption", "Circular Wait"],
    correct: 2,
    points: 300,
    timeLimit: 20,
  },
  {
    id: 5,
    number: 5,
    total: 5,
    subject: "Software Engineering",
    text: "In the SOLID design principles, what does the 'L' stand for?",
    options: [
      "Liskov Substitution Principle",
      "Linear Abstraction Principle",
      "Logical Separation Principle",
      "Layered Architecture Principle"
    ],
    correct: 0,
    points: 250,
    timeLimit: 15,
  },
];

export function SelfPacedBattle({ battleId = "room_101" }: { battleId?: string }) {
  const { navigate, user } = useApp();

  const [questions, setQuestions] = useState<QuestionData[]>(MANUAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = questions[currentIndex];

  const { studentName, currentUserId } = getStudentIdentity(user);

  // ── INDIVIDUAL TIMER COMPUTATION ──
  const [startedAt, setStartedAt] = useState<number | null>(Date.now());

  const [timeLeft, setTimeLeft] = useState(currentQuestion?.timeLimit || 15);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const [players, setPlayers] = useState<Player[]>(INIT_PLAYERS);
  const [chat, setChat] = useState<ChatMsg[]>(INIT_CHAT);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const myPlayer = players.find((p) => p.isMe || p.id === currentUserId);

  // ── WEBSOCKET CONNECTION & SELF-PACED SYNC ──
  // Connect/reconnect lifecycle now lives in useBattleSocket (shared with the
  // other 3 battle modes). Only the JOIN payload and message handling below
  // are specific to self-paced mode.
  const { send } = useBattleSocket({
    battleId,
    deps: [currentUserId, studentName],
    onOpen: (socket) => {
      socket.send(
        JSON.stringify({
          mode: "SELF_PACED",
          type: "JOIN_SELF_PACED_BATTLE",
          battleId,
          playerId: currentUserId,
          sender: studentName,
        })
      );
    },
    onMessage: (data) => {
      // Initial sync of student's personal question index and timer
      if (data.type === "SELF_PACED_STATE_SYNC") {
        if (typeof data.currentIndex === "number") {
          setCurrentIndex(data.currentIndex);
        }
        if (data.startedAt) {
          setStartedAt(Number(data.startedAt));
        }
        if (typeof data.score === "number") {
          setPlayers((prev) =>
            prev.map((p) => (p.isMe || p.id === currentUserId ? { ...p, score: data.score } : p))
          );
        }
      }

      // Server confirms individual question advance and sets personal start time
      if (data.type === "PLAYER_QUESTION_STARTED") {
        if (typeof data.currentIndex === "number") {
          setCurrentIndex(data.currentIndex);
        }
        if (data.startedAt) {
          setStartedAt(Number(data.startedAt));
        }
      }

      // Live Leaderboard sync across all players in room
      if (data.type === "PLAYER_SCORE_UPDATED" || data.type === "SCORE_UPDATED") {
        if (Array.isArray(data.leaderboard)) {
          const formattedPlayers: Player[] = data.leaderboard.map((item: any, idx: number) => ({
            id: item.id || item.userId || item.playerId,
            name: item.name || item.sender || `Player ${idx + 1}`,
            initials: (item.name || "P").substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
            score: item.score || 0,
            streak: item.streak || 0,
            isMe: (item.id || item.userId || item.playerId) === currentUserId,
            isLeader: idx === 0,
          }));
          setPlayers(formattedPlayers);
        } else if (data.playerId && typeof data.score === "number") {
          setPlayers((prev) =>
            prev.map((p) =>
              p.id === data.playerId || (p.isMe && data.playerId === currentUserId)
                ? { ...p, score: data.score }
                : p
            )
          );
        }
      }

      // Chat Broadcasts
      if (data.type === "BATTLE_ACTION" || data.type === "CHAT_MESSAGE") {
        setChat((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            player: data.sender || "Anonymous",
            initials: (data.sender || "AN").substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            text: data.message,
            ts: new Date(data.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    },
  });

  // Reset answer states on question change
  useEffect(() => {
    if (!currentQuestion) return;
    setSelected(null);
    setRevealed(false);
  }, [currentIndex, currentQuestion]);

  // Individual countdown timer tick
  useEffect(() => {
    if (!currentQuestion) return;
    const limit = currentQuestion.timeLimit;

    setTimeLeft(computeTimeLeft(limit, startedAt));

    if (revealed) return;

    const interval = setInterval(() => {
      const remaining = computeTimeLeft(limit, startedAt);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        setRevealed(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, currentQuestion, revealed]);

  // Chat auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  function handleSelect(i: number) {
    if (revealed || selected !== null) return;
    setSelected(i);
    processAnswer(i);
  }

  function processAnswer(userChoice: number) {
    setRevealed(true);
    const isCorrect = userChoice === currentQuestion.correct;
    const pointsToAdd = isCorrect ? currentQuestion.points : 0;
    const newScore = (myPlayer?.score || 0) + pointsToAdd;

    // Local optimistic update
    setPlayers((prev) =>
      prev.map((p) =>
        p.isMe || p.id === currentUserId
          ? {
              ...p,
              score: newScore,
              streak: isCorrect ? p.streak + 1 : 0,
            }
          : p
      )
    );

    // Broadcast score submission over WebSocket
    send({
      mode: "SELF_PACED",
      type: "SUBMIT_SCORE",
      battleId,
      playerId: currentUserId,
      sender: studentName,
      score: newScore,
      pointsAdded: pointsToAdd,
      isCorrect,
      questionId: currentQuestion.id,
    });
  }

  // Advance player independently to the next question
  function handleNextQuestion() {
    const isLastQuestion = currentIndex >= questions.length - 1;
    const nextIndex = currentIndex + 1;

    if (isLastQuestion) {
      navigate("results");
      return;
    }

    const sent = send({
      mode: "SELF_PACED",
      type: "ADVANCE_SELF_PACED_QUESTION",
      battleId,
      playerId: currentUserId,
      sender: studentName,
      currentIndex: nextIndex,
      score: myPlayer?.score || 0,
    });

    if (!sent) {
      setCurrentIndex(nextIndex);
      setStartedAt(Date.now());
    }
  }

  // Chat message submission
  function sendChat() {
    if (!chatInput.trim()) return;
    const message = chatInput.trim();

    const sent = send({
      mode: "SELF_PACED",
      type: "BATTLE_ACTION",
      battleId,
      playerId: currentUserId,
      sender: studentName,
      message,
    });

    if (!sent) {
      setChat((prev) => [
        ...prev,
        {
          id: Date.now(),
          player: studentName,
          initials: studentName.substring(0, 2).toUpperCase(),
          color: AVATAR_COLORS[0],
          text: message,
          ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    setChatInput("");
  }

  if (!currentQuestion) return null;

  return (
    <>
      <StudentTopBar />

      <div
        style={{
          minHeight: "100vh",
          background: `radial-gradient(ellipse at 20% 20%, rgba(91,61,246,0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.1) 0%, transparent 50%), ${C.navy}`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          paddingTop: 48,
        }}
      >
        {/* TOP BAR */}
        <div
          style={{
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "rgba(0,0,0,0.25)",
            borderBottom: "1.5px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 11,
                background: C.indigo,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 12px rgba(91,61,246,0.4)",
              }}
            >
              <Trophy fill={C.yellow} color="transparent" size={18} />
            </div>
            <div>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                Question
              </p>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "#fff", margin: 0 }}>
                {currentQuestion.number} <span style={{ color: "rgba(255,255,255,0.3)" }}>/ {questions.length}</span>
              </p>
            </div>
          </div>

          <CountdownBar timeLeft={timeLeft} timeLimit={currentQuestion.timeLimit} />

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(46,212,122,0.15)",
                border: "1.5px solid rgba(46,212,122,0.35)",
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              <Zap size={13} fill={C.green} color="transparent" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.green }}>
                SELF-PACED
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              <Star size={12} fill={C.yellow} color="transparent" />
              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                {currentQuestion.points} pts
              </span>
            </div>
          </div>
        </div>

        {/* QUESTION & OPTIONS AREA */}
        <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", minWidth: 0 }}>
            {/* Question Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
                padding: "22px 26px",
                marginBottom: 16,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span
                  style={{
                    background: C.indigoLight,
                    border: "1.5px solid rgba(91,61,246,0.3)",
                    borderRadius: 8,
                    padding: "3px 10px",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#A08FFF",
                  }}
                >
                  {currentQuestion.subject}
                </span>
              </div>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>
                {currentQuestion.text}
              </p>
            </div>

            {/* Answer Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {currentQuestion.options.map((opt, i) => (
                <AnswerBtn
                  key={i}
                  index={i}
                  text={opt}
                  selected={selected === i}
                  revealed={revealed}
                  isCorrect={i === currentQuestion.correct}
                  disabled={revealed || selected !== null}
                  onClick={() => handleSelect(i)}
                />
              ))}
            </div>

            {/* Answer Feedback & Advance Action */}
            {revealed && (
              <div
                style={{
                  marginTop: 14,
                  padding: "14px 18px",
                  borderRadius: 18,
                  background: selected === currentQuestion.correct ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)",
                  border: `2px solid ${selected === currentQuestion.correct ? C.green : C.red}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 28 }}>{selected === currentQuestion.correct ? "🎉" : "❌"}</span>
                <div>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: selected === currentQuestion.correct ? C.green : C.red, margin: 0 }}>
                    {selected === currentQuestion.correct ? `Correct! +${currentQuestion.points} pts` : "Wrong Answer"}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                    Correct answer: <strong style={{ color: "#fff" }}>{currentQuestion.options[currentQuestion.correct]}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  style={{
                    marginLeft: "auto",
                    background: C.indigo,
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 18px",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT LEADERBOARD */}
          <div
            style={{
              width: 240,
              minWidth: 240,
              background: "rgba(0,0,0,0.2)",
              borderLeft: "1.5px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "14px", borderBottom: "1.5px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 17, fontWeight: 700, color: "#fff" }}>
                Live Standings
              </span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: 5 }}>
              {[...players]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => (
                  <LeaderRow key={p.id} player={{ ...p, rank: idx + 1 }} />
                ))}
            </div>
          </div>
        </div>

        {/* CHAT FOOTER */}
        <div
          style={{
            height: 140,
            background: "rgba(0,0,0,0.3)",
            borderTop: "1.5px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            {chat.map((m) => (
              <ChatBubble key={m.id} msg={m} />
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: "8px 10px", display: "flex", gap: 7, alignItems: "center" }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Send a message to the room…"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "7px 12px",
                color: "#fff",
              }}
            />
            <button
              type="button"
              onClick={sendChat}
              style={{
                width: 32,
                height: 32,
                background: C.indigo,
                border: "none",
                borderRadius: 9,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}