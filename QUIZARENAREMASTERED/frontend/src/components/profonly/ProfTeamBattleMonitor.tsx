'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Trophy, Flame, Zap, Clock, Shield, Sparkles,
  ArrowUpDown, Filter, ChevronRight, X, Shuffle, SkipForward,
  CheckCircle2, AlertCircle, Radio, BarChart3, Medal, RefreshCw
} from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';

export interface TeamMemberTelemetry {
  id: string;
  name: string;
  avatarColor?: string;
  score: number;
  accuracy: number;
  streak: number;
  answeredCurrent?: boolean;
  selectedOption?: string;
  isDesignatedLeader?: boolean;
  status: 'active' | 'disconnected';
}

export interface TeamTelemetry {
  teamId: string;
  teamName: string;
  color: string;
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalAnswers: number;
  members: TeamMemberTelemetry[];
  rank?: number;
  activePowerup?: string | null;
}

export interface TeamActivityEvent {
  id: string;
  timestamp: number;
  teamId?: string;
  teamName?: string;
  text: string;
  type: 'answer' | 'streak' | 'powerup' | 'connection' | 'unanimous';
}

interface ProfTeamBattleMonitorProps {
  battleId?: string;
  initialTeams?: TeamTelemetry[];
  isLiveSession?: boolean;
}

export const DEFAULT_TEAM_PALETTES = [
  { name: 'Phoenix', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.4)' },
  { name: 'Titans', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.4)' },
  { name: 'Nova', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Echo', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Orbit', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.4)' },
  { name: 'Valkyrie', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)' },
  { name: 'Apex', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.4)' },
  { name: 'Zenith', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)' },
];

export function ProfTeamBattleMonitor({
  battleId,
  initialTeams = [],
  isLiveSession = true,
}: ProfTeamBattleMonitorProps) {
  let socketCtx: any = null;
  try {
    socketCtx = useBattleSocketContext();
  } catch {
    // Safe fallback when rendered in standalone preview
  }
  const lastMessage = socketCtx?.lastMessage;

  // Dynamic Teams State
  const [teams, setTeams] = useState<TeamTelemetry[]>(() => {
    if (initialTeams.length > 0) return initialTeams;
    // Default 5-team configuration matching spec Section 27
    return [
      {
        teamId: 'team-phoenix',
        teamName: 'Team Phoenix',
        color: DEFAULT_TEAM_PALETTES[0].color,
        score: 820,
        accuracy: 84,
        correctAnswers: 21,
        totalAnswers: 25,
        members: [
          { id: 'm-1', name: 'Marcus Vance', score: 280, accuracy: 92, streak: 4, answeredCurrent: true, isDesignatedLeader: true, status: 'active' },
          { id: 'm-2', name: 'Elena Rostova', score: 220, accuracy: 88, streak: 3, answeredCurrent: true, status: 'active' },
          { id: 'm-3', name: 'David Kim', score: 180, accuracy: 80, streak: 1, answeredCurrent: false, status: 'active' },
          { id: 'm-4', name: 'Chloe Bennett', score: 140, accuracy: 76, streak: 0, answeredCurrent: true, status: 'active' },
        ],
      },
      {
        teamId: 'team-titans',
        teamName: 'Team Titans',
        color: DEFAULT_TEAM_PALETTES[1].color,
        score: 780,
        accuracy: 81,
        correctAnswers: 19,
        totalAnswers: 24,
        members: [
          { id: 'm-5', name: 'Sophia Chen', score: 290, accuracy: 95, streak: 5, answeredCurrent: true, isDesignatedLeader: true, status: 'active' },
          { id: 'm-6', name: 'Liam Miller', score: 200, accuracy: 82, streak: 2, answeredCurrent: true, status: 'active' },
          { id: 'm-7', name: 'Noah Carter', score: 160, accuracy: 75, streak: 0, answeredCurrent: true, status: 'active' },
          { id: 'm-8', name: 'Ava Patel', score: 130, accuracy: 72, streak: 0, answeredCurrent: false, status: 'active' },
        ],
      },
      {
        teamId: 'team-nova',
        teamName: 'Team Nova',
        color: DEFAULT_TEAM_PALETTES[2].color,
        score: 710,
        accuracy: 76,
        correctAnswers: 18,
        totalAnswers: 24,
        members: [
          { id: 'm-9', name: 'Rachel Adams', score: 240, accuracy: 85, streak: 2, answeredCurrent: true, isDesignatedLeader: true, status: 'active' },
          { id: 'm-10', name: 'Lucas Scott', score: 190, accuracy: 78, streak: 1, answeredCurrent: true, status: 'active' },
          { id: 'm-11', name: 'Emma Watson', score: 150, accuracy: 73, streak: 0, answeredCurrent: false, status: 'active' },
          { id: 'm-12', name: 'Oliver Twist', score: 130, accuracy: 68, streak: 0, answeredCurrent: false, status: 'active' },
        ],
      },
      {
        teamId: 'team-echo',
        teamName: 'Team Echo',
        color: DEFAULT_TEAM_PALETTES[3].color,
        score: 650,
        accuracy: 72,
        correctAnswers: 16,
        totalAnswers: 23,
        members: [
          { id: 'm-13', name: 'Ethan Wright', score: 210, accuracy: 80, streak: 1, answeredCurrent: true, isDesignatedLeader: true, status: 'active' },
          { id: 'm-14', name: 'Zoe Saldana', score: 180, accuracy: 75, streak: 2, answeredCurrent: true, status: 'active' },
          { id: 'm-15', name: 'James Wilson', score: 140, accuracy: 70, streak: 0, answeredCurrent: true, status: 'active' },
          { id: 'm-16', name: 'Mia Khalifa', score: 120, accuracy: 63, streak: 0, answeredCurrent: false, status: 'disconnected' },
        ],
      },
      {
        teamId: 'team-orbit',
        teamName: 'Team Orbit',
        color: DEFAULT_TEAM_PALETTES[4].color,
        score: 590,
        accuracy: 69,
        correctAnswers: 15,
        totalAnswers: 22,
        members: [
          { id: 'm-17', name: 'Benjamin Franklin', score: 190, accuracy: 75, streak: 1, answeredCurrent: true, isDesignatedLeader: true, status: 'active' },
          { id: 'm-18', name: 'Harper Lee', score: 160, accuracy: 71, streak: 0, answeredCurrent: true, status: 'active' },
          { id: 'm-19', name: 'Henry Ford', score: 130, accuracy: 65, streak: 0, answeredCurrent: false, status: 'active' },
          { id: 'm-20', name: 'Grace Hopper', score: 110, accuracy: 65, streak: 0, answeredCurrent: false, status: 'active' },
        ],
      },
    ];
  });

  const [events, setEvents] = useState<TeamActivityEvent[]>(() => {
    if (initialTeams.length > 0) return [];
    return [
      { id: '1', timestamp: Date.now() - 3000, teamId: 'team-phoenix', teamName: 'Team Phoenix', text: 'Phoenix answered correctly (+40 pts)', type: 'answer' },
      { id: '2', timestamp: Date.now() - 7000, teamId: 'team-titans', teamName: 'Team Titans', text: 'Titans reached a 5x Team Streak!', type: 'streak' },
      { id: '3', timestamp: Date.now() - 12000, teamId: 'team-echo', teamName: 'Team Echo', text: 'Echo activated Double Points Power-up', type: 'powerup' },
      { id: '4', timestamp: Date.now() - 18000, teamId: 'team-nova', teamName: 'Team Nova', text: 'Nova achieved unanimous agreement on Question #4', type: 'unanimous' },
    ];
  });

  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(10);
  const [roundTimeLeft, setRoundTimeLeft] = useState(30);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Synchronize when real teams are dynamically passed from host lobby
  useEffect(() => {
    if (initialTeams && initialTeams.length > 0) {
      setTeams(initialTeams);
      setEvents([]);
    }
  }, [initialTeams]);

  // Incoming socket messages for Team Battle
  useEffect(() => {
    if (!lastMessage) return;

    if (lastMessage.type === 'TEAM_STATE_SYNC' || lastMessage.type === 'TEAM_QUESTION_ADVANCED') {
      if (lastMessage.questionIndex !== undefined) {
        setCurrentRound(lastMessage.questionIndex + 1);
      }
      if (lastMessage.timeLimit) {
        setRoundTimeLeft(lastMessage.timeLimit);
      }
    }

    if (lastMessage.type === 'TEAM_ANSWERS_UPDATED') {
      const { teamId, teamAnswers, isComplete } = lastMessage;
      setTeams((prev) =>
        prev.map((t) => {
          if (t.teamId === teamId && Array.isArray(teamAnswers)) {
            const answeredIds = new Set(teamAnswers.map((a: any) => a.memberId));
            return {
              ...t,
              members: t.members.map((m) => ({
                ...m,
                answeredCurrent: answeredIds.has(m.id),
              })),
            };
          }
          return t;
        })
      );
      if (isComplete) {
        setEvents((prev) => [
          {
            id: String(Date.now()),
            timestamp: Date.now(),
            teamId,
            text: `Team ${teamId} all locked in their answers!`,
            type: 'unanimous',
          },
          ...prev.slice(0, 19),
        ]);
      }
    }

    if (lastMessage.type === 'TEAM_LOBBY_STATE_SYNC' && lastMessage.groups) {
      // Synchronize groups dynamically
    }
  }, [lastMessage]);

  // Round countdown timer
  useEffect(() => {
    if (roundTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setRoundTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [roundTimeLeft]);

  // Ranked teams
  const rankedTeams = useMemo(() => {
    return [...teams]
      .sort((a, b) => b.score - a.score)
      .map((t, idx) => ({ ...t, rank: idx + 1 }));
  }, [teams]);

  const totalParticipants = useMemo(() => {
    return teams.reduce((acc, t) => acc + t.members.length, 0);
  }, [teams]);

  const totalActiveParticipants = useMemo(() => {
    return teams.reduce((acc, t) => acc + t.members.filter((m) => m.status === 'active').length, 0);
  }, [teams]);

  const avgClassAccuracy = useMemo(() => {
    if (teams.length === 0) return 0;
    const sum = teams.reduce((acc, t) => acc + t.accuracy, 0);
    return Math.round(sum / teams.length);
  }, [teams]);

  const selectedTeam = useMemo(() => {
    return rankedTeams.find((t) => t.teamId === selectedTeamId) || null;
  }, [rankedTeams, selectedTeamId]);

  // Controls
  const handleAdvanceQuestion = () => {
    if (socketCtx?.send) {
      socketCtx.send({
        type: 'ADVANCE_QUESTION',
        battleId: battleId || 'team-battle',
      });
    }
    setCurrentRound((prev) => prev + 1);
    setRoundTimeLeft(30);
    // Reset answered current for all members
    setTeams((prev) =>
      prev.map((t) => ({
        ...t,
        members: t.members.map((m) => ({ ...m, answeredCurrent: false })),
      }))
    );
    setEvents((prev) => [
      {
        id: String(Date.now()),
        timestamp: Date.now(),
        text: `Round advanced to Question #${currentRound + 1}`,
        type: 'answer',
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handleEndBattle = () => {
    if (socketCtx?.send) {
      socketCtx.send({
        type: 'END_TEAM_BATTLE',
        battleId: battleId || 'team-battle',
      });
    }
    setEvents((prev) => [
      {
        id: String(Date.now()),
        timestamp: Date.now(),
        text: 'Professor ended the team battle session.',
        type: 'connection',
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handleShuffleTeams = () => {
    // Dynamically shuffle participants across existing configured teams
    const allMembers = teams.flatMap((t) => t.members).sort(() => Math.random() - 0.5);
    const teamCount = Math.max(2, teams.length);

    const newTeams: TeamTelemetry[] = teams.map((t) => ({
      ...t,
      score: 0,
      accuracy: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      members: [],
    }));

    // Round-robin distribution across the configured teams
    allMembers.forEach((m, idx) => {
      const targetTeam = newTeams[idx % teamCount];
      targetTeam.members.push({
        ...m,
        isDesignatedLeader: targetTeam.members.length === 0,
        answeredCurrent: false,
      });
    });

    setTeams(newTeams);
    setEvents((prev) => [
      {
        id: String(Date.now()),
        timestamp: Date.now(),
        text: `Roster re-shuffled across ${teamCount} matchmaking teams`,
        type: 'connection',
      },
      ...prev.slice(0, 19),
    ]);

    if (socketCtx?.send) {
      socketCtx.send({
        type: 'PROF_AUTO_ASSIGN_TEAMS',
        battleId: battleId || 'team-battle',
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-[Manrope] text-white">
      {/* HEADER SECTION: TELEMETRY & MATCH STATUS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users size={14} /> Multi-Team Dynamic Arena
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {teams.length} Teams • {totalParticipants} Players ({totalActiveParticipants} active)
            </span>
          </div>
          <h1 className="font-[Fredoka] text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            Team Battle Professor Command Center
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Server-authoritative team scoring, consensus vote tracking, and dynamic multi-team standings.
          </p>
        </div>

        {/* ROUND TIMER & STATS */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center min-w-[110px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Round</span>
            <span className="font-[Fredoka] text-xl font-bold text-amber-400">
              {currentRound} / {totalRounds}
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center min-w-[110px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Time Left</span>
            <span className={cn(
              "font-[Fredoka] text-xl font-bold flex items-center justify-center gap-1",
              roundTimeLeft <= 5 ? "text-red-400 animate-pulse" : "text-emerald-400"
            )}>
              <Clock size={16} /> {roundTimeLeft}s
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center min-w-[120px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Class Accuracy</span>
            <span className="font-[Fredoka] text-xl font-bold text-cyan-400">
              {avgClassAccuracy}%
            </span>
          </div>

          {/* QUICK CONTROLS */}
          <div className="flex gap-2">
            <button
              onClick={handleAdvanceQuestion}
              className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 font-[Fredoka] font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              title="Manually force advance to next question"
            >
              <SkipForward size={16} /> Advance
            </button>
            <button
              onClick={handleEndBattle}
              className="px-4 py-3 rounded-2xl bg-rose-600/80 hover:bg-rose-600 active:scale-95 font-[Fredoka] font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2"
              title="Conclude match and save results"
            >
              End Match
            </button>
          </div>
        </div>
      </div>

      {/* PRE-MATCH TEAM CONTROLS */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Matchmaking Roster:
          </span>
          <span className="text-xs text-indigo-400 font-semibold">
            {teams.length} Teams Configured • {totalParticipants} Students
          </span>
        </div>

        <button
          onClick={() => handleShuffleTeams()}
          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
        >
          <Shuffle size={14} className="text-indigo-400" /> Re-Shuffle Roster
        </button>
      </div>

      {/* MAIN MONITORING CONTENT: N-TEAMS CARDS & LIVE EVENTS FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* N-TEAMS STANDINGS GRID (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <span className="font-[Fredoka] text-sm font-bold uppercase tracking-wider text-slate-200">
                Live Dynamic Team Standings ({rankedTeams.length} Teams)
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Click any team card to inspect members & votes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rankedTeams.map((team) => {
              const answeredCount = team.members.filter((m) => m.answeredCurrent).length;
              const allAnswered = answeredCount === team.members.length && team.members.length > 0;
              const isSelected = selectedTeamId === team.teamId;

              return (
                <div
                  key={team.teamId}
                  onClick={() => setSelectedTeamId(isSelected ? null : team.teamId)}
                  className={cn(
                    "p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group",
                    isSelected
                      ? "bg-slate-800/90 border-indigo-500 shadow-xl shadow-indigo-500/10"
                      : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                  )}
                >
                  {/* Left color bar accent */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{ backgroundColor: team.color }}
                  />

                  <div className="flex items-start justify-between mb-3 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-[Fredoka] font-bold text-sm bg-slate-800 border border-slate-700">
                        {team.rank === 1 ? <Medal size={16} className="text-amber-400" /> :
                         team.rank === 2 ? <Medal size={16} className="text-slate-300" /> :
                         team.rank === 3 ? <Medal size={16} className="text-amber-600" /> :
                         `#${team.rank}`}
                      </div>
                      <div>
                        <h3 className="font-[Fredoka] text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {team.teamName}
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          {team.members.filter((m) => m.status === 'active').length}/{team.members.length} active
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-[Fredoka] text-lg font-bold text-amber-400 block">
                        {team.score.toLocaleString()} pts
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        {team.accuracy}% accuracy
                      </span>
                    </div>
                  </div>

                  {/* ROUND ANSWER CONSENSUS STATUS */}
                  <div className="bg-slate-800/50 rounded-xl p-2.5 border border-slate-700/40 pl-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                        {allAnswered ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 size={12} /> Team Locked In
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            Answers: {answeredCount}/{team.members.length}
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {Math.round((answeredCount / (team.members.length || 1)) * 100)}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-slate-700/70 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          allAnswered ? "bg-emerald-400" : "bg-indigo-500"
                        )}
                        style={{ width: `${(answeredCount / (team.members.length || 1)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* MINI MEMBER AVATARS */}
                  <div className="flex items-center justify-between mt-3 pl-2 text-xs">
                    <div className="flex -space-x-2 overflow-hidden">
                      {team.members.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            "w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-[9px] text-white",
                            m.answeredCurrent ? "ring-2 ring-emerald-400/80" : ""
                          )}
                          style={{ backgroundColor: team.color }}
                          title={`${m.name} (${m.answeredCurrent ? 'Answered' : 'Thinking...'})`}
                        >
                          {m.name[0]}
                        </div>
                      ))}
                    </div>

                    <span className="text-[11px] text-indigo-400 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Inspect Roster <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIVE TEAM EVENT FEED & ACTIVITY (Col span 1) */}
        <div className="space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col h-[560px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-orange-400" />
                <span className="font-[Fredoka] text-sm font-bold uppercase tracking-wider text-slate-200">
                  Live Team Events
                </span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Real-Time</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {events.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-xs italic">
                  Awaiting team answer submissions and power-ups...
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className={cn(
                      "p-3 rounded-xl border text-xs leading-relaxed transition-all",
                      evt.type === 'streak' ? "bg-amber-950/20 border-amber-500/30 text-amber-200" :
                      evt.type === 'powerup' ? "bg-purple-950/20 border-purple-500/30 text-purple-200" :
                      evt.type === 'unanimous' ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200" :
                      "bg-slate-800/40 border-slate-700/50 text-slate-300"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1 text-[10px] text-slate-400 font-mono">
                      <span>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      {evt.teamName && <span className="font-bold text-white/70">{evt.teamName}</span>}
                    </div>
                    <div>{evt.text}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Broadcasting via Redis</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Feed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SELECTED TEAM DETAIL DRAWER / MODAL */}
      {selectedTeam && (
        <div className="bg-slate-900/95 border-2 border-indigo-500/60 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-[Fredoka] font-bold text-lg text-white"
                style={{ backgroundColor: selectedTeam.color }}
              >
                {selectedTeam.rank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-[Fredoka] text-xl font-bold text-white">
                    {selectedTeam.teamName} — Member Contributions
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-xs font-bold text-slate-300">
                    Rank #{selectedTeam.rank}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Total Score: <strong className="text-amber-400">{selectedTeam.score.toLocaleString()} pts</strong> • Accuracy: <strong className="text-emerald-400">{selectedTeam.accuracy}%</strong> ({selectedTeam.correctAnswers}/{selectedTeam.totalAnswers} correct)
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedTeamId(null)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* MEMBER CONTRIBUTIONS TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-bold">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Current Round Status</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Accuracy</th>
                  <th className="pb-3">Streak</th>
                  <th className="pb-3">Connection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {selectedTeam.members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-semibold text-white flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: selectedTeam.color }}
                      >
                        {member.name[0]}
                      </div>
                      <span>{member.name}</span>
                    </td>
                    <td className="py-3">
                      {member.isDesignatedLeader ? (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px] uppercase">
                          Captain / Tiebreaker
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-normal">Member</span>
                      )}
                    </td>
                    <td className="py-3">
                      {member.answeredCurrent ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs font-bold">
                          <CheckCircle2 size={12} /> Answer Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full text-xs">
                          <Clock size={12} /> Considering...
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-[Fredoka] font-bold text-amber-400">
                      +{member.score} pts
                    </td>
                    <td className="py-3 font-semibold text-emerald-400">
                      {member.accuracy}%
                    </td>
                    <td className="py-3">
                      {member.streak > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center gap-1 w-fit">
                          <Flame size={12} /> {member.streak}🔥
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className={cn(
                        "text-xs font-semibold flex items-center gap-1.5",
                        member.status === 'active' ? "text-emerald-400" : "text-rose-400"
                      )}>
                        <span className={cn("w-2 h-2 rounded-full", member.status === 'active' ? "bg-emerald-400" : "bg-rose-400")} />
                        {member.status === 'active' ? 'Online' : 'Disconnected'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
