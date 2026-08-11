
"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Users, Flag, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { StudentNavBar } from "../shared/StudentNavBar";
import {
  fetchMySections,
  joinSectionByCode,
  subjectColor,
  type MySection,
} from "@/lib/student/studentData";

const C = {
  bg: "#100E1C",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  indigo: "#5B3DF6",
  coral: "#FF6B4A",
  yellow: "#FFC93C",
  green: "#2ED47A",
  muted: "rgba(255,255,255,0.5)",
};

export function StudentClasses() {
  const { user } = useApp();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<MySection[]>([]);
  const [search, setSearch] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);

  async function loadSections() {
    if (!user) return;
    setLoading(true);
    const mine = await fetchMySections(supabase, user.id);
    setSections(mine);
    setLoading(false);
  }

  useEffect(() => { loadSections(); }, [user?.id]);

  async function handleJoin() {
    if (!user) return;
    setJoining(true);
    const res = await joinSectionByCode(supabase, user.id, joinCode);
    setJoining(false);
    if (res.ok) {
      toast.success(res.message);
      setShowJoinModal(false);
      setJoinCode("");
      loadSections();
    } else {
      toast.error(res.message);
    }
  }

  const filtered = sections.filter((s) =>
    !search.trim() ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.subject.toLowerCase().includes(search.toLowerCase()) ||
    s.professorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <StudentNavBar />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
          <div>
            <span style={{
              fontFamily: "Manrope, sans-serif", fontSize: 11.5, fontWeight: 800, color: C.yellow,
              textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              My Classes
            </span>
            <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", margin: "4px 0 0" }}>
              Your Enrolled Classes
            </h1>
          </div>
          <button type="button" onClick={() => setShowJoinModal(true)} style={{
            display: "flex", alignItems: "center", gap: 6, background: C.coral, border: "none",
            borderRadius: 14, padding: "12px 20px", fontFamily: "Manrope, sans-serif", fontSize: 13.5,
            fontWeight: 800, color: "#fff", cursor: "pointer", boxShadow: "0 6px 18px rgba(255,107,74,0.35)",
          }}>
            <Plus size={16} /> Join Class
          </button>
        </div>

        <div style={{ position: "relative", margin: "20px 0 22px" }}>
          <Search size={15} color={C.muted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes…"
            style={{
              width: "100%", boxSizing: "border-box", background: C.card,
              border: `1.5px solid ${C.cardBorder}`, borderRadius: 14, padding: "12px 16px 12px 42px",
              fontFamily: "Manrope, sans-serif", fontSize: 13.5, color: "#fff", outline: "none",
            }}
          />
        </div>

        {!loading && filtered.length === 0 && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1.5px dashed rgba(255,255,255,0.12)",
            borderRadius: 16, padding: "34px 18px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13.5, color: C.muted, margin: "0 0 12px" }}>
              {sections.length === 0
                ? "You're not enrolled in any classes yet."
                : "No classes match your search."}
            </p>
            {sections.length === 0 && (
              <button type="button" onClick={() => setShowJoinModal(true)} style={{
                background: C.indigo, border: "none", borderRadius: 10, padding: "9px 20px",
                fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 800, color: "#fff", cursor: "pointer",
              }}>
                Join Your First Class
              </button>
            )}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map((s) => {
            const col = subjectColor(s.subject);
            return (
              <div key={s.id} style={{
                background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 18,
                overflow: "hidden",
              }}>
                <div style={{ height: 4, background: col.text }} />
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>
                      {s.name}
                    </p>
                    {s.isLiveNow && (
                      <span style={{
                        display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
                        fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800, color: C.green,
                        textTransform: "uppercase",
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} /> Live Now
                      </span>
                    )}
                  </div>

                  <span style={{
                    display: "inline-block", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
                    color: col.text, background: col.bg, border: `1px solid ${col.border}`,
                    borderRadius: 8, padding: "2px 9px", marginBottom: 14,
                  }}>
                    {s.subject}
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", background: C.indigo,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "Manrope, sans-serif", fontSize: 9, fontWeight: 800, color: "#fff", flexShrink: 0,
                    }}>
                      {s.professorName.slice(0, 2).toUpperCase()}
                    </div>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                      {s.professorName}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Manrope, sans-serif", fontSize: 11.5, color: C.muted }}>
                      <Users size={12} /> {s.studentCount}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "Manrope, sans-serif", fontSize: 11.5, color: C.muted }}>
                      <Flag size={12} /> {s.totalSessionCount} {s.totalSessionCount === 1 ? "quiz" : "quizzes"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join Class modal */}
      {showJoinModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={() => setShowJoinModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: "100%", maxWidth: 380, background: "#171526", border: `1.5px solid ${C.cardBorder}`,
            borderRadius: 20, padding: 22,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "#fff", margin: 0 }}>
                Join a Class
              </p>
              <button type="button" onClick={() => setShowJoinModal(false)} style={{
                background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <X size={14} color="#fff" />
              </button>
            </div>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12.5, color: C.muted, margin: "0 0 12px" }}>
              Enter the class code your professor shared with you.
            </p>
            <input
              autoFocus
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              placeholder="e.g. AB12CD"
              style={{
                width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 14px",
                fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: C.yellow,
                outline: "none", letterSpacing: "0.1em", marginBottom: 14,
              }}
            />
            <button type="button" onClick={handleJoin} disabled={joining} style={{
              width: "100%", background: C.indigo, border: "none", borderRadius: 12, padding: "12px 0",
              fontFamily: "Manrope, sans-serif", fontSize: 13.5, fontWeight: 800, color: "#fff",
              cursor: joining ? "default" : "pointer", opacity: joining ? 0.7 : 1,
            }}>
              {joining ? "Joining…" : "Join Class"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
