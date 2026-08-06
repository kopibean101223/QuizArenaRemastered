import React from "react";
import { User, Users, Crown } from "lucide-react";

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

export interface Player {
  id: number;
  name: string;
  initials: string;
  color: string;
  isHost: boolean;
  isReady: boolean;
}

export const INIT_PLAYERS: Player[] = [
  { id: 1, name: "Prof. Dela Cruz", initials: "RD", color: AVATAR_COLORS[0], isHost: true, isReady: true },
  { id: 2, name: "Ana Reyes", initials: "AR", color: AVATAR_COLORS[1], isHost: false, isReady: true },
  { id: 3, name: "Carlo B.", initials: "CB", color: AVATAR_COLORS[2], isHost: false, isReady: true },
  { id: 4, name: "Maria S.", initials: "MS", color: AVATAR_COLORS[3], isHost: false, isReady: false },
  { id: 5, name: "Juan DT.", initials: "JD", color: AVATAR_COLORS[4], isHost: false, isReady: true },
  { id: 6, name: "Lea F.", initials: "LF", color: AVATAR_COLORS[5], isHost: false, isReady: false },
  { id: 7, name: "Trisha V.", initials: "TV", color: AVATAR_COLORS[6], isHost: false, isReady: true },
  { id: 8, name: "Ben A.", initials: "BA", color: AVATAR_COLORS[7], isHost: false, isReady: false },
];

export const CAPACITY = 12;

export interface Mode {
  id: string;
  label: string;
  sub: string;
  emoji: string;
  icon: React.ReactNode;
  bg: string;
  accent: string;
  desc: string;
}

export const MODES: Mode[] = [
  {
    id: "individual",
    label: "Individual",
    sub: "Every player for themselves",
    emoji: "⚡",
    icon: <User size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#1B1E2B,#2D2F45)",
    accent: C.indigo,
    desc: "Go solo and climb the leaderboard on your own skills.",
  },
  {
    id: "team",
    label: "Team Battle",
    sub: "Compete as a squad",
    emoji: "🛡️",
    icon: <Users size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#1A2E1A,#243324)",
    accent: C.green,
    desc: "Join forces! Balanced teams compete for collective glory.",
  },
  {
    id: "royale",
    label: "Battle Royale",
    sub: "Last one standing wins",
    emoji: "👑",
    icon: <Crown size={28} strokeWidth={2} />,
    bg: "linear-gradient(145deg,#2E1A0E,#3D2510)",
    accent: C.coral,
    desc: "One question eliminates the weakest. Pure survival mode.",
  },
];

export const CONFETTI_DOTS = [
  { x: 5, y: 8, size: 10, color: C.yellow, shape: "circle", anim: "floatA", dur: 3.1 },
  { x: 92, y: 6, size: 8, color: C.coral, shape: "circle", anim: "floatB", dur: 2.7 },
  { x: 12, y: 80, size: 7, color: C.green, shape: "square", anim: "floatC", dur: 3.5 },
  { x: 88, y: 78, size: 9, color: C.yellow, shape: "square", anim: "floatA", dur: 2.9 },
  { x: 48, y: 3, size: 6, color: "rgba(255,255,255,0.3)", shape: "circle", anim: "floatB", dur: 4.0 },
  { x: 96, y: 42, size: 5, color: C.green, shape: "circle", anim: "floatC", dur: 3.2 },
  { x: 2, y: 45, size: 8, color: C.coral, shape: "square", anim: "floatA", dur: 3.8 },
  { x: 75, y: 90, size: 7, color: "rgba(255,255,255,0.2)", shape: "circle", anim: "floatB", dur: 2.5 },
  { x: 22, y: 92, size: 5, color: C.yellow, shape: "circle", anim: "floatC", dur: 3.6 },
  { x: 60, y: 88, size: 6, color: C.coral, shape: "square", anim: "floatA", dur: 2.8 },
  { x: 35, y: 5, size: 7, color: C.indigo, shape: "circle", anim: "floatB", dur: 3.3 },
  { x: 70, y: 4, size: 5, color: C.green, shape: "square", anim: "floatC", dur: 3.7 },
];

export const STAR_DECS = [
  { x: 8, y: 15, size: 16, opacity: 0.7, anim: "floatA", dur: 3.2 },
  { x: 90, y: 12, size: 12, opacity: 0.6, anim: "floatB", dur: 2.8 },
  { x: 4, y: 65, size: 10, opacity: 0.5, anim: "floatC", dur: 3.5 },
  { x: 93, y: 60, size: 14, opacity: 0.6, anim: "floatA", dur: 3.0 },
  { x: 50, y: 2, size: 9, opacity: 0.4, anim: "floatB", dur: 4.1 },
];