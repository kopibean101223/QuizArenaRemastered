import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Trophy,
  Star,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  AlertCircle,
  ArrowRight,
  Loader2,
  Zap,
  CheckCircle2,
} from "lucide-react";

// ─── Palette tokens ────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6",
  indigoDeep: "#4228D4",
  indigoLight: "#7B5EFA",
  coral: "#FF6B4A",
  coralHover: "#E8573A",
  yellow: "#FFC93C",
  green: "#2ED47A",
  red: "#FF4757",
  navy: "#1B1E2B",
  offWhite: "#FAFAFC",
  muted: "#717182",
  border: "rgba(0,0,0,0.1)",
  inputBg: "#F3F3F7",
};

// ─── Tiny helpers ──────────────────────────────────────────────────────────────
function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

function err(msg: string) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "Manrope, sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: C.red,
        marginTop: 5,
      }}
    >
      <AlertCircle size={12} strokeWidth={2.5} />
      {msg}
    </span>
  );
}

// ─── Confetti dots decorating the left panel ───────────────────────────────────
const CONFETTI = [
  { x: 8, y: 12, size: 10, color: C.yellow, shape: "circle" },
  { x: 88, y: 8, size: 8, color: C.coral, shape: "circle" },
  { x: 15, y: 72, size: 6, color: "#2ED47A", shape: "square" },
  { x: 82, y: 68, size: 8, color: C.yellow, shape: "square" },
  { x: 50, y: 6, size: 6, color: "rgba(255,255,255,0.4)", shape: "circle" },
  { x: 92, y: 40, size: 5, color: C.green, shape: "circle" },
  { x: 4, y: 45, size: 7, color: C.coral, shape: "square" },
  { x: 72, y: 78, size: 9, color: "#fff", shape: "circle", opacity: 0.2 },
  { x: 28, y: 88, size: 5, color: C.yellow, shape: "circle" },
  { x: 60, y: 82, size: 6, color: C.coral, shape: "square" },
];

// ─── Trophy / Podium SVG illustration ─────────────────────────────────────────
function TrophyIllustration() {
  return (
    <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Podium base */}
      <rect x="40" y="150" width="60" height="60" rx="8" fill="rgba(255,255,255,0.15)" />
      <rect x="100" y="125" width="60" height="85" rx="8" fill="rgba(255,255,255,0.22)" />
      <rect x="160" y="165" width="60" height="45" rx="8" fill="rgba(255,255,255,0.12)" />

      {/* Podium labels */}
      <text x="70" y="185" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="18" fontWeight="700" fill="rgba(255,255,255,0.6)">2</text>
      <text x="130" y="158" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700" fill="#FFC93C">1</text>
      <text x="190" y="195" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="16" fontWeight="700" fill="rgba(255,255,255,0.5)">3</text>

      {/* Trophy cup body */}
      <path d="M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z" fill="#FFC93C" />
      {/* Trophy cup shine */}
      <path d="M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z" fill="url(#trophyGrad)" />
      {/* Trophy handles */}
      <path d="M85 46 C72 46 66 52 66 60 C66 68 72 74 85 74" stroke="#FFC93C" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M175 46 C188 46 194 52 194 60 C194 68 188 74 175 74" stroke="#FFC93C" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Trophy base */}
      <rect x="98" y="114" width="64" height="10" rx="3" fill="#E8A800" />
      <rect x="94" y="122" width="72" height="8" rx="4" fill="#E8A800" />

      {/* Star on trophy */}
      <polygon points="130,45 133,55 143,55 135,61 138,71 130,65 122,71 125,61 117,55 127,55" fill="white" opacity="0.9" />

      {/* Floating mini-stars */}
      <polygon points="50,40 52,46 58,46 53,50 55,56 50,52 45,56 47,50 42,46 48,46" fill="#FFC93C" opacity="0.9" />
      <polygon points="210,30 212,35 217,35 213,38 215,43 210,40 205,43 207,38 203,35 208,35" fill="white" opacity="0.7" />
      <polygon points="40,100 41.5,104.5 46,104.5 42.5,107 44,111.5 40,109 36,111.5 37.5,107 34,104.5 38.5,104.5" fill="#FF6B4A" opacity="0.85" />
      <polygon points="218,95 219.5,99.5 224,99.5 220.5,102 222,106.5 218,104 214,106.5 215.5,102 212,99.5 216.5,99.5" fill="#FFC93C" opacity="0.8" />

      {/* Confetti particles around trophy */}
      <rect x="76" y="20" width="8" height="8" rx="2" fill="#FF6B4A" opacity="0.9" transform="rotate(20 80 24)" />
      <rect x="180" y="18" width="7" height="7" rx="2" fill="#2ED47A" opacity="0.85" transform="rotate(-15 183 21)" />
      <circle cx="60" cy="68" r="4" fill="#FFC93C" opacity="0.8" />
      <circle cx="200" cy="64" r="4" fill="white" opacity="0.5" />
      <rect x="88" y="8" width="6" height="6" rx="1" fill="white" opacity="0.35" transform="rotate(30 91 11)" />
      <rect x="166" y="8" width="6" height="6" rx="1" fill="#FF6B4A" opacity="0.6" transform="rotate(-25 169 11)" />

      <defs>
        <linearGradient id="trophyGrad" x1="105" y1="30" x2="175" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Input field component ─────────────────────────────────────────────────────
function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  suffix,
  disabled,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  suffix?: React.ReactNode;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: C.navy,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          style={{
            width: "100%",
            background: error ? "rgba(255,71,87,0.05)" : C.inputBg,
            border: `2px solid ${error ? C.red : focused ? C.indigo : "transparent"}`,
            borderRadius: 14,
            padding: suffix ? "13px 48px 13px 16px" : "13px 16px",
            fontFamily: "Manrope, sans-serif",
            fontSize: 15,
            fontWeight: 500,
            color: C.navy,
            outline: "none",
            transition: "border-color 0.15s, background 0.15s",
            boxSizing: "border-box",
            opacity: disabled ? 0.5 : 1,
          }}
        />
        {suffix && (
          <div
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: C.muted,
              display: "flex",
              alignItems: "center",
            }}
          >
            {suffix}
          </div>
        )}
      </div>
      {error && err(error)}
    </div>
  );
}

// ─── Role toggle button ─────────────────────────────────────────────────────────
function RoleBtn({
  active,
  icon,
  label,
  sub,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        background: active ? C.indigo : C.inputBg,
        border: `2.5px solid ${active ? C.indigo : "transparent"}`,
        borderRadius: 16,
        padding: "14px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s",
        boxShadow: active ? `0 4px 14px rgba(91,61,246,0.28)` : "none",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: active ? "rgba(255,255,255,0.18)" : "rgba(91,61,246,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: active ? "#FFFFFF" : C.indigo,
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "Fredoka, sans-serif",
          fontSize: 17,
          fontWeight: 600,
          color: active ? "#FFFFFF" : C.navy,
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: active ? "rgba(255,255,255,0.65)" : C.muted,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {sub}
      </span>
    </button>
  );
}

// ─── Primary submit button ─────────────────────────────────────────────────────
function SubmitBtn({
  label,
  loading,
  onClick,
}: {
  label: string;
  loading: boolean;
  onClick: () => void;
}) {
  const { hovered, handlers } = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        background: loading ? `${C.coral}99` : hovered ? C.coralHover : C.coral,
        border: "none",
        borderRadius: 16,
        padding: "15px 24px",
        fontFamily: "Fredoka, sans-serif",
        fontSize: 19,
        fontWeight: 600,
        color: "#FFFFFF",
        cursor: loading ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        boxShadow: loading ? "none" : `0 5px 20px rgba(255,107,74,0.38)`,
        transition: "background 0.15s, box-shadow 0.15s",
        letterSpacing: "0.01em",
      }}
      {...handlers}
    >
      {loading ? (
        <>
          <Loader2 size={20} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} />
          Please wait…
        </>                       
      ) : (
        <>
          {label}
          <ArrowRight size={20} strokeWidth={2.5} />
        </>
      )}
    </button>
  );
}

// ─── Tab pill ──────────────────────────────────────────────────────────────────
function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 0",
        background: active ? "#FFFFFF" : "transparent",
        border: "none",
        borderRadius: 12,
        fontFamily: "Fredoka, sans-serif",
        fontSize: 17,
        fontWeight: 600,
        color: active ? C.indigo : C.muted,
        cursor: "pointer",
        boxShadow: active ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.18s",
      }}
    >
      {label}
    </button>
  );
}

// ─── Sign Up Form ──────────────────────────────────────────────────────────────
function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<"student" | "professor">("student");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!email.trim()) {
      e.email = "UMak Gmail is required.";
    } else if (!email.endsWith("@umak.edu.ph")) {
      e.email = "Must be a valid UMak Gmail (@umak.edu.ph).";
    }
    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
    return e;
  }

 async function handleSubmit() {
  const e = validate();
  setErrors(e);
  if (Object.keys(e).length) return;

  setLoading(true);
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ server: data.message || 'Registration failed.' });
      return;
    }

    setSuccess(true);
    // Optionally redirect or set user context here
  } catch (err) {
    setErrors({ server: 'An error occurred during account creation.' });
  } finally {
    setLoading(false);
  }
}

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "32px 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(46,212,122,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2 size={36} color={C.green} strokeWidth={2} />
        </div>
        <h3
          style={{
            fontFamily: "Fredoka, sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: C.navy,
            margin: 0,
          }}
        >
          You're in the arena!
        </h3>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.6 }}>
          Account created successfully. Check your UMak Gmail to verify your account.
        </p>
        <button
          onClick={() => setSuccess(false)}
          style={{
            marginTop: 8,
            background: C.indigo,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "12px 28px",
            fontFamily: "Fredoka, sans-serif",
            fontSize: 17,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: `0 4px 14px rgba(91,61,246,0.3)`,
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Field
        label="Full Name"
        id="su-name"
        placeholder="e.g. Maria Santos"
        value={name}
        onChange={setName}
        error={errors.name}
        disabled={loading}
      />
      <Field
        label="UMak Gmail"
        id="su-email"
        type="email"
        placeholder="you@umak.edu.ph"
        value={email}
        onChange={setEmail}
        error={errors.email}
        disabled={loading}
      />
      <Field
        label="Password"
        id="su-password"
        type={showPw ? "text" : "password"}
        placeholder="Min. 8 characters"
        value={password}
        onChange={setPassword}
        error={errors.password}
        disabled={loading}
        suffix={
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.muted, display: "flex" }}
          >
            {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        }
      />

      {/* Role selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>
          I am a…
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <RoleBtn
            active={role === "student"}
            icon={<GraduationCap size={20} strokeWidth={2} />}
            label="Student"
            sub="Join quiz battles"
            onClick={() => setRole("student")}
          />
          <RoleBtn
            active={role === "professor"}
            icon={<BookOpen size={20} strokeWidth={2} />}
            label="Professor"
            sub="Create & manage quizzes"
            onClick={() => setRole("professor")}
          />
        </div>
      </div>

      <SubmitBtn label="Create Account" loading={loading} onClick={handleSubmit} />

      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: C.muted, textAlign: "center", margin: 0, lineHeight: 1.6 }}>
        By signing up you agree to QuizArena's{" "}
        <a href="#" style={{ color: C.indigo, fontWeight: 700, textDecoration: "none" }}>Terms</a>{" "}
        and{" "}
        <a href="#" style={{ color: C.indigo, fontWeight: 700, textDecoration: "none" }}>Privacy Policy</a>.
      </p>
    </div>
  );
}

// ─── Login Form ────────────────────────────────────────────────────────────────
function LoginForm() {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      const result = login(email.trim(), password);
      if (result === "bad_credentials") {
        setLoading(false);
        setErrors({ form: "Invalid email or password." });
      } else {
        setSuccess(true);
        // navigation handled by AppContext — page switches automatically
      }
    }, 900);
  }

  if (success) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "32px 0",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(46,212,122,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2 size={36} color={C.green} strokeWidth={2} />
        </div>
        <h3 style={{ fontFamily: "Fredoka, sans-serif", fontSize: 26, fontWeight: 700, color: C.navy, margin: 0 }}>
          Welcome back!
        </h3>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: C.muted, margin: 0 }}>
          Logging you in to the arena…
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Form-level error (bad credentials) */}
      {errors.form && (
        <div style={{ display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,71,87,0.08)", border: "1.5px solid rgba(255,71,87,0.3)",
          borderRadius: 10, padding: "10px 14px" }}>
          <AlertCircle size={15} color={C.red} strokeWidth={2.5} style={{ flexShrink: 0 }}/>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600,
            color: C.red }}>{errors.form}</span>
        </div>
      )}
      <Field
        label="Email"
        id="li-email"
        type="email"
        placeholder="you@umak.edu.ph"
        value={email}
        onChange={setEmail}
        error={errors.email}
        disabled={loading}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label
            htmlFor="li-password"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}
          >
            Password
          </label>
          <a
            href="#"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: C.indigo,
              textDecoration: "none",
            }}
          >
            Forgot Password?
          </a>
        </div>
        <div style={{ position: "relative" }}>
          <input
            id="li-password"
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              background: errors.password ? "rgba(255,71,87,0.05)" : C.inputBg,
              border: `2px solid ${errors.password ? C.red : "transparent"}`,
              borderRadius: 14,
              padding: "13px 48px 13px 16px",
              fontFamily: "Manrope, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: C.navy,
              outline: "none",
              boxSizing: "border-box",
              opacity: loading ? 0.5 : 1,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: C.muted,
              display: "flex",
              padding: 0,
            }}
          >
            {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        </div>
        {errors.password && err(errors.password)}
      </div>

      <SubmitBtn label="Log In" loading={loading} onClick={handleSubmit} />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 1, background: C.border }} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: C.muted, fontWeight: 600 }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>

      <button
        type="button"
        style={{
          width: "100%",
          background: C.offWhite,
          border: `2px solid ${C.border}`,
          borderRadius: 14,
          padding: "12px 24px",
          fontFamily: "Manrope, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: C.navy,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxSizing: "border-box",
        }}
      >
        {/* Google G */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.078 17.64 11.845 17.64 9.2z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
          <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

// ─── Main AuthScreen component ────────────────────────────────────────────────
export function AuthScreen() {
  const [tab, setTab] = useState<"signup" | "login">("login");

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-7px) rotate(-6deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          background: C.offWhite,
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          style={{
            flex: "0 0 48%",
            background: `linear-gradient(150deg, ${C.indigo} 0%, #4228D4 60%, #331FA8 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "56px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow blobs */}
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: 320, height: 320, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-60px", left: "-60px",
            width: 260, height: 260, borderRadius: "50%",
            background: "rgba(255,201,60,0.08)", pointerEvents: "none",
          }} />

          {/* Confetti dots */}
          {CONFETTI.map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: d.size,
                height: d.size,
                borderRadius: d.shape === "circle" ? "50%" : 3,
                background: d.color,
                opacity: (d as any).opacity ?? 1,
                animation: `float${["A","B","C","A","B","C","A","B","C","A"][i]} ${2.5 + i * 0.3}s ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}
            >
              <Trophy fill={C.yellow} color="transparent" size={26} />
            </div>
            <span
              style={{
                fontFamily: "Fredoka, sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
              }}
            >
              QuizArena
            </span>
          </div>

          {/* Tagline */}
          <div style={{ textAlign: "center", marginBottom: 8, maxWidth: 340 }}>
            <h2
              style={{
                fontFamily: "Fredoka, sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                margin: "0 0 12px",
              }}
            >
              Battle your way to{" "}
              <span
                style={{
                  color: C.yellow,
                  display: "inline-block",
                  animation: "floatC 3s ease-in-out infinite",
                }}
              >
                brilliance!
              </span>
            </h2>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Live quiz battles powered by your UMak curriculum. Compete, learn, and climb the leaderboard.
            </p>
          </div>

          {/* Trophy illustration */}
          <div
            style={{
              animation: "floatC 4s ease-in-out infinite",
              filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.22))",
              marginTop: 8,
            }}
          >
            <TrophyIllustration />
          </div>

          {/* Stats strip */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 4,
            }}
          >
            {[
              { icon: <Zap fill={C.yellow} color="transparent" size={16} />, val: "2,400+", label: "Active Students" },
              { icon: <Star fill={C.yellow} color="transparent" size={16} />, val: "12K", label: "Quizzes Played" },
              { icon: <Trophy fill={C.yellow} color="transparent" size={16} />, val: "98%", label: "Satisfaction" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {s.icon}
                <div>
                  <p style={{ fontFamily: "Fredoka, sans-serif", fontSize: 16, fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1 }}>
                    {s.val}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 40px",
            overflowY: "auto",
          }}
        >
          <div style={{ width: "100%", maxWidth: 420 }}>
            {/* Greeting */}
            <div style={{ marginBottom: 28 }}>
              <h1
                style={{
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: C.navy,
                  margin: "0 0 6px",
                  lineHeight: 1.2,
                }}
              >
                {tab === "signup" ? "Join the arena! 🏆" : "Welcome back! ⚡"}
              </h1>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.muted,
                  margin: 0,
                }}
              >
                {tab === "signup"
                  ? "Create your QuizArena account with your UMak Gmail."
                  : "Log in to your account and get back to the leaderboard."}
              </p>
            </div>

            {/* Tab switcher */}
            <div
              style={{
                background: C.inputBg,
                borderRadius: 16,
                padding: 5,
                display: "flex",
                marginBottom: 28,
              }}
            >
              <Tab label="Sign Up" active={tab === "signup"} onClick={() => setTab("signup")} />
              <Tab label="Log In" active={tab === "login"} onClick={() => setTab("login")} />
            </div>

            {/* Form area */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 24,
                padding: "32px 32px 28px",
                boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
                border: `1.5px solid rgba(0,0,0,0.05)`,
              }}
            >
              {tab === "signup" ? <SignUpForm /> : <LoginForm />}
            </div>

            {/* Switch tab hint */}
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: C.muted,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              {tab === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setTab("login")}
                    style={{
                      background: "none",
                      border: "none",
                      color: C.indigo,
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 13,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  New to QuizArena?{" "}
                  <button
                    onClick={() => setTab("signup")}
                    style={{
                      background: "none",
                      border: "none",
                      color: C.indigo,
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 13,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    Create Account
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
