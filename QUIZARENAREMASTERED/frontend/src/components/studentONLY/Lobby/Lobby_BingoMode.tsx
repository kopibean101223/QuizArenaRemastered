'use client';

import { useEffect } from 'react';
import { BookOpen, Grid3X3, Trophy, Users, Zap } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { useBattleSocketContext } from '@/lib/student/battle/useBattleSocketProvider';
import { BattleBingo } from '../Battle_Bingo';

interface BingoLobbyProps {
  battleId: string;
  userId: string;
  userName: string;
}

export function StudentBingoMode({ battleId, userName }: BingoLobbyProps) {
  const { navigate } = useApp();
  const { players, countdown, battleStarted, lastMessage } = useBattleSocketContext();

  useEffect(() => {
    if (lastMessage?.type === 'BINGO_MATCH_ENDED') navigate('results');
  }, [lastMessage, navigate]);

  if (battleStarted) {
    return <BattleBingo battleId={battleId} />;
  }

  return (
    <main className="min-h-screen bg-[#1B1E2B] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC93C]/30 bg-[#FFC93C]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#FFC93C]">
            <Zap size={14} fill="currentColor" /> Bingo Arena
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl">Ready to fill the grid?</h1>
          <p className="mt-3 text-sm text-white/55">Welcome, {userName}. The professor will start the round soon.</p>
        </header>

        <section className="grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#FFC93C]/15 p-3 text-[#FFC93C]"><Grid3X3 size={22} /></div>
                <div>
                  <h2 className="font-bold">Participants</h2>
                  <p className="text-xs text-white/45">Players in this arena</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-[#FFC93C]">{players.length}/40</span>
            </div>

            {players.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
                <Users size={24} className="mb-3 text-white/35" />
                <p className="text-sm font-semibold text-white/65">Waiting for players</p>
                <p className="mt-1 text-xs text-white/35">You are connected to the arena.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/15 p-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: player.color }}>
                      {player.initials}
                    </span>
                    <span className="truncate text-sm font-bold">{player.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-[#2ED47A]/15 p-3 text-[#2ED47A]"><BookOpen size={22} /></div>
              <div><h2 className="font-bold">Arena status</h2><p className="text-xs text-white/45">Live session details</p></div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-4"><span className="text-white/45">Mode</span><strong>Grid Matrix Bingo</strong></div>
              <div className="flex justify-between border-b border-white/10 pb-4"><span className="text-white/45">Player</span><strong>{userName}</strong></div>
              <div className="flex justify-between"><span className="text-white/45">Status</span><strong className="text-[#2ED47A]">Waiting</strong></div>
            </div>
          </aside>
        </section>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white/55">
          <Trophy size={17} className="text-[#FFC93C]" /> Waiting for the professor to start the match
        </div>
        {countdown !== null && <p className="mt-4 text-center text-sm font-extrabold text-[#FFC93C]">Starting in {countdown}...</p>}
      </div>
    </main>
  );
}
