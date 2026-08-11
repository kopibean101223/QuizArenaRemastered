
"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Trophy, Flame, Zap, Lock, Check, TrendingUp } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { StudentNavBar } from "../shared/StudentNavBar";
import {
  fetchMyQuizResults,
  fetchMySections,
  summarizeResults,
  levelFromXp,
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

type Tab = "profile" | "settings";

interface Achievement {
  id: string; title: string; desc: string; earned: boolean; icon: React.ReactNode;
}

export function StudentProfile() {
  const { user } = useApp();
  const supabase = createBrowserSupabaseClient();

  const [tab, setTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResultRow[]>([]);
  const [sections, setSections] = useState<MySection[]>([]);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || "");
  const [savingName, setSavingName] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => { setNameInput(user?.name || ""); }, [user?.name]);

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

  const sectionSubjectById: Record<string, string> = {};
  sections.forEach((s) => { sectionSubjectById[s.id] = s.subject; });
  const stats = summarizeResults(results, sectionSubjectById);
  const { level, next, progress } = levelFromXp(stats.totalXp);

  const achievements: Achievement[] = [
    { id: "first_win", title: "First Victory", desc: "Win your first battle", earned: stats.battlesWon >= 1, icon: <Trophy size={20} /> },
    { id: "on_fire", title: "On Fire", desc: "5-day streak", earned: stats.streak >= 5, icon: <Flame size={20} /> },
    { id: "sharpshooter", title: "Sharpshooter", desc: "100% accuracy in a battle", earned: stats.bestAccuracy >= 100, icon: <Zap size={20} /> },
    { id: "battle_king", title: "Battle King", desc: "Win 10 battles", earned: stats.battlesWon >= 10, icon: <Trophy size={20} /> },
    { id: "veteran", title: "Veteran", desc: "Complete 20 battles", earned: stats.totalBattles >= 20, icon: <Zap size={20} /> },
    { id: "consistent", title: "Consistent", desc: "10-day streak", earned: stats.streak >= 10, icon: <Flame size={20} /> },
  ];

  // Learning insights: average accuracy per subject, this calendar month vs. previous.
  const insights = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const prevDate = new Date(thisYear, thisMonth - 1, 1);

    const buckets: Record<string, { thisSum: number; thisN: number; prevSum: number; prevN: number }> = {};
    results.forEach((r) => {
      const secId = r.quiz_sessions?.section_id;
      const subject = secId ? sectionSubjectById[secId] : undefined;
      if (!subject) return;
      const d = new Date(r.completed_at);
      if (!buckets[subject]) buckets[subject] = { thisSum: 0, thisN: 0, prevSum: 0, prevN: 0 };
      if (d.getFullYear() === thisYear && d.getMonth() === thisMonth) {
        buckets[subject].thisSum += r.accuracy || 0;
        buckets[subject].thisN += 1;
      } else if (d.getFullYear() === prevDate.getFullYear() && d.getMonth() === prevDate.getMonth()) {
        buckets[subject].prevSum += r.accuracy || 0;
        buckets[subject].prevN += 1;
      }
    });

    let mostImproved: { subject: string; delta: number } | null = null;
    const rows = Object.entries(buckets).map(([subject, b]) => {
      const thisAvg = b.thisN ? b.thisSum / b.thisN : 0;
      const prevAvg = b.prevN ? b.prevSum / b.prevN : 0;
      const delta = thisAvg - prevAvg;
      if (b.thisN > 0 && (!mostImproved || delta > mostImproved.delta)) {
        mostImproved = { subject, delta };
      }
      return { subject, thisAvg, prevAvg };
    });

    return { rows, mostImproved };
  }, [results, sectionSubjectById]);

  async function handleSaveName() {
    if (!user || !nameInput.trim()) return;
    setSavingName(true);
    const { error: authErr } = await supabase.auth.updateUser({ data: { full_name: nameInput.trim() } });
    const { error: profErr } = await supabase.from("profiles").update({ username: nameInput.trim() }).eq("user_id", user.id);
    setSavingName(false);
    if (authErr || profErr) {
      toast.error("Couldn't update your name. Try again.");
      return;
    }
    toast.success("Profile updated! It'll fully refresh on next login.");
    setEditingName(false);
  }

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    setNewPassword("");
  }

  const initials = (user?.name || "??").slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <StudentNavBar />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Header card */}
        <div style={{
          background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 20,
          padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginBottom: 18,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: C.indigo, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: "#fff",
          }}>
            {initials}
          </div>

          <div style={{ flex: 1, minWidth: 180 }}>
            {editingName ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  autoFocus
                  style={{
                    fontFamily: "Fredoka, sans-serif", fontSize: 18, fontWeight: 700, color: "#fff",
                    background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: 8, padding: "4px 10px", outline: "none",
                  }}
                />
                <button type="button" onClick={handleSaveName} disabled={savingName} style={{
                  background: C.green, border: "none", borderRadius: 8, padding: "6px 12px",
                  color: "#0c1a12", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, cursor: "pointer",
                }}>
                  {savingName ? "…" : "Save"}
                </button>
                <button type="button" onClick={() => { setEditingName(false); setNameInput(user?.name || ""); }} style={{
                  background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "6px 12px",
                  color: "#fff", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>
                  Cancel
                </button>
              </div>
            ) : (
              <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>
                {user?.name}
              </p>
            )}
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12.5, color: C.muted, margin: "0 0 10px" }}>
              {user?.email} · Level {level}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 320 }}>
              <div style={{ flex: 1, height: 7, borderRadius: 6, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{
                  width: `${Math.round(progress * 100)}%`, height: "100%", borderRadius: 6,
                  background: `linear-gradient(90deg, ${C.indigo}, ${C.coral})`,
                }} />
              </div>
              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 700, color: C.muted, whiteSpace: "nowrap" }}>
                → {next} XP
              </span>
            </div>
          </div>

          {!editingName && (
            <button type="button" onClick={() => setEditingName(true)} style={{
              display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)",
              border: `1px solid ${C.cardBorder}`, borderRadius: 12, padding: "9px 16px", cursor: "pointer",
              fontFamily: "Manrope, sans-serif", fontSize: 12.5, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              <Pencil size={13} /> Edit Profile
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4 }}>
          {(["profile", "settings"] as Tab[]).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} style={{
              flex: 1, textTransform: "capitalize", background: tab === t ? C.indigo : "transparent",
              border: "none", borderRadius: 10, padding: "9px 0", cursor: "pointer",
              fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700,
              color: tab === t ? "#fff" : C.muted,
            }}>
              {t}
            </button>
          ))}
        </div>

        {tab === "profile" ? (
          <>
            {/* Stats */}
            <SectionHeader label="Your Stats" color={C.yellow} />
            {loading && (
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: C.muted, margin: "-6px 0 12px" }}>
                Loading your stats…
              </p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 26 }}>
              <StatBox value={stats.totalBattles} label="Total Battles" />
              <StatBox value={`${stats.winRate}%`} label="Win Rate" valueColor={C.green} />
              <StatBox value={stats.streak} label="Streak" valueColor={C.coral} />
              <StatBox value={stats.topSubject} label="Top Subject" small />
            </div>

            {/* Achievements */}
            <SectionHeader label="Achievements" color={C.coral} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, marginBottom: 26 }}>
              {achievements.map((a) => (
                <div key={a.id} style={{
                  background: a.earned ? "rgba(255,201,60,0.08)" : C.card,
                  border: `1.5px solid ${a.earned ? "rgba(255,201,60,0.35)" : C.cardBorder}`,
                  borderRadius: 16, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 8,
                  opacity: a.earned ? 1 : 0.55,
                }}>
                  <div style={{ color: a.earned ? C.yellow : C.muted }}>{a.icon}</div>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>
                    {a.title}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, color: C.muted, margin: 0 }}>
                    {a.desc}
                  </p>
                  <span style={{
                    display: "flex", alignItems: "center", gap: 4, fontFamily: "Manrope, sans-serif",
                    fontSize: 10, fontWeight: 800, color: a.earned ? C.green : C.muted,
                  }}>
                    {a.earned ? <><Check size={11} /> Earned</> : <><Lock size={11} /> Locked</>}
                  </span>
                </div>
              ))}
            </div>

            {/* Learning insights */}
            <SectionHeader label="Learning Insights" color={C.indigo} />
            <div style={{ background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 18, padding: "18px 20px" }}>
              {insights.rows.length === 0 ? (
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>
                  Complete a few battles across your classes to see monthly progress here.
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 120, marginBottom: 12 }}>
                    {insights.rows.map(({ subject, thisAvg, prevAvg }) => (
                      <div key={subject} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 88 }}>
                          <div title={`Previous month: ${Math.round(prevAvg)}%`} style={{
                            width: 14, height: `${Math.max(4, prevAvg)}%`, borderRadius: 4,
                            background: "rgba(255,255,255,0.18)",
                          }} />
                          <div title={`This month: ${Math.round(thisAvg)}%`} style={{
                            width: 14, height: `${Math.max(4, thisAvg)}%`, borderRadius: 4,
                            background: thisAvg >= prevAvg ? C.indigo : C.coral,
                          }} />
                        </div>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 700, color: C.muted }}>
                          {subject}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 14, marginBottom: insights.mostImproved ? 12 : 0 }}>
                    <Legend color="rgba(255,255,255,0.18)" label="Prev Month" />
                    <Legend color={C.indigo} label="This Month" />
                  </div>
                  {insights.mostImproved && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, background: "rgba(46,212,122,0.1)",
                      border: "1px solid rgba(46,212,122,0.3)", borderRadius: 12, padding: "9px 14px",
                    }}>
                      <TrendingUp size={13} color={C.green} />
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)" }}>
                        Most improved: <strong style={{ color: C.green }}>
                          {insights.mostImproved.subject} ({insights.mostImproved.delta >= 0 ? "+" : ""}{Math.round(insights.mostImproved.delta)}%)
                        </strong>
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div style={{ background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 18, padding: "22px 22px" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
              Account Email
            </p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: "0 0 20px" }}>
              {user?.email}
            </p>

            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
              Change Password
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                style={{
                  flex: 1, minWidth: 180, boxSizing: "border-box", background: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px",
                  fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#fff", outline: "none",
                }}
              />
              <button type="button" onClick={handleChangePassword} disabled={savingPassword} style={{
                background: C.indigo, border: "none", borderRadius: 12, padding: "10px 20px",
                fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: "#fff",
                cursor: savingPassword ? "default" : "pointer", opacity: savingPassword ? 0.7 : 1,
              }}>
                {savingPassword ? "Saving…" : "Update"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <p style={{
      fontFamily: "Manrope, sans-serif", fontSize: 11.5, fontWeight: 800, color,
      textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 12px",
    }}>
      {label}
    </p>
  );
}

function StatBox({ value, label, valueColor, small }: { value: React.ReactNode; label: string; valueColor?: string; small?: boolean }) {
  return (
    <div style={{
      background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 14,
      padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      <span style={{
        fontFamily: small ? "Manrope, sans-serif" : "Fredoka, sans-serif",
        fontSize: small ? 15 : 22, fontWeight: 700, color: valueColor || "#fff", textAlign: "center",
      }}>
        {value}
      </span>
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10.5, fontWeight: 700, color: C.muted, textAlign: "center" }}>
        {label}
      </span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 9, height: 9, borderRadius: 3, background: color }} />
      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted }}>{label}</span>
    </div>
  );
}
