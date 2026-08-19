import React from "react";
import { Crown, Check } from "lucide-react";
import { LobbyPlayerT, C } from "./LobbyConstants";

export function PlayerChip({ player, animate }: { player: LobbyPlayerT; animate?: boolean }) {
  // Own-Paced classmates carry a `status` instead of the shared isReady flag —
  // fall back to isReady-based styling when status isn't set (Live/Team/Royale).
  const ringColor =
    player.status === "finished" ? C.green :
    player.status === "answering" ? C.yellow :
    player.isReady ? C.green : "rgba(255,255,255,0.15)";

  const pulsing = player.status ? player.status === "answering" : !player.isReady;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      animation: animate ? "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" : undefined }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `linear-gradient(145deg, ${player.color}, ${player.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff",
          boxShadow: `0 0 0 3px ${ringColor}, 0 4px 16px ${player.color}55`,
          transition: "box-shadow 0.3s",
          animation: pulsing ? "readyPulse 2s ease-in-out infinite" : undefined,
        }}>
          {player.initials}
        </div>
        {player.isHost && (
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)" }}>
            <Crown size={16} fill={C.yellow} color={C.yellow} />
          </div>
        )}
        {player.status === "finished" ? (
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 16, height: 16, borderRadius: "50%",
            background: C.green, border: "2px solid #1B1E2B", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Check size={9} color="#fff" strokeWidth={3} />
          </div>
        ) : (
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 14, height: 14,
            borderRadius: "50%", background: ringColor, border: "2px solid #1B1E2B", transition: "background 0.3s",
            animation: pulsing ? "dotPulse 1.4s ease-in-out infinite" : undefined }} />
        )}
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
        color: "rgba(255,255,255,0.75)", textAlign: "center", maxWidth: 68,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {player.name}
      </span>
    </div>
  );
}