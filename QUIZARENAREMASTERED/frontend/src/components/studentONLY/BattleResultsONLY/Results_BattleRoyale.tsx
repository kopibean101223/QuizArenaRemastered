'use client';

import { useState, useEffect, useRef } from "react";
import { useApp } from "../../../context/AppContext";
import { StudentTopBar } from "../../shared/StudentTopBar";
import {
  Trophy, Star, Share2, RotateCcw, LogOut,
  Zap, Target, Crown, Heart, Skull, X, Copy, Check
} from "lucide-react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

const C = {
  indigo: "#5B3DF6", indigoDeep: "#4228D4",
  coral: "#FF6B4A", coralDeep: "#D44A2A",
  yellow: "#FFC93C", yellowDeep: "#E8A800",
  green: "#2ED47A",
  red: "#FF4757", redGlow: "rgba(255,71,87,0.4)",
  navy: "#1B1E2B", navyLight: "#252840",
};

const AVATAR_COLORS = [
  "#5B3DF6","#FF6B4A","#2ED47A","#FFC93C",
  "#FF4757","#5BC8F6","#B06EF6","#FF9F40",
];

interface RoyalePlayer {
  id: string; name: string; initials: string; color: string;
  lives: number; isAlive: boolean; score: number; correct: number;
  total: number; accuracy: number; rank: number; isMe: boolean;
}

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVal(Math.round((to * i) / 30));
      if (i >= 30) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [to]);
  return <>{val.toLocaleString()}</>;
}

export function BattleRoyaleResults({ battleId = "royale-demo", myResultData }: { battleId?: string; myResultData?: any }) {
  const { user, navigate } = useApp();
  const wsRef = useRef<WebSocket | null>(null);
  const [players, setPlayers] = useState<RoyalePlayer[]>([]);
  const [showShare, setShowShare] = useState(false);

  const currentUserId = user?.id || "my-id";
  const currentUserName = user?.name || "You";

  const processRoyaleLeaderboard = (raw: any[]): RoyalePlayer[] => {
    const sorted = [...raw].sort((a, b) => (b.lives - a.lives) || ((b.score || 0) - (a.score || 0)));
    return sorted.map((item, idx) => ({
      id: item.id,
      name: item.id === currentUserId ? "You" : item.name || `Survivor ${idx + 1}`,
      initials: item.initials || (item.name || "P").substring(0, 2).toUpperCase(),
      color: item.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
      lives: item.lives ?? 0,
      isAlive: item.isAlive ?? item.lives > 0,
      score: item.score || 0,
      correct: item.correctAnswers || 0,
      total: item.totalQuestions || 10,
      accuracy: item.accuracy || 0,
      rank: idx + 1,
      isMe: item.id === currentUserId,
    }));
  };

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'JOIN_ROYALE', battleId }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'ROYALE_STATE_SYNC' || payload.type === 'ROYALE_MATCH_ENDED' || payload.type === 'ROYALE_HP_UPDATED') {
          if (payload.players) setPlayers(processRoyaleLeaderboard(payload.players));
        }
      } catch (err) {
        console.error("Failed to parse Royale WebSocket message:", err);
      }
    };

    return () => ws.close();
  }, [battleId, currentUserId]);

  const me = players.find(p => p.isMe) || {
    id: currentUserId, name: "You", initials: "ME", color: AVATAR_COLORS[0],
    lives: myResultData?.lives || 0, isAlive: (myResultData?.lives || 0) > 0,
    score: myResultData?.score || 0, correct: myResultData?.correct || 0,
    total: myResultData?.total || 10, accuracy: myResultData?.accuracy || 0,
    rank: 1, isMe: true,
  };

  const winner = players[0] || me;

  return (
    <>
      <StudentTopBar />
      <div style={{ minHeight:"100vh", paddingTop:56, background:`radial-gradient(ellipse at 50% 0%, rgba(255,71,87,0.2) 0%, transparent 60%), ${C.navy}` }}>
        
        {/* HEADER */}
        <div style={{ textAlign:"center", padding:"24px 20px 0" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,71,87,0.15)", border:"2px solid rgba(255,71,87,0.3)", borderRadius:40, padding:"6px 18px", marginBottom:12 }}>
            <Skull size={18} color={C.red} />
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:C.red, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Battle Royale Completed
            </span>
          </div>

          <h1 style={{ fontFamily:"Fredoka, sans-serif", fontSize:48, fontWeight:700, margin:"0 0 6px", background:`linear-gradient(135deg, ${C.red}, #fff 50%, ${C.yellow})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            {me.isAlive ? "Last Standing Victory!" : "You Were Eliminated!"}
          </h1>
        </div>

        {/* WINNER SPOTLIGHT */}
        <div style={{ maxWidth:700, margin:"24px auto 0", padding:"0 20px" }}>
          <div style={{ background:`linear-gradient(135deg, ${C.navyLight}, rgba(255,71,87,0.1))`, border:`2px solid ${winner.isMe ? C.yellow : C.red}66`, borderRadius:24, padding:"20px 24px", textAlign:"center", position:"relative" }}>
            <Crown size={32} fill={C.yellow} color="transparent" style={{ position:"absolute", top:-16, left:"calc(50% - 16px)" }} />
            <div style={{ width:64, height:64, borderRadius:"50%", background:winner.color, margin:"8px auto 10px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Fredoka, sans-serif", fontSize:24, fontWeight:700, color:"#fff", border:`3px solid ${C.yellow}` }}>
              {winner.initials}
            </div>
            <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color:"#fff", margin:0 }}>{winner.name} {winner.isMe && "(You)"}</p>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.5)", margin:"2px 0 0" }}>Sole Survivor · Winner</p>
          </div>
        </div>

        {/* MY STATS */}
        <div style={{ maxWidth:700, margin:"20px auto 0", padding:"0 20px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"14px", textAlign:"center" }}>
              <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>Lives Remaining</span>
              <div style={{ display:"flex", justifyContent:"center", gap:4, marginTop:6 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart key={i} size={18} fill={i < me.lives ? C.red : "transparent"} color={i < me.lives ? C.red : "rgba(255,255,255,0.2)"} />
                ))}
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"14px", textAlign:"center" }}>
              <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>Survival Rank</span>
              <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:24, fontWeight:700, color:C.yellow, margin:"4px 0 0" }}>#{me.rank}</p>
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"14px", textAlign:"center" }}>
              <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>Accuracy</span>
              <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:24, fontWeight:700, color:C.green, margin:"4px 0 0" }}>{me.accuracy}%</p>
            </div>
          </div>
        </div>

        {/* SURVIVAL TABLE */}
        <div style={{ maxWidth:700, margin:"20px auto 0", padding:"0 20px" }}>
          <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"40px 1fr 100px 80px", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.02)" }}>
              {["#", "Survivor", "Status", "Accuracy"].map((h, i) => (
                <span key={i} style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)", textAlign:i>=2?"center":"left" }}>{h}</span>
              ))}
            </div>

            {players.map((p) => (
              <div key={p.id} style={{ display:"grid", gridTemplateColumns:"40px 1fr 100px 80px", padding:"12px 16px", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.04)", background: p.isMe ? "rgba(255,71,87,0.1)" : "transparent" }}>
                <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:16, color:"rgba(255,255,255,0.4)" }}>#{p.rank}</span>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:p.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:800, color:"#fff" }}>{p.initials}</div>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700, color:"#fff" }}>{p.name}</span>
                </div>
                <div style={{ textAlign:"center" }}>
                  {p.isAlive ? (
                    <span style={{ background:"rgba(46,212,122,0.15)", color:C.green, borderRadius:12, padding:"3px 8px", fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:800 }}>ALIVE ({p.lives} HP)</span>
                  ) : (
                    <span style={{ background:"rgba(255,71,87,0.15)", color:C.red, borderRadius:12, padding:"3px 8px", fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:800 }}>ELIMINATED</span>
                  )}
                </div>
                <span style={{ textAlign:"center", fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700, color:C.green }}>{p.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION ROW */}
        <div style={{ maxWidth:700, margin:"24px auto 36px", padding:"0 20px", display:"flex", gap:12 }}>
          <button type="button" onClick={() => navigate("lobby")} style={{ flex:1, background:C.red, border:"none", borderRadius:16, padding:"14px", fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <RotateCcw size={18}/> Re-enter Royale
          </button>
          <button type="button" onClick={() => navigate("lobby")} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"14px", fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"rgba(255,255,255,0.7)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <LogOut size={18}/> Lobby
          </button>
        </div>

      </div>
    </>
  );
}
