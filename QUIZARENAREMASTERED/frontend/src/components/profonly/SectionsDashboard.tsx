import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
  Users,
  MoreVertical,
  Pencil,
  Archive,
  CheckCircle2,
  XCircle,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Clock,
  Layers,
  Trophy,
  LogOut,
  LayoutDashboard,
  Library,
  BarChart2,
  Settings,
} from "lucide-react";

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6",
  indigoLight: "rgba(91,61,246,0.08)",
  coral: "#FF6B4A",
  coralLight: "rgba(255,107,74,0.1)",
  yellow: "#FFC93C",
  yellowLight: "rgba(255,201,60,0.15)",
  green: "#2ED47A",
  greenLight: "rgba(46,212,122,0.12)",
  red: "#FF4757",
  redLight: "rgba(255,71,87,0.1)",
  navy: "#1B1E2B",
  offWhite: "#FAFAFC",
  white: "#FFFFFF",
  muted: "#717182",
  border: "rgba(0,0,0,0.07)",
  inputBg: "#F3F3F7",
  sidebarBg: "#1B1E2B",
};

// ─── Mock data ─────────────────────────────────────────────────────────────────
const SUBJECTS = ["All Subjects", "Mathematics", "Physics", "Computer Science", "History", "Biology"];
const SEMESTERS = ["All Semesters", "1st Sem 2025–2026", "2nd Sem 2025–2026", "Summer 2026"];

const SUBJECT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Mathematics:      { bg: "rgba(91,61,246,0.1)",   text: "#5B3DF6", dot: "#5B3DF6" },
  Physics:          { bg: "rgba(255,107,74,0.1)",  text: "#E05030", dot: "#FF6B4A" },
  "Computer Science":{ bg: "rgba(46,212,122,0.12)", text: "#18A058", dot: "#2ED47A" },
  History:          { bg: "rgba(255,201,60,0.15)", text: "#B8820A", dot: "#FFC93C" },
  Biology:          { bg: "rgba(91,200,246,0.15)", text: "#0A7EA8", dot: "#5BC8F6" },
};

interface Section {
  id: number;
  name: string;
  subject: string;
  code: string;
  semester: string;
  professor: string;
  studentCount: number;
  capacity: number;
  status: "active" | "archived";
  schedule: string;
  room: string;
}

const ALL_SECTIONS: Section[] = [
  { id: 1,  name: "BSCS 3-A",    subject: "Computer Science", code: "CS301",  semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 32, capacity: 40, status: "active",   schedule: "MWF 7:30–9:00 AM",  room: "Lab 201" },
  { id: 2,  name: "BSCS 3-B",    subject: "Computer Science", code: "CS301",  semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 28, capacity: 40, status: "active",   schedule: "MWF 9:00–10:30 AM", room: "Lab 201" },
  { id: 3,  name: "BSMATH 2-A",  subject: "Mathematics",      code: "MATH201",semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 38, capacity: 40, status: "active",   schedule: "TTh 10:30–12:00 PM",room: "Room 304" },
  { id: 4,  name: "BSPHYS 1-A",  subject: "Physics",          code: "PHY101", semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 22, capacity: 35, status: "active",   schedule: "MWF 1:00–2:30 PM",  room: "Room 105" },
  { id: 5,  name: "BSHIST 4-B",  subject: "History",          code: "HIS401", semester: "2nd Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 30, capacity: 35, status: "active",   schedule: "TTh 8:00–9:30 AM",  room: "Room 210" },
  { id: 6,  name: "BSBIO 2-C",   subject: "Biology",          code: "BIO201", semester: "2nd Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 18, capacity: 30, status: "active",   schedule: "MWF 3:00–4:30 PM",  room: "Lab 102" },
  { id: 7,  name: "BSMATH 3-A",  subject: "Mathematics",      code: "MATH301",semester: "2nd Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 35, capacity: 40, status: "active",   schedule: "TTh 1:00–2:30 PM",  room: "Room 304" },
  { id: 8,  name: "BSCS 2-A",    subject: "Computer Science", code: "CS201",  semester: "Summer 2026",       professor: "Prof. R. Dela Cruz", studentCount: 15, capacity: 25, status: "archived", schedule: "Daily 8:00–10:00 AM",room: "Lab 201" },
  { id: 9,  name: "BSPHYS 2-B",  subject: "Physics",          code: "PHY201", semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 26, capacity: 35, status: "active",   schedule: "TTh 3:00–4:30 PM",  room: "Room 107" },
  { id: 10, name: "BSBIO 3-A",   subject: "Biology",          code: "BIO301", semester: "1st Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 24, capacity: 30, status: "active",   schedule: "MWF 10:30–12:00 PM",room: "Lab 103" },
  { id: 11, name: "BSHIST 3-A",  subject: "History",          code: "HIS301", semester: "2nd Sem 2025–2026", professor: "Prof. R. Dela Cruz", studentCount: 29, capacity: 35, status: "active",   schedule: "MWF 2:30–4:00 PM",  room: "Room 211" },
  { id: 12, name: "BSMATH 1-B",  subject: "Mathematics",      code: "MATH101",semester: "Summer 2026",       professor: "Prof. R. Dela Cruz", studentCount: 12, capacity: 25, status: "archived", schedule: "Daily 1:00–3:00 PM", room: "Room 302" },
];

interface JoinRequest {
  id: number;
  studentName: string;
  studentId: string;
  avatar: string;
  section: string;
  subject: string;
  requestedAt: string;
}

const JOIN_REQUESTS: JoinRequest[] = [
  { id: 1, studentName: "Ana Reyes",       studentId: "2023-0041", avatar: "AR", section: "BSCS 3-A",   subject: "Computer Science", requestedAt: "2 hrs ago" },
  { id: 2, studentName: "Juan dela Torre", studentId: "2023-0088", avatar: "JD", section: "BSMATH 2-A", subject: "Mathematics",      requestedAt: "4 hrs ago" },
  { id: 3, studentName: "Maria Santos",    studentId: "2022-0134", avatar: "MS", section: "BSPHYS 1-A", subject: "Physics",          requestedAt: "Yesterday" },
  { id: 4, studentName: "Carlo Bautista",  studentId: "2023-0056", avatar: "CB", section: "BSCS 3-B",   subject: "Computer Science", requestedAt: "Yesterday" },
  { id: 5, studentName: "Lea Fajardo",     studentId: "2024-0012", avatar: "LF", section: "BSHIST 4-B", subject: "History",          requestedAt: "2 days ago" },
];

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#FFC93C","#2ED47A","#FF4757","#5BC8F6","#B06EF6","#FF9F40"];

const PAGE_SIZE = 6;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function avatarColor(i: number) { return AVATAR_COLORS[i % AVATAR_COLORS.length]; }

function AvatarStack({ count, sectionId }: { count: number; sectionId: number }) {
  const shown = Math.min(count, 4);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: shown }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: avatarColor(sectionId + i),
              border: "2px solid #fff",
              marginLeft: i === 0 ? 0 : -7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "Manrope, sans-serif",
              zIndex: shown - i,
              position: "relative",
            }}
          />
        ))}
      </div>
      <span style={{ marginLeft: 6, fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>
        {count}
        <span style={{ fontWeight: 500, color: C.muted }}> / {}</span>
      </span>
    </div>
  );
}

function SubjectBadge({ subject }: { subject: string }) {
  const col = SUBJECT_COLORS[subject] ?? { bg: C.indigoLight, text: C.indigo, dot: C.indigo };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: col.bg,
        color: col.text,
        borderRadius: 8,
        padding: "3px 9px",
        fontFamily: "Manrope, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
      {subject}
    </span>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({
  value,
  options,
  onChange,
  width,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          background: C.white,
          border: `1.5px solid ${open ? C.indigo : C.border}`,
          borderRadius: 12,
          padding: "9px 14px",
          fontFamily: "Manrope, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: value.startsWith("All") ? C.muted : C.navy,
          cursor: "pointer",
          transition: "border-color 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        {value}
        <ChevronDown size={14} color={C.muted} style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            width: "100%",
            minWidth: 180,
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            zIndex: 100,
            overflow: "hidden",
            padding: "6px",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: "100%",
                background: opt === value ? C.indigoLight : "transparent",
                border: "none",
                borderRadius: 9,
                padding: "8px 12px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: opt === value ? 700 : 500,
                color: opt === value ? C.indigo : C.navy,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section card 3-dot menu ───────────────────────────────────────────────────
function CardMenu({ onEdit, onArchive }: { onEdit: () => void; onArchive: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "transparent",
          border: "none",
          borderRadius: 8,
          padding: "4px 6px",
          cursor: "pointer",
          color: C.muted,
          display: "flex",
          alignItems: "center",
        }}
      >
        <MoreVertical size={16} strokeWidth={2} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            zIndex: 50,
            overflow: "hidden",
            padding: "5px",
            minWidth: 140,
          }}
        >
          {[
            { icon: <Pencil size={13} />, label: "Edit Section", action: onEdit, color: C.navy },
            { icon: <Archive size={13} />, label: "Archive", action: onArchive, color: "#E05030" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => { item.action(); setOpen(false); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "none",
                borderRadius: 8,
                padding: "8px 12px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: item.color,
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ section, onEdit }: { section: Section; onEdit: () => void }) {
  const fillPct = Math.round((section.studentCount / section.capacity) * 100);
  const fillColor = fillPct >= 90 ? C.red : fillPct >= 70 ? C.coral : C.indigo;

  return (
    <div
      style={{
        background: section.status === "archived" ? "#F5F5F8" : C.white,
        borderRadius: 20,
        border: `1.5px solid ${section.status === "archived" ? "rgba(0,0,0,0.06)" : C.border}`,
        boxShadow: section.status === "archived" ? "none" : "0 2px 16px rgba(0,0,0,0.05)",
        padding: "22px 22px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: section.status === "archived" ? 0.65 : 1,
        transition: "box-shadow 0.15s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Archived ribbon */}
      {section.status === "archived" && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: -22,
            background: C.muted,
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
            fontFamily: "Manrope, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "3px 28px",
            transform: "rotate(35deg)",
          }}
        >
          Archived
        </div>
      )}

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <SubjectBadge subject={section.subject} />
          <h3
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 17,
              fontWeight: 800,
              color: C.navy,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {section.name}
          </h3>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600, color: C.muted }}>
            {section.code}
          </span>
        </div>
        <CardMenu onEdit={onEdit} onArchive={() => {}} />
      </div>

      {/* Meta rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          { icon: <GraduationCap size={13} color={C.muted} strokeWidth={2} />, text: section.professor },
          { icon: <Clock size={13} color={C.muted} strokeWidth={2} />, text: section.schedule },
          { icon: <Layers size={13} color={C.muted} strokeWidth={2} />, text: section.room },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {row.icon}
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: C.muted }}>
              {row.text}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: C.border }} />

      {/* Students + fill */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* avatar stack */}
            <div style={{ display: "flex" }}>
              {Array.from({ length: Math.min(section.studentCount, 4) }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: avatarColor(section.id + i),
                    border: "2px solid #fff",
                    marginLeft: i === 0 ? 0 : -7,
                    zIndex: 4 - i,
                    position: "relative",
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>
              {section.studentCount}
              <span style={{ fontWeight: 500, color: C.muted }}> / {section.capacity}</span>
            </span>
          </div>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: fillColor,
            }}
          >
            {fillPct}%
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 50, background: C.inputBg }}>
          <div
            style={{
              height: "100%",
              width: `${fillPct}%`,
              borderRadius: 50,
              background: fillColor,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Semester tag */}
      <div
        style={{
          background: C.offWhite,
          borderRadius: 8,
          padding: "5px 10px",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          alignSelf: "flex-start",
        }}
      >
        <BookOpen size={11} color={C.muted} strokeWidth={2} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted }}>
          {section.semester}
        </span>
      </div>
    </div>
  );
}

// ─── Join Requests Panel ───────────────────────────────────────────────────────
function JoinRequestsPanel({ onClose }: { onClose: () => void }) {
  const [requests, setRequests] = useState(JOIN_REQUESTS);

  function approve(id: number) {
    setRequests((r) => r.filter((x) => x.id !== id));
  }
  function reject(id: number) {
    setRequests((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "72px 24px 24px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(27,30,43,0.35)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative",
          width: 420,
          maxHeight: "calc(100vh - 96px)",
          background: C.white,
          borderRadius: 24,
          boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px 16px",
            borderBottom: `1.5px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: C.navy,
                margin: 0,
              }}
            >
              Join Requests
            </h3>
            {requests.length > 0 && (
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: C.muted, margin: "2px 0 0", fontWeight: 500 }}>
                {requests.length} pending approval
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: C.inputBg,
              border: "none",
              borderRadius: 10,
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              color: C.muted,
            }}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          {requests.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                padding: "48px 24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: C.greenLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={26} color={C.green} strokeWidth={2} />
              </div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.navy, margin: 0 }}>
                All caught up!
              </p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>
                No pending join requests.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {requests.map((req) => {
                const col = SUBJECT_COLORS[req.subject] ?? { bg: C.indigoLight, text: C.indigo, dot: C.indigo };
                return (
                  <div
                    key={req.id}
                    style={{
                      background: C.offWhite,
                      borderRadius: 16,
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      border: `1.5px solid ${C.border}`,
                    }}
                  >
                    {/* Student row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: col.text,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 13,
                          fontWeight: 800,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {req.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.3 }}>
                          {req.studentName}
                        </p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted, margin: 0 }}>
                          ID: {req.studentId} · {req.requestedAt}
                        </p>
                      </div>
                    </div>

                    {/* Section info */}
                    <div
                      style={{
                        background: C.white,
                        borderRadius: 10,
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy, margin: 0 }}>
                          {req.section}
                        </p>
                        <SubjectBadge subject={req.subject} />
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => approve(req.id)}
                        style={{
                          flex: 1,
                          background: C.greenLight,
                          border: `1.5px solid rgba(46,212,122,0.25)`,
                          borderRadius: 10,
                          padding: "8px 12px",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#18A058",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => reject(req.id)}
                        style={{
                          flex: 1,
                          background: C.redLight,
                          border: `1.5px solid rgba(255,71,87,0.2)`,
                          borderRadius: 10,
                          padding: "8px 12px",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.red,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <XCircle size={14} strokeWidth={2.5} />
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {requests.length > 0 && (
          <div style={{ padding: "14px 16px", borderTop: `1.5px solid ${C.border}` }}>
            <button
              type="button"
              onClick={() => setRequests([])}
              style={{
                width: "100%",
                background: C.greenLight,
                border: "none",
                borderRadius: 12,
                padding: "10px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#18A058",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <CheckCircle2 size={14} strokeWidth={2.5} />
              Approve All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add/Edit Class Modal ──────────────────────────────────────────────────────
function AddClassModal({ onClose, editing }: { onClose: () => void; editing?: Section }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [subject, setSubject] = useState(editing?.subject ?? "Computer Science");
  const [code, setCode] = useState(editing?.code ?? "");
  const [schedule, setSchedule] = useState(editing?.schedule ?? "");
  const [room, setRoom] = useState(editing?.room ?? "");
  const [capacity, setCapacity] = useState(String(editing?.capacity ?? 40));
  const [semester, setSemester] = useState(editing?.semester ?? "1st Sem 2025–2026");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(27,30,43,0.4)", backdropFilter: "blur(3px)" }}
      />
      <div
        style={{
          position: "relative",
          background: C.white,
          borderRadius: 24,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.indigo}, #4228D4)`,
            padding: "24px 28px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
              {editing ? "Edit Section" : "Add New Class"}
            </h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>
              {editing ? "Update section details below." : "Fill in the details to create a new section."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "#fff" }}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Section Name", val: name, set: setName, placeholder: "e.g. BSCS 3-A" },
            { label: "Course Code", val: code, set: setCode, placeholder: "e.g. CS301" },
            { label: "Schedule", val: schedule, set: setSchedule, placeholder: "e.g. MWF 7:30–9:00 AM" },
            { label: "Room", val: room, set: setRoom, placeholder: "e.g. Lab 201" },
            { label: "Capacity", val: capacity, set: setCapacity, placeholder: "40" },
          ].map((f) => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.navy }}>
                {f.label}
              </label>
              <input
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                style={{
                  background: C.inputBg,
                  border: "2px solid transparent",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.navy,
                  outline: "none",
                }}
              />
            </div>
          ))}

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.navy }}>Subject</label>
              <Dropdown value={subject} options={SUBJECTS.slice(1)} onChange={setSubject} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.navy }}>Semester</label>
              <Dropdown value={semester} options={SEMESTERS.slice(1)} onChange={setSemester} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 28px 24px",
            display: "flex",
            gap: 10,
            borderTop: `1.5px solid ${C.border}`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              background: C.inputBg,
              border: "none",
              borderRadius: 12,
              padding: "11px",
              fontFamily: "Manrope, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: C.muted,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 2,
              background: C.coral,
              border: "none",
              borderRadius: 12,
              padding: "11px",
              fontFamily: "Manrope, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              boxShadow: `0 4px 14px rgba(255,107,74,0.3)`,
            }}
          >
            {editing ? "Save Changes" : "Create Section"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() { return <ProfSidebar />;
  const [active, setActive] = useState("sections");
  const items = [
    { id: "dashboard", icon: <LayoutDashboard size={18} strokeWidth={2} />, label: "Dashboard" },
    { id: "sections",  icon: <Layers size={18} strokeWidth={2} />,          label: "My Sections" },
    { id: "quizzes",   icon: <Library size={18} strokeWidth={2} />,          label: "Question Bank" },
    { id: "analytics", icon: <BarChart2 size={18} strokeWidth={2} />,        label: "Analytics" },
    { id: "settings",  icon: <Settings size={18} strokeWidth={2} />,         label: "Settings" },
  ];

  return (
    <div
      style={{
        width: 220,
        minWidth: 220,
        background: C.sidebarBg,
        display: "flex",
        flexDirection: "column",
        padding: "24px 14px",
        gap: 4,
        height: "100vh",
        position: "sticky",
        top: 0,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", marginBottom: 24 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: C.indigo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Trophy fill={C.yellow} color="transparent" size={18} />
        </div>
        <span style={{ fontFamily: "Fredoka, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
          QuizArena
        </span>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: active === item.id ? "rgba(91,61,246,0.85)" : "transparent",
              border: "none",
              cursor: "pointer",
              color: active === item.id ? "#fff" : "rgba(255,255,255,0.45)",
              fontFamily: "Manrope, sans-serif",
              fontSize: 13,
              fontWeight: active === item.id ? 700 : 500,
              textAlign: "left",
              transition: "background 0.15s, color 0.15s",
              width: "100%",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Profile */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 10px 0",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: C.indigo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Manrope, sans-serif",
            fontSize: 12,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          RD
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Prof. R. Dela Cruz
          </p>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            Professor
          </p>
        </div>
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 0, display: "flex" }}>
          <LogOut size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export function SectionsDashboard() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [semesterFilter, setSemesterFilter] = useState("All Semesters");
  const [showRequests, setShowRequests] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | undefined>();
  const [page, setPage] = useState(1);
  const [pendingCount, setPendingCount] = useState(JOIN_REQUESTS.length);

  const filtered = ALL_SECTIONS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === "All Subjects" || s.subject === subjectFilter;
    const matchSemester = semesterFilter === "All Semesters" || s.semester === semesterFilter;
    return matchSearch && matchSubject && matchSemester;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);

  const activeSections = ALL_SECTIONS.filter((s) => s.status === "active").length;
  const totalStudents = ALL_SECTIONS.reduce((acc, s) => acc + s.studentCount, 0);

  return (
    <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden" }}>
      <Sidebar />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div
          style={{
            background: C.white,
            borderBottom: `1.5px solid ${C.border}`,
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            gap: 16,
          }}
        >
          {/* Left: title + search */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
            <h1
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: C.navy,
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              My Sections
            </h1>
            {/* Search */}
            <div style={{ position: "relative", maxWidth: 260, flex: 1 }}>
              <Search
                size={15}
                color={C.muted}
                strokeWidth={2}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Search sections, subjects…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{
                  width: "100%",
                  background: C.inputBg,
                  border: "2px solid transparent",
                  borderRadius: 12,
                  padding: "8px 14px 8px 34px",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.navy,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Right: filters + bell + add */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Dropdown value={subjectFilter} options={SUBJECTS} onChange={(v) => { setSubjectFilter(v); setPage(1); }} width={150} />
            <Dropdown value={semesterFilter} options={SEMESTERS} onChange={(v) => { setSemesterFilter(v); setPage(1); }} width={170} />

            {/* Bell */}
            <button
              type="button"
              onClick={() => { setShowRequests(true); setPendingCount(0); }}
              style={{
                position: "relative",
                background: pendingCount > 0 ? C.yellowLight : C.inputBg,
                border: `1.5px solid ${pendingCount > 0 ? "rgba(255,201,60,0.4)" : C.border}`,
                borderRadius: 12,
                padding: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: pendingCount > 0 ? "#B8820A" : C.muted,
              }}
            >
              <Bell size={17} strokeWidth={2} />
              {pendingCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: C.yellow,
                    color: C.navy,
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 10,
                    fontWeight: 800,
                    borderRadius: 50,
                    minWidth: 18,
                    height: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 4px",
                    border: "2px solid #fff",
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Add class */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              style={{
                background: C.coral,
                border: "none",
                borderRadius: 12,
                padding: "9px 16px",
                fontFamily: "Manrope, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: `0 3px 12px rgba(255,107,74,0.3)`,
                whiteSpace: "nowrap",
              }}
            >
              <Plus size={15} strokeWidth={2.5} />
              Add Class
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {/* Summary strip */}
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {[
              { label: "Total Sections", value: ALL_SECTIONS.length, icon: <Layers size={16} color={C.indigo} strokeWidth={2} />, bg: C.indigoLight, color: C.indigo },
              { label: "Active",          value: activeSections,      icon: <CheckCircle2 size={16} color={C.green} strokeWidth={2} />, bg: C.greenLight, color: "#18A058" },
              { label: "Total Students",  value: totalStudents,       icon: <Users size={16} color={C.coral} strokeWidth={2} />, bg: C.coralLight, color: C.coral },
              { label: "Join Requests",   value: JOIN_REQUESTS.length,icon: <Bell size={16} color="#B8820A" strokeWidth={2} />, bg: C.yellowLight, color: "#B8820A" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  background: C.white,
                  borderRadius: 16,
                  padding: "14px 18px",
                  border: `1.5px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 800, color: C.navy, margin: 0, lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted, margin: "3px 0 0" }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Results count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, margin: 0 }}>
              Showing <strong style={{ color: C.navy }}>{filtered.length}</strong> section{filtered.length !== 1 ? "s" : ""}
              {(subjectFilter !== "All Subjects" || semesterFilter !== "All Semesters" || search) && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setSubjectFilter("All Subjects"); setSemesterFilter("All Semesters"); setPage(1); }}
                  style={{
                    background: "none",
                    border: "none",
                    color: C.indigo,
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    marginLeft: 8,
                    padding: 0,
                  }}
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>

          {/* Card grid */}
          {paginated.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                padding: "80px 24px",
                textAlign: "center",
              }}
            >
              <BookOpen size={40} color={C.muted} strokeWidth={1.5} />
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: C.navy, margin: 0 }}>
                No sections found
              </p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              {paginated.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onEdit={() => setEditingSection(section)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 28,
                padding: "16px 20px",
                background: C.white,
                borderRadius: 16,
                border: `1.5px solid ${C.border}`,
              }}
            >
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, margin: 0 }}>
                Page <strong style={{ color: C.navy }}>{safeCurrentPage}</strong> of <strong style={{ color: C.navy }}>{totalPages}</strong>
              </p>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  style={{
                    background: safeCurrentPage === 1 ? C.inputBg : C.white,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "7px 10px",
                    cursor: safeCurrentPage === 1 ? "default" : "pointer",
                    color: safeCurrentPage === 1 ? C.muted : C.navy,
                    display: "flex",
                    alignItems: "center",
                    opacity: safeCurrentPage === 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={15} strokeWidth={2.5} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: p === safeCurrentPage ? C.indigo : C.white,
                      border: `1.5px solid ${p === safeCurrentPage ? C.indigo : C.border}`,
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: p === safeCurrentPage ? "#fff" : C.navy,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  style={{
                    background: safeCurrentPage === totalPages ? C.inputBg : C.white,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "7px 10px",
                    cursor: safeCurrentPage === totalPages ? "default" : "pointer",
                    color: safeCurrentPage === totalPages ? C.muted : C.navy,
                    display: "flex",
                    alignItems: "center",
                    opacity: safeCurrentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlays */}
      {showRequests && <JoinRequestsPanel onClose={() => setShowRequests(false)} />}
      {(showAddModal || editingSection) && (
        <AddClassModal
          onClose={() => { setShowAddModal(false); setEditingSection(undefined); }}
          editing={editingSection}
        />
      )}
    </div>
  );
}
