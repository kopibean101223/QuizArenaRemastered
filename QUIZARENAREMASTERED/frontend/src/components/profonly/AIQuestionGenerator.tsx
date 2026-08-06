import { useState, useRef } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Upload, X, FileText, CheckCircle2, Clock, Loader2,
  ChevronDown, ChevronUp, BookOpen, Sparkles, RefreshCw,
  Pencil, Check, XCircle, Flag, Trophy, LayoutDashboard,
  Library, BarChart2, Settings, Layers, LogOut,
  AlertTriangle, Zap, Plus, Trash2, ChevronRight,
  CircleDot, AlignLeft, Hash, Circle,
} from "lucide-react";

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6",
  indigoLight: "rgba(91,61,246,0.07)",
  indigoMid: "rgba(91,61,246,0.13)",
  indigoBorder: "rgba(91,61,246,0.18)",
  indigoBorderStrong: "rgba(91,61,246,0.3)",
  coral: "#FF6B4A",
  coralLight: "rgba(255,107,74,0.1)",
  yellow: "#FFC93C",
  yellowLight: "rgba(255,201,60,0.13)",
  yellowBorder: "rgba(255,201,60,0.35)",
  green: "#2ED47A",
  greenLight: "rgba(46,212,122,0.1)",
  greenBorder: "rgba(46,212,122,0.28)",
  red: "#FF4757",
  redLight: "rgba(255,71,87,0.09)",
  redBorder: "rgba(255,71,87,0.22)",
  navy: "#1B1E2B",
  offWhite: "#FAFAFC",
  white: "#FFFFFF",
  muted: "#717182",
  border: "rgba(0,0,0,0.07)",
  inputBg: "#F3F3F7",
  citationBg: "rgba(91,61,246,0.055)",
  citationBorder: "rgba(91,61,246,0.16)",
};

// ─── Types ─────────────────────────────────────────────────────────────────────
type DocStatus = "uploading" | "processing" | "ready";
type QuestionStatus = "pending" | "approved" | "rejected";
type Confidence = "strong" | "low";

interface SyllabusDoc {
  id: number;
  filename: string;
  uploadDate: string;
  size: string;
  status: DocStatus;
  pages: number;
  subject: string;
}

interface Choice { label: string; text: string; isCorrect: boolean; }

interface Citation {
  docId: number;
  docName: string;
  topic: string;
  section: string;
  pageRange: string;
  confidence: Confidence;
  excerpt: string;
}

interface GeneratedQuestion {
  id: number;
  text: string;
  type: "Multiple Choice" | "True / False" | "Identification" | "Short Answer";
  choices?: Choice[];
  answer: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  status: QuestionStatus;
  citation: Citation;
  flagged: boolean;
  flagReason?: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────
const INIT_DOCS: SyllabusDoc[] = [
  { id: 1, filename: "MATH301_Syllabus_2025.pdf",     uploadDate: "Jul 22, 2026", size: "1.2 MB", status: "ready",      pages: 18, subject: "Mathematics" },
  { id: 2, filename: "CS301_CourseOutline_2025.pdf",  uploadDate: "Jul 23, 2026", size: "2.4 MB", status: "ready",      pages: 24, subject: "Computer Science" },
  { id: 3, filename: "PHY101_Syllabus.pdf",           uploadDate: "Jul 24, 2026", size: "980 KB", status: "processing", pages: 14, subject: "Physics" },
  { id: 4, filename: "BIO201_ModuleGuide.pdf",        uploadDate: "Jul 25, 2026", size: "3.1 MB", status: "uploading",  pages: 0,  subject: "Biology" },
];

const INIT_QUESTIONS: GeneratedQuestion[] = [
  {
    id: 1, status: "pending", difficulty: "Medium", type: "Multiple Choice", topic: "Calculus",
    text: "Which of the following best describes the Fundamental Theorem of Calculus?",
    choices: [
      { label: "A", text: "It links differentiation and integration as inverse operations.", isCorrect: true },
      { label: "B", text: "It states that every continuous function has an antiderivative.", isCorrect: false },
      { label: "C", text: "It defines the limit of a function as x approaches infinity.", isCorrect: false },
      { label: "D", text: "It proves that all polynomials are integrable over any interval.", isCorrect: false },
    ],
    answer: "A — It links differentiation and integration as inverse operations.",
    flagged: false,
    citation: {
      docId: 1, docName: "MATH301_Syllabus_2025.pdf", topic: "Integral Calculus",
      section: "Chapter 3 — The Fundamental Theorem", pageRange: "pp. 34–36",
      confidence: "strong",
      excerpt: "\"The Fundamental Theorem of Calculus establishes the relationship between differentiation and integration, showing they are inverse processes. Students should be able to state and apply both parts of the theorem...\"",
    },
  },
  {
    id: 2, status: "approved", difficulty: "Easy", type: "True / False", topic: "Data Structures",
    text: "A stack data structure follows the Last-In, First-Out (LIFO) principle.",
    choices: [
      { label: "A", text: "True", isCorrect: true },
      { label: "B", text: "False", isCorrect: false },
    ],
    answer: "True",
    flagged: false,
    citation: {
      docId: 2, docName: "CS301_CourseOutline_2025.pdf", topic: "Linear Data Structures",
      section: "Module 2 — Stacks & Queues", pageRange: "p. 12",
      confidence: "strong",
      excerpt: "\"Students are expected to differentiate between stack (LIFO) and queue (FIFO) structures, implement both using arrays and linked lists, and apply them to solve algorithmic problems such as expression evaluation...\"",
    },
  },
  {
    id: 3, status: "rejected", difficulty: "Hard", type: "Short Answer", topic: "Algorithms",
    text: "Explain why Dijkstra's algorithm fails on graphs with negative edge weights, and name one algorithm that handles this case.",
    choices: undefined,
    answer: "Dijkstra's assumes non-negative weights; Bellman-Ford handles negative edges.",
    flagged: false,
    citation: {
      docId: 2, docName: "CS301_CourseOutline_2025.pdf", topic: "Graph Algorithms",
      section: "Module 5 — Shortest Path Algorithms", pageRange: "pp. 58–61",
      confidence: "low",
      excerpt: "\"Graph traversal and shortest-path algorithms including BFS, DFS, and Dijkstra's algorithm are covered. Students will analyze time complexities and implement solutions...\"",
    },
  },
  {
    id: 4, status: "pending", difficulty: "Medium", type: "Identification", topic: "Trigonometry",
    text: "What term describes a triangle that has no equal sides and no equal angles?",
    choices: undefined,
    answer: "Scalene triangle",
    flagged: true,
    flagReason: "Page reference appears incorrect — scalene triangles are covered in Module 1, not Chapter 4.",
    citation: {
      docId: 1, docName: "MATH301_Syllabus_2025.pdf", topic: "Triangle Geometry",
      section: "Chapter 4 — Trigonometric Identities", pageRange: "p. 48",
      confidence: "low",
      excerpt: "\"Trigonometric identities and their applications, including the law of sines and cosines, are introduced. Students will solve problems involving oblique triangles...\"",
    },
  },
  {
    id: 5, status: "pending", difficulty: "Easy", type: "Multiple Choice", topic: "Integral Calculus",
    text: "What is the integral of f(x) = 4x³ with respect to x?",
    choices: [
      { label: "A", text: "x⁴ + C", isCorrect: true },
      { label: "B", text: "12x² + C", isCorrect: false },
      { label: "C", text: "4x⁴ + C", isCorrect: false },
      { label: "D", text: "x⁴", isCorrect: false },
    ],
    answer: "A — x⁴ + C",
    flagged: false,
    citation: {
      docId: 1, docName: "MATH301_Syllabus_2025.pdf", topic: "Integration Techniques",
      section: "Chapter 3 — Basic Integration Rules", pageRange: "pp. 31–33",
      confidence: "strong",
      excerpt: "\"The power rule of integration states that ∫xⁿ dx = xⁿ⁺¹/(n+1) + C for n ≠ −1. Students will apply this rule to polynomial, exponential, and trigonometric functions...\"",
    },
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const DIFF_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Easy:   { bg: C.greenLight,  text: "#18A058", border: C.greenBorder },
  Medium: { bg: C.yellowLight, text: "#9A6C00", border: C.yellowBorder },
  Hard:   { bg: C.coralLight,  text: "#C8441E", border: "rgba(255,107,74,0.25)" },
};

const STATUS_STYLE: Record<QuestionStatus, { bg: string; text: string; border: string; label: string }> = {
  pending:  { bg: C.yellowLight, text: "#9A6C00", border: C.yellowBorder, label: "Pending" },
  approved: { bg: C.greenLight,  text: "#18A058", border: C.greenBorder,  label: "Approved" },
  rejected: { bg: C.redLight,    text: C.red,     border: C.redBorder,    label: "Rejected" },
};

const DOC_STATUS: Record<DocStatus, { icon: React.ReactNode; text: string; bg: string; color: string }> = {
  uploading:  { icon: <Loader2 size={11} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }}/>, text: "Uploading",  bg: C.indigoMid,    color: C.indigo },
  processing: { icon: <Loader2 size={11} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }}/>, text: "Processing", bg: C.yellowLight,  color: "#9A6C00" },
  ready:      { icon: <CheckCircle2 size={11} strokeWidth={2.5}/>,                                                 text: "Ready",      bg: C.greenLight,   color: "#18A058" },
};

const QTYPE_ICON: Record<string, React.ReactNode> = {
  "Multiple Choice": <Circle size={10} strokeWidth={2.5} />,
  "True / False":    <CircleDot size={10} strokeWidth={2.5} />,
  "Identification":  <Hash size={10} strokeWidth={2.5} />,
  "Short Answer":    <AlignLeft size={10} strokeWidth={2.5} />,
};

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() { return <ProfSidebar />;
  const [active, setActive] = useState("ai");
  const items = [
    { id: "dashboard", icon: <LayoutDashboard size={17} strokeWidth={2} />, label: "Dashboard" },
    { id: "sections",  icon: <Layers size={17} strokeWidth={2} />,          label: "My Sections" },
    { id: "bank",      icon: <Library size={17} strokeWidth={2} />,          label: "Question Bank" },
    { id: "ai",        icon: <Sparkles size={17} strokeWidth={2} />,         label: "AI Generator" },
    { id: "analytics", icon: <BarChart2 size={17} strokeWidth={2} />,        label: "Analytics" },
    { id: "settings",  icon: <Settings size={17} strokeWidth={2} />,         label: "Settings" },
  ];
  return (
    <div style={{ width: 210, minWidth: 210, background: C.navy, display: "flex", flexDirection: "column",
      padding: "22px 12px", gap: 3, height: "100vh", position: "sticky", top: 0, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 8px", marginBottom: 22 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: C.indigo, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Trophy fill={C.yellow} color="transparent" size={17} />
        </div>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 19, fontWeight: 700, color: "#fff" }}>QuizArena</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map(item => (
          <button key={item.id} type="button" onClick={() => setActive(item.id)} style={{
            display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 11,
            background: active === item.id ? "rgba(91,61,246,0.85)" : "transparent", border: "none",
            cursor: "pointer", color: active === item.id ? "#fff" : "rgba(255,255,255,0.42)",
            fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: active === item.id ? 700 : 500,
            textAlign: "left", transition: "all 0.15s", width: "100%",
          }}>
            {item.icon}{item.label}
          </button>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center",
        gap: 9, padding: "14px 8px 0" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.indigo, display: "flex",
          alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif",
          fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0 }}>RD</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#fff",
            margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Prof. R. Dela Cruz</p>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.38)", margin: 0 }}>Professor</p>
        </div>
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.28)", padding: 0, display: "flex" }}>
          <LogOut size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ─── Citation Panel ────────────────────────────────────────────────────────────
function CitationPanel({ citation, flagged, flagReason, onFlag }:
  { citation: Citation; flagged: boolean; flagReason?: string; onFlag: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);
  const [flagText, setFlagText] = useState(flagReason ?? "");
  const isStrong = citation.confidence === "strong";

  return (
    <div style={{
      background: C.citationBg,
      border: `1.5px solid ${flagged ? "rgba(255,71,87,0.22)" : C.citationBorder}`,
      borderRadius: 14,
      overflow: "hidden",
    }}>
      {/* Citation header row */}
      <div style={{ padding: "11px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        {/* Document icon */}
        <div style={{ width: 32, height: 32, borderRadius: 9, background: C.indigoMid,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
          <FileText size={15} color={C.indigo} strokeWidth={2} />
        </div>

        {/* Source info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
              color: C.indigo, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Source Citation
            </span>
            {/* Confidence badge */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: isStrong ? C.greenLight : C.yellowLight,
              color: isStrong ? "#18A058" : "#9A6C00",
              border: `1.5px solid ${isStrong ? C.greenBorder : C.yellowBorder}`,
              borderRadius: 20, padding: "2px 8px",
              fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%",
                background: isStrong ? "#18A058" : "#9A6C00" }} />
              {isStrong ? "Strong Match" : "Low Confidence"}
            </span>
            {flagged && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
                background: C.redLight, color: C.red, border: `1.5px solid ${C.redBorder}`,
                borderRadius: 20, padding: "2px 8px",
                fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800 }}>
                <AlertTriangle size={9} strokeWidth={2.5} />Flagged
              </span>
            )}
          </div>

          {/* Doc name */}
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
            color: C.navy, margin: 0, lineHeight: 1.4,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {citation.docName}
          </p>

          {/* Topic + section + page */}
          <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
            {[
              { icon: <BookOpen size={10} strokeWidth={2} />, text: citation.topic },
              { icon: <ChevronRight size={10} strokeWidth={2.5} />, text: citation.section },
              { icon: <Hash size={10} strokeWidth={2} />, text: citation.pageRange },
            ].map((m, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3,
                fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted }}>
                {m.icon}{m.text}
              </span>
            ))}
          </div>
        </div>

        {/* Expand toggle */}
        <button type="button" onClick={() => setExpanded(v => !v)} style={{
          background: "transparent", border: "none", cursor: "pointer", color: C.muted,
          display: "flex", alignItems: "center", gap: 4, padding: "2px 4px",
          fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600,
          flexShrink: 0, marginTop: 2,
        }}>
          {expanded ? <ChevronUp size={13} strokeWidth={2.5} /> : <ChevronDown size={13} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Excerpt (expanded) */}
      {expanded && (
        <div style={{ padding: "0 14px 12px" }}>
          <div style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${C.indigoBorder}`,
            borderRadius: 10, padding: "10px 13px" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500,
              color: "#3D3D5C", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
              {citation.excerpt}
            </p>
          </div>
        </div>
      )}

      {/* Flag row */}
      <div style={{ padding: "0 14px 11px", display: "flex", alignItems: "center", gap: 8 }}>
        {!flagOpen ? (
          <button type="button" onClick={() => setFlagOpen(true)} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "transparent",
            border: `1.5px solid ${flagged ? C.redBorder : C.indigoBorderStrong}`,
            borderRadius: 8, padding: "4px 10px", cursor: "pointer",
            fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
            color: flagged ? C.red : C.indigo, transition: "all 0.15s",
          }}>
            <Flag size={10} strokeWidth={2.5} />
            {flagged ? "View Flag Reason" : "Flag Incorrect Citation"}
          </button>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <textarea value={flagText} onChange={e => setFlagText(e.target.value)}
              placeholder="Describe why this citation is incorrect…"
              rows={2} style={{ width: "100%", background: "rgba(255,255,255,0.8)",
                border: `1.5px solid ${C.redBorder}`, borderRadius: 9, padding: "8px 10px",
                fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: C.navy,
                outline: "none", resize: "none", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 6 }}>
              <button type="button" onClick={() => { onFlag(); setFlagOpen(false); }} style={{
                background: C.redLight, border: `1.5px solid ${C.redBorder}`, borderRadius: 8,
                padding: "5px 12px", fontFamily: "Manrope, sans-serif", fontSize: 11,
                fontWeight: 700, color: C.red, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <Flag size={10} strokeWidth={2.5} />Submit Flag
              </button>
              <button type="button" onClick={() => setFlagOpen(false)} style={{
                background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 8,
                padding: "5px 10px", fontFamily: "Manrope, sans-serif", fontSize: 11,
                fontWeight: 600, color: C.muted, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Question Card ─────────────────────────────────────────────────────────────
function QuestionCard({ q, onStatusChange, onFlag, onRegenerate }:
  { q: GeneratedQuestion; onStatusChange: (id: number, s: QuestionStatus) => void;
    onFlag: (id: number) => void; onRegenerate: (id: number) => void; }) {
  const [expanded, setExpanded] = useState(true);
  const [generating, setGenerating] = useState(false);
  const statusS = STATUS_STYLE[q.status];
  const diffS = DIFF_STYLE[q.difficulty];

  function handleRegen() {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1800);
    onRegenerate(q.id);
  }

  return (
    <div style={{
      background: C.white,
      borderRadius: 20,
      border: `1.5px solid ${q.status === "approved" ? C.greenBorder : q.status === "rejected" ? C.redBorder : C.border}`,
      boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
      overflow: "hidden",
      opacity: q.status === "rejected" ? 0.72 : 1,
      transition: "all 0.18s",
    }}>
      {/* Card header */}
      <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Badge row */}
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
            {/* Status */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
              background: statusS.bg, color: statusS.text, border: `1.5px solid ${statusS.border}`,
              borderRadius: 20, padding: "2px 9px",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusS.text }} />
              {statusS.label}
            </span>
            {/* Difficulty */}
            <span style={{ background: diffS.bg, color: diffS.text, border: `1.5px solid ${diffS.border}`,
              borderRadius: 7, padding: "2px 8px",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700 }}>
              {q.difficulty}
            </span>
            {/* Type */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
              background: C.inputBg, color: C.muted, borderRadius: 7, padding: "2px 8px",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600 }}>
              {QTYPE_ICON[q.type]}{q.type}
            </span>
            {/* Topic */}
            <span style={{ background: C.indigoLight, color: C.indigo, borderRadius: 7, padding: "2px 8px",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700 }}>
              {q.topic}
            </span>
          </div>
          {/* Question text */}
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700,
            color: C.navy, margin: 0, lineHeight: 1.55 }}>
            {generating ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted }}>
                <Loader2 size={14} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} />
                Regenerating question…
              </span>
            ) : q.text}
          </p>
        </div>
        {/* Collapse toggle */}
        <button type="button" onClick={() => setExpanded(v => !v)} style={{
          background: C.inputBg, border: "none", borderRadius: 9, padding: 7,
          cursor: "pointer", color: C.muted, display: "flex", flexShrink: 0,
        }}>
          {expanded ? <ChevronUp size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
        </button>
      </div>

      {expanded && !generating && (
        <>
          {/* Choices */}
          {q.choices && q.choices.length > 0 && (
            <div style={{ padding: "0 18px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
              {q.choices.map(ch => (
                <div key={ch.label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: ch.isCorrect ? C.greenLight : C.offWhite,
                  border: `1.5px solid ${ch.isCorrect ? C.greenBorder : C.border}`,
                  borderRadius: 11, padding: "8px 12px",
                }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                    background: ch.isCorrect ? C.green : "rgba(0,0,0,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800,
                    color: ch.isCorrect ? "#fff" : C.muted }}>
                    {ch.label}
                  </span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: ch.isCorrect ? 700 : 500,
                    color: ch.isCorrect ? "#18A058" : C.navy }}>
                    {ch.text}
                  </span>
                  {ch.isCorrect && <CheckCircle2 size={14} color="#18A058" style={{ marginLeft: "auto" }} />}
                </div>
              ))}
            </div>
          )}

          {/* Non-MC answer */}
          {(!q.choices || q.choices.length === 0) && (
            <div style={{ padding: "0 18px 14px" }}>
              <div style={{ background: C.greenLight, border: `1.5px solid ${C.greenBorder}`,
                borderRadius: 11, padding: "9px 13px" }}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
                  color: "#18A058", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Answer
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600,
                  color: "#18A058", margin: 0, lineHeight: 1.5 }}>
                  {q.answer}
                </p>
              </div>
            </div>
          )}

          {/* ── Source Citation panel ── */}
          <div style={{ padding: "0 18px 14px" }}>
            <CitationPanel
              citation={q.citation}
              flagged={q.flagged}
              flagReason={q.flagReason}
              onFlag={() => onFlag(q.id)}
            />
          </div>
        </>
      )}

      {/* Action footer */}
      <div style={{ borderTop: `1.5px solid ${C.border}`, padding: "11px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        background: "#FAFAFC" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <ActionBtn icon={<RefreshCw size={13} strokeWidth={2.5} />} label="Regenerate"
            bg={C.indigoLight} color={C.indigo} onClick={handleRegen} loading={generating} />
          <ActionBtn icon={<Pencil size={13} strokeWidth={2} />} label="Edit"
            bg={C.yellowLight} color="#9A6C00" onClick={() => {}} />
        </div>
        {q.status !== "approved" && q.status !== "rejected" ? (
          <div style={{ display: "flex", gap: 6 }}>
            <ActionBtn icon={<Check size={13} strokeWidth={2.5} />} label="Approve"
              bg={C.greenLight} color="#18A058" border={C.greenBorder}
              onClick={() => onStatusChange(q.id, "approved")} />
            <ActionBtn icon={<XCircle size={13} strokeWidth={2.5} />} label="Reject"
              bg={C.redLight} color={C.red} border={C.redBorder}
              onClick={() => onStatusChange(q.id, "rejected")} />
          </div>
        ) : (
          <button type="button" onClick={() => onStatusChange(q.id, "pending")} style={{
            background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 9,
            padding: "6px 12px", fontFamily: "Manrope, sans-serif", fontSize: 12,
            fontWeight: 700, color: C.muted, cursor: "pointer",
          }}>
            Reset to Pending
          </button>
        )}
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, bg, color, border, onClick, loading }:
  { icon: React.ReactNode; label: string; bg: string; color: string;
    border?: string; onClick: () => void; loading?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={loading} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: bg, border: `1.5px solid ${border ?? "transparent"}`,
      borderRadius: 9, padding: "6px 12px", cursor: loading ? "default" : "pointer",
      fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color,
      transition: "opacity 0.15s", opacity: loading ? 0.6 : 1,
    }}>
      {loading ? <Loader2 size={13} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} /> : icon}
      {label}
    </button>
  );
}

// ─── Syllabus Document Row ─────────────────────────────────────────────────────
function DocRow({ doc, onRemove }: { doc: SyllabusDoc; onRemove: (id: number) => void }) {
  const ds = DOC_STATUS[doc.status];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px",
      background: C.white, borderRadius: 14, border: `1.5px solid ${C.border}`,
      boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      {/* Icon */}
      <div style={{ width: 36, height: 36, borderRadius: 10, background: C.indigoLight,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <FileText size={17} color={C.indigo} strokeWidth={2} />
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy,
          margin: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {doc.filename}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted }}>
            {doc.uploadDate}
          </span>
          {doc.status === "ready" && (
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted }}>
              {doc.pages}p · {doc.size}
            </span>
          )}
          {/* Status badge */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
            background: ds.bg, color: ds.color, borderRadius: 20, padding: "2px 8px",
            fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800 }}>
            {ds.icon}{ds.text}
          </span>
        </div>
        {/* Progress bar for uploading */}
        {doc.status === "uploading" && (
          <div style={{ marginTop: 7, height: 4, borderRadius: 50, background: C.inputBg, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "45%", borderRadius: 50,
              background: C.indigo, animation: "progressPulse 1.4s ease-in-out infinite" }} />
          </div>
        )}
      </div>
      {/* Remove */}
      {doc.status === "ready" && (
        <button type="button" onClick={() => onRemove(doc.id)} style={{
          background: "transparent", border: "none", cursor: "pointer", color: C.muted,
          display: "flex", padding: "2px", borderRadius: 7, flexShrink: 0,
          transition: "color 0.15s",
        }}>
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

// ─── Generate Config Panel ─────────────────────────────────────────────────────
function GeneratePanel({ docs, onGenerate }:
  { docs: SyllabusDoc[]; onGenerate: () => void }) {
  const [count, setCount] = useState("5");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [qtype, setQtype] = useState("Mixed");
  const [selectedDoc, setSelectedDoc] = useState<number | "all">("all");
  const [generating, setGenerating] = useState(false);
  const readyDocs = docs.filter(d => d.status === "ready");

  function handleGenerate() {
    if (!readyDocs.length) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); onGenerate(); }, 2200);
  }

  return (
    <div style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}`,
      padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Sparkles size={15} color={C.indigo} strokeWidth={2} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.navy }}>
          Generate Settings
        </span>
      </div>

      {/* Source doc */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
          color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Source Document</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button type="button" onClick={() => setSelectedDoc("all")} style={{
            background: selectedDoc === "all" ? C.indigoLight : C.offWhite,
            border: `1.5px solid ${selectedDoc === "all" ? C.indigo : C.border}`,
            borderRadius: 10, padding: "7px 12px", cursor: "pointer", textAlign: "left",
            fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
            color: selectedDoc === "all" ? C.indigo : C.muted,
          }}>All ready documents ({readyDocs.length})</button>
          {readyDocs.map(d => (
            <button key={d.id} type="button" onClick={() => setSelectedDoc(d.id)} style={{
              background: selectedDoc === d.id ? C.indigoLight : "transparent",
              border: `1.5px solid ${selectedDoc === d.id ? C.indigo : C.border}`,
              borderRadius: 10, padding: "7px 12px", cursor: "pointer", textAlign: "left",
              fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600,
              color: selectedDoc === d.id ? C.indigo : C.navy,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{d.filename}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
          color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Questions to Generate</label>
        <div style={{ display: "flex", gap: 6 }}>
          {["3", "5", "10", "15"].map(n => (
            <button key={n} type="button" onClick={() => setCount(n)} style={{
              flex: 1, background: count === n ? C.indigo : C.offWhite,
              border: `1.5px solid ${count === n ? C.indigo : C.border}`,
              borderRadius: 9, padding: "7px 0",
              fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700,
              color: count === n ? "#fff" : C.navy, cursor: "pointer",
            }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
          color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Difficulty</label>
        <div style={{ display: "flex", gap: 5 }}>
          {["Mixed", "Easy", "Medium", "Hard"].map(d => (
            <button key={d} type="button" onClick={() => setDifficulty(d)} style={{
              flex: 1, background: difficulty === d ? C.indigoLight : C.offWhite,
              border: `1.5px solid ${difficulty === d ? C.indigo : C.border}`,
              borderRadius: 8, padding: "6px 0",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
              color: difficulty === d ? C.indigo : C.muted, cursor: "pointer",
            }}>{d}</button>
          ))}
        </div>
      </div>

      {/* Question type */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
          color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Question Type</label>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["Mixed", "MC", "T/F", "ID", "SA"].map(t => (
            <button key={t} type="button" onClick={() => setQtype(t)} style={{
              background: qtype === t ? C.indigoLight : C.offWhite,
              border: `1.5px solid ${qtype === t ? C.indigo : C.border}`,
              borderRadius: 8, padding: "6px 10px",
              fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
              color: qtype === t ? C.indigo : C.muted, cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button type="button" onClick={handleGenerate}
        disabled={generating || readyDocs.length === 0}
        style={{
          width: "100%", background: generating || !readyDocs.length
            ? "rgba(91,61,246,0.4)" : C.indigo,
          border: "none", borderRadius: 12, padding: "12px",
          fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700,
          color: "#fff", cursor: generating || !readyDocs.length ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: generating ? "none" : "0 4px 14px rgba(91,61,246,0.3)",
          transition: "all 0.15s",
        }}>
        {generating
          ? <><Loader2 size={16} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} />Generating…</>
          : <><Sparkles size={16} strokeWidth={2.5} />Generate Questions</>}
      </button>
      {!readyDocs.length && (
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted,
          margin: 0, textAlign: "center" }}>
          Upload and process a syllabus document first.
        </p>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function AIQuestionGenerator() {
  const [docs, setDocs] = useState<SyllabusDoc[]>(INIT_DOCS);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>(INIT_QUESTIONS);
  const [statusFilter, setStatusFilter] = useState<"all" | QuestionStatus>("all");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const newDoc: SyllabusDoc = {
      id: Date.now(), filename: file.name, uploadDate: "Jul 26, 2026",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: "uploading", pages: 0, subject: "Unknown",
    };
    setDocs(d => [...d, newDoc]);
    setTimeout(() => setDocs(d => d.map(x => x.id === newDoc.id ? { ...x, status: "processing" } : x)), 1500);
    setTimeout(() => setDocs(d => d.map(x => x.id === newDoc.id ? { ...x, status: "ready", pages: 12 } : x)), 3500);
    e.target.value = "";
  }

  function handleGenerate() {
    // simulate adding one new pending question
    const newQ: GeneratedQuestion = {
      id: Date.now(), status: "pending", difficulty: "Medium", type: "Multiple Choice",
      topic: "Generated Topic",
      text: "This is a newly AI-generated question based on your syllabus content.",
      choices: [
        { label: "A", text: "The correct generated answer.", isCorrect: true },
        { label: "B", text: "A plausible distractor.", isCorrect: false },
        { label: "C", text: "Another distractor.", isCorrect: false },
        { label: "D", text: "A final distractor.", isCorrect: false },
      ],
      answer: "A — The correct generated answer.",
      flagged: false,
      citation: {
        docId: docs.find(d => d.status === "ready")?.id ?? 1,
        docName: docs.find(d => d.status === "ready")?.filename ?? "Unknown",
        topic: "Course Overview", section: "Chapter 1 — Introduction", pageRange: "pp. 1–5",
        confidence: "strong",
        excerpt: "\"This excerpt is pulled directly from the uploaded syllabus document to support the generated question with a source citation...\"",
      },
    };
    setQuestions(q => [newQ, ...q]);
  }

  const filtered = statusFilter === "all" ? questions : questions.filter(q => q.status === statusFilter);
  const counts = { all: questions.length, pending: questions.filter(q => q.status === "pending").length,
    approved: questions.filter(q => q.status === "approved").length,
    rejected: questions.filter(q => q.status === "rejected").length };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progressPulse { 0%{width:10%} 50%{width:65%} 100%{width:10%} }
      `}</style>
      <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden" }}>
        <Sidebar />

        {/* ── Main area ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* Top bar */}
          <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`,
            padding: "0 24px", height: 62, display: "flex", alignItems: "center",
            justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: C.indigoLight,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={17} color={C.indigo} strokeWidth={2} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800,
                  color: C.navy, margin: 0, lineHeight: 1.2 }}>AI Question Generator</h1>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600,
                  color: C.muted, margin: 0 }}>
                  Powered by your syllabus · every question cites its source
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.greenLight,
                border: `1.5px solid ${C.greenBorder}`, borderRadius: 20, padding: "5px 12px" }}>
                <CheckCircle2 size={12} color="#18A058" strokeWidth={2.5} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#18A058" }}>
                  {counts.approved} Approved
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.yellowLight,
                border: `1.5px solid ${C.yellowBorder}`, borderRadius: 20, padding: "5px 12px" }}>
                <Clock size={12} color="#9A6C00" strokeWidth={2.5} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#9A6C00" }}>
                  {counts.pending} Pending
                </span>
              </div>
            </div>
          </div>

          {/* Two-column body */}
          <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>

            {/* ── LEFT PANEL ── */}
            <div style={{ width: 300, minWidth: 300, borderRight: `1.5px solid ${C.border}`,
              display: "flex", flexDirection: "column", overflow: "hidden",
              background: "#F5F5FA" }}>

              {/* Panel header */}
              <div style={{ padding: "18px 16px 14px", borderBottom: `1.5px solid ${C.border}`,
                background: C.white }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 12 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.navy }}>
                    Syllabus Documents
                  </span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700,
                    color: C.muted, background: C.inputBg, borderRadius: 20, padding: "2px 8px" }}>
                    {docs.length} files
                  </span>
                </div>
                {/* Upload button */}
                <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={handleUpload}
                  style={{ display: "none" }} />
                <button type="button" onClick={() => fileRef.current?.click()} style={{
                  width: "100%", background: C.indigo, border: "none", borderRadius: 11,
                  padding: "9px 14px", fontFamily: "Manrope, sans-serif", fontSize: 13,
                  fontWeight: 700, color: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                  boxShadow: "0 3px 10px rgba(91,61,246,0.25)",
                }}>
                  <Upload size={14} strokeWidth={2.5} />Upload Syllabus
                </button>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted,
                  margin: "7px 0 0", textAlign: "center" }}>
                  Accepts PDF or DOCX files
                </p>
              </div>

              {/* Doc list */}
              <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {docs.map(doc => (
                    <DocRow key={doc.id} doc={doc}
                      onRemove={id => setDocs(d => d.filter(x => x.id !== id))} />
                  ))}
                </div>

                {/* Transparency note */}
                <div style={{ marginTop: 16, background: C.indigoLight,
                  border: `1.5px solid ${C.indigoBorder}`, borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.indigoMid,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Zap size={13} color={C.indigo} fill={C.indigo} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800,
                        color: C.indigo, margin: 0 }}>Transparency Feature</p>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500,
                        color: C.indigo, margin: "3px 0 0", lineHeight: 1.55, opacity: 0.8 }}>
                        Every AI-generated question is traced to a specific page and section from
                        your uploaded documents. Flag any citation you believe is incorrect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate config panel */}
              <div style={{ padding: "12px", borderTop: `1.5px solid ${C.border}` }}>
                <GeneratePanel docs={docs} onGenerate={handleGenerate} />
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

              {/* Feed header / filter bar */}
              <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`,
                padding: "12px 20px", display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["all", "pending", "approved", "rejected"] as const).map(f => {
                    const labels = { all: "All", pending: "Pending", approved: "Approved", rejected: "Rejected" };
                    const colors = {
                      all:      { bg: statusFilter === "all"      ? C.navy       : C.inputBg,   text: statusFilter === "all"      ? "#fff" : C.muted },
                      pending:  { bg: statusFilter === "pending"  ? C.yellowLight: C.inputBg,   text: statusFilter === "pending"  ? "#9A6C00" : C.muted },
                      approved: { bg: statusFilter === "approved" ? C.greenLight : C.inputBg,   text: statusFilter === "approved" ? "#18A058" : C.muted },
                      rejected: { bg: statusFilter === "rejected" ? C.redLight   : C.inputBg,   text: statusFilter === "rejected" ? C.red     : C.muted },
                    };
                    return (
                      <button key={f} type="button" onClick={() => setStatusFilter(f)} style={{
                        background: colors[f].bg,
                        border: `1.5px solid ${statusFilter === f ? "transparent" : C.border}`,
                        borderRadius: 20, padding: "5px 13px",
                        fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                        color: colors[f].text, cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: 5,
                      }}>
                        {labels[f]}
                        <span style={{ background: "rgba(0,0,0,0.08)", borderRadius: 20,
                          padding: "0px 6px", fontSize: 10 }}>
                          {counts[f]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 7 }}>
                  <button type="button" onClick={() => setQuestions(q => q.map(x =>
                    x.status === "pending" ? { ...x, status: "approved" } : x))} style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: C.greenLight, border: `1.5px solid ${C.greenBorder}`,
                    borderRadius: 9, padding: "6px 12px",
                    fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700,
                    color: "#18A058", cursor: "pointer",
                  }}>
                    <CheckCircle2 size={13} strokeWidth={2.5} />Approve All Pending
                  </button>
                </div>
              </div>

              {/* Cards feed */}
              <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
                {filtered.length === 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 12, padding: "80px 24px", textAlign: "center" }}>
                    <Sparkles size={40} color={C.muted} strokeWidth={1.5} />
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, fontWeight: 700,
                      color: C.navy, margin: 0 }}>No questions here yet</p>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted,
                      margin: 0, maxWidth: 320 }}>
                      Upload a syllabus document and click "Generate Questions" to get started.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {filtered.map(q => (
                      <QuestionCard key={q.id} q={q}
                        onStatusChange={(id, s) =>
                          setQuestions(qs => qs.map(x => x.id === id ? { ...x, status: s } : x))}
                        onFlag={id =>
                          setQuestions(qs => qs.map(x => x.id === id ? { ...x, flagged: true } : x))}
                        onRegenerate={() => {}}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
