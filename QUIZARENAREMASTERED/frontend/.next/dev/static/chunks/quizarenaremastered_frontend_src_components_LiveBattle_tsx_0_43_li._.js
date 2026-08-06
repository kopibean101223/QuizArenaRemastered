(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveBattle",
    ()=>LiveBattle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/StudentTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/wifi.js [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/wifi-off.js [app-client] (ecmascript) <export default as WifiOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
const C = {
    indigo: "#5B3DF6",
    indigoDeep: "#4228D4",
    indigoLight: "rgba(91,61,246,0.15)",
    coral: "#FF6B4A",
    coralDeep: "#D44A2A",
    yellow: "#FFC93C",
    yellowDeep: "#E8A800",
    green: "#2ED47A",
    greenDeep: "#18A058",
    red: "#FF4757",
    navy: "#1B1E2B",
    navyLight: "#252840",
    offWhite: "#FAFAFC",
    muted: "#717182",
    white: "#FFFFFF"
};
// ── Answer option palette ──────────────────────────────────────────────────────
const OPTION_COLORS = [
    {
        base: "#5B3DF6",
        light: "rgba(91,61,246,0.18)",
        glow: "rgba(91,61,246,0.5)",
        dark: "#4228D4"
    },
    {
        base: "#FF6B4A",
        light: "rgba(255,107,74,0.18)",
        glow: "rgba(255,107,74,0.5)",
        dark: "#D44A2A"
    },
    {
        base: "#2ED47A",
        light: "rgba(46,212,122,0.18)",
        glow: "rgba(46,212,122,0.5)",
        dark: "#18A058"
    },
    {
        base: "#FFC93C",
        light: "rgba(255,201,60,0.18)",
        glow: "rgba(255,201,60,0.5)",
        dark: "#E8A800"
    }
];
const AVATAR_COLORS = [
    "#5B3DF6",
    "#FF6B4A",
    "#2ED47A",
    "#FFC93C",
    "#FF4757",
    "#5BC8F6",
    "#B06EF6",
    "#FF9F40",
    "#E040FB",
    "#43E97B"
];
// ── Mock data ──────────────────────────────────────────────────────────────────
const QUESTION = {
    number: 3,
    total: 10,
    subject: "Computer Science",
    text: "What is the time complexity of searching for an element in a balanced Binary Search Tree?",
    options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(1)"
    ],
    correct: 1,
    points: 200,
    timeLimit: 20
};
const INIT_PLAYERS = [
    {
        id: 1,
        name: "Trisha V.",
        initials: "TV",
        color: AVATAR_COLORS[6],
        score: 1840,
        targetScore: 1840,
        rank: 1,
        streak: 4,
        isMe: false,
        isLeader: false
    },
    {
        id: 2,
        name: "You",
        initials: "ME",
        color: AVATAR_COLORS[0],
        score: 1620,
        targetScore: 1620,
        rank: 2,
        streak: 2,
        isMe: true,
        isLeader: false
    },
    {
        id: 3,
        name: "Ana R.",
        initials: "AR",
        color: AVATAR_COLORS[1],
        score: 1540,
        targetScore: 1540,
        rank: 3,
        streak: 3,
        isMe: false,
        isLeader: true
    },
    {
        id: 4,
        name: "Carlo B.",
        initials: "CB",
        color: AVATAR_COLORS[2],
        score: 1200,
        targetScore: 1200,
        rank: 4,
        streak: 1,
        isMe: false,
        isLeader: false
    },
    {
        id: 5,
        name: "Maria S.",
        initials: "MS",
        color: AVATAR_COLORS[3],
        score: 980,
        targetScore: 980,
        rank: 5,
        streak: 0,
        isMe: false,
        isLeader: false
    },
    {
        id: 6,
        name: "Juan DT.",
        initials: "JD",
        color: AVATAR_COLORS[4],
        score: 860,
        targetScore: 860,
        rank: 6,
        streak: 2,
        isMe: false,
        isLeader: false
    },
    {
        id: 7,
        name: "Ben A.",
        initials: "BA",
        color: AVATAR_COLORS[7],
        score: 720,
        targetScore: 720,
        rank: 7,
        streak: 0,
        isMe: false,
        isLeader: false
    },
    {
        id: 8,
        name: "Lea F.",
        initials: "LF",
        color: AVATAR_COLORS[5],
        score: 540,
        targetScore: 540,
        rank: 8,
        streak: 1,
        isMe: false,
        isLeader: false
    }
];
const INIT_CHAT = [
    {
        id: 1,
        player: "Ana R.",
        initials: "AR",
        color: AVATAR_COLORS[1],
        text: "I think it's B — binary search divides in half each time!",
        ts: "now"
    },
    {
        id: 2,
        player: "Carlo B.",
        initials: "CB",
        color: AVATAR_COLORS[2],
        text: "Yeah B for sure 👍",
        ts: "just now"
    },
    {
        id: 3,
        player: "Maria S.",
        initials: "MS",
        color: AVATAR_COLORS[3],
        text: "Could be D though? O(1)?",
        ts: "just now"
    }
];
const MEDALS = [
    "🥇",
    "🥈",
    "🥉"
];
const REACTIONS = [
    "👍",
    "🔥",
    "❓",
    "🤔",
    "💡"
];
// ── Animated score counter ─────────────────────────────────────────────────────
function AnimatedScore({ value }) {
    _s();
    const [displayed, setDisplayed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const prevRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedScore.useEffect": ()=>{
            if (value === prevRef.current) return;
            const diff = value - prevRef.current;
            const steps = 20;
            let i = 0;
            const iv = setInterval({
                "AnimatedScore.useEffect.iv": ()=>{
                    i++;
                    setDisplayed(Math.round(prevRef.current + diff * i / steps));
                    if (i >= steps) {
                        clearInterval(iv);
                        prevRef.current = value;
                    }
                }
            }["AnimatedScore.useEffect.iv"], 18);
            return ({
                "AnimatedScore.useEffect": ()=>clearInterval(iv)
            })["AnimatedScore.useEffect"];
        }
    }["AnimatedScore.useEffect"], [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: displayed.toLocaleString()
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 88,
        columnNumber: 10
    }, this);
}
_s(AnimatedScore, "TympJ/N89M5uDB8lo348V1TGVq4=");
_c = AnimatedScore;
// ── Countdown bar ──────────────────────────────────────────────────────────────
function CountdownBar({ timeLeft, timeLimit }) {
    const pct = timeLeft / timeLimit * 100;
    const color = pct > 50 ? C.green : pct > 25 ? C.yellow : C.coral;
    const glow = pct > 50 ? "rgba(46,212,122,0.6)" : pct > 25 ? "rgba(255,201,60,0.6)" : "rgba(255,107,74,0.7)";
    const urgent = pct <= 25;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    height: 10,
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.1)",
                    overflow: "hidden",
                    position: "relative"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        inset: 0,
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                        borderRadius: 50,
                        transition: "width 0.9s linear, background 0.5s",
                        boxShadow: urgent ? `0 0 12px ${glow}` : "none"
                    }
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: urgent ? `radial-gradient(circle, ${C.coral}33, transparent)` : "transparent",
                    border: `3px solid ${color}`,
                    transition: "border-color 0.5s",
                    animation: urgent ? "timerPulse 0.6s ease-in-out infinite" : "none"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color,
                        lineHeight: 1,
                        transition: "color 0.5s"
                    },
                    children: timeLeft
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_c1 = CountdownBar;
// ── Answer button ──────────────────────────────────────────────────────────────
function AnswerBtn({ index, text, selected, revealed, isCorrect, disabled, onClick, votePct }) {
    const col = OPTION_COLORS[index];
    const LABELS = [
        "A",
        "B",
        "C",
        "D"
    ];
    let bg = "rgba(255,255,255,0.05)";
    let border = "rgba(255,255,255,0.1)";
    let shadow = "none";
    let textCol = "#fff";
    let badgeBg = col.light;
    let badgeCol = col.base;
    if (selected && !revealed) {
        bg = col.light;
        border = col.base;
        shadow = `0 0 0 3px ${col.glow}, 0 8px 32px ${col.glow}`;
        badgeBg = col.base;
        badgeCol = "#fff";
    }
    if (revealed && isCorrect) {
        bg = "rgba(46,212,122,0.15)";
        border = C.green;
        shadow = "0 0 0 3px rgba(46,212,122,0.4), 0 8px 24px rgba(46,212,122,0.3)";
        textCol = "#fff";
        badgeBg = C.green;
        badgeCol = "#fff";
    }
    if (revealed && selected && !isCorrect) {
        bg = "rgba(255,71,87,0.12)";
        border = C.red;
        shadow = "none";
        textCol = "rgba(255,255,255,0.6)";
        badgeBg = C.red;
        badgeCol = "#fff";
    }
    if (revealed && !selected && !isCorrect) {
        bg = "rgba(255,255,255,0.03)";
        textCol = "rgba(255,255,255,0.35)";
        badgeBg = "rgba(255,255,255,0.08)";
        badgeCol = "rgba(255,255,255,0.3)";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        style: {
            width: "100%",
            background: bg,
            border: `2px solid ${border}`,
            borderRadius: 20,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: disabled ? "default" : "pointer",
            boxShadow: shadow,
            transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
            transform: selected && !revealed ? "scale(1.015)" : "scale(1)",
            position: "relative",
            overflow: "hidden"
        },
        children: [
            votePct !== undefined && votePct > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${votePct}%`,
                    background: "rgba(255,255,255,0.05)",
                    transition: "width 0.4s",
                    borderRadius: 18,
                    pointerEvents: "none"
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: badgeBg,
                    color: badgeCol,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "all 0.18s",
                    boxShadow: selected && !revealed ? `0 2px 8px ${col.glow}` : "none"
                },
                children: revealed && isCorrect ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 20,
                    strokeWidth: 2.5
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 172,
                    columnNumber: 34
                }, this) : LABELS[index]
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: textCol,
                    textAlign: "left",
                    lineHeight: 1.4,
                    flex: 1,
                    transition: "color 0.18s"
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            votePct !== undefined && votePct > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    flexShrink: 0,
                    marginLeft: "auto"
                },
                children: [
                    Math.round(votePct),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 179,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_c2 = AnswerBtn;
// ── Leaderboard row ────────────────────────────────────────────────────────────
function LeaderRow({ player, prevRank }) {
    const isTop = player.rank <= 3;
    const moved = prevRank !== undefined && prevRank !== player.rank;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 14,
            background: player.isMe ? "rgba(91,61,246,0.18)" : "rgba(255,255,255,0.03)",
            border: player.isMe ? "1.5px solid rgba(91,61,246,0.35)" : "1.5px solid transparent",
            transition: "all 0.3s",
            animation: moved ? "rankPop 0.4s cubic-bezier(0.34,1.56,0.64,1)" : "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 26,
                    textAlign: "center",
                    flexShrink: 0
                },
                children: isTop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 17,
                        lineHeight: 1
                    },
                    children: MEDALS[player.rank - 1]
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 200,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.35)"
                    },
                    children: [
                        "#",
                        player.rank
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 201,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: player.color,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#fff",
                    border: player.isMe ? "2px solid rgba(255,255,255,0.6)" : "none"
                },
                children: player.initials
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: player.isMe ? "#fff" : "rgba(255,255,255,0.8)",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: [
                            player.name,
                            player.isMe && " (You)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    player.streak >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                size: 10,
                                fill: C.coral,
                                color: "transparent"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: C.coral
                                },
                                children: [
                                    player.streak,
                                    "× streak"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: isTop ? C.yellow : player.isMe ? "#fff" : "rgba(255,255,255,0.7)",
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedScore, {
                    value: player.score
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_c3 = LeaderRow;
// ── Chat message ───────────────────────────────────────────────────────────────
function ChatBubble({ msg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 7
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: msg.color,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#fff"
                },
                children: msg.initials
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.45)",
                            marginRight: 5
                        },
                        children: msg.player
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.75)",
                            lineHeight: 1.4
                        },
                        children: msg.text
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_c4 = ChatBubble;
function LiveBattle() {
    _s1();
    const { navigate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(QUESTION.timeLimit);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INIT_PLAYERS);
    const [chat, setChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INIT_CHAT);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [votes, setVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            option: 1,
            count: 2,
            voters: [
                "Ana R.",
                "Carlo B."
            ]
        },
        {
            option: 3,
            count: 1,
            voters: [
                "Maria S."
            ]
        }
    ]);
    const [myVote, setMyVote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("discussion");
    const [disconnected, setDisconnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [speedMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [reactionBursts, setReactionBursts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [muted, setMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [questionNum] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(QUESTION.number);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isLeader = players.find((p)=>p.isMe)?.isLeader || false;
    const meAsLeader = players.find((p)=>p.isLeader);
    // Timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            if (revealed) return;
            if (timeLeft <= 0) {
                setRevealed(true);
                return;
            }
            const t = setTimeout({
                "LiveBattle.useEffect.t": ()=>setTimeLeft({
                        "LiveBattle.useEffect.t": (n)=>n - 1
                    }["LiveBattle.useEffect.t"])
            }["LiveBattle.useEffect.t"], 1000);
            return ({
                "LiveBattle.useEffect": ()=>clearTimeout(t)
            })["LiveBattle.useEffect"];
        }
    }["LiveBattle.useEffect"], [
        timeLeft,
        revealed
    ]);
    // Scroll chat
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["LiveBattle.useEffect"], [
        chat
    ]);
    // Simulate enemy votes coming in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            const timers = [
                setTimeout({
                    "LiveBattle.useEffect": ()=>setVotes({
                            "LiveBattle.useEffect": (v)=>[
                                    ...v,
                                    {
                                        option: 1,
                                        count: 1,
                                        voters: [
                                            "Ben A."
                                        ]
                                    }
                                ]
                        }["LiveBattle.useEffect"])
                }["LiveBattle.useEffect"], 3000),
                setTimeout({
                    "LiveBattle.useEffect": ()=>setVotes({
                            "LiveBattle.useEffect": (v)=>v.map({
                                    "LiveBattle.useEffect": (x)=>x.option === 1 ? {
                                            ...x,
                                            count: x.count + 1,
                                            voters: [
                                                ...x.voters,
                                                "Lea F."
                                            ]
                                        } : x
                                }["LiveBattle.useEffect"])
                        }["LiveBattle.useEffect"])
                }["LiveBattle.useEffect"], 6000)
            ];
            return ({
                "LiveBattle.useEffect": ()=>timers.forEach(clearTimeout)
            })["LiveBattle.useEffect"];
        }
    }["LiveBattle.useEffect"], []);
    function handleSelect(i) {
        if (revealed || selected !== null) return;
        setSelected(i);
        // Auto-reveal after 1.5s for solo
        if (mode === "solo") setTimeout(()=>setRevealed(true), 1500);
    }
    function handleVote(i) {
        setMyVote(i);
        setVotes((v)=>{
            const newV = v.filter((x)=>x.voters.indexOf("You") < 0).map((x)=>({
                    ...x,
                    voters: x.voters.filter((n)=>n !== "You"),
                    count: x.voters.includes("You") ? x.count - 1 : x.count
                }));
            const existing = newV.find((x)=>x.option === i);
            if (existing) return newV.map((x)=>x.option === i ? {
                    ...x,
                    count: x.count + 1,
                    voters: [
                        ...x.voters,
                        "You"
                    ]
                } : x);
            return [
                ...newV,
                {
                    option: i,
                    count: 1,
                    voters: [
                        "You"
                    ]
                }
            ];
        });
        setSelected(i);
    }
    function handleConfirmLeader() {
        setRevealed(true);
    }
    function sendChat() {
        if (!chatInput.trim()) return;
        setChat((c)=>[
                ...c,
                {
                    id: Date.now(),
                    player: "You",
                    initials: "ME",
                    color: AVATAR_COLORS[0],
                    text: chatInput.trim(),
                    ts: "now"
                }
            ]);
        setChatInput("");
    }
    function fireReaction(emoji, e) {
        const rect = e.target.getBoundingClientRect();
        const id = Date.now();
        setReactionBursts((r)=>[
                ...r,
                {
                    id,
                    emoji,
                    x: rect.left,
                    y: rect.top
                }
            ]);
        setTimeout(()=>setReactionBursts((r)=>r.filter((x)=>x.id !== id)), 1200);
    }
    // Vote percentages
    const totalVotes = votes.reduce((a, v)=>a + v.count, 0);
    function voteFor(i) {
        const v = votes.find((x)=>x.option === i);
        return totalVotes ? (v?.count ?? 0) / totalVotes * 100 : 0;
    }
    const pct = timeLeft / QUESTION.timeLimit * 100;
    const timerColor = pct > 50 ? C.green : pct > 25 ? C.yellow : C.coral;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentTopBar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes timerPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes rankPop      { 0%{transform:scale(0.9)} 60%{transform:scale(1.05)} 100%{transform:scale(1)} }
        @keyframes reactionFloat{ 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-80px) scale(1.5)} }
        @keyframes reconnecting { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes floatA       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes correctBurst { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.06)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideDown    { 0%{opacity:0;transform:translateY(-10px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn       { 0%{opacity:0} 100%{opacity:1} }
        @keyframes shimmer      { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes dotBlink     { 0%,100%{opacity:1} 50%{opacity:0} }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            reactionBursts.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "fixed",
                        left: r.x,
                        top: r.y,
                        fontSize: 28,
                        pointerEvents: "none",
                        zIndex: 1000,
                        animation: "reactionFloat 1.1s ease-out forwards"
                    },
                    children: r.emoji
                }, r.id, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                    lineNumber: 367,
                    columnNumber: 9
                }, this)),
            disconnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    top: 48,
                    left: 0,
                    right: 0,
                    zIndex: 900,
                    background: "rgba(255,71,87,0.95)",
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    animation: "slideDown 0.3s ease-out"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                        size: 16,
                        color: "#fff",
                        strokeWidth: 2.5,
                        style: {
                            animation: "reconnecting 1s ease-in-out infinite"
                        }
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff"
                        },
                        children: "Reconnecting to battle…"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 3
                        },
                        children: [
                            0,
                            1,
                            2
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.6)",
                                    display: "inline-block",
                                    animation: `dotBlink 1s ease-in-out ${i * 0.2}s infinite`
                                }
                            }, i, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 384,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setDisconnected(false),
                        style: {
                            marginLeft: 20,
                            background: "rgba(255,255,255,0.2)",
                            border: "none",
                            borderRadius: 8,
                            padding: "4px 12px",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "Manrope, sans-serif",
                            cursor: "pointer"
                        },
                        children: "Dismiss"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 373,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    background: `radial-gradient(ellipse at 20% 20%, rgba(91,61,246,0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.1) 0%, transparent 50%), ${C.navy}`,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    paddingTop: 48
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            background: "rgba(0,0,0,0.25)",
                            borderBottom: "1.5px solid rgba(255,255,255,0.06)",
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 36,
                                            height: 36,
                                            borderRadius: 11,
                                            background: C.indigo,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 3px 12px rgba(91,61,246,0.4)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            fill: C.yellow,
                                            color: "transparent",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 405,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    color: "rgba(255,255,255,0.5)",
                                                    margin: 0,
                                                    lineHeight: 1
                                                },
                                                children: "Question"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 411,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 19,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0,
                                                    lineHeight: 1
                                                },
                                                children: [
                                                    questionNum,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "rgba(255,255,255,0.3)"
                                                        },
                                                        children: [
                                                            "/ ",
                                                            QUESTION.total
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 413,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CountdownBar, {
                                timeLeft: timeLeft,
                                timeLimit: QUESTION.timeLimit
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    flexShrink: 0
                                },
                                children: [
                                    speedMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            background: "rgba(255,201,60,0.15)",
                                            border: "1.5px solid rgba(255,201,60,0.35)",
                                            borderRadius: 20,
                                            padding: "5px 12px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 13,
                                                fill: C.yellow,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    color: C.yellow,
                                                    letterSpacing: "0.05em"
                                                },
                                                children: "SPEED MODE"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1.5px solid rgba(255,255,255,0.1)",
                                            borderRadius: 20,
                                            padding: "5px 12px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                size: 12,
                                                fill: C.yellow,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 437,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                    color: "#fff"
                                                },
                                                children: [
                                                    QUESTION.points,
                                                    " pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 438,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            background: "rgba(255,255,255,0.07)",
                                            borderRadius: 20,
                                            padding: "3px 4px",
                                            gap: 3
                                        },
                                        children: [
                                            [
                                                "solo",
                                                "⚡ Solo"
                                            ],
                                            [
                                                "discussion",
                                                "👥 Team"
                                            ]
                                        ].map(([v, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setMode(v),
                                                style: {
                                                    background: mode === v ? C.indigo : "transparent",
                                                    border: "none",
                                                    borderRadius: 16,
                                                    padding: "4px 10px",
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: mode === v ? "#fff" : "rgba(255,255,255,0.4)",
                                                    cursor: "pointer",
                                                    transition: "all 0.15s"
                                                },
                                                children: l
                                            }, v, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMuted((v)=>!v),
                                        style: {
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1.5px solid rgba(255,255,255,0.1)",
                                            borderRadius: "50%",
                                            width: 34,
                                            height: 34,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            color: "rgba(255,255,255,0.45)"
                                        },
                                        children: muted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                            size: 15,
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                            lineNumber: 456,
                                            columnNumber: 24
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                            size: 15,
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                            lineNumber: 456,
                                            columnNumber: 63
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 452,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setDisconnected((v)=>!v),
                                        style: {
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1.5px solid rgba(255,255,255,0.1)",
                                            borderRadius: "50%",
                                            width: 34,
                                            height: 34,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            color: "rgba(255,255,255,0.45)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                            size: 15,
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 458,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 424,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            gap: 0,
                            overflow: "hidden",
                            minHeight: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "20px 20px 16px",
                                    overflow: "hidden",
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1.5px solid rgba(255,255,255,0.08)",
                                            borderRadius: 24,
                                            padding: "22px 26px",
                                            marginBottom: 16,
                                            flexShrink: 0,
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    marginBottom: 12,
                                                    flexWrap: "wrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            background: C.indigoLight,
                                                            border: "1.5px solid rgba(91,61,246,0.3)",
                                                            borderRadius: 8,
                                                            padding: "3px 10px",
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: "#A08FFF"
                                                        },
                                                        children: QUESTION.subject
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: "rgba(255,255,255,0.35)",
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.07em"
                                                        },
                                                        children: "Multiple Choice"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 479,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 26,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0,
                                                    lineHeight: 1.35
                                                },
                                                children: QUESTION.text
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 489,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                            flex: 1,
                                            overflow: "hidden"
                                        },
                                        children: QUESTION.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnswerBtn, {
                                                index: i,
                                                text: opt,
                                                selected: mode === "discussion" ? myVote === i : selected === i,
                                                revealed: revealed,
                                                isCorrect: i === QUESTION.correct,
                                                disabled: revealed || mode === "solo" && selected !== null,
                                                onClick: ()=>mode === "discussion" ? handleVote(i) : handleSelect(i),
                                                votePct: mode === "discussion" ? voteFor(i) : undefined
                                            }, i, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 14,
                                            padding: "14px 18px",
                                            borderRadius: 18,
                                            background: selected === QUESTION.correct ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)",
                                            border: `2px solid ${selected === QUESTION.correct ? C.green : C.red}`,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            flexShrink: 0,
                                            animation: "correctBurst 0.5s cubic-bezier(0.34,1.56,0.64,1)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 28,
                                                    flexShrink: 0
                                                },
                                                children: selected === QUESTION.correct ? "🎉" : "❌"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 516,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                            color: selected === QUESTION.correct ? C.green : C.red,
                                                            margin: 0
                                                        },
                                                        children: selected === QUESTION.correct ? "Correct! +" + QUESTION.points + " pts" : "Wrong Answer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 13,
                                                            color: "rgba(255,255,255,0.55)",
                                                            margin: 0
                                                        },
                                                        children: [
                                                            selected === null ? "Time's up! " : "",
                                                            "The answer is: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                style: {
                                                                    color: "#fff"
                                                                },
                                                                children: QUESTION.options[QUESTION.correct]
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 36
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 519,
                                                columnNumber: 17
                                            }, this),
                                            revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>navigate("results"),
                                                style: {
                                                    marginLeft: "auto",
                                                    background: C.indigo,
                                                    border: "none",
                                                    borderRadius: 12,
                                                    padding: "8px 16px",
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                    flexShrink: 0
                                                },
                                                children: "View Results →"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 531,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 240,
                                    minWidth: 240,
                                    background: "rgba(0,0,0,0.2)",
                                    borderLeft: "1.5px solid rgba(255,255,255,0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "14px 14px 10px",
                                            borderBottom: "1.5px solid rgba(255,255,255,0.06)",
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 7
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                        fill: C.yellow,
                                                        color: "transparent",
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 17,
                                                            fontWeight: 700,
                                                            color: "#fff"
                                                        },
                                                        children: "Leaderboard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 551,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 549,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    color: "rgba(255,255,255,0.3)",
                                                    margin: "3px 0 0",
                                                    fontWeight: 500
                                                },
                                                children: [
                                                    players.length,
                                                    " players · live"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 554,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            overflowY: "auto",
                                            padding: "8px 10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            ...players
                                        ].sort((a, b)=>a.rank - b.rank).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeaderRow, {
                                                player: p
                                            }, p.id, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 563,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 560,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 543,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this),
                    mode === "discussion" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 220,
                            background: "rgba(0,0,0,0.3)",
                            borderTop: "1.5px solid rgba(255,255,255,0.07)",
                            display: "flex",
                            gap: 0,
                            flexShrink: 0,
                            animation: "slideDown 0.3s ease-out"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRight: "1.5px solid rgba(255,255,255,0.06)",
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 14px 6px",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 6
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        size: 13,
                                                        color: "rgba(255,255,255,0.4)",
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: "rgba(255,255,255,0.4)"
                                                        },
                                                        children: "Team Discussion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this),
                                            meAsLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    background: "rgba(255,201,60,0.15)",
                                                    border: "1.5px solid rgba(255,201,60,0.3)",
                                                    borderRadius: 20,
                                                    padding: "3px 10px",
                                                    animation: "floatA 2.5s ease-in-out infinite"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                        size: 11,
                                                        fill: C.yellow,
                                                        color: "transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 10,
                                                            fontWeight: 800,
                                                            color: C.yellow
                                                        },
                                                        children: [
                                                            meAsLeader.name,
                                                            " leads"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 588,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 579,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            overflowY: "auto",
                                            padding: "8px 12px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8
                                        },
                                        children: [
                                            chat.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatBubble, {
                                                    msg: m
                                                }, m.id, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                    lineNumber: 603,
                                                    columnNumber: 32
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: chatEndRef
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 604,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 601,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 10px",
                                            borderTop: "1px solid rgba(255,255,255,0.05)",
                                            display: "flex",
                                            gap: 7,
                                            alignItems: "center",
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 4
                                                },
                                                children: REACTIONS.map((emoji)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (e)=>{
                                                            fireReaction(emoji, e);
                                                            setChat((c)=>[
                                                                    ...c,
                                                                    {
                                                                        id: Date.now(),
                                                                        player: "You",
                                                                        initials: "ME",
                                                                        color: AVATAR_COLORS[0],
                                                                        text: emoji,
                                                                        ts: "now"
                                                                    }
                                                                ]);
                                                        },
                                                        style: {
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: 8,
                                                            background: "rgba(255,255,255,0.06)",
                                                            border: "1px solid rgba(255,255,255,0.08)",
                                                            fontSize: 14,
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            transition: "transform 0.15s"
                                                        },
                                                        children: emoji
                                                    }, emoji, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: chatInput,
                                                onChange: (e)=>setChatInput(e.target.value),
                                                onKeyDown: (e)=>{
                                                    if (e.key === "Enter") sendChat();
                                                },
                                                placeholder: "Type to discuss…",
                                                style: {
                                                    flex: 1,
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1.5px solid rgba(255,255,255,0.1)",
                                                    borderRadius: 10,
                                                    padding: "7px 12px",
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    color: "#fff",
                                                    outline: "none",
                                                    "::placeholder": {
                                                        color: "rgba(255,255,255,0.25)"
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 630,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: sendChat,
                                                style: {
                                                    width: 32,
                                                    height: 32,
                                                    background: C.indigo,
                                                    border: "none",
                                                    borderRadius: 9,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    flexShrink: 0,
                                                    boxShadow: "0 2px 8px rgba(91,61,246,0.4)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                    size: 14,
                                                    color: "#fff",
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 638,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 608,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 576,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 260,
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRight: "1.5px solid rgba(255,255,255,0.06)",
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 14px 6px",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: "rgba(255,255,255,0.4)"
                                            },
                                            children: "Team Votes"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                            lineNumber: 653,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 651,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            overflowY: "auto",
                                            padding: "8px 12px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 6
                                        },
                                        children: QUESTION.options.map((opt, i)=>{
                                            const vpct = voteFor(i);
                                            const vdata = votes.find((v)=>v.option === i);
                                            const isMyVote = myVote === i;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>!revealed && handleVote(i),
                                                style: {
                                                    background: isMyVote ? "rgba(91,61,246,0.2)" : "rgba(255,255,255,0.04)",
                                                    border: `1.5px solid ${isMyVote ? "rgba(91,61,246,0.5)" : "rgba(255,255,255,0.07)"}`,
                                                    borderRadius: 12,
                                                    padding: "7px 10px",
                                                    cursor: revealed ? "default" : "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 8,
                                                    transition: "all 0.15s",
                                                    width: "100%"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 22,
                                                            height: 22,
                                                            borderRadius: 7,
                                                            flexShrink: 0,
                                                            background: OPTION_COLORS[i].base + "33",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: OPTION_COLORS[i].base
                                                        },
                                                        children: [
                                                            "A",
                                                            "B",
                                                            "C",
                                                            "D"
                                                        ][i]
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 600,
                                                            color: "rgba(255,255,255,0.6)",
                                                            flex: 1,
                                                            textAlign: "left",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: opt
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 5,
                                                            flexShrink: 0
                                                        },
                                                        children: [
                                                            vdata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex"
                                                                },
                                                                children: vdata.voters.slice(0, 3).map((voter, vi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: 16,
                                                                            height: 16,
                                                                            borderRadius: "50%",
                                                                            background: AVATAR_COLORS[vi],
                                                                            border: "1.5px solid rgba(0,0,0,0.4)",
                                                                            marginLeft: vi > 0 ? -5 : 0,
                                                                            fontSize: 7,
                                                                            fontWeight: 800,
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            color: "#fff",
                                                                            fontFamily: "Manrope, sans-serif",
                                                                            zIndex: 3 - vi,
                                                                            position: "relative"
                                                                        },
                                                                        children: voter[0]
                                                                    }, vi, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                                        lineNumber: 685,
                                                                        columnNumber: 31
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "Fredoka, sans-serif",
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                    color: isMyVote ? "#A08FFF" : "rgba(255,255,255,0.35)"
                                                                },
                                                                children: [
                                                                    Math.round(vpct),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                                lineNumber: 696,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 681,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 663,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 656,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 649,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 200,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "16px 14px",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                size: 22,
                                                fill: C.yellow,
                                                color: "transparent",
                                                style: {
                                                    animation: "floatA 2s ease-in-out infinite"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 711,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: "6px 0 2px"
                                                },
                                                children: "Leader Decision"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 713,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    color: "rgba(255,255,255,0.4)",
                                                    margin: 0,
                                                    lineHeight: 1.5
                                                },
                                                children: meAsLeader ? `${meAsLeader.name} leads the team` : "Waiting for leader to confirm…"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 715,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 710,
                                        columnNumber: 15
                                    }, this),
                                    meAsLeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 7
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "relative"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: "50%",
                                                            background: meAsLeader.color,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 800,
                                                            color: "#fff",
                                                            border: "2px solid rgba(255,201,60,0.5)"
                                                        },
                                                        children: meAsLeader.initials
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                                        size: 14,
                                                        fill: C.yellow,
                                                        color: "transparent",
                                                        style: {
                                                            position: "absolute",
                                                            top: -8,
                                                            left: "50%",
                                                            transform: "translateX(-50%)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 734,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 726,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "rgba(255,255,255,0.7)"
                                                },
                                                children: meAsLeader.name
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 738,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 725,
                                        columnNumber: 17
                                    }, this),
                                    meAsLeader && !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleConfirmLeader,
                                        disabled: myVote === null,
                                        style: {
                                            width: "100%",
                                            background: myVote !== null ? `linear-gradient(135deg,${C.green},${C.greenDeep})` : "rgba(46,212,122,0.2)",
                                            border: "none",
                                            borderRadius: 14,
                                            padding: "11px 0",
                                            fontFamily: "Fredoka, sans-serif",
                                            fontSize: 17,
                                            fontWeight: 700,
                                            color: myVote !== null ? "#fff" : "rgba(255,255,255,0.3)",
                                            cursor: myVote !== null ? "pointer" : "default",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 7,
                                            boxShadow: myVote !== null ? "0 4px 16px rgba(46,212,122,0.35)" : "none",
                                            transition: "all 0.2s"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 17,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 759,
                                                columnNumber: 19
                                            }, this),
                                            "Confirm Answer"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 745,
                                        columnNumber: 17
                                    }, this),
                                    revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            background: "rgba(46,212,122,0.12)",
                                            borderRadius: 12,
                                            padding: "8px 12px",
                                            border: "1.5px solid rgba(46,212,122,0.25)"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 14,
                                                color: C.green,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 767,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.green
                                                },
                                                children: "Answer locked!"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 768,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 764,
                                        columnNumber: 17
                                    }, this),
                                    !meAsLeader && !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 10px",
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1.5px solid rgba(255,255,255,0.07)",
                                            borderRadius: 12,
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    gap: 3,
                                                    marginBottom: 5
                                                },
                                                children: [
                                                    0,
                                                    1,
                                                    2
                                                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 5,
                                                            height: 5,
                                                            borderRadius: "50%",
                                                            background: C.yellow,
                                                            display: "inline-block",
                                                            animation: `dotBlink 1s ease-in-out ${i * 0.25}s infinite`
                                                        }
                                                    }, i, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                        lineNumber: 777,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 775,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    color: "rgba(255,255,255,0.35)",
                                                    fontWeight: 600
                                                },
                                                children: "Waiting for leader…"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                                lineNumber: 782,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                        lineNumber: 773,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                                lineNumber: 708,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                        lineNumber: 571,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/LiveBattle.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_s1(LiveBattle, "5aCiI0pshzcUNKHxJIp+rxm4Gq0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c5 = LiveBattle;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "AnimatedScore");
__turbopack_context__.k.register(_c1, "CountdownBar");
__turbopack_context__.k.register(_c2, "AnswerBtn");
__turbopack_context__.k.register(_c3, "LeaderRow");
__turbopack_context__.k.register(_c4, "ChatBubble");
__turbopack_context__.k.register(_c5, "LiveBattle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=quizarenaremastered_frontend_src_components_LiveBattle_tsx_0_43_li._.js.map