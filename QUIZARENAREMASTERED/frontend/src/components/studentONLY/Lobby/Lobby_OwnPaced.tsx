'use client';

import { useApp } from "../../../context/AppContext";
import { Check } from "lucide-react";
import { useLobbySocket } from "@/lib/student/battle/useLobbySockets";
import { C, PlayerStatus } from "../ComponentsLobby/LobbyConstants";
import { SelfPacedBattle } from "../Battle_OwnPace";
import type { LobbyModeProps } from "./Lobby_LiveQuiz";

const STATUS_COLOR: Record<PlayerStatus, string> = {
  waiting: "rgba(255,255,255,0.25)",
  answering: C.yellow,
  finished: C.green,
};

/**
 * Own-Paced has no shared start — the student goes straight into
 * SelfPacedBattle the moment they join. This wrapper adds a small classmates
 * strip so they can still see who's around and how far along everyone is.
 *
 * NOTE: the "answering" / "finished" status per classmate depends on the
 * server broadcasting progress events for self-paced sessions (e.g. a
 * SELF_PACED_PROGRESS / STUDENT_FINISHED message alongside the existing
 * SELF_PACED_STATE_SYNC). Until that's wired up server-side, classmates will
 * simply show as "waiting" once they join — the roster itself (via
 * PLAYER_JOINED) already works today.
 */
export function Lobby_OwnPaced({ sessionId, roomCode }: LobbyModeProps) {
  const { user } = useApp();

  const studentName =
    user?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    "Unknown Student";

  const { players, setPlayers } = useLobbySocket({
    sessionId,
    userId: user?.id,
    userName: studentName,
    enabled: true,
    autoCountdown: false, // no shared countdown in Own-Paced
    onMessage: (data) => {
      const status: PlayerStatus | null =
        data.type === "SELF_PACED_PROGRESS" || data.type === "PLAYER_PROGRESS" ? "answering" :
        data.type === "STUDENT_FINISHED" || data.type === "SELF_PACED_COMPLETE" ? "finished" :
        null;

      if (!status) return;
      const targetId = data.userId || data.playerId;
      if (!targetId) return;

      setPlayers((prev) =>
        prev.map((p) => (p.id === targetId ? { ...p, status } : p))
      );
    },
  });

  return (
    <div style={{ position: "relative" }}>
      <SelfPacedBattle battleId={sessionId} />

      {players.length > 0 && (
        <div style={{
          position: "fixed", top: 84, right: 20, zIndex: 300,
          display: "flex", flexDirection: "column", gap: 8,
          background: "rgba(27,30,43,0.85)", backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 18,
          padding: "12px 14px", maxHeight: "60vh", overflowY: "auto", width: 190,
        }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800,
            color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Classmates in {roomCode}
          </span>
          {players.map((p) => {
            const status = p.status || "waiting";
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative", width: 30, height: 30, flexShrink: 0 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: `linear-gradient(145deg, ${p.color}, ${p.color}cc)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Fredoka, sans-serif", fontSize: 11, fontWeight: 700, color: "#fff",
                    boxShadow: `0 0 0 2px ${STATUS_COLOR[status]}`,
                  }}>
                    {p.initials}
                  </div>
                  {status === "finished" && (
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 12, height: 12, borderRadius: "50%",
                      background: C.green, border: "2px solid #1B1E2B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={7} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.name}
                  </span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 9, fontWeight: 600, color: STATUS_COLOR[status], textTransform: "capitalize" }}>
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}