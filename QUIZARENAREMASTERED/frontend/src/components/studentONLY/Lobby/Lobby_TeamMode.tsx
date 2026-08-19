'use client';

import { useEffect, useMemo, useState } from "react";
import { useApp } from "../../../context/AppContext";
import { StudentTopBar } from "../../shared/StudentTopBar";

import {
  Shield,
  Users,
  Trophy,
  Info,
  UserPlus,
  Crown,
} from "lucide-react";

import { toast } from "sonner";

import { useLobbySocket } from "@/lib/student/battle/useLobbySockets";

import {
  C,
  CAPACITY,
  LobbyPlayerT,
} from "../ComponentsLobby/LobbyConstants";

import { PlayerChip } from "../ComponentsLobby/PlayerChip";
import { EmptySlot } from "../ComponentsLobby/EmptySlot";
import { CountdownDisplay } from "../ComponentsLobby/CountdownDisplay";

import { TeamBattle } from "../Battle_TeamMode";

import type { LobbyModeProps } from "./Lobby_LiveQuiz";

/* -------------------------------------------------------------------------- */
/* TEAM CONFIGURATION                                                         */
/* -------------------------------------------------------------------------- */

type TeamId = 1 | 2 | 3 | 4;

const TEAM_CAPACITY = 4;

const TEAM_CONFIG: Record<
  TeamId,
  {
    name: string;
    color: string;
    icon: string;
  }
> = {
  1: {
    name: "Team 1",
    color: C.indigo,
    icon: "🛡️",
  },
  2: {
    name: "Team 2",
    color: "#FFB347",
    icon: "🛡️",
  },
  3: {
    name: "Team 3",
    color: "#E88A8A",
    icon: "🛡️",
  },
  4: {
    name: "Team 4",
    color: "#F5A800",
    icon: "🛡️",
  },
};

const TEAM_IDS: TeamId[] = [1, 2, 3, 4];

/* -------------------------------------------------------------------------- */
/* LOCAL TEAM STATE                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Temporary frontend-only team assignment.
 *
 * Later, this can be replaced with the server-synchronized team state
 * coming from useLobbySockets.ts.
 */
type LocalTeamAssignments = Record<string, TeamId | null>;

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                   */
/* -------------------------------------------------------------------------- */

export function Lobby_TeamMode({
  sessionId,
  roomCode,
}: LobbyModeProps) {
  const { user } = useApp();

  const studentName =
    user?.username ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Unknown Student";

  /* ------------------------------------------------------------------------ */
  /* SOCKET                                                                    */
  /* ------------------------------------------------------------------------ */

  const {
    players,
    countdown,
    battleStarted,
  } = useLobbySocket({
    sessionId,
    userId: user?.id,
    userName: studentName,
    enabled: true,
    autoCountdown: true,
  });

  /* ------------------------------------------------------------------------ */
  /* LOCAL TEAM ASSIGNMENTS                                                    */
  /* ------------------------------------------------------------------------ */

  const [teamAssignments, setTeamAssignments] =
    useState<LocalTeamAssignments>({});

  /**
   * Whenever the WebSocket roster changes:
   *
   * - keep existing assignments for players that are still connected
   * - give newly joined players no team
   *
   * This creates the "Waiting for a Team" behavior.
   */
  useEffect(() => {
    setTeamAssignments((previous) => {
      const next: LocalTeamAssignments = {};

      players.forEach((player) => {
        if (Object.prototype.hasOwnProperty.call(previous, player.id)) {
          next[player.id] = previous[player.id];
        } else {
          next[player.id] = null;
        }
      });

      return next;
    });
  }, [players]);

  /* ------------------------------------------------------------------------ */
  /* TEAM HELPERS                                                              */
  /* ------------------------------------------------------------------------ */

  const getPlayerTeam = (
    playerId: string
  ): TeamId | null => {
    return teamAssignments[playerId] ?? null;
  };

  const getTeamPlayers = (
    teamId: TeamId
  ): LobbyPlayerT[] => {
    return players.filter(
      (player) =>
        getPlayerTeam(player.id) === teamId
    );
  };

  const waitingPlayers = useMemo(() => {
    return players.filter(
      (player) =>
        !getPlayerTeam(player.id)
    );
  }, [players, teamAssignments]);

  const currentPlayerId = user?.id || "";

  const currentPlayerTeam = currentPlayerId
    ? getPlayerTeam(currentPlayerId)
    : null;

  /* ------------------------------------------------------------------------ */
  /* JOIN / TRANSFER TEAM                                                      */
  /* ------------------------------------------------------------------------ */

  const handleJoinTeam = (teamId: TeamId) => {
    if (battleStarted) {
      toast.error(
        "You cannot change teams after the battle starts."
      );
      return;
    }

    const teamPlayers = getTeamPlayers(teamId);

    /* Prevent joining a full team */
    if (teamPlayers.length >= TEAM_CAPACITY) {
      toast.error(
        `${TEAM_CONFIG[teamId].name} is already full.`
      );
      return;
    }

    /* Already on this team */
    if (currentPlayerTeam === teamId) {
      toast.info(
        `You are already in ${TEAM_CONFIG[teamId].name}.`
      );
      return;
    }

    /* Move the current student */
    setTeamAssignments((previous) => ({
      ...previous,
      [currentPlayerId]: teamId,
    }));

    toast.success(
      `You joined ${TEAM_CONFIG[teamId].name}!`
    );
  };

  /* ------------------------------------------------------------------------ */
  /* LEAVE TEAM / RETURN TO WAITING                                           */
  /* ------------------------------------------------------------------------ */

  const handleLeaveTeam = () => {
    if (battleStarted) return;

    if (!currentPlayerId) return;

    setTeamAssignments((previous) => ({
      ...previous,
      [currentPlayerId]: null,
    }));

    toast.info("You are now waiting for a team.");
  };

  /* ------------------------------------------------------------------------ */
  /* BATTLE START                                                              */
  /* ------------------------------------------------------------------------ */

  if (battleStarted) {
    return (
      <TeamBattle
        battleId={sessionId}
      />
    );
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER TEAM CARD                                                          */
  /* ------------------------------------------------------------------------ */

  const renderTeamCard = (teamId: TeamId) => {
    const config = TEAM_CONFIG[teamId];

    const members = getTeamPlayers(teamId);

    const isFull =
      members.length >= TEAM_CAPACITY;

    const isCurrentTeam =
      currentPlayerTeam === teamId;

    const emptySlots =
      Math.max(
        0,
        TEAM_CAPACITY - members.length
      );

    return (
      <div
        key={teamId}
        style={{
          position: "relative",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
          border:
            isCurrentTeam
              ? `1.5px solid ${config.color}80`
              : "1.5px solid rgba(255,255,255,0.09)",
          borderRadius: 20,
          padding: 20,
          overflow: "hidden",
          boxShadow:
            isCurrentTeam
              ? `0 0 0 1px ${config.color}20, 0 12px 30px rgba(0,0,0,0.18)`
              : "0 10px 28px rgba(0,0,0,0.15)",
          transition:
            "all 0.2s ease",
        }}
      >
        {/* TEAM COLOR STRIP */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: config.color,
          }}
        />

        {/* TEAM HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              {config.icon}
            </span>

            <span
              style={{
                fontFamily:
                  "Fredoka, sans-serif",
                fontSize: 21,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {config.name}
            </span>
          </div>

          {/* CAPACITY */}
          <div
            style={{
              flexShrink: 0,
              background:
                isFull
                  ? "rgba(255,71,87,0.10)"
                  : "rgba(0,0,0,0.25)",
              borderRadius: 14,
              padding: "5px 10px",
              fontFamily:
                "Manrope, sans-serif",
              fontSize: 11,
              fontWeight: 800,
              color: isFull
                ? "#FF8A95"
                : "rgba(255,255,255,0.75)",
            }}
          >
            {members.length}/{TEAM_CAPACITY}
          </div>
        </div>

        {/* MEMBERS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(52px, 1fr))",
            gap: 10,
            alignItems: "start",
            minHeight: 92,
          }}
        >
          {members.map((player) => (
            <PlayerChip
              key={player.id}
              player={player}
              animate
            />
          ))}

          {Array.from({
            length: emptySlots,
          }).map((_, index) => (
            <EmptySlot
              key={`empty-${teamId}-${index}`}
            />
          ))}
        </div>

        {/* JOIN BUTTON */}
        <button
          type="button"
          disabled={
            battleStarted ||
            isFull ||
            isCurrentTeam
          }
          onClick={() =>
            handleJoinTeam(teamId)
          }
          style={{
            width: "100%",
            marginTop: 18,
            borderRadius: 11,
            border:
              isCurrentTeam
                ? `1px solid ${config.color}50`
                : isFull
                  ? "1px solid rgba(255,255,255,0.06)"
                  : `1px solid ${config.color}80`,
            padding: "10px 14px",
            background:
              isCurrentTeam
                ? `${config.color}18`
                : isFull
                  ? "rgba(255,255,255,0.035)"
                  : `${config.color}14`,
            color:
              isCurrentTeam
                ? config.color
                : isFull
                  ? "rgba(255,255,255,0.25)"
                  : "#fff",
            fontFamily:
              "Manrope, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.02em",
            cursor:
              isFull ||
              isCurrentTeam
                ? "default"
                : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            transition:
              "all 0.18s ease",
          }}
        >
          {isCurrentTeam ? (
            <>
              <Shield size={14} />
              CURRENT TEAM
            </>
          ) : isFull ? (
            <>
              <Users size={14} />
              TEAM FULL
            </>
          ) : (
            <>
              <UserPlus size={14} />
              JOIN TEAM
            </>
          )}
        </button>
      </div>
    );
  };

  /* ------------------------------------------------------------------------ */
  /* MAIN UI                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <StudentTopBar />

      <div
        style={{
          minHeight: "100vh",
          background: C.navy,
          display: "flex",
          flexDirection: "column",
          paddingTop: 48,
          paddingBottom: 40,
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div
          style={{
            textAlign: "center",
            marginBottom: 26,
            padding: "0 24px",
          }}
        >
          {/* MODE BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background:
                "rgba(46,212,122,0.15)",
              border:
                "1.5px solid rgba(46,212,122,0.3)",
              borderRadius: 20,
              padding: "5px 16px",
              marginBottom: 12,
            }}
          >
            <Shield
              size={13}
              color={C.green}
            />

            <span
              style={{
                fontFamily:
                  "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                color: C.green,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Team Mode
            </span>
          </div>

          {/* TITLE */}
          <h1
            style={{
              fontFamily:
                "Fredoka, sans-serif",
              fontSize: 48,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            Ready to{" "}
            <span
              style={{
                color: C.green,
              }}
            >
              Battle Together?
            </span>
          </h1>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* ---------------------------------------------------------------- */}
          {/* ROOM CODE                                                        */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              width: "100%",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 24,
                padding: "22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.green,
                  margin: 0,
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.1em",
                }}
              >
                Successfully Joined Room
              </p>

              <span
                style={{
                  fontFamily:
                    "Fredoka, sans-serif",
                  fontSize: 42,
                  fontWeight: 700,
                  color: C.yellow,
                  letterSpacing:
                    "0.16em",
                }}
              >
                {roomCode}
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* PLAYER HEADER                                                    */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <Users
                size={17}
                color="rgba(255,255,255,0.48)"
              />

              <span
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color:
                    "rgba(255,255,255,0.52)",
                  letterSpacing:
                    "0.08em",
                  textTransform:
                    "uppercase",
                }}
              >
                Players ({players.length}/
                {CAPACITY})
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background:
                  "rgba(46,212,122,0.08)",
                border:
                  "1px solid rgba(46,212,122,0.18)",
                borderRadius: 20,
                padding: "6px 11px",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.green,
                }}
              />

              <span
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.green,
                }}
              >
                {players.length}/{CAPACITY} JOINED
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* FOUR TEAMS                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: 16,
            }}
          >
            {TEAM_IDS.map(
              (teamId) =>
                renderTeamCard(teamId)
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* WAITING FOR A TEAM                                               */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border:
                "1.5px solid rgba(255,255,255,0.10)",
              borderRadius: 22,
              padding: 22,
            }}
          >
            {/* WAITING HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom:
                  waitingPlayers.length > 0
                    ? 20
                    : 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <Users
                  size={19}
                  color={C.yellow}
                />

                <span
                  style={{
                    fontFamily:
                      "Manrope, sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  WAITING FOR A TEAM
                </span>
              </div>

              <span
                style={{
                  background:
                    "rgba(255,201,60,0.10)",
                  border:
                    "1px solid rgba(255,201,60,0.20)",
                  borderRadius: 14,
                  padding:
                    "5px 10px",
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.yellow,
                }}
              >
                {waitingPlayers.length}{" "}
                {waitingPlayers.length === 1
                  ? "WAITING"
                  : "WAITING"}
              </span>
            </div>

            {/* WAITING PLAYERS */}
            {waitingPlayers.length > 0 ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(90px, 1fr))",
                    gap: 18,
                    padding:
                      "4px 4px 8px",
                  }}
                >
                  {waitingPlayers.map(
                    (player) => (
                      <PlayerChip
                        key={player.id}
                        player={player}
                        animate
                      />
                    )
                  )}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 14,
                    borderTop:
                      "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background:
                        C.yellow,
                      boxShadow:
                        `0 0 8px ${C.yellow}`,
                    }}
                  />

                  <span
                    style={{
                      fontFamily:
                        "Manrope, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        "rgba(255,255,255,0.42)",
                    }}
                  >
                    Choose any available
                    team above to join.
                  </span>
                </div>
              </>
            ) : (
              <div
                style={{
                  minHeight: 86,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection:
                    "column",
                  gap: 7,
                  border:
                    "1px dashed rgba(255,255,255,0.08)",
                  borderRadius: 15,
                }}
              >
                <Shield
                  size={22}
                  color="rgba(255,255,255,0.16)"
                />

                <span
                  style={{
                    fontFamily:
                      "Manrope, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color:
                      "rgba(255,255,255,0.28)",
                  }}
                >
                  Everyone has joined a
                  team.
                </span>
              </div>
            )}

            {/* CURRENT USER LEAVE TEAM */}
            {currentPlayerTeam && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  justifyContent:
                    "center",
                }}
              >
                <button
                  type="button"
                  onClick={
                    handleLeaveTeam
                  }
                  style={{
                    border:
                      "1px solid rgba(255,255,255,0.10)",
                    background:
                      "rgba(255,255,255,0.045)",
                    color:
                      "rgba(255,255,255,0.55)",
                    borderRadius: 10,
                    padding:
                      "8px 14px",
                    fontFamily:
                      "Manrope, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor:
                      "pointer",
                  }}
                >
                  Leave Team
                </button>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* WAITING FOR PROFESSOR                                            */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding:
                  "15px 22px",
                background:
                  "rgba(255,255,255,0.045)",
                border:
                  "1px solid rgba(255,255,255,0.09)",
                borderRadius: 17,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    C.yellow,
                  boxShadow:
                    `0 0 10px ${C.yellow}`,
                  animation:
                    "dotPulse 1s ease-in-out infinite",
                }}
              />

              <span
                style={{
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color:
                    "rgba(255,255,255,0.55)",
                }}
              >
                Waiting for the professor
                to start the battle…
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* LOBBY INFO                                                       */}
          {/* ---------------------------------------------------------------- */}

          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
              border:
                "1.5px solid rgba(255,255,255,0.10)",
              borderRadius: 22,
              padding: 24,
            }}
          >
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <Info
                  size={18}
                  color="rgba(255,255,255,0.6)"
                />

                <span
                  style={{
                    fontFamily:
                      "Manrope, sans-serif",
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
                  color: C.green,
                  fontFamily:
                    "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <Shield size={16} />
                Team Mode
              </div>
            </div>

            <div
              style={{
                height: 1,
                background:
                  "rgba(255,255,255,0.08)",
                marginBottom: 4,
              }}
            />

            {/* INFO ROWS */}
            {[
              {
                label: "Room Code",
                value: roomCode,
              },
              {
                label: "Teams",
                value: "4",
              },
              {
                label: "Total Players",
                value: `${players.length} / ${CAPACITY}`,
              },
              {
                label: "Unassigned",
                value: `${waitingPlayers.length}`,
              },
              {
                label: "Status",
                value: "Waiting to start…",
              },
            ].map(
              (item, index) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    padding:
                      "15px 0",
                    borderBottom:
                      index <
                      4
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "Manrope, sans-serif",
                      fontSize: 13,
                      color:
                        "rgba(255,255,255,0.58)",
                    }}
                  >
                    {item.label}
                  </span>

                  <span
                    style={{
                      fontFamily:
                        "Manrope, sans-serif",
                      fontSize: 13,
                      fontWeight: 800,
                      color:
                        item.label ===
                        "Status"
                          ? C.yellow
                          : "#fff",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* COUNTDOWN                                                            */}
      {/* -------------------------------------------------------------------- */}

      {countdown !== null && (
        <CountdownDisplay
          count={countdown}
        />
      )}

      {/* -------------------------------------------------------------------- */}
      {/* START TRANSITION                                                     */}
      {/* -------------------------------------------------------------------- */}

      {countdown === 0 &&
        !battleStarted && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 500,
              display: "flex",
              flexDirection:
                "column",
              alignItems: "center",
              justifyContent:
                "center",
              background:
                "linear-gradient(135deg, #0E2E1A, #10442A)",
              gap: 20,
            }}
          >
            <Trophy
              fill={C.green}
              color="transparent"
              size={64}
            />

            <span
              style={{
                fontFamily:
                  "Fredoka, sans-serif",
                fontSize: 56,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Teams Assembling!
            </span>
          </div>
        )}
    </>
  );
}