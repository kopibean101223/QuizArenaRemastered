"use client";

import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { signUpUser, loginUserAndFetchRole, loginWithGoogle } from '@/lib/services/authService';
import { useRouter } from 'next/navigation';
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

const C = {
  yellow: "#FFC93C",
  coral: "#FF6B4A",
  green: "#2ED47A",
  red: "#FF4757",
};

function ErrorText({ msg }: { msg: string }) {
  return (
    <span className="font-body flex items-center gap-1.5 text-xs font-semibold text-[#FF4757] mt-1">
      <AlertCircle size={12} strokeWidth={2.5} />
      {msg}
    </span>
  );
}

function FormError({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#FF4757]/30 bg-[#FF4757]/[0.08] px-3.5 py-2.5">
      <AlertCircle size={15} color={C.red} strokeWidth={2.5} className="shrink-0" />
      <span className="font-body text-[13px] font-semibold text-[#FF4757]">{msg}</span>
    </div>
  );
}

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

const FLOAT_ANIMS = ["floatA", "floatB", "floatC", "floatA", "floatB", "floatC", "floatA", "floatB", "floatC", "floatA"];

function TrophyIllustration() {
  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[180px] sm:w-[220px] lg:w-[260px] h-auto"
    >
      <rect x="40" y="150" width="60" height="60" rx="8" fill="rgba(255,255,255,0.15)" />
      <rect x="100" y="125" width="60" height="85" rx="8" fill="rgba(255,255,255,0.22)" />
      <rect x="160" y="165" width="60" height="45" rx="8" fill="rgba(255,255,255,0.12)" />

      <text x="70" y="185" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="18" fontWeight="700" fill="rgba(255,255,255,0.6)">2</text>
      <text x="130" y="158" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="22" fontWeight="700" fill="#FFC93C">1</text>
      <text x="190" y="195" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize="16" fontWeight="700" fill="rgba(255,255,255,0.5)">3</text>

      <path d="M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z" fill="#FFC93C" />
      <path d="M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z" fill="url(#trophyGrad)" />
      <path d="M85 46 C72 46 66 52 66 60 C66 68 72 74 85 74" stroke="#FFC93C" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M175 46 C188 46 194 52 194 60 C194 68 188 74 175 74" stroke="#FFC93C" strokeWidth="7" strokeLinecap="round" fill="none" />
      <rect x="98" y="114" width="64" height="10" rx="3" fill="#E8A800" />
      <rect x="94" y="122" width="72" height="8" rx="4" fill="#E8A800" />

      <polygon points="130,45 133,55 143,55 135,61 138,71 130,65 122,71 125,61 117,55 127,55" fill="white" opacity="0.9" />
      <polygon points="50,40 52,46 58,46 53,50 55,56 50,52 45,56 47,50 42,46 48,46" fill="#FFC93C" opacity="0.9" />
      <polygon points="210,30 212,35 217,35 213,38 215,43 210,40 205,43 207,38 203,35 208,35" fill="white" opacity="0.7" />
      <polygon points="40,100 41.5,104.5 46,104.5 42.5,107 44,111.5 40,109 36,111.5 37.5,107 34,104.5 38.5,104.5" fill="#FF6B4A" opacity="0.85" />
      <polygon points="218,95 219.5,99.5 224,99.5 220.5,102 222,106.5 218,104 214,106.5 215.5,102 212,99.5 216.5,99.5" fill="#FFC93C" opacity="0.8" />

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
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-[13px] font-bold text-[#1B1E2B]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={[
            "font-body w-full rounded-[14px] px-4 py-[13px] text-[15px] font-medium text-[#1B1E2B]",
            "outline-none border-2 transition-colors box-border disabled:opacity-50",
            suffix ? "pr-12" : "",
            error
              ? "bg-[#FF4757]/[0.05] border-[#FF4757]"
              : "bg-[#F3F3F7] border-transparent focus:border-[#5B3DF6]",
          ].join(" ")}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-[#717182]">
            {suffix}
          </div>
        )}
      </div>
      {error && <ErrorText msg={error} />}
    </div>
  );
}

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
      className={[
        "flex-1 rounded-2xl border-[2.5px] px-3 py-3.5 flex flex-col items-center gap-1.5 transition-all",
        active
          ? "bg-[#5B3DF6] border-[#5B3DF6] shadow-[0_4px_14px_rgba(91,61,246,0.28)]"
          : "bg-[#F3F3F7] border-transparent shadow-none",
      ].join(" ")}
    >
      <div
        className={[
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          active ? "bg-white/[0.18] text-white" : "bg-[#5B3DF6]/10 text-[#5B3DF6]",
        ].join(" ")}
      >
        {icon}
      </div>
      <span className={["font-heading text-[17px] font-semibold leading-none", active ? "text-white" : "text-[#1B1E2B]"].join(" ")}>
        {label}
      </span>
      <span
        className={[
          "font-body text-[11px] font-medium leading-[1.3] text-center",
          active ? "text-white/65" : "text-[#717182]",
        ].join(" ")}
      >
        {sub}
      </span>
    </button>
  );
}

function SubmitBtn({
  label,
  loading,
  onClick,
}: {
  label: string;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={[
        "font-heading w-full rounded-2xl px-6 py-[15px] text-lg sm:text-[19px] font-semibold text-white",
        "flex items-center justify-center gap-2.5 tracking-[0.01em] transition-colors",
        loading
          ? "bg-[#FF6B4A]/60 cursor-default shadow-none"
          : "bg-[#FF6B4A] hover:bg-[#E8573A] cursor-pointer shadow-[0_5px_20px_rgba(255,107,74,0.38)]",
      ].join(" ")}
    >
      {loading ? (
        <>
          <Loader2 size={20} strokeWidth={2.5} className="animate-spin" />
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
      className={[
        "font-heading flex-1 py-2.5 rounded-xl text-base sm:text-[17px] font-semibold transition-all",
        active ? "bg-white text-[#5B3DF6] shadow-[0_2px_10px_rgba(0,0,0,0.08)]" : "bg-transparent text-[#717182]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function SuccessPanel({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="w-[72px] h-[72px] rounded-full bg-[#2ED47A]/[0.12] flex items-center justify-center">
        <CheckCircle2 size={36} color={C.green} strokeWidth={2} />
      </div>
      <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-[#1B1E2B] m-0">{title}</h3>
      <p className="font-body text-sm text-[#717182] m-0 leading-relaxed">{message}</p>
    </div>
  );
}

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
      await signUpUser(email, password, name, role);
      setSuccess(true);
    } catch (err: any) {
      setErrors({ form: err.message || "Could not reach the server. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4">
        <SuccessPanel
          title="You're in the arena!"
          message="Account created successfully. Check your UMak Gmail to verify your account."
        />
        <button
          onClick={() => setSuccess(false)}
          className="font-heading -mt-2 bg-[#5B3DF6] text-white rounded-2xl px-7 py-3 text-lg font-semibold cursor-pointer shadow-[0_4px_14px_rgba(91,61,246,0.3)]"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-[18px]">
      {errors.form && <FormError msg={errors.form} />}
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
            className="bg-transparent border-none cursor-pointer p-0 text-[#717182] flex"
          >
            {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        }
      />

      <div className="flex flex-col gap-2">
        <span className="font-body text-[13px] font-bold text-[#1B1E2B]">I am a…</span>
        <div className="flex gap-2.5">
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

      <p className="font-body text-xs text-[#717182] text-center m-0 leading-relaxed">
        By signing up you agree to QuizArena's{" "}
        <a href="#" className="text-[#5B3DF6] font-bold no-underline">Terms</a>{" "}
        and{" "}
        <a href="#" className="text-[#5B3DF6] font-bold no-underline">Privacy Policy</a>.
      </p>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
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

  async function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      const role = await loginUserAndFetchRole(email.trim(), password);
      setSuccess(true);
      
      // ✅ FIX: Match parameter routes defined in Middleware
      if (role?.toLowerCase() === 'professor') {
        router.push('/?page=dashboard');
      } else if (role?.toLowerCase() === 'student') {
        router.push('/?page=student_dashboard');
      } else {
        router.push('/?page=role');
      }
    } catch (err: any) {
      setErrors({ form: err.message || "Invalid email or password." });
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to initialize Google login." });
    }
  }

  if (success) {
    return <SuccessPanel title="Welcome back!" message="Logging you in to the arena…" />;
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-[18px]">
      {errors.form && <FormError msg={errors.form} />}
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
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label htmlFor="li-password" className="font-body text-[13px] font-bold text-[#1B1E2B]">
            Password
          </label>
          <a href="#" className="font-body text-xs font-bold text-[#5B3DF6] no-underline">
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <input
            id="li-password"
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className={[
              "font-body w-full rounded-[14px] pl-4 pr-12 py-[13px] text-[15px] font-medium text-[#1B1E2B]",
              "outline-none border-2 box-border disabled:opacity-50",
              errors.password ? "bg-[#FF4757]/[0.05] border-[#FF4757]" : "bg-[#F3F3F7] border-transparent",
            ].join(" ")}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#717182] flex p-0"
          >
            {showPw ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        </div>
        {errors.password && <ErrorText msg={errors.password} />}
      </div>

      <SubmitBtn label="Log In" loading={loading} onClick={handleSubmit} />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-black/10" />
        <span className="font-body text-xs text-[#717182] font-semibold whitespace-nowrap">or continue with</span>
        <div className="flex-1 h-px bg-black/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={loading}
        className="font-body w-full bg-[#FAFAFC] border-2 border-black/10 rounded-2xl px-6 py-3 text-[15px] font-bold text-[#1B1E2B] cursor-pointer flex items-center justify-center gap-2.5 box-border disabled:opacity-50"
      >
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

export function AuthScreen() {
  const { user, isLoading } = useApp();
  const router = useRouter();
  const [tab, setTab] = useState<"signup" | "login">("login");

  // ✅ FIX: Redirect existing sessions to parameter routes
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "professor") {
        router.push("/?page=dashboard");
      } else if (user.role === "student") {
        router.push("/?page=student_dashboard");
      } else {
        router.push("/?page=role");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <Loader2 size={36} className="animate-spin text-[#5B3DF6]" />
      </div>
    );
  }

  if (user) return null;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-7px) rotate(-6deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
      `}</style>

      <div className="font-body min-h-screen flex flex-col md:flex-row bg-[#FAFAFC]">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden
                     w-full md:w-[46%] lg:w-[48%] shrink-0
                     px-6 py-10 sm:px-10 sm:py-12 md:px-10 md:py-14
                     bg-[linear-gradient(150deg,#5B3DF6_0%,#4228D4_60%,#331FA8_100%)]"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 sm:w-[260px] sm:h-[260px] rounded-full bg-[#FFC93C]/[0.08]" />

          <div className="hidden sm:block">
            {CONFETTI.map((d, i) => (
              <div
                key={i}
                className="pointer-events-none absolute"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: d.size,
                  height: d.size,
                  borderRadius: d.shape === "circle" ? "50%" : 3,
                  background: d.color,
                  opacity: (d as any).opacity ?? 1,
                  animation: `${FLOAT_ANIMS[i]} ${2.5 + i * 0.3}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-2xl bg-white/[0.15] backdrop-blur-sm flex items-center justify-center border-[1.5px] border-white/20">
              <Trophy fill={C.yellow} color="transparent" size={24} />
            </div>
            <span className="font-heading text-2xl sm:text-[30px] font-bold text-white tracking-[0.01em]">
              QuizArena
            </span>
          </div>

          <div className="text-center mb-2 max-w-[340px]">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-white leading-[1.2] mb-2 sm:mb-3">
              Battle your way to{" "}
              <span className="text-[#FFC93C] inline-block" style={{ animation: "floatC 3s ease-in-out infinite" }}>
                brilliance!
              </span>
            </h2>
            <p className="font-body text-sm text-white/65 leading-relaxed m-0 hidden sm:block">
              Live quiz battles powered by your UMak curriculum. Compete, learn, and climb the leaderboard.
            </p>
          </div>

          <div
            className="hidden sm:block mt-2"
            style={{ animation: "floatC 4s ease-in-out infinite", filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.22))" }}
          >
            <TrophyIllustration />
          </div>

          <div className="hidden sm:flex gap-3 md:gap-5 mt-1 flex-wrap justify-center">
            {[
              { icon: <Zap fill={C.yellow} color="transparent" size={16} />, val: "2,400+", label: "Active Students" },
              { icon: <Star fill={C.yellow} color="transparent" size={16} />, val: "12K", label: "Quizzes Played" },
              { icon: <Trophy fill={C.yellow} color="transparent" size={16} />, val: "98%", label: "Satisfaction" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/10 rounded-xl px-3.5 py-2 flex items-center gap-[7px] backdrop-blur-sm border border-white/[0.12]"
              >
                {s.icon}
                <div>
                  <p className="font-heading text-[15px] sm:text-base font-bold text-white m-0 leading-none">{s.val}</p>
                  <p className="font-body text-[10px] font-semibold text-white/50 m-0">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 overflow-y-auto">
          <div className="w-full max-w-[420px]">
            <div className="mb-6 sm:mb-7">
              <h1 className="font-heading text-[26px] sm:text-[32px] font-bold text-[#1B1E2B] mb-1.5 leading-[1.2]">
                {tab === "signup" ? "Join the arena! 🏆" : "Welcome back! ⚡"}
              </h1>
              <p className="font-body text-sm font-medium text-[#717182] m-0">
                {tab === "signup"
                  ? "Create your QuizArena account with your UMak Gmail."
                  : "Log in to your account and get back to the leaderboard."}
              </p>
            </div>

            <div className="bg-[#F3F3F7] rounded-2xl p-[5px] flex mb-6 sm:mb-7">
              <Tab label="Sign Up" active={tab === "signup"} onClick={() => setTab("signup")} />
              <Tab label="Log In" active={tab === "login"} onClick={() => setTab("login")} />
            </div>

            <div className="bg-white rounded-3xl px-6 py-7 sm:px-8 sm:pt-8 sm:pb-7 shadow-[0_4px_28px_rgba(0,0,0,0.07)] border-[1.5px] border-black/5">
              {tab === "signup" ? <SignUpForm /> : <LoginForm />}
            </div>

            <p className="font-body text-[13px] font-medium text-[#717182] text-center mt-5">
              {tab === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setTab("login")}
                    className="font-body bg-transparent border-none text-[#5B3DF6] font-bold cursor-pointer p-0 text-[13px]"
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  New to QuizArena?{" "}
                  <button
                    onClick={() => setTab("signup")}
                    className="font-body bg-transparent border-none text-[#5B3DF6] font-bold cursor-pointer p-0 text-[13px]"
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