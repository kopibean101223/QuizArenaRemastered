
'use client';

import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  User, Users, Zap, Check, Trophy, Crown
} from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { LiveBattle } from "./Battle_LiveQuiz";
import { SelfPacedBattle } from "./Battle_OwnPace";
import { PENDING_JOIN_CODE_KEY } from "@/lib/student/studentData";

// ─── Palette ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6", indigoDeep: "#4228D4", indigoLight: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",  coralDeep: "#E85A3A",
  yellow: "#FFC93C", yellowGlow: "rgba(255,201,60,0.5)",
  green: "#2ED47A",  navy: "#1B1E2B",
  offWhite: "#FAFAFC", muted: "#717182",
};

const AVATAR_COLORS = [
  "#5B3DF6","#FF6B4A","#2ED47A","#FFC93C","#FF4757",
  "#5BC8F6","#B06EF6","#FF9F40","#E040FB","#00BCD4",
  "#FF6B9D","#43E97B",
];

interface Player {
  id: string; name: string; initials: string; color: string; isHost: boolean; isReady: boolean;
}

const CAPACITY = 12;

function CountdownDisplay({ count }: { count: number }) {
  const color = count <= 1 ? C.coral : count <= 2 ? C.yellow : C.green;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(27,30,43,0.88)", backdropFilter: "blur(6px)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 180, fontWeight: 700, color, lineHeight: 1 }}>{count}</span>
      </div>
    </div>
  );
}

function PlayerChip({ player }: { player: Player }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `linear-gradient(145deg, ${player.color}, ${player.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff",
          boxShadow: player.isReady ? `0 0 0 3px ${C.green}, 0 4px 16px ${player.color}55` : `0 0 0 3px rgba(255,255,255,0.15)`
        }}>
          {player.initials}
        </div>
        {player.isHost && (
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)" }}>
            <Crown size={16} fill={C.yellow} color={C.yellow} />
          </div>
        )}
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.75)", textAlign: "center", maxWidth: 68, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {player.name}
      </span>
    </div>
  );
}

function EmptySlot() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px dashed rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, color: "rgba(255,255,255,0.1)", fontWeight: 700 }}>+</span>
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.18)" }}>waiting…</span>
    </div>
  );
}

export function BattleLobby() {
  const { user, setActiveSectionId } = useApp();
  const supabase = createBrowserSupabaseClient();
  const wsRef = useRef<WebSocket | null>(null);

  const [hasJoined, setHasJoined] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [roomCode, setRoomCode] = useState("");

  // FIX: this used to hold quiz_sessions.section_id, which is shared by every
  // session under the same class section. Two different room codes for the
  // same section resolved to the same value here, so both rooms were sent to
  // the server as the same battleId -> same Redis channel -> cross-room sync.
  // It now holds quiz_sessions.id, the unique UUID per session/room code,
  // matching how the professor side (Matchmaking.tsx) already derives its
  // own sessionId/battleId.
  const [actualSessionId, setActualSessionId] = useState("");

  const [players, setPlayers] = useState<Player[]>([]);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);

  // DYNAMIC BATTLE MODE: Tracks "LIVE" vs "SELF_PACED" from Professor/Server
  const [battleMode, setBattleMode] = useState<"LIVE" | "SELF_PACED">("LIVE");

  // Picks up a room code that was already validated on the Dashboard's
  // "Join a Battle" widget, so the student doesn't have to re-type it here.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PENDING_JOIN_CODE_KEY);
      if (!raw) return;
      window.localStorage.removeItem(PENDING_JOIN_CODE_KEY);
      const pending = JSON.parse(raw) as { code?: string; sectionId?: string };
      if (pending?.code && pending?.sectionId) {
        setRoomCode(pending.code);
        setActualSectionId(pending.sectionId);
        setHasJoined(true);
        toast.success("Successfully joined the live lobby!");
      }
    } catch {
      // ignore malformed/expired handoff data
    }
  }, []);

  const handleJoinClick = async () => {
    if (!inputCode.trim()) {
      alert("Please enter a valid room code.");
      return;
    }
    const code = inputCode.trim().toUpperCase();

    try {
      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('id, section_id') // FIX: need the unique session id, not just section_id
        .eq('room_code', code)
        .eq('status', 'ACTIVE')
        .maybeSingle();

      if (error) {
        alert("Database Error: " + error.message);
        return;
      }

      if (!data) {
        alert("Invalid Code! If you are sure this code exists, Supabase RLS is blocking your read access.");
        return;
      }

      setRoomCode(code);
      setActualSessionId(data.id); // FIX: was data.section_id
      // FIX: the results screen (via page.tsx) reads battleId from
      // activeSectionId in context, not from this component's local
      // state - without this, that id was lost the moment navigate()
      // switched pages, and results always joined an empty battleId.
      setActiveSectionId(data.id);
      setHasJoined(true);
      toast.success("Successfully joined the live lobby!");
    } catch (err) {
      alert("Failed to connect to the database.");
    }
  };

  useEffect(() => {
    if (!hasJoined || !actualSessionId) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    const studentName = 
      user?.username || 
      user?.user_metadata?.full_name || 
      user?.email?.split('@')[0] || 
      "Unknown Student";

    socket.onopen = () => {
      // 1. Subscribe to the Redis room
      socket.send(JSON.stringify({
        type: "JOIN_BATTLE",
        battleId: actualSessionId,
        userId: user?.id || `user_${Math.random()}`,
        sender: studentName
      }));
      
      // 2. Broadcast the Join Event as a BATTLE_ACTION so the server relays it
      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: "BATTLE_ACTION",
            battleId: actualSessionId,
            userId: user?.id || `user_${Math.random()}`,
            sender: studentName,
            message: "has joined the live lobby! ✅",
            isJoinEvent: true
          }));
        }
      }, 500);
      
      setPlayers([{
        id: user?.id || "local-me",
        name: studentName,
        initials: studentName.substring(0, 2).toUpperCase(),
        color: AVATAR_COLORS[0],
        isHost: false,
        isReady: true
      }]);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle Start event from Professor & capture selected mode
        if (
          data.type === "PROF_START_BATTLE" || 
          data.type === "BATTLE_STARTED" || 
          data.type === "START_BATTLE"
        ) {
          const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
          setBattleMode(mode === "SELF_PACED" || mode === "SELFPACED" ? "SELF_PACED" : "LIVE");
          setCountdown((prev) => (prev === null ? 3 : prev));
        }

        // Late-joining student mid-game bypasses lobby countdown
        if (data.type === "ROOM_STATE_SYNC" && data.status === "active") {
          const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
          setBattleMode(mode === "SELF_PACED" || mode === "SELFPACED" ? "SELF_PACED" : "LIVE");
          setBattleStarted(true);
        }

        // Handle incoming student peers joining the lobby
        if (data.type === "PLAYER_JOINED" || (data.type === "BATTLE_ACTION" && data.isJoinEvent)) {
          setPlayers(prev => {
            if (prev.some(s => s.id === data.userId || s.name === data.sender)) return prev;
            return [...prev, {
              id: data.userId || `peer_${Math.random()}`,
              name: data.sender || 'Peer',
              initials: (data.sender || 'PR').substring(0, 2).toUpperCase(),
              color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
              isHost: false,
              isReady: true
            }];
          });
        }
      } catch (err) {
        console.error("WS error:", err);
      }
    };
    return () => socket.close();
  }, [hasJoined, actualSessionId, user]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setTimeout(() => {
        setBattleStarted(true); 
      }, 1500); 
      setCountdown(null);
      return;
    }
    const t = setTimeout(() => setCountdown(c => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const emptySlots = Math.max(0, CAPACITY - players.length);

  // ROUTE DYNAMICALLY BASED ON PROFESSOR'S CHOSEN MODE
  if (battleStarted) {
    if (battleMode === "SELF_PACED") {
      return <SelfPacedBattle battleId={actualSessionId} />;
    }
    return <LiveBattle battleId={actualSessionId} />;
  }

  return (
    <>
      <StudentTopBar />
      <div style={{ minHeight: "100vh", background: C.navy, display: "flex", flexDirection: "column", paddingTop: 48, paddingBottom: 32 }}>
        
        <div style={{ textAlign: "center", marginBottom: 24, padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 12 }}>
            <Zap size={13} fill={C.yellow} color="transparent" />
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Battle Lobby
            </span>
          </div>
          <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700, color: "#fff", margin: 0 }}>
            Ready to <span style={{ color: C.yellow }}>Battle?</span>
          </h1>
        </div>

        <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          
          <div style={{ width: "100%", maxWidth: 600 }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px" }}>
              
              {!hasJoined ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", textAlign: "center", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Enter Room Code
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input 
                      value={inputCode} 
                      onChange={e => setInputCode(e.target.value.toUpperCase())}
                      maxLength={7} 
                      placeholder="QZ-0000"
                      style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "14px 20px", fontFamily: "Fredoka, sans-serif", fontSize: 36, fontWeight: 700, color: C.yellow, outline: "none", letterSpacing: "0.15em", textAlign: "center", width: "100%", boxSizing: "border-box" }} 
                    />
                    <button type="button" onClick={handleJoinClick} style={{
                      background: C.coral, border: "none", borderRadius: 16, padding: "14px 28px", fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0, boxShadow: "0 6px 20px rgba(255,107,74,0.4)"
                    }}>
                      Join!
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "center" }}>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.green, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Successfully Joined Room
                  </p>
                  <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700, color: C.yellow, letterSpacing: "0.15em" }}>
                    {roomCode}
                  </span>
                </div>
              )}

            </div>
          </div>

          {hasJoined && (
            <>
              <div style={{ width: "100%", maxWidth: 900 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Users size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Players ({players.length}/{CAPACITY})</span>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "22px 18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "18px 12px" }}>
                    {players.map(p => (
                      <PlayerChip key={p.id} player={p} />
                    ))}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <EmptySlot key={`empty-${i}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 24px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 18 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.yellow, animation: "dotPulse 1s ease-in-out infinite", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
                    Waiting for the professor to start the battle…
                  </span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {countdown !== null && <CountdownDisplay count={countdown} />}
      
      {countdown === 0 && !battleStarted && (
        <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.indigoDeep}, #2D0E8A)`, gap: 20 }}>
          <Trophy fill={C.yellow} color="transparent" size={64} />
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 56, fontWeight: 700, color: "#fff" }}>Battle Begins!</span>
        </div>
      )}
    </>
  );
}
