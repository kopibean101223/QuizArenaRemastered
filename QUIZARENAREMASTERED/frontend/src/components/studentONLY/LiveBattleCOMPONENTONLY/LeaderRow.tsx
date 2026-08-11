import { Flame } from "lucide-react";
import { Player, MEDALS, C } from "./Constants";
import { AnimatedScore } from "./Score";

interface LeaderRowProps {
  player: Player;
  prevRank?: number;
}

export function LeaderRow({ player, prevRank }: LeaderRowProps) {
  const isTop = player.rank <= 3;
  const moved = prevRank !== undefined && prevRank !== player.rank;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: 14,
        background: player.isMe ? "rgba(91,61,246,0.18)" : "rgba(255,255,255,0.03)",
        border: player.isMe ? "1.5px solid rgba(91,61,246,0.35)" : "1.5px solid transparent",
        transition: "all 0.3s",
        animation: moved ? "rankPop 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "none",
      }}
    >
      {/* Rank / medal */}
      <div style={{ width: 26, textAlign: "center", flexShrink: 0 }}>
        {isTop ? (
          <span style={{ fontSize: 17, lineHeight: 1 }}>{MEDALS[player.rank - 1]}</span>
        ) : (
          <span
            style={{
              fontFamily: "Fredoka, sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            #{player.rank}
          </span>
        )}
      </div>
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: player.color,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Manrope, sans-serif",
          fontSize: 11,
          fontWeight: 800,
          color: "#fff",
          border: player.isMe ? "2px solid rgba(255,255,255,0.6)" : "none",
        }}
      >
        {player.initials}
      </div>
      {/* Name + streak */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: player.isMe ? "#fff" : "rgba(255,255,255,0.8)",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {player.name}
          {player.isMe && " (You)"}
        </p>
        {player.streak >= 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Flame size={10} fill={C.coral} color="transparent" />
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: C.coral,
              }}
            >
              {player.streak}× streak
            </span>
          </div>
        )}
      </div>
      {/* Score */}
      <span
        style={{
          fontFamily: "Fredoka, sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: isTop ? C.yellow : player.isMe ? "#fff" : "rgba(255,255,255,0.7)",
          flexShrink: 0,
        }}
      >
        <AnimatedScore value={player.score} />
      </span>
    </div>
  );
}