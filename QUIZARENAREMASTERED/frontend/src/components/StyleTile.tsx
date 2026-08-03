import { Trophy, Star, Zap, CheckCircle, XCircle, Flame, Crown, Target, BookOpen, BarChart2, Users } from "lucide-react";

const palette = [
  { name: "Electric Indigo", hex: "#5B3DF6", label: "Primary", textLight: true },
  { name: "Coral-Orange", hex: "#FF6B4A", label: "Accent", textLight: true },
  { name: "Sunshine Yellow", hex: "#FFC93C", label: "Highlight", textLight: false },
  { name: "Success Green", hex: "#2ED47A", label: "Success", textLight: false },
  { name: "Error Red", hex: "#FF4757", label: "Error", textLight: true },
  { name: "Charcoal-Navy", hex: "#1B1E2B", label: "Dark Surface", textLight: true },
  { name: "Off-White", hex: "#FAFAFC", label: "Light Surface", textLight: false, border: true },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p
        className="mb-4 uppercase tracking-widest"
        style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "#717182", letterSpacing: "0.12em" }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "36px 0" }} />;
}

export function StyleTile() {
  return (
    <div
      style={{
        background: "#FAFAFC",
        minHeight: "100vh",
        padding: "0 0 80px 0",
        fontFamily: "Manrope, sans-serif",
        color: "#1B1E2B",
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          background: "#1B1E2B",
          padding: "48px 60px 40px",
          borderRadius: "0 0 32px 32px",
          marginBottom: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative stars */}
        {[
          { top: 18, left: 220, size: 18, color: "#FFC93C", opacity: 0.7 },
          { top: 52, left: 80, size: 10, color: "#FF6B4A", opacity: 0.5 },
          { top: 28, right: 160, size: 14, color: "#5B3DF6", opacity: 0.6 },
          { top: 64, right: 240, size: 8, color: "#2ED47A", opacity: 0.5 },
          { top: 10, right: 80, size: 22, color: "#FFC93C", opacity: 0.4 },
        ].map((s, i) => (
          <Star
            key={i}
            fill={s.color}
            color="transparent"
            size={s.size}
            style={{
              position: "absolute",
              top: s.top,
              left: (s as any).left,
              right: (s as any).right,
              opacity: s.opacity,
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div
            style={{
              background: "#5B3DF6",
              borderRadius: 16,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trophy fill="#FFC93C" color="transparent" size={28} />
          </div>
          <span
            style={{
              fontFamily: "Fredoka, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#FFC93C",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            QuizArena
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Fredoka, sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: "#FAFAFC",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Style Tile
        </h1>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: "rgba(250,250,252,0.55)",
            marginTop: 8,
          }}
        >
          Brand foundations — colors, type, components, and dual-mode UI patterns
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px" }}>

        {/* ── COLOR PALETTE ── */}
        <Section title="Color Palette">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
            {palette.map((c) => (
              <div key={c.hex} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    background: c.hex,
                    borderRadius: 16,
                    height: 80,
                    border: c.border ? "1.5px solid rgba(0,0,0,0.1)" : undefined,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "10px 12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.textLight ? "rgba(255,255,255,0.75)" : "rgba(27,30,43,0.55)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.hex}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#1B1E2B",
                      margin: 0,
                    }}
                  >
                    {c.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#717182",
                      margin: 0,
                    }}
                  >
                    {c.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* ── TYPOGRAPHY ── */}
        <Section title="Typography">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Display / Fredoka */}
            <div
              style={{
                background: "#1B1E2B",
                borderRadius: 20,
                padding: "32px 32px 28px",
              }}
            >
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(250,250,252,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 20px",
                }}
              >
                Fredoka — Display / Headings
              </p>
              <p
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: 52,
                  fontWeight: 700,
                  color: "#FAFAFC",
                  lineHeight: 1.0,
                  margin: "0 0 8px",
                }}
              >
                Aa
              </p>
              <p
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FFC93C",
                  lineHeight: 1.2,
                  margin: "0 0 6px",
                }}
              >
                Quiz Arena
              </p>
              <p
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "rgba(250,250,252,0.7)",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                Round 3 — Final Countdown!
              </p>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { size: 48, label: "Display 48 / Bold" },
                  { size: 36, label: "H1 36 / Bold" },
                  { size: 28, label: "H2 28 / SemiBold" },
                  { size: 22, label: "H3 22 / SemiBold" },
                ].map((t) => (
                  <div key={t.size} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: t.size * 0.38,
                        fontWeight: t.size >= 36 ? 700 : 600,
                        color: "#FAFAFC",
                        lineHeight: 1.2,
                        minWidth: 120,
                      }}
                    >
                      {t.label.split(" ")[0]} {t.size}px
                    </span>
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 10,
                        color: "rgba(250,250,252,0.35)",
                      }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Body / Manrope */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "32px 32px 28px",
                border: "1.5px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#717182",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 20px",
                }}
              >
                Manrope — Body / UI / Data
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#1B1E2B",
                  lineHeight: 1.0,
                  margin: "0 0 8px",
                }}
              >
                Aa
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1B1E2B",
                  lineHeight: 1.6,
                  margin: "0 0 8px",
                }}
              >
                Students answered 2,048 questions this week with an average accuracy of 78.4%.
              </p>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#717182",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Body text — regular weight. Used for descriptions, table data, and analytics copy across both student and professor views.
              </p>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { size: 16, weight: 700, label: "Body Semibold — Labels & captions" },
                  { size: 14, weight: 500, label: "Body Medium — Table rows, list items" },
                  { size: 12, weight: 400, label: "Caption — Timestamps, meta, tags" },
                ].map((t) => (
                  <p
                    key={t.label}
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: t.size,
                      fontWeight: t.weight,
                      color: "#1B1E2B",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {t.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── BUTTONS ── */}
        <Section title="Buttons">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            {/* Primary */}
            <button
              style={{
                background: "#5B3DF6",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 16,
                padding: "14px 28px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(91,61,246,0.35)",
                letterSpacing: "0.01em",
              }}
            >
              <Zap fill="#FFC93C" color="transparent" size={20} />
              Start Quiz
            </button>

            {/* Primary Accent */}
            <button
              style={{
                background: "#FF6B4A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 16,
                padding: "14px 28px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(255,107,74,0.35)",
              }}
            >
              <Flame fill="#FFC93C" color="transparent" size={20} />
              Join Battle
            </button>

            {/* Secondary Outlined */}
            <button
              style={{
                background: "transparent",
                color: "#5B3DF6",
                border: "2.5px solid #5B3DF6",
                borderRadius: 16,
                padding: "12px 26px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View Results
            </button>

            {/* Ghost */}
            <button
              style={{
                background: "rgba(91,61,246,0.08)",
                color: "#5B3DF6",
                border: "none",
                borderRadius: 16,
                padding: "14px 28px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            {/* Success */}
            <button
              style={{
                background: "#2ED47A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 16,
                padding: "14px 28px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(46,212,122,0.35)",
              }}
            >
              <CheckCircle size={20} strokeWidth={2.5} />
              Submit
            </button>

            {/* Professor CTA */}
            <button
              style={{
                background: "#1B1E2B",
                color: "#FAFAFC",
                border: "none",
                borderRadius: 14,
                padding: "12px 24px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <BarChart2 size={16} />
              Export Report
            </button>
          </div>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#717182", marginTop: 12 }}>
            Student views use Fredoka at 18px / game-show scale. Professor views use Manrope at 15px / data-forward scale.
          </p>
        </Section>

        <Divider />

        {/* ── BADGES & CHIPS ── */}
        <Section title="Badges & Chips">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {/* Score badge */}
            <div
              style={{
                background: "#5B3DF6",
                color: "#FFFFFF",
                borderRadius: 50,
                padding: "6px 16px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Star fill="#FFC93C" color="transparent" size={14} />
              1,240 pts
            </div>

            {/* Rank badge */}
            <div
              style={{
                background: "#FFC93C",
                color: "#1B1E2B",
                borderRadius: 50,
                padding: "6px 16px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Crown fill="#FF6B4A" color="transparent" size={14} />
              #1 Rank
            </div>

            {/* Correct */}
            <div
              style={{
                background: "rgba(46,212,122,0.15)",
                color: "#18A058",
                borderRadius: 50,
                padding: "6px 14px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <CheckCircle size={13} strokeWidth={2.5} />
              Correct
            </div>

            {/* Wrong */}
            <div
              style={{
                background: "rgba(255,71,87,0.12)",
                color: "#FF4757",
                borderRadius: 50,
                padding: "6px 14px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <XCircle size={13} strokeWidth={2.5} />
              Incorrect
            </div>

            {/* Streak */}
            <div
              style={{
                background: "linear-gradient(135deg, #FF6B4A, #FFC93C)",
                color: "#FFFFFF",
                borderRadius: 50,
                padding: "6px 16px",
                fontFamily: "Fredoka, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Flame size={14} fill="#fff" color="transparent" />
              5× Streak
            </div>

            {/* Live tag */}
            <div
              style={{
                background: "#FF4757",
                color: "#FFFFFF",
                borderRadius: 50,
                padding: "4px 12px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 5,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  display: "inline-block",
                }}
              />
              Live
            </div>

            {/* Professor chip — difficulty */}
            {["Easy", "Medium", "Hard"].map((d, i) => (
              <div
                key={d}
                style={{
                  background: ["rgba(46,212,122,0.12)", "rgba(255,201,60,0.18)", "rgba(255,71,87,0.12)"][i],
                  color: ["#18A058", "#B8820A", "#FF4757"][i],
                  border: `1.5px solid ${["rgba(46,212,122,0.3)", "rgba(255,201,60,0.4)", "rgba(255,71,87,0.25)"][i]}`,
                  borderRadius: 8,
                  padding: "4px 12px",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {d}
              </div>
            ))}

            {/* Topic chip */}
            <div
              style={{
                background: "rgba(91,61,246,0.08)",
                color: "#5B3DF6",
                border: "1.5px solid rgba(91,61,246,0.2)",
                borderRadius: 8,
                padding: "4px 12px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Algebra II
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── CARDS ── */}
        <Section title="Card Components">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* STUDENT CARD — Live Battle */}
            <div>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#5B3DF6",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                }}
              >
                Student-Facing — Live Battle Card
              </p>
              <div
                style={{
                  background: "linear-gradient(145deg, #5B3DF6 0%, #7B5EFA 100%)",
                  borderRadius: 24,
                  padding: "28px 28px 24px",
                  boxShadow: "0 8px 32px rgba(91,61,246,0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* decorative circles */}
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative" }}>
                  <div>
                    <div
                      style={{
                        background: "#FF4757",
                        borderRadius: 50,
                        padding: "4px 12px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        Live
                      </span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      World History
                    </h2>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.65)",
                        margin: "4px 0 0",
                      }}
                    >
                      Round 2 of 4 · 12 players
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#FFC93C",
                      borderRadius: 16,
                      padding: "10px 14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: "#1B1E2B", lineHeight: 1 }}>
                      840
                    </span>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700, color: "#1B1E2B", opacity: 0.6 }}>
                      PTS
                    </span>
                  </div>
                </div>

                {/* Timer bar */}
                <div style={{ marginBottom: 16, position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
                      Time remaining
                    </span>
                    <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 600, color: "#FFC93C" }}>
                      0:08
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 50, background: "rgba(255,255,255,0.15)" }}>
                    <div
                      style={{
                        height: "100%",
                        width: "28%",
                        borderRadius: 50,
                        background: "#FFC93C",
                        boxShadow: "0 0 10px rgba(255,201,60,0.6)",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 14,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>
                    Your rank: #3
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3].map((s) => (
                      <Star key={s} fill="#FFC93C" color="transparent" size={14} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PROFESSOR CARD — Analytics */}
            <div>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#717182",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                }}
              >
                Professor-Facing — Analytics Card
              </p>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 24,
                  padding: "28px",
                  border: "1.5px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <BookOpen size={16} color="#5B3DF6" strokeWidth={2} />
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#717182" }}>
                        Quiz Session
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#1B1E2B",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      Algebra Mid-Term Prep
                    </h3>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#717182", margin: "4px 0 0", fontWeight: 500 }}>
                      Section 3B · Oct 12, 2026
                    </p>
                  </div>
                  <div
                    style={{
                      background: "rgba(46,212,122,0.12)",
                      borderRadius: 10,
                      padding: "6px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <CheckCircle size={13} color="#18A058" strokeWidth={2.5} />
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#18A058" }}>
                      Completed
                    </span>
                  </div>
                </div>

                {/* Stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  {[
                    { icon: <Users size={14} color="#5B3DF6" />, val: "24", label: "Students" },
                    { icon: <Target size={14} color="#FF6B4A" />, val: "78.4%", label: "Avg. Score" },
                    { icon: <Zap size={14} color="#FFC93C" />, val: "4m 12s", label: "Avg. Time" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "#FAFAFC",
                        borderRadius: 12,
                        padding: "12px 14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        {s.icon}
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "#717182" }}>
                          {s.label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#1B1E2B",
                          margin: 0,
                          lineHeight: 1,
                        }}
                      >
                        {s.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#1B1E2B" }}>
                      Class Mastery
                    </span>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#5B3DF6" }}>
                      78%
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 50, background: "#ECECF0" }}>
                    <div
                      style={{
                        height: "100%",
                        width: "78%",
                        borderRadius: 50,
                        background: "linear-gradient(90deg, #5B3DF6, #7B5EFA)",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <button
                    style={{
                      background: "rgba(91,61,246,0.08)",
                      color: "#5B3DF6",
                      border: "none",
                      borderRadius: 10,
                      padding: "8px 16px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                  <button
                    style={{
                      background: "#1B1E2B",
                      color: "#FAFAFC",
                      border: "none",
                      borderRadius: 10,
                      padding: "8px 16px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <BarChart2 size={13} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── DUAL MODE NOTE ── */}
        <Section title="Dual-Mode Design Principles">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div
              style={{
                background: "linear-gradient(145deg, #1B1E2B, #2D3148)",
                borderRadius: 20,
                padding: "24px 28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Trophy fill="#FFC93C" color="transparent" size={22} />
                <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#FAFAFC" }}>
                  Student Mode
                </span>
              </div>
              {[
                "Fredoka headings, 22–48px, bold",
                "Saturated color backgrounds",
                "Big score / timer numbers",
                "Celebratory iconography",
                "High contrast, maximum energy",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Star fill="#FFC93C" color="transparent" size={10} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(250,250,252,0.75)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid rgba(0,0,0,0.07)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                borderRadius: 20,
                padding: "24px 28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <BarChart2 size={20} color="#5B3DF6" strokeWidth={2} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: "#1B1E2B" }}>
                  Professor Mode
                </span>
              </div>
              {[
                "Manrope headings, 16–22px, 800 weight",
                "White cards, muted surfaces",
                "Data-forward: tables, progress, charts",
                "Same palette, lower saturation usage",
                "Calm, credible, trustworthy layout",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B3DF6", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500, color: "#717182" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
