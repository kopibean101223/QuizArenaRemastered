import React from "react";
import { Crown } from "lucide-react";
import { Player, C } from "./LobbyConstants";

export function PlayerChip({ player, animate }: { player: Player; animate?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      animation: animate ? "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" : undefined }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `linear-gradient(145deg, ${player.color}, ${player.color}cc)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff",
          boxShadow: player.isReady
            ? `0 0 0 3px ${C.green}, 0 4px 16px ${player.color}55`
            : `0 0 0 3px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)`,
          transition: "box-shadow 0.3s",
          animation: !player.isReady ? "readyPulse 2s ease-in-out infinite" : undefined,
        }}>
          {player.initials}
        </div>
        {player.isHost && (
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)" }}>
            <Crown size={16} fill={C.yellow} color={C.yellow} />
          </div>
        )}
        <div style={{ position: "absolute", bottom: 1, right: 1, width: 14, height: 14,
          borderRadius: "50%", background: player.isReady ? C.green : "rgba(255,255,255,0.2)",
          border: "2px solid #1B1E2B", transition: "background 0.3s",
          animation: !player.isReady ? "dotPulse 1.4s ease-in-out infinite" : undefined }} />
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
        color: "rgba(255,255,255,0.75)", textAlign: "center", maxWidth: 68,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {player.name}
      </span>
    </div>
  );
}