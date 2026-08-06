import { CheckCircle2 } from "lucide-react";
import { OPTION_COLORS, C } from "./Constants";

interface AnswerBtnProps {
  index: number;
  text: string;
  selected: boolean;
  revealed: boolean;
  isCorrect: boolean;
  disabled: boolean;
  onClick: () => void;
  votePct?: number;
}

export function AnswerBtn({
  index,
  text,
  selected,
  revealed,
  isCorrect,
  disabled,
  onClick,
  votePct,
}: AnswerBtnProps) {
  const col = OPTION_COLORS[index % OPTION_COLORS.length];
  const LABELS = ["A", "B", "C", "D"];

  let bg = "rgba(255,255,255,0.05)";
  let border = "rgba(255,255,255,0.1)";
  let shadow = "none";
  let textCol = "#fff";
  let badgeBg = col.light;
  let badgeCol = col.base;

  if (selected && !revealed) {
    bg = col.light;
    border = col.base;
    shadow = `0 0 0 3px ${col.glow}, 0 8px 32px ${col.glow}`;
    badgeBg = col.base;
    badgeCol = "#fff";
  }
  if (revealed && isCorrect) {
    bg = "rgba(46,212,122,0.15)";
    border = C.green;
    shadow = "0 0 0 3px rgba(46,212,122,0.4), 0 8px 24px rgba(46,212,122,0.3)";
    textCol = "#fff";
    badgeBg = C.green;
    badgeCol = "#fff";
  }
  if (revealed && selected && !isCorrect) {
    bg = "rgba(255,71,87,0.12)";
    border = C.red;
    shadow = "none";
    textCol = "rgba(255,255,255,0.6)";
    badgeBg = C.red;
    badgeCol = "#fff";
  }
  if (revealed && !selected && !isCorrect) {
    bg = "rgba(255,255,255,0.03)";
    textCol = "rgba(255,255,255,0.35)";
    badgeBg = "rgba(255,255,255,0.08)";
    badgeCol = "rgba(255,255,255,0.3)";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 20,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: disabled ? "default" : "pointer",
        boxShadow: shadow,
        transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        transform: selected && !revealed ? "scale(1.015)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {votePct !== undefined && votePct > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${votePct}%`,
            background: "rgba(255,255,255,0.05)",
            transition: "width 0.4s",
            borderRadius: 18,
            pointerEvents: "none",
          }}
        />
      )}
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: badgeBg,
          color: badgeCol,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Fredoka, sans-serif",
          fontSize: 20,
          fontWeight: 700,
          flexShrink: 0,
          transition: "all 0.18s",
          boxShadow: selected && !revealed ? `0 2px 8px ${col.glow}` : "none",
        }}
      >
        {revealed && isCorrect ? <CheckCircle2 size={20} strokeWidth={2.5} /> : LABELS[index]}
      </span>
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: textCol,
          textAlign: "left",
          lineHeight: 1.4,
          flex: 1,
          transition: "color 0.18s",
        }}
      >
        {text}
      </span>
      {votePct !== undefined && votePct > 0 && (
        <span
          style={{
            fontFamily: "Fredoka, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            flexShrink: 0,
            marginLeft: "auto",
          }}
        >
          {Math.round(votePct)}%
        </span>
      )}
    </button>
  );
}