// import { useState, useEffect, useRef } from "react";
// import { useApp } from "../../context/AppContext";
// import { StudentTopBar } from "../shared/StudentTopBar";
// import {
//   Trophy, Star, Share2, RotateCcw, LogOut,
//   CheckCircle2, Zap, Target, Crown, Flame,
//   ChevronUp, ChevronDown, Minus, X, Copy, Check,
// } from "lucide-react";

// const C = {
//   indigo: "#5B3DF6", indigoDeep: "#4228D4",
//   indigoLight: "rgba(91,61,246,0.15)", indigoGlow: "rgba(91,61,246,0.4)",
//   coral: "#FF6B4A", coralDeep: "#D44A2A",
//   coralLight: "rgba(255,107,74,0.15)", coralGlow: "rgba(255,107,74,0.4)",
//   yellow: "#FFC93C", yellowDeep: "#E8A800",
//   yellowLight: "rgba(255,201,60,0.15)", yellowGlow: "rgba(255,201,60,0.5)",
//   green: "#2ED47A", greenDeep: "#18A058",
//   greenLight: "rgba(46,212,122,0.12)",
//   red: "#FF4757",
//   navy: "#1B1E2B", navyLight: "#252840", navyMid: "#1F223A",
//   white: "#FFFFFF", offWhite: "#FAFAFC",
//   muted: "rgba(255,255,255,0.4)",
// };

// const AVATAR_COLORS = [
//   "#5B3DF6","#FF6B4A","#2ED47A","#FFC93C",
//   "#FF4757","#5BC8F6","#B06EF6","#FF9F40","#E040FB","#43E97B",
// ];

// // ── Mock results data ──────────────────────────────────────────────────────────
// interface Player {
//   id: number; name: string; initials: string; color: string;
//   score: number; correct: number; total: number; speedBonus: number;
//   accuracy: number; streak: number; rank: number; isMe: boolean;
//   delta: number; // rank change vs previous battle
// }

// const PLAYERS: Player[] = [
//   { id:1, name:"Trisha V.",    initials:"TV", color:AVATAR_COLORS[6], score:2440, correct:9,  total:10, speedBonus:380, accuracy:90, streak:5, rank:1, isMe:false, delta: 2 },
//   { id:2, name:"You",          initials:"ME", color:AVATAR_COLORS[0], score:2180, correct:8,  total:10, speedBonus:340, accuracy:80, streak:3, rank:2, isMe:true,  delta: 1 },
//   { id:3, name:"Ana R.",       initials:"AR", color:AVATAR_COLORS[1], score:1960, correct:8,  total:10, speedBonus:240, accuracy:80, streak:4, rank:3, isMe:false, delta:-1 },
//   { id:4, name:"Carlo B.",     initials:"CB", color:AVATAR_COLORS[2], score:1620, correct:7,  total:10, speedBonus:220, accuracy:70, streak:2, rank:4, isMe:false, delta: 0 },
//   { id:5, name:"Maria S.",     initials:"MS", color:AVATAR_COLORS[3], score:1280, correct:6,  total:10, speedBonus:160, accuracy:60, streak:1, rank:5, isMe:false, delta:-2 },
//   { id:6, name:"Juan DT.",     initials:"JD", color:AVATAR_COLORS[4], score:1100, correct:5,  total:10, speedBonus:200, accuracy:50, streak:0, rank:6, isMe:false, delta: 1 },
//   { id:7, name:"Ben A.",       initials:"BA", color:AVATAR_COLORS[7], score:880,  correct:4,  total:10, speedBonus:80,  accuracy:40, streak:0, rank:7, isMe:false, delta:-1 },
//   { id:8, name:"Lea F.",       initials:"LF", color:AVATAR_COLORS[5], score:640,  correct:3,  total:10, speedBonus:40,  accuracy:30, streak:0, rank:8, isMe:false, delta: 0 },
// ];

// const ME = PLAYERS.find(p => p.isMe)!;
// const TOP3 = [PLAYERS[1], PLAYERS[0], PLAYERS[2]]; // 2nd, 1st, 3rd layout

// // ── Confetti particle ──────────────────────────────────────────────────────────
// interface Particle {
//   id: number; x: number; delay: number; dur: number;
//   color: string; size: number; shape: "rect" | "circle" | "star";
//   rot: number; rotSpeed: number;
// }

// function useParticles(count: number): Particle[] {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     delay: Math.random() * 1.5,
//     dur: 2.5 + Math.random() * 2,
//     color: [C.yellow, C.coral, C.indigo, C.green, "#FF9F40","#5BC8F6","#B06EF6"][i % 7],
//     size: 6 + Math.random() * 8,
//     shape: (["rect","rect","circle","star"] as const)[i % 4],
//     rot: Math.random() * 360,
//     rotSpeed: (Math.random() - 0.5) * 720,
//   }));
// }

// // ── Animated counter ───────────────────────────────────────────────────────────
// function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     const t = setTimeout(() => {
//       const steps = 40;
//       let i = 0;
//       const iv = setInterval(() => {
//         i++;
//         setVal(Math.round((to * i) / steps));
//         if (i >= steps) clearInterval(iv);
//       }, 22);
//       return () => clearInterval(iv);
//     }, delay);
//     return () => clearTimeout(t);
//   }, [to, delay]);
//   return <>{val.toLocaleString()}</>;
// }

// // ── Rank delta icon ────────────────────────────────────────────────────────────
// function RankDelta({ delta }: { delta: number }) {
//   if (delta > 0) return (
//     <span style={{ display:"flex", alignItems:"center", gap:2,
//       fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700, color:C.green }}>
//       <ChevronUp size={11} strokeWidth={3}/>{delta}
//     </span>
//   );
//   if (delta < 0) return (
//     <span style={{ display:"flex", alignItems:"center", gap:2,
//       fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700, color:C.red }}>
//       <ChevronDown size={11} strokeWidth={3}/>{Math.abs(delta)}
//     </span>
//   );
//   return <Minus size={10} color="rgba(255,255,255,0.25)" strokeWidth={2}/>;
// }

// // ── Share modal ────────────────────────────────────────────────────────────────
// function ShareModal({ onClose }: { onClose: ()=>void }) {
//   const [copied, setCopied] = useState(false);
//   const shareText = `🏆 I ranked #2 in QuizArena with 2,180 pts! Can you beat me? #QuizArena #UMak`;
//   function copy() {
//     navigator.clipboard?.writeText(shareText).catch(()=>{});
//     setCopied(true);
//     setTimeout(()=>setCopied(false), 2000);
//   }
//   return (
//     <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex",
//       alignItems:"center", justifyContent:"center",
//       background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}
//       onClick={onClose}>
//       <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.1)",
//         borderRadius:24, padding:28, width:340, boxShadow:"0 24px 64px rgba(0,0,0,0.5)",
//         animation:"popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
//         onClick={e=>e.stopPropagation()}>
//         <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
//           <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color:"#fff" }}>
//             Share Results
//           </span>
//           <button type="button" onClick={onClose} style={{
//             background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%",
//             width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center",
//             cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
//             <X size={15} strokeWidth={2.5}/>
//           </button>
//         </div>
//         {/* Preview card */}
//         <div style={{ background:`linear-gradient(135deg,${C.indigo},${C.indigoDeep})`,
//           borderRadius:16, padding:"16px 18px", marginBottom:16,
//           border:"1.5px solid rgba(255,255,255,0.15)" }}>
//           <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:15, fontWeight:600,
//             color:"rgba(255,255,255,0.7)", margin:"0 0 4px" }}>QuizArena · UMak</p>
//           <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700,
//             color:"#fff", margin:0, lineHeight:1.4 }}>
//             🏆 Ranked #2 with 2,180 pts!
//           </p>
//           <div style={{ display:"flex", gap:8, marginTop:10 }}>
//             {["#QuizArena","#UMak","#GameOn"].map(tag=>(
//               <span key={tag} style={{ background:"rgba(255,255,255,0.15)", borderRadius:20,
//                 padding:"3px 8px", fontFamily:"Manrope, sans-serif",
//                 fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.7)" }}>{tag}</span>
//             ))}
//           </div>
//         </div>
//         {/* Copy text */}
//         <div style={{ background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)",
//           borderRadius:12, padding:"10px 12px", marginBottom:14,
//           fontFamily:"Manrope, sans-serif", fontSize:12, color:"rgba(255,255,255,0.5)",
//           lineHeight:1.6 }}>{shareText}</div>
//         <button type="button" onClick={copy} style={{
//           width:"100%", background: copied ? C.green : C.coral,
//           border:"none", borderRadius:14, padding:"12px 0",
//           fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"#fff",
//           cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
//           gap:8, transition:"background 0.2s",
//           boxShadow:`0 4px 16px ${copied ? "rgba(46,212,122,0.4)" : C.coralGlow}` }}>
//           {copied ? <Check size={18} strokeWidth={2.5}/> : <Copy size={16} strokeWidth={2.5}/>}
//           {copied ? "Copied!" : "Copy to Clipboard"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Podium avatar ──────────────────────────────────────────────────────────────
// function PodiumAvatar({ player, rank }: { player: Player; rank: 1|2|3 }) {
//   const sizes   = { 1:72, 2:60, 3:56 } as const;
//   const rings   = { 1:C.yellow, 2:"rgba(255,255,255,0.5)", 3:"#CD7F32" } as const;
//   const glows   = { 1:C.yellowGlow, 2:"rgba(255,255,255,0.2)", 3:"rgba(205,127,50,0.3)" } as const;
//   const crowns  = { 1:28, 2:0, 3:0 } as const;
//   const medals  = ["🥇","🥈","🥉"];
//   const sz = sizes[rank];
//   return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
//       {/* Crown for 1st */}
//       {rank===1 && (
//         <Crown size={crowns[rank]} fill={C.yellow} color="transparent"
//           style={{ animation:"floatA 2s ease-in-out infinite", filter:`drop-shadow(0 2px 6px ${C.yellowGlow})` }} />
//       )}
//       {rank!==1 && <div style={{ height:22 }}/>}
//       {/* Avatar circle */}
//       <div style={{ position:"relative" }}>
//         <div style={{
//           width:sz, height:sz, borderRadius:"50%", background:player.color,
//           display:"flex", alignItems:"center", justifyContent:"center",
//           fontFamily:"Fredoka, sans-serif", fontSize:sz*0.3, fontWeight:700, color:"#fff",
//           border:`${rank===1?4:3}px solid ${rings[rank]}`,
//           boxShadow:`0 0 0 ${rank===1?6:4}px ${glows[rank]}, 0 8px 24px rgba(0,0,0,0.4)`,
//           animation: rank===1 ? "floatA 2.4s ease-in-out infinite" : rank===2 ? "floatB 2.8s ease-in-out infinite" : "floatC 3.2s ease-in-out infinite",
//         }}>
//           {player.initials}
//         </div>
//         {/* Streak flame */}
//         {player.streak >= 3 && (
//           <div style={{ position:"absolute", top:-8, right:-8 }}>
//             <Flame size={18} fill={C.coral} color="transparent"
//               style={{ filter:`drop-shadow(0 0 4px ${C.coralGlow})` }} />
//           </div>
//         )}
//       </div>
//       {/* Medal */}
//       <span style={{ fontSize:22 }}>{medals[rank-1]}</span>
//       {/* Name */}
//       <div style={{ textAlign:"center" }}>
//         <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?17:15, fontWeight:700,
//           color:"#fff", margin:0, lineHeight:1.2,
//           textShadow: rank===1?`0 0 20px ${C.yellowGlow}`:"none" }}>
//           {player.name}{player.isMe && " ✦"}
//         </p>
//         <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?22:18, fontWeight:700,
//           color:rank===1?C.yellow:"rgba(255,255,255,0.7)", margin:"2px 0 0",
//           textShadow:rank===1?`0 0 16px ${C.yellowGlow}`:"none" }}>
//           <Counter to={player.score} delay={rank===1?600:rank===2?400:800} />
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Podium step ────────────────────────────────────────────────────────────────
// function PodiumStep({ rank }: { rank: 1|2|3 }) {
//   const heights = { 1:100, 2:72, 3:56 } as const;
//   const colors  = {
//     1:`linear-gradient(160deg,${C.yellow},${C.yellowDeep})`,
//     2:`linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))`,
//     3:`linear-gradient(160deg,rgba(205,127,50,0.5),rgba(205,127,50,0.25))`,
//   } as const;
//   const borders = { 1:`2px solid ${C.yellow}99`, 2:"2px solid rgba(255,255,255,0.25)", 3:"2px solid rgba(205,127,50,0.4)" } as const;
//   const labels  = { 1:"1st", 2:"2nd", 3:"3rd" };
//   const h = heights[rank];
//   return (
//     <div style={{ width:100, height:h, background:colors[rank], border:borders[rank],
//       borderRadius:"14px 14px 0 0", display:"flex", alignItems:"center",
//       justifyContent:"center", position:"relative", flexShrink:0,
//       boxShadow: rank===1 ? `0 -4px 20px ${C.yellowGlow}, 0 4px 16px rgba(0,0,0,0.3)` : "0 4px 16px rgba(0,0,0,0.2)" }}>
//       <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700,
//         color: rank===1?"#1B1E2B":rank===2?"rgba(255,255,255,0.7)":"rgba(205,127,50,0.9)" }}>
//         {labels[rank]}
//       </span>
//       {/* shimmer overlay for 1st */}
//       {rank===1 && (
//         <div style={{ position:"absolute", inset:0, borderRadius:"14px 14px 0 0",
//           background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
//           backgroundSize:"200% 100%", animation:"shimmer 2.5s linear infinite" }} />
//       )}
//     </div>
//   );
// }

// // ── Main Component ─────────────────────────────────────────────────────────────
// export function BattleResults() {
//   const { navigate } = useApp();
//   const particles = useParticles(48);
//   const [showShare, setShowShare] = useState(false);
//   const [confettiActive, setConfettiActive] = useState(true);
//   const [scoreVisible, setScoreVisible] = useState(false);
//   const scoreRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => setConfettiActive(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) setScoreVisible(true); },
//       { threshold: 0.3 }
//     );
//     if (scoreRef.current) obs.observe(scoreRef.current);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <>
//       <StudentTopBar />
//       <style>{`
//         @keyframes floatA   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
//         @keyframes floatB   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
//         @keyframes floatC   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
//         @keyframes confettiFall {
//           0%  { transform:translateY(-20px) rotate(var(--r0)); opacity:1; }
//           100%{ transform:translateY(110vh)  rotate(var(--r1)); opacity:0; }
//         }
//         @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
//         @keyframes popIn    { 0%{opacity:0;transform:scale(0.8)} 60%{transform:scale(1.04)} 100%{opacity:1;transform:scale(1)} }
//         @keyframes slideUp  { 0%{opacity:0;transform:translateY(30px)} 100%{opacity:1;transform:translateY(0)} }
//         @keyframes glow1st  { 0%,100%{box-shadow:0 0 24px ${C.yellowGlow}} 50%{box-shadow:0 0 48px ${C.yellowGlow}} }
//         @keyframes sparkle  { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
//         @keyframes barGrow  { 0%{width:0} 100%{width:var(--w)} }
//         @keyframes fadeSlide{ 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
//       `}</style>

//       {/* ── Confetti layer ── */}
//       {confettiActive && (
//         <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:50, overflow:"hidden" }}>
//           {particles.map(p => (
//             <div key={p.id} style={{
//               position:"absolute", left:`${p.x}%`, top:0,
//               width:p.shape==="circle"?p.size:p.shape==="star"?p.size+4:p.size*1.6,
//               height:p.size, borderRadius:p.shape==="circle"?"50%":p.shape==="rect"?4:0,
//               background:p.shape==="star"?"transparent":p.color,
//               color:p.color, fontSize:p.shape==="star"?p.size+4:undefined,
//               lineHeight:1,
//               "--r0":`${p.rot}deg`, "--r1":`${p.rot+p.rotSpeed}deg`,
//               animation:`confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
//             } as React.CSSProperties}>
//               {p.shape==="star" && "✦"}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── Scroll container ── */}
//       <div style={{ minHeight:"100vh", overflowY:"auto", overflowX:"hidden", paddingTop:48,
//         background:`radial-gradient(ellipse at 50% 0%, rgba(91,61,246,0.22) 0%, transparent 55%),
//           radial-gradient(ellipse at 80% 90%, rgba(255,107,74,0.12) 0%, transparent 50%),
//           ${C.navy}` }}>

//         {/* ── HERO SECTION ── */}
//         <div style={{ textAlign:"center", padding:"36px 24px 0", position:"relative" }}>
//           {/* Sparkle decorations */}
//           {[{x:8,y:20,d:0},{x:92,y:15,d:0.3},{x:15,y:55,d:0.6},{x:88,y:48,d:0.9}].map((s,i)=>(
//             <div key={i} style={{ position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
//               animation:`sparkle 2s ${s.d}s ease-in-out infinite`, fontSize:20,
//               color:C.yellow, pointerEvents:"none" }}>✦</div>
//           ))}

//           {/* Title */}
//           <div style={{ display:"inline-flex", alignItems:"center", gap:10,
//             background:"rgba(255,201,60,0.12)", border:"2px solid rgba(255,201,60,0.3)",
//             borderRadius:40, padding:"6px 20px", marginBottom:12 }}>
//             <Trophy size={18} fill={C.yellow} color="transparent" />
//             <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:800,
//               color:C.yellow, letterSpacing:"0.08em", textTransform:"uppercase" }}>
//               Battle Complete!
//             </span>
//             <Trophy size={18} fill={C.yellow} color="transparent" />
//           </div>

//           <h1 style={{ fontFamily:"Fredoka, sans-serif", fontSize:54, fontWeight:700,
//             margin:"0 0 4px",
//             background:`linear-gradient(135deg, ${C.yellow}, #fff 45%, ${C.coral})`,
//             WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
//             backgroundClip:"text", lineHeight:1.1,
//             filter:`drop-shadow(0 2px 12px ${C.yellowGlow})` }}>
//             Game Over!
//           </h1>
//           <p style={{ fontFamily:"Manrope, sans-serif", fontSize:16, fontWeight:600,
//             color:"rgba(255,255,255,0.45)", margin:"0 0 32px" }}>
//             Computer Science · Speed Mode · 10 Questions
//           </p>

//           {/* ── PODIUM ── */}
//           <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center",
//             gap:0, marginBottom:0, position:"relative" }}>

//             {/* Radial glow behind podium */}
//             <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
//               width:340, height:120, background:
//                 `radial-gradient(ellipse at 50% 100%, ${C.yellowGlow} 0%, transparent 70%)`,
//               pointerEvents:"none" }} />

//             {TOP3.map((player, idx) => {
//               const rank = [2,1,3][idx] as 1|2|3;
//               return (
//                 <div key={player.id} style={{ display:"flex", flexDirection:"column",
//                   alignItems:"center", gap:0,
//                   animation:`slideUp 0.6s ${idx*0.15}s cubic-bezier(0.34,1.56,0.64,1) both` }}>
//                   {/* Avatar above step */}
//                   <div style={{ paddingBottom:12 }}>
//                     <PodiumAvatar player={player} rank={rank} />
//                   </div>
//                   <PodiumStep rank={rank} />
//                 </div>
//               );
//             })}
//           </div>

//           {/* Floor base */}
//           <div style={{ height:12, background:`linear-gradient(180deg, rgba(255,255,255,0.06), transparent)`,
//             borderRadius:"0 0 12px 12px", margin:"0 auto",
//             maxWidth:340, boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }} />
//         </div>

//         {/* ── MY SCORE BREAKDOWN ── */}
//         <div ref={scoreRef} style={{ maxWidth:740, margin:"28px auto 0", padding:"0 20px" }}>
//           <div style={{ background:`linear-gradient(135deg, rgba(255,107,74,0.15), rgba(255,107,74,0.05))`,
//             border:`2px solid ${C.coral}66`, borderRadius:24, padding:"20px 24px",
//             animation: scoreVisible ? "fadeSlide 0.5s 0.2s ease-out both" : "none",
//             boxShadow:`0 8px 32px ${C.coralGlow}22` }}>

//             {/* Header */}
//             <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
//               <div style={{ width:38, height:38, borderRadius:12, background:C.coral,
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 boxShadow:`0 3px 12px ${C.coralGlow}` }}>
//                 <Star fill="#fff" color="transparent" size={18}/>
//               </div>
//               <div>
//                 <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
//                   color:"rgba(255,255,255,0.4)", margin:0, textTransform:"uppercase",
//                   letterSpacing:"0.06em" }}>Your Performance</p>
//                 <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700,
//                   color:"#fff", margin:0 }}>Score Breakdown</p>
//               </div>
//               <div style={{ marginLeft:"auto", textAlign:"right" }}>
//                 <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:36, fontWeight:700,
//                   color:C.coral, margin:0, lineHeight:1,
//                   textShadow:`0 0 20px ${C.coralGlow}` }}>
//                   {scoreVisible ? <Counter to={ME.score} delay={300}/> : "0"}
//                 </p>
//                 <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
//                   color:"rgba(255,255,255,0.35)", margin:0 }}>total points</p>
//               </div>
//             </div>

//             {/* Stats grid */}
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
//               {[
//                 { icon:<CheckCircle2 size={18} strokeWidth={2.5}/>, label:"Correct Answers",
//                   value:`${ME.correct}/${ME.total}`, sub:"8 out of 10", color:C.green,
//                   pct:ME.correct/ME.total*100 },
//                 { icon:<Zap size={18} strokeWidth={2.5}/>, label:"Speed Bonus",
//                   value:`+${ME.speedBonus}`, sub:"avg 3.2s per answer", color:C.yellow,
//                   pct:ME.speedBonus/600*100 },
//                 { icon:<Target size={18} strokeWidth={2.5}/>, label:"Accuracy",
//                   value:`${ME.accuracy}%`, sub:"above 78% avg", color:C.indigo,
//                   pct:ME.accuracy },
//               ].map((stat, i) => (
//                 <div key={i} style={{ background:"rgba(255,255,255,0.05)",
//                   border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:16,
//                   padding:"14px 14px 12px",
//                   animation: scoreVisible ? `fadeSlide 0.4s ${0.3+i*0.12}s ease-out both` : "none" }}>
//                   <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
//                     <span style={{ color:stat.color }}>{stat.icon}</span>
//                     <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
//                       color:"rgba(255,255,255,0.4)", lineHeight:1.3 }}>{stat.label}</span>
//                   </div>
//                   <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:28, fontWeight:700,
//                     color:stat.color, margin:"0 0 8px", lineHeight:1 }}>
//                     {scoreVisible ? stat.value : "—"}
//                   </p>
//                   {/* Mini progress bar */}
//                   <div style={{ height:4, borderRadius:50, background:"rgba(255,255,255,0.08)",
//                     overflow:"hidden", marginBottom:5 }}>
//                     <div style={{
//                       height:"100%", borderRadius:50, background:stat.color,
//                       "--w": `${stat.pct}%`,
//                       animation: scoreVisible ? `barGrow 0.8s ${0.5+i*0.15}s ease-out both` : "none",
//                       width: scoreVisible ? `${stat.pct}%` : "0%",
//                       transition:"width 0.8s ease-out",
//                     } as React.CSSProperties} />
//                   </div>
//                   <p style={{ fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:600,
//                     color:"rgba(255,255,255,0.3)", margin:0 }}>{stat.sub}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Streak bonus callout */}
//             {ME.streak >= 2 && (
//               <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10,
//                 background:"rgba(255,107,74,0.1)", border:"1.5px solid rgba(255,107,74,0.25)",
//                 borderRadius:12, padding:"9px 14px",
//                 animation: scoreVisible ? "fadeSlide 0.4s 0.7s ease-out both" : "none" }}>
//                 <Flame size={16} fill={C.coral} color="transparent"
//                   style={{ filter:`drop-shadow(0 0 4px ${C.coralGlow})` }} />
//                 <span style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700,
//                   color:C.coral }}>{ME.streak}× Answer Streak</span>
//                 <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11,
//                   color:"rgba(255,255,255,0.4)" }}>— you answered 3 in a row without missing!</span>
//                 <span style={{ marginLeft:"auto", fontFamily:"Fredoka, sans-serif",
//                   fontSize:15, fontWeight:700, color:C.coral }}>+120 bonus</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── FULL LEADERBOARD ── */}
//         <div style={{ maxWidth:740, margin:"20px auto 0", padding:"0 20px" }}>
//           <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
//             <Trophy size={17} fill={C.yellow} color="transparent" />
//             <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:21, fontWeight:700,
//               color:"#fff" }}>Final Leaderboard</span>
//             <span style={{ background:"rgba(255,255,255,0.07)", borderRadius:20,
//               padding:"3px 10px", fontFamily:"Manrope, sans-serif", fontSize:11,
//               fontWeight:700, color:"rgba(255,255,255,0.4)", marginLeft:2 }}>
//               {PLAYERS.length} players
//             </span>
//           </div>

//           {/* Table */}
//           <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.07)",
//             borderRadius:20, overflow:"hidden",
//             boxShadow:"0 8px 32px rgba(0,0,0,0.25)" }}>
//             {/* Header */}
//             <div style={{ display:"grid", gridTemplateColumns:"44px 1fr 80px 80px 80px 64px",
//               gap:0, padding:"11px 16px",
//               borderBottom:"1.5px solid rgba(255,255,255,0.07)",
//               background:"rgba(255,255,255,0.03)" }}>
//               {["#","Player","Score","Correct","Accuracy","Trend"].map((h, i) => (
//                 <span key={i} style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700,
//                   color:"rgba(255,255,255,0.3)", textTransform:"uppercase",
//                   letterSpacing:"0.06em", textAlign:i>=2?"center":"left" }}>{h}</span>
//               ))}
//             </div>

//             {/* Rows */}
//             {PLAYERS.map((player, idx) => {
//               const isTop = player.rank <= 3;
//               const medals = ["🥇","🥈","🥉"];
//               return (
//                 <div key={player.id} style={{
//                   display:"grid", gridTemplateColumns:"44px 1fr 80px 80px 80px 64px",
//                   gap:0, padding:"12px 16px", alignItems:"center",
//                   borderBottom: idx < PLAYERS.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
//                   background: player.isMe
//                     ? "rgba(255,107,74,0.1)"
//                     : idx%2===0 ? "transparent" : "rgba(255,255,255,0.015)",
//                   transition:"background 0.15s",
//                   animation:`fadeSlide 0.4s ${0.05*idx}s ease-out both`,
//                 }}>
//                   {/* Rank */}
//                   <div style={{ display:"flex", alignItems:"center" }}>
//                     {isTop
//                       ? <span style={{ fontSize:20 }}>{medals[player.rank-1]}</span>
//                       : <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:17, fontWeight:700,
//                           color:"rgba(255,255,255,0.35)" }}>#{player.rank}</span>}
//                   </div>

//                   {/* Player */}
//                   <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                     <div style={{ width:36, height:36, borderRadius:"50%", background:player.color,
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff",
//                       border: player.isMe ? `2px solid ${C.coral}` : "2px solid transparent",
//                       flexShrink:0 }}>
//                       {player.initials}
//                     </div>
//                     <div>
//                       <p style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700,
//                         color: player.isMe ? "#fff" : "rgba(255,255,255,0.75)", margin:0,
//                         display:"flex", alignItems:"center", gap:6 }}>
//                         {player.name}
//                         {player.isMe && (
//                           <span style={{ background:C.coralLight, border:`1px solid ${C.coral}55`,
//                             borderRadius:20, padding:"1px 7px",
//                             fontFamily:"Manrope, sans-serif", fontSize:9, fontWeight:800,
//                             color:C.coral, letterSpacing:"0.04em" }}>YOU</span>
//                         )}
//                       </p>
//                       {player.streak >= 3 && (
//                         <p style={{ fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700,
//                           color:C.coral, margin:0, display:"flex", alignItems:"center", gap:3 }}>
//                           <Flame size={9} fill={C.coral} color="transparent"/>
//                           {player.streak}× streak
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Score */}
//                   <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:17, fontWeight:700,
//                     color: isTop ? C.yellow : player.isMe ? C.coral : "#fff",
//                     margin:0, textAlign:"center" }}>
//                     {player.score.toLocaleString()}
//                   </p>

//                   {/* Correct */}
//                   <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700,
//                     color:"rgba(255,255,255,0.6)", margin:0, textAlign:"center" }}>
//                     {player.correct}<span style={{ color:"rgba(255,255,255,0.25)",
//                       fontWeight:500 }}>/{player.total}</span>
//                   </p>

//                   {/* Accuracy */}
//                   <div style={{ textAlign:"center" }}>
//                     <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
//                       <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700,
//                         color: player.accuracy>=80 ? C.green : player.accuracy>=60 ? C.yellow : C.red }}>
//                         {player.accuracy}%
//                       </span>
//                     </div>
//                   </div>

//                   {/* Trend */}
//                   <div style={{ display:"flex", justifyContent:"center" }}>
//                     <RankDelta delta={player.delta} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── ACTION ROW ── */}
//         <div style={{ maxWidth:740, margin:"24px auto 36px", padding:"0 20px" }}>
//           <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
//             {/* Play Again */}
//             <button type="button" onClick={()=>navigate("lobby")} style={{
//               flex:"1 1 180px", background:`linear-gradient(135deg,${C.coral},${C.coralDeep})`,
//               border:"none", borderRadius:18, padding:"16px 28px",
//               fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color:"#fff",
//               cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
//               gap:10, boxShadow:`0 6px 24px ${C.coralGlow}, 0 2px 8px rgba(0,0,0,0.3)`,
//               transition:"transform 0.15s, box-shadow 0.15s",
//             }}
//               onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1.03)";}}
//               onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scale(1)";}}
//             >
//               <RotateCcw size={20} strokeWidth={2.5}/>
//               Play Again
//             </button>

//             {/* Exit to Dashboard */}
//             <button type="button" onClick={()=>navigate("lobby")} style={{
//               flex:"1 1 180px",
//               background:"rgba(255,255,255,0.06)",
//               border:"2px solid rgba(255,255,255,0.15)",
//               borderRadius:18, padding:"16px 24px",
//               fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700,
//               color:"rgba(255,255,255,0.7)", cursor:"pointer",
//               display:"flex", alignItems:"center", justifyContent:"center", gap:10,
//               transition:"border-color 0.15s, color 0.15s",
//             }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.3)";el.style.color="#fff";}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,0.15)";el.style.color="rgba(255,255,255,0.7)";}}
//             >
//               <LogOut size={18} strokeWidth={2}/>
//               Back to Lobby
//             </button>

//             {/* Share Results */}
//             <button type="button" onClick={()=>setShowShare(true)} style={{
//               width:58, height:58, borderRadius:18, flexShrink:0,
//               background:C.indigo, border:"none", cursor:"pointer",
//               display:"flex", alignItems:"center", justifyContent:"center",
//               boxShadow:`0 4px 16px ${C.indigoGlow}`,
//               transition:"transform 0.15s, box-shadow 0.15s",
//             }}
//               onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1.08)";el.style.boxShadow=`0 6px 24px ${C.indigoGlow}`;}}
//               onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="scale(1)";el.style.boxShadow=`0 4px 16px ${C.indigoGlow}`;}}
//               title="Share Results"
//             >
//               <Share2 size={20} color="#fff" strokeWidth={2}/>
//             </button>
//           </div>

//           {/* Footnote */}
//           <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:500,
//             color:"rgba(255,255,255,0.2)", textAlign:"center", marginTop:16 }}>
//             Results saved · CS201-A · July 26, 2026
//           </p>
//         </div>
//       </div>

//       {/* Share modal */}
//       {showShare && <ShareModal onClose={()=>setShowShare(false)} />}
//     </>
//   );
// }
'use client';

import { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { StudentTopBar } from "../shared/StudentTopBar";
import {
  Trophy, Star, Share2, RotateCcw, LogOut,
  CheckCircle2, Zap, Target, Crown, Flame,
  ChevronUp, ChevronDown, Minus, X, Copy, Check, Loader2
} from "lucide-react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

const C = {
  indigo: "#5B3DF6", indigoDeep: "#4228D4",
  indigoLight: "rgba(91,61,246,0.15)", indigoGlow: "rgba(91,61,246,0.4)",
  coral: "#FF6B4A", coralDeep: "#D44A2A",
  coralLight: "rgba(255,107,74,0.15)", coralGlow: "rgba(255,107,74,0.4)",
  yellow: "#FFC93C", yellowDeep: "#E8A800",
  yellowLight: "rgba(255,201,60,0.15)", yellowGlow: "rgba(255,201,60,0.5)",
  green: "#2ED47A", greenDeep: "#18A058",
  greenLight: "rgba(46,212,122,0.12)",
  red: "#FF4757",
  navy: "#1B1E2B", navyLight: "#252840", navyMid: "#1F223A",
  white: "#FFFFFF", offWhite: "#FAFAFC",
  muted: "rgba(255,255,255,0.4)",
};

const AVATAR_COLORS = [
  "#5B3DF6","#FF6B4A","#2ED47A","#FFC93C",
  "#FF4757","#5BC8F6","#B06EF6","#FF9F40","#E040FB","#43E97B",
];

interface Player {
  id: string; name: string; initials: string; color: string;
  score: number; correct: number; total: number; speedBonus: number;
  accuracy: number; streak: number; rank: number; isMe: boolean;
  delta: number;
}

interface Particle {
  id: number; x: number; delay: number; dur: number;
  color: string; size: number; shape: "rect" | "circle" | "star";
  rot: number; rotSpeed: number;
}

function useParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    dur: 2.5 + Math.random() * 2,
    color: [C.yellow, C.coral, C.indigo, C.green, "#FF9F40","#5BC8F6","#B06EF6"][i % 7],
    size: 6 + Math.random() * 8,
    shape: (["rect","rect","circle","star"] as const)[i % 4],
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 720,
  }));
}

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const steps = 40;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setVal(Math.round((to * i) / steps));
        if (i >= steps) clearInterval(iv);
      }, 22);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [to, delay]);
  return <>{val.toLocaleString()}</>;
}

function RankDelta({ delta }: { delta: number }) {
  if (delta > 0) return (
    <span style={{ display:"flex", alignItems:"center", gap:2, fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700, color:C.green }}>
      <ChevronUp size={11} strokeWidth={3}/>{delta}
    </span>
  );
  if (delta < 0) return (
    <span style={{ display:"flex", alignItems:"center", gap:2, fontFamily:"Manrope, sans-serif", fontSize:10, fontWeight:700, color:C.red }}>
      <ChevronDown size={11} strokeWidth={3}/>{Math.abs(delta)}
    </span>
  );
  return <Minus size={10} color="rgba(255,255,255,0.25)" strokeWidth={2}/>;
}

function ShareModal({ rank, score, onClose }: { rank: number; score: number; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareText = `🏆 I ranked #${rank} in QuizArena with ${score.toLocaleString()} pts! Can you beat me? #QuizArena #UMak`;
  
  function copy() {
    navigator.clipboard?.writeText(shareText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.1)", borderRadius:24, padding:28, width:340, boxShadow:"0 24px 64px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color:"#fff" }}>Share Results</span>
          <button type="button" onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
            <X size={15} strokeWidth={2.5}/>
          </button>
        </div>
        <div style={{ background:`linear-gradient(135deg,${C.indigo},${C.indigoDeep})`, borderRadius:16, padding:"16px 18px", marginBottom:16, border:"1.5px solid rgba(255,255,255,0.15)" }}>
          <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:15, fontWeight:600, color:"rgba(255,255,255,0.7)", margin:"0 0 4px" }}>QuizArena · UMak</p>
          <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700, color:"#fff", margin:0, lineHeight:1.4 }}>
            🏆 Ranked #{rank} with {score.toLocaleString()} pts!
          </p>
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px 12px", marginBottom:14, fontFamily:"Manrope, sans-serif", fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>{shareText}</div>
        <button type="button" onClick={copy} style={{ width:"100%", background: copied ? C.green : C.coral, border:"none", borderRadius:14, padding:"12px 0", fontFamily:"Fredoka, sans-serif", fontSize:18, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {copied ? <Check size={18} strokeWidth={2.5}/> : <Copy size={16} strokeWidth={2.5}/>}
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
    </div>
  );
}

function PodiumAvatar({ player, rank }: { player: Player; rank: 1|2|3 }) {
  const sizes   = { 1:72, 2:60, 3:56 } as const;
  const rings   = { 1:C.yellow, 2:"rgba(255,255,255,0.5)", 3:"#CD7F32" } as const;
  const glows   = { 1:C.yellowGlow, 2:"rgba(255,255,255,0.2)", 3:"rgba(205,127,50,0.3)" } as const;
  const medals  = ["🥇","🥈","🥉"];
  const sz = sizes[rank];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      {rank === 1 && (
        <Crown size={28} fill={C.yellow} color="transparent" style={{ animation:"floatA 2s ease-in-out infinite", filter:`drop-shadow(0 2px 6px ${C.yellowGlow})` }} />
      )}
      {rank !== 1 && <div style={{ height:22 }}/>}
      <div style={{ position:"relative" }}>
        <div style={{
          width:sz, height:sz, borderRadius:"50%", background:player.color,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"Fredoka, sans-serif", fontSize:sz*0.3, fontWeight:700, color:"#fff",
          border:`${rank===1?4:3}px solid ${rings[rank]}`,
          boxShadow:`0 0 0 ${rank===1?6:4}px ${glows[rank]}, 0 8px 24px rgba(0,0,0,0.4)`,
          animation: rank===1 ? "floatA 2.4s ease-in-out infinite" : rank===2 ? "floatB 2.8s ease-in-out infinite" : "floatC 3.2s ease-in-out infinite",
        }}>
          {player.initials}
        </div>
        {player.streak >= 3 && (
          <div style={{ position:"absolute", top:-8, right:-8 }}>
            <Flame size={18} fill={C.coral} color="transparent" style={{ filter:`drop-shadow(0 0 4px ${C.coralGlow})` }} />
          </div>
        )}
      </div>
      <span style={{ fontSize:22 }}>{medals[rank-1]}</span>
      <div style={{ textAlign:"center" }}>
        <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?17:15, fontWeight:700, color:"#fff", margin:0, lineHeight:1.2 }}>
          {player.name}{player.isMe && " ✦"}
        </p>
        <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:rank===1?22:18, fontWeight:700, color:rank===1?C.yellow:"rgba(255,255,255,0.7)", margin:"2px 0 0" }}>
          <Counter to={player.score} delay={rank===1?600:rank===2?400:800} />
        </p>
      </div>
    </div>
  );
}

function PodiumStep({ rank }: { rank: 1|2|3 }) {
  const heights = { 1:100, 2:72, 3:56 } as const;
  const colors  = {
    1:`linear-gradient(160deg,${C.yellow},${C.yellowDeep})`,
    2:`linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))`,
    3:`linear-gradient(160deg,rgba(205,127,50,0.5),rgba(205,127,50,0.25))`,
  } as const;
  const labels  = { 1:"1st", 2:"2nd", 3:"3rd" };

  return (
    <div style={{ width:100, height:heights[rank], background:colors[rank], border: rank===1 ? `2px solid ${C.yellow}99` : rank===2 ? "2px solid rgba(255,255,255,0.25)" : "2px solid rgba(205,127,50,0.4)", borderRadius:"14px 14px 0 0", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", flexShrink:0 }}>
      <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color: rank===1?"#1B1E2B":rank===2?"rgba(255,255,255,0.7)":"rgba(205,127,50,0.9)" }}>
        {labels[rank]}
      </span>
    </div>
  );
}

interface BattleResultsProps {
  battleId?: string;
  myResultData?: {
    score: number;
    correct: number;
    total: number;
    speedBonus: number;
    accuracy: number;
    streak: number;
  };
}

export function BattleResults({ battleId = "room-demo", myResultData }: BattleResultsProps) {
  const { user, navigate } = useApp();
  const particles = useParticles(48);
  const wsRef = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showShare, setShowShare] = useState(false);
  const [confettiActive, setConfettiActive] = useState(true);
  const [scoreVisible, setScoreVisible] = useState(false);
  const scoreRef = useRef<HTMLDivElement>(null);

  const currentUserId = user?.id || "my-id";
  const currentUserName = user?.name || "You";

  const processLeaderboard = (rawLeaderboard: any[]): Player[] => {
    const sorted = [...rawLeaderboard].sort((a, b) => (b.score || 0) - (a.score || 0));

    return sorted.map((item, idx) => {
      const isMe = item.id === currentUserId;
      const initials = (item.name || "P").substring(0, 2).toUpperCase();

      return {
        id: item.id,
        name: isMe ? "You" : item.name || `Player ${idx + 1}`,
        initials: item.initials || initials,
        color: item.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
        score: item.score || 0,
        correct: item.correct || 0,
        total: item.total || 10,
        speedBonus: item.speedBonus || 0,
        accuracy: item.accuracy || (item.total ? Math.round((item.correct / item.total) * 100) : 0),
        streak: item.streak || 0,
        rank: idx + 1,
        isMe,
        delta: item.delta || 0,
      };
    });
  };

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);

      // Join Redis Battle Channel
      ws.send(JSON.stringify({
        type: 'JOIN_BATTLE',
        battleId
      }));

      // Send current player's final performance score over WebSocket
      if (myResultData) {
        ws.send(JSON.stringify({
          type: 'SUBMIT_SCORE',
          battleId,
          playerData: {
            id: currentUserId,
            name: currentUserName,
            initials: currentUserName.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[0],
            ...myResultData
          }
        }));
      }
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === 'ROOM_STATE_SYNC' || payload.type === 'SCORE_UPDATED' || payload.type === 'QUIZ_COMPLETED') {
          if (payload.leaderboard && Array.isArray(payload.leaderboard)) {
            setPlayers(processLeaderboard(payload.leaderboard));
          }
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    return () => {
      ws.close();
    };
  }, [battleId, currentUserId, currentUserName]);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiActive(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setScoreVisible(true); },
      { threshold: 0.3 }
    );
    if (scoreRef.current) obs.observe(scoreRef.current);
    return () => obs.disconnect();
  }, []);

  const me = players.find(p => p.isMe) || {
    id: currentUserId,
    name: "You",
    initials: "ME",
    color: AVATAR_COLORS[0],
    score: myResultData?.score || 0,
    correct: myResultData?.correct || 0,
    total: myResultData?.total || 10,
    speedBonus: myResultData?.speedBonus || 0,
    accuracy: myResultData?.accuracy || 0,
    streak: myResultData?.streak || 0,
    rank: 1,
    isMe: true,
    delta: 0
  };

  const top3 = [
    players[1] || players[0] || me,
    players[0] || me,
    players[2] || players[0] || me
  ];

  return (
    <>
      <StudentTopBar />
      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes confettiFall {
          0% { transform:translateY(-20px) rotate(0deg); opacity:1; }
          100%{ transform:translateY(110vh) rotate(360deg); opacity:0; }
        }
        @keyframes fadeSlide{ 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(30px)} 100%{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Confetti */}
      {confettiActive && (
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:50, overflow:"hidden" }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position:"absolute", left:`${p.x}%`, top:0,
              width:p.size, height:p.size, borderRadius:p.shape==="circle"?"50%":0,
              background:p.color, animation:`confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      <div style={{ minHeight:"100vh", overflowY:"auto", overflowX:"hidden", paddingTop:48, background:`radial-gradient(ellipse at 50% 0%, rgba(91,61,246,0.22) 0%, transparent 55%), ${C.navy}` }}>

        {/* HERO SECTION */}
        <div style={{ textAlign:"center", padding:"36px 24px 0", position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,201,60,0.12)", border:"2px solid rgba(255,201,60,0.3)", borderRadius:40, padding:"6px 20px", marginBottom:12 }}>
            <Trophy size={18} fill={C.yellow} color="transparent" />
            <span style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:800, color:C.yellow, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Battle Complete!
            </span>
            <Trophy size={18} fill={C.yellow} color="transparent" />
          </div>

          <h1 style={{ fontFamily:"Fredoka, sans-serif", fontSize:54, fontWeight:700, margin:"0 0 4px", background:`linear-gradient(135deg, ${C.yellow}, #fff 45%, ${C.coral})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Game Over!
          </h1>
          <p style={{ fontFamily:"Manrope, sans-serif", fontSize:16, fontWeight:600, color:"rgba(255,255,255,0.45)", margin:"0 0 32px" }}>
            Computer Science · Live Redis Sync · {me.total} Questions
          </p>

          {/* PODIUM */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:0, position:"relative" }}>
            {top3.map((player, idx) => {
              const rank = [2, 1, 3][idx] as 1|2|3;
              return (
                <div key={`${player.id}-${idx}`} style={{ display:"flex", flexDirection:"column", alignItems:"center", animation:`slideUp 0.6s ${idx*0.15}s cubic-bezier(0.34,1.56,0.64,1) both` }}>
                  <div style={{ paddingBottom:12 }}>
                    <PodiumAvatar player={player} rank={rank} />
                  </div>
                  <PodiumStep rank={rank} />
                </div>
              );
            })}
          </div>
        </div>

        {/* MY SCORE BREAKDOWN */}
        <div ref={scoreRef} style={{ maxWidth:740, margin:"28px auto 0", padding:"0 20px" }}>
          <div style={{ background:`linear-gradient(135deg, rgba(255,107,74,0.15), rgba(255,107,74,0.05))`, border:`2px solid ${C.coral}66`, borderRadius:24, padding:"20px 24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:C.coral, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Star fill="#fff" color="transparent" size={18}/>
              </div>
              <div>
                <p style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)", margin:0, textTransform:"uppercase" }}>Your Performance</p>
                <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700, color:"#fff", margin:0 }}>Score Breakdown</p>
              </div>
              <div style={{ marginLeft:"auto", textAlign:"right" }}>
                <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:36, fontWeight:700, color:C.coral, margin:0 }}>
                  <Counter to={me.score} delay={300}/>
                </p>
                <p style={{ fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.35)", margin:0 }}>total points</p>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {[
                { icon:<CheckCircle2 size={18}/>, label:"Correct Answers", value:`${me.correct}/${me.total}`, color:C.green },
                { icon:<Zap size={18}/>, label:"Speed Bonus", value:`+${me.speedBonus}`, color:C.yellow },
                { icon:<Target size={18}/>, label:"Accuracy", value:`${me.accuracy}%`, color:C.indigo },
              ].map((stat, i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"14px 14px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                    <span style={{ color:stat.color }}>{stat.icon}</span>
                    <span style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>{stat.label}</span>
                  </div>
                  <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:28, fontWeight:700, color:stat.color, margin:"0 0 8px" }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FULL LIVE LEADERBOARD */}
        <div style={{ maxWidth:740, margin:"20px auto 0", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <Trophy size={17} fill={C.yellow} color="transparent" />
            <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:21, fontWeight:700, color:"#fff" }}>Final Leaderboard</span>
            <span style={{ background:"rgba(255,255,255,0.07)", borderRadius:20, padding:"3px 10px", fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>
              {players.length} connected
            </span>
          </div>

          <div style={{ background:C.navyLight, border:"1.5px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"44px 1fr 80px 80px 80px 64px", padding:"11px 16px", borderBottom:"1.5px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)" }}>
              {["#","Player","Score","Correct","Accuracy","Trend"].map((h, i) => (
                <span key={i} style={{ fontFamily:"Manrope, sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", textAlign:i>=2?"center":"left" }}>{h}</span>
              ))}
            </div>

            {players.map((player, idx) => (
              <div key={player.id} style={{
                display:"grid", gridTemplateColumns:"44px 1fr 80px 80px 80px 64px", padding:"12px 16px", alignItems:"center",
                borderBottom: idx < players.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: player.isMe ? "rgba(255,107,74,0.1)" : "transparent"
              }}>
                <span style={{ fontFamily:"Fredoka, sans-serif", fontSize:17, fontWeight:700, color:"rgba(255,255,255,0.35)" }}>#{player.rank}</span>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:player.color, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Manrope, sans-serif", fontSize:12, fontWeight:800, color:"#fff" }}>
                    {player.initials}
                  </div>
                  <span style={{ fontFamily:"Manrope, sans-serif", fontSize:14, fontWeight:700, color:"#fff" }}>{player.name}</span>
                </div>
                <p style={{ fontFamily:"Fredoka, sans-serif", fontSize:17, fontWeight:700, color:C.yellow, margin:0, textAlign:"center" }}>{player.score.toLocaleString()}</p>
                <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.6)", margin:0, textAlign:"center" }}>{player.correct}/{player.total}</p>
                <p style={{ fontFamily:"Manrope, sans-serif", fontSize:13, fontWeight:700, color:C.green, margin:0, textAlign:"center" }}>{player.accuracy}%</p>
                <div style={{ display:"flex", justifyContent:"center" }}>
                  <RankDelta delta={player.delta} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION ROW */}
        <div style={{ maxWidth:740, margin:"24px auto 36px", padding:"0 20px", display:"flex", gap:12 }}>
          <button type="button" onClick={() => navigate("lobby")} style={{ flex:1, background:`linear-gradient(135deg,${C.coral},${C.coralDeep})`, border:"none", borderRadius:18, padding:"16px 28px", fontFamily:"Fredoka, sans-serif", fontSize:22, fontWeight:700, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <RotateCcw size={20}/> Play Again
          </button>
          <button type="button" onClick={() => navigate("lobby")} style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"2px solid rgba(255,255,255,0.15)", borderRadius:18, padding:"16px 24px", fontFamily:"Fredoka, sans-serif", fontSize:20, fontWeight:700, color:"rgba(255,255,255,0.7)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <LogOut size={18}/> Back to Lobby
          </button>
          <button type="button" onClick={() => setShowShare(true)} style={{ width:58, height:58, borderRadius:18, background:C.indigo, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Share2 size={20} color="#fff"/>
          </button>
        </div>

      </div>

      {showShare && <ShareModal rank={me.rank} score={me.score} onClose={() => setShowShare(false)} />}
    </>
  );
}