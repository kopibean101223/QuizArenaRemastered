import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { StudentTopBar } from "./shared/StudentTopBar";
import {
  User, Users, Zap, Copy, Check, Trophy, Star,
  Crown, Shield, Sword, LogOut, Sparkles,
} from "lucide-react";

// ─── Palette ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6", indigoDeep: "#4228D4", indigoLight: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",  coralDeep: "#E85A3A",
  yellow: "#FFC93C", yellowGlow: "rgba(255,201,60,0.5)",
  green: "#2ED47A",  navy: "#1B1E2B",
  offWhite: "#FAFAFC", muted: "#717182",
};

// ─── Mock players ────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#5B3DF6","#FF6B4A","#2ED47A","#FFC93C","#FF4757",
  "#5BC8F6","#B06EF6","#FF9F40","#E040FB","#00BCD4",
  "#FF6B9D","#43E97B",
];

interface Player {
  id: number; name: string; initials: string; color: string; isHost: boolean; isReady: boolean;
}

const INIT_PLAYERS: Player[] = [
  { id:1,  name:"Prof. Dela Cruz", initials:"RD", color:AVATAR_COLORS[0], isHost:true,  isReady:true  },
  { id:2,  name:"Ana Reyes",       initials:"AR", color:AVATAR_COLORS[1], isHost:false, isReady:true  },
  { id:3,  name:"Carlo B.",        initials:"CB", color:AVATAR_COLORS[2], isHost:false, isReady:true  },
  { id:4,  name:"Maria S.",        initials:"MS", color:AVATAR_COLORS[3], isHost:false, isReady:false },
  { id:5,  name:"Juan DT.",        initials:"JD", color:AVATAR_COLORS[4], isHost:false, isReady:true  },
  { id:6,  name:"Lea F.",          initials:"LF", color:AVATAR_COLORS[5], isHost:false, isReady:false },
  { id:7,  name:"Trisha V.",       initials:"TV", color:AVATAR_COLORS[6], isHost:false, isReady:true  },
  { id:8,  name:"Ben A.",          initials:"BA", color:AVATAR_COLORS[7], isHost:false, isReady:false },
];

// Total capacity
const CAPACITY = 12;

const MODES = [
  {
    id: "individual",
    label: "Individual",
    sub: "Every player for themselves",
    emoji: "⚡",
    icon: <User size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#1B1E2B,#2D2F45)",
    accent: C.indigo,
    desc: "Go solo and climb the leaderboard on your own skills.",
  },
  {
    id: "team",
    label: "Team Battle",
    sub: "Compete as a squad",
    emoji: "🛡️",
    icon: <Users size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#1A2E1A,#243324)",
    accent: C.green,
    desc: "Join forces! Balanced teams compete for collective glory.",
  },
  {
    id: "royale",
    label: "Battle Royale",
    sub: "Last one standing wins",
    emoji: "👑",
    icon: <Crown size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#2E1A0E,#3D2510)",
    accent: C.coral,
    desc: "One question eliminates the weakest. Pure survival mode.",
  },
];

// ─── Confetti particles ──────────────────────────────────────────────────────────
const CONFETTI_DOTS = [
  { x:5,   y:8,   size:10, color:C.yellow,  shape:"circle", anim:"floatA", dur:3.1 },
  { x:92,  y:6,   size:8,  color:C.coral,   shape:"circle", anim:"floatB", dur:2.7 },
  { x:12,  y:80,  size:7,  color:C.green,   shape:"square", anim:"floatC", dur:3.5 },
  { x:88,  y:78,  size:9,  color:C.yellow,  shape:"square", anim:"floatA", dur:2.9 },
  { x:48,  y:3,   size:6,  color:"rgba(255,255,255,0.3)", shape:"circle", anim:"floatB", dur:4.0 },
  { x:96,  y:42,  size:5,  color:C.green,   shape:"circle", anim:"floatC", dur:3.2 },
  { x:2,   y:45,  size:8,  color:C.coral,   shape:"square", anim:"floatA", dur:3.8 },
  { x:75,  y:90,  size:7,  color:"rgba(255,255,255,0.2)", shape:"circle", anim:"floatB", dur:2.5 },
  { x:22,  y:92,  size:5,  color:C.yellow,  shape:"circle", anim:"floatC", dur:3.6 },
  { x:60,  y:88,  size:6,  color:C.coral,   shape:"square", anim:"floatA", dur:2.8 },
  { x:35,  y:5,   size:7,  color:C.indigo,  shape:"circle", anim:"floatB", dur:3.3 },
  { x:70,  y:4,   size:5,  color:C.green,   shape:"square", anim:"floatC", dur:3.7 },
];

const STAR_DECS = [
  { x:8,  y:15, size:16, opacity:0.7, anim:"floatA", dur:3.2 },
  { x:90, y:12, size:12, opacity:0.6, anim:"floatB", dur:2.8 },
  { x:4,  y:65, size:10, opacity:0.5, anim:"floatC", dur:3.5 },
  { x:93, y:60, size:14, opacity:0.6, anim:"floatA", dur:3.0 },
  { x:50, y:2,  size:9,  opacity:0.4, anim:"floatB", dur:4.1 },
];

// ─── Countdown display ────────────────────────────────────────────────────────────
function CountdownDisplay({ count }: { count: number }) {
  const color = count <= 1 ? C.coral : count <= 2 ? C.yellow : C.green;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "rgba(27,30,43,0.88)", backdropFilter: "blur(6px)" }}>
      {/* Burst rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{ position: "absolute", width: 200+i*80, height: 200+i*80,
          borderRadius: "50%", border: `2px solid ${color}`,
          opacity: 0.12*i, animation: `burstRing 1s ease-out ${i*0.12}s infinite` }} />
      ))}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 180, fontWeight: 700,
          color, lineHeight: 1, animation: "countPop 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          textShadow: `0 0 60px ${color}80, 0 0 120px ${color}40`, display: "block" }}>
          {count}
        </span>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 28, fontWeight: 600,
          color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase",
          animation: "fadeUp 0.4s ease-out" }}>
          {count === 3 ? "Get Ready!" : count === 2 ? "Steady…" : "GO!"}
        </span>
      </div>
    </div>
  );
}

// ─── Player avatar chip ────────────────────────────────────────────────────────────
function PlayerChip({ player, animate }: { player: Player; animate?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      animation: animate ? "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" : undefined }}>
      <div style={{ position: "relative" }}>
        {/* Outer ring — ready = solid, waiting = pulsing */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `linear-gradient(145deg, ${player.color}, ${player.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff",
          boxShadow: player.isReady
            ? `0 0 0 3px ${C.green}, 0 4px 16px ${player.color}55`
            : `0 0 0 3px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)`,
          transition: "box-shadow 0.3s",
          animation: !player.isReady ? "readyPulse 2s ease-in-out infinite" : undefined,
        }}>
          {player.initials}
        </div>
        {/* Host crown */}
        {player.isHost && (
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)" }}>
            <Crown size={16} fill={C.yellow} color={C.yellow} />
          </div>
        )}
        {/* Ready dot */}
        <div style={{ position: "absolute", bottom: 1, right: 1, width: 14, height: 14,
          borderRadius: "50%", background: player.isReady ? C.green : "rgba(255,255,255,0.2)",
          border: "2px solid #1B1E2B", transition: "background 0.3s",
          animation: !player.isReady ? "dotPulse 1.4s ease-in-out infinite" : undefined }} />
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
        color: "rgba(255,255,255,0.75)", textAlign: "center", maxWidth: 68,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {player.name}
      </span>
    </div>
  );
}

// ─── Empty slot ────────────────────────────────────────────────────────────────────
function EmptySlot() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%",
        border: "2px dashed rgba(255,255,255,0.12)", display: "flex",
        alignItems: "center", justifyContent: "center",
        animation: "emptyPulse 2.5s ease-in-out infinite" }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 20,
          color: "rgba(255,255,255,0.1)", fontWeight: 700 }}>+</span>
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600,
        color: "rgba(255,255,255,0.18)" }}>waiting…</span>
    </div>
  );
}

// ─── Mode card ─────────────────────────────────────────────────────────────────────
function ModeCard({ mode, selected, onClick }:
  { mode: typeof MODES[0]; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: 1, minWidth: 0, background: mode.bg,
      borderRadius: 24, padding: "24px 18px 20px",
      border: selected
        ? `2.5px solid ${C.yellow}`
        : "2.5px solid rgba(255,255,255,0.07)",
      cursor: "pointer", textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      boxShadow: selected
        ? `0 0 0 4px ${C.yellowGlow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`
        : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
      transform: selected ? "scale(1.03) translateY(-2px)" : "scale(1)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Selected star burst */}
      {selected && (
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80,
          borderRadius: "50%", background: `${C.yellow}22`, pointerEvents: "none" }} />
      )}
      {/* Emoji large */}
      <span style={{ fontSize: 42, lineHeight: 1,
        filter: selected ? `drop-shadow(0 0 12px ${mode.accent})` : "none",
        transition: "filter 0.2s" }}>
        {mode.emoji}
      </span>
      <div>
        <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700,
          color: selected ? C.yellow : "#fff", margin: 0, lineHeight: 1.1,
          transition: "color 0.2s" }}>
          {mode.label}
        </p>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600,
          color: "rgba(255,255,255,0.45)", margin: "4px 0 0", lineHeight: 1.4 }}>
          {mode.desc}
        </p>
      </div>
      {selected && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
          background: C.yellow, borderRadius: 20, padding: "4px 12px" }}>
          <Check size={11} strokeWidth={3} color={C.navy} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
            color: C.navy }}>Selected</span>
        </div>
      )}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────────
export function BattleLobby() {
  const { user, navigate } = useApp();
  // Auto-set professor view based on logged-in role
  const [isProfessor, setIsProfessor] = useState(user?.role === "professor");
  const [roomCode, setRoomCode] = useState("QZ-4827");
  const [inputCode, setInputCode] = useState("");
  const [selectedMode, setSelectedMode] = useState("team");
  const [players, setPlayers] = useState<Player[]>(INIT_PLAYERS);
  const [newPlayerIdx, setNewPlayerIdx] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const cdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate a player joining every 5s
  useEffect(() => {
    const PENDING = [
      { id:9,  name:"Sofia C.",    initials:"SC", color:AVATAR_COLORS[8],  isHost:false, isReady:false },
      { id:10, name:"Diego L.",    initials:"DL", color:AVATAR_COLORS[9],  isHost:false, isReady:false },
      { id:11, name:"Camille T.",  initials:"CT", color:AVATAR_COLORS[10], isHost:false, isReady:false },
      { id:12, name:"Marco DC.",   initials:"MD", color:AVATAR_COLORS[11], isHost:false, isReady:false },
    ];
    let idx = 0;
    const timer = setInterval(() => {
      if (idx >= PENDING.length) { clearInterval(timer); return; }
      const p = PENDING[idx++];
      setPlayers(prev => prev.length < CAPACITY ? [...prev, p] : prev);
      setNewPlayerIdx(p.id);
      setTimeout(() => setNewPlayerIdx(null), 600);
      // Mark them ready after 1.5s
      setTimeout(() => {
        setPlayers(prev => prev.map(x => x.id === p.id ? { ...x, isReady: true } : x));
      }, 1500);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  function handleCopyCode() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartBattle() {
    setCountdown(3);
  }

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setBattleStarted(true);
      setCountdown(null);
      return;
    }
    const t = setTimeout(() => setCountdown(c => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const readyCount = players.filter(p => p.isReady).length;
  const allReady = readyCount === players.length && players.length >= 2;
  const emptySlots = Math.max(0, CAPACITY - players.length);

  return (
    <>
      <StudentTopBar />
      <style>{`
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes floatA      { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(10deg)} }
        @keyframes floatB      { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(-8deg)} }
        @keyframes floatC      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes dotPulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }
        @keyframes readyPulse  { 0%,100%{box-shadow:0 0 0 3px rgba(255,255,255,0.15),0 4px 12px rgba(0,0,0,0.3)} 50%{box-shadow:0 0 0 5px rgba(255,255,255,0.25),0 4px 16px rgba(0,0,0,0.4)} }
        @keyframes emptyPulse  { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes popIn       { 0%{opacity:0;transform:scale(0.4)} 100%{opacity:1;transform:scale(1)} }
        @keyframes countPop    { 0%{transform:scale(0.4);opacity:0} 80%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp      { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes burstRing   { 0%{transform:scale(0.6);opacity:0.5} 100%{transform:scale(1.4);opacity:0} }
        @keyframes titlePulse  { 0%,100%{text-shadow:0 0 40px rgba(255,201,60,0.4)} 50%{text-shadow:0 0 80px rgba(255,201,60,0.8), 0 0 20px rgba(255,107,74,0.5)} }
        @keyframes badgeBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes shimmer     { 0%{background-position:200% center} 100%{background-position:-200% center} }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.navy, position: "relative",
        overflow: "hidden", display: "flex", flexDirection: "column", paddingTop: 48 }}>

        {/* ── Background gradient blobs ── */}
        <div style={{ position: "absolute", top: -120, left: -120, width: 400, height: 400,
          borderRadius: "50%", background: "rgba(91,61,246,0.12)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: -100, right: -80, width: 350, height: 350,
          borderRadius: "50%", background: "rgba(255,107,74,0.1)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,61,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0 }} />

        {/* ── Confetti dots ── */}
        {CONFETTI_DOTS.map((d, i) => (
          <div key={i} style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size, borderRadius: d.shape === "circle" ? "50%" : 3,
            background: d.color, pointerEvents: "none", zIndex: 1,
            animation: `${d.anim} ${d.dur}s ease-in-out infinite` }} />
        ))}

        {/* ── Floating stars ── */}
        {STAR_DECS.map((s, i) => (
          <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
            pointerEvents: "none", zIndex: 1, opacity: s.opacity,
            animation: `${s.anim} ${s.dur}s ease-in-out infinite` }}>
            <Star size={s.size} fill={C.yellow} color="transparent" />
          </div>
        ))}

        {/* ── Top bar ── */}
        <div style={{ position: "relative", zIndex: 10, padding: "16px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: C.indigo,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(91,61,246,0.4)" }}>
              <Trophy fill={C.yellow} color="transparent" size={20} />
            </div>
            <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, fontWeight: 700,
              color: "#fff" }}>QuizArena</span>
          </div>

          {/* View toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: "5px 6px" }}>
            {[{ v: true, l: "Professor" }, { v: false, l: "Student" }].map(t => (
              <button key={String(t.v)} type="button" onClick={() => setIsProfessor(t.v)} style={{
                background: isProfessor === t.v ? C.indigo : "transparent",
                border: "none", borderRadius: 16, padding: "6px 14px",
                fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                color: isProfessor === t.v ? "#fff" : "rgba(255,255,255,0.45)",
                cursor: "pointer", transition: "all 0.18s",
                boxShadow: isProfessor === t.v ? "0 2px 8px rgba(91,61,246,0.4)" : "none",
              }}>{t.l}</button>
            ))}
          </div>

          <button type="button" style={{ display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 12,
            padding: "8px 14px", fontFamily: "Manrope, sans-serif", fontSize: 13,
            fontWeight: 600, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
            <LogOut size={14} strokeWidth={2} />Leave
          </button>
        </div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, position: "relative", zIndex: 5, display: "flex",
          flexDirection: "column", alignItems: "center", padding: "0 24px 32px",
          gap: 0, overflowY: "auto" }}>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)",
              borderRadius: 20, padding: "5px 16px", marginBottom: 12,
              animation: "badgeBounce 2.5s ease-in-out infinite" }}>
              <Zap size={13} fill={C.yellow} color="transparent" />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800,
                color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Battle Lobby
              </span>
            </div>
            <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700,
              color: "#fff", margin: 0, lineHeight: 1.1,
              animation: "titlePulse 3s ease-in-out infinite" }}>
              Ready to{" "}
              <span style={{
                background: `linear-gradient(90deg, ${C.yellow}, ${C.coral}, ${C.yellow})`,
                backgroundSize: "200% auto", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "shimmer 2.5s linear infinite",
              }}>
                Battle?
              </span>
            </h1>
          </div>

          {/* ── Room Code panel ── */}
          <div style={{ width: "100%", maxWidth: 600, marginBottom: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px" }}>

              {isProfessor ? (
                /* Professor: show room code */
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                    color: "rgba(255,255,255,0.45)", textAlign: "center", margin: 0,
                    textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Your Room Code
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.06)",
                      border: "2px solid rgba(255,255,255,0.1)", borderRadius: 16,
                      padding: "14px 20px", textAlign: "center" }}>
                      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700,
                        color: C.yellow, letterSpacing: "0.15em",
                        textShadow: "0 0 24px rgba(255,201,60,0.4)" }}>
                        {roomCode}
                      </span>
                    </div>
                    <button type="button" onClick={handleCopyCode} style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: copied ? "rgba(46,212,122,0.2)" : "rgba(255,255,255,0.08)",
                      border: `2px solid ${copied ? C.green : "rgba(255,255,255,0.12)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "all 0.2s", color: copied ? C.green : "rgba(255,255,255,0.5)",
                    }}>
                      {copied ? <Check size={18} strokeWidth={2.5} /> : <Copy size={18} strokeWidth={2} />}
                    </button>
                  </div>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                    color: "rgba(255,255,255,0.35)", textAlign: "center", margin: 0 }}>
                    Share this code with your students to join the battle
                  </p>
                </div>
              ) : (
                /* Student: join room */
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                    color: "rgba(255,255,255,0.45)", textAlign: "center", margin: 0,
                    textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Enter Room Code
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input value={inputCode} onChange={e => setInputCode(e.target.value.toUpperCase())}
                      maxLength={7} placeholder="QZ-0000"
                      style={{ flex: 1, background: "rgba(255,255,255,0.07)",
                        border: "2px solid rgba(255,255,255,0.12)", borderRadius: 16,
                        padding: "14px 20px", fontFamily: "Fredoka, sans-serif",
                        fontSize: 36, fontWeight: 700, color: C.yellow, outline: "none",
                        letterSpacing: "0.15em", textAlign: "center",
                        caretColor: C.yellow, width: "100%", boxSizing: "border-box" }} />
                    <button type="button" onClick={() => setIsProfessor(true)} style={{
                      background: C.coral, border: "none", borderRadius: 16, padding: "14px 28px",
                      fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700,
                      color: "#fff", cursor: "pointer", flexShrink: 0,
                      boxShadow: "0 6px 20px rgba(255,107,74,0.4)",
                      transition: "transform 0.15s, box-shadow 0.15s",
                    }}>
                      Join!
                    </button>
                  </div>
                  <button type="button" onClick={() => setIsProfessor(true)} style={{
                    background: "transparent", border: "2px dashed rgba(255,255,255,0.2)",
                    borderRadius: 14, padding: "10px",
                    fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700,
                    color: "rgba(255,255,255,0.45)", cursor: "pointer",
                  }}>
                    + Create a New Room (Professor)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Mode Selector ── */}
          <div style={{ width: "100%", maxWidth: 900, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Sparkles size={14} color={C.yellow} strokeWidth={2} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800,
                color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Battle Mode
              </span>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {MODES.map(mode => (
                <ModeCard key={mode.id} mode={mode}
                  selected={selectedMode === mode.id}
                  onClick={() => setSelectedMode(mode.id)} />
              ))}
            </div>
          </div>

          {/* ── Player Grid ── */}
          <div style={{ width: "100%", maxWidth: 900, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800,
                  color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
                  letterSpacing: "0.1em" }}>Players</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Waiting indicator */}
                {!allReady && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%",
                      background: C.yellow, display: "inline-block",
                      animation: "dotPulse 1.2s ease-in-out infinite" }} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                      fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                      Waiting for players…
                    </span>
                  </div>
                )}
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20,
                  padding: "4px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700,
                    color: "#fff" }}>{players.length}</span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11,
                    fontWeight: 600, color: "rgba(255,255,255,0.35)" }}>/ {CAPACITY}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5,
                  background: allReady ? "rgba(46,212,122,0.15)" : "rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: "4px 12px" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%",
                    background: allReady ? C.green : "rgba(255,255,255,0.3)",
                    animation: !allReady ? "dotPulse 1.4s ease-in-out infinite" : undefined }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
                    color: allReady ? C.green : "rgba(255,255,255,0.4)" }}>
                    {readyCount}/{players.length} Ready
                  </span>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "22px 18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: "18px 12px" }}>
                {players.map(p => (
                  <PlayerChip key={p.id} player={p} animate={newPlayerIdx === p.id} />
                ))}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <EmptySlot key={`empty-${i}`} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom actions ── */}
          <div style={{ width: "100%", maxWidth: 900, display: "flex",
            flexDirection: "column", alignItems: "center", gap: 12 }}>

            {isProfessor ? (
              <>
                {/* Start battle button */}
                <button type="button" onClick={handleStartBattle}
                  disabled={players.length < 2}
                  style={{
                    width: "100%", background: players.length < 2
                      ? "rgba(91,61,246,0.3)"
                      : `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`,
                    border: "none", borderRadius: 20, padding: "18px 0",
                    fontFamily: "Fredoka, sans-serif", fontSize: 28, fontWeight: 700,
                    color: players.length < 2 ? "rgba(255,255,255,0.3)" : "#fff",
                    cursor: players.length < 2 ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                    boxShadow: players.length < 2 ? "none"
                      : "0 8px 32px rgba(91,61,246,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.2s",
                    letterSpacing: "0.01em",
                  }}>
                  <Zap size={26} fill={players.length < 2 ? "rgba(255,255,255,0.2)" : C.yellow}
                    color="transparent" />
                  Start Battle!
                  <Zap size={26} fill={players.length < 2 ? "rgba(255,255,255,0.2)" : C.yellow}
                    color="transparent" />
                </button>
                {players.length < 2 && (
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                    color: "rgba(255,255,255,0.3)", margin: 0 }}>
                    Need at least 2 players to start
                  </p>
                )}
              </>
            ) : (
              /* Student waiting state */
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 24px",
                background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 18 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%",
                  background: C.yellow, animation: "dotPulse 1s ease-in-out infinite",
                  flexShrink: 0 }} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700,
                  color: "rgba(255,255,255,0.55)" }}>
                  Waiting for the professor to start the battle…
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Countdown overlay ── */}
      {countdown !== null && <CountdownDisplay count={countdown} />}

      {/* ── Battle started ── */}
      {battleStarted && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${C.indigoDeep}, #2D0E8A)`,
          gap: 20 }}>
          {/* Star burst */}
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%",
              width: 4, height: 4, borderRadius: "50%", background: C.yellow,
              transformOrigin: "0 0",
              transform: `rotate(${i*45}deg) translateX(120px)`,
              animation: "burstRing 0.8s ease-out forwards" }} />
          ))}
          <Trophy fill={C.yellow} color="transparent" size={64}
            style={{ filter: `drop-shadow(0 0 24px ${C.yellow})`,
              animation: "countPop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 56, fontWeight: 700,
            color: "#fff", animation: "countPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
            Battle Begins!
          </span>
          <button type="button" onClick={() => navigate("battle")} style={{
            marginTop: 12, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 14,
            padding: "12px 32px", fontFamily: "Fredoka, sans-serif", fontSize: 20,
            fontWeight: 700, color: "#fff", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}>Enter Battle →</button>
        </div>
      )}
    </>
  );
}
