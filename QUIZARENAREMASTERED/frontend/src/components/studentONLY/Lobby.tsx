'use client';

import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import { resolveRoomCode, consumePendingJoin } from "@/lib/student/joinlobby";
import { Zap } from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";
import { C } from "./ComponentsLobby/LobbyConstants";
import { Lobby_LiveQuiz } from "./Lobby/Lobby_LiveQuiz";
import { Lobby_TeamMode } from "./Lobby/Lobby_TeamMode";
import { Lobby_BattleRoyale } from "./Lobby/Lobby_BattleRoyale";
import { Lobby_OwnPaced } from "./Lobby/Lobby_OwnPaced";

type ResolvedMode = "LIVE" | "TEAM" | "ROYALE" | "SELF_PACED";

function normalizeMode(mode: string | null | undefined): ResolvedMode {
  const m = (mode || "").toUpperCase();
  if (m === "TEAM") return "TEAM";
  if (m === "ROYALE") return "ROYALE";
  if (m === "SELF_PACED" || m === "SELFPACED") return "SELF_PACED";
  return "LIVE";
}

/**
 * Formerly BattleLobby.tsx. Now purely the room-code entry point: resolve the
 * code -> quiz_sessions.mode, then redirect straight into the matching
 * mode-specific lobby (Lobby_LiveQuiz / Lobby_TeamMode / Lobby_BattleRoyale /
 * Lobby_OwnPaced). All lobby-specific UI + logic lives in those files now.
 */
export function Lobby() {
  const { user, setActiveSectionId } = useApp();
  const supabase = createBrowserSupabaseClient();

  const [hasJoined, setHasJoined] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [mode, setMode] = useState<ResolvedMode>("LIVE");

  // Picks up a room code already validated on the Dashboard's "Join a Battle"
  // widget (or a "Join Now" click on a Live Now card), so the student doesn't
  // have to re-type it here.
  useEffect(() => {
    const pending = consumePendingJoin();
    if (pending) {
      setRoomCode(pending.code);
      setSessionId(pending.sessionId);
      setMode(normalizeMode(pending.mode));
      setActiveSectionId(pending.sessionId);
      setHasJoined(true);
      toast.success("Successfully joined the live lobby!");
    }
  }, []);

  const handleJoinClick = async () => {
    if (!inputCode.trim()) {
      alert("Please enter a valid room code.");
      return;
    }
    const res = await resolveRoomCode(supabase, inputCode);
    if (!res.ok || !res.sessionId) {
      alert(res.message);
      return;
    }
    setRoomCode(res.code!);
    setSessionId(res.sessionId);
    setMode(normalizeMode(res.mode));
    setActiveSectionId(res.sessionId);
    setHasJoined(true);
    toast.success("Successfully joined the live lobby!");
  };

  // Handoff to the mode-specific lobby once we know which room + mode.
  if (hasJoined && sessionId) {
    switch (mode) {
      case "TEAM":
        return <Lobby_TeamMode sessionId={sessionId} roomCode={roomCode} />;
      case "ROYALE":
        return <Lobby_BattleRoyale sessionId={sessionId} roomCode={roomCode} />;
      case "SELF_PACED":
        return <Lobby_OwnPaced sessionId={sessionId} roomCode={roomCode} />;
      case "LIVE":
      default:
        return <Lobby_LiveQuiz sessionId={sessionId} roomCode={roomCode} />;
    }
  }

  // Room-code entry screen only.
  return (
    <>
      <StudentTopBar />
      <div style={{ minHeight: "100vh", background: C.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 48, paddingBottom: 32 }}>
        <div style={{ textAlign: "center", marginBottom: 24, padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,201,60,0.15)", border: "1.5px solid rgba(255,201,60,0.3)", borderRadius: 20, padding: "5px 16px", marginBottom: 12 }}>
            <Zap size={13} fill={C.yellow} color="transparent" />
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.yellow, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Join a Room
            </span>
          </div>
          <h1 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 48, fontWeight: 700, color: "#fff", margin: 0 }}>
            Ready to <span style={{ color: C.yellow }}>Battle?</span>
          </h1>
        </div>

        <div style={{ width: "100%", maxWidth: 600, padding: "0 24px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "22px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", textAlign: "center", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Enter Room Code
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.toUpperCase())}
                  maxLength={7}
                  placeholder="QZ-0000"
                  style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "14px 20px", fontFamily: "Fredoka, sans-serif", fontSize: 36, fontWeight: 700, color: C.yellow, outline: "none", letterSpacing: "0.15em", textAlign: "center", width: "100%", boxSizing: "border-box" }}
                />
                <button type="button" onClick={handleJoinClick} style={{
                  background: C.coral, border: "none", borderRadius: 16, padding: "14px 28px", fontFamily: "Fredoka, sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0, boxShadow: "0 6px 20px rgba(255,107,74,0.4)"
                }}>
                  Join!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}