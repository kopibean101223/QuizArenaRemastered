
import { Zap } from "lucide-react";
import { useApp } from "../../context/AppContext";

const C = {
  navy:   "#1B1E2B",
  indigo: "#5B3DF6",
  yellow: "#FFC93C",
  coral:  "#FF6B4A",
};

export function StudentTopBar({ mode = "Live Battle" }: { mode?: string }) {
  const { user } = useApp();

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 800,
      background: "rgba(19,21,36,0.96)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "8px 20px", display: "flex", alignItems: "center", gap: 10,
    }}>
      {/* Logo */}
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700,
        color: "#fff", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
        🏆 QuizArena
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.42)" }}>Battle Arena</span>
        <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
        <strong style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 12px", borderRadius: 10, background: "rgba(91,61,246,0.18)", border: "1px solid rgba(91,61,246,0.6)", color: "#A98CFF", fontFamily: "Manrope, sans-serif", fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 0 18px rgba(91,61,246,0.2)" }}>
          <Zap size={13} fill="currentColor" /> {mode}
        </strong>
      </div>

      {/* User badge */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 7,
          background: "rgba(255,255,255,0.06)", borderRadius: 20,
          padding: "5px 12px 5px 5px", flexShrink: 0 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.indigo,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800, color: "#fff" }}>
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600,
            color: "rgba(255,255,255,0.6)" }}>
            {user.name}
          </span>
        </div>
      )}

    </div>
  );
}

