"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { ProfSidebar } from "../shared/ProfSidebar";

import { CheckSquare } from "lucide-react"; 
import {
  Upload, X, FileText, CheckCircle2, Clock, Loader2,
  ChevronDown, ChevronUp, BookOpen, Sparkles, RefreshCw,
  Pencil, Check, XCircle, Flag, Trophy, LayoutDashboard,
  Library, BarChart2, Settings, Layers, LogOut,
  AlertTriangle, Zap, CircleDot, AlignLeft, Hash, Circle, Plus,
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
export type QuestionStatus = "pending" | "approved" | "rejected";
export type Confidence = "strong" | "medium" | "weak";

export interface SyllabusDoc {
  id: number;
  filename: string;
  chunks?: any;
  createdAt?: string;
  uploadDate?: string;
  size?: string;
  status?: DocStatus;
  pages?: number;
  subject?: string;
}
export interface Choice {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface Citation {
  docId: number;
  docName: string;
  topic: string;
  section: string;
  pageRange: string;
  paragraph?: string;
  confidence: Confidence;
  excerpt: string;
}
export interface GeneratedQuestion {
  id: number;
  docId: number; 
  text: string;
  type: string;
  choices?: Choice[];
  answer: string;
  difficulty: string;
  topic: string;
  status: QuestionStatus; 
  citation: Citation;
  flagged?: boolean;
  flagReason?: string;
  bloomLevel?: string;
  estimated_difficulty?: number;
  reject_reason?: string;
  rejected_by?: string;
  reject_note?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const DIFF_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Easy:   { bg: C.greenLight,  text: "#18A058", border: C.greenBorder },
  Medium: { bg: C.yellowLight, text: "#9A6C00", border: C.yellowBorder },
  Hard:   { bg: C.coralLight,  text: "#C8441E", border: "rgba(255,107,74,0.25)" },
};

const BLOOM_STYLE: Record<string, { bg: string; text: string }> = {
  REMEMBER:    { bg: "rgba(46,212,122,0.08)",  text: "#18A058" },
  UNDERSTAND:  { bg: "rgba(46,212,122,0.12)",  text: "#15803d" },
  APPLY:       { bg: "rgba(255,201,60,0.12)",  text: "#9A6C00" },
  ANALYZE:     { bg: "rgba(255,165,0,0.12)",   text: "#c2410c" },
  EVALUATE:    { bg: "rgba(255,107,74,0.12)",  text: "#C8441E" },
  CREATE:      { bg: "rgba(91,61,246,0.1)",    text: "#5B3DF6" },
};

const REJECT_REASONS = [
  { value: "hallucinated", label: "Hallucinated — not in source" },
  { value: "wrong_answer", label: "Wrong answer" },
  { value: "ambiguous", label: "Ambiguous — multiple valid answers" },
  { value: "duplicate", label: "Duplicate question" },
  { value: "off_topic", label: "Off-topic — not from evidence" },
  { value: "poorly_worded", label: "Poorly worded" },
  { value: "structurally_broken", label: "Structurally broken" },
  { value: "other", label: "Other (specify in note)" },
];

function getDiffStyle(difficulty: string): { bg: string; text: string; border: string; label: string } {
  // Try parsing as numeric first (new format: 0.00-1.00)
  const num = parseFloat(difficulty);
  if (!isNaN(num) && num >= 0 && num <= 1) {
    if (num < 0.33) return { ...DIFF_STYLE.Easy, label: `${(num * 100).toFixed(0)}% Easy` };
    if (num <= 0.66) return { ...DIFF_STYLE.Medium, label: `${(num * 100).toFixed(0)}% Medium` };
    return { ...DIFF_STYLE.Hard, label: `${(num * 100).toFixed(0)}% Hard` };
  }
  // Fallback to string matching (backward compat)
  const style = DIFF_STYLE[difficulty] || DIFF_STYLE.Medium;
  return { ...style, label: difficulty };
}

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
  "Checkbox":        <CheckSquare size={10} strokeWidth={2.5} />,
  "True / False":    <CircleDot size={10} strokeWidth={2.5} />,
  "Identification":  <Hash size={10} strokeWidth={2.5} />,
  "Short Answer":    <AlignLeft size={10} strokeWidth={2.5} />,
  "Coding":          <Layers size={10} strokeWidth={2.5} />,
  "Mathematics":     <Hash size={10} strokeWidth={2.5} />,
};

function Sidebar() { 
  return <ProfSidebar />; 
}

// ─── Citation Panel ────────────────────────────────────────────────────────────
function CitationPanel({ citation, flagged, flagReason, onFlag }:
  { citation: Citation; flagged: boolean; flagReason?: string; onFlag: (reason: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const isStrong = citation?.confidence === "strong";

  return (
    <div style={{ background: C.citationBg, border: `1.5px solid ${flagged ? "rgba(255,71,87,0.22)" : C.citationBorder}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "11px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: C.indigoMid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
          <FileText size={15} color={C.indigo} strokeWidth={2} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800, color: C.indigo, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Source Citation
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: isStrong ? C.greenLight : C.yellowLight, color: isStrong ? "#18A058" : "#9A6C00", border: `1.5px solid ${isStrong ? C.greenBorder : C.yellowBorder}`, borderRadius: 20, padding: "2px 8px", fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 800 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: isStrong ? "#18A058" : "#9A6C00" }} />
              {isStrong ? "Strong Match" : "Low Confidence"}
            </span>
          </div>

          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {citation?.docName || "Syllabus Document"}
          </p>

          <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.muted }}>
              <BookOpen size={10} strokeWidth={2} />{citation?.topic || "General"}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.indigo }}>
              <Hash size={10} strokeWidth={2} />{citation?.pageRange || "Page 1"} {citation?.paragraph ? `· ${citation.paragraph}` : ""}
            </span>
          </div>
        </div>

        <button type="button" onClick={() => setExpanded(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", gap: 4, padding: "2px 4px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, flexShrink: 0, marginTop: 2 }}>
          {expanded ? <ChevronUp size={13} strokeWidth={2.5} /> : <ChevronDown size={13} strokeWidth={2.5} />}
        </button>
      </div>

      {expanded && (
        <div style={{ padding: "0 14px 12px" }}>
          <div style={{ background: "rgba(255,255,255,0.7)", border: `1.5px solid ${C.indigoBorder}`, borderRadius: 10, padding: "10px 13px" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 500, color: "#3D3D5C", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
              "{citation?.excerpt || "No context provided."}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Question Card ─────────────────────────────────────────────────────────────
function QuestionCard({ q, onStatusChange, onFlag, onEdit }:
  { q: GeneratedQuestion; onStatusChange: (id: number, s: QuestionStatus, reject_reason?: string, reject_note?: string) => void; onFlag: (id: number, reason: string) => void; onEdit: (id: number, data: Partial<GeneratedQuestion>) => void; }) {
  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState({ text: q.text, answer: q.answer, choices: q.choices || [] });

  const statusS = STATUS_STYLE[q.status] || STATUS_STYLE.pending;
  const diffS = getDiffStyle(q.estimated_difficulty?.toString() ?? q.difficulty);
  const labels = ["A", "B", "C", "D", "E", "F"];

  const handleSaveEdit = () => {
    onEdit(q.id, editState);
    setIsEditing(false);
  };

  const updateChoice = (idx: number, text: string) => {
    const newChoices = [...editState.choices];
    newChoices[idx].text = text;
    setEditState({ ...editState, choices: newChoices });
  };

  const toggleCorrectChoice = (idx: number) => {
    const newChoices = [...editState.choices];
    if (q.type !== "Checkbox") {
      newChoices.forEach((c, i) => (c.isCorrect = i === idx));
    } else {
      newChoices[idx].isCorrect = !newChoices[idx].isCorrect;
    }
    setEditState({ ...editState, choices: newChoices });
  };

  const addChoice = () => {
    if (editState.choices.length >= labels.length) return;
    const newLabel = labels[editState.choices.length];
    setEditState({ ...editState, choices: [...editState.choices, { label: newLabel, text: "", isCorrect: false }] });
  };

  const removeChoice = (idx: number) => {
    const newChoices = editState.choices.filter((_, i) => i !== idx).map((c, i) => ({ ...c, label: labels[i] }));
    setEditState({ ...editState, choices: newChoices });
  };

  return (
    <div style={{ background: C.white, borderRadius: 20, border: `1.5px solid ${q.status === "approved" ? C.greenBorder : q.status === "rejected" ? C.redBorder : C.border}`, boxShadow: "0 2px 14px rgba(0,0,0,0.05)", overflow: "hidden", opacity: q.status === "rejected" ? 0.72 : 1, transition: "all 0.18s" }}>
      <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: statusS.bg, color: statusS.text, border: `1.5px solid ${statusS.border}`, borderRadius: 20, padding: "2px 9px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusS.text }} />
              {statusS.label}
            </span>
            <span style={{ background: diffS.bg, color: diffS.text, border: `1.5px solid ${diffS.border}`, borderRadius: 7, padding: "2px 8px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700 }}>
              {diffS.label}
            </span>
            {q.bloomLevel && (() => {
              const bs = BLOOM_STYLE[q.bloomLevel.toUpperCase()] || BLOOM_STYLE.UNDERSTAND;
              return (
                <span style={{ background: bs.bg, color: bs.text, borderRadius: 7, padding: "2px 8px", fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {q.bloomLevel}
                </span>
              );
            })()}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.inputBg, color: C.muted, borderRadius: 7, padding: "2px 8px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600 }}>
              {QTYPE_ICON[q.type] || <Circle size={10} strokeWidth={2.5} />}{q.type}
            </span>
            <span style={{ background: C.indigoLight, color: C.indigo, borderRadius: 7, padding: "2px 8px", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700 }}>
              {q.topic}
            </span>
          </div>
          {isEditing ? (
            <textarea
              value={editState.text}
              onChange={(e) => setEditState({ ...editState, text: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "10px", border: `1px solid ${C.indigoBorder}`, fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 600, color: C.navy, minHeight: "60px", resize: "vertical" }}
            />
          ) : (
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: C.navy, margin: 0, lineHeight: 1.55 }}>
              {q.text}
            </p>
          )}
        </div>
        {!isEditing && (
          <button type="button" onClick={() => setExpanded(v => !v)} style={{ background: C.inputBg, border: "none", borderRadius: 9, padding: 7, cursor: "pointer", color: C.muted, display: "flex", flexShrink: 0 }}>
            {expanded ? <ChevronUp size={14} strokeWidth={2.5} /> : <ChevronDown size={14} strokeWidth={2.5} />}
          </button>
        )}
      </div>

      {(expanded || isEditing) && (
        <>
          {(q.choices && q.choices.length > 0) || isEditing ? (
            <div style={{ padding: "0 18px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
              {editState.choices.map((ch, idx) => (
                <div 
                  key={idx} 
                  style={{ display: "flex", alignItems: "center", gap: 10, background: isEditing ? C.offWhite : ch.isCorrect ? C.greenLight : C.offWhite, border: `1.5px solid ${isEditing ? C.border : ch.isCorrect ? C.greenBorder : C.border}`, borderRadius: 11, padding: "8px 12px" }}
                >
                  {isEditing ? (
                    <input 
                      type={q.type === "Checkbox" ? "checkbox" : "radio"} 
                      checked={ch.isCorrect} 
                      onChange={() => toggleCorrectChoice(idx)}
                      style={{ cursor: "pointer", width: 16, height: 16 }}
                    />
                  ) : (
                    q.type === "Checkbox" ? (
                      <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${ch.isCorrect ? "#18A058" : C.muted}`, background: ch.isCorrect ? "#18A058" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {ch.isCorrect && <Check size={12} color="#fff" strokeWidth={3} />}
                      </div>
                    ) : (
                      <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: ch.isCorrect ? C.green : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 800, color: ch.isCorrect ? "#fff" : C.muted }}>
                        {ch.label}
                      </span>
                    )
                  )}

                  {isEditing ? (
                    <input 
                      type="text" 
                      value={ch.text} 
                      onChange={(e) => updateChoice(idx, e.target.value)} 
                      style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "6px 10px", fontFamily: "Manrope, sans-serif", fontSize: 13, background: "#fff" }}
                    />
                  ) : (
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: ch.isCorrect ? 700 : 500, color: ch.isCorrect ? "#18A058" : C.navy }}>{ch.text}</span>
                  )}
                  
                  {isEditing && (
                    <button type="button" onClick={() => removeChoice(idx)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.red }}><X size={16} /></button>
                  )}
                  {!isEditing && ch.isCorrect && <CheckCircle2 size={14} color="#18A058" style={{ marginLeft: "auto" }} />}
                </div>
              ))}
              
              {isEditing && (editState.choices.length > 0 || q.type === "Multiple Choice" || q.type === "Checkbox") && editState.choices.length < 6 && (
                <button type="button" onClick={addChoice} style={{ background: C.indigoLight, color: C.indigo, border: `1px dashed ${C.indigo}`, borderRadius: "8px", padding: "8px", display: "flex", justifyContent: "center", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700 }}>
                  <Plus size={14} /> Add Choice
                </button>
              )}
            </div>
          ) : null}

          {(!editState.choices || editState.choices.length === 0) && (
            <div style={{ padding: "0 18px 14px" }}>
              <div style={{ background: C.greenLight, border: `1.5px solid ${C.greenBorder}`, borderRadius: 11, padding: "9px 13px" }}>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: "#18A058", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Answer</p>
                {isEditing ? (
                  <textarea 
                    value={editState.answer} 
                    onChange={(e) => setEditState({ ...editState, answer: e.target.value })} 
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: `1px solid ${C.greenBorder}`, fontFamily: "Manrope, sans-serif", fontSize: 13, minHeight: "50px", resize: "vertical" }}
                  />
                ) : (
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: "#18A058", margin: 0, lineHeight: 1.5 }}>{q.answer}</p>
                )}
              </div>
            </div>
          )}

          {!isEditing && (
            <div style={{ padding: "0 18px 14px" }}>
              <CitationPanel citation={q.citation} flagged={q.flagged} flagReason={q.flagReason} onFlag={(reason) => onFlag(q.id, reason)} />
            </div>
          )}
        </>
      )}

      <div style={{ borderTop: `1.5px solid ${C.border}`, padding: "11px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "#FAFAFC" }}>
        {isEditing ? (
          <div style={{ display: "flex", gap: 6, width: "100%", justifyContent: "flex-end" }}>
            <ActionBtn icon={<Check size={13} strokeWidth={2.5} />} label="Save Changes" bg={C.greenLight} color="#18A058" border={C.greenBorder} onClick={handleSaveEdit} />
            <ActionBtn icon={<X size={13} strokeWidth={2.5} />} label="Cancel" bg={C.redLight} color={C.red} border={C.redBorder} onClick={() => { setIsEditing(false); setEditState({ text: q.text, answer: q.answer, choices: q.choices || [] }); }} />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: 6 }}>
              <ActionBtn icon={<Pencil size={13} strokeWidth={2} />} label="Edit" bg={C.yellowLight} color="#9A6C00" onClick={() => setIsEditing(true)} />
            </div>
            {q.status !== "approved" && q.status !== "rejected" ? (
              <div style={{ display: "flex", gap: 6 }}>
                <ActionBtn icon={<Check size={13} strokeWidth={2.5} />} label="Approve" bg={C.greenLight} color="#18A058" border={C.greenBorder} onClick={() => onStatusChange(q.id, "approved")} />
                <RejectButton questionId={q.id} onReject={(id, reason, note) => onStatusChange(id, "rejected", reason, note)} />
              </div>
            ) : (
              <button type="button" onClick={() => onStatusChange(q.id, "pending")} style={{ background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 9, padding: "6px 12px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, cursor: "pointer" }}>Reset to Pending</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function RejectButton({ questionId, onReject }: { questionId: number; onReject: (id: number, reason: string, note: string) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    if (!reason) { toast.error("Please select a reject reason."); return; }
    if (reason === "other" && !note.trim()) { toast.error("Please provide a note for 'Other' reason."); return; }
    onReject(questionId, reason, note);
    setShowModal(false);
    setReason("");
    setNote("");
  };

  return (
    <>
      <ActionBtn icon={<XCircle size={13} strokeWidth={2.5} />} label="Reject" bg={C.redLight} color={C.red} border={C.redBorder} onClick={() => setShowModal(true)} />
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }} onClick={() => setShowModal(false)}>
          <div style={{ background: C.white, borderRadius: 18, padding: "24px", width: 380, maxWidth: "90vw", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, fontWeight: 800, color: C.navy, margin: "0 0 16px" }}>Reject Question</h3>
            <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 6 }}>Reason *</label>
            <select value={reason} onChange={e => setReason(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 14, background: C.offWhite, cursor: "pointer" }}>
              <option value="">Select a reason...</option>
              {REJECT_REASONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 6 }}>Note (optional{reason === "other" ? " — required for 'Other'" : ""})</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Additional context..." style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${C.border}`, fontFamily: "Manrope, sans-serif", fontSize: 13, minHeight: 70, resize: "vertical", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: "8px 16px", borderRadius: 9, border: `1.5px solid ${C.border}`, background: C.offWhite, fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, cursor: "pointer" }}>Cancel</button>
              <button type="button" onClick={handleConfirm} style={{ padding: "8px 16px", borderRadius: 9, border: "none", background: C.red, fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 2px 8px rgba(255,71,87,0.3)" }}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ActionBtn({ icon, label, bg, color, border, onClick }: { icon: React.ReactNode; label: string; bg: string; color: string; border?: string; onClick: () => void; }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: bg, border: `1.5px solid ${border ?? "transparent"}`, borderRadius: 9, padding: "6px 12px", cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color }}>
      {icon}{label}
    </button>
  );
}

// ─── Generate Config Panel ─────────────────────────────────────────────────────
function GeneratePanel({ 
  docs, 
  onGenerate, 
  generating 
}: { 
  docs: SyllabusDoc[]; 
  onGenerate: (config: { count: string; qtypes: string[]; docId: number | "all" }) => void; 
  generating: boolean;
}) {
  const [count, setCount] = useState("5");
  const [selectedQtypes, setSelectedQtypes] = useState<string[]>(["Multiple Choice"]);
  const [selectedDoc, setSelectedDoc] = useState<number | "all">("all");
  
  const readyDocs = docs.filter(d => d.status === "ready");

  const toggleQtype = (type: string) => {
    setSelectedQtypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev; 
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <div style={{ background: C.white, borderRadius: 16, border: `1.5px solid ${C.border}`, padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Sparkles size={15} color={C.indigo} strokeWidth={2} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.navy }}>Generate Settings</span>
      </div>

      {/* Source Document */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Source Document</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <button type="button" onClick={() => setSelectedDoc("all")} style={{ background: selectedDoc === "all" ? C.indigoLight : C.offWhite, border: `1.5px solid ${selectedDoc === "all" ? C.indigo : C.border}`, borderRadius: 10, padding: "7px 12px", cursor: "pointer", textAlign: "left", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: selectedDoc === "all" ? C.indigo : C.muted }}>
            All ready documents ({readyDocs.length})
          </button>
          {readyDocs.map((d, i) => (
            <button key={d.id || `ready-${i}`} type="button" onClick={() => setSelectedDoc(d.id)} style={{ background: selectedDoc === d.id ? C.indigoLight : "transparent", border: `1.5px solid ${selectedDoc === d.id ? C.indigo : C.border}`, borderRadius: 10, padding: "7px 12px", cursor: "pointer", textAlign: "left", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 600, color: selectedDoc === d.id ? C.indigo : C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {d.filename}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Count */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Questions to Generate</label>
        <div style={{ display: "flex", gap: 6 }}>
          {["3", "5", "10", "15"].map(n => (
            <button key={n} type="button" onClick={() => setCount(n)} style={{ flex: 1, background: count === n ? C.indigo : C.offWhite, border: `1.5px solid ${count === n ? C.indigo : C.border}`, borderRadius: 9, padding: "7px 0", fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 700, color: count === n ? "#fff" : C.navy, cursor: "pointer" }}>
              {n}
            </button>
          ))}
        </div>
      </div>

     
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>Question Types</label>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: C.indigo }}>Multi-select</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["Multiple Choice", "Step-by-step Solution", "Numerical Input", "Graphing/Plotting"].map(t => {
            const isSelected = selectedQtypes.includes(t);
            return (
              <button 
                key={t} 
                type="button" 
                onClick={() => toggleQtype(t)} 
                style={{ 
                  background: isSelected ? C.indigoLight : C.offWhite, 
                  border: `1.5px solid ${isSelected ? C.indigo : C.border}`, 
                  borderRadius: 8, 
                  padding: "6px 10px", 
                  fontFamily: "Manrope, sans-serif", 
                  fontSize: 11, 
                  fontWeight: 700, 
                  color: isSelected ? C.indigo : C.muted, 
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                {isSelected && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.indigo }} />}
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => onGenerate({ count, qtypes: selectedQtypes, docId: selectedDoc })}
        disabled={generating || readyDocs.length === 0 || selectedQtypes.length === 0} 
        style={{ 
          width: "100%", 
          background: generating || !readyDocs.length || !selectedQtypes.length ? "rgba(91,61,246,0.4)" : C.indigo, 
          border: "none", 
          borderRadius: 12, 
          padding: "12px", 
          fontFamily: "Manrope, sans-serif", 
          fontSize: 14, 
          fontWeight: 700, 
          color: "#fff", 
          cursor: generating || !readyDocs.length || !selectedQtypes.length ? "default" : "pointer", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          gap: 8, 
          boxShadow: generating ? "none" : "0 4px 14px rgba(91,61,246,0.3)", 
          transition: "all 0.15s" 
        }}
      >
        {generating ? <><Loader2 size={16} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} />Generating…</> : <><Sparkles size={16} strokeWidth={2.5} />Generate Questions</>}
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function AIQuestionGenerator() {
  const [docs, setDocs] = useState<SyllabusDoc[]>([]);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | QuestionStatus>("all");
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch("/api/rag/data");
        if (response.ok) {
          const data = await response.json();
          setDocs(data.docs || []);
          const normalizedQuestions = (data.questions || []).map((q: any) => ({
            ...q,
            status: String(q.status || "pending").toLowerCase() as QuestionStatus
          }));
          setQuestions(normalizedQuestions);
        }
      } catch (error) {
        console.error("Failed to fetch initial database state", error);
      }
    }
    fetchInitialData();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (docs.length >= 5) {
      alert("Document limit reached! You can upload a maximum of 5 syllabus files.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File too large! Please upload a PDF smaller than 10 MB.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setIsUploading(true);

    const tempId = Date.now();
    const tempDoc: SyllabusDoc = {
      id: tempId,
      filename: file.name,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      status: "processing",
      pages: 0,
      subject: "General",
    };
    
    setDocs(d => [tempDoc, ...d]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/rag/upload", { method: "POST", body: formData });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Upload processing failed");
      }
      const savedDoc = await response.json();

      setDocs(d => d.map(x => x.id === tempId ? { ...x, id: savedDoc.id, status: "ready", pages: savedDoc.pages } : x));
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
      setDocs(d => d.filter(x => x.id !== tempId));
    } finally {
      if (fileRef.current) fileRef.current.value = "";
      setIsUploading(false);
    }
  }

  const handleGenerate = async (config: {
    count: string;
    qtypes: string[];
    docId: number | "all";
  }) => {
    if (docs.length === 0) {
      toast.error("Please upload at least one syllabus document first.");
      return;
    }

    setGenerating(true);

    try {
      const activeDocId = config.docId === "all" ? docs[0].id : config.docId;

      const response = await fetch("/api/rag/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          count: parseInt(config.count, 10),
          types: config.qtypes,
          document_id: activeDocId,
          category: "General", 
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok || response.status === 202) {
        const errorMessage = resData?.detail || resData?.error || "Failed to generate questions.";
        if (errorMessage.includes("still reading") || errorMessage.includes("wait a moment") || errorMessage.includes("processing")) {
          // Keep the button spinning and poll again in 5 seconds
          toast.loading("AI is crafting questions... this can take a moment.", { id: "generating" });
          setTimeout(() => {
            handleGenerate(config);
          }, 5000);
          return; // Do NOT set generating to false
        } else {
          toast.error(errorMessage, { id: "generating" });
          setGenerating(false);
          return;
        }
      }
      
      const normalizedData = (Array.isArray(resData) ? resData : resData.questions || []).map((q: any) => ({
        ...q,
        status: String(q.status || "pending").toLowerCase() as QuestionStatus
      }));

      setQuestions((prev) => [...normalizedData, ...prev]);
      toast.success("Questions generated successfully!", { id: "generating" });
      setGenerating(false);
    } catch (error: any) {
      console.error("Error generating questions:", error);
      toast.error(error.message || "Failed to generate questions.", { id: "generating" });
      setGenerating(false);
    }
  };

  const filtered = statusFilter === "all" ? questions : questions.filter(q => q.status === statusFilter);
  const counts = {
    all: questions.length,
    pending: questions.filter(q => q.status === "pending").length,
    approved: questions.filter(q => q.status === "approved").length,
    rejected: questions.filter(q => q.status === "rejected").length,
  };

  const handleDeleteDoc = async (id: number) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    setQuestions(prev => prev.filter(q => q.docId !== id));

    try {
      await fetch(`/api/rag/doc?id=${id}`, { 
        method: "DELETE" 
      });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleStatusChange = async (questionId: number, newStatus: QuestionStatus, reject_reason?: string, reject_note?: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, status: newStatus, reject_reason, reject_note, rejected_by: newStatus === "rejected" ? "human" : undefined } : q))
    );

    try {
      await fetch("/api/rag/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          questionId, 
          status: newStatus.toUpperCase(),
          ...(newStatus === "rejected" && { reject_reason, rejected_by: "human", reject_note })
        }),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleBulkStatusChange = async (targetStatus: QuestionStatus) => {
    const pendingQuestions = questions.filter(q => q.status === "pending");
    if (pendingQuestions.length === 0) return;

    const pendingIds = pendingQuestions.map(q => q.id);

    setQuestions(prev =>
      prev.map(q => (q.status === "pending" ? { ...q, status: targetStatus } : q))
    );

    try {
      await fetch("/api/rag/status/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: pendingIds, status: targetStatus.toUpperCase() }),
      });
    } catch (error) {
      console.error("Failed to execute bulk status change:", error);
    }
  };

  const handleDeleteAllRejected = async () => {
    const rejectedQuestions = questions.filter(q => q.status === "rejected");
    if (rejectedQuestions.length === 0) return;

    setQuestions(prev => prev.filter(q => q.status !== "rejected"));

    try {
      await fetch("/api/rag/status/bulk", {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete rejected questions:", error);
    }
  };

  const handleEditQuestion = async (id: number, data: Partial<GeneratedQuestion>) => {
    setQuestions((prev) => prev.map(q => q.id === id ? { ...q, ...data } : q));
    
    try {
      await fetch("/api/rag/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
      });
    } catch (error) {
      console.error("Failed to update question data:", error);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progressPulse { 0%{width:10%} 50%{width:65%} 100%{width:10%} }
      `}</style>
      <div style={{ display: "flex", height: "100vh", background: C.offWhite, overflow: "hidden" }}>
        <Sidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "0 24px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: C.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={17} color={C.indigo} strokeWidth={2} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: 18, fontWeight: 800, color: C.navy, margin: 0, lineHeight: 1.2 }}>AI Question Generator</h1>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 600, color: C.muted, margin: 0 }}>
                  Powered by your syllabus · every question cites its source
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.greenLight, border: `1.5px solid ${C.greenBorder}`, borderRadius: 20, padding: "5px 12px" }}>
                <CheckCircle2 size={12} color="#18A058" strokeWidth={2.5} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#18A058" }}>
                  {counts.approved} Approved
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: C.yellowLight, border: `1.5px solid ${C.yellowBorder}`, borderRadius: 20, padding: "5px 12px" }}>
                <Clock size={12} color="#9A6C00" strokeWidth={2.5} />
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: "#9A6C00" }}>
                  {counts.pending} Pending
                </span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>
            <div style={{ width: 300, minWidth: 300, borderRight: `1.5px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden", background: "#F5F5FA" }}>
              <div style={{ padding: "18px 16px 14px", borderBottom: `1.5px solid ${C.border}`, background: C.white }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 800, color: C.navy }}>
                    Syllabus Documents
                  </span>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, background: C.inputBg, borderRadius: 20, padding: "2px 8px" }}>
                    {docs.length} files
                  </span>
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={handleUpload} style={{ display: "none" }} />
                <button 
                  type="button" 
                  onClick={() => { if (!isUploading) fileRef.current?.click(); }} 
                  disabled={isUploading}
                  style={{ 
                    width: "100%", 
                    background: isUploading ? "rgba(91,61,246,0.5)" : C.indigo, 
                    border: "none", 
                    borderRadius: 11, 
                    padding: "9px 14px", 
                    fontFamily: "Manrope, sans-serif", 
                    fontSize: 13, 
                    fontWeight: 700, 
                    color: "#fff", 
                    cursor: isUploading ? "default" : "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 7, 
                    boxShadow: isUploading ? "none" : "0 3px 10px rgba(91,61,246,0.25)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {isUploading ? (
                    <><Loader2 size={14} strokeWidth={2.5} style={{ animation: "spin 0.8s linear infinite" }} />Uploading...</>
                  ) : (
                    <><Upload size={14} strokeWidth={2.5} />Upload Syllabus</>
                  )}
                </button>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: C.muted, margin: "7px 0 0", textAlign: "center" }}>
                  Accepts PDF files
                </p>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {docs.map((doc, i) => (
                    <div key={doc.id || `doc-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                        <FileText size={16} color={C.indigo} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: C.navy, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.filename}</span>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => handleDeleteDoc(doc.id)} 
                        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", flexShrink: 0 }}
                      >
                        <X size={14} color={C.muted} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16, background: C.indigoLight, border: `1.5px solid ${C.indigoBorder}`, borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.indigoMid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Zap size={13} color={C.indigo} fill={C.indigo} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 800, color: C.indigo, margin: 0 }}>Transparency Feature</p>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 500, color: C.indigo, margin: "3px 0 0", lineHeight: 1.55, opacity: 0.8 }}>
                        Every AI-generated question is traced to a specific page and section from your uploaded documents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "12px", borderTop: `1.5px solid ${C.border}` }}>
                <GeneratePanel docs={docs} onGenerate={handleGenerate} generating={generating} />
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
              <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
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
                      <button key={f} type="button" onClick={() => setStatusFilter(f)} style={{ background: colors[f].bg, border: `1.5px solid ${statusFilter === f ? "transparent" : C.border}`, borderRadius: 20, padding: "5px 13px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: colors[f].text, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                        {labels[f]}
                        <span style={{ background: "rgba(0,0,0,0.08)", borderRadius: 20, padding: "0px 6px", fontSize: 10 }}>
                          {counts[f]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Unified Bulk Action Buttons Container */}
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => handleBulkStatusChange("approved")}
                    disabled={counts.pending === 0}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: C.greenLight,
                      border: `1.5px solid ${C.greenBorder}`,
                      borderRadius: 9,
                      padding: "6px 12px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#18A058",
                      cursor: counts.pending === 0 ? "default" : "pointer",
                      opacity: counts.pending === 0 ? 0.5 : 1,
                    }}
                  >
                    <CheckCircle2 size={13} strokeWidth={2.5} />
                    Approve All Pending ({counts.pending})
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBulkStatusChange("rejected")}
                    disabled={counts.pending === 0}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: C.redLight,
                      border: `1.5px solid ${C.redBorder}`,
                      borderRadius: 9,
                      padding: "6px 12px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.red,
                      cursor: counts.pending === 0 ? "default" : "pointer",
                      opacity: counts.pending === 0 ? 0.5 : 1,
                    }}
                  >
                    <XCircle size={13} strokeWidth={2.5} />
                    Reject All Pending ({counts.pending})
                  </button>

                  {/* Clear Rejected Button */}
                  <button
                    type="button"
                    onClick={handleDeleteAllRejected}
                    disabled={counts.rejected === 0}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: C.inputBg,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 9,
                      padding: "6px 12px",
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.muted,
                      cursor: counts.rejected === 0 ? "default" : "pointer",
                      opacity: counts.rejected === 0 ? 0.5 : 1,
                    }}
                  >
                    <X size={13} strokeWidth={2.5} />
                    Clear Rejected ({counts.rejected})
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
                {filtered.length === 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "80px 24px", textAlign: "center" }}>
                    <Sparkles size={40} color={C.muted} strokeWidth={1.5} />
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, fontWeight: 700, color: C.navy, margin: 0 }}>No questions here yet</p>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: C.muted, margin: 0, maxWidth: 320 }}>
                      Upload a syllabus document and click "Generate Questions" to get started.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {filtered.map((q) => (
                      <QuestionCard
                        key={q.id}
                        q={q}
                        onStatusChange={(id, s, reason, note) => handleStatusChange(id, s, reason, note)}
                        onEdit={handleEditQuestion} 
                        onFlag={(id, reason) =>
                          setQuestions((qs) =>
                            qs.map((x) => (x.id === id ? { ...x, flagged: true, flagReason: reason } : x))
                          )
                        }
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
