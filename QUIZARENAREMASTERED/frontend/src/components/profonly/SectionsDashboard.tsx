'use client';

import { useState, useRef, useEffect } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Search,
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
  Copy,
  Trash2,
} from "lucide-react";
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import { toast } from "sonner";

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

const SUBJECTS = ["All Subjects", "Mathematics", "Physics", "Computer Science", "History", "Biology"];
const SEMESTERS = ["All Semesters", "1st Sem 2025–2026", "2nd Sem 2025–2026", "Summer 2026"];

const SUBJECT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Mathematics:      { bg: "rgba(91,61,246,0.1)",   text: "#5B3DF6", dot: "#5B3DF6" },
  Physics:          { bg: "rgba(255,107,74,0.1)",  text: "#E05030", dot: "#FF6B4A" },
  "Computer Science":{ bg: "rgba(46,212,122,0.12)", text: "#18A058", dot: "#2ED47A" },
  History:          { bg: "rgba(255,201,60,0.15)", text: "#B8820A", dot: "#FFC93C" },
  Biology:          { bg: "rgba(91,200,246,0.15)", text: "#0A7EA8", dot: "#5BC8F6" },
};

export interface Student {
  user_id: string;
  username: string;
}

export interface Section {
  id: string;
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
  join_code: string;
  students: Student[];
}

const AVATAR_COLORS = ["#5B3DF6","#FF6B4A","#FFC93C","#2ED47A","#FF4757","#5BC8F6","#B06EF6","#FF9F40"];
const PAGE_SIZE = 6;

function avatarColor(i: number) { return AVATAR_COLORS[i % AVATAR_COLORS.length]; }

function SubjectBadge({ subject }: { subject: string }) {
  const col = SUBJECT_COLORS[subject] ?? { bg: C.indigoLight, text: C.indigo, dot: C.indigo };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: col.bg, color: col.text, borderRadius: 8, padding: "3px 9px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
      {subject}
    </span>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange, width }: { value: string; options: string[]; onChange: (v: string) => void; width?: number }) {
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
      <button type="button" onClick={() => setOpen((v) => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: C.white, border: `1.5px solid ${open ? C.indigo : C.border}`, borderRadius: 12, padding: "9px 14px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: value.startsWith("All") ? C.muted : C.navy, cursor: "pointer", transition: "border-color 0.15s", whiteSpace: "nowrap" }}>
        {value}
        <ChevronDown size={14} color={C.muted} style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, width: "100%", minWidth: 180, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden", padding: "6px" }}>
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }} style={{ width: "100%", background: opt === value ? C.indigoLight : "transparent", border: "none", borderRadius: 9, padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: opt === value ? 700 : 500, color: opt === value ? C.indigo : C.navy, cursor: "pointer", textAlign: "left" }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Card Menu ─────────────────────────────────────────────────────────────────
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
      <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} style={{ background: "transparent", border: "none", borderRadius: 8, padding: "4px 6px", cursor: "pointer", color: C.muted, display: "flex", alignItems: "center" }}>
        <MoreVertical size={16} strokeWidth={2} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden", padding: "5px", minWidth: 140 }}>
          <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(); setOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", borderRadius: 8, padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.navy, cursor: "pointer" }}>
            <Pencil size={13} /> Edit Section
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onArchive(); setOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", borderRadius: 8, padding: "8px 12px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: "#E05030", cursor: "pointer" }}>
            <Archive size={13} /> Archive
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ section, onEdit, onClick }: { section: Section; onEdit: () => void; onClick: () => void }) {
  const fillPct = Math.min(100, Math.round((section.studentCount / section.capacity) * 100));
  const fillColor = fillPct >= 90 ? C.red : fillPct >= 70 ? C.coral : C.indigo;

  const copyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(section.join_code);
    toast.success(`Join code ${section.join_code} copied!`);
  };

  return (
    <div onClick={onClick} style={{ background: section.status === "archived" ? "#F5F5F8" : C.white, borderRadius: 20, border: `1.5px solid ${section.status === "archived" ? "rgba(0,0,0,0.06)" : C.border}`, boxShadow: section.status === "archived" ? "none" : "0 2px 16px rgba(0,0,0,0.05)", padding: "22px 22px 18px", display: "flex", flexDirection: "column", gap: 14, opacity: section.status === "archived" ? 0.65 : 1, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", position: "relative", overflow: "hidden" }}>
      {section.status === "archived" && (
        <div style={{ position: "absolute", top: 14, right: -22, background: C.muted, color: "#fff", fontSize: 9, fontWeight: 800, fontFamily: "Manrope, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 28px", transform: "rotate(35deg)" }}>
          Archived
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <SubjectBadge subject={section.subject} />
          <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 800, color: C.navy, margin: 0, lineHeight: 1.2 }}>{section.name}</h3>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600, color: C.muted }}>{section.code}</span>
        </div>
        <CardMenu onEdit={onEdit} onArchive={() => {}} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <GraduationCap size={13} color={C.muted} strokeWidth={2} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: C.muted }}>{section.professor}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Clock size={13} color={C.muted} strokeWidth={2} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: C.muted }}>{section.schedule}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Layers size={13} color={C.muted} strokeWidth={2} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: C.muted }}>{section.room}</span>
        </div>
      </div>

      {/* Copy Join Code Bar */}
      <div onClick={copyCode} style={{ background: C.inputBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: C.navy }}>{section.join_code}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.indigo }}>
          <Copy size={12} /> Copy Code
        </span>
      </div>

      <div style={{ height: 1, background: C.border }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex" }}>
              {Array.from({ length: Math.min(section.studentCount, 4) }).map((_, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: avatarColor(i), border: "2px solid #fff", marginLeft: i === 0 ? 0 : -7, zIndex: 4 - i, position: "relative" }} />
              ))}
            </div>
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.navy }}>
              {section.studentCount} <span style={{ fontWeight: 500, color: C.muted }}>/ {section.capacity}</span>
            </span>
          </div>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: fillColor }}>{fillPct}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 50, background: C.inputBg }}>
          <div style={{ height: "100%", width: `${fillPct}%`, borderRadius: 50, background: fillColor, transition: "width 0.3s" }} />
        </div>
      </div>

      <div style={{ background: C.offWhite, borderRadius: 8, padding: "5px 10px", display: "inline-flex", alignItems: "center", gap: 5, alignSelf: "flex-start" }}>
        <BookOpen size={11} color={C.muted} strokeWidth={2} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted }}>{section.semester}</span>
      </div>
    </div>
  );
}

// ─── Manage Students Roster Modal ─────────────────────────────────────────────
function StudentRosterModal({ section, onClose, onRemoveStudent }: { section: Section; onClose: () => void; onRemoveStudent: (studentId: string) => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(27,30,43,0.4)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", background: C.white, borderRadius: 24, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.18)", overflow: "hidden" }}>
        <div style={{ background: C.navy, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>{section.name} Roster</h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>{section.students.length} Enrolled Students</p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 7, cursor: "pointer", color: "#fff" }}>
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div style={{ padding: "20px 24px", maxHeight: "50vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {section.students.length === 0 ? (
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, textAlign: "center", padding: "20px 0" }}>No students enrolled in this section yet.</p>
          ) : (
            section.students.map((student, idx) => (
              <div key={student.user_id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: C.offWhite, borderRadius: 12, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: avatarColor(idx), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 12 }}>
                    {student.username ? student.username.substring(0, 2).toUpperCase() : 'S'}
                  </div>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.navy }}>{student.username}</span>
                </div>
                <button type="button" onClick={() => onRemoveStudent(student.user_id)} style={{ background: C.redLight, border: "none", borderRadius: 8, padding: "6px 12px", color: C.red, fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit Class Modal ──────────────────────────────────────────────────────
function AddClassModal({ onClose, editing, onSave }: { onClose: () => void; editing?: Section; onSave: (data: Partial<Section>) => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [subject, setSubject] = useState(editing?.subject ?? "Computer Science");
  const [code, setCode] = useState(editing?.code ?? "CS101");
  const [schedule, setSchedule] = useState(editing?.schedule ?? "MWF 9:00-10:30 AM");
  const [room, setRoom] = useState(editing?.room ?? "Lab 1");
  const [capacity, setCapacity] = useState(String(editing?.capacity ?? 40));
  const [semester, setSemester] = useState(editing?.semester ?? "1st Sem 2025–2026");

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Please provide a section name.");
    onSave({
      name,
      subject,
      code,
      schedule,
      room,
      capacity: parseInt(capacity, 10) || 40,
      semester,
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(27,30,43,0.4)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", background: C.white, borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.18)", overflow: "hidden" }}>
        <div style={{ background: `linear-gradient(135deg, ${C.indigo}, #4228D4)`, padding: "24px 28px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
              {editing ? "Edit Section" : "Add New Class"}
            </h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>
              {editing ? "Update section details below." : "Fill in the details to create a new section."}
            </p>
          </div>
          <button type="button" onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "#fff" }}>
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Section Name", val: name, set: setName, placeholder: "e.g. BSCS 3-A" },
            { label: "Course Code", val: code, set: setCode, placeholder: "e.g. CS301" },
            { label: "Schedule", val: schedule, set: setSchedule, placeholder: "e.g. MWF 7:30–9:00 AM" },
            { label: "Room", val: room, set: setRoom, placeholder: "e.g. Lab 201" },
            { label: "Capacity", val: capacity, set: setCapacity, placeholder: "40" },
          ].map((f) => (
            <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.navy }}>{f.label}</label>
              <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder} style={{ background: C.inputBg, border: "2px solid transparent", borderRadius: 12, padding: "10px 14px", fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 500, color: C.navy, outline: "none" }} />
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

        <div style={{ padding: "16px 28px 24px", display: "flex", gap: 10, borderTop: `1.5px solid ${C.border}` }}>
          <button type="button" onClick={onClose} style={{ flex: 1, background: C.inputBg, border: "none", borderRadius: 12, padding: "11px", fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.muted, cursor: "pointer" }}>Cancel</button>
          <button type="button" onClick={handleSubmit} style={{ flex: 2, background: C.coral, border: "none", borderRadius: 12, padding: "11px", fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: `0 4px 14px rgba(255,107,74,0.3)` }}>
            {editing ? "Save Changes" : "Create Section"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export function SectionsDashboard({ professorId }: { professorId?: string }) {
  const supabase = createBrowserSupabaseClient();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [profName, setProfName] = useState<string>("Prof. User");

  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [semesterFilter, setSemesterFilter] = useState("All Semesters");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | undefined>();
  const [selectedSection, setSelectedSection] = useState<Section | undefined>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSectionsAndProfile();
  }, [professorId]);

  const fetchSectionsAndProfile = async () => {
    setLoading(true);

    // 1. Get authenticated user ID if professorId is not provided
    let currentProfId = professorId;
    if (!currentProfId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) currentProfId = user.id;
    }

    // 2. Fetch professor's real profile name dynamically from the profiles table
    if (currentProfId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', currentProfId)
        .single();
      
      if (profileData && profileData.username) {
        setProfName(profileData.username);
      }
    }

    // 3. Fetch sections for this professor
    let query = supabase.from('sections').select(`
      id, name, join_code, created_at, professor_id,
      section_students (
        profiles:student_id (user_id, username)
      )
    `);

    if (currentProfId) {
      query = query.eq('professor_id', currentProfId);
    }

    const { data, error } = await query;

    if (!error && data) {
      const formatted: Section[] = data.map((sec: any) => {
        const studentsList = sec.section_students ? sec.section_students.map((ss: any) => ss.profiles) : [];
        return {
          id: sec.id,
          name: sec.name,
          subject: "Computer Science",
          code: "CS101",
          semester: "1st Sem 2025–2026",
          professor: profName,
          studentCount: studentsList.length,
          capacity: 40,
          status: "active",
          schedule: "MWF 9:00–10:30 AM",
          room: "Lab 201",
          join_code: sec.join_code,
          students: studentsList,
        };
      });
      setSections(formatted);
    }
    setLoading(false);
  };

  const handleSaveSection = async (formData: Partial<Section>) => {
    const { data: { user } } = await supabase.auth.getUser();
    const profId = professorId || user?.id;

    if (editingSection) {
      const { error } = await supabase
        .from('sections')
        .update({ name: formData.name })
        .eq('id', editingSection.id);

      if (error) toast.error("Failed to update section.");
      else toast.success("Section updated!");
    } else {
      const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const { error } = await supabase
        .from('sections')
        .insert([{
          name: formData.name,
          join_code: joinCode,
          professor_id: profId
        }]);

      if (error) toast.error("Failed to create class section.");
      else toast.success("New class created successfully!");
    }

    setShowAddModal(false);
    setEditingSection(undefined);
    fetchSectionsAndProfile();
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!selectedSection) return;

    const { error } = await supabase
      .from('section_students')
      .delete()
      .match({ section_id: selectedSection.id, student_id: studentId });

    if (error) {
      toast.error("Failed to remove student.");
    } else {
      toast.success("Student removed!");
      setSelectedSection((prev) => prev ? {
        ...prev,
        studentCount: prev.studentCount - 1,
        students: prev.students.filter(s => s.user_id !== studentId)
      } : undefined);
      fetchSectionsAndProfile();
    }
  };

  const filtered = sections.filter((s) => {
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

  const activeSections = sections.filter((s) => s.status === "active").length;
  const totalStudents = sections.reduce((acc, s) => acc + s.studentCount, 0);

  return (
    <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden" }}>
      <ProfSidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
            <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 800, color: C.navy, margin: 0, whiteSpace: "nowrap" }}>My Sections</h1>
            <div style={{ position: "relative", maxWidth: 260, flex: 1 }}>
              <Search size={15} color={C.muted} strokeWidth={2} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input type="text" placeholder="Search sections, subjects…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ width: "100%", background: C.inputBg, border: "2px solid transparent", borderRadius: 12, padding: "8px 14px 8px 34px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500, color: C.navy, outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Dropdown value={subjectFilter} options={SUBJECTS} onChange={(v) => { setSubjectFilter(v); setPage(1); }} width={150} />
            <Dropdown value={semesterFilter} options={SEMESTERS} onChange={(v) => { setSemesterFilter(v); setPage(1); }} width={170} />

            <button type="button" onClick={() => setShowAddModal(true)} style={{ background: C.coral, border: "none", borderRadius: 12, padding: "9px 16px", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: `0 3px 12px rgba(255,107,74,0.3)`, whiteSpace: "nowrap" }}>
              <Plus size={15} strokeWidth={2.5} /> Add Class
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {[
              { label: "Total Sections", value: sections.length, icon: <Layers size={16} color={C.indigo} strokeWidth={2} />, bg: C.indigoLight },
              { label: "Active",          value: activeSections,   icon: <CheckCircle2 size={16} color={C.green} strokeWidth={2} />, bg: C.greenLight },
              { label: "Total Students",  value: totalStudents,    icon: <Users size={16} color={C.coral} strokeWidth={2} />, bg: C.coralLight },
            ].map((stat) => (
              <div key={stat.label} style={{ flex: 1, background: C.white, borderRadius: 16, padding: "14px 18px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 800, color: C.navy, margin: 0, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted, margin: "3px 0 0" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, margin: 0 }}>
              Showing <strong style={{ color: C.navy }}>{filtered.length}</strong> section{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {paginated.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "80px 24px", textAlign: "center" }}>
              <BookOpen size={40} color={C.muted} strokeWidth={1.5} />
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 700, color: C.navy, margin: 0 }}>No sections found in database</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {paginated.map((section) => (
                <SectionCard key={section.id} section={{ ...section, professor: profName }} onClick={() => setSelectedSection(section)} onEdit={() => setEditingSection(section)} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, padding: "16px 20px", background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}` }}>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.muted, margin: 0 }}>
                Page <strong style={{ color: C.navy }}>{safeCurrentPage}</strong> of <strong style={{ color: C.navy }}>{totalPages}</strong>
              </p>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safeCurrentPage === 1} style={{ background: safeCurrentPage === 1 ? C.inputBg : C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 10px", cursor: safeCurrentPage === 1 ? "default" : "pointer", color: safeCurrentPage === 1 ? C.muted : C.navy }}>
                  <ChevronLeft size={15} strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safeCurrentPage === totalPages} style={{ background: safeCurrentPage === totalPages ? C.inputBg : C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 10px", cursor: safeCurrentPage === totalPages ? "default" : "pointer", color: safeCurrentPage === totalPages ? C.muted : C.navy }}>
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedSection && (
        <StudentRosterModal section={selectedSection} onClose={() => setSelectedSection(undefined)} onRemoveStudent={handleRemoveStudent} />
      )}

      {(showAddModal || editingSection) && (
        <AddClassModal onClose={() => { setShowAddModal(false); setEditingSection(undefined); }} editing={editingSection} onSave={handleSaveSection} />
      )}
    </div>
  );
}

export default SectionsDashboard;