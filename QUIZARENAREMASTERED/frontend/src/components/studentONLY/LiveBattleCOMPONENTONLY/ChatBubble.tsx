import { ChatMsg } from "./Constants";

export function ChatBubble({ msg }: { msg: ChatMsg }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: msg.color,
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
        {msg.initials}
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
          {msg.player}
        </span>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.4,
          }}
        >
          {msg.text}
        </span>
      </div>
    </div>
  );
}