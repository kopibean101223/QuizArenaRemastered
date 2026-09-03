import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ProfSidebar } from "../shared/ProfSidebar";
import {
  Search, Plus, ChevronDown, Pencil, Trash2, Eye, X,
  CheckSquare, Square, Download, Upload, SlidersHorizontal,
  ChevronLeft, ChevronRight, Trophy, LayoutDashboard, Library,
  BarChart2, Settings, Layers, LogOut, CheckCircle2, Filter,
  ArrowUpDown, Copy, BookOpen, Circle, ToggleLeft, AlignLeft,
  Hash, Tag, Clock, ChevronRight as Arrow, Folder, ArrowLeft,
  Code2, Sigma
} from "lucide-react";

// ─── Dynamic Color Helper ──────────────────────────────────────────────────────
function getTopicStyle(topicName: string) {
  const palettes = [
    { bg: "rgba(91,61,246,0.1)", text: "#5B3DF6", dot: "#5B3DF6" }, // Indigo
    { bg: "rgba(46,212,122,0.12)", text: "#18A058", dot: "#2ED47A" }, // Green
    { bg: "rgba(255,107,74,0.1)", text: "#C8441E", dot: "#FF6B4A" }, // Coral
    { bg: "rgba(91,200,246,0.15)", text: "#076E9A", dot: "#5BC8F6" }, // Blue
    { bg: "rgba(255,41,117,0.12)", text: "#D4195A", dot: "#FF2975" }, // Pink
    { bg: "rgba(157,78,221,0.12)", text: "#7B2CBF", dot: "#9D4EDD" }, // Purple
  ];

  let hash = 0;
  for (let i = 0; i < topicName.length; i++) {
    hash = topicName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % palettes.length;
  return palettes[index];
}

function TopicBadge({ topic }: { topic: string }) {
  const s = getTopicStyle(topic);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, 
      background: s.bg, color: s.text,
      borderRadius: 7, padding: "3px 8px", 
      fontFamily: "Manrope,sans-serif", fontSize: 11, fontWeight: 700, 
      whiteSpace: "nowrap", backdropFilter: "blur(4px)"
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {topic}
    </span>
  );
}

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
const QTYPES = ["All", "Multiple Choice", "True / False", "Identification", "Short Answer", "Mathematics", "Numerical Input", "Step-by-step Solution"];
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
  "Coding":          <Code2 size={11} strokeWidth={2.5}/>,
  "Mathematics":     <Sigma size={11} strokeWidth={2.5}/>,
};

interface Question {
  id: number; text: string; subject: string; difficulty: "Easy"|"Medium"|"Hard";
  topic: string; type: string; points: number; timeLimit: number;
  choices?: string[]; answer: string; explanation?: string; tags: string[];
  testCases?: {input: string, expectedOutput: string}[];
  createdAt: string;
}

const PAGE_SIZE = 8;

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

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(27,30,43,0.4)",backdropFilter:"blur(3px)"}}/>
      <div style={{position:"relative",background:C.white,borderRadius:24,width:"100%",maxWidth:520,
        boxShadow:"0 24px 64px rgba(0,0,0,0.18)",overflow:"hidden",display:"flex",flexDirection:"column"}}>
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

        <div style={{display:"flex",gap:12,padding:"12px 24px",borderBottom:`1.5px solid ${C.border}`,
          flexWrap:"wrap",alignItems:"center"}}>
          <TopicBadge topic={q.topic} />
          <SubjectBadge subject={q.subject} />
          <div style={{display:"flex",alignItems:"center",gap:5,color:C.muted}}>
            <Clock size={12} strokeWidth={2}/>
            <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600}}>{q.timeLimit}s</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:5,color:C.muted}}>
            <Hash size={12} strokeWidth={2}/>
            <span style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:600}}>{q.points} pt{q.points!==1?"s":""}</span>
          </div>
        </div>

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
            </>
          ):(
            <div>
              <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.muted,margin:"0 0 8px",
                textTransform:"uppercase",letterSpacing:"0.08em"}}>Answer</p>
              <div style={{background:C.greenLight,borderRadius:14,padding:"14px 16px",
                border:`1.5px solid ${C.greenBorder}`}}>
                <p style={{fontFamily:q.type==="Coding"?"monospace":"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"#18A058",margin:0,whiteSpace:"pre-wrap"}}>
                  {q.answer}
                </p>
              </div>
              
              {/* Display Test Cases if Coding */}
              {q.type === "Coding" && q.testCases && q.testCases.length > 0 && (
                <div style={{marginTop: 16}}>
                   <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.muted,margin:"0 0 8px",
                    textTransform:"uppercase",letterSpacing:"0.08em"}}>Test Cases</p>
                   {q.testCases.map((tc, idx) => (
                      <div key={idx} style={{background:C.inputBg, borderRadius:12, padding: "10px 14px", marginBottom: 8, display:"flex", gap: 12}}>
                         <div style={{flex: 1}}>
                            <span style={{fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 2}}>Input</span>
                            <span style={{fontFamily: "monospace", fontSize: 13, color: C.navy}}>{tc.input}</span>
                         </div>
                         <div style={{flex: 1}}>
                            <span style={{fontSize: 11, fontWeight: 700, color: C.muted, display: "block", marginBottom: 2}}>Expected Output</span>
                            <span style={{fontFamily: "monospace", fontSize: 13, color: C.navy}}>{tc.expectedOutput}</span>
                         </div>
                      </div>
                   ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Add Topic Modal ───────────────────────────────────────────────────────────
function TopicModal({onClose, onSave}:{onClose:()=>void, onSave:(topic: string, subject: string)=>void}) {
  const [topicName, setTopicName] = useState("");
  const [subject, setSubject] = useState("Mathematics");

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(27,30,43,0.45)",backdropFilter:"blur(3px)"}}/>
      <div style={{position:"relative",background:C.white,borderRadius:24,width:"100%",maxWidth:400,
        boxShadow:"0 20px 60px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        
        <div style={{background:`linear-gradient(135deg,${C.indigo},#4228D4)`,padding:"20px 24px",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:17,fontWeight:800,color:"#fff",margin:0}}>Add New Topic</h3>
            <p style={{fontFamily:"Manrope,sans-serif",fontSize:12,color:"rgba(255,255,255,0.6)",margin:"3px 0 0"}}>Organize your questions</p>
          </div>
          <button type="button" onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",
            borderRadius:10,padding:7,cursor:"pointer",color:"#fff",display:"flex"}}>
            <X size={16} strokeWidth={2.5}/>
          </button>
        </div>

        <div style={{padding:"22px 24px",display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Topic Name</label>
            <input value={topicName} onChange={e=>setTopicName(e.target.value)} placeholder="e.g. Advanced Calculus"
              style={{background:C.inputBg,border:"2px solid transparent",borderRadius:12,
                padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:500,
                color:C.navy,outline:"none",boxSizing:"border-box",width:"100%"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Subject</label>
            <Dropdown value={subject} options={SUBJECTS.slice(1)} onChange={setSubject}/>
          </div>
        </div>

        <div style={{padding:"14px 24px 20px",borderTop:`1.5px solid ${C.border}`,display:"flex",gap:10}}>
          <button type="button" onClick={onClose} style={{flex:1,background:C.inputBg,border:"none",borderRadius:12,
            padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:C.muted,cursor:"pointer"}}>
            Cancel
          </button>
          <button type="button" onClick={() => { if(topicName.trim()) onSave(topicName.trim(), subject); }} 
            style={{flex:2,background:C.coral,border:"none",borderRadius:12,
            padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",
            boxShadow:`0 4px 14px rgba(255,107,74,0.3)`}}>
            Save Topic
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add / Edit Question Modal ────────────────────────────────────────────────
function QuestionModal({editing, defaultTopic, onClose, onSaveSuccess}:{editing?:Question, defaultTopic?: string, onClose:()=>void, onSaveSuccess: (q: Question, isUpdate: boolean) => void}) {
  const [text,setText]=useState(editing?.text??"");
  const [subject,setSubject]=useState(editing?.subject??"Mathematics");
  const [difficulty,setDifficulty]=useState(editing?.difficulty??"Easy");
  const [type,setType]=useState(editing?.type??"Multiple Choice");
  const [topic,setTopic]=useState(editing?.topic??(defaultTopic || "Algebra"));
  const [answer,setAnswer]=useState(editing?.answer??"");
  const [points,setPoints]=useState(String(editing?.points??1));
  const [timeLimit,setTimeLimit]=useState(String(editing?.timeLimit?? (["Coding", "Mathematics"].includes(type) ? 300 : 60)));
  const [choices,setChoices]=useState<string[]>(editing?.choices??["","","",""]);
  const [testCases, setTestCases] = useState<{input: string, expectedOutput: string}[]>(editing?.testCases ?? [{input: "", expectedOutput: ""}]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!editing) setTimeLimit(["Coding", "Mathematics"].includes(type) ? "300" : "60");
  }, [type, editing]);

  const handleSave = async () => {
    // If editing, check if any fields were actually changed. If none, just close.
    if (editing) {
      const hasChanged = 
        text !== editing.text ||
        subject !== editing.subject ||
        difficulty !== editing.difficulty ||
        type !== editing.type ||
        topic !== editing.topic ||
        answer !== editing.answer ||
        points !== String(editing.points) ||
        timeLimit !== String(editing.timeLimit) ||
        JSON.stringify(choices) !== JSON.stringify(editing.choices) ||
        JSON.stringify(testCases) !== JSON.stringify(editing.testCases);

      if (!hasChanged) {
        onClose();
        return;
      }
    }

    setIsSaving(true);
    try {
      const payload = {
        id: editing?.id,
        text, subject, difficulty, type, topic, answer, 
        points: Number(points), timeLimit: Number(timeLimit),
        choices: type === "Multiple Choice" ? choices : [],
        testCases: type === "Coding" ? testCases : []
      };

      const method = editing ? "PUT" : "POST";

      const res = await fetch("/api/questions", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to save question");
      const savedQuestion = await res.json();
      onSaveSuccess(savedQuestion, !!editing);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(27,30,43,0.45)",backdropFilter:"blur(3px)"}}/>
      <div style={{position:"relative",background:C.white,borderRadius:24,width:"100%",maxWidth:560,
        boxShadow:"0 20px 60px rgba(0,0,0,0.18)",display:"flex",flexDirection:"column",maxHeight:"90vh",overflow:"hidden"}}>
        
        <div style={{background:`linear-gradient(135deg,${C.indigo},#4228D4)`,padding:"20px 24px",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:17,fontWeight:800,color:"#fff",margin:0}}>
              {editing?"Edit Question":"Add New Question"}
            </h3>
          </div>
          <button type="button" onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:7,cursor:"pointer",color:"#fff"}}>
            <X size={16} strokeWidth={2.5}/>
          </button>
        </div>

        <div style={{overflowY:"auto",padding:"22px 24px",display:"flex",flexDirection:"column",gap:16,flex:1}}>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Question Text</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter question..." rows={3}
              style={{background:C.inputBg,border:"2px solid transparent",borderRadius:12,padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:14,color:C.navy,outline:"none",width:"100%"}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Subject</label>
              <Dropdown value={subject} options={SUBJECTS.slice(1)} onChange={setSubject}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Difficulty</label>
              <Dropdown value={difficulty} options={DIFFICULTIES.slice(1)} onChange={(v) => setDifficulty(v as any)}/>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Question Type</label>
              <Dropdown value={type} options={QTYPES.slice(1)} onChange={setType}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Topic</label>
              <input value={topic} onChange={e=>setTopic(e.target.value)} disabled={!!defaultTopic} 
                style={{background:C.inputBg,border:"none",borderRadius:11,padding:"8px 12px",fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:500,color:defaultTopic?C.muted:C.navy,width:"100%",boxSizing:"border-box"}}/>
            </div>
          </div>

          {type === "Multiple Choice" && (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Answer Choices</label>
              {choices.map((ch,i)=>(
                 <input key={i} value={ch} onChange={e=>{const n=[...choices];n[i]=e.target.value;setChoices(n);}} 
                   placeholder={`Choice ${["A","B","C","D"][i]}`} style={{background:C.inputBg,border:"none",borderRadius:8,padding:"8px 12px",marginBottom:4,outline:"none"}}/>
              ))}
            </div>
          )}

          {type === "Coding" && (
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                 <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Test Cases</label>
                 <button type="button" onClick={() => setTestCases([...testCases, {input: "", expectedOutput: ""}])} style={{background:"none", border:"none", color: C.indigo, fontSize: 12, cursor:"pointer", fontWeight:700}}>+ Add Case</button>
              </div>
              {testCases.map((tc,i)=>(
                <div key={i} style={{display:"flex", gap:8}}>
                  <input value={tc.input} onChange={e=>{const n=[...testCases];n[i].input=e.target.value;setTestCases(n);}} placeholder="Input (e.g. [1, 2])" style={{flex:1, background:C.inputBg, border:"none", borderRadius:8, padding:8,outline:"none"}}/>
                  <input value={tc.expectedOutput} onChange={e=>{const n=[...testCases];n[i].expectedOutput=e.target.value;setTestCases(n);}} placeholder="Expected (e.g. 3)" style={{flex:1, background:C.inputBg, border:"none", borderRadius:8, padding:8,outline:"none"}}/>
                </div>
              ))}
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>
              {type === "Coding" ? "Correct Solution (Code)" : type === "Mathematics" ? "Final Answer / Formula" : "Correct Answer"}
            </label>
            <textarea value={answer} onChange={e=>setAnswer(e.target.value)} rows={type === "Coding" ? 4 : 1}
              style={{background:C.greenLight,border:`2px solid ${C.greenBorder}`,borderRadius:10,padding:"10px 14px",fontFamily:type==="Coding"?"monospace":"Manrope,sans-serif",fontSize:13,fontWeight:600,color:"#18A058",outline:"none"}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Points</label>
              <input value={points} onChange={e=>setPoints(e.target.value)} type="number"
                style={{background:C.inputBg,border:"none",borderRadius:10,padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:13,color:C.navy,outline:"none"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <label style={{fontFamily:"Manrope,sans-serif",fontSize:12,fontWeight:700,color:C.navy}}>Time Limit (sec)</label>
              <input value={timeLimit} onChange={e=>setTimeLimit(e.target.value)} type="number"
                style={{background:C.inputBg,border:"none",borderRadius:10,padding:"10px 14px",fontFamily:"Manrope,sans-serif",fontSize:13,color:C.navy,outline:"none"}}/>
            </div>
          </div>
        </div>

        <div style={{padding:"14px 24px 20px",borderTop:`1.5px solid ${C.border}`,display:"flex",gap:10}}>
          <button type="button" onClick={onClose} style={{flex:1,background:C.inputBg,border:"none",borderRadius:12,padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:C.muted,cursor:"pointer"}}>Cancel</button>
          <button type="button" onClick={handleSave} disabled={isSaving} style={{flex:2,background:C.coral,border:"none",borderRadius:12,padding:"11px",fontFamily:"Manrope,sans-serif",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer"}}>
            {isSaving ? "Saving..." : editing ? "Save Changes" : "Save to Database"}
          </button>
        </div>
      </div>
    </div>
  );
}



// ─── Main Page Component ───────────────────────────────────────────────────────
export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [customTopics, setCustomTopics] = useState<{name: string, subject: string}[]>([]);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const [search,setSearch]=useState("");
  const [subjectF,setSubjectF]=useState("All Subjects");
  const [diffF,setDiffF]=useState("All Difficulties");
  const [typeF,setTypeF]=useState("All Types");
  const [sort,setSort]=useState("Newest First");
  const [selected,setSelected]=useState<Set<number>>(new Set());
  const [preview,setPreview]=useState<Question|null>(null);
  const [editQ,setEditQ]=useState<Question|undefined>();
  const [showAddQuestion,setShowAddQuestion]=useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [page,setPage]=useState(1);
  const [hoveredRow,setHoveredRow]=useState<number|null>(null);
  const [showFilterPanel,setShowFilterPanel]=useState(false);

  // Load custom topics from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("quiz_custom_topics");
    if (saved) {
      try { setCustomTopics(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Fetch approved questions from API
 useEffect(() => {
  async function fetchApprovedQuestions() {
    try {
      const res = await fetch("/api/questions");
      if (!res.ok) throw new Error("Failed to fetch questions");

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server");
      }
      
      const data = await res.json();

      // Safely check if data is an array before mapping
      if (Array.isArray(data) && data.length > 0) {
        const formattedQuestions: Question[] = data.map((q: any) => {
          // FIX for [object Object] displaying in inputs
          let parsedChoices: string[] = [];
          try {
            let rawChoices = q.choices;
            if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
            if (Array.isArray(rawChoices)) {
              parsedChoices = rawChoices.map((c: any) => {
                if (typeof c === 'string') return c;
                if (typeof c === 'object' && c !== null) return c.text || c.label || "";
                return "";
              });
            }
          } catch (e) {
            parsedChoices = [];
          }

          return {
            id: q.id,
            text: q.text,
            subject: q.topic || "General",
            difficulty: q.difficulty || "Medium",
            topic: q.topic || "General",
            type: q.type || "Multiple Choice",
            points: 2,
            timeLimit: q.timeLimit || 60,
            choices: parsedChoices,
            testCases: Array.isArray(q.testCases) ? q.testCases : [],
            answer: q.answer,
            explanation: "Generated via AI RAG pipeline.",
            tags: ["AI-Generated", q.topic || "General"],
            createdAt: q.createdAt ? q.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]
          };
        });
        setQuestions(formattedQuestions);
      } else {
        // HANDLE NONE: Clear questions if the array is empty or null/undefined
        setQuestions([]);
      }
    } catch (err) {
      console.error("Error loading user questions:", err);
      setQuestions([]); // Fallback to empty state on error too
    }
  }
  fetchApprovedQuestions();
}, []);

  // Add new topic and save to LocalStorage
  const handleAddTopic = (name: string, subject: string) => {
    const updated = [...customTopics, { name, subject }];
    setCustomTopics(updated);
    localStorage.setItem("quiz_custom_topics", JSON.stringify(updated));
    setShowAddTopic(false);
  };

  // Callback when a question is saved (new or updated)
  const handleQuestionSaved = (newQ: Question, isUpdate: boolean) => {
    if (isUpdate) {
      setQuestions(prev => prev.map(q => q.id === newQ.id ? newQ : q));
    } else {
      setQuestions(prev => [newQ, ...prev]);
    }
    
    // Remove custom topic from LocalStorage once a question anchors it in DB
    setCustomTopics(prev => {
      const filtered = prev.filter(t => t.name !== newQ.topic);
      localStorage.setItem("quiz_custom_topics", JSON.stringify(filtered));
      return filtered;
    });

    setShowAddQuestion(false);
    setEditQ(undefined);
  };

  const allTopicCards = useMemo(() => {
    const map = new Map<string, {name: string, subject: string, count: number}>();
    
    questions.forEach(q => {
      const tName = q.topic || "General";
      if (!map.has(tName)) {
        map.set(tName, { name: tName, subject: q.subject, count: 1 });
      } else {
        map.get(tName)!.count += 1;
      }
    });

    customTopics.forEach(t => {
      if (!map.has(t.name)) {
        map.set(t.name, { name: t.name, subject: t.subject, count: 0 });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [questions, customTopics]);

  // ─── DERIVED STATE VARIABLES SECURELY PLACED HERE ───
  const activeFilters = [subjectF, diffF, typeF].filter(v => !v.startsWith("All")).length;

  const filtered = questions.filter(q => {
    const s = search.toLowerCase();
    const matchSearch = !s || q.text.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s);
    return q.topic === activeTopic && matchSearch &&
      (subjectF === "All Subjects" || q.subject === subjectF) &&
      (diffF === "All Difficulties" || q.difficulty === diffF) &&
      (typeF === "All Types" || q.type === typeF);
  }).sort((a, b) => {
    if (sort === "A → Z") return a.text.localeCompare(b.text);
    if (sort === "Z → A") return b.text.localeCompare(a.text);
    const dOrder = ["Easy", "Medium", "Hard"];
    if (sort === "Difficulty ↑") return dOrder.indexOf(a.difficulty) - dOrder.indexOf(b.difficulty);
    if (sort === "Difficulty ↓") return dOrder.indexOf(b.difficulty) - dOrder.indexOf(a.difficulty);
    if (sort === "Oldest First") return a.id - b.id;
    return b.id - a.id;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage = Math.min(page, totalPages);
  const paged = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const allPageSelected = paged.length > 0 && paged.every(q => selected.has(q.id));
  const someSelected = selected.size > 0;

  function toggleAll() {
    if (allPageSelected) { setSelected(s => { const n = new Set(s); paged.forEach(q => n.delete(q.id)); return n; }); }
    else { setSelected(s => { const n = new Set(s); paged.forEach(q => n.add(q.id)); return n; }); }
  }

  function toggleRow(id: number) {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const topicQuestions = questions.filter(q => q.topic === activeTopic);
  const totalByDiff = {
    Easy: topicQuestions.filter(q => q.difficulty === "Easy").length,
    Medium: topicQuestions.filter(q => q.difficulty === "Medium").length,
    Hard: topicQuestions.filter(q => q.difficulty === "Hard").length,
  };

  return (
    <div style={{display:"flex",height:"100vh",background:C.offWhite,overflow:"hidden"}}>
      <ProfSidebar />
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

        {/* ── Top bar ── */}
        <div style={{background:C.white,borderBottom:`1.5px solid ${C.border}`,padding:"0 24px",
          height:62,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:16,flex:1}}>
            {activeTopic ? (
               <button onClick={() => { setActiveTopic(null); setPage(1); setSearch(""); }} style={{
                 background: "none", border: "none", display: "flex", alignItems: "center", gap: 6,
                 fontFamily: "Manrope,sans-serif", fontSize: 13, fontWeight: 700, color: C.muted, cursor: "pointer"
               }}>
                 <ArrowLeft size={16} strokeWidth={2.5}/> Back to Topics
               </button>
            ) : (
               <h1 style={{fontFamily:"Manrope,sans-serif",fontSize:19,fontWeight:800,color:C.navy,margin:0}}>Question Topics</h1>
            )}

            <div style={{position:"relative",maxWidth:280,flex:1}}>
              <Search size={14} color={C.muted} strokeWidth={2} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}/>
              <input type="text" placeholder={activeTopic ? "Search questions..." : "Search topics..."}
                value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} style={{
                  width:"100%",background:C.inputBg,border:"2px solid transparent",borderRadius:11,
                  padding:"8px 12px 8px 32px",fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:500,color:C.navy,outline:"none"
                }}/>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
            {activeTopic && (
              <>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <FilterChip label="Subject" active={subjectF!=="All Subjects"}
                    onClick={()=>setShowFilterPanel(v=>!v)} onClear={()=>{setSubjectF("All Subjects");setPage(1);}}/>
                  <FilterChip label="Difficulty" active={diffF!=="All Difficulties"}
                    onClick={()=>setShowFilterPanel(v=>!v)} onClear={()=>{setDiffF("All Difficulties");setPage(1);}}/>
                  <FilterChip label="Type" active={typeF!=="All Types"}
                    onClick={()=>setShowFilterPanel(v=>!v)} onClear={()=>{setTypeF("All Types");setPage(1);}}/>
                </div>
                <Dropdown value={sort} options={SORT_OPTIONS} onChange={setSort} width={148}/>
              </>
            )}
            <button type="button" onClick={()=> activeTopic ? setShowAddQuestion(true) : setShowAddTopic(true)} style={{
              background:C.coral,border:"none",borderRadius:11,padding:"9px 15px",fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              <Plus size={15} strokeWidth={2.5}/>{activeTopic ? "Add Question" : "Add Topic"}
            </button>
          </div>
        </div>

        {/* ── Filter panel (dropdown) for Questions ── */}
        {showFilterPanel && activeTopic && (
          <div style={{ background: C.white, borderBottom: `1.5px solid ${C.border}`, padding: "14px 24px", display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[
              { label: "Subject", v: subjectF, set: (v: string) => { setSubjectF(v); setPage(1); }, opts: ["All Subjects", ...SUBJECTS.slice(1)] },
              { label: "Difficulty", v: diffF, set: (v: string) => { setDiffF(v); setPage(1); }, opts: DIFFICULTIES },
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

        {/* ── Main View ── */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 24px", display:"flex", flexDirection:"column", gap:16}}>
          {activeTopic === null ? (
            /* ── VIEW 1: TOPIC GRID ── */
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {allTopicCards
                .filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()))
                .map(topic => (
                <div key={topic.name} onClick={() => { setActiveTopic(topic.name); setPage(1); }} 
                  style={{ background: C.white, borderRadius: 18, border: `1.5px solid ${C.border}`, padding: "20px 24px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 2px 14px rgba(0,0,0,0.03)", transition: "transform 0.15s, box-shadow 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(0,0,0,0.03)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems:"flex-start" }}>
                    <div style={{ background: C.indigoLight, color: C.indigo, padding: 10, borderRadius: 12 }}>
                      <Folder size={20} strokeWidth={2.5} />
                    </div>
                    <TopicBadge topic={topic.name} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "Manrope,sans-serif", fontSize: 16, fontWeight: 800, color: C.navy, margin: "8px 0 4px" }}>{topic.name}</h3>
                    <p style={{ fontFamily: "Manrope,sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>{topic.count} Question{topic.count !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
              {allTopicCards.length === 0 && (
                 <div style={{ gridColumn: "1 / -1", padding: "60px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                   <Folder size={36} color={C.muted} strokeWidth={1.5}/>
                   <p style={{fontFamily:"Manrope,sans-serif",fontSize:15,fontWeight:700,color:C.navy,margin:0}}>No topics found</p>
                   <p style={{fontFamily:"Manrope,sans-serif",fontSize:13,color:C.muted,margin:0}}>Add a new topic to get started.</p>
                 </div>
              )}
            </div>
          ) : (
            /* ── VIEW 2: FULL QUESTION LIST FOR SELECTED TOPIC ── */
            <>
              {/* Summary strip */}
              <div style={{display:"flex",gap:12}}>
                {[
                  {label:"Total in Topic",val:topicQuestions.length,bg:C.indigoLight,color:C.indigo},
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
                <div style={{display:"grid",gridTemplateColumns:"40px 1fr 140px 110px 130px 100px",
                  padding:"10px 16px",borderBottom:`1.5px solid ${C.border}`,
                  background:"#F8F8FC",gap:8,alignItems:"center"}}>
                  <button type="button" onClick={toggleAll} style={{
                    background:"none",border:"none",cursor:"pointer",display:"flex",
                    alignItems:"center",justifyContent:"center",color:allPageSelected?C.indigo:C.muted,padding:0,
                  }}>
                    {allPageSelected ? <CheckSquare size={16} strokeWidth={2.5} color={C.indigo}/> : <Square size={16} strokeWidth={2} color={C.muted}/>}
                  </button>
                  {["Question","Subject","Difficulty","Type","Actions"].map((h,i)=>(
                    <span key={h} style={{fontFamily:"Manrope,sans-serif",fontSize:11,fontWeight:700,
                      color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",
                      textAlign:i===4?"right":"left"}}>
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
                      Try adjusting your search or filters, or add a new question to this topic.</p>
                  </div>
                ):paged.map((q,ri)=>{
                  const isSelected=selected.has(q.id);
                  const isHovered=hoveredRow===q.id;
                  return (
                    <div key={q.id}
                      onMouseEnter={()=>setHoveredRow(q.id)}
                      onMouseLeave={()=>setHoveredRow(null)}
                      style={{display:"grid",gridTemplateColumns:"40px 1fr 140px 110px 130px 100px",
                        padding:"13px 16px",gap:8,alignItems:"center",cursor:"default",
                        background:isSelected?"rgba(91,61,246,0.04)":isHovered?"#FAFAFC":"#fff",
                        borderBottom:ri<paged.length-1?`1px solid ${C.border}`:"none",
                        transition:"background 0.12s",
                      }}>
                      <button type="button" onClick={()=>toggleRow(q.id)} style={{
                        background:"none",border:"none",cursor:"pointer",display:"flex",
                        alignItems:"center",justifyContent:"center",color:isSelected?C.indigo:C.muted,padding:0,
                      }}>
                        {isSelected ? <CheckSquare size={16} strokeWidth={2.5} color={C.indigo}/> : <Square size={16} strokeWidth={2} color={isHovered?C.navy:C.muted} style={{opacity:isHovered?0.4:0.3}}/>}
                      </button>

                      <div style={{display:"flex",flexDirection:"column",gap:4,minWidth:0}}>
                        <p style={{fontFamily:"Manrope,sans-serif",fontSize:13,fontWeight:600,color:C.navy,
                          margin:0,lineHeight:1.4,overflow:"hidden",display:"-webkit-box",
                          WebkitLineClamp:2,WebkitBoxOrient:"vertical",textOverflow:"ellipsis"}}>
                          {q.text}
                        </p>
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                          {[q.type].filter(Boolean).map(t => (
                            <span key={t} style={{ background: C.inputBg, borderRadius: 5, padding: "2px 7px", fontFamily: "Manrope, sans-serif", fontSize: 10, fontWeight: 600, color: C.muted }}>
                              #{t.replace(/\s+/g, '')}
                            </span>
                          ))}
                        </div>
                      </div>

                      <SubjectBadge subject={q.subject}/>
                      <DiffBadge difficulty={q.difficulty}/>
                      <TypeChip type={q.type}/>

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
                      setTypeF("All Types");setPage(1);}} style={{
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
            </>
          )}
        </div>
      </div>

      {preview && <PreviewModal q={preview} onClose={()=>setPreview(null)}/>}
      {(showAddQuestion || editQ) && (
        <QuestionModal 
          defaultTopic={activeTopic || undefined} 
          editing={editQ} 
          onClose={()=>{setShowAddQuestion(false);setEditQ(undefined);}}
          onSaveSuccess={handleQuestionSaved}
        />
      )}
      {showAddTopic && <TopicModal onClose={()=>setShowAddTopic(false)} onSave={handleAddTopic}/>}
    </div>
  );
}