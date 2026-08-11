
"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { StudentNavBar } from "../shared/StudentNavBar";
import {
  fetchMyQuizResults,
  fetchMySections,
  subjectColor,
  modeLabel,
  formatDate,
  type QuizResultRow,
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

const PAGE_SIZE = 4;
const MODE_FILTERS = ["Individual", "Team", "Battle Royale"];

function medalFor(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

function AccuracyRing({ value, color }: { value: number; color: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div style={{
      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
      background: `conic-gradient(${color} ${pct * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%", background: "#171526",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff",
      }}>
        {pct}%
      </div>
    </div>
  );
}

export function StudentHistory() {
  const { user } = useApp();
  const supabase = createBrowserSupabaseClient();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResultRow[]>([]);
  const [sections, setSections] = useState<MySection[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [myResults, mySections] = await Promise.all([
        fetchMyQuizResults(supabase, user.id),
        fetchMySections(supabase, user.id),
      ]);
      if (cancelled) return;
      setResults(myResults);
      setSections(mySections);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  const sectionById: Record<string, MySection> = {};
  sections.forEach((s) => { sectionById[s.id] = s; });

  const subjectFilters = useMemo(() => {
    const set = new Set<string>();
    sections.forEach((s) => set.add(s.subject));
    return Array.from(set);
  }, [sections]);

  function toggleFilter(f: string) {
    setPage(1);
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  const enriched = results.map((r) => {
    const secId = r.quiz_sessions?.section_id;
    const section = secId ? sectionById[secId] : undefined;
    return {
      row: r,
      sectionName: section?.name || "Class",
      subject: section?.subject || "General",
      mode: modeLabel(r.quiz_sessions?.mode),
    };
  });

  const filtered = enriched.filter((e) => {
    const matchesSearch =
      !search.trim() ||
      e.sectionName.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.mode.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.includes(e.mode) ||
      activeFilters.includes(e.subject);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <StudentNavBar />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <span style={{
            fontFamily: "Manrope, sans-serif", fontSize: 11.5, fontWeight: 800, color: C.coral,
            textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            Battle History
          </span>
        </div>
        <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", margin: "0 0 18px" }}>
          Your Battle Record
        </h1>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <Search size={15} color={C.muted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search battles…"
            style={{
              width: "100%", boxSizing: "border-box", background: C.card,
              border: `1.5px solid ${C.cardBorder}`, borderRadius: 14, padding: "12px 16px 12px 42px",
              fontFamily: "Manrope, sans-serif", fontSize: 13.5, color: "#fff", outline: "none",
            }}
          />
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {[...MODE_FILTERS, ...subjectFilters].map((f) => {
            const active = activeFilters.includes(f);
            return (
              <button key={f} type="button" onClick={() => toggleFilter(f)} style={{
                fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 700,
                color: active ? "#fff" : C.muted,
                background: active ? C.indigo : "rgba(255,255,255,0.05)",
                border: `1.5px solid ${active ? C.indigo : C.cardBorder}`,
                borderRadius: 20, padding: "6px 14px", cursor: "pointer",
              }}>
                {f}
              </button>
            );
          })}
        </div>

        {/* List */}
        {!loading && pageItems.length === 0 && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1.5px dashed rgba(255,255,255,0.12)",
            borderRadius: 16, padding: "30px 18px", textAlign: "center",
          }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13.5, color: C.muted, margin: 0 }}>
              {results.length === 0 ? "No battles yet — join one from your Dashboard!" : "No battles match your filters."}
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pageItems.map(({ row, sectionName, subject, mode }) => {
            const col = subjectColor(subject);
            const medal = medalFor(row.rank);
            return (
              <div key={row.id || row.session_id} style={{
                background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 18,
                padding: "16px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
              }}>
                <AccuracyRing value={row.accuracy} color={col.text} />

                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 800, color: C.muted,
                      background: "rgba(255,255,255,0.06)", border: `1px solid ${C.cardBorder}`,
                      borderRadius: 8, padding: "2px 8px",
                    }}>
                      {mode}
                    </span>
                    <span style={{
                      fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 800, color: col.text,
                      background: col.bg, border: `1px solid ${col.border}`, borderRadius: 8, padding: "2px 8px",
                    }}>
                      {subject}
                    </span>
                  </div>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>
                    {sectionName}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11.5, color: C.muted, margin: 0 }}>
                    📅 {formatDate(row.completed_at)}
                  </p>
                </div>

                <div style={{ textAlign: "right", minWidth: 90 }}>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: C.yellow, margin: "0 0 2px" }}>
                    +{row.score}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, color: C.muted, margin: "0 0 6px" }}>XP</p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: "#fff", margin: 0 }}>
                    {medal ? <>{medal} Rank</> : `#${row.rank}`}
                  </p>
                </div>

                <div style={{ width: 90 }}>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 700, color: C.muted, margin: "0 0 4px", textAlign: "right" }}>
                    Accuracy
                  </p>
                  <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ width: `${Math.round(row.accuracy)}%`, height: "100%", background: C.green, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === page;
              return (
                <button key={n} type="button" onClick={() => setPage(n)} style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: active ? C.indigo : "rgba(255,255,255,0.06)",
                  border: `1px solid ${active ? C.indigo : C.cardBorder}`,
                  color: "#fff", fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                }}>
                  {n}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
