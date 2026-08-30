import { useState, useEffect } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  TrendingUp, Users, Zap, Clock, Activity, Trophy
} from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

// ── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo:       "#5B3DF6",
  indigoLight:  "rgba(91,61,246,0.08)",
  coral:        "#FF6B4A",
  coralLight:   "rgba(255,107,74,0.08)",
  yellow:       "#FFC93C",
  green:        "#2ED47A",
  greenLight:  "rgba(46,212,122,0.09)",
  red:          "#FF4757",
  navy:         "#1B1E2B",
  bg:           "#F5F6FA",
  surface:      "#FFFFFF",
  border:       "#E8EBF4",
  text:         "#1B1E2B",
  textMuted:    "#8E93B0",
  shadow:       "0 2px 12px rgba(27,30,43,0.06)",
};

function Card({ children, style={} }: { children:React.ReactNode; style?:React.CSSProperties }) {
  return (
    <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:20,
      boxShadow:C.shadow, ...style }}>
      {children}
    </div>
  );
}

export function ProfessorDashboard() {
  const [stats, setStats] = useState({ activeBattles: 0, totalStudents: 0, avgScore: 0 });
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const supabase = createBrowserSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch Professor's Sessions
      const { data: sessions } = await supabase
        .from("quiz_sessions")
        .select("*")
        .eq("professor_id", user.id)
        .order("created_at", { ascending: false });

      const active = sessions?.filter(s => s.status?.toUpperCase() === 'ACTIVE') || [];
      const sessionIds = sessions?.map(s => s.id) || [];

      let uniqueStudents = new Set();
      let totalScore = 0;
      let scoreCount = 0;
      let performersMap = new Map();

      if (sessionIds.length > 0) {
        // 2. Fetch Results for these sessions
        const { data: results } = await supabase
          .from("quiz_results")
          .select("*, profiles(name)")
          .in("session_id", sessionIds);

        if (results) {
          results.forEach(r => {
            uniqueStudents.add(r.user_id);
            totalScore += (r.score || 0);
            scoreCount++;

            // Handle both array (if one-to-many joined poorly) and object cases for profiles
            const profileData = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            const pName = profileData?.name || 'Unknown Student';
            
            if (!performersMap.has(r.user_id)) {
              performersMap.set(r.user_id, { name: pName, score: r.score });
            } else {
              performersMap.get(r.user_id).score += r.score;
            }
          });
        }
      }

      const top = Array.from(performersMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setStats({
        activeBattles: active.length,
        totalStudents: uniqueStudents.size,
        avgScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0
      });

      setRecentSessions(sessions?.slice(0, 5) || []);
      setTopPerformers(top);
      setLoading(false);
    }
    loadDashboard();
  }, []);

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, overflow:"hidden" }}>
      <ProfSidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <header style={{ padding:"24px 32px 20px", background:C.surface, borderBottom:`1.5px solid ${C.border}`, flexShrink:0 }}>
          <h1 style={{ fontFamily:"Fredoka, sans-serif", fontSize:28, color:C.text, margin:"0 0 6px" }}>Professor Dashboard</h1>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:14, color:C.textMuted, margin:0 }}>Live overview of your classes and student performance.</p>
        </header>

        <main style={{ flex:1, overflowY:"auto", padding:"28px 32px", display:"flex", flexDirection:"column", gap:24 }}>
          {loading ? (
             <div style={{ padding: 40, textAlign: 'center', color: C.textMuted, fontFamily: 'Manrope, sans-serif' }}>Loading real-time data...</div>
          ) : (
            <>
              {/* STAT CARDS */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                <Card style={{ padding:"20px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                    <div style={{ width:40,height:40,borderRadius:12,background:C.indigoLight, display:"flex",alignItems:"center",justifyContent:"center" }}><Zap size={18} fill={C.indigo} color="transparent"/></div>
                  </div>
                  <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700, color:C.textMuted,margin:"0 0 4px",textTransform:"uppercase" }}>Active Battles</p>
                  <p style={{ fontFamily:"Fredoka, sans-serif",fontSize:40,fontWeight:700, color:C.indigo,margin:"0 0 3px",lineHeight:1 }}>{stats.activeBattles}</p>
                </Card>

                <Card style={{ padding:"20px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                    <div style={{ width:40,height:40,borderRadius:12,background:C.coralLight, display:"flex",alignItems:"center",justifyContent:"center" }}><Users size={18} color={C.coral} strokeWidth={2}/></div>
                  </div>
                  <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700, color:C.textMuted,margin:"0 0 4px",textTransform:"uppercase" }}>Total Participants</p>
                  <p style={{ fontFamily:"Fredoka, sans-serif",fontSize:40,fontWeight:700, color:C.coral,margin:"0 0 3px",lineHeight:1 }}>{stats.totalStudents}</p>
                </Card>

                <Card style={{ padding:"20px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
                    <div style={{ width:40,height:40,borderRadius:12,background:C.greenLight, display:"flex",alignItems:"center",justifyContent:"center" }}><Trophy size={18} color={C.green} strokeWidth={2}/></div>
                  </div>
                  <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700, color:C.textMuted,margin:"0 0 4px",textTransform:"uppercase" }}>Average Score</p>
                  <p style={{ fontFamily:"Fredoka, sans-serif",fontSize:40,fontWeight:700, color:C.green,margin:"0 0 3px",lineHeight:1 }}>{stats.avgScore}</p>
                </Card>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:24 }}>
                {/* RECENT SESSIONS */}
                <Card style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
                  <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}` }}>
                    <h2 style={{ fontFamily:"Fredoka, sans-serif", fontSize:18, color:C.text, margin:0, display:"flex", alignItems:"center", gap:8 }}><Activity size={18} color={C.indigo}/> Recent Sessions</h2>
                  </div>
                  <div style={{ padding:"12px 24px" }}>
                    {recentSessions.length === 0 ? (
                      <p style={{ color:C.textMuted, fontSize:14, fontFamily:"Manrope, sans-serif" }}>No recent sessions found.</p>
                    ) : (
                      recentSessions.map(s => (
                        <div key={s.id} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                          <div>
                            <p style={{ fontFamily:"Manrope, sans-serif", fontWeight:700, color:C.text, margin:"0 0 4px", textTransform: 'uppercase' }}>{s.mode || 'Battle'} Room: {s.room_code || 'N/A'}</p>
                            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, color:C.textMuted, margin:0 }}>{new Date(s.created_at).toLocaleString()}</p>
                          </div>
                          <span style={{ padding:"4px 10px", borderRadius:12, fontSize:11, fontWeight:700, fontFamily:"Manrope, sans-serif", background: s.status?.toUpperCase() === 'ACTIVE' ? C.greenLight : C.border, color: s.status?.toUpperCase() === 'ACTIVE' ? C.green : C.textMuted, alignSelf:"center" }}>
                            {s.status.toUpperCase()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </Card>

                {/* TOP PERFORMERS */}
                <Card style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
                  <div style={{ padding:"20px 24px", borderBottom:`1px solid ${C.border}` }}>
                    <h2 style={{ fontFamily:"Fredoka, sans-serif", fontSize:18, color:C.text, margin:0, display:"flex", alignItems:"center", gap:8 }}><Trophy size={18} color={C.yellow}/> Top Performers</h2>
                  </div>
                  <div style={{ padding:"12px 24px" }}>
                    {topPerformers.length === 0 ? (
                      <p style={{ color:C.textMuted, fontSize:14, fontFamily:"Manrope, sans-serif" }}>No results yet.</p>
                    ) : (
                      topPerformers.map((p, idx) => (
                        <div key={idx} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                            <span style={{ fontFamily:"Fredoka, sans-serif", fontWeight:700, color: idx === 0 ? C.yellow : C.textMuted }}>#{idx+1}</span>
                            <span style={{ fontFamily:"Manrope, sans-serif", fontWeight:700, color:C.text }}>{p.name}</span>
                          </div>
                          <span style={{ fontFamily:"Manrope, sans-serif", fontWeight:800, color:C.green }}>{p.score} pts</span>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
