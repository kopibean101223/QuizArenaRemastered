
"use client";

import { LogOut, Trophy } from "lucide-react";
import { useApp, type Page } from "../../context/AppContext";

const C = {
  navy: "#1B1E2B",
  indigo: "#5B3DF6",
  yellow: "#FFC93C",
  coral: "#FF6B4A",
};

const TABS: { id: Page; label: string }[] = [
  { id: "student_dashboard", label: "Dashboard" },
  { id: "history", label: "History" },
  { id: "classes", label: "Classes" },
];

export function StudentNavBar() {
  const { user, page, navigate, logout } = useApp();

  const initials = (user?.name || "??").slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        position: "sticky", top: 0, zIndex: 800,
        background: "rgba(15,14,26,0.94)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 24px", display: "flex", alignItems: "center", gap: 24,
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("student_dashboard")}
        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: C.indigo,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Trophy size={15} fill={C.yellow} color="transparent" />
        </div>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>
          Quiz<span style={{ color: C.indigo }}>Arena</span>
        </span>
      </div>

      {/* Tabs */}
      <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
        {TABS.map((t) => {
          const active = page === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => navigate(t.id)}
              style={{
                fontFamily: "Manrope, sans-serif", fontSize: 13.5, fontWeight: 700,
                color: active ? "#fff" : "rgba(255,255,255,0.5)",
                background: active ? C.indigo : "transparent",
                border: "none", borderRadius: 10, padding: "8px 16px",
                cursor: "pointer", transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* User badge */}
      {user && (
        <button
          type="button"
          onClick={() => navigate("profile")}
          title="View profile"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: page === "profile" ? "rgba(91,61,246,0.18)" : "rgba(255,255,255,0.06)",
            border: page === "profile" ? "1px solid rgba(91,61,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, padding: "5px 14px 5px 5px", flexShrink: 0, cursor: "pointer",
          }}
        >
          <div style={{
            width: 26, height: 26, borderRadius: "50%", background: C.indigo,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800, color: "#fff",
          }}>
            {initials}
          </div>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>
            {user.name}
          </span>
        </button>
      )}

      {/* Logout */}
      <button
        type="button"
        onClick={logout}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "transparent", border: "1px solid rgba(255,71,87,0.4)",
          borderRadius: 20, padding: "7px 14px", cursor: "pointer",
          fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 700, color: "#FF4757",
          transition: "background 0.15s", flexShrink: 0,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.12)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <LogOut size={13} strokeWidth={2.5} /> Logout
      </button>
    </div>
  );
}
