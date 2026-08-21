'use client';

import { useState, useEffect, useRef } from "react";
import { useApp } from "../../../context/AppContext";
import { StudentTopBar } from "../../shared/StudentTopBar";
import {
  Trophy, Users, Share2, RotateCcw, LogOut,
  CheckCircle2, Target, Zap, ShieldCheck
} from "lucide-react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

const C = {
  indigo: "#5B3DF6", indigoDeep: "#4228D4",
  coral: "#FF6B4A",
  yellow: "#FFC93C",
  green: "#2ED47A",
  navy: "#1B1E2B", navyLight: "#252840",
};

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#2ED47A","#FFC93C","#5BC8F6"];

interface TeamMember {
  id: string; name: string; initials: string; color: string;
  score: number; correct: number; total: number; isMe: boolean;
}

export function TeamBattleResults({ battleId = "team-demo", myResultData }: { battleId?: string; myResultData?: any }) {
  const { user, navigate } = useApp();
  const wsRef = useRef<WebSocket | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);

  const currentUserId = user?.id || "my-id";

  const processTeamMembers = (raw: any[]): TeamMember[] => {
    return raw.map((item, idx) => ({
      id: item.id || item.userId,
      name: item.id === currentUserId ? "You" : item.name || `Teammate ${idx + 1}`,
      initials: item.initials || (item.name || "T").substring(0, 2).toUpperCase(),
      color: item.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
      score: item.score || 0,
      correct: item.correctAnswers || 0,
      total: item.totalQuestions || 10,
      isMe: item.id === currentUserId || item.userId === currentUserId,
    }));
  };

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'JOIN_TEAM_BATTLE', battleId }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'TEAM_STATE_SYNC' || payload.type === 'TEAM_BATTLE_COMPLETED') {
          if (payload.leaderboard) setMembers(processTeamMembers(payload.leaderboard));
        }
      } catch (err) {
        console.error("Failed to parse Team WebSocket message:", err);
      }
    };

    return () => ws.close();
  }, [battleId, currentUserId]);

  const totalTeamScore = members.reduce((acc, m) => acc + m.score, 0);

  return (
    <>
      <StudentTopBar />
      <div style={{ minHeight:"100vh", paddingTop:56, background:`radial-gradient(ellipse at 50% 0%, rgba(91,61,246,0.25) 0%, transparent 60%), ${C.navy}` }}>
        
        {/* HEADER */}
        <div style={{ textAlign:"center", padding:"24px 20px 0" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(91,61,246,0.15)", border:"2px solid rgba(91,61,246,0.3)", borderRadius:40, padding:"6px 18px", marginBottom:12 }}>
            <Users size={18} color={C.indigo} />
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:C.indigo, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Team Battle Complete
            </span>
          </div>

          <h1 style={{ fontFamily:"Fredoka, sans-serif", fontSize:48, fontWeight:700, margin:"0 0 6px", background:`linear-gradient(135deg, ${C.indigo}, #fff 50%, ${C.coral})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Mission Accomplished!
          </h1>
        </div>

        {/* TEAM SCORE CROWN */}
        <div style={{ maxWidth:700, margin:"20px auto 0", padding:"0 20px" }}>
          <div style={{ background:`linear-gradient(135deg, ${C.navyLight}, rgba(91,61,246,0.15))`, border:`2px solid ${C.indigo}66`, borderRadius:24, padding:"24px", textAlign:"center" }}>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.4)", margin:0, textTransform:"uppercase" }}>Collective Team Score</p>
            <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:52, fontWeight:700, color:C.yellow, margin:"4px 0 0" }}>{totalTeamScore.toLocaleString()}</p>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.5)", margin:"4px 0 0" }}>Combined effort across {members.length} team members</p>
          </div>
        </div>

        {/* TEAM MEMBERS CONTRIBUTION */}
        <div style={{ maxWidth:700, margin:"20px auto 0", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <ShieldCheck size={18} color={C.green} />
            <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"#fff" }}>Member Contributions</span>
          </div>

          <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            {members.map((m) => (
              <div key={m.id} style={{ display:"grid", gridTemplateColumns:"1fr 100px 100px", padding:"14px 18px", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.04)", background: m.isMe ? "rgba(91,61,246,0.12)" : "transparent" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:m.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff" }}>{m.initials}</div>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700, color:"#fff" }}>{m.name}</span>
                </div>
                <div style={{ textAlign:"center" }}>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.5)" }}>{m.correct}/{m.total} Correct</span>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:C.yellow }}>+{m.score.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION ROW */}
        <div style={{ maxWidth:700, margin:"24px auto 36px", padding:"0 20px", display:"flex", gap:12 }}>
          <button type="button" onClick={() => navigate("student_dashboard")} style={{ flex:1, background:C.indigo, border:"none", borderRadius:16, padding:"14px", fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <RotateCcw size={18}/> Play Next Battle
          </button>
          <button type="button" onClick={() => navigate("student_dashboard")} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:16, padding:"14px", fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"rgba(255,255,255,0.7)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <LogOut size={18}/> Lobby
          </button>
        </div>

      </div>
    </>
  );
}	
