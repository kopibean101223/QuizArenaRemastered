'use client';

import React, { useEffect } from 'react';
import { useApp } from "../../../context/AppContext";
import { StudentTopBar } from "../../shared/StudentTopBar";
import { Zap, Users, Trophy } from "lucide-react";
import { useBattleSocketContext } from "@/lib/student/battle/useBattleSocketProvider";
import { C, CAPACITY } from "../ComponentsLobby/LobbyConstants";
import { PlayerChip } from "../ComponentsLobby/PlayerChip";
import { EmptySlot } from "../ComponentsLobby/EmptySlot";
import { CountdownDisplay } from "../ComponentsLobby/CountdownDisplay";
import { LiveBattle } from "../Battle_LiveQuiz";

export interface LobbyModeProps {
  sessionId: string;
  roomCode: string;
}

/**
 * The classic "everyone answers together, on the professor's clock" lobby.
 *
 * No longer owns its own WebSocket (useLobbySocket) — the connection now
 * lives in BattleSocketProvider, mounted once above both this component and
 * LiveBattle (see StudentDashboard.tsx). That fixes a real bug: this
 * component doesn't unmount when battleStarted flips true (it just returns
 * <LiveBattle/> instead of its own JSX below), so its old socket kept
 * running for the whole battle in parallel with LiveBattle's own socket —
 * two live connections at once. Reading from context instead means there's
 * only ever one.
 */
export function Lobby_LiveQuiz({ sessionId, roomCode }: LobbyModeProps) {
  const { user, navigate } = useApp();
  const { players, countdown, battleStarted, lastMessage } = useBattleSocketContext();

  useEffect(() => {
    if (lastMessage?.type === 'ROOM_COMPLETED' || lastMessage?.type === 'QUIZ_COMPLETED' || lastMessage?.status === 'completed') {
      navigate('results');
    }
  }, [lastMessage, navigate]);

  if (battleStarted) {
    return <LiveBattle battleId={sessionId} />;
  }

  const emptySlots = Math.max(0, CAPACITY - players.length);

  return (
    <>
      <StudentTopBar />
      <div style={{ minHeight: "100vh", background: C.navy, display: "flex", flexDirection: "column", paddingTop: 48, paddingBottom: 32 }}>

        <div style={{ textAlign: "center", marginBottom: 24, padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 12 }}>
            <Zap size={13} fill={C.yellow} color="transparent" />
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Live Quiz Lobby
            </span>
          </div>
          <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700, color: "#fff", margin: 0 }}>
            Ready to <span style={{ color: C.yellow }}>Battle?</span>
          </h1>
        </div>

        <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

          <div style={{ width: "100%", maxWidth: 600 }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12, textAlign: "center" }}>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.green, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Successfully Joined Room
              </p>
              <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 42, fontWeight: 700, color: C.yellow, letterSpacing: "0.15em" }}>
                {roomCode}
              </span>
            </div>
          </div>

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