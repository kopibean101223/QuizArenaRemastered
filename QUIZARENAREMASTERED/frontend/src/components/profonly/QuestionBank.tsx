import { useState, useRef, useEffect, useCallback } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Search, Plus, ChevronDown, Pencil, Trash2, Eye, X,
  CheckSquare, Square, Download, Upload, SlidersHorizontal,
  ChevronLeft, ChevronRight, Trophy, LayoutDashboard, Library,
  BarChart2, Settings, Layers, LogOut, CheckCircle2, Filter,
  ArrowUpDown, Copy, BookOpen, Circle, ToggleLeft, AlignLeft,
  Hash, Tag, Clock, ChevronRight as Arrow,
} from "lucide-react";

// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo: "#5B3DF6", indigoLight: "rgba(91,61,246,0.08)", indigoBorder: "rgba(91,61,246,0.2)",
  coral: "#FF6B4A",  coralLight: "rgba(255,107,74,0.1)",  coralBorder: "rgba(255,107,74,0.25)",
  yellow: "#FFC93C", yellowLight: "rgba(255,201,60,0.14)", yellowBorder: "rgba(255,201,60,0.35)",
  green: "#2ED47A",  greenLight: "rgba(46,212,122,0.12)",  greenBorder: "rgba(46,212,122,0.3)",
  red: "#FF4757",    redLight: "rgba(255,71,87,0.1)",      redBorder: "rgba(255,71,87,0.2)",
  navy: "#1B1E2B", offWhite: "#FAFAFC", white: "#FFFFFF",
  muted: "#717182", border: "rgba(0,0,0,0.07)", inputBg: "#F3F3F7",
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const SUBJECTS   = ["All Subjects","Mathematics","Physics","Computer Science","History","Biology"];
const DIFFICULTIES = ["All Difficulties","Easy","Medium","Hard"];
const TOPICS: Record<string,string[]> = {
  Mathematics: ["Algebra","Calculus","Trigonometry","Statistics","Number Theory"],
  Physics:     ["Mechanics","Thermodynamics","Optics","Electromagnetism","Modern Physics"],
  "Computer Science": ["Data Structures","Algorithms","Networking","OOP","Databases"],
  History:     ["Ancient","Medieval","Modern","Philippine History","World Wars"],
  Biology:     ["Genetics","Cell Biology","Ecology","Evolution","Anatomy"],
};
const ALL_TOPICS = ["All Topics", ...new Set(Object.values(TOPICS).flat())];
const QTYPES = ["All Types","Multiple Choice","True / False","Identification","Short Answer"];
const SORT_OPTIONS = ["Newest First","Oldest First","A → Z","Z → A","Difficulty ↑","Difficulty ↓"];

const SUBJECT_STYLE: Record<string,{bg:string;text:string;dot:string}> = {
  Mathematics:       {bg:"rgba(91,61,246,0.1)",  text:"#5B3DF6", dot:"#5B3DF6"},
  Physics:           {bg:"rgba(255,107,74,0.1)", text:"#C8441E", dot:"#FF6B4A"},
  "Computer Science":{bg:"rgba(46,212,122,0.12)",text:"#18A058", dot:"#2ED47A"},
  History:           {bg:"rgba(255,201,60,0.15)",text:"#9A6C00", dot:"#FFC93C"},
  Biology:           {bg:"rgba(91,200,246,0.15)",text:"#076E9A", dot:"#5BC8F6"},
};
const DIFF_STYLE: Record<string,{bg:string;text:string;border:string}> = {
  Easy:   {bg:C.greenLight, text:"#18A058", border:C.greenBorder},
  Medium: {bg:C.yellowLight,text:"#9A6C00", border:C.yellowBorder},
  Hard:   {bg:C.coralLight, text:"#C8441E", border:C.coralBorder},
};
const QTYPE_ICON: Record<string,React.ReactNode> = {
  "Multiple Choice": <Circle size={11} strokeWidth={2.5}/>,
  "True / False":    <ToggleLeft size={11} strokeWidth={2.5}/>,
  "Identification":  <Hash size={11} strokeWidth={2.5}/>,
  "Short Answer":    <AlignLeft size={11} strokeWidth={2.5}/>,
};

interface Question {
  id: number; text: string; subject: string; difficulty: "Easy"|"Medium"|"Hard";
  topic: string; type: string; points: number; timeLimit: number;
  choices?: string[]; answer: string; explanation?: string; tags: string[];
  createdAt: string;
}

const PAGE_SIZE = 8;

// ─── Tiny helpers ──────────────────────────────────────────────────────────────
function SubjectBadge({subject}:{subject:string}) {
  const s = SUBJECT_STYLE[subject] ?? {bg:C.indigoLight,text:C.indigo,dot:C.indigo};
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4,background:s.bg,color:s.text,
      borderRadius:7,padding:"3px 8px",fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:s.dot,flexShrink:0}}/>
      {subject}
    </span>
  );
}

function DiffBadge({difficulty}:{difficulty:string}) {
  const s = DIFF_STYLE[difficulty] ?? {bg:C.indigoLight,text:C.indigo,border:C.indigoBorder};
  return (
    <span style={{display:"inline-flex",alignItems:"center",background:s.bg,color:s.text,
      border:`1.5px solid ${s.border}`,borderRadius:7,padding:"3px 9px",
      fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>
      {difficulty}
    </span>
  );
}

function TypeChip({type}:{type:string}) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5,background:C.inputBg,color:C.muted,
      borderRadius:7,padding:"3px 8px",fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>
      {QTYPE_ICON[type]}
      {type}
    </span>
  );
}

// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({value,options,onChange,width,placeholder}:
  {value:string;options:string[];onChange:(v:string)=>void;width?:number;placeholder?:string}) {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{position:"relative",width}}>
      <button type="button" onClick={()=>setOpen(v=>!v)} style={{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:6,
        background:C.white,border:`1.5px solid ${open?C.indigo:C.border}`,borderRadius:11,
        padding:"8px 12px",fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:600,
        color:value.startsWith("All")?C.muted:C.navy,cursor:"pointer",whiteSpace:"nowrap",
        transition:"border-color 0.15s",
      }}>
        {placeholder&&value.startsWith("All")?placeholder:value}
        <ChevronDown size={13} color={C.muted} style={{transform:open?"rotate(180deg)":"none",transition:"transform 0.15s",flexShrink:0}}/>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 5px)",left:0,width:"100%",minWidth:160,
          background:C.white,border:`1.5px solid ${C.border}`,borderRadius:13,
          boxShadow:"0 8px 24px rgba(0,0,0,0.1)",zIndex:120,padding:"5px",overflowY:"auto",maxHeight:240}}>
          {options.map(opt=>(
            <button key={opt} type="button" onClick={()=>{onChange(opt);setOpen(false);}} style={{
              width:"100%",background:opt===value?C.indigoLight:"transparent",border:"none",borderRadius:8,
              padding:"8px 11px",fontFamily:"Manrope,sans-serif",fontSize:13,
              fontWeight:opt===value?700:500,color:opt===value?C.indigo:C.navy,cursor:"pointer",textAlign:"left",
            }}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Filter chip ───────────────────────────────────────────────────────────────
function FilterChip({label,active,count,onClick,onClear}:
  {label:string;active:boolean;count?:number;onClick:()=>void;onClear?:()=>void}) {
  return (
    <button type="button" onClick={onClick} style={{
      display:"inline-flex",alignItems:"center",gap:5,
      background:active?C.indigoLight:C.white,
      border:`1.5px solid ${active?C.indigo:C.border}`,
      borderRadius:20,padding:"6px 12px",cursor:"pointer",
      fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,
      color:active?C.indigo:C.muted,transition:"all 0.15s",whiteSpace:"nowrap",
    }}>
      <Filter size={11} strokeWidth={2.5}/>
      {label}
      {count!=null&&count>0&&(
        <span style={{background:C.indigo,color:"#fff",borderRadius:50,fontSize:10,fontWeight:800,
          padding:"1px 5px",lineHeight:1.4}}>
          {count}
        </span>
      )}
      {active&&onClear&&(
        <span onClick={e=>{e.stopPropagation();onClear();}} style={{
          display:"inline-flex",alignItems:"center",justifyContent:"center",
          background:"rgba(91,61,246,0.2)",borderRadius:"50%",width:14,height:14,
          cursor:"pointer",color:C.indigo,marginLeft:1,
        }}>
          <X size={8} strokeWidth={3}/>
        </span>
      )}
    </button>
  );
}

// ─── Preview Modal ─────────────────────────────────────────────────────────────
function PreviewModal({q,onClose}:{q:Question;onClose:()=>void}) {
  const [picked,setPicked]=useState<string|null>(null);
  const diffS=DIFF_STYLE[q.difficulty];
  const subS=SUBJECT_STYLE[q.subject]??{bg:C.indigoLight,text:C.indigo,dot:C.indigo};

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(27,30,43,0.4)",backdropFilter:"blur(3px)"}}/>
      <div style={{position:"relative",background:C.white,borderRadius:24,width:"100%",maxWidth:520,
        boxShadow:"0 24px 64px rgba(0,0,0,0.18)",overflow:"hidden",display:"flex",flexDirection:"column"}}>

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.indigo},#4228D4)`,padding:"20px 24px 18px",
          display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
              <span style={{background:"rgba(255,255,255,0.18)",borderRadius:7,padding:"3px 9px",
                fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.9)"}}>
                Question Preview
              </span>
              <span style={{background:diffS.bg,color:diffS.text,border:`1.5px solid ${diffS.border}`,
                borderRadius:7,padding:"3px 9px",fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700}}>
                {q.difficulty}
              </span>
              <TypeChip type={q.type}/>
            </div>
            <p style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,color:"#fff",margin:0,lineHeight:1.5}}>
              {q.text}
            </p>
          </div>
          <button type="button" onClick={onClose} style={{
            background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:7,
            cursor:"pointer",color:"#fff",display:"flex",flexShrink:0,
          }}>
            <X size={16} strokeWidth={2.5}/>
          </button>
        </div>

        {/* Meta strip */}
        <div style={{display:"flex",gap:12,padding:"12px 24px",borderBottom:`1.5px solid ${C.border}`,
          flexWrap:"wrap",alignItems:"center"}}>
          <SubjectBadge subject={q.subject}/>
          <div style={{display:"flex",alignItems:"center",gap:5,color:C.muted}}>
            <Tag size={12} strokeWidth={2}/>
            <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600}}>{q.topic}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,color:C.muted}}>
            <Clock size={12} strokeWidth={2}/>
            <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600}}>{q.timeLimit}s</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,color:C.muted}}>
            <Hash size={12} strokeWidth={2}/>
            <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600}}>{q.points} pt{q.points!==1?"s":""}</span>
          </div>
        </div>

        {/* Choices / answer */}
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:10,overflowY:"auto",maxHeight:320}}>
          {q.choices&&q.choices.length>0?(
            <>
              <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.muted,margin:0,
                textTransform:"uppercase",letterSpacing:"0.08em"}}>Choose the correct answer</p>
              {q.choices.map((ch,i)=>{
                const isAnswer=ch===q.answer;
                const isPicked=ch===picked;
                const showResult=picked!==null;
                let bg=C.white,border=C.border,textColor=C.navy;
                if(showResult&&isAnswer){bg=C.greenLight;border=C.greenBorder;textColor="#18A058";}
                else if(showResult&&isPicked&&!isAnswer){bg=C.redLight;border=C.redBorder;textColor=C.red;}
                else if(isPicked){bg=C.indigoLight;border=C.indigo;textColor=C.indigo;}
                return (
                  <button key={ch} type="button" onClick={()=>setPicked(ch)} style={{
                    width:"100%",background:bg,border:`1.5px solid ${border}`,borderRadius:14,
                    padding:"12px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",
                    transition:"all 0.15s",textAlign:"left",
                  }}>
                    <span style={{width:26,height:26,borderRadius:"50%",background:isPicked||showResult&&isAnswer
                      ?border:"rgba(0,0,0,0.06)",border:`2px solid ${border}`,display:"flex",
                      alignItems:"center",justifyContent:"center",flexShrink:0,
                      fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:800,color:textColor}}>
                      {["A","B","C","D"][i]}
                    </span>
                    <span style={{fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:500,color:textColor}}>
                      {ch}
                    </span>
                    {showResult&&isAnswer&&<CheckCircle2 size={16} color="#18A058" style={{marginLeft:"auto"}}/>}
                  </button>
                );
              })}
              {picked&&(
                <div style={{background:C.greenLight,borderRadius:12,padding:"10px 14px",
                  display:"flex",alignItems:"flex-start",gap:8,border:`1.5px solid ${C.greenBorder}`}}>
                  <CheckCircle2 size={15} color="#18A058" strokeWidth={2.5} style={{flexShrink:0,marginTop:1}}/>
                  <div>
                    <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:"#18A058",margin:0}}>
                      Correct Answer: {q.answer}
                    </p>
                    {q.explanation&&<p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:500,
                      color:"#18A058",margin:"3px 0 0",opacity:0.85,lineHeight:1.5}}>{q.explanation}</p>}
                  </div>
                </div>
              )}
            </>
          ):(
            <div>
              <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.muted,margin:"0 0 8px",
                textTransform:"uppercase",letterSpacing:"0.08em"}}>Answer</p>
              <div style={{background:C.greenLight,borderRadius:14,padding:"14px 16px",
                border:`1.5px solid ${C.greenBorder}`}}>
                <p style={{fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"#18A058",margin:0}}>
                  {q.answer}
                </p>
                {q.explanation&&<p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:500,
                  color:"#18A058",margin:"6px 0 0",opacity:0.8,lineHeight:1.5}}>{q.explanation}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {q.tags.length>0&&(
          <div style={{padding:"0 24px 20px",display:"flex",gap:6,flexWrap:"wrap"}}>
            {q.tags.map(tag=>(
              <span key={tag} style={{background:C.inputBg,borderRadius:7,padding:"3px 9px",
                fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:600,color:C.muted}}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add / Edit Question Modal ─────────────────────────────────────────────────
function QuestionModal({editing,onClose}:{editing?:Question;onClose:()=>void}) {
  const [text,setText]=useState(editing?.text??"");
  const [subject,setSubject]=useState(editing?.subject??"Mathematics");
  const [difficulty,setDifficulty]=useState(editing?.difficulty??"Easy");
  const [type,setType]=useState(editing?.type??"Multiple Choice");
  const [topic,setTopic]=useState(editing?.topic??"Algebra");
  const [answer,setAnswer]=useState(editing?.answer??"");
  const [points,setPoints]=useState(String(editing?.points??1));
  const [timeLimit,setTimeLimit]=useState(String(editing?.timeLimit??20));
  const [choices,setChoices]=useState<string[]>(editing?.choices??["","","",""]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(27,30,43,0.45)",backdropFilter:"blur(3px)"}}/>
      <div style={{position:"relative",background:C.white,borderRadius:24,width:"100%",maxWidth:560,
        boxShadow:"0 20px 60px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",maxHeight:"90vh",overflow:"hidden"}}>
        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.indigo},#4228D4)`,padding:"20px 24px",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:17,fontWeight:800,color:"#fff",margin:0}}>
              {editing?"Edit Question":"Add New Question"}
            </h3>
            <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,color:"rgba(255,255,255,0.6)",margin:"3px 0 0"}}>
              Fill in the question details below.
            </p>
          </div>
          <button type="button" onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",
            borderRadius:10,padding:7,cursor:"pointer",color:"#fff",display:"flex"}}>
            <X size={16} strokeWidth={2.5}/>
          </button>
        </div>

        {/* Body */}
        <div style={{overflowY:"auto",padding:"22px 24px",display:"flex",flexDirection:"column",gap:16,flex:1}}>
          {/* Question text */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Question Text</label>
            <textarea value={text} onChange={e=>setText(e.target.value)}
              placeholder="Enter your question here…"
              rows={3} style={{background:C.inputBg,border:"2px solid transparent",borderRadius:12,
                padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:500,
                color:C.navy,outline:"none",resize:"vertical",boxSizing:"border-box",width:"100%"}}/>
          </div>

          {/* Row: subject, difficulty */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {label:"Subject",v:subject,set:setSubject,opts:SUBJECTS.slice(1)},
              {label:"Difficulty",v:difficulty,set:setDifficulty,opts:DIFFICULTIES.slice(1)},
            ].map(f=>(
              <div key={f.label} style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>{f.label}</label>
                <Dropdown value={f.v} options={f.opts} onChange={f.set}/>
              </div>
            ))}
          </div>

          {/* Row: type, topic */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {label:"Question Type",v:type,set:setType,opts:QTYPES.slice(1)},
              {label:"Topic",v:topic,set:setTopic,opts:TOPICS[subject]??ALL_TOPICS.slice(1)},
            ].map(f=>(
              <div key={f.label} style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>{f.label}</label>
                <Dropdown value={f.v} options={f.opts} onChange={f.set}/>
              </div>
            ))}
          </div>

          {/* Choices (MC) */}
          {type==="Multiple Choice"&&(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Answer Choices</label>
              {choices.map((ch,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:24,height:24,borderRadius:"50%",background:C.indigoLight,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:800,color:C.indigo,flexShrink:0}}>
                    {["A","B","C","D"][i]}
                  </span>
                  <input value={ch} onChange={e=>{const n=[...choices];n[i]=e.target.value;setChoices(n);}}
                    placeholder={`Choice ${["A","B","C","D"][i]}`}
                    style={{flex:1,background:C.inputBg,border:"2px solid transparent",borderRadius:10,
                      padding:"9px 12px",fontFamily:"Manrope,sans-serif",fontSize:13,
                      fontWeight:500,color:C.navy,outline:"none"}}/>
                </div>
              ))}
            </div>
          )}

          {/* Correct answer */}
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Correct Answer</label>
            <input value={answer} onChange={e=>setAnswer(e.target.value)}
              placeholder="Enter the correct answer…"
              style={{background:C.greenLight,border:`2px solid ${C.greenBorder}`,borderRadius:10,
                padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:600,
                color:"#18A058",outline:"none"}}/>
          </div>

          {/* Points + time */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[
              {label:"Points",v:points,set:setPoints,placeholder:"e.g. 2"},
              {label:"Time Limit (sec)",v:timeLimit,set:setTimeLimit,placeholder:"e.g. 30"},
            ].map(f=>(
              <div key={f.label} style={{display:"flex",flexDirection:"column",gap:5}}>
                <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>{f.label}</label>
                <input value={f.v} onChange={e=>f.set(e.target.value)} placeholder={f.placeholder}
                  style={{background:C.inputBg,border:"2px solid transparent",borderRadius:10,
                    padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:13,
                    fontWeight:500,color:C.navy,outline:"none"}}/>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{padding:"14px 24px 20px",borderTop:`1.5px solid ${C.border}`,display:"flex",gap:10}}>
          <button type="button" onClick={onClose} style={{flex:1,background:C.inputBg,border:"none",borderRadius:12,
            padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:C.muted,cursor:"pointer"}}>
            Cancel
          </button>
          <button type="button" onClick={onClose} style={{flex:2,background:C.coral,border:"none",borderRadius:12,
            padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",
            boxShadow:`0 4px 14px rgba(255,107,74,0.3)`}}>
            {editing?"Save Changes":"Add Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() { 
  return <ProfSidebar />;
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search,setSearch]=useState("");
  const [subjectF,setSubjectF]=useState("All Subjects");
  const [diffF,setDiffF]=useState("All Difficulties");
  const [topicF,setTopicF]=useState("All Topics");
  const [typeF,setTypeF]=useState("All Types");
  const [sort,setSort]=useState("Newest First");
  const [selected,setSelected]=useState<Set<number>>(new Set());
  const [preview,setPreview]=useState<Question|null>(null);
  const [editQ,setEditQ]=useState<Question|undefined>();
  const [showAdd,setShowAdd]=useState(false);
  const [page,setPage]=useState(1);
  const [hoveredRow,setHoveredRow]=useState<number|null>(null);
  const [showFilterPanel,setShowFilterPanel]=useState(false);

  // --- FETCH APPROVED QUESTIONS FROM API ENDPOINT ON MOUNT ---
  useEffect(() => {
    async function fetchApprovedQuestions() {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data = await res.json();

        if (data && data.length > 0) {
          const formattedQuestions: Question[] = data.map((q: any) => {
            let parsedChoices: string[] = [];
            try {
              if (typeof q.choices === 'string') {
                const parsed = JSON.parse(q.choices);
                parsedChoices = Array.isArray(parsed) ? parsed.map((c: any) => typeof c === 'string' ? c : c.text) : [];
              } else if (Array.isArray(q.choices)) {
                parsedChoices = q.choices.map((c: any) => typeof c === 'string' ? c : c.text);
              }
            } catch (e) {
              parsedChoices = [];
            }

            let parsedExplanation = "Generated via AI RAG pipeline.";
            try {
              if (q.citation && typeof q.citation === 'string') {
                const cit = JSON.parse(q.citation);
                if (cit.excerpt) parsedExplanation = cit.excerpt;
              }
            } catch (e) {}

            return {
              id: q.id,
              text: q.text,
              subject: q.topic || "General",
              difficulty: q.difficulty || "Medium",
              topic: q.topic || "General",
              type: q.type || "Multiple Choice",
              points: 2,
              timeLimit: 30,
              choices: parsedChoices,
              answer: q.answer,
              explanation: parsedExplanation,
              tags: ["AI-Generated", q.topic || "General"],
              createdAt: q.createdAt ? q.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]
            };
          });

          setQuestions(formattedQuestions);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        console.error("Error loading user questions:", err);
      }
    }

    fetchApprovedQuestions();
  }, []);

  // --- DYNAMIC FILTER COMPUTATION ---
  const uniqueDbSubjects = Array.from(new Set(questions.map(q => q.subject || "General")));
  const dynamicSubjects = ["All Subjects", ...Array.from(new Set([...SUBJECTS.slice(1), ...uniqueDbSubjects])).sort()];

  const matchingQuestionsForTopic = subjectF === "All Subjects" ? questions : questions.filter(q => q.subject === subjectF);
  const uniqueDbTopics = Array.from(new Set(matchingQuestionsForTopic.map(q => q.topic || "General")));
  const defaultTopicsForSubject = subjectF === "All Subjects" ? ALL_TOPICS.slice(1) : (TOPICS[subjectF] || []);
  const dynamicTopics = ["All Topics", ...Array.from(new Set([...defaultTopicsForSubject, ...uniqueDbTopics])).sort()];
  // ----------------------------------

  // Active filter count
  const activeFilters=[subjectF,diffF,topicF,typeF].filter(v=>!v.startsWith("All")).length;

  const filtered=questions.filter(q=>{
    const s=search.toLowerCase();
    const matchSearch=!s||q.text.toLowerCase().includes(s)||q.subject.toLowerCase().includes(s)||
      q.topic.toLowerCase().includes(s)||q.tags.some(t=>t.toLowerCase().includes(s));
    return matchSearch&&
      (subjectF==="All Subjects"||q.subject===subjectF)&&
      (diffF==="All Difficulties"||q.difficulty===diffF)&&
      (topicF==="All Topics"||q.topic===topicF)&&
      (typeF==="All Types"||q.type===typeF);
  }).sort((a,b)=>{
    if(sort==="A → Z")return a.text.localeCompare(b.text);
    if(sort==="Z → A")return b.text.localeCompare(a.text);
    const dOrder=["Easy","Medium","Hard"];
    if(sort==="Difficulty ↑")return dOrder.indexOf(a.difficulty)-dOrder.indexOf(b.difficulty);
    if(sort==="Difficulty ↓")return dOrder.indexOf(b.difficulty)-dOrder.indexOf(a.difficulty);
    if(sort==="Oldest First")return a.id-b.id;
    return b.id-a.id; // Newest First
  });

  const totalPages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const curPage=Math.min(page,totalPages);
  const paged=filtered.slice((curPage-1)*PAGE_SIZE,curPage*PAGE_SIZE);
  const allPageSelected=paged.length>0&&paged.every(q=>selected.has(q.id));
  const someSelected=selected.size>0;

  function toggleAll(){
    if(allPageSelected){setSelected(s=>{const n=new Set(s);paged.forEach(q=>n.delete(q.id));return n;});}
    else{setSelected(s=>{const n=new Set(s);paged.forEach(q=>n.add(q.id));return n;});}
  }
  function toggleRow(id:number){
    setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  }

  // Summary counts mapped to state
  const totalByDiff={
    Easy:questions.filter(q=>q.difficulty==="Easy").length,
    Medium:questions.filter(q=>q.difficulty==="Medium").length,
    Hard:questions.filter(q=>q.difficulty==="Hard").length,
  };

  return (
    <div style={{display:"flex",height:"100vh",background:C.offWhite,overflow:"hidden"}}>
      <Sidebar/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

        {/* ── Top bar ── */}
        <div style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,padding:"0 24px",
          height:62,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:16,flex:1,minWidth:0}}>
            <h1 style={{fontFamily:"Manrope,sans-serif",fontSize:19,fontWeight:800,color:C.navy,
              margin:0,whiteSpace:"nowrap"}}>Question Bank</h1>
            {/* Search */}
            <div style={{position:"relative",maxWidth:280,flex:1}}>
              <Search size={14} color={C.muted} strokeWidth={2}
                style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}/>
              <input type="text" placeholder="Search questions, topics, tags…"
                value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} style={{
                  width:"100%",background:C.inputBg,border:"2px solid transparent",borderRadius:11,
                  padding:"8px 12px 8px 32px",fontFamily:"Manrope,sans-serif",fontSize:13,
                  fontWeight:500,color:C.navy,outline:"none",boxSizing:"border-box",
                }}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <FilterChip label="Subject" active={subjectF!=="All Subjects"}
                onClick={()=>setShowFilterPanel(v=>!v)}
                onClear={()=>{setSubjectF("All Subjects");setPage(1);}}/>
              <FilterChip label="Difficulty" active={diffF!=="All Difficulties"}
                onClick={()=>setShowFilterPanel(v=>!v)}
                onClear={()=>{setDiffF("All Difficulties");setPage(1);}}/>
              <FilterChip label="Topic" active={topicF!=="All Topics"}
                onClick={()=>setShowFilterPanel(v=>!v)}
                onClear={()=>{setTopicF("All Topics");setPage(1);}}/>
              <FilterChip label="Type" active={typeF!=="All Types"}
                onClick={()=>setShowFilterPanel(v=>!v)}
                onClear={()=>{setTypeF("All Types");setPage(1);}}/>
            </div>
            <Dropdown value={sort} options={SORT_OPTIONS} onChange={setSort} width={148}/>
            <button type="button" onClick={()=>setShowAdd(true)} style={{
              background:C.coral,border:"none",borderRadius:11,padding:"9px 15px",
              fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",
              display:"flex",alignItems:"center",gap:6,boxShadow:`0 3px 10px rgba(255,107,74,0.3)`,
              whiteSpace:"nowrap",
            }}>
              <Plus size={15} strokeWidth={2.5}/>Add Question
            </button>
          </div>
        </div>

        {/* ── Filter panel (dropdown) ── */}
        {showFilterPanel && (
          <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "14px 24px", display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[
              { 
                label: "Subject", 
                v: subjectF, 
                set: (v: string) => { setSubjectF(v); setTopicF("All Topics"); setPage(1); },
                opts: dynamicSubjects 
              },
              { label: "Difficulty", v: diffF, set: (v: string) => { setDiffF(v); setPage(1); }, opts: DIFFICULTIES },
              { 
                label: "Topic", 
                v: topicF, 
                set: (v: string) => { setTopicF(v); setPage(1); }, 
                opts: dynamicTopics 
              },
              { label: "Question Type", v: typeF, set: (v: string) => { setTypeF(v); setPage(1); }, opts: QTYPES },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 150 }}>
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{f.label}</span>
                <Dropdown value={f.v} options={f.opts} onChange={f.set} width={160} />
              </div>
            ))}
            <button type="button" onClick={() => setShowFilterPanel(false)} style={{ background: C.inputBg, border: "none", borderRadius: 10, padding: "8px 14px", fontFamily: "Manrope, sans-serif", fontSize: 12, fontWeight: 700, color: C.muted, cursor: "pointer", alignSelf: "flex-end" }}>Done</button>
          </div>
        )}

        {/* ── Body ── */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>

          {/* Summary strip */}
          <div style={{display:"flex",gap:12}}>
            {[
              {label:"Total Questions",val:questions.length,bg:C.indigoLight,color:C.indigo},
              {label:"Easy",val:totalByDiff.Easy,  bg:C.greenLight, color:"#18A058"},
              {label:"Medium",val:totalByDiff.Medium,bg:C.yellowLight,color:"#9A6C00"},
              {label:"Hard",val:totalByDiff.Hard,  bg:C.coralLight, color:"#C8441E"},
            ].map(s=>(
              <div key={s.label} style={{flex:1,background:C.white,borderRadius:14,padding:"12px 16px",
                border:`1.5px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:s.color}}/>
                <div>
                  <p style={{fontFamily:"Manrope,sans-serif",fontSize:20,fontWeight:800,
                    color:s.color,margin:0,lineHeight:1}}>{s.val}</p>
                  <p style={{fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:600,
                    color:C.muted,margin:"2px 0 0"}}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bulk action toolbar */}
          {someSelected&&(
            <div style={{background:C.navy,borderRadius:14,padding:"11px 18px",
              display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,
              boxShadow:"0 4px 16px rgba(27,30,43,0.18)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:700,color:"#fff"}}>
                  {selected.size} question{selected.size!==1?"s":""} selected
                </span>
                <button type="button" onClick={()=>setSelected(new Set())} style={{
                  background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,padding:"4px 10px",
                  fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",cursor:"pointer",
                }}>Deselect all</button>
              </div>
              <div style={{display:"flex",gap:8}}>
                {[
                  {icon:<Download size={14} strokeWidth={2}/>,label:"Export",bg:"rgba(255,255,255,0.12)",col:"#fff"},
                  {icon:<Upload size={14} strokeWidth={2}/>,label:"Import",bg:"rgba(255,255,255,0.12)",col:"#fff"},
                  {icon:<Copy size={14} strokeWidth={2}/>,label:"Duplicate",bg:"rgba(255,255,255,0.12)",col:"#fff"},
                  {icon:<Trash2 size={14} strokeWidth={2}/>,label:"Delete",bg:C.redLight,col:C.red},
                ].map(btn=>(
                  <button key={btn.label} type="button" style={{
                    display:"flex",alignItems:"center",gap:6,background:btn.bg,border:"none",borderRadius:9,
                    padding:"7px 13px",fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,
                    color:btn.col,cursor:"pointer",
                  }}>
                    {btn.icon}{btn.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Table */}
          <div style={{background:C.white,borderRadius:18,border:`1.5px solid ${C.border}`,
            overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,0.04)"}}>

            {/* Table header */}
            <div style={{display:"grid",gridTemplateColumns:"40px 1fr 140px 110px 130px 120px 100px",
              padding:"10px 16px",borderBottom:`1.5px solid ${C.border}`,
              background:"#F8F8FC",gap:8,alignItems:"center"}}>
              {/* Select all */}
              <button type="button" onClick={toggleAll} style={{
                background:"none",border:"none",cursor:"pointer",display:"flex",
                alignItems:"center",justifyContent:"center",color:allPageSelected?C.indigo:C.muted,padding:0,
              }}>
                {allPageSelected
                  ?<CheckSquare size={16} strokeWidth={2.5} color={C.indigo}/>
                  :<Square size={16} strokeWidth={2} color={C.muted}/>}
              </button>
              {["Question","Subject","Difficulty","Topic","Type","Actions"].map((h,i)=>(
                <span key={h} style={{fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700,
                  color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",
                  textAlign:i===5?"right":"left"}}>
                  {h}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {paged.length===0?(
              <div style={{padding:"60px 24px",textAlign:"center",display:"flex",flexDirection:"column",
                alignItems:"center",gap:10}}>
                <BookOpen size={36} color={C.muted} strokeWidth={1.5}/>
                <p style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,color:C.navy,margin:0}}>
                  No questions found</p>
                <p style={{fontFamily:"Manrope,sans-serif",fontSize:13,color:C.muted,margin:0}}>
                  Try adjusting your search or filters.</p>
              </div>
            ):paged.map((q,ri)=>{
              const isSelected=selected.has(q.id);
              const isHovered=hoveredRow===q.id;
              return (
                <div key={q.id}
                  onMouseEnter={()=>setHoveredRow(q.id)}
                  onMouseLeave={()=>setHoveredRow(null)}
                  style={{display:"grid",gridTemplateColumns:"40px 1fr 140px 110px 130px 120px 100px",
                    padding:"13px 16px",gap:8,alignItems:"center",cursor:"default",
                    background:isSelected?"rgba(91,61,246,0.04)":isHovered?"#FAFAFC":"#fff",
                    borderBottom:ri<paged.length-1?`1px solid ${C.border}`:"none",
                    transition:"background 0.12s",
                  }}>
                  {/* Checkbox */}
                  <button type="button" onClick={()=>toggleRow(q.id)} style={{
                    background:"none",border:"none",cursor:"pointer",display:"flex",
                    alignItems:"center",justifyContent:"center",color:isSelected?C.indigo:C.muted,padding:0,
                  }}>
                    {isSelected
                      ?<CheckSquare size={16} strokeWidth={2.5} color={C.indigo}/>
                      :<Square size={16} strokeWidth={2} color={isHovered?C.navy:C.muted} style={{opacity:isHovered?0.4:0.3}}/>}
                  </button>

                  {/* Question text */}
                  <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:0}}>
                    <p style={{fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:600,color:C.navy,
                      margin:0,lineHeight:1.4,overflow:"hidden",display:"-webkit-box",
                      WebkitLineClamp:2,WebkitBoxOrient:"vertical",textOverflow:"ellipsis"}}>
                      {q.text}
                    </p>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                      {[q.topic, q.type].filter(Boolean).map(t => (
                        <span key={t} style={{ background: C.inputBg, borderRadius: 5, padding: "2px 7px", fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: C.muted }}>
                          #{t.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <SubjectBadge subject={q.subject}/>
                  <DiffBadge difficulty={q.difficulty}/>

                  {/* Topic */}
                  <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600,color:C.muted,
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{q.topic}</span>

                  <TypeChip type={q.type}/>

                  {/* Actions */}
                  <div style={{display:"flex",gap:4,justifyContent:"flex-end",
                    opacity:isHovered||isSelected?1:0.35,transition:"opacity 0.12s"}}>
                    {[
                      {icon:<Eye size={14} strokeWidth={2}/>,tip:"Preview",cb:()=>setPreview(q),
                        bg:C.indigoLight,col:C.indigo},
                      {icon:<Pencil size={13} strokeWidth={2}/>,tip:"Edit",cb:()=>setEditQ(q),
                        bg:C.yellowLight,col:"#9A6C00"},
                      {icon:<Trash2 size={13} strokeWidth={2}/>,tip:"Delete",cb:()=>{},
                        bg:C.redLight,col:C.red},
                    ].map(btn=>(
                      <button key={btn.tip} type="button" onClick={btn.cb} title={btn.tip} style={{
                        background:btn.bg,border:"none",borderRadius:8,padding:"6px",
                        cursor:"pointer",display:"flex",alignItems:"center",color:btn.col,
                      }}>
                        {btn.icon}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            background:C.white,borderRadius:14,padding:"13px 18px",border:`1.5px solid ${C.border}`}}>
            <p style={{fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:600,color:C.muted,margin:0}}>
              Showing <strong style={{color:C.navy}}>{(curPage-1)*PAGE_SIZE+1}–{Math.min(curPage*PAGE_SIZE,filtered.length)}</strong>{" "}
              of <strong style={{color:C.navy}}>{filtered.length}</strong> questions
              {activeFilters>0&&(
                <button type="button" onClick={()=>{setSubjectF("All Subjects");setDiffF("All Difficulties");
                  setTopicF("All Topics");setTypeF("All Types");setPage(1);}} style={{
                    background:"none",border:"none",color:C.indigo,fontFamily:"Manrope,sans-serif",
                    fontSize:13,fontWeight:700,cursor:"pointer",marginLeft:8,padding:0,
                  }}>Clear filters</button>
              )}
            </p>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <button type="button" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={curPage===1} style={{
                background:curPage===1?C.inputBg:C.white,border:`1.5px solid ${C.border}`,borderRadius:9,
                padding:"6px 9px",cursor:curPage===1?"default":"pointer",
                color:curPage===1?C.muted:C.navy,display:"flex",opacity:curPage===1?0.4:1,
              }}>
                <ChevronLeft size={14} strokeWidth={2.5}/>
              </button>
              {Array.from({length:totalPages},(_,i)=>i+1)
                .filter(p=>p===1||p===totalPages||Math.abs(p-curPage)<=1)
                .reduce<(number|"…")[]>((acc,p,i,arr)=>{
                  if(i>0&&p-(arr[i-1] as number)>1)acc.push("…");
                  acc.push(p);return acc;
                },[])
                .map((p,i)=>
                  p==="…"
                  ?<span key={`e${i}`} style={{fontFamily:"Manrope,sans-serif",fontSize:13,color:C.muted,padding:"0 4px"}}>…</span>
                  :(
                    <button key={p} type="button" onClick={()=>setPage(p as number)} style={{
                      width:32,height:32,borderRadius:9,
                      background:p===curPage?C.indigo:C.white,
                      border:`1.5px solid ${p===curPage?C.indigo:C.border}`,
                      fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:700,
                      color:p===curPage?"#fff":C.navy,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                    }}>{p}</button>
                  )
                )}
              <button type="button" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={curPage===totalPages} style={{
                background:curPage===totalPages?C.inputBg:C.white,border:`1.5px solid ${C.border}`,borderRadius:9,
                padding:"6px 9px",cursor:curPage===totalPages?"default":"pointer",
                color:curPage===totalPages?C.muted:C.navy,display:"flex",opacity:curPage===totalPages?0.4:1,
              }}>
                <ChevronRight size={14} strokeWidth={2.5}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {preview&&<PreviewModal q={preview} onClose={()=>setPreview(null)}/>}
      {(showAdd||editQ)&&<QuestionModal editing={editQ} onClose={()=>{setShowAdd(false);setEditQ(undefined);}}/>}
    </div>
  );
}