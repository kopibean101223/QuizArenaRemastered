import type { SupabaseClient } from "@supabase/supabase-js";
import { PENDING_JOIN_CODE_KEY } from "./studentData";

export interface JoinResult {
  ok: boolean;
  message: string;
  sessionId?: string; // quiz_sessions.id — the unique session UUID
  code?: string;
  mode?: string | null; // quiz_sessions.mode — LIVE | TEAM | ROYALE | SELF_PACED
}

/** Looks up an ACTIVE session by room code. Returns its unique session id + mode. */
export async function resolveRoomCode(
  supabase: SupabaseClient,
  code: string
): Promise<JoinResult> {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) return { ok: false, message: "Enter a room code first." };

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("id, mode, status, deadline, created_at")
    .eq("room_code", trimmed)
    .maybeSingle();

  if (error) return { ok: false, message: "Database error: " + error.message };
  if (!data) return { ok: false, message: "Invalid or inactive room code." };

  if (user) {
    const { data: pastResult } = await supabase
      .from("quiz_results")
      .select("id")
      .eq("session_id", data.id)
      .eq("user_id", user.id)
      .maybeSingle();
      
    if (pastResult) {
      return { ok: false, message: "You have already completed this quiz!" };
    }
  }

  if (data.status !== "ACTIVE") {
    return { ok: false, message: "Invalid or inactive room code." };
  }

  if (data.deadline) {
    const deadlineDate = new Date(data.deadline);
    if (new Date() > deadlineDate) {
      return { ok: false, message: "The deadline for this quiz has already passed." };
    }
  }

  // Also check if created_at is in the future (with 1 minute grace) due to timezone differences
  if (data.created_at) {
    const createdDate = new Date(data.created_at);
    if (new Date().getTime() < createdDate.getTime() - 60000) {
      return { ok: false, message: "This quiz is not yet available to take." };
    }
  }

  return { ok: true, message: "Joined!", sessionId: data.id, code: trimmed, mode: data.mode };
}

export function stagePendingJoin(code: string, sessionId: string, mode?: string | null) {
  try {
    window.localStorage.setItem(
      PENDING_JOIN_CODE_KEY,
      // key kept as "sectionId" for backward compatibility with any
      // existing readers of this localStorage payload — it now always
      // holds the unique session UUID, not the class section id.
      JSON.stringify({ code, sectionId: sessionId, mode: mode ?? null })
    );
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

/**
 * Reads back whatever stagePendingJoin() stored, exactly once, clearing it
 * afterward so a stale handoff can't be replayed on a later visit.
 * Call this from the Lobby page's mount effect.
 */
export function consumePendingJoin(): { code: string; sessionId: string; mode: string | null } | null {
  try {
    const raw = window.localStorage.getItem(PENDING_JOIN_CODE_KEY);
    if (!raw) return null;
    window.localStorage.removeItem(PENDING_JOIN_CODE_KEY);
    const pending = JSON.parse(raw) as { code?: string; sectionId?: string; mode?: string | null };
    if (pending?.code && pending?.sectionId) {
      return { code: pending.code, sessionId: pending.sectionId, mode: pending.mode ?? null };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * One-call helper: "I only have a room code, validate it and hand off to
 * the lobby." Use this for the Dashboard's manual code box (or any future
 * spot that only has a typed code, not a known session id).
 */
export async function joinBattleByCode(
  supabase: SupabaseClient,
  code: string
): Promise<JoinResult> {
  const res = await resolveRoomCode(supabase, code);
  if (res.ok && res.sessionId && res.code) {
    stagePendingJoin(res.code, res.sessionId, res.mode);
  }
  return res;
}

/**
 * Use this when the caller already knows the session id + mode (e.g. clicking
 * "Join Now" on a Live Now card, which already has quiz_sessions.id/mode from
 * the sections query) — skips the redundant DB round-trip.
 */
export function joinKnownBattle(roomCode: string, sessionId: string, mode?: string | null) {
  stagePendingJoin(roomCode, sessionId, mode);
}