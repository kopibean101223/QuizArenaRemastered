import { useState, useEffect, useRef } from "react";
import { ProfSidebar } from "./shared/ProfSidebar";
import {
  TrendingUp, TrendingDown, Minus, Users, Zap, Clock,
  Search, ChevronDown, ChevronUp, ChevronsUpDown, Play, Pause,
  SkipForward, SkipBack, ExternalLink, Bell, Settings,
  BarChart2, BookOpen, Star, Award, ChevronRight, Download,
  RefreshCw, Activity,
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip as RTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

// ── Tokens ────────────────────────────────────────────────────────────────────
const C = {
  indigo:       "#5B3DF6", indigoDeep: "#4228D4",
  indigoLight:  "rgba(91,61,246,0.08)", indigoBorder: "rgba(91,61,246,0.18)",
  coral:        "#FF6B4A", coralDeep: "#D44A2A",
  coralLight:   "rgba(255,107,74,0.08)", coralBorder: "rgba(255,107,74,0.2)",
  yellow:       "#FFC93C", yellowLight: "rgba(255,201,60,0.09)",
  green:        "#2ED47A", greenLight:  "rgba(46,212,122,0.09)",
  red:          "#FF4757",
  navy:         "#1B1E2B",
  bg:           "#F5F6FA",
  surface:      "#FFFFFF",
  border:       "#E8EBF4",
  borderStrong: "#CDD2E4",
  text:         "#1B1E2B",
  textMid:      "#4A4E6A",
  textMuted:    "#8E93B0",
  shadow:       "0 2px 12px rgba(27,30,43,0.06)",
  shadowMd:     "0 4px 20px rgba(27,30,43,0.08)",
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV = [
  { icon:"🏠", label:"Dashboard", active:true },
  { icon:"📋", label:"My Sections"    },
  { icon:"❓", label:"Question Bank"  },
  { icon:"✨", label:"AI Generator"   },
  { icon:"⚔️",  label:"Matchmaking"   },
  { icon:"🔬", label:"Solution Analyzer" },
  { icon:"⚙️",  label:"Settings"      },
];
function Sidebar() { return <ProfSidebar />;
  return (
    <aside style={{ width:216, minWidth:216, background:C.navy, display:"flex",
      flexDirection:"column", padding:"20px 0", flexShrink:0 }}>
      <div style={{ padding:"0 18px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32,height:32,borderRadius:9,background:C.indigo,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🏆</div>
          <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:20,fontWeight:700,color:"#fff" }}>QuizArena</span>
        </div>
        <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,fontWeight:700,
          color:"rgba(255,255,255,0.28)",margin:"7px 0 0",letterSpacing:"0.06em",textTransform:"uppercase" }}>
          Professor Portal
        </p>
      </div>
      <nav style={{ flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2 }}>
        {NAV.map(n => (
          <div key={n.label} style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 11px",
            borderRadius:9,cursor:"pointer",transition:"background 0.12s",
            background:n.active?"rgba(91,61,246,0.22)":"transparent",
            border:n.active?"1px solid rgba(91,61,246,0.3)":"1px solid transparent" }}>
            <span style={{ fontSize:14 }}>{n.icon}</span>
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:n.active?700:500,
              color:n.active?"#fff":"rgba(255,255,255,0.42)" }}>{n.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:30,height:30,borderRadius:"50%",background:C.indigo,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:800,color:"#fff" }}>PR</div>
          <div>
            <p style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,color:"#fff",margin:0 }}>Prof. Reyes</p>
            <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,color:"rgba(255,255,255,0.32)",margin:0 }}>CS Dept</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimCount({ to, suffix="" }: { to:number; suffix?:string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const steps=40; let i=0;
    const iv = setInterval(()=>{ i++; setV(Math.round(to*i/steps)); if(i>=steps) clearInterval(iv); }, 20);
    return ()=>clearInterval(iv);
  },[to]);
  return <>{v.toLocaleString()}{suffix}</>;
}

// ── Card shell ────────────────────────────────────────────────────────────────
function Card({ children, style={} }: { children:React.ReactNode; style?:React.CSSProperties }) {
  return (
    <div style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:20,
      boxShadow:C.shadow, ...style }}>
      {children}
    </div>
  );
}

// ── Trend pill ────────────────────────────────────────────────────────────────
function Trend({ delta, unit="" }: { delta:number; unit?:string }) {
  const up = delta > 0, flat = delta===0;
  const col = up ? C.green : flat ? C.textMuted : C.red;
  const bg  = up ? C.greenLight : flat ? "rgba(0,0,0,0.04)" : C.coralLight;
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:3,
      background:bg, borderRadius:20, padding:"3px 9px" }}>
      {flat ? <Minus size={11} color={col} strokeWidth={2.5}/> :
       up   ? <TrendingUp size={11} color={col} strokeWidth={2.5}/> :
              <TrendingDown size={11} color={col} strokeWidth={2.5}/>}
      <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,color:col }}>
        {up?"+":""}{delta}{unit} vs last week
      </span>
    </span>
  );
}

// ── Row 1: Stat cards ─────────────────────────────────────────────────────────
const STATS = [
  { icon:<Zap size={18} fill={C.indigo} color="transparent"/>,
    label:"Active Battles", value:4, suffix:"",
    sub:"Across 3 sections", delta:2, unit:"", accent:C.indigo, accentLight:C.indigoLight,
    detail:[{l:"CS201-A",v:"2 live"},{l:"CS201-B",v:"1 live"},{l:"CS301-A",v:"1 live"}] },
  { icon:<Users size={18} color={C.coral} strokeWidth={2}/>,
    label:"Participation Rate", value:87, suffix:"%",
    sub:"28 / 32 students active", delta:5, unit:"%", accent:C.coral, accentLight:C.coralLight,
    detail:[{l:"Joined",v:"28"},{l:"Absent",v:"4"},{l:"Pending",v:"0"}] },
  { icon:<Clock size={18} color={C.green} strokeWidth={2}/>,
    label:"Avg Session Length", value:22, suffix:" min",
    sub:"Per quiz battle", delta:-3, unit:" min", accent:C.green, accentLight:C.greenLight,
    detail:[{l:"Shortest",v:"14 min"},{l:"Longest",v:"38 min"},{l:"Target",v:"25 min"}] },
];

function StatCards() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
      {STATS.map(s => (
        <Card key={s.label} style={{ padding:"20px 22px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ width:40,height:40,borderRadius:12,background:s.accentLight,
              display:"flex",alignItems:"center",justifyContent:"center" }}>{s.icon}</div>
            <Trend delta={s.delta} unit={s.unit}/>
          </div>
          <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
            color:C.textMuted,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.06em" }}>
            {s.label}
          </p>
          <p style={{ fontFamily:"Fredoka, sans-serif",fontSize:40,fontWeight:700,
            color:s.accent,margin:"0 0 3px",lineHeight:1 }}>
            <AnimCount to={s.value} suffix={s.suffix}/>
          </p>
          <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,color:C.textMuted,margin:"0 0 14px" }}>
            {s.sub}
          </p>
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10,
            display:"flex", gap:0 }}>
            {s.detail.map((d,i) => (
              <div key={d.l} style={{ flex:1, borderRight:i<s.detail.length-1?`1px solid ${C.border}`:"none",
                paddingInline:i===0?0:10 }}>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,color:C.textMuted,margin:"0 0 1px",
                  paddingLeft:i>0?0:0 }}>{d.l}</p>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
                  color:C.text,margin:0 }}>{d.v}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── Row 2 Left: Real-Time Analytics ──────────────────────────────────────────
const SESSIONS = ["CS201-A · Session 12","CS201-B · Session 8","CS301-A · Session 5"];
const LIVE_PLAYERS = [
  { name:"Trisha V.", initials:"TV", color:"#B06EF6", score:2440, q:9,  status:"correct" },
  { name:"Ana Cruz",  initials:"AC", color:"#5B3DF6", score:2180, q:8,  status:"correct" },
  { name:"Carlos B.", initials:"CB", color:"#FF6B4A", score:1960, q:9,  status:"wrong"   },
  { name:"Maria S.",  initials:"MS", color:"#2ED47A", score:1620, q:7,  status:"thinking"},
  { name:"Juan DT.",  initials:"JD", color:"#FFC93C", score:1280, q:6,  status:"thinking"},
  { name:"Bea R.",    initials:"BR", color:"#FF4757", score:980,  q:5,  status:"wrong"   },
];
const MEDALS = ["🥇","🥈","🥉"];

function RealTimePanel() {
  const [session, setSession] = useState(SESSIONS[0]);
  const [scores, setScores]   = useState(LIVE_PLAYERS.map(p=>p.score));
  const [tick, setTick]       = useState(0);

  // Simulate score updates
  useEffect(()=>{
    const iv = setInterval(()=>{
      setScores(s => s.map(v => v + Math.floor(Math.random()*60)));
      setTick(t=>t+1);
    }, 3200);
    return ()=>clearInterval(iv);
  },[]);

  const statusDot = (s:string) => ({
    correct: C.green, wrong: C.red, thinking: C.yellow,
  }[s] ?? C.textMuted);

  return (
    <Card style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:C.green,
            animation:"livePulse 1.4s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"Manrope, sans-serif",fontSize:14,fontWeight:800,color:C.text }}>
            Real-Time Match
          </span>
        </div>
        <div style={{ position:"relative" }}>
          <select value={session} onChange={e=>setSession(e.target.value)}
            style={{ appearance:"none", background:C.bg, border:`1.5px solid ${C.border}`,
              borderRadius:20, padding:"5px 28px 5px 12px", fontFamily:"Manrope, sans-serif",
              fontSize:12, fontWeight:700, color:C.text, cursor:"pointer", outline:"none" }}>
            {SESSIONS.map(s=><option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={11} color={C.textMuted}
            style={{ position:"absolute",right:9,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
        </div>
      </div>

      {/* Sub-bar: question progress */}
      <div style={{ padding:"8px 20px", borderBottom:`1px solid ${C.border}`, background:C.bg,
        display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
        <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,
          color:C.textMuted, whiteSpace:"nowrap" }}>Q 7 of 10</span>
        <div style={{ flex:1,height:5,background:C.border,borderRadius:50,overflow:"hidden" }}>
          <div style={{ width:"70%",height:"100%",background:C.indigo,borderRadius:50 }}/>
        </div>
        <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,
          color:C.indigo, whiteSpace:"nowrap" }}>00:14 left</span>
        <div style={{ display:"flex",alignItems:"center",gap:5,background:C.yellowLight,
          borderRadius:20,padding:"2px 10px",border:`1px solid rgba(255,201,60,0.3)` }}>
          <Zap size={10} fill={C.yellow} color="transparent"/>
          <span style={{ fontFamily:"Manrope, sans-serif",fontSize:10,fontWeight:800,
            color:"#A07000" }}>Speed Mode</span>
        </div>
      </div>

      {/* Player list */}
      <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
        {LIVE_PLAYERS.map((p, i) => (
          <div key={p.name} style={{ display:"flex",alignItems:"center",gap:10,
            padding:"8px 20px", transition:"background 0.1s",
            borderBottom:`1px solid ${C.border}` }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background=C.bg}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="transparent"}>
            {/* Rank */}
            <div style={{ width:24,textAlign:"center",flexShrink:0 }}>
              {i<3 ? <span style={{ fontSize:16 }}>{MEDALS[i]}</span>
                   : <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:14,fontWeight:700,
                       color:C.textMuted }}>#{i+1}</span>}
            </div>
            {/* Avatar */}
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:32,height:32,borderRadius:"50%",background:p.color,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:800,color:"#fff" }}>
                {p.initials}
              </div>
              <div style={{ position:"absolute",bottom:0,right:0,width:10,height:10,
                borderRadius:"50%",background:statusDot(p.status),
                border:"2px solid #fff" }}/>
            </div>
            {/* Name */}
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:13,fontWeight:600,
              color:C.text, flex:1, minWidth:0, overflow:"hidden",
              textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</span>
            {/* Q count */}
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,color:C.textMuted,
              flexShrink:0 }}>{p.q}/10 Qs</span>
            {/* Score */}
            <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:16,fontWeight:700,
              color:i<3?C.indigo:C.textMid, flexShrink:0, minWidth:56, textAlign:"right" }}>
              {scores[i].toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding:"10px 20px", borderTop:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,color:C.textMuted }}>
          {LIVE_PLAYERS.length} players · updated {tick}s ago
        </span>
        <button type="button" style={{ display:"flex",alignItems:"center",gap:5,
          background:"transparent", border:"none", cursor:"pointer",
          fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700, color:C.indigo }}>
          View Full Battle <ChevronRight size={13} strokeWidth={2.5}/>
        </button>
      </div>
    </Card>
  );
}

// ── Row 2 Right: Misconception Insights ──────────────────────────────────────
const DONUT_DATA = [
  { name:"Off-by-One",   value:14, color:"#C47A00" },
  { name:"Logical Error",value:11, color:"#1A8C4E" },
  { name:"Sign Error",   value:8,  color:"#D64242"  },
  { name:"Syntax Error", value:7,  color:"#5044CC"  },
  { name:"Comp. Mistake",value:6,  color:"#A0359A"  },
  { name:"Conceptual",   value:4,  color:"#1A72A8"  },
];
const BAR_DATA_TREND = [
  { week:"Wk 8",  count:18 },
  { week:"Wk 9",  count:24 },
  { week:"Wk 10", count:22 },
  { week:"Wk 11", count:28 },
  { week:"Wk 12", count:21 },
];
const FILTER_OPTS = {
  section:["All Sections","CS201-A","CS201-B","CS301-A"],
  topic:  ["All Topics","Searching","Sorting","Recursion","Arrays"],
  period: ["This Week","Last 2 Weeks","This Month","All Time"],
};

interface CustomPieTooltipProps { active?:boolean; payload?:{name:string;value:number}[]; }
function PieTooltip({ active, payload }: CustomPieTooltipProps) {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:10,
      padding:"7px 12px",boxShadow:C.shadow }}>
      <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
        color:C.text,margin:"0 0 2px" }}>{payload[0].name}</p>
      <p style={{ fontFamily:"Fredoka, sans-serif",fontSize:18,fontWeight:700,
        color:C.indigo,margin:0 }}>{payload[0].value} cases</p>
    </div>
  );
}

function MisconceptionPanel() {
  const [section, setSection] = useState(FILTER_OPTS.section[0]);
  const [topic,   setTopic]   = useState(FILTER_OPTS.topic[0]);
  const [period,  setPeriod]  = useState(FILTER_OPTS.period[0]);
  const [activeIdx, setActiveIdx] = useState<number|null>(null);
  const total = DONUT_DATA.reduce((a,d)=>a+d.value,0);

  return (
    <Card style={{ width:340, flexShrink:0, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <BarChart2 size={15} color={C.coral} strokeWidth={2}/>
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:14,fontWeight:800,color:C.text }}>
              Misconception Insights
            </span>
          </div>
          <button type="button" style={{ display:"flex",alignItems:"center",gap:4,
            background:"transparent",border:"none",cursor:"pointer",
            fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,color:C.indigo }}>
            View Details <ExternalLink size={11} strokeWidth={2.5}/>
          </button>
        </div>
        {/* Filters */}
        <div style={{ display:"flex",gap:5,marginTop:10,flexWrap:"wrap" }}>
          {([
            [section,setSection,FILTER_OPTS.section],
            [topic,  setTopic,  FILTER_OPTS.topic  ],
            [period, setPeriod, FILTER_OPTS.period  ],
          ] as const).map(([val,setter,opts],i)=>(
            <div key={i} style={{ position:"relative",flex:"1 1 80px",minWidth:80 }}>
              <select value={val as string}
                onChange={e=>(setter as (v:string)=>void)(e.target.value)}
                style={{ appearance:"none",width:"100%",background:C.bg,
                  border:`1.5px solid ${C.border}`,borderRadius:20,
                  padding:"4px 22px 4px 9px",fontFamily:"Manrope, sans-serif",
                  fontSize:10,fontWeight:700,color:C.text,cursor:"pointer",outline:"none" }}>
                {(opts as readonly string[]).map(o=><option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={10} color={C.textMuted}
                style={{ position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 20px",
        display:"flex", flexDirection:"column", gap:14 }}>
        {/* Donut + legend */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ position:"relative", width:120, height:120, flexShrink:0 }}>
            <PieChart width={120} height={120}>
              <Pie data={DONUT_DATA} cx={55} cy={55} innerRadius={36} outerRadius={52}
                dataKey="value" paddingAngle={2}
                onMouseEnter={(_,i)=>setActiveIdx(i)}
                onMouseLeave={()=>setActiveIdx(null)}>
                {DONUT_DATA.map((d,i) => (
                  <Cell key={`c-${i}`} fill={d.color} fillOpacity={activeIdx===i?1:0.72}
                    stroke={activeIdx===i?d.color:"transparent"} strokeWidth={2}/>
                ))}
              </Pie>
              <RTooltip content={<PieTooltip/>}/>
            </PieChart>
            {/* Center label */}
            <div style={{ position:"absolute",inset:0,display:"flex",
              flexDirection:"column",alignItems:"center",justifyContent:"center",
              pointerEvents:"none" }}>
              <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:20,fontWeight:700,
                color:C.text,lineHeight:1 }}>{total}</span>
              <span style={{ fontFamily:"Manrope, sans-serif",fontSize:9,fontWeight:700,
                color:C.textMuted }}>total</span>
            </div>
          </div>
          {/* Legend */}
          <div style={{ flex:1,display:"flex",flexDirection:"column",gap:4 }}>
            {DONUT_DATA.map((d,i) => (
              <div key={d.name} style={{ display:"flex",alignItems:"center",gap:6,
                padding:"2px 0",opacity:activeIdx===null||activeIdx===i?1:0.45,
                transition:"opacity 0.15s" }}>
                <div style={{ width:8,height:8,borderRadius:2,background:d.color,flexShrink:0 }}/>
                <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,
                  color:C.textMid,flex:1,overflow:"hidden",textOverflow:"ellipsis",
                  whiteSpace:"nowrap" }}>{d.name}</span>
                <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,
                  color:C.text,flexShrink:0 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend chart */}
        <div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:800,
              color:C.text }}>Weekly Trend</span>
            <div style={{ display:"flex",alignItems:"center",gap:4 }}>
              <TrendingDown size={12} color={C.green} strokeWidth={2.5}/>
              <span style={{ fontFamily:"Manrope, sans-serif",fontSize:10,fontWeight:700,
                color:C.green }}>−7 this week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={72}>
            <BarChart key="trend-bar" data={BAR_DATA_TREND} margin={{top:0,right:0,bottom:0,left:-20}}>
              <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke={C.border}/>
              <XAxis key="x" dataKey="week" tick={{ fontFamily:"Manrope, sans-serif",
                fontSize:9,fill:C.textMuted }} axisLine={false} tickLine={false}/>
              <YAxis key="y" hide/>
              <Bar key="bar" dataKey="count" fill={C.coral} fillOpacity={0.65}
                radius={[4,4,0,0]} barSize={22}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top misconception callout */}
        <div style={{ background:C.coralLight,border:`1.5px solid ${C.coralBorder}`,
          borderRadius:14,padding:"10px 12px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:5 }}>
            <TrendingUp size={12} color={C.coral} strokeWidth={2.5}/>
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:800,
              color:C.coral }}>Top Issue · Off-by-One (14 cases)</span>
          </div>
          <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,color:C.textMid,
            margin:0,lineHeight:1.6 }}>
            Concentrated in <strong>Searching</strong> and <strong>Arrays</strong> topics.
            Recommend targeted drill exercises before Quiz 5.
          </p>
          <button type="button" style={{ marginTop:8,display:"flex",alignItems:"center",
            gap:4,background:"transparent",border:"none",cursor:"pointer",padding:0,
            fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,color:C.coral }}>
            View per-student history <ExternalLink size={10} strokeWidth={2.5}/>
          </button>
        </div>
      </div>
    </Card>
  );
}

// ── Row 3: Results table ──────────────────────────────────────────────────────
interface ResultRow {
  id:number; name:string; initials:string; color:string; section:string;
  accuracy:number; correct:number; total:number; avg:number; quizzes:number; lastActive:string;
}
const RESULTS: ResultRow[] = [
  { id:1, name:"Trisha V.",   initials:"TV", color:"#B06EF6", section:"CS201-A", accuracy:92, correct:46, total:50, avg:2440, quizzes:5, lastActive:"Today" },
  { id:2, name:"Ana Cruz",    initials:"AC", color:"#5B3DF6", section:"CS201-A", accuracy:88, correct:44, total:50, avg:2180, quizzes:5, lastActive:"Today" },
  { id:3, name:"Carlos B.",   initials:"CB", color:"#FF6B4A", section:"CS201-B", accuracy:84, correct:42, total:50, avg:1960, quizzes:5, lastActive:"Today" },
  { id:4, name:"Maria S.",    initials:"MS", color:"#2ED47A", section:"CS201-A", accuracy:78, correct:39, total:50, avg:1620, quizzes:5, lastActive:"Yesterday" },
  { id:5, name:"Juan DT.",    initials:"JD", color:"#FFC93C", section:"CS201-B", accuracy:72, correct:36, total:50, avg:1280, quizzes:5, lastActive:"Yesterday" },
  { id:6, name:"Bea R.",      initials:"BR", color:"#FF4757", section:"CS301-A", accuracy:68, correct:34, total:50, avg:980,  quizzes:4, lastActive:"Jul 23"  },
  { id:7, name:"Leo T.",      initials:"LT", color:"#5BC8F6", section:"CS201-B", accuracy:64, correct:32, total:50, avg:860,  quizzes:4, lastActive:"Jul 23"  },
  { id:8, name:"Sam E.",      initials:"SE", color:"#43E97B", section:"CS301-A", accuracy:58, correct:29, total:50, avg:720,  quizzes:3, lastActive:"Jul 22"  },
];
type SortKey = "name"|"accuracy"|"avg";
type SortDir = "asc"|"desc";

function ResultsTable() {
  const [query,    setQuery]   = useState("");
  const [sortKey,  setSortKey] = useState<SortKey>("accuracy");
  const [sortDir,  setSortDir] = useState<SortDir>("desc");
  const [hovered,  setHovered] = useState<number|null>(null);

  function handleSort(k:SortKey) {
    if (k===sortKey) setSortDir(d=>d==="asc"?"desc":"asc");
    else { setSortKey(k); setSortDir("desc"); }
  }
  const SortIcon = ({ k }:{k:SortKey}) => {
    if (k!==sortKey) return <ChevronsUpDown size={12} color={C.textMuted} strokeWidth={2}/>;
    return sortDir==="asc" ? <ChevronUp size={12} color={C.indigo} strokeWidth={2.5}/> :
                             <ChevronDown size={12} color={C.indigo} strokeWidth={2.5}/>;
  };

  const rows = RESULTS
    .filter(r => r.name.toLowerCase().includes(query.toLowerCase()) ||
                 r.section.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b) => {
      const mul = sortDir==="asc"?1:-1;
      if (sortKey==="name")     return mul*(a.name.localeCompare(b.name));
      if (sortKey==="accuracy") return mul*(a.accuracy - b.accuracy);
      return mul*(a.avg - b.avg);
    });

  const accColor = (v:number) =>
    v>=85?C.green : v>=70?C.yellow : C.coral;

  return (
    <Card style={{ overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
        <div style={{ display:"flex",alignItems:"center",gap:7 }}>
          <Award size={15} color={C.indigo} strokeWidth={2}/>
          <span style={{ fontFamily:"Manrope, sans-serif",fontSize:14,fontWeight:800,color:C.text }}>
            Student Results
          </span>
        </div>
        {/* Search */}
        <div style={{ position:"relative", flex:"1 1 200px", maxWidth:280 }}>
          <Search size={14} color={C.textMuted}
            style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}/>
          <input value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Search student or section…"
            style={{ width:"100%",paddingLeft:34,paddingRight:12,paddingBlock:7,
              border:`1.5px solid ${C.border}`,borderRadius:20,fontFamily:"Manrope, sans-serif",
              fontSize:12,fontWeight:500,color:C.text,background:C.bg,outline:"none",
              boxSizing:"border-box" }}/>
        </div>
        <button type="button" style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:6,
          padding:"7px 14px",borderRadius:20,border:`1.5px solid ${C.borderStrong}`,
          background:"transparent",cursor:"pointer",fontFamily:"Manrope, sans-serif",
          fontSize:11,fontWeight:700,color:C.textMid }}>
          <Download size={12} strokeWidth={2.5}/> Export
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX:"auto" }}>
        {/* Thead */}
        <div style={{ display:"grid",
          gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 100px",
          gap:0, padding:"9px 20px", background:C.bg,
          borderBottom:`1.5px solid ${C.border}` }}>
          {[
            { k:"name"     as SortKey, l:"Student",     sort:true  },
            { k:"accuracy" as SortKey, l:"Accuracy",    sort:true  },
            { k:"avg"      as SortKey, l:"Avg Score",   sort:true  },
            { k:null,                  l:"Correct",     sort:false },
            { k:null,                  l:"Quizzes",     sort:false },
            { k:null,                  l:"Last Active", sort:false },
          ].map((col,i) => (
            <div key={i} style={{ display:"flex",alignItems:"center",gap:4,
              cursor:col.sort?"pointer":"default" }}
              onClick={()=>col.sort&&col.k&&handleSort(col.k)}>
              <span style={{ fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,
                color:col.sort&&col.k===sortKey?C.indigo:C.textMuted,
                textTransform:"uppercase",letterSpacing:"0.05em" }}>{col.l}</span>
              {col.sort && col.k && <SortIcon k={col.k as SortKey}/>}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((r,idx) => (
          <div key={r.id}
            onMouseEnter={()=>setHovered(r.id)}
            onMouseLeave={()=>setHovered(null)}
            style={{ display:"grid",
              gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 100px",
              gap:0, padding:"11px 20px", alignItems:"center",
              borderBottom:idx<rows.length-1?`1px solid ${C.border}`:"none",
              background:hovered===r.id?"#EFF1FC":idx%2===0?C.surface:C.bg,
              transition:"background 0.1s" }}>
            {/* Student */}
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:32,height:32,borderRadius:"50%",background:r.color,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:800,color:"#fff",
                flexShrink:0 }}>{r.initials}</div>
              <div>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:13,fontWeight:700,
                  color:C.text,margin:0 }}>{r.name}</p>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:11,
                  color:C.textMuted,margin:0 }}>{r.section}</p>
              </div>
            </div>
            {/* Accuracy */}
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:3 }}>
                <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:17,fontWeight:700,
                  color:accColor(r.accuracy) }}>{r.accuracy}%</span>
              </div>
              <div style={{ height:4,background:C.border,borderRadius:50,width:80 }}>
                <div style={{ height:"100%",width:`${r.accuracy}%`,borderRadius:50,
                  background:accColor(r.accuracy),transition:"width 0.6s" }}/>
              </div>
            </div>
            {/* Avg score */}
            <span style={{ fontFamily:"Fredoka, sans-serif",fontSize:15,fontWeight:700,
              color:C.textMid }}>{r.avg.toLocaleString()}</span>
            {/* Correct */}
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:13,fontWeight:600,
              color:C.text }}>{r.correct}<span style={{ color:C.textMuted,fontWeight:400 }}>/{r.total}</span></span>
            {/* Quizzes */}
            <div style={{ display:"flex",gap:3 }}>
              {Array.from({length:5}).map((_,qi)=>(
                <div key={qi} style={{ width:8,height:8,borderRadius:2,
                  background:qi<r.quizzes?C.indigo:C.border }}/>
              ))}
            </div>
            {/* Last active */}
            <span style={{ fontFamily:"Manrope, sans-serif",fontSize:12,
              color:r.lastActive==="Today"?C.green:C.textMuted,fontWeight:r.lastActive==="Today"?700:400 }}>
              {r.lastActive}
            </span>
          </div>
        ))}
        {rows.length===0&&(
          <div style={{ padding:"28px",textAlign:"center" }}>
            <p style={{ fontFamily:"Manrope, sans-serif",fontSize:13,color:C.textMuted }}>No results match your search.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// ── Row 4: Session Replay ─────────────────────────────────────────────────────
interface SessionClip {
  id:number; title:string; section:string; date:string; duration:string;
  students:number; avgScore:number; color:string; emoji:string;
}
const CLIPS: SessionClip[] = [
  { id:1, title:"Binary Search Battle",  section:"CS201-A", date:"Jul 24", duration:"22 min", students:30, avgScore:1840, color:"#5B3DF6", emoji:"🔍" },
  { id:2, title:"Sorting Showdown",      section:"CS201-B", date:"Jul 22", duration:"28 min", students:28, avgScore:1620, color:"#FF6B4A", emoji:"⚡" },
  { id:3, title:"Recursion Rumble",      section:"CS201-A", date:"Jul 20", duration:"31 min", students:32, avgScore:1480, color:"#2ED47A", emoji:"🌀" },
  { id:4, title:"Stack & Queue Sprint",  section:"CS301-A", date:"Jul 18", duration:"19 min", students:25, avgScore:2010, color:"#FFC93C", emoji:"📦" },
  { id:5, title:"Array Arena",           section:"CS201-B", date:"Jul 15", duration:"24 min", students:29, avgScore:1760, color:"#B06EF6", emoji:"🎯" },
];
type PlayState = "idle"|"playing"|"paused";

function SessionReplay() {
  const [selected,  setSelected]  = useState<number>(1);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [progress,  setProgress]  = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>|null>(null);

  function startPlay() {
    setPlayState("playing");
    intervalRef.current = setInterval(()=>{
      setProgress(p=>{
        if(p>=100){ clearInterval(intervalRef.current!); setPlayState("idle"); return 0; }
        return p+0.7;
      });
    }, 80);
  }
  function pause()  { clearInterval(intervalRef.current!); setPlayState("paused"); }
  function resume() { startPlay(); }
  function step(dir:1|-1) {
    clearInterval(intervalRef.current!); setPlayState("idle");
    setProgress(p=>Math.max(0,Math.min(100,p+dir*10)));
  }
  function handlePlayPause() {
    if (playState==="idle")    startPlay();
    else if(playState==="playing") pause();
    else resume();
  }
  function handleSelect(id:number) {
    clearInterval(intervalRef.current!);
    setSelected(id); setPlayState("idle"); setProgress(0);
  }

  const clip = CLIPS.find(c=>c.id===selected)!;

  return (
    <Card>
      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex",alignItems:"center",gap:7 }}>
          <Play size={15} fill={C.indigo} color="transparent"/>
          <span style={{ fontFamily:"Manrope, sans-serif",fontSize:14,fontWeight:800,color:C.text }}>
            Session Replay
          </span>
          <span style={{ background:C.indigoLight,border:`1px solid ${C.indigoBorder}`,
            borderRadius:20,padding:"2px 9px",fontFamily:"Manrope, sans-serif",
            fontSize:10,fontWeight:700,color:C.indigo }}>{CLIPS.length} sessions</span>
        </div>
        <button type="button" style={{ display:"flex",alignItems:"center",gap:4,
          background:"transparent",border:"none",cursor:"pointer",
          fontFamily:"Manrope, sans-serif",fontSize:11,fontWeight:700,color:C.indigo }}>
          View All <ChevronRight size={12} strokeWidth={2.5}/>
        </button>
      </div>

      <div style={{ display:"flex", gap:0 }}>
        {/* Thumbnail strip */}
        <div style={{ flex:1, padding:"14px 16px 14px 20px",
          display:"flex", gap:10, overflowX:"auto" }}>
          {CLIPS.map(c => (
            <div key={c.id} onClick={()=>handleSelect(c.id)}
              style={{ width:160, flexShrink:0, cursor:"pointer",
                border:`2px solid ${selected===c.id?c.color:C.border}`,
                borderRadius:16, overflow:"hidden", transition:"all 0.15s",
                boxShadow:selected===c.id?`0 4px 16px ${c.color}33`:C.shadow }}>
              {/* Thumbnail */}
              <div style={{ height:92, background:`linear-gradient(135deg,${c.color}22,${c.color}44)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative" }}>
                <span style={{ fontSize:36 }}>{c.emoji}</span>
                {/* Play overlay */}
                <div style={{ position:"absolute",inset:0,display:"flex",
                  alignItems:"center",justifyContent:"center",
                  background:"rgba(0,0,0,0.0)",transition:"background 0.15s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(0,0,0,0.18)"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(0,0,0,0)"}>
                  <div style={{ width:32,height:32,borderRadius:"50%",
                    background:"rgba(255,255,255,0.92)",
                    display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <Play size={13} fill={c.color} color="transparent"/>
                  </div>
                </div>
                {selected===c.id&&playState==="playing"&&(
                  <div style={{ position:"absolute",top:6,right:6,width:8,height:8,
                    borderRadius:"50%",background:C.green,
                    animation:"livePulse 1s ease-in-out infinite" }}/>
                )}
              </div>
              {/* Meta */}
              <div style={{ padding:"8px 10px", background:C.surface }}>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
                  color:C.text,margin:"0 0 2px",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                  {c.title}
                </p>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,color:C.textMuted,margin:0 }}>
                  {c.section} · {c.date} · {c.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Playback controls panel */}
        <div style={{ width:240, borderLeft:`1px solid ${C.border}`, padding:"14px 18px",
          display:"flex", flexDirection:"column", gap:12, flexShrink:0 }}>
          {/* Now playing */}
          <div>
            <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,fontWeight:700,
              color:C.textMuted,margin:"0 0 6px",textTransform:"uppercase",
              letterSpacing:"0.06em" }}>Now Playing</p>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:36,height:36,borderRadius:10,
                background:`linear-gradient(135deg,${clip.color}33,${clip.color}66)`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
                flexShrink:0 }}>{clip.emoji}</div>
              <div>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
                  color:C.text,margin:0,lineHeight:1.3 }}>{clip.title}</p>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:10,
                  color:C.textMuted,margin:0 }}>{clip.section} · {clip.date}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ height:6,background:C.border,borderRadius:50,
              overflow:"hidden",cursor:"pointer",marginBottom:5 }}
              onClick={e=>{
                const r=(e.currentTarget as HTMLElement).getBoundingClientRect();
                setProgress(((e.clientX-r.left)/r.width)*100);
              }}>
              <div style={{ height:"100%",width:`${progress}%`,
                background:`linear-gradient(90deg,${clip.color},${clip.color}bb)`,
                borderRadius:50,transition:"width 0.08s linear" }}/>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between" }}>
              <span style={{ fontFamily:"Manrope, sans-serif",fontSize:10,color:C.textMuted }}>
                {Math.floor(progress/100*parseInt(clip.duration))} min
              </span>
              <span style={{ fontFamily:"Manrope, sans-serif",fontSize:10,color:C.textMuted }}>
                {clip.duration}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
            <button type="button" onClick={()=>step(-1)}
              style={{ width:32,height:32,borderRadius:"50%",
                border:`1.5px solid ${C.border}`,background:C.bg,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",color:C.textMid }}>
              <SkipBack size={14} strokeWidth={2}/>
            </button>
            <button type="button" onClick={handlePlayPause}
              style={{ width:42,height:42,borderRadius:"50%",border:"none",
                background:clip.color,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 4px 12px ${clip.color}55` }}>
              {playState==="playing"
                ? <Pause size={16} fill="#fff" color="transparent"/>
                : <Play size={16} fill="#fff" color="transparent"/>}
            </button>
            <button type="button" onClick={()=>step(1)}
              style={{ width:32,height:32,borderRadius:"50%",
                border:`1.5px solid ${C.border}`,background:C.bg,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",color:C.textMid }}>
              <SkipForward size={14} strokeWidth={2}/>
            </button>
          </div>

          {/* Session stats */}
          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10,
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["Students",clip.students],["Avg Score",clip.avgScore.toLocaleString()],
              ["Duration",clip.duration],["Section",clip.section]].map(([l,v])=>(
              <div key={l as string}>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:9,fontWeight:700,
                  color:C.textMuted,margin:"0 0 1px",textTransform:"uppercase",
                  letterSpacing:"0.05em" }}>{l}</p>
                <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
                  color:C.text,margin:0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export function ProfessorDashboard() {
  const [notifCount] = useState(3);

  return (
    <>
      <style>{`
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.25)} }
        @keyframes fadeIn    { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
        select option { background:#fff; color:#1B1E2B; }
      `}</style>

      <div style={{ display:"flex", height:"100vh", overflow:"hidden",
        fontFamily:"Manrope, sans-serif", background:C.bg }}>
        <Sidebar/>

        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Top bar */}
          <div style={{ background:C.surface, borderBottom:`1.5px solid ${C.border}`,
            padding:"12px 28px", display:"flex", alignItems:"center",
            justifyContent:"space-between", flexShrink:0 }}>
            <div>
              <h1 style={{ fontFamily:"Manrope, sans-serif",fontSize:22,fontWeight:800,
                color:C.text,margin:0 }}>Dashboard</h1>
              <p style={{ fontFamily:"Manrope, sans-serif",fontSize:12,color:C.textMuted,
                margin:"2px 0 0" }}>
                Sunday, July 26, 2026 · CS Department
              </p>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,
                background:C.greenLight,border:`1.5px solid ${C.greenBorder ?? "rgba(46,212,122,0.25)"}`,
                borderRadius:20,padding:"6px 14px" }}>
                <Activity size={12} color={C.green} strokeWidth={2.5}/>
                <span style={{ fontFamily:"Manrope, sans-serif",fontSize:12,fontWeight:700,
                  color:C.green }}>4 Live Battles</span>
              </div>
              <button type="button" style={{ position:"relative",width:38,height:38,
                borderRadius:"50%",background:C.bg,
                border:`1.5px solid ${C.border}`,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:C.textMid }}>
                <Bell size={16} strokeWidth={2}/>
                {notifCount>0&&(
                  <div style={{ position:"absolute",top:5,right:5,width:16,height:16,
                    borderRadius:"50%",background:C.yellow,
                    display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <span style={{ fontFamily:"Manrope, sans-serif",fontSize:8,
                      fontWeight:800,color:"#7A5A00" }}>{notifCount}</span>
                  </div>
                )}
              </button>
              <button type="button" style={{ width:38,height:38,borderRadius:"50%",
                background:C.bg,border:`1.5px solid ${C.border}`,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",color:C.textMid }}>
                <Settings size={16} strokeWidth={2}/>
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div style={{ flex:1, overflowY:"auto", padding:"20px 28px",
            display:"flex", flexDirection:"column", gap:18,
            animation:"fadeIn 0.25s ease-out" }}>

            {/* Row 1: stat cards */}
            <StatCards/>

            {/* Row 2: analytics + misconceptions */}
            <div style={{ display:"flex", gap:16, minHeight:380 }}>
              <RealTimePanel/>
              <MisconceptionPanel/>
            </div>

            {/* Row 3: results table */}
            <ResultsTable/>

            {/* Row 4: session replay */}
            <SessionReplay/>

            {/* Bottom padding */}
            <div style={{ height:8 }}/>
          </div>
        </div>
      </div>
    </>
  );
}
