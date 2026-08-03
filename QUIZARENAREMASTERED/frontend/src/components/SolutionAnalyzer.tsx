import { useState, useRef } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  Upload, FileText, Code2, CheckCircle2, XCircle, AlertTriangle,
  ChevronDown, ChevronRight, MessageSquare, Download, Filter,
  BarChart2, BookOpen, Brain, Sparkles, Image, Loader2,
  Info, Tag, Users, RotateCcw, ZoomIn, ZoomOut,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  indigo:      "#5B3DF6", indigoDeep: "#4228D4",
  indigoLight: "rgba(91,61,246,0.08)", indigoBorder: "rgba(91,61,246,0.2)",
  coral:       "#FF6B4A", coralDeep: "#D44A2A",
  coralLight:  "rgba(255,107,74,0.09)", coralBorder: "rgba(255,107,74,0.22)",
  yellow:      "#FFC93C", yellowLight: "rgba(255,201,60,0.1)",
  green:       "#2ED47A", greenLight:  "rgba(46,212,122,0.1)", greenBorder: "rgba(46,212,122,0.25)",
  red:         "#FF4757", redLight:    "rgba(255,71,87,0.09)",  redBorder:   "rgba(255,71,87,0.22)",
  navy:        "#1B1E2B",
  white:       "#FFFFFF",
  bg:          "#F7F8FC",
  surface:     "#FFFFFF",
  border:      "#E8EAF0",
  borderStrong:"#D0D4E0",
  text:        "#1B1E2B",
  textMid:     "#4A4E6A",
  textMuted:   "#8A8EA8",
  sidebar:     "#1B1E2B",
};

// ── Sidebar nav (shared) ───────────────────────────────────────────────────────
const NAV = [
  { icon:"📋", label:"My Sections" },
  { icon:"❓", label:"Question Bank" },
  { icon:"✨", label:"AI Generator"  },
  { icon:"⚔️",  label:"Matchmaking"  },
  { icon:"🔬", label:"Solution Analyzer", active:true },
  { icon:"📊", label:"Analytics"     },
  { icon:"⚙️",  label:"Settings"     },
];

function Sidebar() { return <ProfSidebar />;
  return (
    <aside style={{ width:220, minWidth:220, background:C.sidebar, display:"flex",
      flexDirection:"column", padding:"20px 0", borderRight:"none", flexShrink:0 }}>
      <div style={{ padding:"0 20px 24px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:C.indigo,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>🏆</div>
          <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:21, fontWeight:700,
            color:"#fff" }}>QuizArena</span>
        </div>
        <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:600,
          color:"rgba(255,255,255,0.3)", margin:"8px 0 0", letterSpacing:"0.05em",
          textTransform:"uppercase" }}>Professor Portal</p>
      </div>
      <nav style={{ flex:1, padding:"14px 10px", display:"flex", flexDirection:"column", gap:2 }}>
        {NAV.map(item => (
          <div key={item.label} style={{
            display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10,
            background: item.active ? "rgba(91,61,246,0.25)" : "transparent",
            border: item.active ? "1px solid rgba(91,61,246,0.35)" : "1px solid transparent",
            cursor:"pointer", transition:"background 0.15s",
          }}>
            <span style={{ fontSize:15 }}>{item.icon}</span>
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:item.active?700:500,
              color: item.active ? "#fff" : "rgba(255,255,255,0.45)" }}>{item.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:C.indigo,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff" }}>PR</div>
          <div>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
              color:"#fff", margin:0 }}>Prof. Reyes</p>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:10,
              color:"rgba(255,255,255,0.35)", margin:0 }}>CS Department</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── Misconception category chips ──────────────────────────────────────────────
const MISCONCEPTION_TYPES = [
  { label:"Sign Error",           bg:"#FFF0F0", color:"#D64242", border:"#FFD0D0" },
  { label:"Off-by-One",           bg:"#FFF5E8", color:"#C47A00", border:"#FFE0A0" },
  { label:"Syntax Error",         bg:"#F0F0FF", color:"#5044CC", border:"#C8C4FF" },
  { label:"Logical Error",        bg:"#F0FBF4", color:"#1A8C4E", border:"#A8E8C0" },
  { label:"Computational Mistake",bg:"#FFF0FA", color:"#A0359A", border:"#F0B0E8" },
  { label:"Conceptual Gap",       bg:"#F0F8FF", color:"#1A72A8", border:"#A8D4F0" },
];

function MisconceptionBadge({ type, size = "md" }: { type: string; size?: "sm"|"md" }) {
  const t = MISCONCEPTION_TYPES.find(x => x.label === type) ?? MISCONCEPTION_TYPES[0];
  const pad = size==="sm" ? "2px 8px" : "4px 11px";
  const fs  = size==="sm" ? 10 : 12;
  return (
    <span style={{ background:t.bg, color:t.color, border:`1.5px solid ${t.border}`,
      borderRadius:20, padding:pad, fontFamily:"Manrope, sans-serif",
      fontSize:fs, fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>
      {type}
    </span>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label:string; value:string|number; sub?:string; color:string }) {
  return (
    <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:14,
      padding:"14px 18px", flex:1, minWidth:130,
      boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
      <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
        color:C.textMuted, margin:"0 0 5px", textTransform:"uppercase",
        letterSpacing:"0.06em" }}>{label}</p>
      <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:28, fontWeight:700,
        color, margin:"0 0 2px", lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
        color:C.textMuted, margin:0 }}>{sub}</p>}
    </div>
  );
}

// ── Tab 1: Submission ─────────────────────────────────────────────────────────
type SubmitMode = "image" | "code";
type SubmitStatus = "idle" | "uploading" | "pending" | "analyzed";

const MOCK_CODE = `def binary_search(arr, target):
    left, right = 0, len(arr)  # Bug: should be len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1  # Bug: off-by-one
    return -1`;

function SubmissionTab() {
  const [mode, setMode]         = useState<SubmitMode>("code");
  const [code, setCode]         = useState(MOCK_CODE);
  const [status, setStatus]     = useState<SubmitStatus>("pending");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAnalyze() {
    setStatus("uploading");
    setTimeout(() => setStatus("analyzed"), 2400);
  }

  const statusConfig: Record<SubmitStatus, { label:string; bg:string; color:string; border:string }> = {
    idle:     { label:"No File",   bg:"#F5F5F5", color:C.textMuted,  border:"#E0E0E0" },
    uploading:{ label:"Analyzing…",bg:C.yellowLight, color:"#A07000", border:"rgba(255,201,60,0.3)" },
    pending:  { label:"Pending",   bg:C.yellowLight, color:"#A07000", border:"rgba(255,201,60,0.3)" },
    analyzed: { label:"Analyzed",  bg:C.greenLight,  color:C.greenDeep ?? C.green, border:C.greenBorder },
  };
  const sc = statusConfig[status];

  return (
    <div style={{ display:"flex", gap:20, flex:1, minHeight:0, overflow:"hidden" }}>
      {/* Left: input panel */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:16, overflow:"auto" }}>

        {/* Mode selector */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"16px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:800,
            color:C.text, margin:"0 0 12px" }}>Submission Type</p>
          <div style={{ display:"flex", gap:10 }}>
            {([["image","📷","Handwritten / Image"],["code","💻","Code / Text"]] as const).map(([v,icon,label])=>(
              <button key={v} type="button" onClick={()=>setMode(v)} style={{
                flex:1, padding:"11px 16px", borderRadius:12, cursor:"pointer",
                background: mode===v ? C.indigoLight : C.bg,
                border: `2px solid ${mode===v ? C.indigo : C.border}`,
                display:"flex", alignItems:"center", gap:8, transition:"all 0.15s",
              }}>
                <span style={{ fontSize:18 }}>{icon}</span>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700,
                  color: mode===v ? C.indigo : C.textMid }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload zone or code editor */}
        {mode === "image" ? (
          <div
            onDragOver={e=>{e.preventDefault();setDragging(true);}}
            onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);setStatus("pending");}}
            onClick={()=>fileRef.current?.click()}
            style={{ background: dragging ? C.indigoLight : C.surface,
              border:`2px dashed ${dragging ? C.indigo : C.borderStrong}`,
              borderRadius:16, padding:"48px 28px",
              display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", gap:12, cursor:"pointer",
              transition:"all 0.15s", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
              onChange={()=>setStatus("pending")}/>
            <div style={{ width:56, height:56, borderRadius:16, background:C.indigoLight,
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Image size={26} color={C.indigo} strokeWidth={1.8}/>
            </div>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:15, fontWeight:800,
                color:C.text, margin:"0 0 4px" }}>
                {dragging ? "Drop to upload" : "Drop image here, or click to browse"}
              </p>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                color:C.textMuted, margin:0 }}>
                PNG, JPG, PDF — max 10 MB. Supports handwritten math & diagrams.
              </p>
            </div>
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              {["Math Equations","Flowcharts","Code Snippets","Diagrams"].map(t=>(
                <span key={t} style={{ background:C.bg, border:`1px solid ${C.border}`,
                  borderRadius:20, padding:"3px 10px", fontFamily:"Manrope, sans-serif",
                  fontSize:11, fontWeight:600, color:C.textMuted }}>{t}</span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
            overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flex:1, display:"flex",
            flexDirection:"column", minHeight:280 }}>
            {/* Editor header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 16px", background:"#1E2130",
              borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <Code2 size={14} color="rgba(255,255,255,0.4)" strokeWidth={2}/>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
                  color:"rgba(255,255,255,0.5)" }}>student_submission.py</span>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["Python","JavaScript","Java","C++","Math"].map(lang=>(
                  <span key={lang} style={{ padding:"2px 8px", borderRadius:6,
                    background:lang==="Python"?"rgba(91,61,246,0.35)":"rgba(255,255,255,0.06)",
                    border:`1px solid ${lang==="Python"?"rgba(91,61,246,0.5)":"transparent"}`,
                    fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700,
                    color:lang==="Python"?"#A08FFF":"rgba(255,255,255,0.4)",
                    cursor:"pointer" }}>{lang}</span>
                ))}
              </div>
            </div>
            {/* Code area */}
            <textarea value={code} onChange={e=>setCode(e.target.value)}
              spellCheck={false}
              style={{ flex:1, padding:"16px 20px", background:"#1A1D2E", border:"none",
                fontFamily:"'Courier New', monospace", fontSize:13, lineHeight:1.7,
                color:"#C8D3F5", resize:"none", outline:"none",
                minHeight:220 }} />
          </div>
        )}

        {/* Analyze button */}
        <button type="button" onClick={handleAnalyze} disabled={status==="uploading"}
          style={{ background: status==="uploading"
            ? "rgba(91,61,246,0.5)" : `linear-gradient(135deg,${C.indigo},${C.indigoDeep})`,
            border:"none", borderRadius:14, padding:"14px 28px",
            fontFamily:"Fredoka, sans-serif", fontSize:19, fontWeight:700, color:"#fff",
            cursor: status==="uploading"?"not-allowed":"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            boxShadow: status!=="uploading" ? "0 4px 16px rgba(91,61,246,0.35)" : "none",
            transition:"all 0.15s" }}>
          {status==="uploading"
            ? <><Loader2 size={18} strokeWidth={2.5}
                style={{ animation:"spin 1s linear infinite" }}/> Analyzing…</>
            : <><Sparkles size={18} strokeWidth={2}/> Analyze Submission</>}
        </button>
      </div>

      {/* Right: preview + status */}
      <div style={{ width:280, display:"flex", flexDirection:"column", gap:14 }}>
        {/* Status */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"16px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
            color:C.textMuted, margin:"0 0 10px", textTransform:"uppercase",
            letterSpacing:"0.06em" }}>Status</p>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ background:sc.bg, color:sc.color, border:`1.5px solid ${sc.border}`,
              borderRadius:20, padding:"5px 14px",
              fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700 }}>
              {sc.label}
            </span>
            {status==="analyzed" && <CheckCircle2 size={18} color={C.green} strokeWidth={2.5}/>}
            {status==="uploading" && <Loader2 size={18} color={C.yellow}
              style={{ animation:"spin 1s linear infinite" }} strokeWidth={2}/>}
          </div>
          {status==="analyzed" && (
            <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:6 }}>
              {[["Questions graded","1"],["Steps analyzed","6"],["Errors found","2"],
                ["Confidence","94%"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between",
                  padding:"5px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                    color:C.textMuted }}>{k}</span>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                    fontWeight:700, color:C.text }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail preview */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"16px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flex:1 }}>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
            color:C.textMuted, margin:"0 0 10px", textTransform:"uppercase",
            letterSpacing:"0.06em" }}>Preview</p>
          {/* Synthetic code preview card */}
          <div style={{ background:"#1A1D2E", borderRadius:12, padding:"14px",
            border:"1px solid rgba(255,255,255,0.07)", fontSize:11, lineHeight:1.7,
            fontFamily:"'Courier New', monospace" }}>
            {MOCK_CODE.split("\n").slice(0,6).map((line, i) => (
              <div key={i} style={{ display:"flex", gap:10 }}>
                <span style={{ color:"rgba(255,255,255,0.2)", minWidth:16, textAlign:"right",
                  userSelect:"none" }}>{i+1}</span>
                <span style={{ color: i===1||i===6 ? "#FF6B8A" : "#C8D3F5",
                  background: i===1||i===6 ? "rgba(255,71,87,0.08)":"transparent",
                  borderRadius:3, paddingInline:2 }}>{line}</span>
              </div>
            ))}
            <div style={{ color:"rgba(255,255,255,0.2)", marginTop:4 }}>···</div>
          </div>
          <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
            <span style={{ background:C.indigoLight, color:C.indigo, border:`1px solid ${C.indigoBorder}`,
              borderRadius:20, padding:"2px 9px", fontFamily:"Manrope, sans-serif",
              fontSize:10, fontWeight:700 }}>Python</span>
            <span style={{ background:C.bg, color:C.textMuted, border:`1px solid ${C.border}`,
              borderRadius:20, padding:"2px 9px", fontFamily:"Manrope, sans-serif",
              fontSize:10, fontWeight:600 }}>14 lines</span>
            <span style={{ background:C.redLight, color:C.red, border:`1px solid ${C.redBorder}`,
              borderRadius:20, padding:"2px 9px", fontFamily:"Manrope, sans-serif",
              fontSize:10, fontWeight:700 }}>2 errors</span>
          </div>
        </div>

        {/* Student info */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"14px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#5B3DF6",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff" }}>
              AC
            </div>
            <div>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700,
                color:C.text, margin:0 }}>Ana Cruz</p>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                color:C.textMuted, margin:0 }}>CS201-A · Q3 · Binary Search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab 2: Grading ─────────────────────────────────────────────────────────────
interface Step {
  num: number; label: string; code: string;
  status: "correct"|"incorrect"|"warning";
  feedback?: string; errLine?: number;
}
const STEPS: Step[] = [
  { num:1, label:"Function definition & parameters",
    code:"def binary_search(arr, target):",
    status:"correct" },
  { num:2, label:"Pointer initialization",
    code:"left, right = 0, len(arr)",
    status:"incorrect",
    feedback:"right should be initialized to len(arr) - 1. Using len(arr) as the upper bound causes an index-out-of-range error when arr[mid] is accessed with mid = (0 + len(arr)) // 2.",
    errLine:0 },
  { num:3, label:"While loop condition",
    code:"while left <= right:",
    status:"correct" },
  { num:4, label:"Midpoint calculation",
    code:"mid = (left + right) // 2",
    status:"correct" },
  { num:5, label:"Comparison & pointer update",
    code:"elif arr[mid] < target:\n    left = mid + 1\nelse:\n    right = mid - 1",
    status:"warning",
    feedback:"The right = mid - 1 update is correct here, but because of the initialization error in Step 2, the search range is off by one, causing incorrect results on edge-case inputs.",
    errLine:3 },
  { num:6, label:"Return statement",
    code:"return -1",
    status:"correct" },
];

const GRADE_CONFIG = { grade:"C+", score:68, color:C.yellow, bg:C.yellowLight,
  border:"rgba(255,201,60,0.35)" };

function GradingTab() {
  const [expanded, setExpanded] = useState<number[]>([2, 5]);
  const [zoom, setZoom]         = useState(1);
  const toggle = (n:number) =>
    setExpanded(e => e.includes(n) ? e.filter(x=>x!==n) : [...e,n]);

  const statusIcon = (s:Step["status"]) => {
    if (s==="correct")   return <CheckCircle2 size={18} color={C.green} strokeWidth={2.5}/>;
    if (s==="incorrect") return <XCircle      size={18} color={C.red}   strokeWidth={2.5}/>;
    return                      <AlertTriangle size={18} color={C.yellow} strokeWidth={2.5}/>;
  };
  const statusBg = (s:Step["status"]) =>
    s==="correct" ? C.greenLight : s==="incorrect" ? C.redLight : C.yellowLight;
  const statusBorder = (s:Step["status"]) =>
    s==="correct" ? C.greenBorder : s==="incorrect" ? C.redBorder : "rgba(255,201,60,0.3)";

  return (
    <div style={{ display:"flex", gap:20, flex:1, overflow:"hidden" }}>
      {/* Left: step-by-step */}
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:10 }}>
        {/* Header strip */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"14px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flexShrink:0 }}>
          <div>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
              color:C.textMuted, margin:"0 0 3px", textTransform:"uppercase",
              letterSpacing:"0.06em" }}>Step-by-Step Review</p>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700,
              color:C.text, margin:0 }}>Binary Search · Ana Cruz · CS201-A</p>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {[["correct",C.green,"2 Correct"],["incorrect",C.red,"1 Error"],
              ["warning",C.yellow,"1 Warning"]].map(([s,c,l])=>(
              <div key={s as string} style={{ display:"flex", alignItems:"center", gap:5 }}>
                {statusIcon(s as Step["status"])}
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
                  color:c as string }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        {STEPS.map(step => {
          const isOpen = expanded.includes(step.num);
          const hasDetail = !!step.feedback;
          return (
            <div key={step.num} style={{ background:C.surface,
              border:`1.5px solid ${hasDetail ? statusBorder(step.status) : C.border}`,
              borderRadius:16, overflow:"hidden",
              boxShadow: hasDetail ? `0 2px 12px ${statusBg(step.status)}` : "0 2px 8px rgba(0,0,0,0.03)" }}>
              {/* Step header */}
              <div onClick={()=>hasDetail&&toggle(step.num)}
                style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 18px",
                  cursor:hasDetail?"pointer":"default",
                  background: isOpen ? statusBg(step.status) : "transparent",
                  transition:"background 0.15s" }}>
                {/* Number badge */}
                <div style={{ width:28, height:28, borderRadius:8, background:C.bg,
                  border:`1.5px solid ${C.border}`, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0,
                  fontFamily:"Fredoka, sans-serif", fontSize:15, fontWeight:700,
                  color:C.textMid, marginTop:1 }}>
                  {step.num}
                </div>
                {/* Status icon */}
                <div style={{ flexShrink:0, marginTop:3 }}>{statusIcon(step.status)}</div>
                {/* Label + code snippet */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700,
                    color:C.text, margin:"0 0 5px" }}>{step.label}</p>
                  <div style={{ background:"#1A1D2E", borderRadius:8, padding:"7px 12px",
                    fontFamily:"'Courier New', monospace", fontSize:12, color:"#C8D3F5",
                    lineHeight:1.6, display:"flex", flexDirection:"column" }}>
                    {step.code.split("\n").map((ln, i) => (
                      <span key={i} style={{
                        background: i === (step.errLine ?? -1)
                          ? "rgba(255,71,87,0.18)" : "transparent",
                        borderRadius:4, paddingInline:2,
                        color: i === (step.errLine ?? -1) ? "#FF8090" : "#C8D3F5",
                      }}>{ln}</span>
                    ))}
                  </div>
                </div>
                {hasDetail && (
                  <div style={{ flexShrink:0, marginTop:3, color:C.textMuted }}>
                    {isOpen ? <ChevronDown size={16} strokeWidth={2.5}/>
                             : <ChevronRight size={16} strokeWidth={2.5}/>}
                  </div>
                )}
              </div>

              {/* Expanded feedback bubble */}
              {isOpen && step.feedback && (
                <div style={{ padding:"0 18px 16px 18px" }}>
                  <div style={{ display:"flex", gap:10, background:statusBg(step.status),
                    border:`1.5px solid ${statusBorder(step.status)}`,
                    borderRadius:12, padding:"12px 14px" }}>
                    <MessageSquare size={15} strokeWidth={2}
                      color={step.status==="incorrect"?C.red:C.yellow} style={{ flexShrink:0, marginTop:2 }}/>
                    <div>
                      <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800,
                        color:step.status==="incorrect"?C.red:C.yellow, margin:"0 0 4px" }}>
                        {step.status==="incorrect" ? "Error Detected" : "Warning"}
                      </p>
                      <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:500,
                        color:C.textMid, margin:0, lineHeight:1.65 }}>
                        {step.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: annotated viewer + grade */}
      <div style={{ width:300, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>
        {/* Grade badge */}
        <div style={{ background:C.surface, border:`2px solid ${GRADE_CONFIG.border}`,
          borderRadius:18, padding:"18px 20px",
          background:GRADE_CONFIG.bg,
          boxShadow:`0 4px 16px ${GRADE_CONFIG.bg}` } as React.CSSProperties}>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
            color:C.textMuted, margin:"0 0 8px", textTransform:"uppercase",
            letterSpacing:"0.06em" }}>Overall Grade</p>
          <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
            <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:52, fontWeight:700,
              color:GRADE_CONFIG.color, lineHeight:1 }}>{GRADE_CONFIG.grade}</span>
            <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:28, fontWeight:700,
              color:"rgba(0,0,0,0.3)" }}>{GRADE_CONFIG.score}/100</span>
          </div>
          <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:4 }}>
            {[["Logic & Approach","80%",C.green],
              ["Correctness","55%",C.red],
              ["Code Quality","70%",C.yellow]].map(([label,pct,color])=>(
              <div key={label as string}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                    color:C.textMid, fontWeight:600 }}>{label}</span>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                    fontWeight:700, color:color as string }}>{pct}</span>
                </div>
                <div style={{ height:5, background:"rgba(0,0,0,0.08)", borderRadius:50 }}>
                  <div style={{ height:"100%", width:pct as string, background:color as string,
                    borderRadius:50, transition:"width 0.6s ease-out" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annotated code viewer */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"10px 14px", borderBottom:`1px solid ${C.border}`, background:C.bg }}>
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800,
              color:C.text }}>Annotated View</span>
            <div style={{ display:"flex", gap:5 }}>
              <button type="button" onClick={()=>setZoom(z=>Math.max(0.75,z-0.1))}
                style={{ width:26, height:26, borderRadius:6, border:`1px solid ${C.border}`,
                  background:"transparent", cursor:"pointer", display:"flex", alignItems:"center",
                  justifyContent:"center", color:C.textMuted }}>
                <ZoomOut size={12} strokeWidth={2}/>
              </button>
              <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
                color:C.textMuted, lineHeight:"26px" }}>{Math.round(zoom*100)}%</span>
              <button type="button" onClick={()=>setZoom(z=>Math.min(1.5,z+0.1))}
                style={{ width:26, height:26, borderRadius:6, border:`1px solid ${C.border}`,
                  background:"transparent", cursor:"pointer", display:"flex", alignItems:"center",
                  justifyContent:"center", color:C.textMuted }}>
                <ZoomIn size={12} strokeWidth={2}/>
              </button>
            </div>
          </div>
          <div style={{ padding:"12px", background:"#1A1D2E", overflow:"auto",
            transformOrigin:"top left" }}>
            <div style={{ transform:`scale(${zoom})`, transformOrigin:"top left",
              transition:"transform 0.15s" }}>
              {MOCK_CODE.split("\n").map((line, i) => {
                const isErr = i===1 || i===7;
                const isWarn = i===7;
                return (
                  <div key={i} style={{ display:"flex", gap:8, position:"relative",
                    background:isErr?"rgba(255,71,87,0.1)":"transparent",
                    borderLeft:isErr?`3px solid ${isWarn?C.yellow:C.red}`:"3px solid transparent",
                    paddingLeft:4, marginLeft:-4 }}>
                    <span style={{ color:"rgba(255,255,255,0.2)", minWidth:18,
                      fontFamily:"'Courier New', monospace", fontSize:12, userSelect:"none",
                      flexShrink:0 }}>{i+1}</span>
                    <span style={{ fontFamily:"'Courier New', monospace", fontSize:12,
                      color: isErr ? (isWarn?"#FFD080":"#FF8090") : "#C8D3F5",
                      lineHeight:1.7, flex:1 }}>{line || " "}</span>
                    {isErr && (
                      <div style={{ position:"absolute", right:-4, top:2,
                        width:16, height:16, borderRadius:"50%",
                        background:isWarn?C.yellow:C.red, display:"flex",
                        alignItems:"center", justifyContent:"center" }}>
                        <span style={{ color:"#fff", fontSize:9, fontWeight:800 }}>!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Error legend */}
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.border}`,
            display:"flex", flexDirection:"column", gap:5 }}>
            {[{color:C.red,label:"Line 2 — Index out of bounds (right = len(arr))"},
              {color:C.yellow,label:"Line 8 — Edge case failure due to Step 2 error"}].map(e=>(
              <div key={e.label} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:e.color,
                  marginTop:4, flexShrink:0 }}/>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                  color:C.textMid, lineHeight:1.5 }}>{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab 3: Misconception Analysis ─────────────────────────────────────────────
interface MisconceptionRow {
  id:number; student:string; initials:string; color:string;
  question:string; type:string; quiz:string; topic:string; date:string;
}
const MISCONCEPTION_ROWS: MisconceptionRow[] = [
  { id:1,  student:"Ana Cruz",      initials:"AC", color:"#5B3DF6", question:"Q3 Binary Search",  type:"Off-by-One",            quiz:"Quiz 4", topic:"Searching", date:"Jul 24" },
  { id:2,  student:"Carlos Bato",   initials:"CB", color:"#FF6B4A", question:"Q1 Loop Condition", type:"Logical Error",         quiz:"Quiz 4", topic:"Loops",     date:"Jul 24" },
  { id:3,  student:"Maria Santos",  initials:"MS", color:"#2ED47A", question:"Q5 Recursion Base", type:"Off-by-One",            quiz:"Quiz 4", topic:"Recursion", date:"Jul 24" },
  { id:4,  student:"Juan Dela T.",  initials:"JD", color:"#FFC93C", question:"Q2 Pointer Init",   type:"Sign Error",            quiz:"Quiz 4", topic:"Searching", date:"Jul 24" },
  { id:5,  student:"Bea Reyes",     initials:"BR", color:"#B06EF6", question:"Q4 Merge Sort",     type:"Computational Mistake", quiz:"Quiz 3", topic:"Sorting",   date:"Jul 20" },
  { id:6,  student:"Leo Tan",       initials:"LT", color:"#5BC8F6", question:"Q1 Array Access",   type:"Off-by-One",            quiz:"Quiz 3", topic:"Arrays",    date:"Jul 20" },
  { id:7,  student:"Ana Cruz",      initials:"AC", color:"#5B3DF6", question:"Q2 Factorial",      type:"Logical Error",         quiz:"Quiz 3", topic:"Recursion", date:"Jul 20" },
  { id:8,  student:"Maria Santos",  initials:"MS", color:"#2ED47A", question:"Q3 Stack Push",     type:"Syntax Error",          quiz:"Quiz 3", topic:"Stacks",    date:"Jul 20" },
  { id:9,  student:"Carlos Bato",   initials:"CB", color:"#FF6B4A", question:"Q5 Bubble Sort",    type:"Computational Mistake", quiz:"Quiz 2", topic:"Sorting",   date:"Jul 15" },
  { id:10, student:"Juan Dela T.",  initials:"JD", color:"#FFC93C", question:"Q4 Queue Dequeue",  type:"Conceptual Gap",        quiz:"Quiz 2", topic:"Queues",    date:"Jul 15" },
];

const CHART_DATA = [
  { name:"Off-by-One",  count:14, color:"#C47A00" },
  { name:"Logical Error",count:11, color:"#1A8C4E" },
  { name:"Sign Error",  count:8,  color:"#D64242"  },
  { name:"Syntax Error",count:7,  color:"#5044CC"  },
  { name:"Comp. Mistake",count:6, color:"#A0359A"  },
  { name:"Conceptual Gap",count:4,color:"#1A72A8"  },
];

const FILTER_CLASSES  = ["All Classes","CS201-A","CS201-B","CS301-A"];
const FILTER_TOPICS   = ["All Topics","Searching","Sorting","Recursion","Arrays","Loops"];
const FILTER_QUIZZES  = ["All Quizzes","Quiz 2","Quiz 3","Quiz 4"];
const FILTER_TYPES    = ["All Types","Off-by-One","Logical Error","Sign Error","Syntax Error","Computational Mistake","Conceptual Gap"];

interface CustomTooltipProps { active?:boolean; payload?:{value:number}[]; label?:string; }
function CustomBarTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:10,
      padding:"8px 12px", boxShadow:"0 4px 12px rgba(0,0,0,0.12)" }}>
      <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
        color:C.text, margin:"0 0 2px" }}>{label}</p>
      <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700,
        color:C.indigo, margin:0 }}>{payload[0].value} instances</p>
    </div>
  );
}

function MisconceptionTab() {
  const [classFilter, setClassFilter]   = useState("All Classes");
  const [topicFilter, setTopicFilter]   = useState("All Topics");
  const [quizFilter, setQuizFilter]     = useState("All Quizzes");
  const [typeFilter, setTypeFilter]     = useState("All Types");
  const [exportHover, setExportHover]   = useState(false);

  const filtered = MISCONCEPTION_ROWS.filter(r =>
    (quizFilter==="All Quizzes" || r.quiz===quizFilter) &&
    (topicFilter==="All Topics" || r.topic===topicFilter) &&
    (typeFilter==="All Types"   || r.type===typeFilter)
  );

  return (
    <div style={{ display:"flex", gap:20, flex:1, overflow:"hidden" }}>
      {/* Left: student answer + AI summary */}
      <div style={{ width:300, display:"flex", flexDirection:"column", gap:14,
        overflowY:"auto", flexShrink:0 }}>
        {/* Student answer */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"16px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
            color:C.textMuted, margin:"0 0 10px", textTransform:"uppercase",
            letterSpacing:"0.06em" }}>Student Answer</p>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"#5B3DF6",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff" }}>AC</div>
            <div>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700,
                color:C.text, margin:0 }}>Ana Cruz</p>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                color:C.textMuted, margin:0 }}>Q3 Binary Search · Quiz 4</p>
            </div>
          </div>
          <div style={{ background:"#1A1D2E", borderRadius:10, padding:"10px 12px",
            fontFamily:"'Courier New', monospace", fontSize:12, lineHeight:1.7 }}>
            {MOCK_CODE.split("\n").slice(0,4).map((l,i)=>(
              <div key={i} style={{
                background:i===1?"rgba(255,71,87,0.12)":"transparent",
                borderRadius:3, paddingInline:2,
                color:i===1?"#FF8090":"#C8D3F5" }}>{l}</div>
            ))}
            <div style={{ color:"rgba(255,255,255,0.2)" }}>···</div>
          </div>
        </div>

        {/* AI Misconception card */}
        <div style={{ background:`linear-gradient(145deg,rgba(91,61,246,0.07),rgba(91,61,246,0.02))`,
          border:`2px solid ${C.indigoBorder}`, borderRadius:16,
          padding:"16px 18px", boxShadow:"0 4px 16px rgba(91,61,246,0.07)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <Brain size={16} color={C.indigo} strokeWidth={2}/>
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800,
              color:C.indigo, textTransform:"uppercase", letterSpacing:"0.06em" }}>
              AI Analysis
            </span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
            <MisconceptionBadge type="Off-by-One"/>
            <MisconceptionBadge type="Sign Error"/>
          </div>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:500,
            color:C.textMid, margin:"0 0 12px", lineHeight:1.7 }}>
            The student initialized <code style={{ background:C.bg, borderRadius:4,
              padding:"1px 5px", fontFamily:"'Courier New', monospace", fontSize:11 }}>
              right = len(arr)</code> instead of <code style={{ background:C.bg, borderRadius:4,
              padding:"1px 5px", fontFamily:"'Courier New', monospace", fontSize:11 }}>
              len(arr) - 1</code>, a classic off-by-one boundary error. This suggests the student
            understands the binary search concept but has an incomplete mental model of
            zero-indexed array bounds.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:800,
              color:C.text, margin:"0 0 4px", textTransform:"uppercase",
              letterSpacing:"0.05em" }}>Suggested Remediation</p>
            {["Review 0-indexed array boundary rules",
              "Practice tracing invariants with dry-runs",
              "Assign off-by-one targeted exercises"].map(s=>(
              <div key={s} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:C.indigo,
                  marginTop:5, flexShrink:0 }}/>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                  color:C.textMid, lineHeight:1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, padding:"8px 12px", background:C.indigoLight,
            border:`1px solid ${C.indigoBorder}`, borderRadius:10,
            display:"flex", alignItems:"center", gap:7 }}>
            <Sparkles size={13} color={C.indigo} strokeWidth={2}/>
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
              color:C.indigo }}>Confidence: 94% · GPT-4o analysis</span>
          </div>
        </div>
      </div>

      {/* Right: chart + table */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:14, overflowY:"auto" }}>
        {/* Filters + export row */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", flexShrink:0 }}>
          <Filter size={14} color={C.textMuted} strokeWidth={2}/>
          {([
            [classFilter, setClassFilter, FILTER_CLASSES],
            [topicFilter, setTopicFilter, FILTER_TOPICS],
            [quizFilter,  setQuizFilter,  FILTER_QUIZZES],
            [typeFilter,  setTypeFilter,  FILTER_TYPES],
          ] as const).map(([val, setter, options], fi) => (
            <div key={fi} style={{ position:"relative" }}>
              <select value={val as string}
                onChange={e => (setter as (v:string)=>void)(e.target.value)}
                style={{ appearance:"none", background:C.surface, border:`1.5px solid ${C.border}`,
                  borderRadius:20, padding:"6px 28px 6px 12px", fontFamily:"Manrope, sans-serif",
                  fontSize:12, fontWeight:700, color:C.text, cursor:"pointer", outline:"none",
                  boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                {(options as readonly string[]).map(o=>(
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <ChevronDown size={12} color={C.textMuted} style={{ position:"absolute",
                right:9, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            </div>
          ))}
          <button type="button"
            onMouseEnter={()=>setExportHover(true)}
            onMouseLeave={()=>setExportHover(false)}
            style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:7,
              padding:"7px 16px", borderRadius:20, cursor:"pointer",
              background: exportHover ? C.indigoLight : "transparent",
              border:`1.5px solid ${exportHover ? C.indigo : C.borderStrong}`,
              fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
              color: exportHover ? C.indigo : C.textMid, transition:"all 0.15s" }}>
            <Download size={13} strokeWidth={2.5}/>
            Export Analytics
          </button>
        </div>

        {/* Bar chart card */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <BarChart2 size={16} color={C.indigo} strokeWidth={2}/>
              <span style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:800,
                color:C.text }}>Common Misconceptions This Class</span>
            </div>
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:600,
              color:C.textMuted }}>CS201-A · All Quizzes</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart key="misconception-bar" data={CHART_DATA} layout="vertical"
              margin={{ top:0, right:40, bottom:0, left:20 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3"
                horizontal={false} stroke={C.border}/>
              <XAxis key="x" type="number" tick={{ fontFamily:"Manrope, sans-serif",
                fontSize:11, fill:C.textMuted }} axisLine={false} tickLine={false}/>
              <YAxis key="y" dataKey="name" type="category" width={110}
                tick={{ fontFamily:"Manrope, sans-serif", fontSize:11, fill:C.textMid }}
                axisLine={false} tickLine={false}/>
              <Tooltip key="tooltip" content={<CustomBarTooltip/>}/>
              <Bar key="bar" dataKey="count" radius={[0,6,6,0]} barSize={18}>
                {CHART_DATA.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} fillOpacity={0.82}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* History table */}
        <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:16,
          overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", flex:1 }}>
          {/* Table header */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr 1fr 1fr 80px",
            gap:0, padding:"11px 18px",
            background:C.bg, borderBottom:`1.5px solid ${C.border}` }}>
            {["Student","Question","Type","Quiz","Date"].map((h,i)=>(
              <span key={h} style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
                color:C.textMuted, textTransform:"uppercase", letterSpacing:"0.05em",
                textAlign:i===4?"center":"left" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div style={{ overflowY:"auto" }}>
            {filtered.map((row, idx) => (
              <div key={row.id} style={{
                display:"grid", gridTemplateColumns:"1fr 1.4fr 1fr 1fr 80px",
                gap:0, padding:"11px 18px", alignItems:"center",
                borderBottom: idx < filtered.length-1 ? `1px solid ${C.border}` : "none",
                background: idx%2===0 ? C.surface : C.bg,
                transition:"background 0.1s",
              }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="#EFF1FC"}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background=idx%2===0?C.surface:C.bg}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:row.color,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:800, color:"#fff",
                    flexShrink:0 }}>{row.initials}</div>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:600,
                    color:C.text, overflow:"hidden", textOverflow:"ellipsis",
                    whiteSpace:"nowrap" }}>{row.student}</span>
                </div>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                  color:C.textMid, overflow:"hidden", textOverflow:"ellipsis",
                  whiteSpace:"nowrap" }}>{row.question}</span>
                <div><MisconceptionBadge type={row.type} size="sm"/></div>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12,
                  color:C.textMuted, fontWeight:500 }}>{row.quiz}</span>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                  color:C.textMuted, textAlign:"center" }}>{row.date}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding:"32px", textAlign:"center" }}>
                <p style={{ fontFamily:"Manrope, sans-serif", fontSize:14,
                  color:C.textMuted }}>No records match the selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root Component ─────────────────────────────────────────────────────────────
type TabId = "submission" | "grading" | "analysis";
const TABS: { id:TabId; icon:React.ReactNode; label:string; sub:string }[] = [
  { id:"submission", icon:<Upload size={15} strokeWidth={2}/>,    label:"Submission",             sub:"Upload & preview" },
  { id:"grading",    icon:<CheckCircle2 size={15} strokeWidth={2}/>, label:"Grading",             sub:"Step-by-step review" },
  { id:"analysis",   icon:<Brain size={15} strokeWidth={2}/>,     label:"Misconception Analysis", sub:"AI-powered insights" },
];

export function SolutionAnalyzer() {
  const [tab, setTab] = useState<TabId>("submission");

  return (
    <>
      <style>{`
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes fadeIn{ 0%{opacity:0;transform:translateY(6px)} 100%{opacity:1;transform:translateY(0)} }
        select option { background: #fff; color: #1B1E2B; }
      `}</style>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden",
        fontFamily:"Manrope, sans-serif", background:C.bg }}>
        <Sidebar/>

        {/* Main content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Top bar */}
          <div style={{ background:C.surface, borderBottom:`1.5px solid ${C.border}`,
            padding:"14px 28px", display:"flex", alignItems:"center",
            justifyContent:"space-between", flexShrink:0 }}>
            <div>
              <h1 style={{ fontFamily:"Manrope, sans-serif", fontSize:22, fontWeight:800,
                color:C.text, margin:0 }}>Solution Analyzer</h1>
              <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, color:C.textMuted,
                margin:"3px 0 0" }}>
                AI-powered grading &amp; misconception detection
              </p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7,
                background:C.indigoLight, border:`1.5px solid ${C.indigoBorder}`,
                borderRadius:20, padding:"6px 14px" }}>
                <Sparkles size={13} color={C.indigo} strokeWidth={2}/>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
                  color:C.indigo }}>AI Grading Active</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:7,
                background:C.bg, border:`1.5px solid ${C.border}`,
                borderRadius:20, padding:"6px 14px" }}>
                <Users size={13} color={C.textMuted} strokeWidth={2}/>
                <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:600,
                  color:C.textMid }}>CS201-A · 32 students</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ background:C.surface, borderBottom:`1.5px solid ${C.border}`,
            padding:"0 28px", display:"flex", gap:4, flexShrink:0 }}>
            {TABS.map(t => (
              <button key={t.id} type="button" onClick={()=>setTab(t.id)} style={{
                padding:"13px 20px", border:"none", background:"transparent",
                cursor:"pointer", display:"flex", alignItems:"center", gap:8,
                borderBottom:`3px solid ${tab===t.id ? C.indigo : "transparent"}`,
                transition:"border-color 0.15s", marginBottom:-1,
              }}>
                <span style={{ color: tab===t.id ? C.indigo : C.textMuted }}>{t.icon}</span>
                <div style={{ textAlign:"left" }}>
                  <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:800,
                    color: tab===t.id ? C.indigo : C.textMid, margin:0, lineHeight:1.2 }}>
                    {t.label}
                  </p>
                  <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
                    color:C.textMuted, margin:0, lineHeight:1.2 }}>{t.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex:1, padding:"20px 28px", overflow:"hidden", display:"flex",
            flexDirection:"column", animation:"fadeIn 0.25s ease-out" }}
            key={tab}>
            {tab==="submission" && <SubmissionTab/>}
            {tab==="grading"    && <GradingTab/>}
            {tab==="analysis"   && <MisconceptionTab/>}
          </div>
        </div>
      </div>
    </>
  );
}
