
import { LogOut, Home, ChevronRight } from "lucide-react";
import { useApp, type Page } from "../../context/AppContext";

const C = {
  navy:   "#1B1E2B",
  indigo: "#5B3DF6",
  yellow: "#FFC93C",
  coral:  "#FF6B4A",
};

const PAGE_LABELS: Record<Page, string> = {
  login: "Login", role: "Choose Role", lobby: "Battle Lobby", battle: "Live Battle",
  results: "Battle Results", dashboard: "Dashboard", sections: "My Sections",
  questions: "Question Bank", aigen: "AI Generator",
  matchmaking: "Matchmaking", analyzer: "Solution Analyzer",
  student_dashboard: "Dashboard", history: "History", classes: "Classes", profile: "Profile",
};

export function StudentTopBar() {
  const { user, page, navigate, logout } = useApp();

  const FLOW: Page[] = ["lobby", "battle", "results"];
  const pageIdx = FLOW.indexOf(page as Page);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 800,
      background: "rgba(27,30,43,0.92)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "8px 20px", display: "flex", alignItems: "center", gap: 10,
    }}>
      {/* Logo */}
      <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700,
        color: "#fff", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
        🏆 QuizArena
      </span>

      {/* Back to Dashboard */}
      <button type="button" onClick={() => navigate("student_dashboard")}
        title="Back to Dashboard"
        style={{ display: "flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer" }}>
        <Home size={13} color="rgba(255,255,255,0.6)" strokeWidth={2.25} />
      </button>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, marginLeft: 8 }}>
        {FLOW.map((p, i) => (
          <span key={p} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {i > 0 && <ChevronRight size={12} color="rgba(255,255,255,0.25)" strokeWidth={2}/>}
            <span style={{
              fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: i === pageIdx ? 700 : 500,
              color: i === pageIdx ? "#fff" : i < pageIdx ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
              cursor: i < pageIdx ? "pointer" : "default",
              textDecoration: i < pageIdx ? "underline" : "none",
            }}
              onClick={() => i < pageIdx && navigate(p)}>
              {PAGE_LABELS[p]}
            </span>
          </span>
        ))}
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

      {/* Logout */}
      <button type="button" onClick={logout}
        style={{ display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.25)",
          borderRadius: 20, padding: "6px 12px", cursor: "pointer",
          fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#FF4757",
          transition: "background 0.15s", flexShrink: 0 }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.2)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.1)"}>
        <LogOut size={13} strokeWidth={2.5}/> Logout
      </button>
    </div>
  );
}

