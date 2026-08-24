'use client';

import { useApp } from "../../../context/AppContext";
import { StudentTopBar } from "../../shared/StudentTopBar";
import {
  Crown,
  Users,
  Trophy,
  Info,
} from "lucide-react";

import { useBattleSocketContext } from "@/lib/student/battle/useBattleSocketProvider";

import { C } from "../ComponentsLobby/LobbyConstants";
import { PlayerChip } from "../ComponentsLobby/PlayerChip";
import { EmptySlot } from "../ComponentsLobby/EmptySlot";
import { CountdownDisplay } from "../ComponentsLobby/CountdownDisplay";

import { BattleRoyale } from "../Battle_BattleRoyale";
import type { LobbyModeProps } from "./Lobby_LiveQuiz";

/**
 * No longer owns a WebSocket (useLobbySocket) — connection now lives in
 * BattleSocketProvider, mounted with mode="ROYALE" above this component
 * (see StudentDashboard.tsx), so JOIN_ROYALE goes out on the same socket
 * that stays open through the whole lobby -> battle transition.
 */
export function Lobby_BattleRoyale({
  sessionId,
  roomCode,
}: LobbyModeProps) {
  const { user } = useApp();

  const {
    players,
    countdown,
    battleStarted,
  } = useBattleSocketContext();

  /*
   * The shared socket context handles the real-time lobby.
   * Once the professor starts the battle, immediately hand
   * the SAME quiz_sessions.id to BattleRoyale.
   */
  if (battleStarted) {
    return (
      <BattleRoyale
        battleId={sessionId}
      />
    );
  }

  const emptySlots = Math.max(
    0,
    12 - players.length
  );

  return (
    <>
      <StudentTopBar />

      <div
        style={{
          minHeight: "100vh",
          background: C.navy,
          paddingTop: 42,
          paddingBottom: 48,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* HEADER */}
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          {/* ROYALE BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,107,74,0.10)",
              border: "1px solid rgba(255,107,74,0.28)",
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 14,
            }}
          >
            <Crown size={14} color={C.coral} strokeWidth={2.5} />
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                color: C.coral,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Battle Royale
            </span>
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontFamily: "Fredoka, sans-serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Ready for <span style={{ color: C.coral }}>Battle Royale?</span>
          </h1>
        </div>

        {/* MAIN */}
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "30px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* ROOM CODE */}
          <div
            style={{
              width: "100%",
              maxWidth: 650,
              margin: "0 auto",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 22,
              padding: "20px 24px",
              textAlign: "center",
              boxShadow: "0 10px 35px rgba(0,0,0,0.18)",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                color: C.green,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Successfully Joined Room
            </p>

            <div
              style={{
                fontFamily: "Fredoka, sans-serif",
                fontSize: 40,
                fontWeight: 700,
                color: C.yellow,
                letterSpacing: "0.16em",
              }}
            >
              {roomCode}
            </div>
          </div>

          {/* PLAYER HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <Users size={17} color="rgba(255,255,255,0.48)" />
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.52)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Players ({players.length}/12)
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(255,71,87,0.08)",
                border: "1px solid rgba(255,71,87,0.18)",
                borderRadius: 20,
                padding: "6px 11px",
              }}
            >
              <Crown size={13} color={C.coral} />
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.coral,
                }}
              >
                {players.length}/12 JOINED
              </span>
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 22,
              padding: 22,
            }}
          >
            {/* CARD HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Crown size={19} color={C.yellow} fill={C.yellow} />
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  PARTICIPANTS
                </span>
              </div>

              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {players.length}/12 JOINED
              </span>
            </div>

            {/* PLAYER GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "26px 14px",
              }}
            >
              {players.map((player) => (
                <PlayerChip key={player.id} player={player} />
              ))}

              {Array.from({ length: emptySlots }).map((_, index) => (
                <EmptySlot key={`empty-${index}`} />
              ))}
            </div>
          </div>

          {/* WAITING */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 22px",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 17,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.yellow,
                  boxShadow: `0 0 10px ${C.yellow}`,
                  animation: "dotPulse 1s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                Waiting for the professor to start the battle…
              </span>
            </div>
          </div>

          {/* LOBBY INFO */}
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 22,
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Info size={18} color="rgba(255,255,255,0.6)" />
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  LOBBY INFO
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: C.coral,
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <Crown size={16} />
                Battle Royale
              </div>
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 4 }} />

            {[
              ["Room Code", roomCode],
              ["Mode", "Battle Royale"],
              ["Total Players", `${players.length} / 12`],
              ["Status", "Waiting to start…"],
            ].map(([label, value], index) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 0",
                  borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.58)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    fontWeight: 800,
                    color: label === "Status" ? C.yellow : "#fff",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHARED COUNTDOWN */}
      {countdown !== null && <CountdownDisplay count={countdown} />}

      {/* START TRANSITION */}
      {countdown === 0 && !battleStarted && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3D1508, #5A1F0C)",
            gap: 20,
          }}
        >
          <Crown fill={C.coral} color="transparent" size={64} />
          <span
            style={{
              fontFamily: "Fredoka, sans-serif",
              fontSize: 56,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Royale Begins!
          </span>
        </div>
      )}
    </>
  );
}