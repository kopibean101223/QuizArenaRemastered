"use client";

import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Layers, Library, Sparkles,
  Swords, FlaskConical, LogOut, Trophy,
} from "lucide-react";
import { useApp, type Page } from "../../context/AppContext";

const C = {
  sidebar: "#1B1E2B",
  indigo:  "#5B3DF6",
  yellow:  "#FFC93C",
};

interface NavItem { id: Page; icon: React.ReactNode; label: string; }

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",    icon: <LayoutDashboard size={17} strokeWidth={2}/>, label: "Dashboard"         },
  { id: "sections",     icon: <Layers          size={17} strokeWidth={2}/>, label: "My Sections"       },
  { id: "questions",    icon: <Library         size={17} strokeWidth={2}/>, label: "Question Bank"     },
  { id: "aigen",        icon: <Sparkles        size={17} strokeWidth={2}/>, label: "AI Generator"      },
  { id: "matchmaking",  icon: <Swords          size={17} strokeWidth={2}/>, label: "Matchmaking"       },
  { id: "analyzer",     icon: <FlaskConical    size={17} strokeWidth={2}/>, label: "Solution Analyzer" },
];

export function ProfSidebar() {
  const router = useRouter();
  const { user, page, logout } = useApp();

  return (
    <aside style={{
      width: 220, minWidth: 220, background: C.sidebar,
      display: "flex", flexDirection: "column",
      padding: "20px 0", flexShrink: 0, height: "100vh",
      position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "0 18px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: C.indigo,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            <Trophy size={17} fill={C.yellow} color="transparent"/>
          </div>
          <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
            QuizArena
          </span>
        </div>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700,
          color: "rgba(255,255,255,0.28)", margin: "7px 0 0",
          letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Professor Portal
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} type="button" onClick={() => router.push(`/?page=${item.id}`)}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                padding: "9px 11px", borderRadius: 9, cursor: "pointer",
                background: active ? "rgba(91,61,246,0.22)" : "transparent",
                border: active ? "1px solid rgba(91,61,246,0.3)" : "1px solid transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.42)",
                width: "100%", textAlign: "left", transition: "all 0.12s",
              }}>
              <span style={{ color: active ? "#fff" : "rgba(255,255,255,0.42)" }}>{item.icon}</span>
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13,
                fontWeight: active ? 700 : 500, color: "inherit" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.indigo,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800, color: "#fff",
            flexShrink: 0 }}>
            {user?.name?.slice(0, 2).toUpperCase() ?? "PR"}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
              color: "#fff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name ?? "Professor"}
            </p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10,
              color: "rgba(255,255,255,0.32)", margin: 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </p>
          </div>
        </div>
        <button type="button" onClick={logout}
          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(255,71,87,0.25)",
            background: "rgba(255,71,87,0.08)", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.18)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.08)"}>
          <LogOut size={14} color="#FF4757" strokeWidth={2}/>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#FF4757" }}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}