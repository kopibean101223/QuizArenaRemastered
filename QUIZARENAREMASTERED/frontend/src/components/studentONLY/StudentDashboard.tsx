"use client";

import { useEffect, useState } from "react";
import { Flame, Star, Copy, Zap, Trophy, TrendingUp } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { StudentNavBar } from "../shared/StudentNavBar";
import { resolveRoomCode, consumePendingJoin } from "@/lib/student/joinlobby";
import {
  fetchMyQuizResults,
  fetchMySections,
  fetchLiveSessionsForMySections,
  summarizeResults,
  levelFromXp,
  subjectColor,
  modeLabel,
  type QuizResultRow,
  type MySection,
  type LiveSessionInfo,
} from "@/lib/student/studentData";
import { Lobby_LiveQuiz } from "./Lobby/Lobby_LiveQuiz";
import { Lobby_TeamMode } from "./Lobby/Lobby_TeamMode";
import { Lobby_BattleRoyale } from "./Lobby/Lobby_BattleRoyale";
import { Lobby_OwnPaced } from "./Lobby/Lobby_OwnPaced";
import { StudentEndlessMode } from "../gamemodes/StudentEndlessMode";

import { BattleSocketProvider } from "@/lib/student/battle/useBattleSocketProvider";

const C = {
  bg: "#100E1C",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  indigo: "#5B3DF6",
  coral: "#FF6B4A",
  yellow: "#FFC93C",
  green: "#2ED47A",
  muted: "rgba(255,255,255,0.5)",
};

type ResolvedMode = "LIVE" | "TEAM" | "ROYALE" | "SELF_PACED" | "ENDLESS";
function normalizeMode(mode: string | null | undefined): ResolvedMode {
  const m = (mode || "").toUpperCase();
  if (m === "TEAM") return "TEAM";
  if (m === "ROYALE") return "ROYALE";
  if (m === "SELF_PACED" || m === "SELFPACED") return "SELF_PACED";
  if (m === "ENDLESS") return "ENDLESS";
  return "LIVE";
}

export function StudentDashboard() {
  const { user, navigate, setActiveSectionId } = useApp();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResultRow[]>([]);
  const [sections, setSections] = useState<MySection[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSessionInfo[]>([]);
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  // Formerly handled by Lobby.tsx: once a room code resolves to a session,
  // we render the matching mode-specific lobby in place of the dashboard.
  const [hasJoined, setHasJoined] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [mode, setMode] = useState<ResolvedMode>("LIVE");
  const STORAGE_KEY = 'active_battle_session';

function enterBattle(code: string, sid: string, rawMode: string | null | undefined) {
  setRoomCode(code);
  setSessionId(sid);
  setMode(normalizeMode(rawMode));
  setActiveSectionId(sid);
  setHasJoined(true);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, sid, mode: rawMode }));
  toast.success("Successfully joined the live lobby!");
}

useEffect(() => {
  const pending = consumePendingJoin();
  if (pending) {
    enterBattle(pending.code, pending.sessionId, pending.mode);
    return;
  }
  async function restoreSession() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && !hasJoined) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.sid && parsed.code) {
          const { data } = await supabase
            .from('quiz_sessions')
            .select('status')
            .eq('id', parsed.sid)
            .maybeSingle();
          if (data?.status?.toUpperCase() === 'ACTIVE') {
            enterBattle(parsed.code, parsed.sid, parsed.mode);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
        console.warn("Failed to parse saved session:", e);
      }
    }
  }
  restoreSession();
}, [hasJoined, supabase]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const [myResults, mySections] = await Promise.all([
        fetchMyQuizResults(supabase, user.id),
        fetchMySections(supabase, user.id),
      ]);
      if (cancelled) return;
      setResults(myResults);
      setSections(mySections);

      const live = await fetchLiveSessionsForMySections(
        supabase,
        mySections.map((s) => ({ id: s.id, name: s.name }))
      );
      if (cancelled) return;
      setLiveSessions(live);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [user?.id]);

  const sectionSubjectById: Record<string, string> = {};
  sections.forEach((s) => { sectionSubjectById[s.id] = s.subject; });
  const stats = summarizeResults(results, sectionSubjectById);
  const { level, into, next, progress } = levelFromXp(stats.totalXp);

  // Group active subjects from enrolled sections, counting completed battles per subject.
  const battlesPerSection: Record<string, number> = {};
  results.forEach((r) => {
    const secId = r.quiz_sessions?.section_id;
    if (secId) battlesPerSection[secId] = (battlesPerSection[secId] || 0) + 1;
  });
  const subjectMap: Record<string, { count: number }> = {};
  sections.forEach((s) => {
    if (!subjectMap[s.subject]) subjectMap[s.subject] = { count: 0 };
    subjectMap[s.subject].count += battlesPerSection[s.id] || 0;
  });

  async function handleJoinByCode() {
    if (!user) return;
    if (!joinCode.trim()) {
      toast.error("Please enter a valid room code.");
      return;
    }
    setJoining(true);
    const res = await resolveRoomCode(supabase, joinCode);
    setJoining(false);
    if (!res.ok || !res.sessionId) {
      toast.error(res.message);
      return;
    }
    enterBattle(res.code!, res.sessionId, res.mode);
  }

  async function handlePasteCode() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setJoinCode(text.trim().toUpperCase());
    } catch {
      toast.error("Couldn't read clipboard — paste the code manually.");
    }
  }

  async function handleJoinLiveSession(session: LiveSessionInfo) {
    setJoining(true);
    const res = await resolveRoomCode(supabase, session.room_code);
    setJoining(false);
    if (!res.ok || !res.sessionId) {
      toast.error(res.message);
      return;
    }
    enterBattle(session.room_code, session.id, session.mode); // session.id, not section_id
  }

  // Handoff to the mode-specific lobby once we know which room + mode.
  // Replaces what Lobby.tsx used to render — no dashboard chrome here.
  // AFTER
// Find this block in StudentDashboard.tsx (search for "hasJoined && sessionId")
// and replace it with the version below. Nothing else in the file changes —
// imports for Lobby_TeamMode, Lobby_BattleRoyale, Lobby_OwnPaced, Lobby_LiveQuiz,
// and BattleSocketProvider are already correct as-is.

// ============================= FIND THIS =============================
//
// if (hasJoined && sessionId) {
//   switch (mode) {
//     case "TEAM":
//       return <Lobby_TeamMode sessionId={sessionId} roomCode={roomCode} />;
//     case "ROYALE":
//       return <Lobby_BattleRoyale sessionId={sessionId} roomCode={roomCode} />;
//     case "SELF_PACED":
//       return <Lobby_OwnPaced sessionId={sessionId} roomCode={roomCode} />;
//     case "LIVE":
//     default:
//       return (
//         <BattleSocketProvider
//           sessionId={sessionId}
//           userId={user?.id}
//           userName={user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0]}
//         >
//           <Lobby_LiveQuiz sessionId={sessionId} roomCode={roomCode} />
//         </BattleSocketProvider>
//       );
//   }
// }
//
// ========================= REPLACE WITH THIS =========================

if (hasJoined && sessionId) {
  const resolvedUserName =
    user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0];

  switch (mode) {
    case "TEAM":
      return (
        <BattleSocketProvider
          sessionId={sessionId}
          userId={user?.id}
          userName={resolvedUserName}
          mode="TEAM"
        >
          <Lobby_TeamMode sessionId={sessionId} roomCode={roomCode} />
        </BattleSocketProvider>
      );
    case "ROYALE":
      return (
        <BattleSocketProvider
          sessionId={sessionId}
          userId={user?.id}
          userName={resolvedUserName}
          mode="ROYALE"
        >
          <Lobby_BattleRoyale sessionId={sessionId} roomCode={roomCode} />
        </BattleSocketProvider>
      );
    case "ENDLESS":
      return (
        <BattleSocketProvider
          sessionId={sessionId}
          userId={user?.id}
          userName={resolvedUserName}
          mode="ENDLESS"
        >
          <StudentEndlessMode sessionId={sessionId} />
        </BattleSocketProvider>
      );
    case "SELF_PACED":
      return <Lobby_OwnPaced sessionId={sessionId} roomCode={roomCode} />;
    case "LIVE":
    default:
      return (
        <BattleSocketProvider
          sessionId={sessionId}
          userId={user?.id}
          userName={resolvedUserName}
          mode="LIVE"
        >
          <Lobby_LiveQuiz sessionId={sessionId} roomCode={roomCode} />
        </BattleSocketProvider>
      );
  }
}

  const initials = (user?.name || "??").slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <StudentNavBar />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Welcome card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(91,61,246,0.16), rgba(255,107,74,0.08))",
          border: `1.5px solid ${C.cardBorder}`, borderRadius: 22, padding: "22px 26px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
          marginBottom: 22,
        }}>
          <div>
            <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", margin: 0 }}>
              Welcome back, {user?.name || "Student"}! 👋
            </h1>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13.5, color: C.muted, margin: "6px 0 14px" }}>
              {stats.streak > 0
                ? <>You're on a <strong style={{ color: C.yellow }}>{stats.streak}-day streak</strong>. Keep it up! 🔥</>
                : "Complete a battle today to start your streak!"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 420 }}>
              <Star size={14} fill={C.yellow} color="transparent" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 700, color: "#fff" }}>
                {stats.totalXp.toLocaleString()} XP
              </span>
              <div style={{ flex: 1, height: 8, borderRadius: 6, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.round(progress * 100)}%`, height: "100%", borderRadius: 6,
                  background: `linear-gradient(90deg, ${C.indigo}, ${C.yellow})`,
                }} />
              </div>
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, whiteSpace: "nowrap" }}>
                Level {level} → {next} XP
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, background: "rgba(255,107,74,0.15)",
              border: "1px solid rgba(255,107,74,0.3)", borderRadius: 20, padding: "6px 14px",
            }}>
              <Flame size={14} fill={C.coral} color="transparent" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.coral }}>
                {stats.streak} streak
              </span>
            </div>
            <div style={{
              width: 42, height: 42, borderRadius: "50%", background: C.indigo,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 800, color: "#fff",
            }}>
              {initials}
            </div>
          </div>
        </div>

        {/* Join a battle */}
        <SectionHeader icon={<Zap size={13} fill={C.coral} color="transparent" />} label="Join a Battle" color={C.coral} />
        <div style={{
          background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 20,
          padding: "18px 20px", marginBottom: 26,
        }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: "0 0 12px" }}>
            Got a room code from your professor? Enter it below to join the battle!
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleJoinByCode()}
                maxLength={7}
                placeholder="QZ-0000"
                style={{
                  width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)",
                  border: "2px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "12px 44px 12px 16px",
                  fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: C.yellow,
                  outline: "none", letterSpacing: "0.1em",
                }}
              />
              <button type="button" onClick={handlePasteCode} title="Paste from clipboard"
                style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  width: 30, height: 30, borderRadius: 8, border: "none",
                  background: "rgba(255,255,255,0.08)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                <Copy size={13} color={C.muted} />
              </button>
            </div>
            <button type="button" onClick={handleJoinByCode} disabled={joining}
              style={{
                background: C.coral, border: "none", borderRadius: 14, padding: "0 28px",
                fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff",
                cursor: joining ? "default" : "pointer", opacity: joining ? 0.7 : 1,
                boxShadow: "0 6px 18px rgba(255,107,74,0.35)", display: "flex", alignItems: "center", gap: 6,
              }}>
              {joining ? "Checking…" : <>Join! <Zap size={16} fill="#fff" color="transparent" /></>}
            </button>
          </div>
        </div>

        {/* Active subjects */}
        <SectionHeader icon={<Trophy size={13} color={C.yellow} />} label="Active Subjects" color={C.yellow} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 26 }}>
          {Object.keys(subjectMap).length === 0 && !loading && (
            <EmptyCard text="Join a class to see your subjects here." onAction={() => navigate("classes")} actionLabel="Join a Class" />
          )}
          {Object.entries(subjectMap).map(([subject, info]) => {
            const col = subjectColor(subject);
            return (
              <div key={subject} style={{
                background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 16, padding: "16px 18px",
              }}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>
                  {subject}
                </p>
                <span style={{
                  fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: col.text,
                  background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: "2px 8px",
                }}>
                  {info.count} {info.count === 1 ? "quiz" : "quizzes"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live / upcoming quizzes */}
        <SectionHeader icon={<Zap size={13} fill={C.indigo} color="transparent" />} label="Live Now" color={C.indigo} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 12, marginBottom: 26 }}>
          {liveSessions.length === 0 && !loading && (
            <EmptyCard text="No live quizzes right now — check back later, or ask your professor for a room code." />
          )}
          {liveSessions.map((s) => {
            const subject = sectionSubjectById[s.section_id] || "General";
            const col = subjectColor(subject);
            return (
              <div key={s.id} style={{
                background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 18, padding: "16px 16px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800, color: col.text,
                    background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: "2px 8px",
                  }}>
                    {subject}
                  </span>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4, fontFamily: "Manrope, sans-serif",
                    fontSize: 10.5, fontWeight: 800, color: C.green, textTransform: "uppercase",
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} /> Live Now
                  </span>
                </div>
                <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
                  {s.sectionName}
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: C.muted, margin: "0 0 14px" }}>
                  {modeLabel(s.mode)} · Room {s.room_code}
                </p>
                <button type="button" onClick={() => handleJoinLiveSession(s)}
                  style={{
                    width: "100%", background: C.coral, border: "none", borderRadius: 12, padding: "10px 0",
                    fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", cursor: "pointer",
                  }}>
                  Join Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <SectionHeader icon={<TrendingUp size={13} color={C.green} />} label="Your Stats" color={C.green} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          <StatBox icon={<Trophy size={22} fill={C.yellow} color="transparent" />} value={stats.battlesWon} label="Battles Won" />
          <StatBox icon={<TrendingUp size={22} color={C.green} />} value={`${stats.winRate}%`} label="Win Rate" valueColor={C.green} />
          <StatBox icon={<Flame size={22} fill={C.coral} color="transparent" />} value={stats.streak} label="Current Streak" valueColor={C.coral} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
      {icon}
      <span style={{
        fontFamily: "Manrope, sans-serif", fontSize: 11.5, fontWeight: 800, color,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {label}
      </span>
    </div>
  );
}

function StatBox({ icon, value, label, valueColor }: { icon: React.ReactNode; value: React.ReactNode; label: string; valueColor?: string }) {
  return (
    <div style={{
      background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 16,
      padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    }}>
      {icon}
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: valueColor || "#fff" }}>
        {value}
      </span>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11.5, fontWeight: 700, color: C.muted }}>
        {label}
      </span>
    </div>
  );
}

function EmptyCard({ text, onAction, actionLabel }: { text: string; onAction?: () => void; actionLabel?: string }) {
  return (
    <div style={{
      gridColumn: "1 / -1", background: "rgba(255,255,255,0.03)", border: "1.5px dashed rgba(255,255,255,0.12)",
      borderRadius: 16, padding: "22px 18px", textAlign: "center",
    }}>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: onAction ? "0 0 10px" : 0 }}>
        {text}
      </p>
      {onAction && (
        <button type="button" onClick={onAction} style={{
          background: C.indigo, border: "none", borderRadius: 10, padding: "8px 18px",
          fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 800, color: "#fff", cursor: "pointer",
        }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}