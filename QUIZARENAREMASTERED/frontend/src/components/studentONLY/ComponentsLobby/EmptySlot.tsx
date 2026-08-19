import React from "react";

export function EmptySlot() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%",
        border: "2px dashed rgba(255,255,255,0.12)", display: "flex",
        alignItems: "center", justifyContent: "center",
        animation: "emptyPulse 2.5s ease-in-out infinite" }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 20,
          color: "rgba(255,255,255,0.1)", fontWeight: 700 }}>+</span>
      </div>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600,
        color: "rgba(255,255,255,0.18)" }}>waiting…</span>
    </div>
  );
}