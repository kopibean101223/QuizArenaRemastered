
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { C, AVATAR_COLORS } from "../LiveBattleCOMPONENTONLY/Constants";

export interface BattleChatMessage {
  id: string | number;
  sender: string;
  text: string;
  isMe?: boolean;
  ts?: string;
}

interface BattleChatProps {
  messages: BattleChatMessage[];
  onSend: (text: string) => void;
  // "preset"  -> LiveBattle / BattleRoyale: seen by everyone in the match,
  //              can only send from a fixed list of quick messages.
  // "free"    -> TeamMode: only teammates see it, free-text typing.
  mode: "preset" | "free";
  title?: string;
  // Only used in "preset" mode. Falls back to DEFAULT_PRESET_MESSAGES.
  presetMessages?: string[];
  placeholder?: string;
  height?: number | string;
}

const DEFAULT_PRESET_MESSAGES = [
  "Good luck! 🍀",
  "Nice one! 🔥",
  "So close!",
  "Let's go! ⚡",
  "GG!",
  "😂",
  "🤔",
  "👏",
];

// Deterministic color per sender name so avatars stay stable across
// messages/renders without callers having to pass a color in themselves.
function colorForSender(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function initialsForSender(name: string): string {
  return (name || "?").trim().substring(0, 2).toUpperCase();
}

export function BattleChat({
  messages,
  onSend,
  mode,
  title,
  presetMessages = DEFAULT_PRESET_MESSAGES,
  placeholder = "Type to your team…",
  height = 260,
}: BattleChatProps) {
  const [input, setInput] = useState("");
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendFreeText() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  }

  const heading = title ?? (mode === "free" ? "Team Chat" : "Match Chat");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height,
        background: "rgba(0,0,0,0.2)",
        border: "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <MessageCircle size={13} color="rgba(255,255,255,0.4)" strokeWidth={2} />
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {heading}
        </span>
      </div>

      {/* Message feed */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.length === 0 && (
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              fontStyle: "italic",
            }}
          >
            {mode === "free" ? "Say hi to your team…" : "No messages yet…"}
          </span>
        )}
        {messages.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: colorForSender(m.sender),
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Manrope, sans-serif",
                fontSize: 9,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              {initialsForSender(m.sender)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.45)",
                  marginRight: 5,
                }}
              >
                {m.isMe ? "You" : m.sender}
              </span>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </span>
            </div>
          </div>
        ))}
        <div ref={feedEndRef} />
      </div>

      {/* Composer */}
      {mode === "preset" ? (
        <div
          style={{
            padding: "8px 10px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {presetMessages.map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => onSend(phrase)}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "6px 12px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {phrase}
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "8px 10px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            gap: 7,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendFreeText();
            }}
            placeholder={placeholder}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "7px 12px",
              fontFamily: "Manrope, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={sendFreeText}
            style={{
              width: 32,
              height: 32,
              background: C.indigo,
              border: "none",
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(91,61,246,0.4)",
            }}
          >
            <Send size={14} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}