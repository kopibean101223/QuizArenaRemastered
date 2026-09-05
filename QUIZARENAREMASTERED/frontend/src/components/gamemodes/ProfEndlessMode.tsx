import React, { useEffect, useState, useMemo } from 'react';
import { Users, Clock, Calendar, Trophy, Medal, AlertTriangle, Shield, Heart, Skull, Activity } from 'lucide-react';
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
  const [currentStage, setCurrentStage] = useState(1);
  const [currentZone, setCurrentZone] = useState<'SAFE' | 'HAZARD'>('SAFE');
  const [safeZoneEndsAt, setSafeZoneEndsAt] = useState<number>(Date.now() + 20_000);
  const [questionEndsAt, setQuestionEndsAt] = useState<number>(Date.now() + 30_000);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [liveEvents, setLiveEvents] = useState<Array<{ text: string; timestamp: number }>>([]);

  // Try to use socket context if wrapped in provider
  let socketCtx: any = null;
  try {
    socketCtx = useBattleSocketContext();
  } catch (e) {
    // Ignored, not wrapped
  }

  // Continuous timer countdown
  useEffect(() => {
    if (!isLive) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const zone = now < safeZoneEndsAt ? 'SAFE' : 'HAZARD';
      setCurrentZone(zone);
      if (zone === 'SAFE') {
        setSecondsLeft(Math.max(0, Math.round((safeZoneEndsAt - now) / 1000)));
      } else {
        setSecondsLeft(Math.max(0, Math.round((questionEndsAt - now) / 1000)));
      }
    }, 250);
    return () => clearInterval(timer);
  }, [safeZoneEndsAt, questionEndsAt, isLive]);

  // Handle socket events for Endless Mode
  useEffect(() => {
    if (!isLive || !socketCtx?.lastMessage) return;
    const msg = socketCtx.lastMessage;

    switch (msg.type) {
      case 'ENDLESS_STATE_SYNC': {
        if (msg.stage !== undefined) setCurrentStage(msg.stage);
        if (msg.safeZoneEndsAt) setSafeZoneEndsAt(msg.safeZoneEndsAt);
        if (msg.questionEndsAt) setQuestionEndsAt(msg.questionEndsAt);
        if (msg.zone) setCurrentZone(msg.zone);
        if (Array.isArray(msg.events)) {
          setLiveEvents(msg.events);
        }
        if (Array.isArray(msg.players)) {
          setLeaderboard((prev) => {
            const map = new Map(prev.map((p) => [p.id, p]));
            msg.players.forEach((p: any, idx: number) => {
              const existing = map.get(p.id) || {};
              map.set(p.id, {
                ...existing,
                id: p.id,
                name: p.name || `Student ${p.id.substring(0, 4)}`,
                initials: p.initials || 'ST',
                avatarColor: p.avatarColor || AVATAR_COLORS[idx % AVATAR_COLORS.length],
                hp: p.hp ?? 100,
                maxHp: p.maxHp ?? 100,
                isAlive: p.isAlive ?? true,
                score: p.score ?? 0,
                maxStage: p.stage ?? currentStage,
                combo: p.combo ?? 0,
                isActive: p.isAlive ?? true,
              });
            });
            return Array.from(map.values());
          });
        }
        break;
      }

      case 'QUESTION_ADVANCED': {
        if (msg.stage !== undefined) setCurrentStage(msg.stage);
        if (msg.safeZoneEndsAt) setSafeZoneEndsAt(msg.safeZoneEndsAt);
        if (msg.questionEndsAt) setQuestionEndsAt(msg.questionEndsAt);
        setCurrentZone('SAFE');
        break;
      }

      case 'ENDLESS_ZONE_TRANSITION': {
        if (msg.zone) setCurrentZone(msg.zone);
        setLiveEvents((prev) => [
          { text: `⚡ Stage ${msg.stage || currentStage} entered Hazard Zone / Storm!`, timestamp: Date.now() },
          ...prev.slice(0, 19),
        ]);
        break;
      }

      case 'ENDLESS_HAZARD_TICK': {
        if (Array.isArray(msg.updatedPlayers)) {
          setLeaderboard((prev) => {
            const map = new Map(prev.map((p) => [p.id, p]));
            msg.updatedPlayers.forEach((up: any) => {
              if (map.has(up.id)) {
                const cur = map.get(up.id)!;
                map.set(up.id, {
                  ...cur,
                  hp: up.hp,
                  isAlive: up.isAlive,
                  isActive: up.isAlive,
                });
              }
            });
            return Array.from(map.values());
          });
        }
        break;
      }

      case 'ENDLESS_ANSWER_RESULT': {
        setLeaderboard((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          if (map.has(msg.userId)) {
            const cur = map.get(msg.userId)!;
            map.set(msg.userId, {
              ...cur,
              score: msg.score ?? cur.score,
              combo: msg.combo ?? cur.combo,
              hp: msg.hp ?? cur.hp,
              isAlive: msg.isAlive ?? cur.isAlive,
              isActive: msg.isAlive ?? cur.isActive,
              maxStage: msg.stage ?? cur.maxStage,
            });
          }
          return Array.from(map.values());
        });
        break;
      }

      case 'ENDLESS_PLAYER_ELIMINATED': {
        setLiveEvents((prev) => [
          { text: `💀 ${msg.name || 'Student'} was eliminated (${msg.reason || 'HP <= 0'})!`, timestamp: Date.now() },
          ...prev.slice(0, 19),
        ]);
        setLeaderboard((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          if (map.has(msg.userId)) {
            const cur = map.get(msg.userId)!;
            map.set(msg.userId, { ...cur, isAlive: false, isActive: false, hp: 0 });
          }
          return Array.from(map.values());
        });
        break;
      }

      case 'ENDLESS_CHECKPOINT_REACHED': {
        setLiveEvents((prev) => [
          { text: `🏆 Checkpoint reached at Stage ${msg.stage}! Rewards available.`, timestamp: Date.now() },
          ...prev.slice(0, 19),
        ]);
        break;
      }
    }
  }, [isLive, socketCtx?.lastMessage, currentStage]);

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
            hp: 0,
            isAlive: false,
            isActive: false,
          };
        });

        // Safely merge existing leaderboard with historical data
        setLeaderboard((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          historical.forEach((h) => {
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

    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(fetchHistorical, 10000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.id, supabase, isLive]);

  const startTime = new Date(session.created_at || Date.now());
  const durationHours = session.deadline
    ? Math.round((new Date(session.deadline).getTime() - new Date(session.created_at).getTime()) / 3600000)
    : 24;
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

  const alivePlayers = leaderboard.filter((s) => s.isAlive !== false && s.isActive).length;
  const eliminatedPlayers = leaderboard.filter((s) => s.isAlive === false || !s.isActive).length;
  const totalPlayers = leaderboard.length;

  const [filterMode, setFilterMode] = useState<'all' | 'alive' | 'hazard' | 'safe' | 'low_hp' | 'eliminated'>('all');
  const [sortField, setSortField] = useState<'stage' | 'hp' | 'score' | 'accuracy'>('score');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const avgStage = useMemo(() => {
    if (leaderboard.length === 0) return 1;
    const sum = leaderboard.reduce((acc, s) => acc + (s.maxStage || 1), 0);
    return Math.round(sum / leaderboard.length);
  }, [leaderboard]);

  const avgHp = useMemo(() => {
    const alive = leaderboard.filter((s) => s.isAlive !== false);
    if (alive.length === 0) return 0;
    const sum = alive.reduce((acc, s) => acc + (s.hp ?? 100), 0);
    return Math.round(sum / alive.length);
  }, [leaderboard]);

  // Filtered & Sorted Leaderboard
  const displayStudents = useMemo(() => {
    return leaderboard
      .filter((s) => {
        const hp = s.hp ?? (s.isAlive !== false ? 100 : 0);
        const alive = s.isAlive !== false && hp > 0;
        if (filterMode === 'alive') return alive;
        if (filterMode === 'eliminated') return !alive;
        if (filterMode === 'hazard') return alive && (s.zone === 'HAZARD' || currentZone === 'HAZARD');
        if (filterMode === 'safe') return alive && (s.zone !== 'HAZARD' && currentZone === 'SAFE');
        if (filterMode === 'low_hp') return alive && hp <= 30;
        return true;
      })
      .sort((a, b) => {
        if (sortField === 'stage') return (b.maxStage || 1) - (a.maxStage || 1);
        if (sortField === 'hp') return (b.hp ?? 0) - (a.hp ?? 0);
        if (sortField === 'accuracy') return (b.accuracy ?? 0) - (a.accuracy ?? 0);
        return (b.score || 0) - (a.score || 0);
      });
  }, [leaderboard, filterMode, sortField, currentZone]);

  const selectedStudent = useMemo(() => {
    return leaderboard.find((s) => s.id === selectedStudentId) || null;
  }, [leaderboard, selectedStudentId]);

  return (
    <div className="min-h-screen bg-[var(--gm-navy)] p-6 font-[Manrope] text-white">
      {/* HEADER WITH ASYNC SESSION STATUS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              Endless Monitor
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              Async Session
            </span>
            <span className="text-xs text-[var(--gm-muted)]">
              {alivePlayers} Active Students
            </span>
          </div>
          <h1 className="font-[Fredoka] text-2xl font-bold m-0 bg-gradient-to-r from-[var(--gm-yellow)] to-[var(--gm-coral)] bg-clip-text text-transparent flex items-center gap-2">
            ⚡ Endless Battle — Professor Command Center {isLive ? '(Live Session)' : '(Historical)'}
          </h1>
          <p className="text-sm text-[var(--gm-muted)] mt-1">
            Individual student asynchronous progression with server-authoritative Safe Zone & Storm mechanics.
          </p>
        </div>

        {isLive && (
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 px-5">
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Session Average</span>
              <span className="font-[Fredoka] text-xl font-bold text-[var(--gm-yellow)]">
                Stage {avgStage}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase">Zone Phase</span>
              <span className={cn(
                "font-[Fredoka] text-sm font-bold flex items-center gap-1.5",
                currentZone === 'SAFE' ? "text-emerald-400" : "text-red-400 animate-pulse"
              )}>
                {currentZone === 'SAFE' ? <Shield size={14} /> : <AlertTriangle size={14} />}
                {currentZone === 'SAFE' ? `Safe (${secondsLeft}s)` : `Hazard (${secondsLeft}s)`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* METRIC PILLS / SESSION STATUS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <Users size={20} className="text-emerald-400" />
          <div>
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase block">Active</span>
            <span className="text-base font-[Fredoka] font-bold text-white">{alivePlayers} Students</span>
          </div>
        </div>

        <div className="bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <Skull size={20} className="text-red-400" />
          <div>
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase block">Eliminated</span>
            <span className="text-base font-[Fredoka] font-bold text-white">{eliminatedPlayers} Students</span>
          </div>
        </div>

        <div className="bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <Trophy size={20} className="text-[var(--gm-yellow)]" />
          <div>
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase block">Avg Stage</span>
            <span className="text-base font-[Fredoka] font-bold text-white">Stage {avgStage}</span>
          </div>
        </div>

        <div className="bg-[var(--gm-indigo)]/10 border border-[var(--gm-indigo)]/30 rounded-xl px-4 py-3 flex items-center gap-3">
          <Heart size={20} className="text-rose-400" />
          <div>
            <span className="text-[10px] text-[var(--gm-muted)] font-bold uppercase block">Avg Class HP</span>
            <span className="text-base font-[Fredoka] font-bold text-white">{avgHp}%</span>
          </div>
        </div>
      </div>

      {/* FILTERS AND SORTS */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-[var(--gm-muted)] font-bold uppercase mr-1">Filter:</span>
          {(['all', 'alive', 'hazard', 'safe', 'low_hp', 'eliminated'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterMode(f)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-all uppercase",
                filterMode === f
                  ? "bg-[var(--gm-yellow)] text-slate-950 shadow"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              )}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--gm-muted)] font-bold uppercase">Sort:</span>
          {(['score', 'stage', 'hp', 'accuracy'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortField(s)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize",
                sortField === s
                  ? "bg-white/20 text-white font-bold"
                  : "text-white/50 hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
        {/* LEADERBOARD & SURVIVAL ROSTER */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[var(--gm-yellow)]" />
              <span className="text-sm font-extrabold text-[var(--gm-yellow)] uppercase tracking-wider">
                Student Survival Progression ({displayStudents.length})
              </span>
            </div>
            <span className="text-xs text-[var(--gm-muted)]">
              Click student to view telemetry details
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {displayStudents.length === 0 ? (
              <div className="text-[var(--gm-muted)] text-sm italic py-8 text-center">
                No students match the current filter.
              </div>
            ) : (
              displayStudents.map((s, index) => {
                const studentHp = s.hp !== undefined ? s.hp : (s.isAlive !== false ? 100 : 0);
                const isStudentAlive = s.isAlive !== false && (s.hp === undefined || s.hp > 0);
                const isHazard = isStudentAlive && (s.zone === 'HAZARD' || currentZone === 'HAZARD');
                const isSelected = selectedStudentId === s.id;

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudentId(isSelected ? null : s.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl px-4 py-3 transition-all border cursor-pointer",
                      isSelected
                        ? "bg-white/10 border-[var(--gm-yellow)] shadow-lg"
                        : isStudentAlive
                        ? isHazard
                          ? "bg-amber-950/20 border-amber-500/30 hover:bg-amber-950/30"
                          : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05]"
                        : "bg-red-950/10 border-red-900/20 opacity-70"
                    )}
                  >
                    <div className="min-w-[28px] flex justify-center">
                      {index === 0 ? <Medal size={20} className="text-[var(--gm-yellow)]" /> :
                       index === 1 ? <Medal size={20} className="text-[#C0C0C0]" /> :
                       index === 2 ? <Medal size={20} className="text-[#CD7F32]" /> :
                       <span className="font-[Fredoka] text-base font-bold text-[var(--gm-muted)]">#{index + 1}</span>}
                    </div>

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-[Fredoka] text-sm font-bold text-white shrink-0 shadow"
                      style={{ background: `linear-gradient(145deg, ${s.avatarColor || '#5B3DF6'}, ${s.avatarColor || '#5B3DF6'}cc)` }}
                    >
                      {s.initials}
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-bold text-white/90 truncate">
                          {s.name}
                        </span>
                        <span className="text-xs font-bold text-[var(--gm-yellow)] bg-white/5 px-2 py-0.5 rounded">
                          Stage {s.maxStage || 1}
                        </span>
                        {isStudentAlive ? (
                          isHazard ? (
                            <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
                              <AlertTriangle size={10} /> Hazard Zone
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                              <Shield size={10} /> Safe Zone
                            </span>
                          )
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full border border-red-500/20">
                            <Skull size={10} /> Eliminated
                          </span>
                        )}
                      </div>

                      {/* HP BAR */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-300",
                              studentHp > 50 ? "bg-[var(--gm-green)]" : studentHp > 20 ? "bg-[var(--gm-yellow)]" : "bg-red-500"
                            )}
                            style={{ width: `${Math.max(0, studentHp)}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[var(--gm-muted)]">
                          {studentHp} HP
                        </span>
                        {s.combo > 1 && (
                          <span className="text-[10px] font-bold text-[var(--gm-yellow)] bg-[var(--gm-yellow)]/10 px-1 rounded">
                            {s.combo}× Combo
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-[var(--gm-muted)] uppercase block mb-0.5">Score</span>
                      <span className="font-[Fredoka] text-base font-bold text-[var(--gm-yellow)]">
                        {s.score.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* LIVE EVENT FEED & SELECTED STUDENT DRAWER */}
        <div className="space-y-4">
          {/* LIVE EVENTS */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 flex flex-col h-[340px]">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} className="text-cyan-400" />
              <span className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider">
                Live Battle Events
              </span>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
              {liveEvents.length === 0 ? (
                <div className="text-white/40 text-xs italic py-10 text-center">
                  Awaiting stage progression and combat events...
                </div>
              ) : (
                liveEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-2.5 text-xs text-white/80 leading-relaxed"
                  >
                    <span className="text-white/40 text-[10px] block mb-0.5">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    {evt.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SELECTED STUDENT DETAILS */}
          {selectedStudent && (
            <div className="bg-white/[0.03] border border-[var(--gm-yellow)]/40 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white"
                    style={{ backgroundColor: selectedStudent.avatarColor || '#5B3DF6' }}
                  >
                    {selectedStudent.initials}
                  </div>
                  <h4 className="font-[Fredoka] text-sm font-bold text-white">
                    {selectedStudent.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedStudentId(null)}
                  className="text-xs text-[var(--gm-muted)] hover:text-white"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-[var(--gm-muted)] block uppercase font-bold">Stage</span>
                  <span className="font-bold text-[var(--gm-yellow)]">Stage {selectedStudent.maxStage || 1}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-[var(--gm-muted)] block uppercase font-bold">Health</span>
                  <span className="font-bold text-emerald-400">{selectedStudent.hp ?? 100} / 100 HP</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-[var(--gm-muted)] block uppercase font-bold">Score</span>
                  <span className="font-bold text-white">{(selectedStudent.score || 0).toLocaleString()}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-[var(--gm-muted)] block uppercase font-bold">Accuracy</span>
                  <span className="font-bold text-cyan-400">{selectedStudent.accuracy || 85}%</span>
                </div>
              </div>
            </div>
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

