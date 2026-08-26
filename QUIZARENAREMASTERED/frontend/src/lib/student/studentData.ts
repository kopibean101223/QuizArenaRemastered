
import type { SupabaseClient } from "@supabase/supabase-js";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface QuizResultRow {
  id?: string;
  session_id: string;
  room_code: string | null;
  score: number;
  correct_answers: number;
  total_questions: number;
  accuracy: number;
  rank: number;
  completed_at: string;
  quiz_sessions: {
    id: string;
    section_id: string;
    mode: string | null;
    status?: string | null;
  } | null;
}

export interface MySection {
  id: string;
  name: string;
  join_code: string;
  professor_id: string;
  professorName: string;
  studentCount: number;
  liveSessionCount: number;
  totalSessionCount: number;
  isLiveNow: boolean;
  subject: string;
}

// ─── Subject inference ──────────────────────────────────────────────────────
// The `sections` table has no dedicated subject column, so we derive a
// display-friendly subject tag from the section's name (same approach the
// professor-side dashboard already takes with its own placeholder values).

export function deriveSubject(sectionName: string): string {
  const n = (sectionName || "").toLowerCase();
  if (/(math|calc|algebra|geometry|stat|trig)/.test(n)) return "Math";
  if (/(eng|writing|literature|reading|comm)/.test(n)) return "English";
  if (/(cs|comp|code|coding|program|data\s*struct|software|algorithm)/.test(n)) return "Coding";
  if (/(sci|physic|chem|bio)/.test(n)) return "Science";
  if (/(hist)/.test(n)) return "History";
  return sectionName || "General";
}

export const SUBJECT_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Math:     { text: "#B6A6FF", bg: "rgba(91,61,246,0.18)",  border: "rgba(91,61,246,0.35)" },
  English:  { text: "#FF9B80", bg: "rgba(255,107,74,0.18)", border: "rgba(255,107,74,0.35)" },
  Coding:   { text: "#7CE8AE", bg: "rgba(46,212,122,0.18)", border: "rgba(46,212,122,0.35)" },
  Science:  { text: "#8FD8F8", bg: "rgba(91,200,246,0.18)", border: "rgba(91,200,246,0.35)" },
  History:  { text: "#FFDD85", bg: "rgba(255,201,60,0.18)", border: "rgba(255,201,60,0.35)" },
  General:  { text: "#C7C9D9", bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.18)" },
};

export function subjectColor(subject: string) {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS.General;
}

export function modeLabel(mode: string | null | undefined): string {
  switch ((mode || "").toUpperCase()) {
    case "TEAM": return "Team";
    case "ROYALE": return "Battle Royale";
    case "CHAOSCLASH":
    case "CHAOS_CLASH": return "ChaosClash";
    case "SELF_PACED": return "Individual";
    case "LIVE":
    default: return "Individual";
  }
}

// ─── Queries ────────────────────────────────────────────────────────────────

export async function fetchMyQuizResults(
  supabase: SupabaseClient,
  userId: string
): Promise<QuizResultRow[]> {
  const { data, error } = await supabase
    .from("quiz_results")
    .select(
      `id, session_id, room_code, score, correct_answers, total_questions, accuracy, rank, completed_at,
       quiz_sessions:session_id ( id, section_id, mode, status )`
    )
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) {
    console.error("[studentData] fetchMyQuizResults error:", error.message);
    return [];
  }
  return (data || []) as unknown as QuizResultRow[];
}

export async function fetchMySections(
  supabase: SupabaseClient,
  userId: string
): Promise<MySection[]> {
  const { data: links, error: linkErr } = await supabase
    .from("section_students")
    .select("section_id")
    .eq("student_id", userId);

  if (linkErr || !links || links.length === 0) {
    if (linkErr) console.error("[studentData] fetchMySections link error:", linkErr.message);
    return [];
  }

  const sectionIds = links.map((l: any) => l.section_id);

  const { data: sections, error: secErr } = await supabase
    .from("sections")
    .select("id, name, join_code, professor_id, created_at")
    .in("id", sectionIds);

  if (secErr || !sections) {
    console.error("[studentData] fetchMySections sections error:", secErr?.message);
    return [];
  }

  const profIds = Array.from(new Set(sections.map((s: any) => s.professor_id).filter(Boolean)));
  const profNames: Record<string, string> = {};
  if (profIds.length > 0) {
    const { data: profs } = await supabase
      .from("profiles")
      .select("user_id, username")
      .in("user_id", profIds);
    (profs || []).forEach((p: any) => { profNames[p.user_id] = p.username || "Professor"; });
  }

  const { data: counts } = await supabase
    .from("section_students")
    .select("section_id")
    .in("section_id", sectionIds);
  const countMap: Record<string, number> = {};
  (counts || []).forEach((c: any) => {
    countMap[c.section_id] = (countMap[c.section_id] || 0) + 1;
  });

  const { data: sessions } = await supabase
    .from("quiz_sessions")
    .select("section_id, status")
    .in("section_id", sectionIds);
  const liveMap: Record<string, number> = {};
  const totalMap: Record<string, number> = {};
  (sessions || []).forEach((s: any) => {
    totalMap[s.section_id] = (totalMap[s.section_id] || 0) + 1;
    if (s.status === "ACTIVE") liveMap[s.section_id] = (liveMap[s.section_id] || 0) + 1;
  });

  return sections.map((s: any) => ({
    id: s.id,
    name: s.name,
    join_code: s.join_code,
    professor_id: s.professor_id,
    professorName: profNames[s.professor_id] || "Professor",
    studentCount: countMap[s.id] || 0,
    liveSessionCount: liveMap[s.id] || 0,
    totalSessionCount: totalMap[s.id] || 0,
    isLiveNow: (liveMap[s.id] || 0) > 0,
    subject: deriveSubject(s.name),
  }));
}

export interface LiveSessionInfo {
  id: string;
  section_id: string;
  sectionName: string;
  room_code: string;
  mode: string | null;
}

export async function fetchLiveSessionsForMySections(
  supabase: SupabaseClient,
  sections: { id: string; name: string }[]
): Promise<LiveSessionInfo[]> {
  if (!sections.length) return [];
  const ids = sections.map((s) => s.id);
  const nameById: Record<string, string> = {};
  sections.forEach((s) => { nameById[s.id] = s.name; });

  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("id, section_id, room_code, mode, status")
    .in("section_id", ids)
    .eq("status", "ACTIVE");

  if (error) {
    console.error("[studentData] fetchLiveSessionsForMySections error:", error.message);
    return [];
  }

  return (data || []).map((s: any) => ({
    id: s.id,
    section_id: s.section_id,
    sectionName: nameById[s.section_id] || "Class",
    room_code: s.room_code,
    mode: s.mode,
  }));
}

export async function joinSectionByCode(
  supabase: SupabaseClient,
  userId: string,
  code: string
): Promise<{ ok: boolean; message: string }> {
  const trimmed = code.trim();
  if (!trimmed) return { ok: false, message: "Enter a class code first." };

  const { data: section, error: findErr } = await supabase
    .from("sections")
    .select("id, name")
    .eq("join_code", trimmed)
    .maybeSingle();

  if (findErr) return { ok: false, message: "Database error: " + findErr.message };
  if (!section) return { ok: false, message: "No class found with that code." };

  const { data: existing } = await supabase
    .from("section_students")
    .select("section_id")
    .eq("section_id", section.id)
    .eq("student_id", userId)
    .maybeSingle();

  if (existing) return { ok: false, message: `You're already enrolled in ${section.name}.` };

  const { error: insertErr } = await supabase
    .from("section_students")
    .insert([{ section_id: section.id, student_id: userId }]);

  if (insertErr) return { ok: false, message: "Failed to join: " + insertErr.message };

  return { ok: true, message: `Joined ${section.name}!` };
}

export async function findActiveSessionByRoomCode(
  supabase: SupabaseClient,
  code: string
): Promise<{ ok: boolean; message: string; sectionId?: string }> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { ok: false, message: "Enter a room code first." };

  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("section_id")
    .eq("room_code", trimmed)
    .eq("status", "ACTIVE")
    .maybeSingle();

  if (error) return { ok: false, message: "Database error: " + error.message };
  if (!data) return { ok: false, message: "Invalid or inactive room code." };

  return { ok: true, message: "Joined!", sectionId: data.section_id };
}

// ─── Derived stat calculations (all computed client-side from real rows) ────

export function computeStreakDays(completedAtDates: string[]): number {
  if (!completedAtDates.length) return 0;
  const daySet = new Set(completedAtDates.map((d) => new Date(d).toDateString()));

  const cursor = new Date();
  if (!daySet.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!daySet.has(cursor.toDateString())) return 0;
  }
  let streak = 0;
  while (daySet.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export const XP_PER_LEVEL = 200;

export function levelFromXp(xp: number) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return { level, into, next: XP_PER_LEVEL, progress: into / XP_PER_LEVEL };
}

export interface StudentStatsSummary {
  totalBattles: number;
  battlesWon: number;
  winRate: number;
  totalXp: number;
  streak: number;
  bestAccuracy: number;
  topSubject: string;
}

export function summarizeResults(
  results: QuizResultRow[],
  sectionSubjectBySectionId: Record<string, string>
): StudentStatsSummary {
  const totalBattles = results.length;
  const battlesWon = results.filter((r) => r.rank === 1).length;
  const winRate = totalBattles ? Math.round((battlesWon / totalBattles) * 100) : 0;
  const totalXp = results.reduce((sum, r) => sum + (r.score || 0), 0);
  const streak = computeStreakDays(results.map((r) => r.completed_at));
  const bestAccuracy = results.reduce((m, r) => Math.max(m, r.accuracy || 0), 0);

  const subjectXp: Record<string, number> = {};
  results.forEach((r) => {
    const secId = r.quiz_sessions?.section_id;
    const subject = secId ? sectionSubjectBySectionId[secId] : undefined;
    if (!subject) return;
    subjectXp[subject] = (subjectXp[subject] || 0) + (r.score || 0);
  });
  let topSubject = "—";
  let topXp = -1;
  Object.entries(subjectXp).forEach(([subj, xp]) => {
    if (xp > topXp) { topXp = xp; topSubject = subj; }
  });

  return { totalBattles, battlesWon, winRate, totalXp, streak, bestAccuracy, topSubject };
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

export const PENDING_JOIN_CODE_KEY = "qa_pending_join_room_code";
