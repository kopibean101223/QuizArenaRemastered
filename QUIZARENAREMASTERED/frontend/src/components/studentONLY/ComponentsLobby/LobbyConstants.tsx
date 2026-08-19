// Shared palette, avatar colors, and Player type for the student Lobby_* screens.
// Split out so Lobby_LiveQuiz / Lobby_TeamMode / Lobby_BattleRoyale / Lobby_OwnPaced
// (and the useLobbySocket hook) all stay visually + structurally consistent.

export const C = {
  indigo: "#5B3DF6",
  indigoDeep: "#4228D4",
  indigoLight: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",
  coralDeep: "#E85A3A",
  yellow: "#FFC93C",
  yellowGlow: "rgba(255,201,60,0.5)",
  green: "#2ED47A",
  navy: "#1B1E2B",
  offWhite: "#FAFAFC",
  muted: "#717182",
};

export const AVATAR_COLORS = [
  "#5B3DF6", "#FF6B4A", "#2ED47A", "#FFC93C", "#FF4757",
  "#5BC8F6", "#B06EF6", "#FF9F40", "#E040FB", "#00BCD4",
  "#FF6B9D", "#43E97B",
];

export const CAPACITY = 12;

// "waiting" | "answering" | "finished" only apply to Own-Paced, where there's
// no shared countdown and each classmate progresses independently.
export type PlayerStatus = "waiting" | "answering" | "finished";

export interface LobbyPlayerT {
  id: string;
  name: string;
  initials: string;
  color: string;
  isHost: boolean;
  isReady: boolean;
  status?: PlayerStatus;
}