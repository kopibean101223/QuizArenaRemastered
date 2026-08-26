'use client';

import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  Trophy, LayoutDashboard, Library, BarChart2, Settings,
  Layers, LogOut, Sparkles, Users, Shuffle, CheckCircle2,
  Download, ChevronDown, Info, AlertTriangle, Zap,
  ArrowRight, RefreshCw, Shield, TrendingUp, Clock, Copy, Check, Crown, User, Star, Database, Lock, Eye, Loader2
} from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { useBotSimulator } from "@/hooks/useBotSimulator";
import { CountdownDisplay } from "./studentONLY/ComponentsLobby/CountdownDisplay";

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
  indigoDeep: "#4228D4", yellowGlow: "rgba(255,201,60,0.5)",
};

interface Student {
  id: string; name: string; initials: string;
  perfLevel: "High" | "Medium" | "Low"; score: number; team: string;
  avatarColor: string; isReady?: boolean; isHost?: boolean;
}

// ─── Lobby Type ────────────────────────────────────────────────────────────────
type LobbyType = "individual" | "team" | "royale" | "chaosclash" | "bingo";

const LOBBY_TYPES: { id: LobbyType; label: string; emoji: string; desc: string }[] = [
  { id: "individual", label: "Individual", emoji: "⚡", desc: "Solo play — go live now or schedule for later." },
  { id: "team", label: "Team", emoji: "🛡️", desc: "Students are grouped into teams of a fixed size." },
  { id: "royale", label: "Battle Royale", emoji: "👑", desc: "Elimination mode. Always live — no scheduling." },
  { id: "chaosclash", label: "ChaosClash", emoji: "💥", desc: "Fast elimination chaos. Always live — no scheduling." },
  { id: "bingo", label: "Bingo Arena", emoji: "🎯", desc: "Interactive grid-based matrix challenge mode." },
];

interface QuestionItem {
  id: number | string;
  text: string;
  topic?: string;
  choices?: string[];
  answer: string;
  type?: string;
}

// Cryptographically secure random room code generator
function generateSecureRoomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  window.crypto.getRandomValues(randomArray);
  for (let i = 0; i < length; i++) {
    result += chars[randomArray[i] % chars.length];
  }
  return result;
}

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#FFC93C","#2ED47A","#FF4757","#5BC8F6","#B06EF6","#FF9F40","#E040FB","#00BCD4"];
const CAPACITY = 40;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

function LobbyTypeCard({ type, selected, onClick, disabled }:
  { type: typeof LOBBY_TYPES[number]; selected: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} style={{
      flex: 1, minWidth: 0, textAlign: "left", cursor: disabled ? "not-allowed" : "pointer",
      background: selected ? C.indigoLight : C.offWhite,
      border: `1.5px solid ${selected ? C.indigo : C.border}`,
      borderRadius: 16, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6,
      opacity: disabled ? 0.6 : 1, transition: "border 0.15s, background 0.15s",
    }}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>{type.emoji}</span>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 800, color: selected ? C.indigo : C.navy }}>{type.label}</span>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted, lineHeight: 1.4 }}>{type.desc}</span>
    </button>
  );
}

function PlayerChip({ player, animate }: { player: Student; animate?: boolean }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      animation: animate ? "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" : undefined
    }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: `linear-gradient(145deg, ${player.avatarColor}, ${player.avatarColor}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff",
          boxShadow: player.isReady
            ? `0 0 0 3px ${C.green}, 0 4px 16px ${player.avatarColor}55`
            : `0 0 0 3px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)`,
          transition: "box-shadow 0.3s",
        }}>
          {player.initials}
        </div>
        <div style={{
          position: "absolute", bottom: 1, right: 1, width: 14, height: 14,
          borderRadius: "50%", background: player.isReady ? C.green : "rgba(255,255,255,0.2)",
          border: "2px solid #1B1E2B", transition: "background 0.3s"
        }} />
      </div>
      <span style={{
        fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
        color: "rgba(255,255,255,0.75)", textAlign: "center", maxWidth: 68,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
      }}>
        {player.name}
      </span>
    </div>
  );
}

function EmptySlot() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        border: "2px dashed rgba(255,255,255,0.12)", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, color: "rgba(255,255,255,0.1)", fontWeight: 700 }}>+</span>
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.18)" }}>waiting…</span>
    </div>
  );
}

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const steps = 40;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setVal(Math.round((to * i) / steps));
        if (i >= steps) clearInterval(iv);
      }, 22);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [to, delay]);
  return <>{val.toLocaleString()}</>;
}

function PodiumAvatar({ player, rank }: { player: any; rank: 1|2|3 }) {
  const sizes   = { 1:72, 2:60, 3:56 } as const;
  const rings   = { 1:C.yellow, 2:"rgba(255,255,255,0.5)", 3:"#CD7F32" } as const;
  const glows   = { 1:C.yellowGlow, 2:"rgba(255,255,255,0.2)", 3:"rgba(205,127,50,0.3)" } as const;
  const medals  = ["🥇","🥈","🥉"];
  const sz = sizes[rank];

  const pName = player.name || player.userId || "Anonymous";
  const initials = String(pName).substring(0, 2).toUpperCase();
  const pColor = player.color || AVATAR_COLORS[Math.abs(pName.charCodeAt(0)) % AVATAR_COLORS.length];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      {rank === 1 && (
        <Crown size={28} fill={C.yellow} color="transparent" style={{ filter:`drop-shadow(0 2px 6px ${C.yellowGlow})` }} />
      )}
      {rank !== 1 && <div style={{ height:22 }}/>}
      <div style={{ position:"relative" }}>
        <div style={{
          width:sz, height:sz, borderRadius:"50%", background: pColor,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"Fredoka, sans-serif", fontSize:sz*0.3, fontWeight:700, color:"#fff",
          border:`${rank===1?4:3}px solid ${rings[rank]}`,
          boxShadow:`0 0 0 ${rank===1?6:4}px ${glows[rank]}, 0 8px 24px rgba(0,0,0,0.4)`,
        }}>
          {initials}
        </div>
      </div>
      <span style={{ fontSize:22 }}>{medals[rank-1]}</span>
      <div style={{ textAlign:"center" }}>
        <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?17:15, fontWeight:700, color:"#fff", margin:0, lineHeight:1.2 }}>
          {pName}
        </p>
        <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?22:18, fontWeight:700, color:rank===1?C.yellow:"rgba(255,255,255,0.7)", margin:"2px 0 0" }}>
          <Counter to={player.score || 0} delay={rank===1?600:rank===2?400:800} />
        </p>
      </div>
    </div>
  );
}

function PodiumStep({ rank }: { rank: 1|2|3 }) {
  const heights = { 1:100, 2:72, 3:56 } as const;
  const colors  = {
    1:`linear-gradient(160deg,${C.yellow},rgba(232,168,0,1))`,
    2:`linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))`,
    3:`linear-gradient(160deg,rgba(205,127,50,0.5),rgba(205,127,50,0.25))`,
  } as const;
  const labels  = { 1:"1st", 2:"2nd", 3:"3rd" };

  return (
    <div style={{ width:100, height:heights[rank], background:colors[rank], border: rank===1 ? `2px solid ${C.yellow}99` : rank===2 ? "2px solid rgba(255,255,255,0.25)" : "2px solid rgba(205,127,50,0.4)", borderRadius:"14px 14px 0 0", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", flexShrink:0 }}>
      <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color: rank===1?"#1B1E2B":rank===2?"rgba(255,255,255,0.7)":"rgba(205,127,50,0.9)" }}>
        {labels[rank]}
      </span>
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export function Matchmaking({ professorId }: { professorId?: string }) {
  const supabase = createBrowserSupabaseClient();
  const [sectionsList, setSectionsList] = useState<{ id: string; name: string }[]>([]);
  const [selectedSection, setSelectedSection] = useState<{ id: string; name: string }>({ id: '', name: 'Loading...' });
  
  const [questionBanks, setQuestionBanks] = useState<{ id: string; name: string }[]>([]);
  const [selectedBank, setSelectedBank] = useState<{ id: string; name: string }>({ id: '', name: 'Select Question Bank...' });

  const [lobbyType, setLobbyType] = useState<LobbyType>("individual");
  const [isLive, setIsLive] = useState(true);
  const [deadline, setDeadline] = useState('');
  const [adaptive, setAdaptive] = useState(true);
  const [teamSize, setTeamSize] = useState(3);
  const [previewed, setPreviewed] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Battle Royale is always live — force it and clear any scheduled deadline whenever selected.
  useEffect(() => {
    if (lobbyType === "royale" || lobbyType === "chaosclash") {
      setIsLive(true);
      setDeadline('');
    }
  }, [lobbyType]);
  
  const [inLobby, setInLobby] = useState(false);
  const [activeSessionExists, setActiveSessionExists] = useState(false);
  const [roomCode, setRoomCode] = useState(() => generateSecureRoomCode());
  
  // State for globally unique session routing
  const [sessionId, setSessionId] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [joinedStudents, setJoinedStudents] = useState<Student[]>([]);
  const [copied, setCopied] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [liveFeed, setLiveFeed] = useState<any[]>([]);
  const [finalLeaderboard, setFinalLeaderboard] = useState<any[]>([]);

  // ─── PROFESSOR GROUP MANAGEMENT STATE (ONLY FOR TEAM MODE) ───
  const [groups, setGroups] = useState<string[]>(['Team 1', 'Team 2']);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const isAdvancingRef = useRef(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => { isAdvancingRef.current = isAdvancing; }, [isAdvancing]);

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

  const handleAddGroup = () => {
    const existingNums = groups
      .map(g => parseInt(g.replace('Team ', '')))
      .filter(n => !isNaN(n));
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
    const next = [...groups, `Team ${nextNum}`];
    setGroups(next);

  if (wsRef.current?.readyState === WebSocket.OPEN) {
    wsRef.current.send(JSON.stringify({
      type: 'PROF_UPDATE_GROUPS',
      mode: 'TEAM',
      battleId: sessionId,
      groups: next,
      teamSize, // NEW
    }));
  }
};

const handleRemoveGroup = (groupName: string) => {
  const next = groups.filter(g => g !== groupName);
  setGroups(next);

  if (wsRef.current?.readyState === WebSocket.OPEN) {
    wsRef.current.send(JSON.stringify({
      type: 'PROF_UPDATE_GROUPS',
      mode: 'TEAM',
      battleId: sessionId,
      groups: next,
      teamSize, // NEW
    }));
  }
};

  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Hook handles bots entering channels, voting, chatting and answering dynamically
  const { spawnBots, cleanupBots } = useBotSimulator(sessionId, roomCode, randomizedQuestions, 'LIVE', teamSize);

  // 1. Fetch active session scoped exclusively to THIS professor
    // 1. Fetch active session scoped exclusively to THIS professor
  useEffect(() => {
    const checkActiveSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const currentProfId = professorId || user?.id;
      
      if (!currentProfId) return;

      const { data } = await supabase
        .from('quiz_sessions')
        .select('id, section_id, status, is_live, room_code, mode') 
        .eq('status', 'ACTIVE')
        .eq('is_live', true)
        .eq('professor_id', currentProfId)
        .limit(1);

      if (data && data.length > 0) {
        setIsSyncing(true);
        setSessionId(data[0].id); 
        setRoomCode(data[0].room_code);
        setLobbyType(data[0].mode as LobbyType || "individual");
        setActiveSessionExists(true);
        setInLobby(true);
      }
    };
    checkActiveSession();
  }, [supabase, professorId]);

  // Load Sections and Question Banks from API
  useEffect(() => {
    const fetchSectionsAndBanks = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("No authenticated user found:", authError);
        setSectionsList([{ id: 'none', name: 'Please Log In' }]);
        setSelectedSection({ id: 'none', name: 'Please Log In' });
        setQuestionBanks([{ id: 'default', name: 'Default Question Bank' }]);
        setSelectedBank({ id: 'default', name: 'Default Question Bank' });
        return;
      }

      const currentUserId = user.id;

      const { data: secData, error: secError } = await supabase
        .from('sections')
        .select('id, name')
        .eq('professor_id', currentUserId); 

      if (secError) {
        console.error("Error fetching sections:", secError);
      }

      if (secData && secData.length > 0) {
        setSectionsList(secData);
        setSelectedSection(secData[0]);
      } else {
        setSectionsList([{ id: 'none', name: 'No Sections Found' }]);
        setSelectedSection({ id: 'none', name: 'No Sections Found' });
      }

      try {
        const res = await fetch(`/api/questions?professor_id=${encodeURIComponent(professorId || currentUserId)}`);
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

  // Load and randomize questions
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

            const filtered = selectedBank.name && selectedBank.name !== 'Select Question Bank...'
              ? formatted.filter((q: QuestionItem) => q.topic?.trim().toLowerCase() === selectedBank.name.trim().toLowerCase())
              : formatted;

            const targetQuestions = filtered.length > 0 ? filtered : formatted;
            const shuffled = shuffleArray(targetQuestions);
            const fullyRandomized = shuffled.map((q: QuestionItem) => ({
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
    loadAndRandomizeQuestions();
  }, [selectedBank]);

  // WebSocket Connection Handler
   // WebSocket Connection Handler
  useEffect(() => {
    if (!inLobby || !sessionId) return;
    
    let ws: WebSocket | null = null;
    let isMounted = true;

    function connectWs() {
      if (!isMounted) return;
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        ws?.send(JSON.stringify({
          type: 'JOIN_BATTLE',
          battleId: sessionId,
          totalQuestions: randomizedQuestions.length || 37,
          timeLimit: 60,
          sender: 'Professor'
        }));
          console.log("[TEAM][prof] onopen, lobbyType =", lobbyType);


         if (lobbyType === 'team') {
          console.log("[TEAM][prof] sending JOIN_TEAM_LOBBY", { battleId: sessionId });

          ws?.send(JSON.stringify({
            type: 'JOIN_TEAM_LOBBY',
            mode: 'TEAM',
            battleId: sessionId,
          }));

          ws?.send(JSON.stringify({          // NEW — seeds Redis even if the
            type: 'PROF_UPDATE_GROUPS',      // professor never touches Add/Remove
            mode: 'TEAM',                    // Group after deploying
            battleId: sessionId,
            groups,
            teamSize,
          }));
        }
        else if (lobbyType === 'royale' || lobbyType === 'chaosclash') {
          console.log("[ROYALE][prof] sending JOIN_ROYALE", { battleId: sessionId, lobbyType });

          ws?.send(JSON.stringify({
            type: 'JOIN_ROYALE',
            mode: 'ROYALE',
            battleId: sessionId,
            playerData: { id: 'professor', name: 'Professor', initials: 'PR', color: '#5B3DF6' },
          }));
        } else if (lobbyType === 'bingo') {
          // ENSURE THIS EXPLICITLY SENDS JOIN_BINGO AND MODE BINGO
          ws?.send(JSON.stringify({
            type: 'JOIN_BINGO',
            mode: 'BINGO',
            battleId: sessionId,
          }));
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
            console.log("[TEAM][prof] received message type:", data.type, data);   // <-- add this line first thing
          if (data.type === 'ROOM_STATE_SYNC' || data.type === 'QUESTION_ADVANCED' || data.type === 'SCORE_UPDATED') {
            setIsSyncing(false);
            if (typeof data.currentIndex === 'number') setCurrentIndex(data.currentIndex);
            if (data.startedAt) {
              const limit = data.timeLimit || 60;
              const elapsed = Math.floor((Date.now() - data.startedAt) / 1000);
              setTimeRemaining(Math.max(0, limit - elapsed));
            }
            if (data.history) setLiveFeed(data.history);
            if (data.status === 'completed') {
              setQuizCompleted(true);
            } else if (data.status === 'active') {
              setBattleStarted(true);
            }
            
            // Handle Live Points Update to populate and sort the Ranking Leaderboard dynamically
            if (data.leaderboard && Array.isArray(data.leaderboard)) {
              setJoinedStudents(prev => {
                const updated = [...prev];
                data.leaderboard.forEach((player: any) => {
                  const playerId = player.id || player.userId;
                  const playerName = player.name || player.userId;
                  const idx = updated.findIndex(p => p.id === playerId);
                  
                  if (idx !== -1) {
                    updated[idx] = { ...updated[idx], score: player.score || 0 };
                  } else if (playerId && playerName) {
                    // Populate missing students immediately on score updates to ensure visual sync
                    updated.push({
                      id: playerId,
                      name: playerName,
                      initials: String(playerName).substring(0, 2).toUpperCase(),
                      perfLevel: 'Medium',
                      score: player.score || 0,
                      team: player.team || 'Unassigned',
                      avatarColor: AVATAR_COLORS[updated.length % AVATAR_COLORS.length],
                      isReady: true
                    });
                  }
                });
                return updated;
              });
            }
          } else if (data.type === 'QUIZ_COMPLETED' || data.type === 'ROOM_COMPLETED') {
            setQuizCompleted(true);
            setFinalLeaderboard(data.leaderboard || []);
          } else if (data.type === 'BATTLE_ACTION') {
            const uniqueId = data.userId || data.sender;
            const rawName = data.rawName || data.sender;
            const isJoinEvent = data.isJoinEvent || (data.message && data.message.includes('joined'));

            // Deduplicate the chat feed to prevent repeating join messages
            setLiveFeed(prev => {
              if (isJoinEvent && data.sender !== 'Professor') {
                const alreadyInFeed = prev.some(msg => 
                  (msg.isJoinEvent || (msg.message && msg.message.includes('joined'))) && 
                  (msg.userId === uniqueId || msg.sender === rawName)
                );
                if (alreadyInFeed) return prev;
              }
              return [data, ...prev];
            });
            
            // Extract Team Property and maintain unique students
            if (isJoinEvent && data.sender !== 'Professor') {
              setJoinedStudents(prev => {
                if (prev.some(s => s.id === uniqueId || s.name === rawName)) return prev;
                
                return [...prev, {
                  id: uniqueId,
                  name: rawName,
                  initials: String(rawName).substring(0, 2).toUpperCase(),
                  perfLevel: 'Medium',
                  score: 0,
                  team: data.team || 'Unassigned',
                  avatarColor: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
                  isReady: true
                }];
              });
            } 
          } else if (data.type === 'BINGO_STATE_SYNC' && Array.isArray(data.players)) {
            setJoinedStudents(data.players
              .filter((player: any) => player.id && player.id !== 'professor')
              .map((player: any, index: number) => ({
                id: player.id,
                name: player.name || player.id,
                initials: player.initials || String(player.name || player.id).substring(0, 2).toUpperCase(),
                perfLevel: 'Medium' as const,
                score: player.score || 0,
                team: 0,
                avatarColor: player.color || AVATAR_COLORS[index % AVATAR_COLORS.length],
                isReady: true,
              })));
          }else if (data.type === 'TEAM_LOBBY_STATE_SYNC')   {
            if (Array.isArray(data.groups)) setGroups(data.groups);
            if (typeof data.teamSize === 'number') setTeamSize(data.teamSize); // NEW

            // teams is { [userId]: "teamName" } — picks made before/while
            // this professor socket was (re)connecting.
            if (data.teams && typeof data.teams === 'object') {
              setJoinedStudents(prev => prev.map(s =>
                data.teams[s.id] !== undefined ? { ...s, team: data.teams[s.id] || 'Unassigned' } : s
              ));
            }
          }
          else if (data.type === 'TEAM_GROUPS_UPDATED') {
            if (Array.isArray(data.groups)) setGroups(data.groups);
            if (typeof data.teamSize === 'number') setTeamSize(data.teamSize); // NEW
          }
          else if (data.type === 'TEAM_ASSIGNMENT_UPDATE' && data.userId) {
    console.log("[TEAM][prof] applying assignment", data.userId, "->", data.teamId);
            setJoinedStudents(prev => {
      const matched = prev.some(s => s.id === data.userId);
      if (!matched) console.warn("[TEAM][prof] no joinedStudents entry matches userId", data.userId, prev.map(s=>s.id));
      return prev.map(s => s.id === data.userId ? { ...s, team: data.teamId || 'Unassigned' } : s);
    });
          }
          // NEW — lets the professor's screen recover "battle already
          // running" state after a reload, for Royale and Team.
          else if (data.type === 'ROYALE_STATE_SYNC') {
            setIsSyncing(false);
            if (data.status === 'active') {
              setBattleStarted(true);
              if (typeof data.questionIndex === 'number') setCurrentIndex(data.questionIndex);
            }
          }
          else if (data.type === 'TEAM_STATE_SYNC') {
            setIsSyncing(false);
            if (Array.isArray(data.questions) && data.questions.length > 0) {
              setBattleStarted(true);
              if (typeof data.questionIndex === 'number') setCurrentIndex(data.questionIndex);
            }
          }
        } catch (err) {
          console.error("WS message parse error:", err);
        }
      };

      ws.onclose = () => {
        if (isMounted && inLobby) {
          setTimeout(connectWs, 2000);
        }
      };
    }

    connectWs();

    return () => {
      isMounted = false;
      if (ws) ws.close();
    };
  }, [inLobby, sessionId, randomizedQuestions.length]);

  useEffect(() => {
    if (!battleStarted || quizCompleted) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isAdvancingRef.current) return 0;
          handleNextQuestion();
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [battleStarted, currentIndex, randomizedQuestions.length, quizCompleted]);
   
async function handleConfirmAndDeploy() {
    if (activeSessionExists) {
      return toast.error("A live quiz session is currently active. You must end it before deploying a new one.");
    }
    if (!selectedSection.id || selectedSection.id === 'none') {
      return toast.error("Please select a valid section.");
    }
    if (lobbyType === "individual" && !isLive && !deadline) {
      return toast.error("Please pick a date/time for this scheduled lobby.");
    }

    setIsDeploying(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      const currentProfId = professorId || user?.id;

      if (!currentProfId || authError) {
        toast.error("Authentication error: Could not verify your professor identity.");
        return;
      }

      // Collision Check Algorithm
      let finalRoomCode = roomCode;
      let isCodeUnique = false;

      while (!isCodeUnique) {
        const { data: existingSession } = await supabase
          .from('quiz_sessions')
          .select('id')
          .eq('room_code', finalRoomCode)
          .maybeSingle();

        if (existingSession) {
          finalRoomCode = generateSecureRoomCode();
        } else {
          isCodeUnique = true;
        }
      }
      setRoomCode(finalRoomCode); 

      // Insert payload, falling back to legacy schema if PGRST204 occurs
      let payload: any = {
        section_id: selectedSection.id,
        professor_id: currentProfId, 
        room_code: finalRoomCode, 
        is_live: isLive,
        status: isLive ? 'ACTIVE' : 'PENDING',
        deadline: isLive ? null : deadline || null,
        mode: lobbyType,
        team_size: lobbyType === "team" ? teamSize : null,
      };

      let { data: sessionData, error: sessionError } = await supabase
        .from('quiz_sessions')
        .insert([payload])
        .select('id')
        .maybeSingle();

      if (sessionError && sessionError.code === 'PGRST204') {
        console.warn("Missing 'mode' or 'team_size' columns. Falling back to basic schema.");
        toast.warning("Database schema needs updating. Launching in compatibility mode.");
        
        payload = {
          section_id: selectedSection.id,
          professor_id: currentProfId, 
          room_code: finalRoomCode, 
          is_live: isLive,
          status: isLive ? 'ACTIVE' : 'PENDING',
          deadline: isLive ? null : deadline || null
        };

        const fallbackResponse = await supabase
          .from('quiz_sessions')
          .insert([payload])
          .select('id') 
          .maybeSingle();
          
        sessionData = fallbackResponse.data;
        sessionError = fallbackResponse.error;
      }

      if (sessionError) {
        toast.error("Failed to save match session to database.");
        console.error(sessionError);
        return;
      }

      if (isLive && sessionData) {
        setSessionId(sessionData.id); 
        setActiveSessionExists(true);
        setInLobby(true);
        setJoinedStudents([]); 
        const modeLabel = lobbyType === "royale" ? "Battle Royale" : lobbyType === "chaosclash" ? "ChaosClash" : lobbyType === "team" ? "Team" : "Individual";
        toast.success(`${modeLabel} Live Session initialized using bank: ${selectedBank.name}! Session Locked.`);
      } else {
        toast.success("Quiz created!");
      }
    } finally {
      setIsDeploying(false);
    }
  }

     const handleStartBattle = () => {
    setBattleStarted(true);
    setCurrentIndex(0);
    const startType = lobbyType === 'bingo' ? 'PROF_START_BINGO' : lobbyType === 'royale' || lobbyType === 'chaosclash' ? 'PROF_START_ROYALE' : lobbyType === 'team' ? 'PROF_START_TEAM' : 'PROF_START_BATTLE';
    
    if (wsRef.current?.readyState === WebSocket.OPEN) {
       wsRef.current.send(JSON.stringify({
         type: startType,
         mode: lobbyType.toUpperCase(),
         battleId: sessionId,
         bankId: selectedBank.id,
         forceReset: true,
         questions: randomizedQuestions,
       }));
    }
  };

  const handleNextQuestion = () => {
    if (isAdvancingRef.current) return;
    setIsAdvancing(true);

    const totalQCount = randomizedQuestions.length || 1;
    const nextIdx = currentIndex + 1;

    if (nextIdx < totalQCount) {
      setCurrentIndex(nextIdx);
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'ADVANCE_QUESTION',
          battleId: sessionId,
          currentIndex: nextIdx,
          nextTimeLimit: 60,
          isLastQuestion: false
        }));
      }
      setTimeRemaining(60);
      setTimeout(() => setIsAdvancing(false), 500);
    } else {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'ADVANCE_QUESTION',
          battleId: sessionId, 
          currentIndex: currentIndex,
          isLastQuestion: true
        }));
      }
      toast.success("Quiz completed!");
      setQuizCompleted(true);
      setIsAdvancing(false);
    }
  };

 const handleEndSession = async () => {
    if (window.confirm("Are you sure you want to end this live quiz session? This will close the lobby and unlock configuration.")) {
       if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_END_BATTLE', // server resolves TEAM/ROYALE from the room's registered mode
        mode: lobbyType === 'royale' || lobbyType === 'chaosclash' ? 'ROYALE' : undefined,
        battleId: sessionId,
      }));
    }
      if (wsRef.current) wsRef.current.close();
      cleanupBots(); 
      
      await supabase
        .from('quiz_sessions')
        .update({ status: 'COMPLETED' })
        .eq('id', sessionId); 

      setInLobby(false);
      setActiveSessionExists(false);
      setBattleStarted(false);
      setQuizCompleted(false);
      setFinalLeaderboard([]);
      setCountdown(null);
      setJoinedStudents([]);
      setCurrentIndex(0);
      setSessionId(''); 
      setRoomCode(generateSecureRoomCode());
      
      toast.success("Live session ended successfully. Configuration unlocked.");
    }
  };

  const currentActiveQuestion = randomizedQuestions[currentIndex];
  const totalQCount = randomizedQuestions.length > 0 ? randomizedQuestions.length : 1;

  // Calculate Rankings & Groups based on LobbyType
  const sortedStudents = [...joinedStudents].sort((a, b) => b.score - a.score);
  
  const studentsByTeam: Record<string, Student[]> = {};
  if (lobbyType === "team") {
    groups.forEach(g => { studentsByTeam[g] = []; });
    joinedStudents.forEach(student => {
      const t = student.team || 'Unassigned';
      if (!studentsByTeam[t]) studentsByTeam[t] = [];
      studentsByTeam[t].push(student);
    });
  }

  const teamScores = lobbyType === "team" ? Object.entries(studentsByTeam).map(([team, members]) => {
    const totalScore = members.reduce((sum, m) => sum + (m.score || 0), 0);
    return { team, score: totalScore, members };
  }).sort((a, b) => b.score - a.score) : [];


  if (inLobby) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: C.navy, overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: 32, color: "#fff" }}>
          
          <div style={{ background: "rgba(255,71,87,0.2)", border: "1px solid rgba(255,71,87,0.4)", borderRadius: 12, padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontFamily: "Manrope, sans-serif", color: C.yellow, fontWeight: 700 }}>🔒 STRICT SESSION LOCK</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Bank: {selectedBank.name} ({randomizedQuestions.length} Total Loaded)</span>
              <button type="button" onClick={handleEndSession} style={{ background: C.red, border: "none", borderRadius: 8, padding: "5px 12px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                End Session & Unlock
              </button>
            </div>
          </div>

          {quizCompleted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px", textAlign: "center" }}>
                <Trophy size={64} color={C.yellow} style={{ margin: "0 auto 16px" }} />
                <h2 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 32, color: "#fff", margin: "0 0 8px" }}>Session Complete!</h2>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", margin: 0 }}>The live match has ended. Here are the final results.</p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                  <Trophy size={20} fill={C.yellow} color="transparent" />
                  <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, color: "#fff", margin: 0 }}>Final Leaderboard</h3>
                </div>

                {finalLeaderboard.length > 0 && (() => {
                  const sorted = [...finalLeaderboard].sort((a, b) => b.score - a.score);
                  const top3 = [sorted[1], sorted[0], sorted[2]];
                  return (
                    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:0, marginBottom: 40, marginTop: 20 }}>
                      {top3.map((player, idx) => {
                        const rank = [2, 1, 3][idx] as 1|2|3;
                        return (
                          <div key={player ? player.id : `empty-${idx}`} style={{ display:"flex", flexDirection:"column", alignItems:"center", animation:`slideUp 0.6s ${idx*0.15}s cubic-bezier(0.34,1.56,0.64,1) both` }}>
                            <div style={{ paddingBottom:12, minHeight: 160, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                              {player ? <PodiumAvatar player={player} rank={rank} /> : null}
                            </div>
                            <PodiumStep rank={rank} />
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {finalLeaderboard.sort((a, b) => b.score - a.score).map((p, i) => {
                    const idx = i;
                    const tot = p.total || p.totalQuestions || 0;
                    const cor = p.correct || p.correctAnswers || 0;
                    return (
                    <div key={p.id || idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: idx === 0 ? C.yellow : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : C.muted }}>
                          #{idx + 1}
                        </span>
                        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, color: "#fff" }}>
                          {p.name || p.userId || "Anonymous"}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block" }}>Accuracy</span>
                          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.green }}>
                            {tot > 0 ? Math.round((cor / tot) * 100) : 0}%
                          </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block" }}>Score</span>
                          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: C.yellow }}>
                            {p.score}
                          </span>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                  {finalLeaderboard.length === 0 && (
                    <div style={{ padding: 20, textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No players joined this session.</div>
                  )}
                </div>
              </div>

              <button type="button" onClick={() => handleEndSession()} style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 14, padding: "16px", color: "#fff", fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                Close Session & Return to Setup
              </button>
            </div>
          ) : isSyncing ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Loader2 size={48} className="animate-spin mb-4" style={{ color: C.indigo }} />
              <h2 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 24, color: "#fff" }}>Syncing Live Session...</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Reconnecting to the active arena.</p>
            </div>
          ) : !battleStarted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              <style>{`
                @keyframes popIn { 0%{opacity:0;transform:scale(0.4)} 100%{opacity:1;transform:scale(1)} }
                @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }
                @keyframes burstRing { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(1.5);opacity:0} }
                @keyframes countPop { 0%{transform:scale(0.5);opacity:0} 100%{transform:scale(1);opacity:1} }
                @keyframes fadeUp { 0%{transform:translateY(20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
                @keyframes slideUp { 0%{opacity:0;transform:translateY(30px)} 100%{opacity:1;transform:translateY(0)} }
                @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
                @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
                @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
              `}</style>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 12 }}>
                  <Zap size={13} fill={C.yellow} color="transparent" />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Live Fullscreen Session Lobby ({lobbyType.toUpperCase()})
                  </span>
                </div>
                <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700, margin: 0 }}>{selectedSection.name} - Waiting Room</h1>
              </div>

              {/* Room Code Card */}
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px" }}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", textAlign: "center", textTransform: "uppercase", marginBottom: 10, letterSpacing: "0.1em" }}>External Student Room Code</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "10px 24px" }}>
                    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 36, fontWeight: 700, color: C.yellow, letterSpacing: "0.15em" }}>{roomCode}</span>
                  </div>
                  <button type="button" onClick={() => { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ width: 48, height: 48, borderRadius: 14, background: copied ? "rgba(46,212,122,0.2)" : "rgba(255,255,255,0.08)", border: `2px solid ${copied ? C.green : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: copied ? C.green : "#fff" }}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                  <button 
                    type="button" 
                    onClick={() => spawnBots(lobbyType === 'team' ? (teamSize * 3) : 10)} 
                    style={{ background: C.indigo, border: "none", borderRadius: 12, padding: "10px 20px", color: "#fff", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    🤖 Spawn {lobbyType === 'team' ? (teamSize * 3) : 10} Test Bots
                  </button>
                </div>
              </div>

              {/* Joined Student Profiles Grid */}
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Users size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Joined Participants ({joinedStudents.length}/{CAPACITY})
                    </span>
                    {lobbyType === 'team' && (
                      <button
                        type="button"
                        onClick={handleAddGroup}
                        style={{ background: "rgba(91,61,246,0.2)", border: `1px solid ${C.indigo}`, borderRadius: 8, padding: "4px 10px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", marginLeft: 8 }}
                      >
                        + Add Group
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.yellow, animation: "dotPulse 1.2s ease-in-out infinite" }} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                      Waiting for students to join…
                    </span>
                  </div>
                </div>

                {lobbyType === 'team' ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                    {Object.entries(studentsByTeam).map(([teamName, members], idx) => (
                      <div key={teamName} style={{ 
                        background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        borderRadius: 20, 
                        padding: 20, 
                        display: "flex", 
                        flexDirection: "column", 
                        position: "relative", 
                        overflow: "hidden" 
                      }}>
                        
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }} />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                          <h4 style={{ color: "#fff", fontFamily: "Fredoka, sans-serif", margin: 0, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
                            🛡️ {teamName}
                          </h4>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {members.length === 0 && teamName !== 'Unassigned' && (
                              <button
                                type="button"
                                onClick={() => handleRemoveGroup(teamName)}
                                style={{ background: "rgba(255,71,87,0.1)", border: `1px solid ${C.red}`, borderRadius: 8, padding: "3px 8px", color: C.red, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                              >
                                Remove
                              </button>
                            )}
                            <span style={{ fontSize: 12, background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                              {members.length} / {teamSize}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 12 }}>
                          {members.map(student => (
                            <PlayerChip key={student.id} player={student} animate={true} />
                          ))}
                          {Array.from({ length: Math.max(0, teamSize - members.length) }).map((_, i) => (
                            <EmptySlot key={`empty-${teamName}-${i}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", 
                    border: "1px solid rgba(255,255,255,0.1)", 
                    borderRadius: 20, 
                    padding: 20, 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", 
                    gap: 16
                  }}>
                    {joinedStudents.map(student => (
                      <PlayerChip key={student.id} player={student} animate={true} />
                    ))}
                    {joinedStudents.length === 0 && (
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, gridColumn: "1 / -1", textAlign: "center" }}>No students have joined yet.</span>
                    )}
                  </div>
                )}
              </div>

              <button type="button" onClick={() => setCountdown(3)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`, border: "none", borderRadius: 20, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 8px 32px rgba(91,61,246,0.5)" }}>
                Start Live Battle Now! ⚡
              </button>
              {countdown !== null && countdown > 0 && <CountdownDisplay count={countdown} />}
            </div>
          ) : (
            <div style={{ maxWidth: 1000, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "20px 24px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div>
                  <p style={{ color: C.yellow, fontSize: 12, textTransform: "uppercase", fontWeight: 700, margin: 0 }}>Active Bank: {selectedBank.name}</p>
                  <h2 style={{ color: "#fff", fontSize: 26, fontFamily: "Fredoka, sans-serif", margin: "4px 0 0" }}>Question {currentIndex + 1} of {totalQCount}</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 18px", borderRadius: 14, textAlign: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", display: "block" }}>Timer</span>
                    <span style={{ fontSize: 22, fontFamily: "Fredoka, sans-serif", color: timeRemaining <= 10 ? C.coral : C.yellow }}>{timeRemaining}s</span>
                  </div>
                  <button type="button" onClick={handleNextQuestion} style={{ background: C.coral, border: "none", borderRadius: 14, padding: "12px 24px", fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                    {currentIndex >= totalQCount - 1 ? 'Finish Quiz' : 'Next Question →'}
                  </button>
                </div>
              </div>

              {/* LIVE INSPECTION CARD WITH FULL DATABASE QUESTION & CHOICES */}
              <div style={{ background: "rgba(91,61,246,0.15)", border: `2px solid ${C.indigo}`, borderRadius: 20, padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Eye size={18} color={C.yellow} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.yellow, textTransform: "uppercase" }}>
                    Professor Testing Panel (Synchronized Live Item)
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
                    <Trophy size={18} color={C.yellow} /> {lobbyType === 'team' ? "Live Team Rankings" : "Live Rankings"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 350, overflowY: "auto" }}>
                    {lobbyType === 'team' ? (
                      teamScores.map((ts, idx) => (
                        <div key={ts.team} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 14 }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: idx === 0 ? C.yellow : "rgba(255,255,255,0.5)" }}>#{idx + 1}</span>
                              <span style={{ fontWeight: 700, fontFamily: "Fredoka, sans-serif", fontSize: 16 }}>{ts.team}</span>
                            </div>
                            <span style={{ color: C.green, fontWeight: 700, fontFamily: "Fredoka, sans-serif", fontSize: 16 }}>{ts.score} pts</span>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {ts.members.map(m => (
                              <span key={m.id} style={{ fontSize: 11, background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: 8, color: "rgba(255,255,255,0.7)" }}>
                                {m.name} ({m.score})
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      sortedStudents.map((student, idx) => (
                        <div key={student.id} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: idx === 0 ? C.yellow : "rgba(255,255,255,0.5)" }}>#{idx + 1}</span>
                            <span style={{ fontWeight: 700, fontFamily: "Fredoka, sans-serif", fontSize: 16 }}>{student.name}</span>
                          </div>
                          <span style={{ color: C.green, fontWeight: 700, fontFamily: "Fredoka, sans-serif", fontSize: 16 }}>{student.score} pts</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, marginTop: 0, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={18} color={C.yellow} /> Match Stream
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

              {/* Lobby Type Selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Lobby Type</span>
                <div style={{ display: "flex", gap: 12 }}>
                  {LOBBY_TYPES.map(t => (
                    <LobbyTypeCard key={t.id} type={t} selected={lobbyType === t.id} onClick={() => setLobbyType(t.id)} disabled={activeSessionExists} />
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: lobbyType === "individual" ? "1fr 1fr 1fr" : "1fr 1fr", gap: 20 }}>
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${adaptive ? C.indigoBorder : C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Adaptive Randomization</span>
                    <ToggleSwitch on={adaptive} onChange={v => setAdaptive(v)} disabled={activeSessionExists} />
                  </div>
                </div>

                {/* Individual lobby: choose Live now vs Scheduled for a later timeframe */}
                {lobbyType === "individual" && (
                  <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{isLive ? "Live Now" : "Scheduled"}</span>
                      <ToggleSwitch on={isLive} onChange={v => setIsLive(v)} disabled={activeSessionExists} />
                    </div>
                    {!isLive && (
                      <input
                        type="datetime-local"
                        value={deadline}
                        onChange={e => setDeadline(e.target.value)}
                        disabled={activeSessionExists}
                        style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "8px 10px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.navy }}
                      />
                    )}
                  </div>
                )}

                {/* Team lobby: choose members per team */}
                {lobbyType === "team" && (
                  <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Members Per Team</span>
                    <div style={{ display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, width: "fit-content" }}>
                      <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.max(2, v - 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>−</button>
                      <span style={{ width: 52, textAlign: "center", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: C.indigo }}>{teamSize}</span>
                      <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.min(7, v + 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>+</button>
                    </div>
                  </div>
                )}

                {/* Battle Royale: always live, nothing to configure — just a status note */}
                {(lobbyType === "royale" || lobbyType === "chaosclash") && (
                  <div style={{ background: C.yellowLight, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.yellowBorder}`, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Execution Mode</span>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>👑 Always Live — cannot be scheduled</span>
                  </div>
                )}

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
                    <style>{`
                      @keyframes spin { to { transform: rotate(360deg); } }
                    `}</style>
                    <button type="button" onClick={handleConfirmAndDeploy} disabled={isDeploying} style={{
                      display: "inline-flex", alignItems: "center", gap: 5, background: C.coral, border: "none", borderRadius: 9, padding: "9px 18px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: isDeploying ? "not-allowed" : "pointer", opacity: isDeploying ? 0.7 : 1
                    }}>
                      {isDeploying ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle2 size={15} />}
                      {isDeploying ? "Deploying..." : (isLive ? "Confirm & Launch Live Lobby" : "Confirm & Create Quiz")}
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