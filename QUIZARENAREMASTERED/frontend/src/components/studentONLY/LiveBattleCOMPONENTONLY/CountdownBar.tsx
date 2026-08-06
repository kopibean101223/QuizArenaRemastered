import { C } from "./Constants";

interface CountdownBarProps {
  timeLeft: number;
  timeLimit: number;
}

export function CountdownBar({ timeLeft, timeLimit }: CountdownBarProps) {
  const pct = (timeLeft / timeLimit) * 100;
  const color = pct > 50 ? C.green : pct > 25 ? C.yellow : C.coral;
  const glow = pct > 50 ? "rgba(46,212,122,0.6)" : pct > 25 ? "rgba(255,201,60,0.6)" : "rgba(255,107,74,0.7)";
  const urgent = pct <= 25;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
      <div
        style={{
          flex: 1,
          height: 10,
          borderRadius: 50,
          background: "rgba(255,255,255,0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: 50,
            transition: "width 0.9s linear, background 0.5s",
            boxShadow: urgent ? `0 0 12px ${glow}` : "none",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          borderRadius: "50%",
          flexShrink: 0,
          background: urgent ? `radial-gradient(circle, ${C.coral}33, transparent)` : "transparent",
          border: `3px solid ${color}`,
          transition: "border-color 0.5s",
          animation: urgent ? "timerPulse 0.6s ease-in-out infinite" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "Fredoka, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color,
            lineHeight: 1,
            transition: "color 0.5s",
          }}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}