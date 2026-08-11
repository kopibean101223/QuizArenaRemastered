'use client';

import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  Trophy, LayoutDashboard, Library, BarChart2, Settings,
  Layers, LogOut, Sparkles, Users, Shuffle, CheckCircle2,
  Download, ChevronDown, Info, AlertTriangle, Zap,
  ArrowRight, RefreshCw, Shield, TrendingUp, Clock, Copy, Check, Crown, User, Star, Database, Lock, Eye, Loader2, Award, Medal, Wifi
} from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { useBotSimulator } from "@/hooks/useBotSimulator";

// ─── Offline Queue Utilities ──────────────────────────────────────────────────
const OFFLINE_SESSIONS_KEY = "offline_pending_sessions";
const OFFLINE_RESULTS_KEY = "offline_pending_results";

export function queueOfflineSession(payload: any) {
  const existing = JSON.parse(localStorage.getItem(OFFLINE_SESSIONS_KEY) || "[]");
  existing.push({ ...payload, queuedAt: new Date().toISOString() });
  localStorage.setItem(OFFLINE_SESSIONS_KEY, JSON.stringify(existing));
}

export function queueOfflineResult(sessionId: string, resultData: any) {
  const existing = JSON.parse(localStorage.getItem(OFFLINE_RESULTS_KEY) || "[]");
  existing.push({ sessionId, resultData, queuedAt: new Date().toISOString() });
  localStorage.setItem(OFFLINE_RESULTS_KEY, JSON.stringify(existing));
}

export async function processOfflineQueue(supabase: any) {
  if (typeof window === "undefined" || !navigator.onLine) return;

  // 1. Sync pending sessions created offline
  const pendingSessions = JSON.parse(localStorage.getItem(OFFLINE_SESSIONS_KEY) || "[]");
  if (pendingSessions.length > 0) {
    const remainingSessions = [];
    for (const session of pendingSessions) {
      const { queuedAt, ...cleanPayload } = session;
      const { error } = await supabase.from('quiz_sessions').insert([cleanPayload]);
      if (error) {
        remainingSessions.push(session);
      }
    }
    localStorage.setItem(OFFLINE_SESSIONS_KEY, JSON.stringify(remainingSessions));
  }

  // 2. Sync pending session completions/results
  const pendingResults = JSON.parse(localStorage.getItem(OFFLINE_RESULTS_KEY) || "[]");
  if (pendingResults.length > 0) {
    const remainingResults = [];
    for (const item of pendingResults) {
      const { error } = await supabase
        .from('quiz_sessions')
        .update({ status: 'COMPLETED' })
        .eq('id', item.sessionId);
      if (error) {
        remainingResults.push(item);
      }
    }
    localStorage.setItem(OFFLINE_RESULTS_KEY, JSON.stringify(remainingResults));
  }
}

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
  gold: "#FFD700", silver: "#C0C0C0", bronze: "#CD7F32"
};

interface Student {
  id: string; name: string; initials: string;
  perfLevel: "High" | "Medium" | "Low"; score: number; team: string;
  avatarColor: string; isReady?: boolean; isHost?: boolean;
}

// ─── Lobby Type ────────────────────────────────────────────────────────────────
type LobbyType = "individual" | "team" | "royale";

const LOBBY_TYPES: { id: LobbyType; label: string; emoji: string; desc: string }[] = [
  { id: "individual", label: "Individual", emoji: "⚡", desc: "Solo play — go live now or schedule for later." },
  { id: "team", label: "Team", emoji: "🛡️", desc: "Students are grouped into teams of a fixed size." },
  { id: "royale", label: "Battle Royale", emoji: "👑", desc: "Elimination mode. Always live — no scheduling." },
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

  const [isLanMode, setIsLanMode] = useState(false);

  // Auto-sync queued offline items when connectivity is restored
useEffect(() => {
  const handleOnline = () => {
    toast.info("Network restored! Syncing offline sessions...");
    processOfflineQueue(supabase);
  };

  window.addEventListener('online', handleOnline);
  
  // Initial check on mount
  if (navigator.onLine) {
    processOfflineQueue(supabase);
  }

  return () => window.removeEventListener('online', handleOnline);
}, [supabase]);

  // Battle Royale is always live — force it and clear any scheduled deadline whenever selected.
  useEffect(() => {
    if (lobbyType === "royale") {
      setIsLive(true);
      setDeadline('');
    }
  }, [lobbyType]);
  
  const [inLobby, setInLobby] = useState(false);
  const [activeSessionExists, setActiveSessionExists] = useState(false);
  const [roomCode, setRoomCode] = useState(() => generateSecureRoomCode());
  
  // State for globally unique session routing
  const [sessionId, setSessionId] = useState<string>('');
  
  const [joinedStudents, setJoinedStudents] = useState<Student[]>([]);
  const [copied, setCopied] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [liveFeed, setLiveFeed] = useState<any[]>([]);

  // ─── PROFESSOR GROUP MANAGEMENT STATE (ONLY FOR TEAM MODE) ───
  const [groups, setGroups] = useState<string[]>(['Team 1', 'Team 2']);

  const handleAddGroup = () => {
    setGroups(prev => {
      const existingNums = prev
        .map(g => parseInt(g.replace('Team ', '')))
        .filter(n => !isNaN(n));
      const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
      return [...prev, `Team ${nextNum}`];
    });
  };

  const handleRemoveGroup = (groupName: string) => {
    setGroups(prev => prev.filter(g => g !== groupName));
  };

  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Hook handles bots entering channels, voting, chatting and answering dynamically
  const { spawnBots, cleanupBots } = useBotSimulator(sessionId, roomCode, randomizedQuestions, 'LIVE', teamSize);

  // 1. Fetch active session scoped exclusively to THIS professor (With Session Storage check)
  useEffect(() => {
    const checkActiveSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const currentProfId = professorId || user?.id;
      
      if (!currentProfId) return;

      const storedSessionId = sessionStorage.getItem('prof_active_session_id');

      let query = supabase.from('quiz_sessions').select('id, section_id, status, is_live, room_code, mode');
      
      if (storedSessionId) {
          query = query.eq('id', storedSessionId);
      } else {
          query = query.eq('status', 'ACTIVE').eq('is_live', true).eq('professor_id', currentProfId).limit(1);
      }

      const { data } = await query;

      if (data && data.length > 0) {
        const session = data[0];
        setSessionId(session.id); 
        setRoomCode(session.room_code);
        setLobbyType(session.mode as LobbyType || "individual");
        setActiveSessionExists(session.status === 'ACTIVE');
        setInLobby(true);
        
        if (!storedSessionId && session.status === 'ACTIVE') {
            sessionStorage.setItem('prof_active_session_id', session.id);
        }

        const storedQuestions = sessionStorage.getItem(`prof_questions_${session.id}`);
        if (storedQuestions) {
            setRandomizedQuestions(JSON.parse(storedQuestions));
        }
      }
    };
    checkActiveSession();
  }, [supabase, professorId]);

  // Load Sections and Question Banks from API
  useEffect(() => {
    const fetchSectionsAndBanks = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        setSectionsList([{ id: 'none', name: 'Please Log In' }]);
        setSelectedSection({ id: 'none', name: 'Please Log In' });
        setQuestionBanks([{ id: 'default', name: 'Default Question Bank' }]);
        setSelectedBank({ id: 'default', name: 'Default Question Bank' });
        return;
      }

      const currentUserId = user.id;

      const { data: secData } = await supabase
        .from('sections')
        .select('id, name')
        .eq('professor_id', currentUserId); 

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

  // Load and randomize questions (Avoid desync if reloading from session)
useEffect(() => {
    async function loadAndRandomizeQuestions() {
      if (sessionId && sessionStorage.getItem(`prof_questions_${sessionId}`)) {
        return; 
      }
      try {
        const res = await fetch('/api/questions');
        if (!res.ok) throw new Error("Network response was not ok");
        
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

          // ✅ CACHE ONLINE FETCH TO LOCALSTORAGE
          localStorage.setItem("cached_prof_questions", JSON.stringify(fullyRandomized));
          setRandomizedQuestions(fullyRandomized);
        }
      } catch (err) {
        console.warn("📴 Offline detected. Loading questions from browser local cache...");
        
        // 🔍 FALLBACK: READ FROM LOCALSTORAGE WHEN OFFLINE
        const cachedData = localStorage.getItem("cached_prof_questions");
        if (cachedData) {
          const parsedCache = JSON.parse(cachedData);
          setRandomizedQuestions(parsedCache);
        } else {
          // Ultimate fallback if nothing is cached yet
          setRandomizedQuestions([
            { id: 1, text: "Offline Fallback: What is the local IP?", choices: ["192.168.x.x", "127.0.0.1", "0.0.0.0", "All of the above"], answer: "All of the above", topic: "Networking" }
          ]);
        }
      }
    }
    loadAndRandomizeQuestions();
  }, [selectedBank, sessionId]);

  // WebSocket Connection Handler
// WebSocket Connection Handler
  useEffect(() => {
    if (!inLobby || !sessionId) return;
    
    let ws: WebSocket | null = null;
    let isMounted = true;

    function connectWs() {
      if (!isMounted) return;
     const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

const wsUrl = process.env.NEXT_PUBLIC_WS_URL || `ws://${host}:8080`;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || `http://${host}:8000`;
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
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'ROOM_STATE_SYNC' || data.type === 'QUESTION_ADVANCED' || data.type === 'SCORE_UPDATED' || data.type === 'PROF_START_BATTLE') {
            if (typeof data.currentIndex === 'number') setCurrentIndex(data.currentIndex);
            if (data.history) setLiveFeed(data.history);
            
            // --- NEW: Sync Timer on Refresh / Advance ---
            if (data.startedAt) {
              const limit = data.timeLimit || 60;
              const elapsedSeconds = Math.floor((Date.now() - data.startedAt) / 1000);
              const remaining = Math.max(0, limit - elapsedSeconds);
              setTimeRemaining(remaining);
            }
            
            if (data.type === 'ROOM_STATE_SYNC') {
               if (data.status === 'active') {
                   setBattleStarted(true);
                   setIsCompleted(false);
               } else if (data.status === 'completed') {
                   setBattleStarted(true);
                   setIsCompleted(true);
               } else {
                   setBattleStarted(false);
                   setIsCompleted(false);
               }
            }

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
          } 
          else if (data.type === 'BATTLE_ACTION') {
            const uniqueId = data.userId || data.sender;
            const rawName = data.rawName || data.sender;
            const isJoinEvent = data.isJoinEvent || (data.message && data.message.includes('joined'));

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
          }
          else if (data.type === 'QUIZ_COMPLETED' || data.type === 'TEAM_BATTLE_COMPLETED') {
            setIsCompleted(true);
            if (data.leaderboard && Array.isArray(data.leaderboard)) {
              setJoinedStudents(prev => {
                const updated = [...prev];
                data.leaderboard.forEach((player: any) => {
                  const playerId = player.id || player.userId;
                  const idx = updated.findIndex(p => p.id === playerId);
                  if (idx !== -1) updated[idx] = { ...updated[idx], score: player.score || 0 };
                });
                return updated;
              });
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
    if (!battleStarted || isCompleted) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 60; 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [battleStarted, isCompleted, currentIndex, randomizedQuestions.length]);


  function fetchWithTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("Network timeout")), ms))
  ]);
}

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
    let currentProfId = professorId;
    const isOnline = typeof window !== 'undefined' && navigator.onLine;

    if (isOnline) {
      try {
        const authRes = await fetchWithTimeout(supabase.auth.getUser(), 2000);
        if (authRes.data?.user) {
          currentProfId = currentProfId || authRes.data.user.id;
        }
      } catch (authErr) {
        console.warn("📴 Supabase auth timed out. Fallback to offline mode.");
      }
    }

    if (!currentProfId) {
      currentProfId = "offline-lan-professor-id";
    }

    let finalRoomCode = roomCode;
    let isCodeUnique = false;

    // Check code uniqueness online; skip if offline
    if (isOnline) {
      try {
        const dbCheck = await fetchWithTimeout(
          supabase.from('quiz_sessions').select('id').eq('room_code', finalRoomCode).maybeSingle(),
          2000
        );
        if (dbCheck.data) {
          finalRoomCode = generateSecureRoomCode();
        } else {
          isCodeUnique = true;
        }
      } catch (err) {
        isCodeUnique = true;
      }
    }

    setRoomCode(finalRoomCode);

    const payload: any = {
      section_id: selectedSection.id,
      professor_id: currentProfId,
      room_code: finalRoomCode,
      is_live: isLive,
      status: isLive ? 'ACTIVE' : 'PENDING',
      deadline: isLive ? null : deadline || null,
      mode: lobbyType,
      team_size: lobbyType === "team" ? teamSize : null,
    };

    let sessionData: any = null;
    let sessionError: any = null;

    if (isOnline) {
      try {
        const res = await fetchWithTimeout(
          supabase.from('quiz_sessions').insert([payload]).select('id').maybeSingle(),
          3000
        );
        sessionData = res.data;
        sessionError = res.error;
      } catch (err) {
        sessionError = err;
      }
    } else {
      sessionError = new Error("Offline mode active");
    }

    // 📴 OFFLINE LAN FALLBACK
    if (sessionError || !sessionData) {
      console.warn("📴 Storing session locally and running offline LAN lobby.");
      sessionData = { id: `offline-session-${Date.now()}` };
      
      // Queue locally to sync when connection re-establishes
      queueOfflineSession({ ...payload, id: sessionData.id });
    }

    if (isLive && sessionData) {
      setSessionId(sessionData.id);
      sessionStorage.setItem('prof_active_session_id', sessionData.id);
      setActiveSessionExists(true);
      setInLobby(true);
      setIsCompleted(false);
      setJoinedStudents([]);
      const modeLabel = lobbyType === "royale" ? "Battle Royale" : lobbyType === "team" ? "Team" : "Individual";
      toast.success(`${modeLabel} Live Session initialized using bank: ${selectedBank.name}!`);
    } else {
      toast.success("Quiz created!");
    }
  } catch (err) {
    console.error("Unhandled deployment error:", err);
    toast.error("Failed to deploy lobby. Check local network.");
  } finally {
    setIsDeploying(false); // Guarantees button unlocks regardless of network failure
  }
}

  const handleStartBattle = () => {
    setBattleStarted(true);
    setCurrentIndex(0);
    sessionStorage.setItem(`prof_questions_${sessionId}`, JSON.stringify(randomizedQuestions));
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_START_BATTLE',
        battleId: sessionId, 
        bankId: selectedBank.id,
        forceReset: true,
        questions: randomizedQuestions 
      }));
    }
  };

  const handleNextQuestion = () => {
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
    } else {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'ADVANCE_QUESTION',
          battleId: sessionId, 
          currentIndex: currentIndex,
          isLastQuestion: true
        }));
      }
      setIsCompleted(true);
    }
  };

const handleEndSession = async () => {
  if (window.confirm("Are you sure you want to end this live quiz session? This will close the lobby and unlock configuration.")) {
    if (wsRef.current) wsRef.current.close();
    cleanupBots();

    if (navigator.onLine) {
      try {
        await fetchWithTimeout(
          supabase.from('quiz_sessions').update({ status: 'COMPLETED' }).eq('id', sessionId),
          2500
        );
      } catch (err) {
        queueOfflineResult(sessionId, { status: 'COMPLETED' });
      }
    } else {
      queueOfflineResult(sessionId, { status: 'COMPLETED' });
    }

    sessionStorage.removeItem('prof_active_session_id');
    sessionStorage.removeItem(`prof_questions_${sessionId}`);

    setInLobby(false);
    setActiveSessionExists(false);
    setBattleStarted(false);
    setIsCompleted(false);
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
    const uniqueTeams = Array.from(new Set(joinedStudents.map(s => s.team).filter(t => t && t !== 'Unassigned')));
    const allGroups = Array.from(new Set([...groups, ...uniqueTeams]));
    
    allGroups.forEach(g => { studentsByTeam[g] = []; });
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

  // Post-Match Formatting
  const finalResults = lobbyType === 'team'
    ? teamScores.map(t => ({ name: t.team, score: t.score, id: t.team }))
    : sortedStudents.map(s => ({ name: s.name, score: s.score, id: s.id }));

  const top3 = finalResults.slice(0, 3);
  while (top3.length < 3) top3.push({ name: '-', score: 0, id: Math.random().toString() });

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

          {!battleStarted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              <style>{`
                @keyframes popIn { 0%{opacity:0;transform:scale(0.4)} 100%{opacity:1;transform:scale(1)} }
                @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.75)} }
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

                {isLanMode && (
                  <div style={{ marginTop: 16, background: "rgba(46,212,122,0.15)", border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "12px", textAlign: "center" }}>
                    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 14, color: C.green, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Wifi size={16} /> LAN MODE ACTIVE
                    </span>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "Manrope, sans-serif" }}>
                      Ensure students are connected to the same Wi-Fi network. Have them navigate to <br/>
                      <strong style={{ color: "#fff", background: "rgba(0,0,0,0.3)", padding: "2px 6px", borderRadius: 4 }}>http://{window.location.hostname}:3000</strong>
                    </p>
                  </div>
                )}
                
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

              <button type="button" onClick={handleStartBattle} style={{ width: "100%", background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`, border: "none", borderRadius: 20, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 8px 32px rgba(91,61,246,0.5)" }}>
                Start Live Battle Now! ⚡
              </button>
            </div>
          ) : isCompleted ? (
            <div style={{ maxWidth: 900, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Crown size={64} color={C.yellow} style={{ margin: '0 auto', filter: 'drop-shadow(0 0 20px rgba(255,201,60,0.6))' }} />
                <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700, margin: '10px 0 0' }}>Match Completed!</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>The results have been successfully saved.</p>
              </div>

              {/* Podium View */}
            {/* Podium View */}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16, height: 350, marginTop: 20, marginBottom: 40 }}>
  
  {/* 2nd Place (Silver) */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 140 }}>
    <div style={{ background: 'rgba(192,192,192,0.15)', border: `2px solid ${C.silver}`, borderRadius: '50%', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: `0 0 20px ${C.silver}44` }}>
      <Medal size={32} color={C.silver} />
    </div>
    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{top3[1].name}</span>
    <span style={{ color: C.silver, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{top3[1].score} pts</span>
    <div style={{ background: `linear-gradient(to top, ${C.silver}44, transparent)`, border: `2px solid ${C.silver}`, borderBottom: 'none', borderRadius: '16px 16px 0 0', width: '100%', height: 140, display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 40, fontWeight: 700, color: C.silver }}>2</span>
    </div>
  </div>

  {/* 1st Place (Gold) */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 160, zIndex: 10 }}>
    <div style={{ background: 'rgba(255,215,0,0.15)', border: `2px solid ${C.gold}`, borderRadius: '50%', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: `0 0 30px ${C.gold}66` }}>
      <Trophy size={42} color={C.gold} />
    </div>
    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: C.gold, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{top3[0].name}</span>
    <span style={{ color: C.gold, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{top3[0].score} pts</span>
    <div style={{ background: `linear-gradient(to top, ${C.gold}55, transparent)`, border: `2px solid ${C.gold}`, borderBottom: 'none', borderRadius: '16px 16px 0 0', width: '100%', height: 180, display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700, color: C.gold }}>1</span>
    </div>
  </div>

  {/* 3rd Place (Bronze) */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 140 }}>
    <div style={{ background: 'rgba(205,127,50,0.15)', border: `2px solid ${C.bronze}`, borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: `0 0 15px ${C.bronze}44` }}>
      <Award size={28} color={C.bronze} />
    </div>
    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, textAlign: 'center', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{top3[2].name}</span>
    <span style={{ color: C.bronze, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{top3[2].score} pts</span>
    <div style={{ background: `linear-gradient(to top, ${C.bronze}44, transparent)`, border: `2px solid ${C.bronze}`, borderBottom: 'none', borderRadius: '16px 16px 0 0', width: '100%', height: 100, display: 'flex', justifyContent: 'center', paddingTop: 16 }}>
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 32, fontWeight: 700, color: C.bronze }}>3</span>
    </div>
  </div>

</div>
              {/* Remaining Leaderboard */}
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, marginTop: 0, marginBottom: 16 }}>Full Leaderboard</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 300, overflowY: "auto" }}>
                  {finalResults.map((res, idx) => (
                    <div key={res.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.2)", padding: "14px 20px", borderRadius: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: idx < 3 ? C.yellow : "rgba(255,255,255,0.5)", width: 30 }}>#{idx + 1}</span>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700 }}>{res.name}</span>
                      </div>
                      <span style={{ color: C.green, fontWeight: 700, fontFamily: "Fredoka, sans-serif", fontSize: 18 }}>{res.score} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <button type="button" onClick={handleEndSession} style={{ width: "100%", background: C.red, border: "none", borderRadius: 16, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 8px 32px rgba(255,71,87,0.3)", marginTop: 10 }}>
                End Session & Close Lobby
              </button>
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

                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${isLanMode ? C.greenBorder : C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>LAN Host Mode</span>
                    <ToggleSwitch on={isLanMode} onChange={v => setIsLanMode(v)} disabled={activeSessionExists} />
                  </div>
                  {isLanMode && (
                    <span style={{ fontSize: 11, color: C.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Wifi size={12} /> Local sync enabled
                    </span>
                  )}
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
                {lobbyType === "royale" && (
                  <div style={{ background: C.yellowLight, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.yellowBorder}`, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Execution Mode</span>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>👑 Always Live — cannot be scheduled</span>
                  </div>
                )}

               <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>
    {isLanMode ? "LAN Section Name" : "Target Class Section"}
  </span>

  {isLanMode ? (
    // If LAN mode is on, let the professor type any custom section name freely offline
    <input 
      type="text"
      placeholder="e.g., CS-3A Local Lab"
      value={selectedSection.name === 'Loading...' ? '' : selectedSection.name}
      onChange={(e) => setSelectedSection({ id: 'lan-manual', name: e.target.value })}
      style={{
        background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 11,
        padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.navy, outline: "none"
      }}
    />
  ) : (
    <Dropdown value={selectedSection} options={sectionsList} onChange={v => setSelectedSection(v)} disabled={activeSessionExists} />
  )}
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