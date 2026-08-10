'use client';

import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  Trophy, LayoutDashboard, Library, BarChart2, Settings,
  Layers, LogOut, Sparkles, Users, Shuffle, CheckCircle2,
  Download, ChevronDown, Info, AlertTriangle, Zap,
  ArrowRight, RefreshCw, Shield, TrendingUp, Clock, Copy, Check, Crown, User, Star, Database, Lock, Eye
} from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { useBotSimulator } from "@/hooks/useBotSimulator";

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

interface QuestionItem {
  id: number | string;
  text: string;
  topic?: string;
  choices?: string[];
  answer: string;
  type?: string;
}


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

  const [isLive, setIsLive] = useState(true);
  const [deadline, setDeadline] = useState('');
  const [adaptive, setAdaptive] = useState(true);
  const [teamSize, setTeamSize] = useState(3);
  const [previewed, setPreviewed] = useState(false);
  
  const [inLobby, setInLobby] = useState(false);
  const [activeSessionExists, setActiveSessionExists] = useState(false);
  const [roomCode, setRoomCode] = useState(() => generateSecureRoomCode());
  
  const [joinedStudents, setJoinedStudents] = useState<Student[]>([]);
  
  const [copied, setCopied] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [liveFeed, setLiveFeed] = useState<any[]>([]);

  const [randomizedQuestions, setRandomizedQuestions] = useState<QuestionItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Hook handles bots entering channels, voting, chatting and answering dynamically
  const { spawnBots, cleanupBots } = useBotSimulator(selectedSection.id, roomCode, randomizedQuestions, 'LIVE', teamSize);

  useEffect(() => {
    const checkActiveSession = async () => {
      const { data } = await supabase
        .from('quiz_sessions')
        .select('id, section_id, status, is_live, room_code') 
        .eq('status', 'ACTIVE')
        .eq('is_live', true)
        .limit(1);

      if (data && data.length > 0) {
        setActiveSessionExists(true);
        setInLobby(true);
        setBattleStarted(false); 
        if (data[0].room_code) {
          setRoomCode(data[0].room_code);
        }
      }
    };
    checkActiveSession();
  }, [supabase]);

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
  useEffect(() => {
    if (!inLobby) return;
    
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
          battleId: selectedSection.id,
          totalQuestions: randomizedQuestions.length || 37,
          timeLimit: 60,
          sender: 'Professor'
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'ROOM_STATE_SYNC' || data.type === 'QUESTION_ADVANCED') {
            if (typeof data.currentIndex === 'number') setCurrentIndex(data.currentIndex);
            if (data.history) setLiveFeed(data.history);
            
            // Sync initial state if available
            if (data.leaderboard && Array.isArray(data.leaderboard)) {
               setJoinedStudents(prev => {
                 const updated = [...prev];
                 data.leaderboard.forEach((player: any) => {
                   const idx = updated.findIndex(p => p.id === (player.id || player.userId));
                   if (idx !== -1) updated[idx] = { ...updated[idx], score: player.score || 0 };
                 });
                 return updated;
               });
            }
          } 
          // Handle Points Update to Update Ranking Leaderboard
          else if (data.type === 'SCORE_UPDATED') {
            if (data.leaderboard && Array.isArray(data.leaderboard)) {
              setJoinedStudents(prev => {
                const updated = [...prev];
                data.leaderboard.forEach((player: any) => {
                  const idx = updated.findIndex(p => p.id === (player.id || player.userId));
                  if (idx !== -1) {
                    updated[idx] = { ...updated[idx], score: player.score || 0 };
                  }
                });
                return updated;
              });
            }
          }
          else if (data.type === 'BATTLE_ACTION') {
            setLiveFeed(prev => [data, ...prev]);
            
            // Extract the Team Property
            if (data.isJoinEvent || (data.message && data.message.includes('joined'))) {
              if (data.sender && data.sender !== 'Professor') {
                setJoinedStudents(prev => {
                  const uniqueId = data.userId || data.sender;
                  const rawName = data.rawName || data.sender;
                  if (prev.some(s => s.id === uniqueId || s.name === rawName)) return prev;
                  
                  return [...prev, {
                    id: uniqueId,
                    name: rawName,
                    initials: rawName.substring(0, 2).toUpperCase(),
                    perfLevel: 'Medium',
                    score: 0,
                    team: data.team || 'Unassigned',
                    avatarColor: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
                    isReady: true
                  }];
                });
              }
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
  }, [inLobby, selectedSection.id, randomizedQuestions.length]);

  useEffect(() => {
    if (!battleStarted) return;
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
  }, [battleStarted, currentIndex, randomizedQuestions.length]);
   
  async function handleConfirmAndDeploy() {
    if (activeSessionExists) {
      return toast.error("A live quiz session is currently active. You must end it before deploying a new one.");
    }
    if (!selectedSection.id || selectedSection.id === 'none') {
      return toast.error("Please select a valid section.");
    }

    // 1. Fetch the authenticated user to ensure we have the correct professor ID
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    const currentProfId = professorId || user?.id;

    if (!currentProfId || authError) {
      return toast.error("Authentication error: Could not verify your professor identity.");
    }

    // 2. Include professor_id in the payload
    const { error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert([{
        section_id: selectedSection.id,
        professor_id: currentProfId, 
        room_code: roomCode, 
        is_live: isLive,
        status: isLive ? 'ACTIVE' : 'PENDING',
        deadline: isLive ? null : deadline || null
      }]);

    if (sessionError) {
      toast.error("Failed to save match session to database.");
      console.error(sessionError);
      return;
    }

    if (isLive) {
      setActiveSessionExists(true);
      setInLobby(true);
      setJoinedStudents([]); 
      toast.success(`Live Match Session initialized using bank: ${selectedBank.name}! Session Locked.`);
    } else {
      toast.success("Own-pace session successfully deployed!");
    }
  }

  const handleStartBattle = () => {
    setBattleStarted(true);
    setCurrentIndex(0);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'PROF_START_BATTLE',
        battleId: selectedSection.id,
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
          battleId: selectedSection.id,
          currentIndex: nextIdx,
          nextTimeLimit: 60,
          isLastQuestion: false
        }));
      }
    } else {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'ADVANCE_QUESTION',
          battleId: selectedSection.id,
          currentIndex: currentIndex,
          isLastQuestion: true
        }));
      }
    }
    setTimeRemaining(60);
  };

  useEffect(() => {
    return () => cleanupBots();
  }, [cleanupBots]);

 const handleEndSession = async () => {
    if (window.confirm("Are you sure you want to end this live quiz session? This will close the lobby and unlock configuration.")) {
      if (wsRef.current) wsRef.current.close();
      cleanupBots(); // Destroy bots when leaving
      
      await supabase
        .from('quiz_sessions')
        .update({ status: 'COMPLETED' })
        .eq('section_id', selectedSection.id);

      setInLobby(false);
      setActiveSessionExists(false);
      setBattleStarted(false);
      setJoinedStudents([]);
      setCurrentIndex(0);
      
      // ✅ FIX: Immediately generate a fresh room code for the next session
      setRoomCode(generateSecureRoomCode());
      
      toast.success("Live session ended successfully. Configuration unlocked.");
    }
  };

  const currentActiveQuestion = randomizedQuestions[currentIndex];
  const totalQCount = randomizedQuestions.length > 0 ? randomizedQuestions.length : 1;

  // Group Students by Team for displaying them clustered
  const studentsByTeam = joinedStudents.reduce((acc, student) => {
    const t = student.team || 'Unassigned';
    if (!acc[t]) acc[t] = [];
    acc[t].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  // Calculate Cumulative Team Scores for Live Rankings
  const teamScores = Object.entries(studentsByTeam).map(([team, members]) => {
    const totalScore = members.reduce((sum, m) => sum + (m.score || 0), 0);
    return { team, score: totalScore, members };
  }).sort((a, b) => b.score - a.score);

  if (inLobby) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: C.navy, overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto", padding: 32, color: "#fff" }}>
          
          <div style={{ background: "rgba(255,71,87,0.2)", border: "1px solid rgba(255,71,87,0.4)", borderRadius: 12, padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontFamily: "Manrope, sans-serif", color: C.yellow, fontWeight: 700 }}>🔒 STRICT SESSION LOCK: Redis & WebSocket state auto-synced across clients.</span>
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
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>Live Fullscreen Session Lobby</span>
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
                    onClick={() => spawnBots(teamSize * 3)} // Spawn enough for 3 full teams
                    style={{ background: C.indigo, border: "none", borderRadius: 12, padding: "10px 20px", color: "#fff", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    🤖 Spawn {teamSize * 3} Test Bots ({teamSize} per team)
                  </button>
                </div>
              </div>

              {/* Joined Student Profiles Grid - NOW GROUPED BY TEAM */}
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Users size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Joined Participants ({joinedStudents.length}/{CAPACITY})
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.yellow, animation: "dotPulse 1.2s ease-in-out infinite" }} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                      Waiting for students to join…
                    </span>
                  </div>
                </div>

                {/* Team Bracket Display Layout */}
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
                        <span style={{ fontSize: 12, background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                          {members.length} / {teamSize}
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 12 }}>
                        {members.map(student => (
                          <PlayerChip key={student.id} player={student} animate={true} />
                        ))}
                        {/* Pad with empty slots up to teamSize */}
                        {Array.from({ length: Math.max(0, teamSize - members.length) }).map((_, i) => (
                           <EmptySlot key={`empty-${teamName}-${i}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty Layout State before anyone joins */}
                  {joinedStudents.length === 0 && (
                     <div style={{ 
                      background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", 
                      border: "1px dashed rgba(255,255,255,0.2)", 
                      borderRadius: 20, padding: 20, display: "flex", flexDirection: "column"
                     }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 12 }}>
                        {Array.from({ length: teamSize }).map((_, i) => <EmptySlot key={`empty-${i}`} />)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button type="button" onClick={handleStartBattle} style={{ width: "100%", background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoDeep})`, border: "none", borderRadius: 20, padding: "18px 0", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 8px 32px rgba(91,61,246,0.5)" }}>
                Start Live Battle Now! ⚡
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
                    <Trophy size={18} color={C.yellow} /> Live Team Rankings
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 350, overflowY: "auto" }}>
                    {teamScores.map((ts, idx) => (
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
                    ))}
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${adaptive ? C.indigoBorder : C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Adaptive Randomization</span>
                    <ToggleSwitch on={adaptive} onChange={v => setAdaptive(v)} disabled={activeSessionExists} />
                  </div>
                </div>

                <div style={{ background: C.offWhite, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>Team Size</span>
                 <div style={{ display: "flex", alignItems: "center", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, width: "fit-content" }}>

  <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.max(3, v - 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>−</button>
  <span style={{ width: 52, textAlign: "center", fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: C.indigo }}>{teamSize}</span>
  <button type="button" disabled={activeSessionExists} onClick={() => setTeamSize(v => Math.min(7, v + 1))} style={{ width: 38, height: 38, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>+</button>
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