'use client';

import { useEffect, useRef, useState, MutableRefObject } from "react";
import { AVATAR_COLORS, LobbyPlayerT } from "@/components/studentONLY/ComponentsLobby/LobbyConstants";

export interface UseLobbySocketOptions {
  /** quiz_sessions.id — the unique session UUID (NOT section_id). */
  sessionId: string;
  userId?: string;
  userName?: string;
  /** Skip connecting until this is true (e.g. wait for sessionId to resolve). */
  enabled: boolean;
  /**
   * Whether to run the shared 3-2-1 lobby countdown when the professor starts
   * the battle. Live/Team/Royale = true. Own-Paced = false (no shared start,
   * each student begins the moment they join).
   */
  autoCountdown?: boolean;
  /**
   * Extra handler for mode-specific payloads this hook doesn't already cover
   * (team assignments, royale eliminations, self-paced progress, etc).
   * Called for every parsed message, in addition to this hook's own handling.
   */
  onMessage?: (data: any) => void;
}

export interface UseLobbySocketResult {
  players: LobbyPlayerT[];
  setPlayers: React.Dispatch<React.SetStateAction<LobbyPlayerT[]>>;
  countdown: number | null;
  battleStarted: boolean;
  battleMode: string;
  socketRef: MutableRefObject<WebSocket | null>;
}

/**
 * Owns the WebSocket connection, the join handshake, the live player roster,
 * and (optionally) the professor-triggered start countdown. Each Lobby_* page
 * layers its own mode-specific UI + extra message handling on top via
 * `onMessage`, instead of re-implementing the connection lifecycle.
 */
export function useLobbySocket({
  sessionId,
  userId,
  userName,
  enabled,
  autoCountdown = true,
  onMessage,
}: UseLobbySocketOptions): UseLobbySocketResult {
  const socketRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const [players, setPlayers] = useState<LobbyPlayerT[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleMode, setBattleMode] = useState("LIVE");

  useEffect(() => { 
    if (!enabled || !sessionId) return;
    let cancelled = false;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    const resolvedName = userName || "Unknown Student";
    const resolvedUserId = userId || `user_${Math.random()}`;

    socket.onopen = () => {
      if (cancelled) {
        // This mount was already torn down (React Strict Mode dev double-invoke).
        // Close cleanly now that the handshake finished, instead of mid-connect.
        socket.close();
        return;
      }

      socket.send(JSON.stringify({
        type: "JOIN_BATTLE",
        battleId: sessionId,
        userId: resolvedUserId,
        sender: resolvedName,
      }));

      // Add myself immediately to my own lobby roster.
      setPlayers((prev) => {
        if (prev.some((p) => p.id === resolvedUserId)) {
          return prev;
        }

        return [
          ...prev,
          {
            id: resolvedUserId,
            name: resolvedName,
            initials: resolvedName
              .substring(0, 2)
              .toUpperCase(),
            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            isHost: false,
            isReady: true,
          },
        ];
      });

      setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: "BATTLE_ACTION",
            battleId: sessionId,
            userId: resolvedUserId,
            sender: resolvedName,
            message: "has joined the lobby! ✅",
            isJoinEvent: true,
          }));
        }
      }, 150);
    };

    socket.onmessage = (event) => {
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch (err) {
        console.error("[useLobbySocket] Failed to parse WS message:", err);
        return;
      }

      // Professor started the battle.
      if (
        data.type === "PROF_START_BATTLE" ||
        data.type === "BATTLE_STARTED" ||
        data.type === "START_BATTLE"
      ) {
        const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
        setBattleMode(mode);
        if (autoCountdown) {
          setCountdown((prev) => (prev === null ? 3 : prev));
        } else {
          setBattleStarted(true);
        }
      }

      if (data.type === "ROOM_STATE_SYNC" && Array.isArray(data.players)) {
        const restoredPlayers: LobbyPlayerT[] = data.players.map((player: any, index: number) => {
          const name = player.name || "Unknown Student";
          return {
            id: player.id || player.userId,
            name,
            initials: name.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[index % AVATAR_COLORS.length],
            isHost: player.role === "host",
            isReady: true,
          };
        });
        setPlayers(restoredPlayers);
      }

      if (data.type === "ROOM_STATE_SYNC" && data.status === "active") {
        const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
        setBattleMode(mode);
        setBattleStarted(true);
      }

      // Roster updates — new peers joining the lobby.
      if (data.type === "PLAYER_JOINED" || (data.type === "BATTLE_ACTION" && data.isJoinEvent)) {
        setPlayers((prev) => {
          if (prev.some((p) => p.id === data.userId || p.name === data.sender)) return prev;
          return [...prev, {
            id: data.userId || `peer_${Math.random()}`,
            name: data.sender || "Peer",
            initials: (data.sender || "PR").substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
            isHost: false,
            isReady: true,
          }];
        });
      }

      onMessageRef.current?.(data);
    };

    socket.onerror = (event) => {
      // Suppress the throwaway-socket noise from Strict Mode's double-mount —
      // that socket never finished connecting and was never "real" to begin with.
      if (cancelled) return;
      console.error(
        "[useLobbySocket] WebSocket connection failed.",
        {
          url: wsUrl,
          readyState: socket.readyState,
          event,
        }
      );
    };

    socket.onclose = (event) => {
      if (cancelled) return;
      console.warn(
        "[useLobbySocket] WebSocket closed:",
        {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          url: wsUrl,
        }
      );
    };

    return () => {
      cancelled = true;
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      // If it's still CONNECTING, the onopen handler above will close it
      // as soon as the handshake finishes, instead of aborting mid-handshake.
    };
  }, [enabled, sessionId, userId, userName, autoCountdown]);

  // 3-2-1 countdown ticker (only ever started when autoCountdown is true).
  useEffect(() => {
  if (countdown === null) return;
  if (countdown === 0) {
    const t = setTimeout(() => {
      setBattleStarted(true);
      setCountdown(null);
    }, 1500);
    return () => clearTimeout(t);
  }
  const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
  return () => clearTimeout(t);
}, [countdown]);

  return { players, setPlayers, countdown, battleStarted, battleMode, socketRef };
}