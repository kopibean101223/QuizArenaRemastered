'use client';

import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Trophy, LayoutDashboard, Library, BarChart2, Settings,
  Layers, LogOut, Sparkles, Users, Shuffle, CheckCircle2,
  Download, ChevronDown, Info, AlertTriangle, Zap,
  ArrowRight, RefreshCw, Shield, TrendingUp, Clock, Copy, Check, Crown, User, Star, Database, Lock, Eye
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { CountdownDisplay } from "../studentONLY/ComponentsLobby/CountdownDisplay";
import {
  getQuestionDistributionMode,
  buildUniformQuestionSet,
  buildDistributionQuestionSet,
} from '@/lib/battle/questionDistribution';

const C = {
  indigo: "#5B3DF6", indigoLight: "rgba(91,61,246,0.07)", indigoMid: "rgba(91,61,246,0.14)",
  indigoBorder: "rgba(91,61,246,0.18)", indigoTrack: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",  coralLight: "rgba(255,107,74,0.09)", coralHover: "#E85A3A",
  yellow: "#FFC93C", yellowLight: "rgba(255,201,60,0.13)", yellowBorder: "rgba(255,201,60,0.35)",
  green: "#2ED47A",  greenLight: "rgba(46,212,122,0.1)",  greenBorder: "rgba(46,212,122,0.28)",
  red: "#FF4757",    redLight: "rgba(255,71,87,0.09)",
  navy: "#1B1E2B", offWhite: "#FAFAFC", white: "#FFFFFF",
  muted: "#717182", border: "rgba(0,0,0,0.07)", inputBg: "#F3F3F7",
  indigoDeep: "#4228D4", yellowGlow: "rgba(255,201,60,0.5)",
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

interface Student {
  id: string; name: string; initials: string;
  perfLevel: "High" | "Medium" | "Low"; score: number; team: number;
  avatarColor: string; isReady?: boolean; isHost?: boolean;
}

interface QuestionItem {
  id: number | string;
  text: string;
  topic?: string;
  choices?: string[];
  answer: string;
  type?: string;
}

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#FFC93C","#2ED47A","#FF4757","#5BC8F6","#B06EF6","#FF9F40","#E040FB","#00BCD4"];
const CAPACITY = 12;

const MODES = [
  { id: "individual", label: "Individual", emoji: "⚡", desc: "Go solo and climb the leaderboard on your own skills." },
  { id: "team", label: "Team Battle", emoji: "🛡️", desc: "Join forces! Balanced teams compete for collective glory." },
  { id: "royale", label: "Battle Royale", emoji: "👑", desc: "One question eliminates the weakest. Pure survival mode." },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function assignTeams(students: Omit<Student,"team">[], teamSize: number, adaptive: boolean): Student[] {
  if (!students || students.length === 0) return [];
  if (!adaptive) {
    return students.map((s, i) => ({ ...s, team: i % Math.ceil(students.length / teamSize) }));
  }
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

function ToggleSwitch({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button type="button" disabled={disabled} onClick={() => !disabled && onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 50, border: "none", cursor: disabled ? "not-allowed" : "pointer", padding: 0,
      background: on ? C.indigo : "#CBD0D8", position: "relative", opacity: disabled ? 0.6 : 1, transition: "background 0.2s", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s",
      }} />
    </button>
  );
}

function FairnessSlider({ value, onChange, disabled }: { value: number; onChange: (v: number) => void; disabled?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = ((value - 1) / 9) * 100;

  function handlePointer(e: React.PointerEvent) {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const raw = ((e.clientX - rect.left) / rect.width) * 9 + 1;
    onChange(Math.max(1, Math.min(10, Math.round(raw))));
  }

  const getLabel = (v: number) => v <= 3 ? "Strict" : v <= 7 ? "Balanced" : "Lenient";
  const getColor = (v: number) => v <= 3 ? C.green : v <= 7 ? C.indigo : C.coral;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Fairness Tolerance</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: C.indigoMid, color: C.indigo, borderRadius: 8, padding: "3px 10px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800 }}>{value}</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: getColor(value) }}>{getLabel(value)}</span>
        </div>
      </div>
      <div ref={trackRef} onPointerDown={handlePointer} onPointerMove={e => { if (e.buttons) handlePointer(e); }}
        style={{ height: 8, borderRadius: 50, background: C.inputBg, position: "relative", cursor: "pointer" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 50, width: `${pct}%`, background: `linear-gradient(90deg, ${C.green}, ${C.indigo} 55%, ${C.coral})`, transition: "width 0.1s" }} />
        <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)", width: 20, height: 20, borderRadius: "50%", background: C.white, border: `3px solid ${C.indigo}`, boxShadow: "0 2px 8px rgba(91,61,246,0.35)", transition: "left 0.1s", zIndex: 2 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {["1","2","3","4","5","6","7","8","9","10"].map((n) => (
          <span key={n} style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: Number(n) === value ? C.indigo : C.muted, lineHeight: 1, cursor: "pointer" }} onClick={() => onChange(Number(n))}>{n}</span>
        ))}
      </div>
    </div>
  );
}

function Dropdown({ value, options, onChange, width, disabled }:
  { value: { id: string; name: string }; options: { id: string; name: string }[]; onChange: (v: { id: string; name: string }) => void; width?: number | string; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} style={{ position: "relative", width, opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      <button type="button" disabled={disabled} onClick={() => setOpen(v => !v)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6,
        background: C.white, border: `1.5px solid ${open ? C.indigo : C.border}`, borderRadius: 11,
        padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600,
        color: C.navy, cursor: disabled ? "not-allowed" : "pointer", whiteSpace: "nowrap",
      }}>
        {value?.name || "Select..."}
        <ChevronDown size={13} color={C.muted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, width: "100%", minWidth: 200, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 13, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 120, padding: "5px", maxHeight: 240, overflowY: "auto" }}>
          {options.map(opt => (
            <button key={opt.id} type="button" onClick={() => { onChange(opt); setOpen(false); }} style={{
              width: "100%", background: opt.id === value?.id ? C.indigoLight : "transparent", border: "none",
              borderRadius: 8, padding: "8px 11px", fontFamily: "Manrope, sans-serif", fontSize: 13,
              fontWeight: opt.id === value?.id ? 700 : 500, color: opt.id === value?.id ? C.indigo : C.navy,
              cursor: "pointer", textAlign: "left",
            }}>{opt.name}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function FairnessRing({ score, verdict }: { score: number; verdict: "balanced"|"review"|"unbalanced" }) {
  const r = 52, circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = verdict === "balanced" ? C.green : verdict === "review" ? C.yellow : C.coral;
  const bgColor = verdict === "balanced" ? C.greenLight : verdict === "review" ? C.yellowLight : C.coralLight;
  const label = verdict === "balanced" ? "Balanced" : verdict === "review" ? "Needs Review" : "Unbalanced";
  const Icon = verdict === "balanced" ? Shield : AlertTriangle;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="70" cy="70" r={r} fill="none" stroke={C.inputBg} strokeWidth="10" />
          <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${fill} ${circ}`} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 34, fontWeight: 700, color: C.navy, lineHeight: 1 }}>{score}</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>/ 100</span>
        </div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: bgColor, border: `2px solid ${color}`, borderRadius: 20, padding: "7px 16px" }}>
        <Icon size={14} color={color} strokeWidth={2.5} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color }}>{label}</span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const t = payload[0];
  return (
    <div style={{ background: C.navy, borderRadius: 12, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: t.fill, margin: 0 }}>{t.value}%</p>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export function Matchmaking({ professorId }: { professorId?: string }) {
  const supabase = createBrowserSupabaseClient();
  const [sectionsList, setSectionsList] = useState<{ id: string; name: string }[]>([]);
  const [selectedSection, setSelectedSection] = useState<{ id: string; name: string }>({ id: '', name: 'Loading...' });
  const [rawStudents, setRawStudents] = useState<Omit<Student, "team">[]>([]);
  const [activeSessionId, setActiveSessionId] = useState("");

  
  const [questionBanks, setQuestionBanks] = useState<{ id: string; name: string }[]>([]);
  const [selectedBank, setSelectedBank] = useState<{ id: string; name: string }>({ id: '', name: 'Select Question Bank...' });

  const [isLive, setIsLive] = useState(true);
  const [deadline, setDeadline] = useState('');
  const [adaptive, setAdaptive] = useState(true);
  const questionMode = getQuestionDistributionMode(adaptive);
  const [teamSize, setTeamSize] = useState(3);
  const [tolerance, setTolerance] = useState(5);
  const [previewed, setPreviewed] = useState(false);
  
  const [inLobby, setInLobby] = useState(false);
  const [activeSessionExists, setActiveSessionExists] = useState(false);
  const [roomCode, setRoomCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [selectedMode, setSelectedMode] = useState("team");
  const [lobbyPlayers, setLobbyPlayers] = useState<Student[]>([]);
  const [copied, setCopied] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [liveFeed, setLiveFeed] = useState<any[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalLeaderboard, setFinalLeaderboard] = useState<any[]>([]);

  // Randomized Question State for Active Session
  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Check Supabase on mount if an active live session already exists
  useEffect(() => {
    const checkActiveSession = async () => {
      const { data } = await supabase
        .from('quiz_sessions')
        .select('id, section_id, status, is_live')
        .eq('status', 'ACTIVE')
        .eq('is_live', true)
        .limit(1);

      if (data && data.length > 0) {
        setActiveSessionExists(true);
        setActiveSessionId(data[0].id);
        setInLobby(true);
      }
    };
    checkActiveSession();
  }, [supabase]);

  // Network Shield & History Trap
  useEffect(() => {
    if (!inLobby || !activeSessionId) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (inLobby) {
        e.preventDefault();
        e.returnValue = "Live WebSocket session is active. Session locked until quiz is ended!";
        return e.returnValue;
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (inLobby) {
        window.history.pushState(null, "", window.location.href);
        toast.error("Action blocked! End the active session before navigating away.");
      }
    };

    if (inLobby) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [inLobby, activeSessionId, randomizedQuestions.length]);

  // Load Sections and Question Banks from API
  useEffect(() => {
    const fetchSectionsAndBanks = async () => {
      let query = supabase.from('sections').select('id, name');
      if (professorId) query = query.eq('professor_id', professorId);
      const { data: secData } = await query;
      if (secData && secData.length > 0) {
        setSectionsList(secData);
        setSelectedSection(secData[0]);
      } else {
        setSectionsList([{ id: 'none', name: 'No Sections Found' }]);
        setSelectedSection({ id: 'none', name: 'No Sections Found' });
      }

      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const qData = await res.json();
          if (qData && qData.length > 0) {
            const uniqueTopics = Array.from(new Set(qData.map((q: any) => q.topic).filter(Boolean)));
            const banks = uniqueTopics.map((topicName, idx) => ({ id: `bank-${idx}`, name: String(topicName) }));
            setQuestionBanks(banks);
            if (banks.length > 0) setSelectedBank(banks[0]);
          } else {
            setQuestionBanks([{ id: 'default', name: 'Default Question Bank' }]);
            setSelectedBank({ id: 'default', name: 'Default Question Bank' });
          }
        }
      } catch (err) {
        console.error("Failed to load question banks from API:", err);
      }
    };
    fetchSectionsAndBanks();
  }, [professorId, supabase]);

  // Fetch Questions for the chosen Bank and randomize them upon lobby start
  useEffect(() => {
    async function loadAndRandomizeQuestions() {
      try {
        const res = await fetch('/api/questions');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((q: any) => {
              let parsedChoices: string[] = [];
              try {
                let rawChoices = q.choices;
                if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
                if (Array.isArray(rawChoices)) {
                  parsedChoices = rawChoices.map((c: any) => {
                    if (typeof c === 'string') return c;
                    if (typeof c === 'object' && c !== null) return c.text || c.label || String(c);
                    return String(c);
                  });
                }
              } catch (e) {
                parsedChoices = [];
              }
              return { ...q, choices: parsedChoices };
            });

            // Filter strictly by chosen bank/topic
            const filtered = selectedBank.name && selectedBank.name !== 'Select Question Bank...'
              ? formatted.filter((q: QuestionItem) => q.topic?.toLowerCase() === selectedBank.name.toLowerCase() || selectedBank.name.includes(q.topic || ''))
              : formatted;

            const targetQuestions = filtered.length > 0 ? filtered : formatted;
            const distributionSet = buildDistributionQuestionSet(targetQuestions, adaptive, true);
            const fullyRandomized = distributionSet.map((q: QuestionItem) => ({
              ...q,
              choices: q.choices && q.choices.length > 0 ? shuffleArray(q.choices) : []
            }));

            setRandomizedQuestions(fullyRandomized);
          }
        }
      } catch (err) {
        console.error("Error loading randomized questions for session:", err);
      }
    }
    if (inLobby) {
      loadAndRandomizeQuestions();
    }
  }, [inLobby, selectedBank]);

  useEffect(() => {
    if (!selectedSection.id || selectedSection.id === 'none') return;
    const fetchStudents = async () => {
      const { data } = await supabase
        .from('section_students')
        .select(`profiles:student_id (user_id, username)`)
        .eq('section_id', selectedSection.id);

      if (data) {
        const mapped = data.map((item: any, idx: number) => {
          const profile = item.profiles;
          const score = Math.floor(Math.random() * 50) + 50; 
          const perfLevel = score >= 85 ? "High" : score >= 65 ? "Medium" : "Low";
          const initials = profile?.username ? profile.username.substring(0, 2).toUpperCase() : `S${idx}`;

          return {
            id: profile?.user_id || `s-${idx}`,
            name: profile?.username || `Student ${idx + 1}`,
            initials,
            perfLevel: perfLevel as "High" | "Medium" | "Low",
            score,
            avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
            isReady: true,
            isHost: idx === 0
          };
        });
        setRawStudents(mapped);
      }
    };
    fetchStudents();
  }, [selectedSection, supabase]);

  const students: Student[] = assignTeams(rawStudents, teamSize, adaptive);
  const numTeams = Math.ceil((rawStudents.length || 1) / teamSize);
  const teamStats = computeTeamStats(students, numTeams);
  const { score, verdict } = fairnessScore(teamStats);
  const mean = teamStats.reduce((a, t) => a + t.avg, 0) / (teamStats.length || 1);

  // WebSocket Connection Handler for Synchronized Multiplayer State
  useEffect(() => {
    if (!inLobby || !activeSessionId) return;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'JOIN_BATTLE',
        battleId: activeSessionId,
        totalQuestions: randomizedQuestions.length || 10,
        timeLimit: 60,
        sender: 'Professor',
        role: 'host'
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'ROOM_STATE_SYNC' || data.type === 'QUESTION_ADVANCED') {
          if (typeof data.currentIndex === 'number') {
            setCurrentIndex(data.currentIndex);
          }
          if (data.status === 'completed') {
            setQuizCompleted(true);
            setFinalLeaderboard(data.leaderboard || []);
          } else if (data.status === 'active') {
            setBattleStarted(true);
          }
          if (data.history) setLiveFeed(data.history);
          if (data.questions && data.questions.length > 0) {
            setRandomizedQuestions(data.questions);
          }
          
          if (data.startedAt && data.timeLimit) {
            const limit = Number(data.timeLimit) || 60;
            const activeStart = Number(data.startedAt) || Date.now();
            setStartedAt(activeStart);
            setTimeLimit(limit);
            const now = Date.now();
            const elapsed = Math.floor((now - activeStart) / 1000);
            const remaining = Math.max(0, limit - elapsed);
            setTimeRemaining(remaining);
          }
        } else if (data.type === 'BATTLE_ACTION') {
          setLiveFeed(prev => [data, ...prev]);
          if (data.userId && data.scoreIncrement) {
            setLobbyPlayers(prev => prev.map(p => p.id === data.userId ? { ...p, score: p.score + data.scoreIncrement } : p));
          }
        } else if (data.type === 'QUIZ_COMPLETED' || data.type === 'ROOM_COMPLETED') {
          setQuizCompleted(true);
          setFinalLeaderboard(data.leaderboard || []);
        }
      } catch (err) {
        console.error("WS message parse error:", err);
      }
    };

    return () => ws.close();
  }, [inLobby, selectedSection.id, randomizedQuestions.length]);

  const currentIndexRef = useRef(currentIndex);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);

  const totalQCountRef = useRef(randomizedQuestions.length || 1);
  useEffect(() => { totalQCountRef.current = randomizedQuestions.length || 1; }, [randomizedQuestions]);

  const isAdvancingRef = useRef(isAdvancing);
  useEffect(() => { isAdvancingRef.current = isAdvancing; }, [isAdvancing]);

  useEffect(() => {
    if (!battleStarted || quizCompleted) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        clearInterval(timer);
        if (isAdvancingRef.current) return;
        setIsAdvancing(true);

        setTimeout(() => {
          const currentIdx = currentIndexRef.current;
          const total = totalQCountRef.current;
          const nextIdx = currentIdx + 1;
          
          if (nextIdx < total) {
            setCurrentIndex(nextIdx);
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                type: 'ADVANCE_QUESTION',
                battleId: activeSessionId,
                currentIndex: nextIdx,
                nextTimeLimit: 60,
                isLastQuestion: false
              }));
            }
            setTimeRemaining(60);
            setTimeLimit(60);
            setStartedAt(Date.now());
            setTimeout(() => setIsAdvancing(false), 500);
          } else {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify({
                type: 'ADVANCE_QUESTION',
                battleId: activeSessionId,
                currentIndex: currentIdx,
                isLastQuestion: true
              }));
            }
            toast.success("Quiz completed!");
            setQuizCompleted(true);
            setIsAdvancing(false);
          }
        }, 1000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [battleStarted, currentIndex, quizCompleted, activeSessionId, startedAt, timeLimit]);

  async function handleConfirmAndDeploy() {
    if (activeSessionExists) {
      return toast.error("A live quiz session is currently active. You must end it before deploying a new one.");
    }
    if (!selectedSection.id || selectedSection.id === 'none') {
      return toast.error("Please select a valid section.");
    }

    // 1. Fetch the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    const currentProfId = professorId || user?.id;

    if (!currentProfId || authError) {
      return toast.error("Authentication error: Could not verify your professor identity.");
    }

    // 2. Advanced Collision-Check Algorithm
    let finalRoomCode = roomCode;
    let isCodeUnique = false;

    // Loop until we verify the code does not exist in the database
    while (!isCodeUnique) {
      const { data: existingSession } = await supabase
        .from('quiz_sessions')
        .select('id')
        .eq('room_code', finalRoomCode)
        .maybeSingle();

      if (existingSession) {
        // Collision detected! Generate a new one and try again.
        finalRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      } else {
        isCodeUnique = true;
      }
    }
    
        // Update the UI with the final guaranteed unique code
        setRoomCode(finalRoomCode); 

        // 3. Deploy the session
        const { data: newSession, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert([{
        section_id: selectedSection.id,
        professor_id: currentProfId,
        room_code: finalRoomCode,
        is_live: isLive,
        status: isLive ? 'ACTIVE' : 'PENDING',
        deadline: isLive ? null : deadline || null
      }])
      .select('id')
      .single();

    if (sessionError || !newSession) {
      toast.error("Failed to save match session to database.");
      console.error(sessionError);
      return;
    }

    setActiveSessionId(newSession.id); 

    if (isLive) {
      setActiveSessionExists(true);
      setInLobby(true);
      toast.success(`Live Match Session initialized using bank: ${selectedBank.name}! Session Locked.`);
    } else {
      toast.success("Own-pace session successfully deployed!");
    }
  }
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleStartBattle();
      setCountdown(null);
    }
  }, [countdown]);

  const handleStartBattle = () => {
    setBattleStarted(true);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_START_BATTLE',
        battleId: activeSessionId,
        bankId: selectedBank.id,
        adaptive,
        distributionMode: questionMode,
        questions: questionMode === 'uniform' ? randomizedQuestions : [],
      }));
    }
  };

  const handleNextQuestion = () => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    
    const totalQCount = randomizedQuestions.length || 1;
    const nextIdx = currentIndex + 1;

    if (nextIdx < totalQCount) {
      setCurrentIndex(nextIdx);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'ADVANCE_QUESTION',
          battleId: activeSessionId,
          currentIndex: nextIdx,
          nextTimeLimit: 60,
          isLastQuestion: false
        }));
      }
      setTimeRemaining(60);
      setTimeLimit(60);
      setStartedAt(Date.now());
      setTimeout(() => setIsAdvancing(false), 500);
    } else {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'PROF_END_BATTLE',
          battleId: activeSessionId,
        }));
      }
      toast.success("Quiz completed!");
      setQuizCompleted(true);
      setIsAdvancing(false);
    }
  };

  const handleEndSession = async (skipConfirm = false) => {
    if (skipConfirm || window.confirm("Are you sure you want to end this live quiz session? This will close the lobby and unlock configuration.")) {
       if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_END_BATTLE',
        battleId: activeSessionId,
      }));
    }
      if (wsRef.current) wsRef.current.close();
      
      await supabase
        .from('quiz_sessions')
        .update({ status: 'COMPLETED' })
        .eq('id', activeSessionId); 

      setInLobby(false);
      setActiveSessionExists(false);
      setBattleStarted(false);
      setCurrentIndex(0);
      setActiveSessionId(''); 
      setRoomCode(Math.random().toString(36).substring(2, 8).toUpperCase());
      
      toast.success("Live session ended successfully. Configuration unlocked.");
    }
  };

  const sortedRankings = [...lobbyPlayers].sort((a, b) => b.score - a.score);
  const currentActiveQuestion = randomizedQuestions[currentIndex];
  const totalQCount = randomizedQuestions.length > 0 ? randomizedQuestions.length : 1;

  // Fully Synchronized Active Session View with Inspection Card
  if (inLobby) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: C.navy, overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: 32, color: "#fff" }}>
          
          <div style={{ background: "rgba(255,71,87,0.2)", border: "1px solid rgba(255,71,87,0.4)", borderRadius: 12, padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontFamily: "Manrope, sans-serif", color: C.yellow, fontWeight: 700 }}>🔒 STRICT SESSION LOCK:Navigation is locked until session completion.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Bank: {selectedBank.name} ({randomizedQuestions.length} Questions)</span>
              <button type="button" onClick={() => handleEndSession(false)} style={{ background: C.red, border: "none", borderRadius: 8, padding: "5px 12px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                End Session & Unlock
              </button>
            </div>
          </div>



          {quizCompleted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700, color: C.green, margin: 0 }}>🎉 Quiz Completed!</h1>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Final Results for {selectedSection.name}</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "30px" }}>
                <h2 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, marginTop: 0, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <Trophy size={24} color={C.yellow} /> Final Leaderboard
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {finalLeaderboard.sort((a, b) => b.score - a.score).map((p, idx) => (
                    <div key={p.id || idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: idx === 0 ? "rgba(255,201,60,0.15)" : "rgba(255,255,255,0.06)", padding: "16px 20px", borderRadius: 16, border: idx === 0 ? `1px solid ${C.yellow}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: idx === 0 ? C.yellow : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "rgba(255,255,255,0.5)", width: 30 }}>#{idx + 1}</span>
                        <span style={{ fontWeight: 700, fontFamily: "Manrope, sans-serif", fontSize: 18 }}>{p.name || p.userId || `Player ${idx + 1}`}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                         {p.correctAnswers !== undefined && <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{p.correctAnswers} / {p.totalQuestions || totalQCount} Correct</span>}
                         <span style={{ color: C.green, fontWeight: 800, fontFamily: "Fredoka, sans-serif", fontSize: 20 }}>{p.score || 0} pts</span>
                      </div>
                    </div>
                  ))}
                  {finalLeaderboard.length === 0 && <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}>No players participated.</p>}
                </div>
              </div>
              <button type="button" onClick={() => handleEndSession(true)} style={{ width: "100%", background: C.indigo, border: "none", borderRadius: 20, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", cursor: "pointer", marginTop: 20 }}>
                Return to Dashboard
              </button>
            </div>
          ) : !battleStarted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 12 }}>
                  <Zap size={13} fill={C.yellow} color="transparent" />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>Live Fullscreen Session Lobby</span>
                </div>
                <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700, margin: 0 }}>{selectedSection.name} - Waiting Room</h1>
              </div>

              <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px" }}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", textAlign: "center", textTransform: "uppercase", marginBottom: 10 }}>External Student Room Code</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "10px 24px" }}>
                    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 36, fontWeight: 700, color: C.yellow, letterSpacing: "0.15em" }}>{roomCode}</span>
                  </div>
                  <button type="button" onClick={() => { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ width: 48, height: 48, borderRadius: 14, background: copied ? "rgba(46,212,122,0.2)" : "rgba(255,255,255,0.08)", border: `2px solid ${copied ? C.green : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: copied ? C.green : "#fff" }}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {countdown !== null && countdown > 0 && <CountdownDisplay count={countdown} />}
              <button type="button" onClick={() => setCountdown(3)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`, border: "none", borderRadius: 20, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 8px 32px rgba(91,61,246,0.5)" }}>
                Start Live Battle Now! ⚡
              </button>
            </div>
          ) : (
            <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "20px 24px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div>
                  <p style={{ color: C.yellow, fontSize: 12, textTransform: "uppercase", fontWeight: 700, margin: 0 }}>Live Session Active · Bank: {selectedBank.name}</p>
                  <h2 style={{ color: "#fff", fontSize: 26, fontFamily: "Fredoka, sans-serif", margin: "4px 0 0" }}>Question {currentIndex + 1} of {totalQCount}</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: 14, textAlign: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block" }}>Timer</span>
                    <span style={{ fontSize: 22, fontFamily: "Fredoka, sans-serif", color: timeRemaining <= 10 ? C.coral : C.yellow }}>{timeRemaining}s</span>
                  </div>
                  <button type="button" onClick={handleNextQuestion} disabled={isAdvancing || timeRemaining <= 0} style={{ background: (isAdvancing || timeRemaining <= 0) ? C.muted : C.coral, border: "none", borderRadius: 14, padding: "12px 24px", fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", cursor: (isAdvancing || timeRemaining <= 0) ? "not-allowed" : "pointer", opacity: (isAdvancing || timeRemaining <= 0) ? 0.7 : 1 }}>
                    {currentIndex >= totalQCount - 1 ? 'Finish Quiz' : 'Next Question →'}
                  </button>
                </div>
              </div>

              {/* ACTIVE INSPECTION CARD FOR TESTING PURPOSES */}
              <div style={{ background: "rgba(91,61,246,0.15)", border: `2px solid ${C.indigo}`, borderRadius: 20, padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Eye size={18} color={C.yellow} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.yellow, textTransform: "uppercase" }}>
                    Professor Testing Panel (Synced Live Question)
                  </span>
                </div>

                {currentActiveQuestion ? (
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 16px" }}>
                      {currentActiveQuestion.text}
                    </p>

                    {currentActiveQuestion.choices && currentActiveQuestion.choices.length > 0 ? (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {currentActiveQuestion.choices.map((choice, i) => {
                          const isCorrect = choice === currentActiveQuestion.answer;
                          return (
                            <div key={i} style={{
                              background: isCorrect ? "rgba(46,212,122,0.25)" : "rgba(0,0,0,0.3)",
                              border: `1.5px solid ${isCorrect ? C.green : "rgba(255,255,255,0.1)"}`,
                              padding: "12px 16px", borderRadius: 12, fontSize: 14,
                              color: isCorrect ? C.green : "rgba(255,255,255,0.85)", fontWeight: isCorrect ? 700 : 500,
                              display: "flex", alignItems: "center", justifyContent: "space-between"
                            }}>
                              <span><b>{["A", "B", "C", "D"][i]}.</b> {choice}</span>
                              {isCorrect && <span style={{ fontSize: 10, background: C.green, color: "#fff", padding: "2px 6px", borderRadius: 4 }}>Correct</span>}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ background: "rgba(46,212,122,0.2)", border: `1px solid ${C.green}`, padding: "12px 16px", borderRadius: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.green, display: "block", marginBottom: 4 }}>Expected Answer:</span>
                        <span style={{ fontFamily: "monospace", fontSize: 16, color: "#fff", fontWeight: 700 }}>{currentActiveQuestion.answer}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", margin: 0 }}>Loading questions from selected bank...</p>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, marginTop: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    <Trophy size={18} color={C.yellow} /> Live Rankings
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 350, overflowY: "auto" }}>
                    {sortedRankings.map((p, idx) => (
                      <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.06)", padding: "10px 14px", borderRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: idx === 0 ? C.yellow : "rgba(255,255,255,0.5)", width: 20 }}>#{idx + 1}</span>
                          <span style={{ fontWeight: 600, fontFamily: "Manrope, sans-serif" }}>{p.name}</span>
                        </div>
                        <span style={{ color: C.green, fontWeight: 700, fontFamily: "Fredoka, sans-serif" }}>{p.score || 0} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, marginTop: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={18} color={C.yellow} /> Student Answer Stream
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 350, overflowY: "auto", fontFamily: "monospace", fontSize: 12 }}>
                    {liveFeed.length === 0 ? (
                      <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 40 }}>Waiting for student activity...</p>
                    ) : (
                      liveFeed.map((f, i) => (
                        <div key={i} style={{ background: "rgba(0,0,0,0.3)", padding: "8px 12px", borderRadius: 8, color: "rgba(255,255,255,0.8)" }}>
                          <span style={{ color: C.yellow }}>[{new Date().toLocaleTimeString()}]</span> <b>{f.sender || 'Student'}</b> {f.message || 'completed a question.'}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // Normal Matchmaking Config Render
  return (
    <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden", position: "relative" }}>
      {activeSessionExists && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(27,30,43,0.75)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <div style={{ background: C.navy, border: `2px solid ${C.red}`, borderRadius: 24, padding: "32px 40px", maxWidth: 500, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <Lock size={48} color={C.red} style={{ marginBottom: 16 }} />
            <h2 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, color: "#fff", margin: "0 0 10px" }}>Session Locked</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", margin: "0 0 24px", lineHeight: 1.5 }}>
              A live quiz session is currently running on the network. Configuration and match creation are locked until the active session concludes or is explicitly terminated.
            </p>
            <button type="button" onClick={() => setInLobby(true)} style={{ background: C.indigo, border: "none", borderRadius: 12, padding: "12px 24px", color: "#fff", fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(91,61,246,0.4)" }}>
              Return to Active Lobby ⚡
            </button>
          </div>
        </div>
      )}

      <ProfSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, opacity: activeSessionExists ? 0.3 : 1, pointerEvents: activeSessionExists ? "none" : "auto" }}>
        <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "0 28px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(91,61,246,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={17} color={C.indigo} strokeWidth={2} />
            </div>
            <div>
              <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: C.navy, margin: 0 }}>Matchmaking</h1>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted, margin: 0 }}>Adaptive team balancing for fair quiz battles</p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: C.white, borderRadius: 22, border: `1.5px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px 14px", borderBottom: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: C.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={15} color={C.indigo} strokeWidth={2} />
                </div>
                <div>
                  <h2 style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, fontWeight: 800, color: C.navy, margin: 0 }}>Matchmaking Configuration</h2>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted, margin: 0, fontWeight: 500 }}>Configure class section and live/own-pace execution mode</p>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${adaptive ? C.indigoBorder : C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>
                      {adaptive ? 'Adaptive Quiz Logic' : 'Uniform Quiz Logic'}
                    </span>
                    <ToggleSwitch on={adaptive} onChange={v => setAdaptive(v)} disabled={activeSessionExists} />
                  </div>
                </div>

                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Team Size</span>
                  <div style={{ display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, width: "fit-content" }}>
                    <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.max(2, v - 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>−</button>
                    <span style={{ width: 52, textAlign: "center", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: C.indigo }}>{teamSize}</span>
                    <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.min(8, v + 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>+</button>
                  </div>
                </div>

                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Target Class Section</span>
                  <Dropdown value={selectedSection} options={sectionsList} onChange={v => setSelectedSection(v)} disabled={activeSessionExists} />
                </div>
              </div>

              <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Database size={15} color={C.indigo} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Dynamic Question Bank Source</span>
                </div>
                <Dropdown value={selectedBank} options={questionBanks} onChange={v => setSelectedBank(v)} disabled={activeSessionExists} />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" disabled={activeSessionExists} onClick={() => setPreviewed(true)} style={{
                  background: C.coral, border: "none", borderRadius: 13, padding: "11px 22px", fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", cursor: activeSessionExists ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(255,107,74,0.3)"
                }}>
                  <Users size={16} strokeWidth={2.5} />Preview Team Assignments
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {previewed && !activeSessionExists && (
              <div style={{ borderTop: `1.5px solid ${C.border}`, padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 800, color: C.navy, margin: 0 }}>Team Preview</h3>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={handleConfirmAndDeploy} style={{
                      display: "inline-flex", alignItems: "center", gap: 5, background: C.coral, border: "none", borderRadius: 9, padding: "9px 18px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer"
                    }}>
                      <CheckCircle2 size={15} /> Confirm & Launch Live Lobby
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matchmaking;