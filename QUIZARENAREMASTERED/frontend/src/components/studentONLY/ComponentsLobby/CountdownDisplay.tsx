import React from "react";
import { C } from "./LobbyConstants";

export function CountdownDisplay({ count }: { count: number }) {
  const color = count <= 1 ? C.coral : count <= 2 ? C.yellow : C.green;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "rgba(27,30,43,0.88)", backdropFilter: "blur(6px)" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ position: "absolute", width: 200 + i * 80, height: 200 + i * 80,
          borderRadius: "50%", border: `2px solid ${color}`,
          opacity: 0.12 * i, animation: `burstRing 1s ease-out ${i * 0.12}s infinite` }} />
      ))}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 180, fontWeight: 700,
          color, lineHeight: 1, animation: "countPop 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          textShadow: `0 0 60px ${color}80, 0 0 120px ${color}40`, display: "block" }}>
          {count}
        </span>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 28, fontWeight: 600,
          color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase",
          animation: "fadeUp 0.4s ease-out" }}>
          {count === 3 ? "Get Ready!" : count === 2 ? "Steady…" : "GO!"}
        </span>
      </div>
    </div>
  );
}