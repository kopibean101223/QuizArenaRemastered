import React from "react";
import { Check } from "lucide-react";
import { C } from "./LobbyConstants";
type Mode = {
  emoji: string;
  label: string;
  desc: string;
  bg: string;
  accent: string;
};

export function ModeCard({ mode, selected, onClick }:
  { mode: Mode; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: 1, minWidth: 0, background: mode.bg,
      borderRadius: 24, padding: "24px 18px 20px",
      border: selected
        ? `2.5px solid ${C.yellow}`
        : "2.5px solid rgba(255,255,255,0.07)",
      cursor: "pointer", textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      boxShadow: selected
        ? `0 0 0 4px ${C.yellowGlow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`
        : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
      transform: selected ? "scale(1.03) translateY(-2px)" : "scale(1)",
      position: "relative", overflow: "hidden",
    }}>
      {selected && (
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80,
          borderRadius: "50%", background: `${C.yellow}22`, pointerEvents: "none" }} />
      )}
      <span style={{ fontSize: 42, lineHeight: 1,
        filter: selected ? `drop-shadow(0 0 12px ${mode.accent})` : "none",
        transition: "filter 0.2s" }}>
        {mode.emoji}
      </span>
      <div>
        <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700,
          color: selected ? C.yellow : "#fff", margin: 0, lineHeight: 1.1,
          transition: "color 0.2s" }}>
          {mode.label}
        </p>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600,
          color: "rgba(255,255,255,0.45)", margin: "4px 0 0", lineHeight: 1.4 }}>
          {mode.desc}
        </p>
      </div>
      {selected && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5,
          background: C.yellow, borderRadius: 20, padding: "4px 12px" }}>
          <Check size={11} strokeWidth={3} color={C.navy} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
            color: C.navy }}>Selected</span>
        </div>
      )}
    </button>
  );
}