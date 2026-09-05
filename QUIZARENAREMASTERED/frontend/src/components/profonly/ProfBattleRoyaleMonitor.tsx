'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy, Users, Skull, Clock, Shield, Flame, Activity,
  Filter, ArrowUpDown, Search, Zap, AlertCircle, CheckCircle2,
  HelpCircle, ChevronRight, X
} from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';

export interface RoyaleStudentTelemetry {
  id: string;
  name: string;
  avatarColor?: string;
  initials?: string;
  isAlive: boolean;
  hp: number;
  maxHp: number;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  lastActivityAt?: number;
  lastAction?: string;
  powerup?: string | null;
  rank?: number;
}

export interface RoyaleEvent {
  id: string;
  timestamp: number;
  text: string;
  type: 'elimination' | 'damage' | 'streak' | 'powerup' | 'join';
}

const DEFAULT_ROYALE_MOCK_STUDENTS: RoyaleStudentTelemetry[] = [
  { id: 'r-1', name: 'Marcus Vance', initials: 'MV', avatarColor: '#3b82f6', isAlive: true, hp: 95, maxHp: 100, score: 1420, accuracy: 94, totalQuestions: 10, correctAnswers: 9, streak: 5, difficulty: 'Hard', powerup: 'Shield', rank: 1, lastAction: 'Answered Correctly (1.1s)' },
  { id: 'r-2', name: 'Sophia Chen', initials: 'SC', avatarColor: '#10b981', isAlive: true, hp: 85, maxHp: 100, score: 1350, accuracy: 91, totalQuestions: 10, correctAnswers: 9, streak: 4, difficulty: 'Hard', powerup: 'Double Points', rank: 2, lastAction: 'Answered Correctly (1.4s)' },
  { id: 'r-3', name: 'Elena Rostova', initials: 'ER', avatarColor: '#f97316', isAlive: true, hp: 80, maxHp: 100, score: 1280, accuracy: 88, totalQuestions: 10, correctAnswers: 8, streak: 3, difficulty: 'Hard', powerup: null, rank: 3, lastAction: 'Answered Correctly (1.8s)' },
  { id: 'r-4', name: 'David Kim', initials: 'DK', avatarColor: '#8b5cf6', isAlive: true, hp: 75, maxHp: 100, score: 1190, accuracy: 85, totalQuestions: 10, correctAnswers: 8, streak: 2, difficulty: 'Medium', powerup: 'Shield', rank: 4, lastAction: 'Answered Correctly (2.0s)' },
  { id: 'r-5', name: 'Rachel Adams', initials: 'RA', avatarColor: '#ec4899', isAlive: true, hp: 70, maxHp: 100, score: 1110, accuracy: 83, totalQuestions: 10, correctAnswers: 8, streak: 2, difficulty: 'Medium', powerup: null, rank: 5, lastAction: 'Answered Correctly (2.2s)' },
  { id: 'r-6', name: 'Liam Miller', initials: 'LM', avatarColor: '#06b6d4', isAlive: true, hp: 65, maxHp: 100, score: 1050, accuracy: 80, totalQuestions: 10, correctAnswers: 7, streak: 1, difficulty: 'Medium', powerup: null, rank: 6, lastAction: 'Answered Correctly (2.5s)' },
  { id: 'r-7', name: 'Lucas Scott', initials: 'LS', avatarColor: '#14b8a6', isAlive: true, hp: 60, maxHp: 100, score: 980, accuracy: 78, totalQuestions: 10, correctAnswers: 7, streak: 1, difficulty: 'Medium', powerup: 'Freeze', rank: 7, lastAction: 'Answered Correctly (2.8s)' },
  { id: 'r-8', name: 'Ava Patel', initials: 'AP', avatarColor: '#eab308', isAlive: true, hp: 55, maxHp: 100, score: 920, accuracy: 76, totalQuestions: 10, correctAnswers: 7, streak: 0, difficulty: 'Medium', powerup: null, rank: 8, lastAction: 'Thinking...' },
  { id: 'r-9', name: 'Ethan Wright', initials: 'EW', avatarColor: '#6366f1', isAlive: true, hp: 50, maxHp: 100, score: 870, accuracy: 74, totalQuestions: 10, correctAnswers: 6, streak: 1, difficulty: 'Medium', powerup: null, rank: 9, lastAction: 'Answered Correctly (3.1s)' },
  { id: 'r-10', name: 'Zoe Saldana', initials: 'ZS', avatarColor: '#d946ef', isAlive: true, hp: 45, maxHp: 100, score: 810, accuracy: 71, totalQuestions: 10, correctAnswers: 6, streak: 0, difficulty: 'Easy', powerup: null, rank: 10, lastAction: 'Thinking...' },
  { id: 'r-11', name: 'James Wilson', initials: 'JW', avatarColor: '#f43f5e', isAlive: true, hp: 40, maxHp: 100, score: 760, accuracy: 69, totalQuestions: 10, correctAnswers: 6, streak: 0, difficulty: 'Easy', powerup: null, rank: 11, lastAction: 'Answered Wrong (-25 HP)' },
  { id: 'r-12', name: 'Emma Watson', initials: 'EW', avatarColor: '#0ea5e9', isAlive: true, hp: 35, maxHp: 100, score: 720, accuracy: 67, totalQuestions: 10, correctAnswers: 5, streak: 0, difficulty: 'Easy', powerup: 'Shield', rank: 12, lastAction: 'Thinking...' },
  { id: 'r-13', name: 'Oliver Twist', initials: 'OT', avatarColor: '#84cc16', isAlive: true, hp: 30, maxHp: 100, score: 680, accuracy: 65, totalQuestions: 10, correctAnswers: 5, streak: 0, difficulty: 'Easy', powerup: null, rank: 13, lastAction: 'Answered Wrong (-25 HP)' },
  { id: 'r-14', name: 'Benjamin Franklin', initials: 'BF', avatarColor: '#a855f7', isAlive: true, hp: 25, maxHp: 100, score: 640, accuracy: 63, totalQuestions: 10, correctAnswers: 5, streak: 0, difficulty: 'Easy', powerup: null, rank: 14, lastAction: 'Low Health Warning' },
  { id: 'r-15', name: 'Harper Lee', initials: 'HL', avatarColor: '#fb923c', isAlive: true, hp: 20, maxHp: 100, score: 590, accuracy: 60, totalQuestions: 10, correctAnswers: 5, streak: 0, difficulty: 'Easy', powerup: null, rank: 15, lastAction: 'Critical HP' },
  { id: 'r-16', name: 'Henry Ford', initials: 'HF', avatarColor: '#2dd4bf', isAlive: true, hp: 15, maxHp: 100, score: 540, accuracy: 58, totalQuestions: 10, correctAnswers: 4, streak: 0, difficulty: 'Easy', powerup: null, rank: 16, lastAction: 'Critical HP' },
  { id: 'r-17', name: 'Grace Hopper', initials: 'GH', avatarColor: '#f472b6', isAlive: true, hp: 10, maxHp: 100, score: 490, accuracy: 55, totalQuestions: 10, correctAnswers: 4, streak: 0, difficulty: 'Easy', powerup: null, rank: 17, lastAction: 'Critical HP' },
  { id: 'r-18', name: 'Alan Turing', initials: 'AT', avatarColor: '#38bdf8', isAlive: true, hp: 5, maxHp: 100, score: 440, accuracy: 52, totalQuestions: 10, correctAnswers: 4, streak: 0, difficulty: 'Easy', powerup: null, rank: 18, lastAction: 'Near Elimination' },
  // Eliminated students
  { id: 'r-19', name: 'Chloe Bennett', initials: 'CB', avatarColor: '#ef4444', isAlive: false, hp: 0, maxHp: 100, score: 390, accuracy: 48, totalQuestions: 8, correctAnswers: 3, streak: 0, difficulty: 'Easy', powerup: null, rank: 19, lastAction: 'Eliminated (Wrong Answer)' },
  { id: 'r-20', name: 'Noah Carter', initials: 'NC', avatarColor: '#dc2626', isAlive: false, hp: 0, maxHp: 100, score: 340, accuracy: 45, totalQuestions: 7, correctAnswers: 3, streak: 0, difficulty: 'Easy', powerup: null, rank: 20, lastAction: 'Eliminated (Round 7)' },
  { id: 'r-21', name: 'Mia Khalifa', initials: 'MK', avatarColor: '#b91c1c', isAlive: false, hp: 0, maxHp: 100, score: 300, accuracy: 42, totalQuestions: 6, correctAnswers: 2, streak: 0, difficulty: 'Easy', powerup: null, rank: 21, lastAction: 'Eliminated (Round 6)' },
  { id: 'r-22', name: 'Ada Lovelace', initials: 'AL', avatarColor: '#991b1b', isAlive: false, hp: 0, maxHp: 100, score: 260, accuracy: 40, totalQuestions: 5, correctAnswers: 2, streak: 0, difficulty: 'Easy', powerup: null, rank: 22, lastAction: 'Eliminated (Round 5)' },
  { id: 'r-23', name: 'Linus Torvalds', initials: 'LT', avatarColor: '#7f1d1d', isAlive: false, hp: 0, maxHp: 100, score: 220, accuracy: 38, totalQuestions: 4, correctAnswers: 1, streak: 0, difficulty: 'Easy', powerup: null, rank: 23, lastAction: 'Eliminated (Round 4)' },
  { id: 'r-24', name: 'Claude Shannon', initials: 'CS', avatarColor: '#450a0a', isAlive: false, hp: 0, maxHp: 100, score: 180, accuracy: 35, totalQuestions: 3, correctAnswers: 1, streak: 0, difficulty: 'Easy', powerup: null, rank: 24, lastAction: 'Eliminated (Round 3)' },
];

const DEFAULT_ROYALE_MOCK_EVENTS: RoyaleEvent[] = [
  { id: 'e-1', timestamp: Date.now() - 4000, text: 'Marcus Vance answered correctly (+140 pts, 5x Streak!)', type: 'streak' },
  { id: 'e-2', timestamp: Date.now() - 9000, text: 'Sophia Chen activated 15 HP Shield Power-up', type: 'powerup' },
  { id: 'e-3', timestamp: Date.now() - 15000, text: '💀 Chloe Bennett was eliminated (HP reached 0)', type: 'elimination' },
  { id: 'e-4', timestamp: Date.now() - 22000, text: '💀 Noah Carter took 25 lethal mistake damage and was eliminated', type: 'elimination' },
  { id: 'e-5', timestamp: Date.now() - 31000, text: 'Elena Rostova answered correctly on Hard difficulty', type: 'damage' },
  { id: 'e-6', timestamp: Date.now() - 45000, text: '💀 Mia Khalifa was eliminated on Question #6', type: 'elimination' },
];

interface ProfBattleRoyaleMonitorProps {
  battleId?: string;
  initialStudents?: RoyaleStudentTelemetry[];
}

export function ProfBattleRoyaleMonitor({
  battleId,
  initialStudents = [],
}: ProfBattleRoyaleMonitorProps) {
  let socketCtx: any = null;
  try {
    socketCtx = useBattleSocketContext();
  } catch {
    // Safe fallback when rendered in standalone preview
  }
  const lastMessage = socketCtx?.lastMessage;

  const [students, setStudents] = useState<RoyaleStudentTelemetry[]>(() => {
    if (initialStudents.length > 0) return initialStudents;
    return DEFAULT_ROYALE_MOCK_STUDENTS;
  });
  const [events, setEvents] = useState<RoyaleEvent[]>(() => {
    if (initialStudents.length > 0) return [];
    return DEFAULT_ROYALE_MOCK_EVENTS;
  });
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Synchronize when real students are provided dynamically by the host lobby
  useEffect(() => {
    if (initialStudents && initialStudents.length > 0) {
      setStudents(initialStudents);
      setEvents([]);
    }
  }, [initialStudents]);

  // Filters & Sorting
  const [filterMode, setFilterMode] = useState<'all' | 'alive' | 'eliminated' | 'high_score' | 'low_hp'>('all');
  const [sortField, setSortField] = useState<'rank' | 'hp' | 'score' | 'accuracy' | 'streak'>('rank');
  const [sortAsc, setSortAsc] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Timers from server
  const [phase, setPhase] = useState<'waiting' | 'round' | 'feedback' | 'powerup' | 'completed'>('round');
  const [phaseEndsAt, setPhaseEndsAt] = useState<number>(Date.now() + 60_000);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [roundNumber, setRoundNumber] = useState(1);

  // Authoritative countdown derived from server phaseEndsAt
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSecondsRemaining(Math.max(0, Math.round((phaseEndsAt - now) / 1000)));
    }, 250);
    return () => clearInterval(timer);
  }, [phaseEndsAt]);

  // Handle Socket Events for Battle Royale Telemetry
  useEffect(() => {
    if (!lastMessage) return;

    switch (lastMessage.type) {
      case 'ROYALE_STATE_SYNC': {
        if (Array.isArray(lastMessage.players)) {
          setStudents(lastMessage.players.map(mapPlayerData));
        }
        if (lastMessage.questionIndex !== undefined) setRoundNumber(lastMessage.questionIndex + 1);
        if (lastMessage.phase) setPhase(lastMessage.phase);
        if (lastMessage.phaseEndsAt) setPhaseEndsAt(lastMessage.phaseEndsAt);
        break;
      }

      case 'ROYALE_ROUND_STARTED': {
        setRoundNumber((lastMessage.questionIndex ?? 0) + 1);
        setPhase('round');
        if (lastMessage.timeLimit) setPhaseEndsAt(Date.now() + lastMessage.timeLimit * 1000);
        addEvent(`⚔ Round ${(lastMessage.questionIndex ?? 0) + 1} started!`, 'join');
        break;
      }

      case 'ROYALE_ROUND_FEEDBACK': {
        setPhase('feedback');
        if (lastMessage.phaseEndsAt) setPhaseEndsAt(lastMessage.phaseEndsAt);
        if (Array.isArray(lastMessage.players)) {
          setStudents(lastMessage.players.map(mapPlayerData));
        }
        break;
      }

      case 'ROYALE_POWERUP_PHASE': {
        setPhase('powerup');
        if (lastMessage.phaseEndsAt) setPhaseEndsAt(lastMessage.phaseEndsAt);
        addEvent(`⚡ Power-up phase initiated`, 'powerup');
        break;
      }

      case 'ROYALE_HP_UPDATED': {
        if (Array.isArray(lastMessage.players)) {
          setStudents(lastMessage.players.map(mapPlayerData));
        }
        break;
      }

      case 'ROYALE_ATTEMPT_RESULT': {
        if (lastMessage.playerId) {
          const isCorrect = lastMessage.isCorrect;
          setStudents((prev) =>
            prev.map((s) => {
              if (s.id === lastMessage.playerId) {
                return {
                  ...s,
                  score: lastMessage.score ?? s.score,
                  streak: lastMessage.streak ?? (isCorrect ? s.streak + 1 : 0),
                  hp: lastMessage.hp ?? s.hp,
                  isAlive: lastMessage.isAlive ?? s.isAlive,
                  correctAnswers: isCorrect ? s.correctAnswers + 1 : s.correctAnswers,
                  totalQuestions: s.totalQuestions + 1,
                  lastActivityAt: Date.now(),
                };
              }
              return s;
            })
          );

          if (!lastMessage.isAlive) {
            addEvent(`☠ ${lastMessage.name || 'Student'} was eliminated!`, 'elimination');
          } else if (lastMessage.damageTaken && lastMessage.damageTaken > 0) {
            addEvent(`💥 ${lastMessage.name || 'Student'} lost ${lastMessage.damageTaken} HP`, 'damage');
          } else if (isCorrect) {
            addEvent(`✨ ${lastMessage.name || 'Student'} answered correctly!`, 'streak');
          }
        }
        break;
      }

      case 'ROYALE_MATCH_ENDED': {
        setPhase('completed');
        if (lastMessage.winner) {
          addEvent(`🏆 ${lastMessage.winner.name || 'Winner'} won the Battle Royale!`, 'streak');
        }
        break;
      }
    }
  }, [lastMessage]);

  const mapPlayerData = (raw: any, index: number): RoyaleStudentTelemetry => ({
    id: raw.id || raw.userId,
    name: raw.name || `Student ${index + 1}`,
    avatarColor: raw.color || raw.avatarColor || '#5B3DF6',
    initials: raw.initials || (raw.name ? raw.name.substring(0, 2).toUpperCase() : 'ST'),
    isAlive: raw.isAlive !== false && (raw.lives === undefined || raw.lives > 0),
    hp: raw.lives !== undefined ? raw.lives * 20 : (raw.hp ?? 100),
    maxHp: 100,
    score: raw.score ?? 0,
    accuracy: raw.accuracy ?? (raw.totalQuestions ? Math.round(((raw.correctAnswers || 0) / raw.totalQuestions) * 100) : 100),
    totalQuestions: raw.totalQuestions ?? 0,
    correctAnswers: raw.correctAnswers ?? 0,
    streak: raw.streak ?? 0,
    difficulty: raw.difficulty || (raw.streak >= 4 ? 'Hard' : raw.streak >= 2 ? 'Medium' : 'Easy'),
    lastActivityAt: raw.lastActivityAt || Date.now(),
    powerup: raw.powerup || null,
  });

  const addEvent = (text: string, type: RoyaleEvent['type']) => {
    setEvents((prev) => [
      { id: `${Date.now()}-${Math.random()}`, timestamp: Date.now(), text, type },
      ...prev.slice(0, 39),
    ]);
  };

  // Rank assignment based on score and survival
  const rankedStudents = useMemo(() => {
    const sorted = [...students].sort((a, b) => {
      if (a.isAlive !== b.isAlive) return a.isAlive ? -1 : 1;
      return b.score - a.score;
    });
    return sorted.map((s, idx) => ({ ...s, rank: idx + 1 }));
  }, [students]);

  // Filtering & Sorting
  const filteredStudents = useMemo(() => {
    return rankedStudents
      .filter((s) => {
        if (filterMode === 'alive') return s.isAlive;
        if (filterMode === 'eliminated') return !s.isAlive;
        if (filterMode === 'high_score') return s.score >= 1000;
        if (filterMode === 'low_hp') return s.isAlive && s.hp <= 40;
        return true;
      })
      .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let diff = 0;
        if (sortField === 'rank') diff = (a.rank || 0) - (b.rank || 0);
        if (sortField === 'hp') diff = a.hp - b.hp;
        if (sortField === 'score') diff = a.score - b.score;
        if (sortField === 'accuracy') diff = a.accuracy - b.accuracy;
        if (sortField === 'streak') diff = a.streak - b.streak;
        return sortAsc ? diff : -diff;
      });
  }, [rankedStudents, filterMode, searchQuery, sortField, sortAsc]);

  // Aggregate Metrics
  const totalCount = students.length;
  const aliveCount = students.filter((s) => s.isAlive).length;
  const eliminatedCount = totalCount - aliveCount;
  const avgAccuracy = totalCount > 0
    ? Math.round(students.reduce((acc, s) => acc + s.accuracy, 0) / totalCount)
    : 0;

  const selectedStudent = useMemo(
    () => rankedStudents.find((s) => s.id === selectedStudentId) || null,
    [rankedStudents, selectedStudentId]
  );

  return (
    <div className="space-y-6 font-[Manrope] text-white">
      {/* 1. TOP SURVIVAL OVERVIEW BAR */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                Competitive Survival Telemetry
              </span>
              <span className="text-xs text-slate-400">• Round {roundNumber}</span>
            </div>
            <h1 className="font-[Fredoka] text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Battle Royale — Professor Monitoring
            </h1>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Authoritative Round Timer */}
            <div className="flex items-center gap-2.5 bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl">
              <Clock size={18} className="text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">
                  {phase === 'powerup' ? 'Power-up Window' : phase === 'feedback' ? 'Feedback' : 'Round Timer'}
                </span>
                <span className="font-[Fredoka] text-xl font-bold text-amber-400 leading-tight">
                  {secondsRemaining}s
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 p-2 px-4 rounded-2xl">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Alive</span>
                <span className="font-[Fredoka] text-lg font-bold text-emerald-400">
                  {aliveCount}
                </span>
              </div>
              <div className="h-6 w-[1px] bg-slate-700" />
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Eliminated</span>
                <span className="font-[Fredoka] text-lg font-bold text-red-400">
                  {eliminatedCount} 💀
                </span>
              </div>
              <div className="h-6 w-[1px] bg-slate-700" />
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Acc</span>
                <span className="font-[Fredoka] text-lg font-bold text-cyan-400">
                  {avgAccuracy}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROLS, SEARCH, AND FILTERS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/70 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Dropdown/Pills */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(['all', 'alive', 'eliminated', 'low_hp'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all uppercase tracking-wider",
                  filterMode === mode
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {mode === 'all' ? 'All' : mode === 'alive' ? 'Alive' : mode === 'eliminated' ? 'Eliminated' : 'Low HP'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ArrowUpDown size={14} />
            <span>Sort by:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
            >
              <option value="rank">Rank</option>
              <option value="hp">HP</option>
              <option value="score">Score</option>
              <option value="accuracy">Accuracy</option>
              <option value="streak">Streak</option>
            </select>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-1 rounded hover:bg-slate-800 text-slate-300"
              title="Toggle sort order"
            >
              {sortAsc ? '▲' : '▼'}
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={cn("px-2 py-1 rounded text-xs font-bold", viewMode === 'grid' ? "bg-indigo-600 text-white" : "text-slate-400")}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={cn("px-2 py-1 rounded text-xs font-bold", viewMode === 'table' ? "bg-indigo-600 text-white" : "text-slate-400")}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT AREA: ROSTER & EVENT STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* STUDENT ROSTER (SCALES 5 TO 50+) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredStudents.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              No students match the current criteria.
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudentId(s.id)}
                  className={cn(
                    "p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group",
                    s.isAlive
                      ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                      : "bg-red-950/10 border-red-900/20 opacity-60 hover:opacity-80",
                    selectedStudentId === s.id && "ring-2 ring-indigo-500 border-indigo-500"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-[Fredoka] text-xs font-bold text-white shrink-0 shadow"
                        style={{ backgroundColor: s.avatarColor || '#5B3DF6' }}
                      >
                        {s.initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-white text-xs block truncate">
                          {s.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          Rank #{s.rank}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider",
                        s.difficulty === 'Hard' ? "bg-purple-500/20 text-purple-300" :
                        s.difficulty === 'Medium' ? "bg-blue-500/20 text-blue-300" :
                        "bg-emerald-500/20 text-emerald-300"
                      )}
                    >
                      {s.difficulty || 'Easy'}
                    </span>
                  </div>

                  {/* HP Bar */}
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className={s.isAlive ? "text-slate-400" : "text-red-400"}>
                        {s.isAlive ? `${s.hp} HP` : 'Eliminated'}
                      </span>
                      <span className="text-amber-400 font-mono">{s.score} pts</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          s.hp > 50 ? "bg-emerald-500" : s.hp > 25 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${Math.max(0, s.hp)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{s.accuracy}% Acc</span>
                    {s.streak > 0 && (
                      <span className="text-orange-400 font-bold flex items-center gap-0.5">
                        <Flame size={10} /> {s.streak}🔥
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* COMPACT TABLE / VIRTUALIZED LIST VIEW FOR 50+ STUDENTS */
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold bg-slate-800/40">
                    <th className="py-2.5 px-4">Rank</th>
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-4">Status & HP</th>
                    <th className="py-2.5 px-4">Score</th>
                    <th className="py-2.5 px-4">Accuracy</th>
                    <th className="py-2.5 px-4">Difficulty</th>
                    <th className="py-2.5 px-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudentId(s.id)}
                      className={cn(
                        "hover:bg-slate-800/30 transition-colors cursor-pointer",
                        selectedStudentId === s.id && "bg-slate-800/50"
                      )}
                    >
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-400">#{s.rank}</td>
                      <td className="py-2.5 px-4 flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white"
                          style={{ backgroundColor: s.avatarColor || '#5B3DF6' }}
                        >
                          {s.initials}
                        </div>
                        <span className="font-semibold text-white truncate max-w-[140px]">{s.name}</span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", s.hp > 50 ? "bg-emerald-500" : s.hp > 25 ? "bg-amber-500" : "bg-red-500")}
                              style={{ width: `${Math.max(0, s.hp)}%` }}
                            />
                          </div>
                          <span className={cn("font-bold", s.isAlive ? "text-slate-300" : "text-red-400")}>
                            {s.isAlive ? `${s.hp} HP` : 'DEAD'}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-400">{s.score}</td>
                      <td className="py-2.5 px-4 text-slate-300">{s.accuracy}%</td>
                      <td className="py-2.5 px-4">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {s.difficulty || 'Easy'}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <ChevronRight size={14} className="text-slate-400 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SIDEBAR: LIVE EVENT LOG & SELECTED STUDENT DETAIL */}
        <div className="space-y-4">
          {/* Selected Student Detail Card */}
          {selectedStudent ? (
            <div className="bg-slate-900/80 border-2 border-indigo-500/50 rounded-2xl p-4 shadow-xl relative animate-in fade-in">
              <button
                onClick={() => setSelectedStudentId(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-[Fredoka] text-sm font-bold text-white shadow"
                  style={{ backgroundColor: selectedStudent.avatarColor || '#5B3DF6' }}
                >
                  {selectedStudent.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{selectedStudent.name}</h4>
                  <span className="text-xs text-indigo-300">Rank #{selectedStudent.rank} • {selectedStudent.isAlive ? 'Alive' : 'Eliminated'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Health</span>
                  <span className="font-[Fredoka] font-bold text-emerald-400 text-sm">{selectedStudent.hp} / 100 HP</span>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Score</span>
                  <span className="font-[Fredoka] font-bold text-amber-400 text-sm">{selectedStudent.score} pts</span>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Accuracy</span>
                  <span className="font-[Fredoka] font-bold text-cyan-400 text-sm">{selectedStudent.accuracy}%</span>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Streak</span>
                  <span className="font-[Fredoka] font-bold text-orange-400 text-sm">{selectedStudent.streak} 🔥</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 pt-1 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Current Difficulty:</span>
                  <strong className="text-white">{selectedStudent.difficulty || 'Easy'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Answers Submitted:</span>
                  <strong className="text-white">{selectedStudent.totalQuestions} questions</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-center text-xs text-slate-500">
              Select any student to inspect their performance details.
            </div>
          )}

          {/* Live Event Feed */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col h-[420px]">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-emerald-400" />
              <span className="font-[Fredoka] text-xs font-bold text-white uppercase tracking-wider">
                Live Battle Events
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {events.length === 0 ? (
                <div className="text-slate-500 text-xs text-center py-12">
                  Awaiting player combat actions...
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className={cn(
                      "p-2.5 rounded-xl border text-xs leading-relaxed",
                      evt.type === 'elimination' ? "bg-red-950/20 border-red-500/30 text-red-300" :
                      evt.type === 'damage' ? "bg-amber-950/20 border-amber-500/30 text-amber-300" :
                      evt.type === 'streak' ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300" :
                      "bg-slate-800/40 border-slate-700/50 text-slate-300"
                    )}
                  >
                    <span className="text-[9px] text-slate-500 block mb-0.5 font-mono">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    {evt.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
