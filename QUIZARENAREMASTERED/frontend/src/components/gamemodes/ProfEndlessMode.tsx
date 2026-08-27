import React, { useEffect, useState } from 'react';
import { Users, Clock, Calendar, Trophy, Medal } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { BattleSocketProvider, useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';

const AVATAR_COLORS = [
  '#5B3DF6', '#FF6B4A', '#2ED47A', '#FFC93C', '#FF4757',
  '#5BC8F6', '#B06EF6', '#FF9F40', '#E040FB', '#00BCD4',
];

interface ProfEndlessModeProps {
  session: any;
}

// Inner component that actually renders the UI
function EndlessDashboard({ session }: { session: any }) {
  const isLive = session.status === 'ACTIVE' || session.status === 'PENDING';
  const supabase = createBrowserSupabaseClient();
  
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  
  // Try to use socket context if wrapped in provider
  let socketCtx: any = null;
  try {
    socketCtx = useBattleSocketContext();
  } catch (e) {
    // Ignored, not wrapped
  }

 // Fetch historical data (handles COMPLETED sessions AND dead players in ACTIVE sessions)
  useEffect(() => {
    const fetchHistorical = async () => {
      const { data, error } = await supabase
        .from('quiz_results')
        .select(`*`)
        .eq('session_id', session.id);

      if (error) {
        console.error("Failed to fetch historical data:", error);
      }

      if (data) {
        const historical = data.map((d: any, idx: number) => {
          const name = `Student ${d.user_id.substring(0, 4)}`;
          return {
            id: d.user_id,
            name,
            initials: name.substring(0, 2).toUpperCase(),
            avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length],
            score: d.score || 0,
            maxStage: d.correct_answers ? d.correct_answers + 1 : 1,
            accuracy: d.accuracy,
            correctAnswers: d.correct_answers,
            isActive: false
          };
        });
        
        // Safely merge existing leaderboard with historical data so no one gets erased
        setLeaderboard(prev => {
          const map = new Map(prev.map(p => [p.id, p]));
          historical.forEach(h => {
            if (!map.has(h.id)) {
              map.set(h.id, h);
            } else {
              const existing = map.get(h.id)!;
              map.set(h.id, {
                ...existing,
                score: Math.max(existing.score || 0, h.score),
                maxStage: Math.max(existing.maxStage || 1, h.maxStage),
                accuracy: h.accuracy !== undefined ? h.accuracy : existing.accuracy,
                correctAnswers: h.correctAnswers !== undefined ? h.correctAnswers : existing.correctAnswers,
              });
            }
          });
          return Array.from(map.values());
        });
      }
    };
    
    fetchHistorical();
    
    // If live, poll DB occasionally to immediately catch students who died/finished
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(fetchHistorical, 10000); // 10s poll
    }
    return () => { if (interval) clearInterval(interval); };
  }, [session.id, supabase, isLive]);


  useEffect(() => {
    if (isLive && socketCtx) {
      setLeaderboard((prevLeaderboard) => {
        // First, mark everyone as inactive
        const mergedMap = new Map(prevLeaderboard.map(p => [p.id, { ...p, isActive: false }]));
        
        // Mark players currently in the socket roster as active
        if (Array.isArray(socketCtx.players)) {
          socketCtx.players.forEach((p: any) => {
            if (p.name?.includes('Professor') || p.id === 'professor' || p.isHost) return;
            if (!mergedMap.has(p.id)) {
              mergedMap.set(p.id, {
                id: p.id,
                name: p.name || 'Student',
                initials: p.initials || 'ST',
                avatarColor: p.color || '#5B3DF6',
                score: 0,
                maxStage: 1,
                isActive: true
              });
            } else {
              mergedMap.get(p.id)!.isActive = true;
            }
          });
        }

        // Update scores from live leaderboard
        if (Array.isArray(socketCtx.leaderboard)) {
          socketCtx.leaderboard.forEach((lp: any) => {
            if (lp.name?.includes('Professor') || lp.id === 'professor' || lp.isHost) return;
            const existing = mergedMap.get(lp.id) || {};
            // If they are in the leaderboard, use their self-reported isActive.
            // If they are in socketCtx.players, they are definitely active.
            const selfReportedActive = lp.isActive !== undefined ? lp.isActive : existing.isActive;
            const definitelyActive = mergedMap.get(lp.id)?.isActive;
            
            mergedMap.set(lp.id, {
              ...existing,
              id: lp.id,
              name: lp.name || existing.name || 'Student',
              score: Math.max(existing.score || 0, lp.score || 0),
              maxStage: lp.totalQuestions !== undefined ? lp.totalQuestions : (lp.correctAnswers !== undefined ? lp.correctAnswers + 1 : Math.max(existing.maxStage || 1, Math.floor((lp.score || 0) / 100) + 1)),
              accuracy: lp.accuracy !== undefined ? lp.accuracy : existing.accuracy,
              isActive: definitelyActive || selfReportedActive
            });
          });
        }
        
        return Array.from(mergedMap.values());
      });
    }
  }, [isLive, socketCtx?.leaderboard, socketCtx?.players]);
 

  const startTime = new Date(session.created_at || Date.now());
  const durationHours = session.deadline 
    ? Math.round((new Date(session.deadline).getTime() - new Date(session.created_at).getTime()) / 3600000) 
    : 24;
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);
  const activePlayers = leaderboard.filter(s => s.isActive).length;
  const totalPlayers = leaderboard.length;

  return (
    <div className="min-h-screen bg-[var(--gm-navy)] p-6 font-[Manrope] text-white">
      <div className="mb-6">
        <h1 className="font-[Fredoka] text-2xl font-bold m-0 bg-gradient-to-r from-[var(--gm-yellow)] to-[var(--gm-coral)] bg-clip-text text-transparent">
          ⚡ Endless Mode — Overview {isLive ? '(Live)' : '(Historical)'}
        </h1>
        <p className="text-sm text-[var(--gm-muted)] mt-1">
          {isLive ? 'Students are playing at their own pace asynchronously.' : 'Match concluded. Viewing historical results.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-5 py-3">
          <Calendar size={20} className="text-[var(--gm-indigo)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Start Time</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">
              {startTime.toLocaleDateString()} {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-5 py-3">
          <Clock size={20} className="text-[var(--gm-yellow)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Available For</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">
              {durationHours} Hours <span className="text-xs font-normal text-[var(--gm-muted)]">(Ends {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-5 py-3">
          <Users size={20} className="text-[var(--gm-green)]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Participation</span>
            <span className="text-sm font-[Fredoka] font-bold text-white">
              {activePlayers} Active <span className="text-xs font-normal text-[var(--gm-muted)]">/ {totalPlayers} Total</span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6 max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} className="text-[var(--gm-yellow)]" />
          <span className="text-sm font-extrabold text-[var(--gm-yellow)] uppercase">
            Overall Leaderboard
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {leaderboard.length === 0 ? (
            <div className="text-[var(--gm-muted)] text-sm italic">No participants yet.</div>
          ) : (
            [...leaderboard].sort((a, b) => b.score - a.score).map((s, index) => {
              return (
                <div key={s.id} className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-3 transition-all",
                  "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]"
                )}>
                  <div className="min-w-[30px] flex justify-center">
                    {index === 0 ? <Medal size={20} className="text-[var(--gm-yellow)]" /> : 
                     index === 1 ? <Medal size={20} className="text-[#C0C0C0]" /> : 
                     index === 2 ? <Medal size={20} className="text-[#CD7F32]" /> : 
                     <span className="font-[Fredoka] text-lg font-bold text-[var(--gm-muted)]">#{index + 1}</span>}
                  </div>

                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-[Fredoka] text-sm font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(145deg, ${s.avatarColor}, ${s.avatarColor}cc)` }}
                  >
                    {s.initials}
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-bold text-white/90">
                        {s.name}
                      </span>
                      {s.isActive ? (
                        <span className="flex items-center gap-1 text-[10px] text-[var(--gm-green)] bg-[var(--gm-green)]/10 px-1.5 py-0.5 rounded-full border border-[var(--gm-green)]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gm-green)] animate-pulse"></span>
                          Currently Playing
                        </span>
                      ) : (
                        <span className="text-[10px] text-[var(--gm-muted)]">Finished</span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--gm-muted)] font-medium mt-0.5 flex gap-3">
                      <span>Reached Stage {s.maxStage}</span>
                      {s.accuracy !== undefined && (
                        <>
                          <span>•</span>
                          <span className={s.accuracy >= 80 ? 'text-[var(--gm-green)]' : s.accuracy >= 50 ? 'text-[var(--gm-yellow)]' : 'text-[var(--gm-coral)]'}>
                            {s.accuracy}% Accuracy
                          </span>
                        </>
                      )}
                      {s.correctAnswers !== undefined && (
                        <>
                          <span>•</span>
                          <span>{s.correctAnswers} Correct</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[var(--gm-muted)] uppercase block mb-0.5">Score</span>
                    <span className="font-[Fredoka] text-lg font-bold text-[var(--gm-yellow)]">
                      {s.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export function ProfEndlessMode({ session }: ProfEndlessModeProps) {
  const isLive = session.status === 'ACTIVE' || session.status === 'PENDING';
  
  if (isLive) {
    return (
      <BattleSocketProvider sessionId={session.id} userName="Professor (Observer)" mode="ENDLESS" extraJoinPayload={{ isHost: true }}>
        <EndlessDashboard session={session} />
      </BattleSocketProvider>
    );
  }
  
  return <EndlessDashboard session={session} />;
}
