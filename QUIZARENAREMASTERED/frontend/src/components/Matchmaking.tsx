import { useState, useRef, useCallback } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  Trophy, LayoutDashboard, Library, BarChart2, Settings,
  Layers, LogOut, Sparkles, Users, Shuffle, CheckCircle2,
  Download, ChevronDown, Info, AlertTriangle, Zap,
  ArrowRight, RefreshCw, Shield, TrendingUp, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6", indigoLight: "rgba(91,61,246,0.07)", indigoMid: "rgba(91,61,246,0.14)",
  indigoBorder: "rgba(91,61,246,0.18)", indigoTrack: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",  coralLight: "rgba(255,107,74,0.09)", coralHover: "#E85A3A",
  yellow: "#FFC93C", yellowLight: "rgba(255,201,60,0.13)", yellowBorder: "rgba(255,201,60,0.35)",
  green: "#2ED47A",  greenLight: "rgba(46,212,122,0.1)",  greenBorder: "rgba(46,212,122,0.28)",
  red: "#FF4757",    redLight: "rgba(255,71,87,0.09)",
  navy: "#1B1E2B", offWhite: "#FAFAFC", white: "#FFFFFF",
  muted: "#717182", border: "rgba(0,0,0,0.07)", inputBg: "#F3F3F7",
};

const TEAM_PALETTE = [
  { bg: "#5B3DF6", light: "rgba(91,61,246,0.1)",  text: "#5B3DF6",  label: "Team Alpha" },
  { bg: "#FF6B4A", light: "rgba(255,107,74,0.1)", text: "#C8441E",  label: "Team Beta" },
  { bg: "#2ED47A", light: "rgba(46,212,122,0.1)", text: "#18A058",  label: "Team Gamma" },
  { bg: "#FFC93C", light: "rgba(255,201,60,0.13)",text: "#9A6C00",  label: "Team Delta" },
  { bg: "#FF4757", light: "rgba(255,71,87,0.1)",  text: "#CC2030",  label: "Team Epsilon" },
  { bg: "#5BC8F6", light: "rgba(91,200,246,0.13)",text: "#076E9A",  label: "Team Zeta" },
];

const PERF_STYLE = {
  High:   { bg: C.greenLight,  text: "#18A058", border: C.greenBorder,          dot: "#2ED47A" },
  Medium: { bg: C.yellowLight, text: "#9A6C00", border: C.yellowBorder,         dot: "#FFC93C" },
  Low:    { bg: C.redLight,    text: "#CC2030", border: "rgba(255,71,87,0.22)", dot: "#FF4757" },
};

const SECTIONS   = ["BSCS 3-A", "BSCS 3-B", "BSMATH 2-A", "BSPHYS 1-A", "BSHIST 4-B"];
const SESSIONS   = ["Quiz #1 — Algebra Basics", "Quiz #2 — Data Structures", "Quiz #3 — Mechanics", "Quiz #4 — WW2 Overview"];

interface Student {
  id: number; name: string; initials: string;
  perfLevel: "High" | "Medium" | "Low"; score: number; team: number;
  avatarColor: string;
}

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#FFC93C","#2ED47A","#FF4757","#5BC8F6","#B06EF6","#FF9F40","#E040FB","#00BCD4"];

const BASE_STUDENTS: Omit<Student, "team">[] = [
  { id:1,  name:"Ana Reyes",       initials:"AR", perfLevel:"High",   score:91, avatarColor:AVATAR_COLORS[0] },
  { id:2,  name:"Carlo Bautista",  initials:"CB", perfLevel:"Medium", score:74, avatarColor:AVATAR_COLORS[1] },
  { id:3,  name:"Maria Santos",    initials:"MS", perfLevel:"High",   score:88, avatarColor:AVATAR_COLORS[2] },
  { id:4,  name:"Juan dela Torre", initials:"JD", perfLevel:"Low",    score:52, avatarColor:AVATAR_COLORS[3] },
  { id:5,  name:"Lea Fajardo",     initials:"LF", perfLevel:"Medium", score:69, avatarColor:AVATAR_COLORS[4] },
  { id:6,  name:"Rico Mendoza",    initials:"RM", perfLevel:"Low",    score:48, avatarColor:AVATAR_COLORS[5] },
  { id:7,  name:"Trisha Villar",   initials:"TV", perfLevel:"High",   score:95, avatarColor:AVATAR_COLORS[6] },
  { id:8,  name:"Ben Aquino",      initials:"BA", perfLevel:"Medium", score:77, avatarColor:AVATAR_COLORS[7] },
  { id:9,  name:"Sofia Cruz",      initials:"SC", perfLevel:"Low",    score:55, avatarColor:AVATAR_COLORS[8] },
  { id:10, name:"Diego Lim",       initials:"DL", perfLevel:"High",   score:83, avatarColor:AVATAR_COLORS[9] },
  { id:11, name:"Camille Torres",  initials:"CT", perfLevel:"Medium", score:71, avatarColor:AVATAR_COLORS[0] },
  { id:12, name:"Marco Dela Cruz", initials:"MD", perfLevel:"Low",    score:44, avatarColor:AVATAR_COLORS[1] },
];

function assignTeams(students: Omit<Student,"team">[], teamSize: number, adaptive: boolean): Student[] {
  if (!adaptive) {
    return students.map((s, i) => ({ ...s, team: i % Math.ceil(students.length / teamSize) }));
  }
  // Adaptive: distribute H/M/L evenly across teams
  const numTeams = Math.ceil(students.length / teamSize);
  const sorted = [...students].sort((a, b) => b.score - a.score);
  const teams: number[] = Array(students.length).fill(0);
  const idxMap = new Map(sorted.map((s, i) => [s.id, i]));
  sorted.forEach((s, i) => { teams[i] = i % numTeams; });
  return students.map(s => ({ ...s, team: teams[idxMap.get(s.id)!] }));
}

function computeTeamStats(students: Student[], numTeams: number) {
  return Array.from({ length: numTeams }, (_, t) => {
    const members = students.filter(s => s.team === t);
    const avg = members.length ? Math.round(members.reduce((a, s) => a + s.score, 0) / members.length) : 0;
    return { team: t, name: TEAM_PALETTE[t]?.label ?? `Team ${t+1}`, avg, count: members.length };
  }).filter(t => t.count > 0);
}

function fairnessScore(teamStats: ReturnType<typeof computeTeamStats>) {
  if (!teamStats.length) return { score: 100, label: "Balanced", verdict: "balanced" as const };
  const avgs = teamStats.map(t => t.avg);
  const mean = avgs.reduce((a, b) => a + b, 0) / avgs.length;
  const variance = avgs.reduce((a, b) => a + (b - mean) ** 2, 0) / avgs.length;
  const stddev = Math.sqrt(variance);
  const score = Math.max(0, Math.round(100 - stddev * 1.5));
  return {
    score,
    label: score >= 80 ? "Balanced" : score >= 65 ? "Needs Review" : "Unbalanced",
    verdict: (score >= 80 ? "balanced" : score >= 65 ? "review" : "unbalanced") as "balanced"|"review"|"unbalanced",
  };
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() { return <ProfSidebar />;
  const [active, setActive] = useState("match");
  const items = [
    { id:"dashboard", icon:<LayoutDashboard size={17} strokeWidth={2}/>, label:"Dashboard" },
    { id:"sections",  icon:<Layers size={17} strokeWidth={2}/>,          label:"My Sections" },
    { id:"bank",      icon:<Library size={17} strokeWidth={2}/>,          label:"Question Bank" },
    { id:"ai",        icon:<Sparkles size={17} strokeWidth={2}/>,         label:"AI Generator" },
    { id:"match",     icon:<Users size={17} strokeWidth={2}/>,            label:"Matchmaking" },
    { id:"analytics", icon:<BarChart2 size={17} strokeWidth={2}/>,        label:"Analytics" },
    { id:"settings",  icon:<Settings size={17} strokeWidth={2}/>,         label:"Settings" },
  ];
  return (
    <div style={{width:210,minWidth:210,background:C.navy,display:"flex",flexDirection:"column",
      padding:"22px 12px",gap:3,height:"100vh",position:"sticky",top:0,flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:9,padding:"4px 8px",marginBottom:22}}>
        <div style={{width:34,height:34,borderRadius:9,background:C.indigo,display:"flex",
          alignItems:"center",justifyContent:"center"}}>
          <Trophy fill={C.yellow} color="transparent" size={17}/>
        </div>
        <span style={{fontFamily:"Fredoka, sans-serif",fontSize:19,fontWeight:700,color:"#fff"}}>QuizArena</span>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
        {items.map(item=>(
          <button key={item.id} type="button" onClick={()=>setActive(item.id)} style={{
            display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:11,
            background:active===item.id?"rgba(91,61,246,0.85)":"transparent",border:"none",
            cursor:"pointer",color:active===item.id?"#fff":"rgba(255,255,255,0.42)",
            fontFamily:"Manrope, sans-serif",fontSize:13,fontWeight:active===item.id?700:500,
            textAlign:"left",transition:"all 0.15s",width:"100%",
          }}>
            {item.icon}{item.label}
          </button>
        ))}
      </div>
      <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",
        gap:9,padding:"14px 8px 0"}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:C.indigo,display:"flex",
          alignItems:"center",justifyContent:"center",fontFamily:"Manrope, sans-serif",
          fontSize:11,fontWeight:800,color:"#fff",flexShrink:0}}>RD</div>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,color:"#fff",
            margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Prof. R. Dela Cruz</p>
          <p style={{fontFamily:"Manrope, sans-serif",fontSize:10,color:"rgba(255,255,255,0.38)",margin:0}}>Professor</p>
        </div>
        <button type="button" style={{background:"none",border:"none",cursor:"pointer",
          color:"rgba(255,255,255,0.28)",padding:0,display:"flex"}}>
          <LogOut size={14} strokeWidth={2}/>
        </button>
      </div>
    </div>
  );
}

// ─── Toggle Switch ──────────────────────────────────────────────────────────────
function ToggleSwitch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 50, border: "none", cursor: "pointer", padding: 0,
      background: on ? C.indigo : "#CBD0D8", position: "relative", transition: "background 0.2s", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s",
      }} />
    </button>
  );
}

// ─── Fancy Slider ──────────────────────────────────────────────────────────────
function FairnessSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = ((value - 1) / 9) * 100;

  function handlePointer(e: React.PointerEvent) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const raw = ((e.clientX - rect.left) / rect.width) * 9 + 1;
    onChange(Math.max(1, Math.min(10, Math.round(raw))));
  }

  const getLabel = (v: number) => v <= 3 ? "Strict" : v <= 7 ? "Balanced" : "Lenient";
  const getColor = (v: number) => v <= 3 ? C.green : v <= 7 ? C.indigo : C.coral;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted,
          textTransform: "uppercase", letterSpacing: "0.07em" }}>Fairness Tolerance</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: C.indigoMid, color: C.indigo, borderRadius: 8, padding: "3px 10px",
            fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800 }}>{value}</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
            color: getColor(value) }}>{getLabel(value)}</span>
        </div>
      </div>
      {/* Track */}
      <div ref={trackRef} onPointerDown={handlePointer} onPointerMove={e => { if (e.buttons) handlePointer(e); }}
        style={{ height: 8, borderRadius: 50, background: C.inputBg, position: "relative", cursor: "pointer" }}>
        {/* Fill */}
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 50,
          width: `${pct}%`, background: `linear-gradient(90deg, ${C.green}, ${C.indigo} 55%, ${C.coral})`,
          transition: "width 0.1s" }} />
        {/* Thumb */}
        <div style={{ position: "absolute", top: "50%", left: `${pct}%`,
          transform: "translate(-50%, -50%)", width: 20, height: 20, borderRadius: "50%",
          background: C.white, border: `3px solid ${C.indigo}`,
          boxShadow: "0 2px 8px rgba(91,61,246,0.35)", transition: "left 0.1s", zIndex: 2 }} />
      </div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {["1","2","3","4","5","6","7","8","9","10"].map((n, i) => (
          <span key={n} style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600,
            color: Number(n) === value ? C.indigo : C.muted, lineHeight: 1,
            cursor: "pointer", transition: "color 0.15s" }}
            onClick={() => onChange(Number(n))}>
            {n}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {[{l:"Strict",c:C.green},{l:"Balanced",c:C.indigo},{l:"Lenient",c:C.coral}].map(item => (
          <span key={item.l} style={{ fontFamily: "Manrope, sans-serif", fontSize: 10,
            fontWeight: 700, color: item.c, opacity: 0.7 }}>{item.l}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange, width }:
  { value: string; options: string[]; onChange: (v: string) => void; width?: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <button type="button" onClick={() => setOpen(v => !v)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
        background: C.white, border: `1.5px solid ${open ? C.indigo : C.border}`, borderRadius: 11,
        padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600,
        color: C.navy, cursor: "pointer", whiteSpace: "nowrap",
      }}>
        {value}
        <ChevronDown size={13} color={C.muted}
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, width: "100%", minWidth: 200,
          background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 13,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 120, padding: "5px", maxHeight: 240, overflowY: "auto" }}>
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }} style={{
              width: "100%", background: opt === value ? C.indigoLight : "transparent", border: "none",
              borderRadius: 8, padding: "8px 11px", fontFamily: "Manrope, sans-serif", fontSize: 13,
              fontWeight: opt === value ? 700 : 500, color: opt === value ? C.indigo : C.navy,
              cursor: "pointer", textAlign: "left",
            }}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Fairness Score Ring ────────────────────────────────────────────────────────
function FairnessRing({ score, verdict }: { score: number; verdict: "balanced"|"review"|"unbalanced" }) {
  const r = 52, circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = verdict === "balanced" ? C.green : verdict === "review" ? C.yellow : C.coral;
  const bgColor = verdict === "balanced" ? C.greenLight : verdict === "review" ? C.yellowLight : C.coralLight;
  const label = verdict === "balanced" ? "Balanced" : verdict === "review" ? "Needs Review" : "Unbalanced";
  const Icon = verdict === "balanced" ? Shield : AlertTriangle;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {/* Ring */}
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx="70" cy="70" r={r} fill="none" stroke={C.inputBg} strokeWidth="10" />
          {/* Fill */}
          <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={`${fill} ${circ}`}
            style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
        </svg>
        {/* Center content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 2 }}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 34, fontWeight: 700,
            color: C.navy, lineHeight: 1 }}>{score}</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700,
            color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>/ 100</span>
        </div>
      </div>
      {/* Verdict badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7,
        background: bgColor, border: `2px solid ${color}`, borderRadius: 20,
        padding: "7px 16px" }}>
        <Icon size={14} color={color} strokeWidth={2.5} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color,
          letterSpacing: "0.02em" }}>{label}</span>
      </div>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted, margin: 0,
        textAlign: "center", maxWidth: 140, lineHeight: 1.55 }}>
        {verdict === "balanced"
          ? "Team performance distribution looks fair and even."
          : verdict === "review"
          ? "Minor imbalance detected. Consider reshuffling."
          : "Significant gap between teams. Reshuffle recommended."}
      </p>
    </div>
  );
}

// ─── Custom tooltip for bar chart ──────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const t = payload[0];
  return (
    <div style={{ background: C.navy, borderRadius: 12, padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
        color: "#fff", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700,
        color: t.fill, margin: 0, lineHeight: 1 }}>{t.value}%</p>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)",
        margin: "2px 0 0" }}>avg. score</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function Matchmaking() {
  const [adaptive, setAdaptive] = useState(true);
  const [teamSize, setTeamSize] = useState(3);
  const [tolerance, setTolerance] = useState(5);
  const [previewed, setPreviewed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [section, setSection] = useState(SECTIONS[0]);
  const [quizSession, setQuizSession] = useState(SESSIONS[1]);
  const [shuffleKey, setShuffleKey] = useState(0);

  const students: Student[] = assignTeams(BASE_STUDENTS, teamSize, adaptive);
  const numTeams = Math.ceil(BASE_STUDENTS.length / teamSize);
  const teamStats = computeTeamStats(students, numTeams);
  const { score, label: fsLabel, verdict } = fairnessScore(teamStats);
  const mean = teamStats.reduce((a, t) => a + t.avg, 0) / (teamStats.length || 1);

  function handleReshuffle() {
    setShuffleKey(k => k + 1);
    setConfirmed(false);
  }

  function handleConfirm() {
    setConfirming(true);
    setTimeout(() => { setConfirming(false); setConfirmed(true); }, 1400);
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "0 28px",
          height: 62, display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(91,61,246,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={17} color={C.indigo} strokeWidth={2} />
            </div>
            <div>
              <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800,
                color: C.navy, margin: 0, lineHeight: 1.2 }}>Matchmaking</h1>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600,
                color: C.muted, margin: 0 }}>Adaptive team balancing for fair quiz battles</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {confirmed && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                background: C.greenLight, border: `1.5px solid ${C.greenBorder}`,
                borderRadius: 20, padding: "6px 14px" }}>
                <CheckCircle2 size={13} color="#18A058" strokeWidth={2.5} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                  fontWeight: 700, color: "#18A058" }}>Teams Confirmed</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 5,
              background: C.indigoLight, border: `1.5px solid ${C.indigoBorder}`,
              borderRadius: 20, padding: "5px 12px" }}>
              <Users size={12} color={C.indigo} strokeWidth={2} />
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                fontWeight: 700, color: C.indigo }}>{BASE_STUDENTS.length} Students</span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px",
          display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── SECTION 1: MATCHMAKING CONFIGURATION ── */}
          <div style={{ background: C.white, borderRadius: 22, border: `1.5px solid ${C.border}`,
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Section header */}
            <div style={{ padding: "18px 24px 14px", borderBottom: `1.5px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: C.indigoLight,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={15} color={C.indigo} strokeWidth={2} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, fontWeight: 800,
                    color: C.navy, margin: 0 }}>Matchmaking Configuration</h2>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted,
                    margin: 0, fontWeight: 500 }}>Set how teams are formed for the selected quiz session</p>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Config controls row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

                {/* Adaptive toggle */}
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px",
                  border: `1.5px solid ${adaptive ? C.indigoBorder : C.border}`,
                  display: "flex", flexDirection: "column", gap: 10,
                  transition: "border-color 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                      color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      Adaptive Randomization
                    </span>
                    <ToggleSwitch on={adaptive} onChange={v => { setAdaptive(v); setConfirmed(false); }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9,
                      background: adaptive ? C.indigoMid : C.inputBg, display: "flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                      transition: "background 0.2s" }}>
                      <Sparkles size={14} color={adaptive ? C.indigo : C.muted} strokeWidth={2} />
                    </div>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500,
                      color: adaptive ? C.navy : C.muted, margin: 0, lineHeight: 1.55,
                      transition: "color 0.2s" }}>
                      {adaptive
                        ? "AI balances teams by distributing High, Medium, and Low performers evenly."
                        : "Teams are assigned sequentially without performance consideration."}
                    </p>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
                    background: adaptive ? C.greenLight : C.redLight,
                    borderRadius: 20, padding: "4px 10px", alignSelf: "flex-start",
                    transition: "background 0.2s" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%",
                      background: adaptive ? "#2ED47A" : "#FF4757" }} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
                      color: adaptive ? "#18A058" : C.red }}>
                      {adaptive ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>

                {/* Team size */}
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px",
                  border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                    color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Team Size
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 0,
                    background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12,
                    overflow: "hidden", width: "fit-content" }}>
                    <button type="button"
                      onClick={() => { setTeamSize(v => Math.max(2, v - 1)); setConfirmed(false); }}
                      style={{ width: 38, height: 38, background: "none", border: "none",
                        borderRight: `1.5px solid ${C.border}`, cursor: "pointer",
                        fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700,
                        color: teamSize <= 2 ? C.muted : C.navy }}>−</button>
                    <span style={{ width: 52, textAlign: "center", fontFamily: "Fredoka, sans-serif",
                      fontSize: 26, fontWeight: 700, color: C.indigo, lineHeight: 1 }}>{teamSize}</span>
                    <button type="button"
                      onClick={() => { setTeamSize(v => Math.min(8, v + 1)); setConfirmed(false); }}
                      style={{ width: 38, height: 38, background: "none", border: "none",
                        borderLeft: `1.5px solid ${C.border}`, cursor: "pointer",
                        fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 700,
                        color: teamSize >= 8 ? C.muted : C.navy }}>+</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {[
                      { label: "Teams formed", val: Math.ceil(BASE_STUDENTS.length / teamSize) },
                      { label: "Students/team", val: `~${teamSize}` },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between",
                        alignItems: "center" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                          fontWeight: 500, color: C.muted }}>{item.label}</span>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                          fontWeight: 800, color: C.navy }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Session selector */}
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px",
                  border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                    color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Session
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11,
                        fontWeight: 600, color: C.muted }}>Section</span>
                      <Dropdown value={section} options={SECTIONS}
                        onChange={v => { setSection(v); setConfirmed(false); }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11,
                        fontWeight: 600, color: C.muted }}>Quiz Session</span>
                      <Dropdown value={quizSession} options={SESSIONS}
                        onChange={v => { setQuizSession(v); setConfirmed(false); }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fairness tolerance slider */}
              <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 20px",
                border: `1.5px solid ${C.border}` }}>
                <FairnessSlider value={tolerance}
                  onChange={v => { setTolerance(v); setConfirmed(false); }} />
              </div>

              {/* Preview button */}
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => { setPreviewed(true); setConfirmed(false); }} style={{
                  background: C.coral, border: "none", borderRadius: 13, padding: "11px 22px",
                  fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  boxShadow: "0 4px 14px rgba(255,107,74,0.3)",
                }}>
                  <Users size={16} strokeWidth={2.5} />Preview Team Assignments
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => { setPreviewed(true); handleReshuffle(); }} style={{
                  background: "transparent", border: `2px solid ${C.border}`, borderRadius: 13,
                  padding: "11px 18px", fontFamily: "Manrope, sans-serif", fontSize: 14,
                  fontWeight: 700, color: C.navy, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                  <Shuffle size={15} strokeWidth={2.5} />Reshuffle
                </button>
              </div>
            </div>

            {/* ── Preview Table ── */}
            {previewed && (
              <div style={{ borderTop: `1.5px solid ${C.border}`, padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 800,
                      color: C.navy, margin: 0 }}>Team Preview</h3>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
                      color: C.muted, background: C.inputBg, borderRadius: 20, padding: "2px 9px" }}>
                      {numTeams} teams · {BASE_STUDENTS.length} students
                    </span>
                    {adaptive && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
                        background: C.indigoLight, border: `1.5px solid ${C.indigoBorder}`,
                        borderRadius: 20, padding: "2px 9px",
                        fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.indigo }}>
                        <Sparkles size={10} strokeWidth={2.5} />Adaptive
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={() => { handleReshuffle(); }} style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 9,
                      padding: "7px 14px", fontFamily: "Manrope, sans-serif", fontSize: 12,
                      fontWeight: 700, color: C.navy, cursor: "pointer",
                    }}>
                      <RefreshCw size={13} strokeWidth={2.5} />Reshuffle Teams
                    </button>
                    <button type="button" onClick={handleConfirm} disabled={confirming || confirmed} style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: confirmed ? C.greenLight : C.coral,
                      border: `none`, borderRadius: 9,
                      padding: "7px 16px", fontFamily: "Manrope, sans-serif", fontSize: 12,
                      fontWeight: 700, color: confirmed ? "#18A058" : "#fff", cursor: "pointer",
                      boxShadow: confirmed ? "none" : "0 3px 10px rgba(255,107,74,0.28)",
                    }}>
                      {confirmed
                        ? <><CheckCircle2 size={13} strokeWidth={2.5} />Confirmed!</>
                        : confirming
                        ? "Confirming…"
                        : <><CheckCircle2 size={13} strokeWidth={2.5} />Confirm Teams</>}
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div style={{ borderRadius: 14, border: `1.5px solid ${C.border}`, overflow: "hidden" }}>
                  {/* Header */}
                  <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 160px 140px 120px",
                    padding: "9px 16px", background: "#F5F5FA",
                    borderBottom: `1.5px solid ${C.border}`, gap: 8 }}>
                    {["#", "Student", "Team", "Performance", "Score"].map((h, i) => (
                      <span key={h} style={{ fontFamily: "Manrope, sans-serif", fontSize: 11,
                        fontWeight: 700, color: C.muted, textTransform: "uppercase",
                        letterSpacing: "0.07em", textAlign: i === 4 ? "right" : "left" }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  {/* Rows */}
                  {students.map((s, i) => {
                    const team = TEAM_PALETTE[s.team] ?? TEAM_PALETTE[0];
                    const perf = PERF_STYLE[s.perfLevel];
                    return (
                      <div key={`${shuffleKey}-${s.id}`}
                        style={{ display: "grid", gridTemplateColumns: "40px 1fr 160px 140px 120px",
                          padding: "10px 16px", gap: 8, alignItems: "center",
                          background: i % 2 === 0 ? C.white : "#FAFAFC",
                          borderBottom: i < students.length - 1 ? `1px solid ${C.border}` : "none",
                        }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                          fontWeight: 600, color: C.muted }}>{i + 1}</span>

                        {/* Student */}
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%",
                            background: s.avatarColor, display: "flex", alignItems: "center",
                            justifyContent: "center", fontFamily: "Manrope, sans-serif",
                            fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                            {s.initials}
                          </div>
                          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13,
                            fontWeight: 600, color: C.navy }}>{s.name}</span>
                        </div>

                        {/* Team badge */}
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
                          background: team.light, border: `1.5px solid ${team.bg}22`,
                          borderRadius: 20, padding: "4px 10px",
                          fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                          color: team.text, width: "fit-content" }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%",
                            background: team.bg, flexShrink: 0 }} />
                          {team.label}
                        </span>

                        {/* Performance chip */}
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5,
                          background: perf.bg, border: `1.5px solid ${perf.border}`,
                          borderRadius: 7, padding: "3px 9px",
                          fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
                          color: perf.text, width: "fit-content" }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%",
                            background: perf.dot }} />
                          {s.perfLevel}
                        </span>

                        {/* Score */}
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800,
                          color: C.navy, textAlign: "right" }}>{s.score}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── SECTION 2: FAIRNESS REPORT ── */}
          <div style={{ background: C.white, borderRadius: 22, border: `1.5px solid ${C.border}`,
            boxShadow: "0 2px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Section header */}
            <div style={{ padding: "18px 24px 14px", borderBottom: `1.5px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: C.greenLight,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={15} color="#18A058" strokeWidth={2} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, fontWeight: 800,
                    color: C.navy, margin: 0 }}>Fairness Report</h2>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted,
                    margin: 0, fontWeight: 500 }}>Team balance analysis based on current assignments</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Dropdown value={section} options={SECTIONS}
                  onChange={v => setSection(v)} width={150} />
                <Dropdown value={quizSession} options={SESSIONS}
                  onChange={v => setQuizSession(v)} width={220} />
                <button type="button" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 11,
                  padding: "8px 14px", fontFamily: "Manrope, sans-serif", fontSize: 13,
                  fontWeight: 700, color: C.navy, cursor: "pointer",
                }}>
                  <Download size={14} strokeWidth={2} />Export Report
                </button>
              </div>
            </div>

            <div style={{ padding: "24px", display: "flex", gap: 24, alignItems: "flex-start" }}>

              {/* Left: Fairness ring + stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center",
                minWidth: 180 }}>
                <FairnessRing score={score} verdict={verdict} />

                {/* Quick stats */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { icon: <Users size={13} color={C.indigo} strokeWidth={2} />,    label: "Teams",      val: numTeams },
                    { icon: <TrendingUp size={13} color="#18A058" strokeWidth={2} />, label: "Mean Avg",   val: `${Math.round(mean)}%` },
                    { icon: <Clock size={13} color="#9A6C00" strokeWidth={2} />,      label: "Session",    val: "Active" },
                  ].map(s => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center",
                      justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {s.icon}
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                          fontWeight: 500, color: C.muted }}>{s.label}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                        fontWeight: 800, color: C.navy }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: C.border, alignSelf: "stretch" }} />

              {/* Right: Bar chart */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800,
                    color: C.navy }}>Team Average Performance</span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600,
                    color: C.muted }}>Class mean: {Math.round(mean)}%</span>
                </div>

                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamStats} barCategoryGap="30%" barGap={4}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                      <CartesianGrid key="grid" vertical={false} stroke={C.border} strokeDasharray="3 3" />
                      <XAxis key="x" dataKey="name" tick={{ fontFamily: "Manrope, sans-serif", fontSize: 11,
                        fontWeight: 700, fill: C.muted }}
                        axisLine={false} tickLine={false} />
                      <YAxis key="y" domain={[0, 100]} tick={{ fontFamily: "Manrope, sans-serif",
                        fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false}
                        tickFormatter={(v: number) => `${v}%`} />
                      <Tooltip key="tooltip" content={<CustomTooltip />} cursor={{ fill: "rgba(91,61,246,0.04)" }} />
                      <ReferenceLine key="ref" y={mean} stroke={C.indigo} strokeDasharray="5 3"
                        strokeWidth={1.5} label={{ value: "Mean", position: "right",
                          fill: C.indigo, fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700 }} />
                      <Bar key="bar" dataKey="avg" radius={[8, 8, 0, 0]} maxBarSize={56}>
                        {teamStats.map((entry, i) => (
                          <Cell key={`cell-${i}`}
                            fill={TEAM_PALETTE[entry.team]?.bg ?? C.indigo}
                            fillOpacity={0.85} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Team summary chips */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {teamStats.map(ts => {
                    const team = TEAM_PALETTE[ts.team];
                    const delta = ts.avg - Math.round(mean);
                    return (
                      <div key={ts.team} style={{ display: "flex", alignItems: "center", gap: 6,
                        background: team.light, borderRadius: 10, padding: "7px 12px",
                        border: `1.5px solid ${team.bg}33` }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%",
                          background: team.bg, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12,
                            fontWeight: 800, color: team.text, margin: 0, lineHeight: 1 }}>
                            {ts.name}
                          </p>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10,
                            fontWeight: 600, color: C.muted, margin: "2px 0 0" }}>
                            {ts.avg}% avg
                            <span style={{ color: delta >= 0 ? "#18A058" : C.red, fontWeight: 700,
                              marginLeft: 4 }}>
                              ({delta >= 0 ? "+" : ""}{delta})
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Insight row */}
                <div style={{ background: verdict === "balanced" ? C.greenLight : C.yellowLight,
                  borderRadius: 12, padding: "11px 14px",
                  border: `1.5px solid ${verdict === "balanced" ? C.greenBorder : C.yellowBorder}`,
                  display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <Info size={14} color={verdict === "balanced" ? "#18A058" : "#9A6C00"}
                    strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600,
                    color: verdict === "balanced" ? "#18A058" : "#9A6C00", margin: 0, lineHeight: 1.55 }}>
                    {verdict === "balanced"
                      ? `Team performance spread is within tolerance. Maximum gap between teams is ${Math.max(...teamStats.map(t=>t.avg)) - Math.min(...teamStats.map(t=>t.avg))} points — well within the configured threshold.`
                      : `Some teams show higher-than-ideal performance gaps. Consider lowering fairness tolerance or enabling Adaptive Randomization to redistribute students.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
