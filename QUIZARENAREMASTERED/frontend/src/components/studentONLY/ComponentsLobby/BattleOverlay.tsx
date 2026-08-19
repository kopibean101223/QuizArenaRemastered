import React from "react";
import { Trophy } from "lucide-react";
import { C } from "./LobbyConstants";

interface BattleOverlayProps {
  onEnterBattle: () => void;
}

export function BattleOverlay({ onEnterBattle }: BattleOverlayProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${C.indigoDeep}, #2D0E8A)`,
      gap: 20 }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%",
          width: 4, height: 4, borderRadius: "50%", background: C.yellow,
          transformOrigin: "0 0",
          transform: `rotate(${i*45}deg) translateX(120px)`,
          animation: "burstRing 0.8s ease-out forwards" }} />
      ))}
      <Trophy fill={C.yellow} color="transparent" size={64}
        style={{ filter: `drop-shadow(0 0 24px ${C.yellow})`,
          animation: "countPop 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 56, fontWeight: 700,
        color: "#fff", animation: "countPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
        Battle Begins!
      </span>
      <button type="button" onClick={onEnterBattle} style={{
        marginTop: 12, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 14,
        padding: "12px 32px", fontFamily: "Fredoka, sans-serif", fontSize: 20,
        fontWeight: 700, color: "#fff", cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}>Enter Battle →</button>
    </div>
  );
}