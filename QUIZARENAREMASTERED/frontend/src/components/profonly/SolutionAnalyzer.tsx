import { useState } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import { ProfEndlessMode } from "../gamemodes/ProfEndlessMode";
import { ProfBossRaid } from "../gamemodes/ProfBossRaid";
import { ProfBingoMode } from "../gamemodes/ProfBingoMode";
import { ProfChaosClash } from "../gamemodes/ProfChaosClash";
import { StudentEndlessMode } from "../gamemodes/StudentEndlessMode";
import { StudentBossRaid } from "../gamemodes/StudentBossRaid";
import { StudentBingoMode } from "../gamemodes/StudentBingoMode";
import { StudentChaosClash } from "../gamemodes/StudentChaosClash";

export function SolutionAnalyzer() {
  const [activeMode, setActiveMode] = useState<string | null>(null);

  const renderActiveMode = () => {
    switch (activeMode) {
      case "prof_endless": return <ProfEndlessMode />;
      case "prof_normal": return <ProfBossRaid />;
      case "prof_bingo": return <ProfBingoMode />;
      case "prof_chaos": return <ProfChaosClash />;
      case "student_endless": return <StudentEndlessMode />;
      case "student_normal": return <StudentBossRaid />;
      case "student_bingo": return <StudentBingoMode />;
      case "student_chaos": return <StudentChaosClash />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0f172a" }}>
      <ProfSidebar />
      
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", color: "#fff" }}>
        {activeMode ? (
          <div>
            <button 
              onClick={() => setActiveMode(null)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#334155",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "2rem"
              }}
            >
              ← Back to Game Modes
            </button>
            {renderActiveMode()}
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: "bold" }}>
              Game Modes Mockup Menu
            </h1>
            
            <div style={{ display: "flex", gap: "4rem" }}>
              {/* Professor View Column */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#93c5fd" }}>Professor View</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <button onClick={() => setActiveMode("prof_normal")} style={btnStyle}>Normal Mode</button>
                  <button onClick={() => setActiveMode("prof_endless")} style={btnStyle}>Endless Mode</button>
                  <button onClick={() => setActiveMode("prof_bingo")} style={btnStyle}>Bingo Mode</button>
                  <button onClick={() => setActiveMode("prof_chaos")} style={btnStyle}>Chaos Clash</button>
                </div>
              </div>

              {/* Student View Column */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#86efac" }}>Student View</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <button onClick={() => setActiveMode("student_normal")} style={btnStyle}>Normal Mode</button>
                  <button onClick={() => setActiveMode("student_endless")} style={btnStyle}>Endless Mode</button>
                  <button onClick={() => setActiveMode("student_bingo")} style={btnStyle}>Bingo Mode</button>
                  <button onClick={() => setActiveMode("student_chaos")} style={btnStyle}>Chaos Clash</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const btnStyle = {
  padding: "1rem",
  backgroundColor: "#1e293b",
  color: "#f8fafc",
  border: "1px solid #475569",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1.1rem",
  textAlign: "left" as const,
  transition: "all 0.2s"
};
