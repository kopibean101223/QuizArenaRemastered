export const C = {
  indigo: "#5B3DF6",
  indigoDeep: "#4228D4",
  indigoLight: "rgba(91,61,246,0.15)",
  coral: "#FF6B4A",
  coralDeep: "#D44A2A",
  yellow: "#FFC93C",
  yellowDeep: "#E8A800",
  green: "#2ED47A",
  greenDeep: "#18A058",
  red: "#FF4757",
  navy: "#1B1E2B",
  navyLight: "#252840",
  offWhite: "#FAFAFC",
  muted: "#717182",
  white: "#FFFFFF",
};

export const OPTION_COLORS = [
  { base: "#5B3DF6", light: "rgba(91,61,246,0.18)", glow: "rgba(91,61,246,0.5)", dark: "#4228D4" },
  { base: "#FF6B4A", light: "rgba(255,107,74,0.18)", glow: "rgba(255,107,74,0.5)", dark: "#D44A2A" },
  { base: "#2ED47A", light: "rgba(46,212,122,0.18)", glow: "rgba(46,212,122,0.5)", dark: "#18A058" },
  { base: "#FFC93C", light: "rgba(255,201,60,0.18)", glow: "rgba(255,201,60,0.5)", dark: "#E8A800" },
];

export const AVATAR_COLORS = [
  "#5B3DF6", "#FF6B4A", "#2ED47A", "#FFC93C", "#FF4757",
  "#5BC8F6", "#B06EF6", "#FF9F40", "#E040FB", "#43E97B"
];

export const MEDALS = ["🥇", "🥈", "🥉"];
export const REACTIONS = ["👍", "🔥", "❓", "🤔", "💡"];

export interface Player {
  id: number | string;
  name: string;
  initials: string;
  color: string;
  score: number;
  targetScore: number;
  rank: number;
  streak: number;
  isMe: boolean;
  isLeader: boolean;
}

export interface ChatMsg {
  id: number | string;
  player: string;
  initials: string;
  color: string;
  text: string;
  ts: string;
}

export interface Vote {
  option: number;
  count: number;
  voters: string[];
}

export interface QuestionData {
  id: number;
  number: number;
  total: number;
  subject: string;
  text: string;
  options: string[];
  correct: number;
  points: number;
  timeLimit: number;
}

export const INIT_PLAYERS: Player[] = [
  { id: 1, name: "Trisha V.", initials: "TV", color: AVATAR_COLORS[6], score: 1840, targetScore: 1840, rank: 1, streak: 4, isMe: false, isLeader: false },
  { id: 2, name: "You", initials: "ME", color: AVATAR_COLORS[0], score: 1620, targetScore: 1620, rank: 2, streak: 2, isMe: true, isLeader: false },
  { id: 3, name: "Ana R.", initials: "AR", color: AVATAR_COLORS[1], score: 1540, targetScore: 1540, rank: 3, streak: 3, isMe: false, isLeader: true },
  { id: 4, name: "Carlo B.", initials: "CB", color: AVATAR_COLORS[2], score: 1200, targetScore: 1200, rank: 4, streak: 1, isMe: false, isLeader: false },
  { id: 5, name: "Maria S.", initials: "MS", color: AVATAR_COLORS[3], score: 980, targetScore: 980, rank: 5, streak: 0, isMe: false, isLeader: false },
  { id: 6, name: "Juan DT.", initials: "JD", color: AVATAR_COLORS[4], score: 860, targetScore: 860, rank: 6, streak: 2, isMe: false, isLeader: false },
  { id: 7, name: "Ben A.", initials: "BA", color: AVATAR_COLORS[7], score: 720, targetScore: 720, rank: 7, streak: 0, isMe: false, isLeader: false },
  { id: 8, name: "Lea F.", initials: "LF", color: AVATAR_COLORS[5], score: 540, targetScore: 540, rank: 8, streak: 1, isMe: false, isLeader: false },
];

export const INIT_CHAT: ChatMsg[] = [];