import { useState, useEffect } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import { ProfEndlessMode } from "../gamemodes/ProfEndlessMode";
import { ProfBossRaid } from "../gamemodes/ProfBossRaid";
import { ProfBingoMode } from "../gamemodes/ProfBingoMode";
import { ProfChaosClash } from "../gamemodes/ProfChaosClash";
import { ProfBattleRoyaleMonitor } from "./ProfBattleRoyaleMonitor";
import { ProfTeamBattleMonitor } from "./ProfTeamBattleMonitor";
import { ProfIndividualMonitor } from "./ProfIndividualMonitor";
import { StudentEndlessMode } from "../gamemodes/StudentEndlessMode";
import { StudentBossRaid } from "../gamemodes/StudentBossRaid";
import { StudentBingoMode } from "../gamemodes/StudentBingoMode";
import { StudentChaosClash } from "../gamemodes/StudentChaosClash";
import {
  Trophy, Users, Flame, Shield, Zap, Clock, Skull, Swords,
  BarChart3, Play, Pause, SkipForward, Sparkles, AlertTriangle,
  Radio, CheckCircle2, Heart, Award, RefreshCw, Send
} from "lucide-react";
import { cn } from "@/components/ui/utils";

export function SolutionAnalyzer() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [protoTab, setProtoTab] = useState<'individual' | 'team' | 'royale' | 'boss' | 'endless'>('individual');

  const renderActiveMode = () => {
    switch (activeMode) {
      case "prof_normal": return <ProfBossRaid />;
      case "prof_royale": return <ProfBattleRoyaleMonitor />;
      case "prof_team": return <ProfTeamBattleMonitor />;
      case "prof_endless": return <ProfEndlessMode session={{ status: 'ACTIVE', id: 'mock-session-id' }} />;
      case "prof_bingo": return <ProfBingoMode />;
      case "prof_chaos": return <ProfChaosClash />;
      case "student_normal": return <StudentBossRaid />;
      case "student_endless": return <StudentEndlessMode sessionId="mock-session-id" />;
      case "student_bingo": return <StudentBingoMode />;
      case "student_chaos": return <StudentChaosClash />;
      case "prototype_views": return <SynchronizedViewsPrototype initialTab={protoTab} onChangeTab={setProtoTab} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white font-[Manrope] overflow-hidden">
      <ProfSidebar />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeMode ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setActiveMode(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-sm font-semibold flex items-center gap-2 border border-slate-700"
              >
                ← Back to Game Modes Menu
              </button>

              {activeMode === "prototype_views" && (
                <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-bold px-2 uppercase">Prototype:</span>
                  {(['individual', 'team', 'royale', 'boss', 'endless'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setProtoTab(tab)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider",
                        protoTab === tab
                          ? "bg-[var(--gm-indigo,#5b3df6)] text-white shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {tab === 'individual' ? 'Individual' :
                       tab === 'team' ? 'Team (Bracket)' :
                       tab === 'royale' ? 'Battle Royale' :
                       tab === 'boss' ? 'Boss Raid' : 'Endless'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {renderActiveMode()}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="font-[Fredoka] text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Game Modes & Synchronized Views Command Center
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Explore real-time synchronized battle views, interactive professor control mockups, and student views.
              </p>
            </div>

            {/* FEATURED: SYNCHRONIZED PROFESSOR VIEWS PROTOTYPE */}
            <div className="mb-10 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 border-2 border-indigo-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={14} className="text-amber-400" />
                  Interactive Spec 47 Prototypes
                </div>
                <h2 className="font-[Fredoka] text-2xl md:text-3xl font-bold text-white mb-2">
                  5 Professor Battle Synchronized View Prototypes
                </h2>
                <p className="text-slate-300 text-sm max-w-2xl mb-6 leading-relaxed">
                  Experience server-authoritative live views for all 5 modes: <strong>Individual</strong> (analytics & response distribution), <strong>Team</strong> (bracket & tug-of-war), <strong>Battle Royale</strong> (shrinking storm radar & survivor roster), <strong>Boss Raid</strong> (cinematic damage meter & stagger), and <strong>Endless</strong> (hazard zone tracker & survival grid).
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setProtoTab('individual');
                      setActiveMode('prototype_views');
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-[Fredoka] font-bold text-white text-sm uppercase tracking-wider shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Radio size={16} /> Launch All 5 Views Prototype
                  </button>
                  <button
                    onClick={() => {
                      setProtoTab('boss');
                      setActiveMode('prototype_views');
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-[Fredoka] font-bold text-sm tracking-wide border border-slate-600 transition-all flex items-center gap-2"
                  >
                    <Swords size={16} className="text-red-400" /> Boss Raid Cinematic View
                  </button>
                  <button
                    onClick={() => {
                      setProtoTab('royale');
                      setActiveMode('prototype_views');
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-[Fredoka] font-bold text-sm tracking-wide border border-slate-600 transition-all flex items-center gap-2"
                  >
                    <Skull size={16} className="text-emerald-400" /> Battle Royale Storm View
                  </button>
                  <button
                    onClick={() => {
                      setProtoTab('endless');
                      setActiveMode('prototype_views');
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-[Fredoka] font-bold text-sm tracking-wide border border-slate-600 transition-all flex items-center gap-2"
                  >
                    <Flame size={16} className="text-amber-400" /> Endless Hazard View
                  </button>
                </div>
              </div>
            </div>

            {/* CLASSIC GAME MODES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Professor View Column */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    👨‍🏫
                  </div>
                  <h2 className="font-[Fredoka] text-xl font-bold text-blue-300">Professor Live Gamemodes</h2>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveMode("prof_normal")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Boss Raid (Normal Mode)</span>
                    <span className="text-xs text-slate-400">Server-authoritative HP scaling, stagger meter, and skill deck</span>
                  </button>
                  <button onClick={() => setActiveMode("prof_royale")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Battle Royale Monitor</span>
                    <span className="text-xs text-slate-400">Survival telemetry, HP tracking, alive/eliminated roster (zero storm)</span>
                  </button>
                  <button onClick={() => setActiveMode("prof_team")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Team Battle Monitor</span>
                    <span className="text-xs text-slate-400">Dynamic N-team standings, consensus breakdown, member contributions</span>
                  </button>
                  <button onClick={() => setActiveMode("prof_endless")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Endless Mode (Async Session)</span>
                    <span className="text-xs text-slate-400">Safe Zone vs Storm timer, student survival HP roster</span>
                  </button>
                  <button onClick={() => setActiveMode("prof_bingo")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Bingo Mode</span>
                    <span className="text-xs text-slate-400">Board distribution and pattern completion monitor</span>
                  </button>
                  <button onClick={() => setActiveMode("prof_chaos")} style={btnStyle} className="hover:border-indigo-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Chaos Clash</span>
                    <span className="text-xs text-slate-400">Card inventory and real-time spell warfare tracking</span>
                  </button>
                </div>
              </div>

              {/* Student View Column */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    🎓
                  </div>
                  <h2 className="font-[Fredoka] text-xl font-bold text-emerald-300">Student Live Gamemodes</h2>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveMode("student_normal")} style={btnStyle} className="hover:border-emerald-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Student Boss Raid</span>
                    <span className="text-xs text-slate-400">Presentation-only combat, floating damage, True/False override banner</span>
                  </button>
                  <button onClick={() => setActiveMode("student_endless")} style={btnStyle} className="hover:border-emerald-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Student Endless Mode</span>
                    <span className="text-xs text-slate-400">Safe zone countdown, storm hazard screen shake, checkpoints</span>
                  </button>
                  <button onClick={() => setActiveMode("student_bingo")} style={btnStyle} className="hover:border-emerald-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Student Bingo Mode</span>
                    <span className="text-xs text-slate-400">5x5 interactive tile grid with pattern victory detection</span>
                  </button>
                  <button onClick={() => setActiveMode("student_chaos")} style={btnStyle} className="hover:border-emerald-500 hover:bg-slate-800">
                    <span className="font-bold text-white block">Student Chaos Clash</span>
                    <span className="text-xs text-slate-400">Action hand deck, shield cards, and counter-play</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SYNCHRONIZED VIEWS PROTOTYPE COMPONENT (5 MODES)
// ─────────────────────────────────────────────────────────────────────────────
function SynchronizedViewsPrototype({
  initialTab,
  onChangeTab,
}: {
  initialTab: 'individual' | 'team' | 'royale' | 'boss' | 'endless';
  onChangeTab: (tab: 'individual' | 'team' | 'royale' | 'boss' | 'endless') => void;
}) {
  return (
    <div className="space-y-6">
      {initialTab === 'individual' && <ProfIndividualMonitor />}
      {initialTab === 'team' && <ProfTeamBattleMonitor />}
      {initialTab === 'royale' && <ProfBattleRoyaleMonitor />}
      {initialTab === 'boss' && <ProfBossRaid />}
      {initialTab === 'endless' && <ProfEndlessMode session={{ status: 'ACTIVE', id: 'mock-session-id' }} />}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// 2. TEAM MODE PROTOTYPE (BRACKET & TUG-OF-WAR)
// ─────────────────────────────────────────────────────────────────────────────
function TeamModePrototype() {
  const [alphaScore, setAlphaScore] = useState(4850);
  const [betaScore, setBetaScore] = useState(4620);

  const total = alphaScore + betaScore;
  const alphaPct = Math.round((alphaScore / total) * 100);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* TUG OF WAR HEADER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="font-[Fredoka] text-xl font-bold text-red-400">Team Alpha (Titans)</span>
            <span className="font-[Fredoka] text-2xl font-bold text-white">{alphaScore.toLocaleString()} pts</span>
          </div>

          <span className="text-xs uppercase font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            Tug-of-War Battle
          </span>

          <div className="flex items-center gap-3">
            <span className="font-[Fredoka] text-2xl font-bold text-white">{betaScore.toLocaleString()} pts</span>
            <span className="font-[Fredoka] text-xl font-bold text-blue-400">Team Beta (Knights)</span>
            <div className="w-4 h-4 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* Dynamic Tug of War Bar */}
        <div className="relative w-full h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 flex">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-700 flex items-center justify-start pl-3 text-xs font-bold"
            style={{ width: `${alphaPct}%` }}
          >
            {alphaPct}%
          </div>
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-700 flex items-center justify-end pr-3 text-xs font-bold"
            style={{ width: `${100 - alphaPct}%` }}
          >
            {100 - alphaPct}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TEAM STANDINGS & CONTRIBUTIONS */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-[Fredoka] text-base font-bold text-white mb-4 flex items-center gap-2">
            <Users size={18} className="text-indigo-400" /> Member Contribution Breakdown
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-red-400 mb-2">
                <span>Team Alpha Roster (4 Members)</span>
                <span>Lead: +230 pts</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Marcus Vance", pts: 1650, accuracy: 95 },
                  { name: "David Kim", pts: 1320, accuracy: 88 },
                  { name: "Rachel Adams", pts: 1050, accuracy: 82 },
                  { name: "Liam Miller", pts: 830, accuracy: 76 },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between bg-slate-800/40 p-2.5 rounded-xl text-xs">
                    <span className="font-semibold text-white">{m.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{m.accuracy}% Acc</span>
                      <span className="font-[Fredoka] font-bold text-amber-400">+{m.pts} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-blue-400 mb-2">
                <span>Team Beta Roster (4 Members)</span>
                <span>Trailing: -230 pts</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Sophia Chen", pts: 1590, accuracy: 92 },
                  { name: "Elena Rostova", pts: 1380, accuracy: 90 },
                  { name: "Chloe Bennett", pts: 920, accuracy: 80 },
                  { name: "Noah Carter", pts: 730, accuracy: 72 },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between bg-slate-800/40 p-2.5 rounded-xl text-xs">
                    <span className="font-semibold text-white">{m.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{m.accuracy}% Acc</span>
                      <span className="font-[Fredoka] font-bold text-cyan-400">+{m.pts} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TOURNAMENT BRACKET VISUALIZER */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-[Fredoka] text-base font-bold text-white mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-400" /> Tournament Bracket Standings
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Semi-Final 1 (Completed)</span>
                <div className="flex justify-between text-xs font-semibold py-1 text-emerald-400">
                  <span>Team Alpha (Titans)</span> <span>4,850 pts (WIN)</span>
                </div>
                <div className="flex justify-between text-xs font-semibold py-1 text-slate-500">
                  <span>Team Gamma (Dragons)</span> <span>3,420 pts</span>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Semi-Final 2 (Completed)</span>
                <div className="flex justify-between text-xs font-semibold py-1 text-cyan-400">
                  <span>Team Beta (Knights)</span> <span>4,620 pts (WIN)</span>
                </div>
                <div className="flex justify-between text-xs font-semibold py-1 text-slate-500">
                  <span>Team Delta (Eagles)</span> <span>3,810 pts</span>
                </div>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={16} className="text-amber-400" />
                  <span className="font-[Fredoka] text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Grand Championship Finals (Live Now)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-red-400">Team Alpha</span>
                  <span className="text-xs text-slate-400">VS</span>
                  <span className="text-blue-400">Team Beta</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => {
                setAlphaScore((prev) => prev + 150);
              }}
              className="flex-1 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 font-[Fredoka] text-xs font-bold text-white transition-all"
            >
              +150 Alpha Points
            </button>
            <button
              onClick={() => {
                setBetaScore((prev) => prev + 150);
              }}
              className="flex-1 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 font-[Fredoka] text-xs font-bold text-white transition-all"
            >
              +150 Beta Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. BATTLE ROYALE MODE PROTOTYPE (STORM & SURVIVORS)
// ─────────────────────────────────────────────────────────────────────────────
function BattleRoyaleModePrototype() {
  const [survivors, setSurvivors] = useState(18);
  const total = 30;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* STORM BANNER */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-purple-950/80 border border-red-500/40 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-xs uppercase flex items-center gap-1">
              <AlertTriangle size={12} /> Phase 3 Storm Active
            </span>
            <span className="text-xs text-slate-400">• Shrinking Safe Zone</span>
          </div>
          <h2 className="font-[Fredoka] text-xl font-bold text-white">
            Battle Royale Survivor Control
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Survivors</span>
            <span className="font-[Fredoka] text-2xl font-bold text-emerald-400">{survivors} / {total}</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Eliminated</span>
            <span className="font-[Fredoka] text-2xl font-bold text-red-400">{total - survivors} 💀</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RADAR & ARENA CIRCLE VISUALIZER */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[340px]">
          <span className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">
            Arena Safe Zone vs Storm Radar
          </span>

          <div className="relative w-64 h-64 rounded-full border-2 border-dashed border-red-500/50 bg-red-950/20 flex items-center justify-center">
            {/* Storm Pulse Rings */}
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping pointer-events-none" />

            {/* Inner Safe Circle */}
            <div className="w-36 h-36 rounded-full border-2 border-emerald-400 bg-emerald-950/30 flex items-center justify-center relative shadow-[0_0_25px_rgba(52,211,153,0.3)]">
              <Shield size={24} className="text-emerald-400 opacity-60" />
              <span className="absolute bottom-2 text-[10px] font-bold text-emerald-300 uppercase">Safe Zone</span>

              {/* Player Dots Inside Safe Zone */}
              <div className="absolute top-6 left-8 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute top-10 right-10 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute bottom-8 right-8 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="absolute bottom-8 left-10 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Player Dots In Storm */}
            <div className="absolute top-4 left-10 w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce" title="In Storm!" />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce" title="In Storm!" />
          </div>

          <span className="text-[11px] text-slate-400 mt-4 text-center">
            Hazard Storm Damage: <strong>5 HP / second</strong> outside circle
          </span>
        </div>

        {/* KILL FEED & ELIMINATION LOG */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-[Fredoka] text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Skull size={18} className="text-red-400" /> Live Elimination Log
              </span>
              <span className="text-xs text-slate-400">Real-time Ticker</span>
            </div>

            <div className="space-y-2">
              {[
                { time: "Just now", text: "Student_12 was eliminated by the Storm (Safe Zone collapse)", type: "storm" },
                { time: "18s ago", text: "Alex Vance answered incorrectly and took lethal storm damage", type: "combat" },
                { time: "42s ago", text: "Phase 3 initiated: Safe zone diameter decreased by 25%", type: "zone" },
                { time: "1m ago", text: "Maya Lin was eliminated on question #7 timeout", type: "timeout" },
                { time: "1m 30s ago", text: "Safe Drop: 5 HP Shield delivered to Marcus Vance", type: "drop" },
              ].map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-xl border text-xs flex items-center justify-between",
                    log.type === 'storm' ? "bg-red-950/20 border-red-500/30 text-red-300" :
                    log.type === 'zone' ? "bg-purple-950/20 border-purple-500/30 text-purple-300" :
                    log.type === 'drop' ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300" :
                    "bg-slate-800/40 border-slate-700/50 text-slate-300"
                  )}
                >
                  <span>{log.text}</span>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-3">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setSurvivors((prev) => Math.max(1, prev - 1))}
              className="flex-1 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 font-[Fredoka] text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5"
            >
              <Skull size={14} /> Simulate Elimination
            </button>
            <button
              onClick={() => setSurvivors(30)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-[Fredoka] text-xs font-bold text-white transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Reset Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BOSS RAID MODE PROTOTYPE (CINEMATIC VIEW & SKILL DECK)
// ─────────────────────────────────────────────────────────────────────────────
function BossRaidModePrototype() {
  const [bossHp, setBossHp] = useState(64200);
  const maxBossHp = 100000;
  const [stagger, setStagger] = useState(2);
  const [overrideActive, setOverrideActive] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const hpPct = Math.round((bossHp / maxBossHp) * 100);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {toastMsg && (
        <div className="bg-purple-500/20 border border-purple-500/40 text-purple-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <Sparkles size={16} /> {toastMsg}
        </div>
      )}

      {/* EPIC CINEMATIC BOSS STAGE */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase mb-4">
          <Flame size={14} /> Phase 2: Stagger Gauge Vulnerability
        </div>

        {/* Boss Avatar & Sprite */}
        <div className="relative mx-auto w-28 h-28 rounded-3xl bg-gradient-to-tr from-red-600 via-purple-600 to-indigo-600 p-1 mb-4 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
          <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-5xl animate-pulse">
            👹
          </div>
          {overrideActive && (
            <div className="absolute -top-3 -right-3 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow">
              Override!
            </div>
          )}
        </div>

        <h2 className="font-[Fredoka] text-2xl font-bold text-white mb-1">
          Cybernetic Overlord Primus
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Boss Raid Class DPS Target • 32 Students Linked
        </p>

        {/* BOSS MULTI-PHASE HP BAR */}
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-red-400">Boss HP: {bossHp.toLocaleString()} / {maxBossHp.toLocaleString()}</span>
            <span className="text-white">{hpPct}%</span>
          </div>

          <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                hpPct > 50 ? "bg-gradient-to-r from-red-500 to-rose-600" :
                hpPct > 25 ? "bg-gradient-to-r from-amber-500 to-orange-600" :
                "bg-gradient-to-r from-red-600 to-red-800 animate-pulse"
              )}
              style={{ width: `${hpPct}%` }}
            />
          </div>

          {/* Stagger Gauge */}
          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-slate-400 font-semibold">Stagger Meter (3 for 10s Stun):</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-8 h-2 rounded-full border transition-all",
                    s <= stagger ? "bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "bg-slate-800 border-slate-700"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CLASS DPS METER */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-[Fredoka] text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={18} className="text-emerald-400" /> Class Damage Meter (DPS: 4,820)
            </span>
            <span className="text-xs text-slate-400">Top Attackers</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Marcus Vance", dmg: 14200, pct: 28 },
              { name: "Sophia Chen", dmg: 11800, pct: 23 },
              { name: "Elena Rostova", dmg: 9400, pct: 18 },
              { name: "David Kim", dmg: 7600, pct: 15 },
              { name: "Rest of Class (28 students)", dmg: 8200, pct: 16 },
            ].map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-white">{d.name}</span>
                  <span className="text-amber-400 font-mono font-bold">{d.dmg.toLocaleString()} DMG ({d.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${d.pct * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROFESSOR SKILL CASTING DECK */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-[Fredoka] text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap size={18} className="text-amber-400" /> Professor Boss Skill Deck
              </span>
              <span className="text-xs text-slate-400">Interactive Controls</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setOverrideActive(true);
                  triggerToast("⚡ TRUE/FALSE OVERRIDE ACTIVATED! Custom question deployed to class.");
                }}
                className="w-full p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 hover:bg-purple-900/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-[Fredoka] text-sm font-bold text-purple-300 block">
                    True/False Override Protocol
                  </span>
                  <span className="text-xs text-slate-400">
                    Bypasses standard question and locks students into 50/50 judgment call
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase">
                  Cast
                </span>
              </button>

              <button
                onClick={() => {
                  triggerToast("⏳ TIME SQUEEZE CAST! Class timer reduced by 10 seconds.");
                }}
                className="w-full p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:bg-blue-900/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-[Fredoka] text-sm font-bold text-blue-300 block">
                    Time Squeeze
                  </span>
                  <span className="text-xs text-slate-400">
                    Cuts round timer by 10 seconds to pressure students
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase">
                  Cast
                </span>
              </button>

              <button
                onClick={() => {
                  setStagger(3);
                  triggerToast("💥 BOSS STAGGERED! Stunned for 10 seconds. Double damage active!");
                }}
                className="w-full p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/40 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-[Fredoka] text-sm font-bold text-amber-300 block">
                    Trigger Boss Stagger
                  </span>
                  <span className="text-xs text-slate-400">
                    Fills stagger meter to 3/3, triggering a 10-second vulnerable stun phase
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase">
                  Cast
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setBossHp((prev) => Math.max(0, prev - 5000))}
              className="flex-1 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 font-[Fredoka] text-xs font-bold text-white transition-all"
            >
              Simulate 5,000 Raid Damage
            </button>
            <button
              onClick={() => setBossHp(maxBossHp)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-[Fredoka] text-xs font-bold text-white transition-all"
            >
              Reset Boss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ENDLESS MODE PROTOTYPE (HAZARD ZONE & WAVE TRACKER)
// ─────────────────────────────────────────────────────────────────────────────
function EndlessModePrototype() {
  const [stage, setStage] = useState(14);
  const [dangerAlert, setDangerAlert] = useState(true);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* STAGE & WAVE BANNER */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-xs uppercase">
              Endless Wave Monitor
            </span>
            <span className="text-xs text-slate-400">• Checkpoint every 5 stages</span>
          </div>
          <h2 className="font-[Fredoka] text-xl font-bold text-white flex items-center gap-2">
            Stage {stage}: Rapid Convergence
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Safe Window</span>
            <span className="font-[Fredoka] text-lg font-bold text-emerald-400">7s Safe</span>
          </div>
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Checkpoint</span>
            <span className="font-[Fredoka] text-lg font-bold text-amber-400">Stage 15 (Next!)</span>
          </div>
        </div>
      </div>

      {/* DANGER ZONE STORM WARNING */}
      {dangerAlert && (
        <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex items-center justify-between text-red-300 text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-400 animate-pulse" size={18} />
            <span>
              <strong>Storm Hazard Active:</strong> 3 students currently in Hazard Zone taking <strong>2 HP/sec</strong> damage!
            </span>
          </div>
          <button
            onClick={() => setDangerAlert(false)}
            className="text-xs text-red-400 hover:text-white underline font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* STUDENT SURVIVAL GRID */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-[Fredoka] text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Heart size={18} className="text-red-400" /> Student Survival Grid
          </span>
          <span className="text-xs text-slate-400">Live Stage & Health Meters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Marcus Vance", stage: 14, hp: 95, combo: 8, status: "Safe Window" },
            { name: "Sophia Chen", stage: 14, hp: 80, combo: 6, status: "Safe Window" },
            { name: "Elena Rostova", stage: 14, hp: 65, combo: 4, status: "Hazard Storm" },
            { name: "David Kim", stage: 13, hp: 45, combo: 2, status: "Hazard Storm" },
            { name: "Lucas Scott", stage: 13, hp: 30, combo: 1, status: "Hazard Storm" },
            { name: "Chloe Bennett", stage: 12, hp: 0, combo: 0, status: "Eliminated" },
            { name: "Noah Carter", stage: 11, hp: 0, combo: 0, status: "Eliminated" },
            { name: "Sarah Jenkins", stage: 14, hp: 85, combo: 5, status: "Safe Window" },
          ].map((s) => (
            <div
              key={s.name}
              className={cn(
                "p-4 rounded-2xl border transition-all",
                s.status === 'Eliminated' ? "bg-red-950/10 border-red-900/30 opacity-60" :
                s.status === 'Hazard Storm' ? "bg-amber-950/20 border-amber-500/40" :
                "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-sm truncate">{s.name}</span>
                <span className={cn(
                  "text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase",
                  s.status === 'Safe Window' ? "bg-emerald-500/20 text-emerald-400" :
                  s.status === 'Hazard Storm' ? "bg-red-500/20 text-red-400 animate-pulse" :
                  "bg-slate-800 text-slate-500"
                )}>
                  {s.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Stage {s.stage}</span>
                <span className="font-bold text-white">{s.hp} HP</span>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    s.hp > 50 ? "bg-emerald-500" : s.hp > 25 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${s.hp}%` }}
                />
              </div>

              {s.combo > 1 && (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                  {s.combo}× Combo
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-3">
        <button
          onClick={() => setStage((prev) => prev + 1)}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-[Fredoka] font-bold text-white text-xs uppercase tracking-wider transition-all"
        >
          Advance Wave to Stage {stage + 1}
        </button>
        <button
          onClick={() => setDangerAlert(true)}
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-[Fredoka] font-bold text-white text-xs uppercase tracking-wider transition-all"
        >
          Trigger Hazard Warning Alert
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "1rem",
  backgroundColor: "#1e293b",
  color: "#f8fafc",
  border: "1px solid #334155",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "left" as const,
  transition: "all 0.2s",
};

