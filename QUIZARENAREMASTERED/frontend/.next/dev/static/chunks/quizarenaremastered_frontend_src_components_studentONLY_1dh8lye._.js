(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BattleLobby",
    ()=>BattleLobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/StudentTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$Battle_LiveQuiz$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$Battle_OwnPace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// ─── Palette ────────────────────────────────────────────────────────────────────
const C = {
    indigo: "#5B3DF6",
    indigoDeep: "#4228D4",
    indigoLight: "rgba(91,61,246,0.15)",
    coral: "#FF6B4A",
    coralDeep: "#E85A3A",
    yellow: "#FFC93C",
    yellowGlow: "rgba(255,201,60,0.5)",
    green: "#2ED47A",
    navy: "#1B1E2B",
    offWhite: "#FAFAFC",
    muted: "#717182"
};
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
    "#00BCD4",
    "#FF6B9D",
    "#43E97B"
];
const CAPACITY = 12;
function CountdownDisplay({ count }) {
    const color = count <= 1 ? C.coral : count <= 2 ? C.yellow : C.green;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(27,30,43,0.88)",
            backdropFilter: "blur(6px)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 180,
                    fontWeight: 700,
                    color,
                    lineHeight: 1
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = CountdownDisplay;
function PlayerChip({ player }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: `linear-gradient(145deg, ${player.color}, ${player.color}cc)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#fff",
                            boxShadow: player.isReady ? `0 0 0 3px ${C.green}, 0 4px 16px ${player.color}55` : `0 0 0 3px rgba(255,255,255,0.15)`
                        },
                        children: player.initials
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    player.isHost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: -8,
                            left: "50%",
                            transform: "translateX(-50%)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                            size: 16,
                            fill: C.yellow,
                            color: C.yellow
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.75)",
                    textAlign: "center",
                    maxWidth: 68,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                },
                children: player.name
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c1 = PlayerChip;
function EmptySlot() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "2px dashed rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 20,
                        color: "rgba(255,255,255,0.1)",
                        fontWeight: 700
                    },
                    children: "+"
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.18)"
                },
                children: "waiting…"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_c2 = EmptySlot;
function BattleLobby() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserSupabaseClient"])();
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hasJoined, setHasJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inputCode, setInputCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [roomCode, setRoomCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [actualSectionId, setActualSectionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [battleStarted, setBattleStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // DYNAMIC BATTLE MODE: Tracks "LIVE" vs "SELF_PACED" from Professor/Server
    const [battleMode, setBattleMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("LIVE");
    const handleJoinClick = async ()=>{
        if (!inputCode.trim()) {
            alert("Please enter a valid room code.");
            return;
        }
        const code = inputCode.trim().toUpperCase();
        try {
            const { data, error } = await supabase.from('quiz_sessions').select('section_id').eq('room_code', code).eq('status', 'ACTIVE').maybeSingle();
            if (error) {
                alert("Database Error: " + error.message);
                return;
            }
            if (!data) {
                alert("Invalid Code! If you are sure this code exists, Supabase RLS is blocking your read access.");
                return;
            }
            setRoomCode(code);
            setActualSectionId(data.section_id);
            setHasJoined(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Successfully joined the live lobby!");
        } catch (err) {
            alert("Failed to connect to the database.");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleLobby.useEffect": ()=>{
            if (!hasJoined || !actualSectionId) return;
            const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
            const socket = new WebSocket(wsUrl);
            wsRef.current = socket;
            const studentName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Unknown Student";
            socket.onopen = ({
                "BattleLobby.useEffect": ()=>{
                    // 1. Subscribe to the Redis room
                    socket.send(JSON.stringify({
                        type: "JOIN_BATTLE",
                        battleId: actualSectionId,
                        userId: user?.id || `user_${Math.random()}`,
                        sender: studentName
                    }));
                    // 2. Broadcast the Join Event as a BATTLE_ACTION so the server relays it
                    setTimeout({
                        "BattleLobby.useEffect": ()=>{
                            if (socket.readyState === WebSocket.OPEN) {
                                socket.send(JSON.stringify({
                                    type: "BATTLE_ACTION",
                                    battleId: actualSectionId,
                                    userId: user?.id || `user_${Math.random()}`,
                                    sender: studentName,
                                    message: "has joined the live lobby! ✅",
                                    isJoinEvent: true
                                }));
                            }
                        }
                    }["BattleLobby.useEffect"], 500);
                    setPlayers([
                        {
                            id: user?.id || "local-me",
                            name: studentName,
                            initials: studentName.substring(0, 2).toUpperCase(),
                            color: AVATAR_COLORS[0],
                            isHost: false,
                            isReady: true
                        }
                    ]);
                }
            })["BattleLobby.useEffect"];
            socket.onmessage = ({
                "BattleLobby.useEffect": (event)=>{
                    try {
                        const data = JSON.parse(event.data);
                        // Handle Start event from Professor & capture selected mode
                        if (data.type === "PROF_START_BATTLE" || data.type === "BATTLE_STARTED" || data.type === "START_BATTLE") {
                            const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
                            setBattleMode(mode === "SELF_PACED" || mode === "SELFPACED" ? "SELF_PACED" : "LIVE");
                            setCountdown({
                                "BattleLobby.useEffect": (prev)=>prev === null ? 3 : prev
                            }["BattleLobby.useEffect"]);
                        }
                        // Late-joining student mid-game bypasses lobby countdown
                        if (data.type === "ROOM_STATE_SYNC" && data.status === "active") {
                            const mode = (data.mode || data.battleMode || "LIVE").toUpperCase();
                            setBattleMode(mode === "SELF_PACED" || mode === "SELFPACED" ? "SELF_PACED" : "LIVE");
                            setBattleStarted(true);
                        }
                        // Handle incoming student peers joining the lobby
                        if (data.type === "PLAYER_JOINED" || data.type === "BATTLE_ACTION" && data.isJoinEvent) {
                            setPlayers({
                                "BattleLobby.useEffect": (prev)=>{
                                    if (prev.some({
                                        "BattleLobby.useEffect": (s)=>s.id === data.userId || s.name === data.sender
                                    }["BattleLobby.useEffect"])) return prev;
                                    return [
                                        ...prev,
                                        {
                                            id: data.userId || `peer_${Math.random()}`,
                                            name: data.sender || 'Peer',
                                            initials: (data.sender || 'PR').substring(0, 2).toUpperCase(),
                                            color: AVATAR_COLORS[prev.length % AVATAR_COLORS.length],
                                            isHost: false,
                                            isReady: true
                                        }
                                    ];
                                }
                            }["BattleLobby.useEffect"]);
                        }
                    } catch (err) {
                        console.error("WS error:", err);
                    }
                }
            })["BattleLobby.useEffect"];
            return ({
                "BattleLobby.useEffect": ()=>socket.close()
            })["BattleLobby.useEffect"];
        }
    }["BattleLobby.useEffect"], [
        hasJoined,
        actualSectionId,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleLobby.useEffect": ()=>{
            if (countdown === null) return;
            if (countdown === 0) {
                setTimeout({
                    "BattleLobby.useEffect": ()=>{
                        setBattleStarted(true);
                    }
                }["BattleLobby.useEffect"], 1500);
                setCountdown(null);
                return;
            }
            const t = setTimeout({
                "BattleLobby.useEffect.t": ()=>setCountdown({
                        "BattleLobby.useEffect.t": (c)=>(c ?? 1) - 1
                    }["BattleLobby.useEffect.t"])
            }["BattleLobby.useEffect.t"], 1000);
            return ({
                "BattleLobby.useEffect": ()=>clearTimeout(t)
            })["BattleLobby.useEffect"];
        }
    }["BattleLobby.useEffect"], [
        countdown
    ]);
    const emptySlots = Math.max(0, CAPACITY - players.length);
    // ROUTE DYNAMICALLY BASED ON PROFESSOR'S CHOSEN MODE
    if (battleStarted) {
        if (battleMode === "SELF_PACED") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$Battle_OwnPace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelfPacedBattle"], {
                battleId: actualSectionId
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 242,
                columnNumber: 14
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$Battle_LiveQuiz$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiveBattle"], {
            battleId: actualSectionId
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
            lineNumber: 244,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentTopBar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    background: C.navy,
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 48,
                    paddingBottom: 32
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            marginBottom: 24,
                            padding: "0 24px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "rgba(255,201,60,0.15)",
                                    border: "1.5px solid rgba(255,201,60,0.3)",
                                    borderRadius: 20,
                                    padding: "5px 16px",
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        size: 13,
                                        fill: C.yellow,
                                        color: "transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: C.yellow,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase"
                                        },
                                        children: "Battle Lobby"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "Fredoka, sans-serif",
                                    fontSize: 48,
                                    fontWeight: 700,
                                    color: "#fff",
                                    margin: 0
                                },
                                children: [
                                    "Ready to ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: C.yellow
                                        },
                                        children: "Battle?"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 260,
                                        columnNumber: 22
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: "100%",
                            maxWidth: 900,
                            margin: "0 auto",
                            padding: "0 24px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: "100%",
                                    maxWidth: 600
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1.5px solid rgba(255,255,255,0.1)",
                                        borderRadius: 24,
                                        padding: "22px 24px"
                                    },
                                    children: !hasJoined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "rgba(255,255,255,0.45)",
                                                    textAlign: "center",
                                                    margin: 0,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em"
                                                },
                                                children: "Enter Room Code"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 10
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: inputCode,
                                                        onChange: (e)=>setInputCode(e.target.value.toUpperCase()),
                                                        maxLength: 7,
                                                        placeholder: "QZ-0000",
                                                        style: {
                                                            flex: 1,
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "2px solid rgba(255,255,255,0.12)",
                                                            borderRadius: 16,
                                                            padding: "14px 20px",
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 36,
                                                            fontWeight: 700,
                                                            color: C.yellow,
                                                            outline: "none",
                                                            letterSpacing: "0.15em",
                                                            textAlign: "center",
                                                            width: "100%",
                                                            boxSizing: "border-box"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleJoinClick,
                                                        style: {
                                                            background: C.coral,
                                                            border: "none",
                                                            borderRadius: 16,
                                                            padding: "14px 28px",
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 22,
                                                            fontWeight: 700,
                                                            color: "#fff",
                                                            cursor: "pointer",
                                                            flexShrink: 0,
                                                            boxShadow: "0 6px 20px rgba(255,107,74,0.4)"
                                                        },
                                                        children: "Join!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 270,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 12,
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.green,
                                                    margin: 0,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em"
                                                },
                                                children: "Successfully Joined Room"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 291,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 42,
                                                    fontWeight: 700,
                                                    color: C.yellow,
                                                    letterSpacing: "0.15em"
                                                },
                                                children: roomCode
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 294,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this),
                            hasJoined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "100%",
                                            maxWidth: 900
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    marginBottom: 14
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                            size: 14,
                                                            color: "rgba(255,255,255,0.5)",
                                                            strokeWidth: 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 12,
                                                                fontWeight: 800,
                                                                color: "rgba(255,255,255,0.45)",
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.1em"
                                                            },
                                                            children: [
                                                                "Players (",
                                                                players.length,
                                                                "/",
                                                                CAPACITY,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                            lineNumber: 309,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1.5px solid rgba(255,255,255,0.08)",
                                                    borderRadius: 22,
                                                    padding: "22px 18px"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                                                        gap: "18px 12px"
                                                    },
                                                    children: [
                                                        players.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayerChip, {
                                                                player: p
                                                            }, p.id, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 23
                                                            }, this)),
                                                        Array.from({
                                                            length: emptySlots
                                                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptySlot, {}, `empty-${i}`, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "100%",
                                            maxWidth: 900,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 12
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                                padding: "16px 24px",
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1.5px solid rgba(255,255,255,0.1)",
                                                borderRadius: 18
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: 9,
                                                        height: 9,
                                                        borderRadius: "50%",
                                                        background: C.yellow,
                                                        animation: "dotPulse 1s ease-in-out infinite",
                                                        flexShrink: 0
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 14,
                                                        fontWeight: 700,
                                                        color: "rgba(255,255,255,0.55)"
                                                    },
                                                    children: "Waiting for the professor to start the battle…"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                            lineNumber: 326,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            countdown !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CountdownDisplay, {
                count: countdown
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 339,
                columnNumber: 30
            }, this),
            countdown === 0 && !battleStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    zIndex: 500,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${C.indigoDeep}, #2D0E8A)`,
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                        fill: C.yellow,
                        color: "transparent",
                        size: 64
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 343,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: 56,
                            fontWeight: 700,
                            color: "#fff"
                        },
                        children: "Battle Begins!"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
                lineNumber: 342,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleLobby.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_s(BattleLobby, "6uEUY01/I0Yd6Cb/jBiaXooLnA4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c3 = BattleLobby;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CountdownDisplay");
__turbopack_context__.k.register(_c1, "PlayerChip");
__turbopack_context__.k.register(_c2, "EmptySlot");
__turbopack_context__.k.register(_c3, "BattleLobby");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BattleResults",
    ()=>BattleResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/StudentTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const WS_URL = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
const C = {
    indigo: "#5B3DF6",
    indigoDeep: "#4228D4",
    indigoLight: "rgba(91,61,246,0.15)",
    indigoGlow: "rgba(91,61,246,0.4)",
    coral: "#FF6B4A",
    coralDeep: "#D44A2A",
    coralLight: "rgba(255,107,74,0.15)",
    coralGlow: "rgba(255,107,74,0.4)",
    yellow: "#FFC93C",
    yellowDeep: "#E8A800",
    yellowLight: "rgba(255,201,60,0.15)",
    yellowGlow: "rgba(255,201,60,0.5)",
    green: "#2ED47A",
    greenDeep: "#18A058",
    greenLight: "rgba(46,212,122,0.12)",
    red: "#FF4757",
    navy: "#1B1E2B",
    navyLight: "#252840",
    navyMid: "#1F223A",
    white: "#FFFFFF",
    offWhite: "#FAFAFC",
    muted: "rgba(255,255,255,0.4)"
};
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
function useParticles(count) {
    return Array.from({
        length: count
    }, (_, i)=>({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 1.5,
            dur: 2.5 + Math.random() * 2,
            color: [
                C.yellow,
                C.coral,
                C.indigo,
                C.green,
                "#FF9F40",
                "#5BC8F6",
                "#B06EF6"
            ][i % 7],
            size: 6 + Math.random() * 8,
            shape: [
                "rect",
                "rect",
                "circle",
                "star"
            ][i % 4],
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 720
        }));
}
function Counter({ to, delay = 0 }) {
    _s();
    const [val, setVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Counter.useEffect": ()=>{
            const t = setTimeout({
                "Counter.useEffect.t": ()=>{
                    const steps = 40;
                    let i = 0;
                    const iv = setInterval({
                        "Counter.useEffect.t.iv": ()=>{
                            i++;
                            setVal(Math.round(to * i / steps));
                            if (i >= steps) clearInterval(iv);
                        }
                    }["Counter.useEffect.t.iv"], 22);
                    return ({
                        "Counter.useEffect.t": ()=>clearInterval(iv)
                    })["Counter.useEffect.t"];
                }
            }["Counter.useEffect.t"], delay);
            return ({
                "Counter.useEffect": ()=>clearTimeout(t)
            })["Counter.useEffect"];
        }
    }["Counter.useEffect"], [
        to,
        delay
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: val.toLocaleString()
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
_s(Counter, "J9W7PNt/cWQtiNkcKYTpkMkMUx4=");
_c = Counter;
function RankDelta({ delta }) {
    if (delta > 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontFamily: "Manrope, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: C.green
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                size: 11,
                strokeWidth: 3
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            delta
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
    if (delta < 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontFamily: "Manrope, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: C.red
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                size: 11,
                strokeWidth: 3
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            Math.abs(delta)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
        size: 10,
        color: "rgba(255,255,255,0.25)",
        strokeWidth: 2
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 90,
        columnNumber: 10
    }, this);
}
_c1 = RankDelta;
function ShareModal({ rank, score, onClose }) {
    _s1();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shareText = `🏆 I ranked #${rank} in QuizArena with ${score.toLocaleString()} pts! Can you beat me? #QuizArena #UMak`;
    function copy() {
        navigator.clipboard?.writeText(shareText).catch(()=>{});
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)"
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: C.navyLight,
                border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 24,
                padding: 28,
                width: 340,
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "Fredoka, sans-serif",
                                fontSize: 22,
                                fontWeight: 700,
                                color: "#fff"
                            },
                            children: "Share Results"
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            style: {
                                background: "rgba(255,255,255,0.07)",
                                border: "none",
                                borderRadius: "50%",
                                width: 32,
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "rgba(255,255,255,0.5)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 15,
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: `linear-gradient(135deg,${C.indigo},${C.indigoDeep})`,
                        borderRadius: 16,
                        padding: "16px 18px",
                        marginBottom: 16,
                        border: "1.5px solid rgba(255,255,255,0.15)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "Fredoka, sans-serif",
                                fontSize: 15,
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.7)",
                                margin: "0 0 4px"
                            },
                            children: "QuizArena · UMak"
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "Fredoka, sans-serif",
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#fff",
                                margin: 0,
                                lineHeight: 1.4
                            },
                            children: [
                                "🏆 Ranked #",
                                rank,
                                " with ",
                                score.toLocaleString(),
                                " pts!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "rgba(255,255,255,0.04)",
                        border: "1.5px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "10px 12px",
                        marginBottom: 14,
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.6
                    },
                    children: shareText
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: copy,
                    style: {
                        width: "100%",
                        background: copied ? C.green : C.coral,
                        border: "none",
                        borderRadius: 14,
                        padding: "12px 0",
                        fontFamily: "Fredoka, sans-serif",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8
                    },
                    children: [
                        copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 18,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            size: 16,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 120,
                            columnNumber: 60
                        }, this),
                        copied ? "Copied!" : "Copy to Clipboard"
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s1(ShareModal, "NE86rL3vg4NVcTTWDavsT0hUBJs=");
_c2 = ShareModal;
function PodiumAvatar({ player, rank }) {
    const sizes = {
        1: 72,
        2: 60,
        3: 56
    };
    const rings = {
        1: C.yellow,
        2: "rgba(255,255,255,0.5)",
        3: "#CD7F32"
    };
    const glows = {
        1: C.yellowGlow,
        2: "rgba(255,255,255,0.2)",
        3: "rgba(205,127,50,0.3)"
    };
    const medals = [
        "🥇",
        "🥈",
        "🥉"
    ];
    const sz = sizes[rank];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6
        },
        children: [
            rank === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                size: 28,
                fill: C.yellow,
                color: "transparent",
                style: {
                    animation: "floatA 2s ease-in-out infinite",
                    filter: `drop-shadow(0 2px 6px ${C.yellowGlow})`
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this),
            rank !== 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 22
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 140,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: sz,
                            height: sz,
                            borderRadius: "50%",
                            background: player.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: sz * 0.3,
                            fontWeight: 700,
                            color: "#fff",
                            border: `${rank === 1 ? 4 : 3}px solid ${rings[rank]}`,
                            boxShadow: `0 0 0 ${rank === 1 ? 6 : 4}px ${glows[rank]}, 0 8px 24px rgba(0,0,0,0.4)`,
                            animation: rank === 1 ? "floatA 2.4s ease-in-out infinite" : rank === 2 ? "floatB 2.8s ease-in-out infinite" : "floatC 3.2s ease-in-out infinite"
                        },
                        children: player.initials
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    player.streak >= 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: -8,
                            right: -8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                            size: 18,
                            fill: C.coral,
                            color: "transparent",
                            style: {
                                filter: `drop-shadow(0 0 4px ${C.coralGlow})`
                            }
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 22
                },
                children: medals[rank - 1]
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: rank === 1 ? 17 : 15,
                            fontWeight: 700,
                            color: "#fff",
                            margin: 0,
                            lineHeight: 1.2
                        },
                        children: [
                            player.name,
                            player.isMe && " ✦"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: rank === 1 ? 22 : 18,
                            fontWeight: 700,
                            color: rank === 1 ? C.yellow : "rgba(255,255,255,0.7)",
                            margin: "2px 0 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Counter, {
                            to: player.score,
                            delay: rank === 1 ? 600 : rank === 2 ? 400 : 800
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_c3 = PodiumAvatar;
function PodiumStep({ rank }) {
    const heights = {
        1: 100,
        2: 72,
        3: 56
    };
    const colors = {
        1: `linear-gradient(160deg,${C.yellow},${C.yellowDeep})`,
        2: `linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))`,
        3: `linear-gradient(160deg,rgba(205,127,50,0.5),rgba(205,127,50,0.25))`
    };
    const labels = {
        1: "1st",
        2: "2nd",
        3: "3rd"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: 100,
            height: heights[rank],
            background: colors[rank],
            border: rank === 1 ? `2px solid ${C.yellow}99` : rank === 2 ? "2px solid rgba(255,255,255,0.25)" : "2px solid rgba(205,127,50,0.4)",
            borderRadius: "14px 14px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                fontFamily: "Fredoka, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: rank === 1 ? "#1B1E2B" : rank === 2 ? "rgba(255,255,255,0.7)" : "rgba(205,127,50,0.9)"
            },
            children: labels[rank]
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
            lineNumber: 182,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_c4 = PodiumStep;
function BattleResults({ battleId = "room-demo", myResultData }) {
    _s2();
    const { user, navigate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const particles = useParticles(48);
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showShare, setShowShare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confettiActive, setConfettiActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [scoreVisible, setScoreVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scoreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUserId = user?.id || "my-id";
    const currentUserName = user?.name || "You";
    const processLeaderboard = (rawLeaderboard)=>{
        const sorted = [
            ...rawLeaderboard
        ].sort((a, b)=>(b.score || 0) - (a.score || 0));
        return sorted.map((item, idx)=>{
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
                accuracy: item.accuracy || (item.total ? Math.round(item.correct / item.total * 100) : 0),
                streak: item.streak || 0,
                rank: idx + 1,
                isMe,
                delta: item.delta || 0
            };
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleResults.useEffect": ()=>{
            const ws = new WebSocket(WS_URL);
            wsRef.current = ws;
            ws.onopen = ({
                "BattleResults.useEffect": ()=>{
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
                }
            })["BattleResults.useEffect"];
            ws.onmessage = ({
                "BattleResults.useEffect": (event)=>{
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
                }
            })["BattleResults.useEffect"];
            return ({
                "BattleResults.useEffect": ()=>{
                    ws.close();
                }
            })["BattleResults.useEffect"];
        }
    }["BattleResults.useEffect"], [
        battleId,
        currentUserId,
        currentUserName
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleResults.useEffect": ()=>{
            const timer = setTimeout({
                "BattleResults.useEffect.timer": ()=>setConfettiActive(false)
            }["BattleResults.useEffect.timer"], 5000);
            return ({
                "BattleResults.useEffect": ()=>clearTimeout(timer)
            })["BattleResults.useEffect"];
        }
    }["BattleResults.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleResults.useEffect": ()=>{
            const obs = new IntersectionObserver({
                "BattleResults.useEffect": ([e])=>{
                    if (e.isIntersecting) setScoreVisible(true);
                }
            }["BattleResults.useEffect"], {
                threshold: 0.3
            });
            if (scoreRef.current) obs.observe(scoreRef.current);
            return ({
                "BattleResults.useEffect": ()=>obs.disconnect()
            })["BattleResults.useEffect"];
        }
    }["BattleResults.useEffect"], []);
    const me = players.find((p)=>p.isMe) || {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentTopBar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes confettiFall {
          0% { transform:translateY(-20px) rotate(0deg); opacity:1; }
          100%{ transform:translateY(110vh) rotate(360deg); opacity:0; }
        }
        @keyframes fadeSlide{ 0%{opacity:0;transform:translateY(16px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { 0%{opacity:0;transform:translateY(30px)} 100%{opacity:1;transform:translateY(0)} }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 328,
                columnNumber: 7
            }, this),
            confettiActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 50,
                    overflow: "hidden"
                },
                children: particles.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            left: `${p.x}%`,
                            top: 0,
                            width: p.size,
                            height: p.size,
                            borderRadius: p.shape === "circle" ? "50%" : 0,
                            background: p.color,
                            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`
                        }
                    }, p.id, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 344,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 342,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingTop: 48,
                    background: `radial-gradient(ellipse at 50% 0%, rgba(91,61,246,0.22) 0%, transparent 55%), ${C.navy}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            padding: "36px 24px 0",
                            position: "relative"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 10,
                                    background: "rgba(255,201,60,0.12)",
                                    border: "2px solid rgba(255,201,60,0.3)",
                                    borderRadius: 40,
                                    padding: "6px 20px",
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        size: 18,
                                        fill: C.yellow,
                                        color: "transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 358,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 13,
                                            fontWeight: 800,
                                            color: C.yellow,
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase"
                                        },
                                        children: "Battle Complete!"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        size: 18,
                                        fill: C.yellow,
                                        color: "transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 362,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "Fredoka, sans-serif",
                                    fontSize: 54,
                                    fontWeight: 700,
                                    margin: "0 0 4px",
                                    background: `linear-gradient(135deg, ${C.yellow}, #fff 45%, ${C.coral})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                },
                                children: "Game Over!"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "rgba(255,255,255,0.45)",
                                    margin: "0 0 32px"
                                },
                                children: [
                                    "Computer Science · Live Redis Sync · ",
                                    me.total,
                                    " Questions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    gap: 0,
                                    position: "relative"
                                },
                                children: top3.map((player, idx)=>{
                                    const rank = [
                                        2,
                                        1,
                                        3
                                    ][idx];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            animation: `slideUp 0.6s ${idx * 0.15}s cubic-bezier(0.34,1.56,0.64,1) both`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    paddingBottom: 12
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PodiumAvatar, {
                                                    player: player,
                                                    rank: rank
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PodiumStep, {
                                                rank: rank
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 381,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `${player.id}-${idx}`, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 377,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 373,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scoreRef,
                        style: {
                            maxWidth: 740,
                            margin: "28px auto 0",
                            padding: "0 20px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: `linear-gradient(135deg, rgba(255,107,74,0.15), rgba(255,107,74,0.05))`,
                                border: `2px solid ${C.coral}66`,
                                borderRadius: 24,
                                padding: "20px 24px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 18
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 38,
                                                height: 38,
                                                borderRadius: 12,
                                                background: C.coral,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                fill: "#fff",
                                                color: "transparent",
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: "rgba(255,255,255,0.4)",
                                                        margin: 0,
                                                        textTransform: "uppercase"
                                                    },
                                                    children: "Your Performance"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Fredoka, sans-serif",
                                                        fontSize: 20,
                                                        fontWeight: 700,
                                                        color: "#fff",
                                                        margin: 0
                                                    },
                                                    children: "Score Breakdown"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                            lineNumber: 395,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginLeft: "auto",
                                                textAlign: "right"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Fredoka, sans-serif",
                                                        fontSize: 36,
                                                        fontWeight: 700,
                                                        color: C.coral,
                                                        margin: 0
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Counter, {
                                                        to: me.score,
                                                        delay: 300
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: "rgba(255,255,255,0.35)",
                                                        margin: 0
                                                    },
                                                    children: "total points"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                            lineNumber: 399,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: 12
                                    },
                                    children: [
                                        {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 409,
                                                columnNumber: 24
                                            }, this),
                                            label: "Correct Answers",
                                            value: `${me.correct}/${me.total}`,
                                            color: C.green
                                        },
                                        {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 410,
                                                columnNumber: 24
                                            }, this),
                                            label: "Speed Bonus",
                                            value: `+${me.speedBonus}`,
                                            color: C.yellow
                                        },
                                        {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 411,
                                                columnNumber: 24
                                            }, this),
                                            label: "Accuracy",
                                            value: `${me.accuracy}%`,
                                            color: C.indigo
                                        }
                                    ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1.5px solid rgba(255,255,255,0.08)",
                                                borderRadius: 16,
                                                padding: "14px 14px 12px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 7,
                                                        marginBottom: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: stat.color
                                                            },
                                                            children: stat.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: "rgba(255,255,255,0.4)"
                                                            },
                                                            children: stat.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Fredoka, sans-serif",
                                                        fontSize: 28,
                                                        fontWeight: 700,
                                                        color: stat.color,
                                                        margin: "0 0 8px"
                                                    },
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                            lineNumber: 413,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 740,
                            margin: "20px auto 0",
                            padding: "0 20px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 14
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        size: 17,
                                        fill: C.yellow,
                                        color: "transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Fredoka, sans-serif",
                                            fontSize: 21,
                                            fontWeight: 700,
                                            color: "#fff"
                                        },
                                        children: "Final Leaderboard"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: "rgba(255,255,255,0.07)",
                                            borderRadius: 20,
                                            padding: "3px 10px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "rgba(255,255,255,0.4)"
                                        },
                                        children: [
                                            players.length,
                                            " connected"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: C.navyLight,
                                    border: "1.5px solid rgba(255,255,255,0.07)",
                                    borderRadius: 20,
                                    overflow: "hidden"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "44px 1fr 80px 80px 80px 64px",
                                            padding: "11px 16px",
                                            borderBottom: "1.5px solid rgba(255,255,255,0.07)",
                                            background: "rgba(255,255,255,0.03)"
                                        },
                                        children: [
                                            "#",
                                            "Player",
                                            "Score",
                                            "Correct",
                                            "Accuracy",
                                            "Trend"
                                        ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: "rgba(255,255,255,0.3)",
                                                    textTransform: "uppercase",
                                                    textAlign: i >= 2 ? "center" : "left"
                                                },
                                                children: h
                                            }, i, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                lineNumber: 440,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this),
                                    players.map((player, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "44px 1fr 80px 80px 80px 64px",
                                                padding: "12px 16px",
                                                alignItems: "center",
                                                borderBottom: idx < players.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                                background: player.isMe ? "rgba(255,107,74,0.1)" : "transparent"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Fredoka, sans-serif",
                                                        fontSize: 17,
                                                        fontWeight: 700,
                                                        color: "rgba(255,255,255,0.35)"
                                                    },
                                                    children: [
                                                        "#",
                                                        player.rank
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: "50%",
                                                                background: player.color,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 12,
                                                                fontWeight: 800,
                                                                color: "#fff"
                                                            },
                                                            children: player.initials
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 14,
                                                                fontWeight: 700,
                                                                color: "#fff"
                                                            },
                                                            children: player.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Fredoka, sans-serif",
                                                        fontSize: 17,
                                                        fontWeight: 700,
                                                        color: C.yellow,
                                                        margin: 0,
                                                        textAlign: "center"
                                                    },
                                                    children: player.score.toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "rgba(255,255,255,0.6)",
                                                        margin: 0,
                                                        textAlign: "center"
                                                    },
                                                    children: [
                                                        player.correct,
                                                        "/",
                                                        player.total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: C.green,
                                                        margin: 0,
                                                        textAlign: "center"
                                                    },
                                                    children: [
                                                        player.accuracy,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RankDelta, {
                                                        delta: player.delta
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, player.id, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: 740,
                            margin: "24px auto 36px",
                            padding: "0 20px",
                            display: "flex",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigate("lobby"),
                                style: {
                                    flex: 1,
                                    background: `linear-gradient(135deg,${C.coral},${C.coralDeep})`,
                                    border: "none",
                                    borderRadius: 18,
                                    padding: "16px 28px",
                                    fontFamily: "Fredoka, sans-serif",
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "#fff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this),
                                    " Play Again"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigate("lobby"),
                                style: {
                                    flex: 1,
                                    background: "rgba(255,255,255,0.06)",
                                    border: "2px solid rgba(255,255,255,0.15)",
                                    borderRadius: 18,
                                    padding: "16px 24px",
                                    fontFamily: "Fredoka, sans-serif",
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: "rgba(255,255,255,0.7)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                        lineNumber: 474,
                                        columnNumber: 13
                                    }, this),
                                    " Back to Lobby"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowShare(true),
                                style: {
                                    width: 58,
                                    height: 58,
                                    borderRadius: 18,
                                    background: C.indigo,
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                    size: 20,
                                    color: "#fff"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            showShare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShareModal, {
                rank: me.rank,
                score: me.score,
                onClose: ()=>setShowShare(false)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
                lineNumber: 483,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/BattleResultsONLY/Results_LiveQuiz.tsx",
        lineNumber: 326,
        columnNumber: 5
    }, this);
}
_s2(BattleResults, "X+L1iH06AKYdAN7IXVJ6Ke/wTDU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        useParticles
    ];
});
_c5 = BattleResults;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Counter");
__turbopack_context__.k.register(_c1, "RankDelta");
__turbopack_context__.k.register(_c2, "ShareModal");
__turbopack_context__.k.register(_c3, "PodiumAvatar");
__turbopack_context__.k.register(_c4, "PodiumStep");
__turbopack_context__.k.register(_c5, "BattleResults");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BattleRoyale",
    ()=>BattleRoyale,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/skull.js [app-client] (ecmascript) <export default as Skull>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BattleRoyale({ battleId = '', initialStartingHp = 3, initialHp = 3, onLeaveBattle }) {
    _s();
    // WebSocket State for Player Health
    const [startingHp, setStartingHp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStartingHp);
    const [hp, setHp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialHp);
    const [selectedOption, setSelectedOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    // Example list of survivors synced with WebSocket/room state
    const [survivors, setSurvivors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: '1',
            name: 'Alex',
            initials: 'AM',
            color: '#5B3DF6',
            isYou: true,
            lives: hp
        },
        {
            id: '2',
            name: 'Trisha',
            initials: 'TV',
            color: '#9B51E0',
            lives: 2
        },
        {
            id: '3',
            name: 'Ana',
            initials: 'AR',
            color: '#FF6B4A',
            lives: 3
        },
        {
            id: '4',
            name: 'Carlo',
            initials: 'CB',
            color: '#2ED47A',
            lives: 1
        },
        {
            id: '5',
            name: 'Maria',
            initials: 'MS',
            color: '#FFC93C',
            lives: 2
        },
        {
            id: '6',
            name: 'Juan',
            initials: 'JD',
            color: '#FF4757',
            lives: 1
        },
        {
            id: '7',
            name: 'Ben',
            initials: 'BA',
            color: '#F2994A',
            lives: 3
        },
        {
            id: '8',
            name: 'Lea',
            initials: 'LF',
            color: '#2D9CDB',
            lives: 2
        },
        {
            id: '9',
            name: 'Sofia',
            initials: 'SC',
            color: '#E056FD',
            lives: 1
        },
        {
            id: '10',
            name: 'Diego',
            initials: 'DL',
            color: '#0019A7',
            lives: 3
        }
    ]);
    // Keep player lives synced with current HP state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleRoyale.useEffect": ()=>{
            setSurvivors({
                "BattleRoyale.useEffect": (prev)=>prev.map({
                        "BattleRoyale.useEffect": (s)=>s.isYou ? {
                                ...s,
                                lives: hp
                            } : s
                    }["BattleRoyale.useEffect"])
            }["BattleRoyale.useEffect"]);
        }
    }["BattleRoyale.useEffect"], [
        hp
    ]);
    // WebSocket Listener Simulation (Replace with actual socket listener)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BattleRoyale.useEffect": ()=>{
        /* Example WebSocket connection setup:
    const ws = new WebSocket(`wss://your-backend.com/battles/${battleId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'GAME_START') {
        setStartingHp(data.startingHp);
        setHp(data.startingHp);
      }
      if (data.type === 'HP_UPDATE') {
        setHp(data.hp);
      }
    };
    return () => ws.close();
    */ }
    }["BattleRoyale.useEffect"], [
        battleId
    ]);
    const activeSurvivorsCount = survivors.filter((s)=>s.lives > 0).length;
    const options = [
        {
            key: 'A',
            text: 'O(n)',
            color: '#A06AF6'
        },
        {
            key: 'B',
            text: 'O(log n)',
            color: '#FF6B4A'
        },
        {
            key: 'C',
            text: 'O(n log n)',
            color: '#2ED47A'
        },
        {
            key: 'D',
            text: 'O(1)',
            color: '#FFC93C'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#131524] text-white flex flex-col font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "px-6 py-3 flex items-center justify-between border-b border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 font-black text-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "size-7 bg-[#5B3DF6] rounded-lg flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            size: 16,
                                            fill: "#FFF",
                                            color: "transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    "QuizArena"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs text-[#8F93A8]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Battle Lobby"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-semibold",
                                        children: "Battle Royale"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#FF4757]/15 border border-[#FF4757] px-3 py-1 rounded-full text-xs font-extrabold text-[#FF4757] flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__["Skull"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    " ROYALE"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onLeaveBattle,
                                className: "bg-[#FF4757]/15 border-none text-[#FF4757] px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    " Exit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-5 grid grid-cols-[1fr_280px] gap-5 min-h-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-extrabold text-[#8F93A8] uppercase",
                                                children: "ROUND"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 121,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-black",
                                                children: round
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 124,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl font-black leading-none",
                                                children: activeSurvivorsCount
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-extrabold text-[#8F93A8] tracking-widest uppercase",
                                                children: "PLAYERS REMAINING"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 131,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 bg-[#FF4757]/10 border border-[#FF4757]/30 px-3 py-1 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-extrabold text-[#FF4757] uppercase",
                                                children: "HP:"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-black text-white",
                                                children: [
                                                    hp,
                                                    " / ",
                                                    startingHp
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#FF4757]/10 border border-[#FF4757]/30 rounded-2xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase",
                                                children: "Computer Science"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-[#FF4757]/20 text-[#FF4757] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase",
                                                children: "WRONG ANSWER = ELIMINATED"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "m-0 text-xl font-extrabold leading-snug",
                                        children: "What is the time complexity of searching for an element in a balanced Binary Search Tree?"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3",
                                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setSelectedOption(opt.key),
                                        className: `p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all border ${selectedOption === opt.key ? 'bg-white/10 border-indigo-500' : 'bg-white/[0.03] border-white/10'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-7 rounded-lg text-white flex items-center justify-center font-extrabold text-sm",
                                                style: {
                                                    backgroundColor: opt.color
                                                },
                                                children: opt.key
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-base text-white/90",
                                                children: opt.text
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, opt.key, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-b border-white/10 pb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-extrabold flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__["Skull"], {
                                            size: 15,
                                            className: "text-[#FF4757]"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, this),
                                        " Survivors"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-5 gap-3 row-gap-4",
                                children: survivors.map((s)=>{
                                    const isDead = s.lives <= 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex flex-col items-center gap-1 relative ${isDead ? 'opacity-30' : 'opacity-100'}`,
                                        children: [
                                            s.isYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[8px] font-black bg-[#FFC93C] text-black px-1 rounded absolute -top-2 z-10",
                                                children: "YOU"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 207,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-9 rounded-full flex items-center justify-center font-extrabold text-xs text-white border-2 border-white/10 relative",
                                                style: {
                                                    backgroundColor: s.color
                                                },
                                                children: isDead ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__["Skull"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 31
                                                }, this) : s.initials
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 211,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-[#8F93A8] font-bold",
                                                children: s.name
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 217,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-0.5",
                                                children: Array.from({
                                                    length: startingHp
                                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                        size: 8,
                                                        fill: i < s.lives ? '#FF4757' : 'transparent',
                                                        color: i < s.lives ? '#FF4757' : 'rgba(255,255,255,0.2)'
                                                    }, i, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                                lineNumber: 220,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_BattleRoyale.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(BattleRoyale, "Tece/4MahCfqHZHUVmKKnUzK3Hg=");
_c = BattleRoyale;
const __TURBOPACK__default__export__ = BattleRoyale;
var _c;
__turbopack_context__.k.register(_c, "BattleRoyale");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiveBattle",
    ()=>LiveBattle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/StudentTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$CountdownBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$AnswerButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$LeaderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function LiveBattle({ battleId }) {
    _s();
    const { navigate, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const currentQuestion = questions[currentIndex];
    const [startedAt, setStartedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(15);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [myVote, setMyVote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [votes, setVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [chat, setChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_CHAT"]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("discussion");
    const [speedMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [reactionBursts, setReactionBursts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const studentName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Student";
    const currentUserId = user?.id || "local-me";
    const computeTimeLeft = (limit, startTs)=>{
        if (!startTs) return limit;
        const elapsedSeconds = Math.floor((Date.now() - startTs) / 1000);
        return Math.max(limit - elapsedSeconds, 0);
    };
    // Helper to format incoming raw question objects into QuestionData format
    const formatQuestions = (rawQuestions)=>{
        return rawQuestions.map((q, idx)=>{
            let parsedChoices = [];
            try {
                let rawChoices = q.choices || q.options;
                if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
                if (Array.isArray(rawChoices)) {
                    parsedChoices = rawChoices.map((c)=>String(typeof c === 'object' && c !== null ? c.text || c.label || String(c) : c));
                }
            } catch (e) {
                parsedChoices = [];
            }
            const correctIdx = parsedChoices.findIndex((c)=>c === q.answer);
            return {
                id: q.id || idx,
                number: idx + 1,
                total: rawQuestions.length,
                subject: q.topic || q.subject || "General Knowledge",
                text: q.text || q.question,
                options: parsedChoices,
                correct: correctIdx !== -1 ? correctIdx : Number(q.correct) || 0,
                points: Number(q.points) || 10,
                timeLimit: Number(q.timeLimit) || 60
            };
        });
    };
    // 1. Fallback Questions Loader
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            async function loadFallbackQuestions() {
                if (questions.length > 0) return;
                try {
                    const res = await fetch('/api/questions');
                    if (res.ok) {
                        const data = await res.json();
                        if (Array.isArray(data) && data.length > 0) {
                            setQuestions(formatQuestions(data));
                        }
                    }
                } catch (err) {
                    console.error("Failed to load fallback questions:", err);
                }
            }
            loadFallbackQuestions();
        }
    }["LiveBattle.useEffect"], [
        questions.length
    ]);
    // 2. WebSocket Sync Connection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            let socket = null;
            let isMounted = true;
            function connectWs() {
                if (!isMounted) return;
                const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
                socket = new WebSocket(wsUrl);
                socketRef.current = socket;
                socket.onopen = ({
                    "LiveBattle.useEffect.connectWs": ()=>{
                        socket?.send(JSON.stringify({
                            type: "JOIN_BATTLE",
                            battleId: battleId || "room_101",
                            userId: currentUserId,
                            sender: studentName
                        }));
                    }
                })["LiveBattle.useEffect.connectWs"];
                socket.onmessage = ({
                    "LiveBattle.useEffect.connectWs": (event)=>{
                        try {
                            const data = JSON.parse(event.data);
                            // Extract questions from room sync or payload
                            const rawQuestions = data.questions || data.roomState?.questions || data.payload?.questions;
                            if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
                                setQuestions(formatQuestions(rawQuestions));
                            }
                            // State synchronization events
                            if (data.type === "ROOM_STATE_SYNC" || data.type === "QUESTION_ADVANCED" || data.type === "PROF_START_BATTLE") {
                                if (typeof data.currentIndex === "number") {
                                    setCurrentIndex(data.currentIndex);
                                }
                                if (data.startedAt) {
                                    setStartedAt(data.startedAt);
                                }
                            }
                            // Live Leaderboard / Score Sync
                            if (data.type === "SCORE_UPDATED" || data.type === "LEADERBOARD_UPDATE") {
                                if (Array.isArray(data.leaderboard)) {
                                    const formattedPlayers = data.leaderboard.map({
                                        "LiveBattle.useEffect.connectWs.formattedPlayers": (item, idx)=>({
                                                id: item.id || item.userId,
                                                name: item.name || item.sender || `Player ${idx + 1}`,
                                                initials: (item.name || "P").substring(0, 2).toUpperCase(),
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][idx % __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"].length],
                                                score: item.score || 0,
                                                streak: item.streak || 0,
                                                isMe: (item.id || item.userId) === currentUserId,
                                                isLeader: idx === 0
                                            })
                                    }["LiveBattle.useEffect.connectWs.formattedPlayers"]);
                                    setPlayers(formattedPlayers);
                                }
                            }
                            // Chat sync
                            if (data.type === "CHAT_MESSAGE" || data.type === "BATTLE_ACTION" && data.message) {
                                setChat({
                                    "LiveBattle.useEffect.connectWs": (prev)=>[
                                            ...prev,
                                            {
                                                id: Date.now() + Math.random(),
                                                player: data.sender || "Student",
                                                initials: (data.sender || "ST").substring(0, 2).toUpperCase(),
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"].length)],
                                                text: data.message,
                                                ts: "just now"
                                            }
                                        ]
                                }["LiveBattle.useEffect.connectWs"]);
                            }
                            if (data.type === "QUIZ_COMPLETED") {
                                navigate("results");
                            }
                        } catch (err) {
                            console.error("WS message parse error:", err);
                        }
                    }
                })["LiveBattle.useEffect.connectWs"];
                socket.onclose = ({
                    "LiveBattle.useEffect.connectWs": ()=>{
                        if (isMounted) setTimeout(connectWs, 2000);
                    }
                })["LiveBattle.useEffect.connectWs"];
            }
            connectWs();
            return ({
                "LiveBattle.useEffect": ()=>{
                    isMounted = false;
                    if (socket) socket.close();
                    socketRef.current = null;
                }
            })["LiveBattle.useEffect"];
        }
    }["LiveBattle.useEffect"], [
        battleId,
        user,
        navigate,
        currentUserId,
        studentName
    ]);
    // Reset state on question change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            if (!currentQuestion) return;
            setSelected(null);
            setRevealed(false);
            setMyVote(null);
            setVotes([]);
        }
    }["LiveBattle.useEffect"], [
        currentIndex,
        currentQuestion
    ]);
    // Timer Countdown Effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            if (!currentQuestion) return;
            const limit = currentQuestion.timeLimit || 60;
            const activeStart = startedAt || Date.now();
            setTimeLeft(computeTimeLeft(limit, activeStart));
            if (revealed) return;
            const interval = setInterval({
                "LiveBattle.useEffect.interval": ()=>{
                    const remaining = computeTimeLeft(limit, activeStart);
                    setTimeLeft(remaining);
                    if (remaining <= 0) {
                        setRevealed(true);
                    }
                }
            }["LiveBattle.useEffect.interval"], 1000);
            return ({
                "LiveBattle.useEffect": ()=>clearInterval(interval)
            })["LiveBattle.useEffect"];
        }
    }["LiveBattle.useEffect"], [
        startedAt,
        currentQuestion,
        revealed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBattle.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["LiveBattle.useEffect"], [
        chat
    ]);
    function handleSelect(i) {
        if (revealed || selected !== null) return;
        setSelected(i);
        if (mode === "solo") setTimeout(()=>processAnswer(i), 1000);
    }
    function handleVote(i) {
        setMyVote(i);
        setVotes((v)=>{
            const newV = v.filter((x)=>!x.voters.includes("You")).map((x)=>({
                    ...x,
                    count: x.count - 1
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
        if (myVote !== null) processAnswer(myVote);
    }
    function processAnswer(userChoice) {
        setRevealed(true);
        const isCorrect = userChoice === currentQuestion?.correct;
        const scoreAdd = isCorrect ? currentQuestion.points || 10 : 0;
        // Update local state temporarily
        setPlayers((prev)=>{
            if (prev.length === 0) {
                return [
                    {
                        id: currentUserId,
                        name: studentName,
                        initials: studentName.substring(0, 2).toUpperCase(),
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][0],
                        score: scoreAdd,
                        streak: isCorrect ? 1 : 0,
                        isMe: true,
                        isLeader: true
                    }
                ];
            }
            return prev.map((p)=>p.isMe ? {
                    ...p,
                    score: p.score + scoreAdd,
                    streak: isCorrect ? p.streak + 1 : 0
                } : p);
        });
        // Send score to server so Redis & Supabase update
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "SUBMIT_SCORE",
                battleId: battleId || "room_101",
                playerData: {
                    id: currentUserId,
                    name: studentName,
                    score: (players.find((p)=>p.isMe)?.score || 0) + scoreAdd,
                    correctCount: isCorrect ? 1 : 0
                }
            }));
        }
    }
    function sendChat() {
        if (!chatInput.trim()) return;
        const msgText = chatInput.trim();
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: "CHAT_MESSAGE",
                battleId: battleId || "room_101",
                userId: currentUserId,
                sender: studentName,
                message: msgText
            }));
        } else {
            setChat((c)=>[
                    ...c,
                    {
                        id: Date.now(),
                        player: "You",
                        initials: "ME",
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][0],
                        text: msgText,
                        ts: "now"
                    }
                ]);
        }
        setChatInput("");
    }
    const totalVotes = votes.reduce((a, v)=>a + v.count, 0);
    function voteFor(i) {
        const v = votes.find((x)=>x.option === i);
        return totalVotes ? (v?.count ?? 0) / totalVotes * 100 : 0;
    }
    if (!currentQuestion) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                color: "white",
                padding: 40,
                textAlign: "center",
                minHeight: "100vh",
                background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].navy,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            children: "Waiting for Professor to initialize questions..."
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
            lineNumber: 307,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentTopBar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes timerPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes rankPop      { 0%{transform:scale(0.9)} 60%{transform:scale(1.05)} 100%{transform:scale(1)} }
        @keyframes reactionFloat{ 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-80px) scale(1.5)} }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                lineNumber: 316,
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                    lineNumber: 323,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    background: `radial-gradient(ellipse at 20% 20%, rgba(91,61,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.1) 0%, transparent 50%), ${__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].navy}`,
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
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigo,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 3px 12px rgba(91,61,246,0.4)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow,
                                            color: "transparent",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 13,
                                                    color: "rgba(255,255,255,0.5)",
                                                    margin: 0
                                                },
                                                children: "Question"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 19,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0
                                                },
                                                children: [
                                                    currentQuestion.number,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "rgba(255,255,255,0.3)"
                                                        },
                                                        children: [
                                                            "/ ",
                                                            questions.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 146
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$CountdownBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountdownBar"], {
                                timeLeft: timeLeft,
                                timeLimit: currentQuestion.timeLimit || 60
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 337,
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
                                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow
                                                },
                                                children: "SPEED MODE"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 342,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 340,
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
                                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 346,
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
                                                    currentQuestion.points || 10,
                                                    " pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 347,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            gap: 0,
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "20px",
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
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 8,
                                                    marginBottom: 12
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigoLight,
                                                        border: "1.5px solid rgba(91,61,246,0.3)",
                                                        borderRadius: 8,
                                                        padding: "3px 10px",
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: "#A08FFF"
                                                    },
                                                    children: currentQuestion.subject
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 24,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0
                                                },
                                                children: currentQuestion.text
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                            flex: 1
                                        },
                                        children: currentQuestion.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$AnswerButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnswerBtn"], {
                                                index: i,
                                                text: opt,
                                                selected: mode === "discussion" ? myVote === i : selected === i,
                                                revealed: revealed,
                                                isCorrect: i === currentQuestion.correct,
                                                disabled: revealed || mode === "solo" && selected !== null,
                                                onClick: ()=>mode === "discussion" ? handleVote(i) : handleSelect(i),
                                                votePct: mode === "discussion" ? voteFor(i) : undefined
                                            }, i, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this),
                                    revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 14,
                                            padding: "14px 18px",
                                            borderRadius: 18,
                                            background: selected === currentQuestion.correct ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)",
                                            border: `2px solid ${selected === currentQuestion.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red}`,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 28
                                                },
                                                children: selected === currentQuestion.correct ? "🎉" : "❌"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 369,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 18,
                                                            fontWeight: 700,
                                                            color: selected === currentQuestion.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red,
                                                            margin: 0
                                                        },
                                                        children: selected === currentQuestion.correct ? `Correct! +${currentQuestion.points || 10} pts` : "Wrong Answer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 13,
                                                            color: "rgba(255,255,255,0.6)",
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Correct answer: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                style: {
                                                                    color: "#fff"
                                                                },
                                                                children: currentQuestion.options[currentQuestion.correct]
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 141
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 370,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 368,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 240,
                                    minWidth: 240,
                                    background: "rgba(0,0,0,0.2)",
                                    borderLeft: "1.5px solid rgba(255,255,255,0.06)",
                                    display: "flex",
                                    flexDirection: "column"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "14px",
                                            borderBottom: "1.5px solid rgba(255,255,255,0.06)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "Fredoka, sans-serif",
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: "#fff"
                                            },
                                            children: "Live Leaderboard"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                            lineNumber: 380,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            overflowY: "auto",
                                            padding: "10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            ...players
                                        ].sort((a, b)=>b.score - a.score).map((p, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$LeaderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeaderRow"], {
                                                player: {
                                                    ...p,
                                                    rank: idx + 1
                                                }
                                            }, p.id, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 382,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    mode === "discussion" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 180,
                            background: "rgba(0,0,0,0.3)",
                            borderTop: "1.5px solid rgba(255,255,255,0.07)",
                            display: "flex"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRight: "1.5px solid rgba(255,255,255,0.06)"
                                },
                                children: [
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
                                            chat.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatBubble"], {
                                                    msg: m
                                                }, m.id, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 34
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: chatEndRef
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "8px 10px",
                                            display: "flex",
                                            gap: 7,
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: chatInput,
                                                onChange: (e)=>setChatInput(e.target.value),
                                                onKeyDown: (e)=>e.key === "Enter" && sendChat(),
                                                placeholder: "Type to discuss…",
                                                style: {
                                                    flex: 1,
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1.5px solid rgba(255,255,255,0.1)",
                                                    borderRadius: 10,
                                                    padding: "7px 12px",
                                                    color: "#fff"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: sendChat,
                                                style: {
                                                    width: 32,
                                                    height: 32,
                                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigo,
                                                    border: "none",
                                                    borderRadius: 9,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                    size: 14,
                                                    color: "#fff"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 231
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                                lineNumber: 399,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 220,
                                    padding: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                },
                                children: !revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleConfirmLeader,
                                    disabled: myVote === null,
                                    style: {
                                        width: "100%",
                                        background: myVote !== null ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : "rgba(255,255,255,0.1)",
                                        border: "none",
                                        borderRadius: 12,
                                        padding: "10px",
                                        color: "#fff",
                                        fontWeight: 700,
                                        cursor: myVote !== null ? "pointer" : "default"
                                    },
                                    children: "Confirm Choice"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                    lineNumber: 404,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                        lineNumber: 391,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_LiveQuiz.tsx",
        lineNumber: 314,
        columnNumber: 5
    }, this);
}
_s(LiveBattle, "71ILrVF0AVrrjwTr+7vN+q5MzHk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = LiveBattle;
var _c;
__turbopack_context__.k.register(_c, "LiveBattle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelfPacedBattle",
    ()=>SelfPacedBattle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/StudentTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$CountdownBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$AnswerButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$LeaderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const MANUAL_QUESTIONS = [
    {
        id: 1,
        number: 1,
        total: 5,
        subject: "Data Structures",
        text: "What is the worst-case time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ],
        correct: 1,
        points: 200,
        timeLimit: 15
    },
    {
        id: 2,
        number: 2,
        total: 5,
        subject: "Algorithms",
        text: "Which sorting algorithm has an average time complexity of O(n log n) and operates in-place?",
        options: [
            "Merge Sort",
            "Bubble Sort",
            "Quick Sort",
            "Insertion Sort"
        ],
        correct: 2,
        points: 250,
        timeLimit: 20
    },
    {
        id: 3,
        number: 3,
        total: 5,
        subject: "Computer Networks",
        text: "Which layer of the OSI model is responsible for end-to-end communication and logical addressing (IP addresses)?",
        options: [
            "Data Link Layer",
            "Network Layer",
            "Transport Layer",
            "Application Layer"
        ],
        correct: 1,
        points: 200,
        timeLimit: 15
    },
    {
        id: 4,
        number: 4,
        total: 5,
        subject: "Operating Systems",
        text: "What condition is NOT required for a deadlock to occur in an operating system?",
        options: [
            "Mutual Exclusion",
            "Hold and Wait",
            "Preemption",
            "Circular Wait"
        ],
        correct: 2,
        points: 300,
        timeLimit: 20
    },
    {
        id: 5,
        number: 5,
        total: 5,
        subject: "Software Engineering",
        text: "In the SOLID design principles, what does the 'L' stand for?",
        options: [
            "Liskov Substitution Principle",
            "Linear Abstraction Principle",
            "Logical Separation Principle",
            "Layered Architecture Principle"
        ],
        correct: 0,
        points: 250,
        timeLimit: 15
    }
];
function SelfPacedBattle({ battleId = "room_101" }) {
    _s();
    const { navigate, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MANUAL_QUESTIONS);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const currentQuestion = questions[currentIndex];
    const studentName = user?.username || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Student";
    const currentUserId = user?.id || `user_${Math.floor(1000 + Math.random() * 9000)}`;
    // ── INDIVIDUAL TIMER COMPUTATION ──
    const [startedAt, setStartedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    const computeTimeLeft = (limit, startTs)=>{
        if (!startTs) return limit;
        const elapsedSeconds = Math.floor((Date.now() - Number(startTs)) / 1000);
        return Math.max(limit - elapsedSeconds, 0);
    };
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentQuestion?.timeLimit || 15);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [revealed, setRevealed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [players, setPlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_PLAYERS"]);
    const [chat, setChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INIT_CHAT"]);
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const myPlayer = players.find((p)=>p.isMe || p.id === currentUserId);
    // ── WEBSOCKET CONNECTION & SELF-PACED SYNC ──
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfPacedBattle.useEffect": ()=>{
            let socket = null;
            let isMounted = true;
            function connectWs() {
                if (!isMounted) return;
                const wsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
                socket = new WebSocket(wsUrl);
                socketRef.current = socket;
                socket.onopen = ({
                    "SelfPacedBattle.useEffect.connectWs": ()=>{
                        socket?.send(JSON.stringify({
                            mode: "SELF_PACED",
                            type: "JOIN_SELF_PACED_BATTLE",
                            battleId,
                            playerId: currentUserId,
                            sender: studentName
                        }));
                    }
                })["SelfPacedBattle.useEffect.connectWs"];
                socket.onmessage = ({
                    "SelfPacedBattle.useEffect.connectWs": (event)=>{
                        try {
                            const data = JSON.parse(event.data);
                            // Initial sync of student's personal question index and timer
                            if (data.type === "SELF_PACED_STATE_SYNC") {
                                if (typeof data.currentIndex === "number") {
                                    setCurrentIndex(data.currentIndex);
                                }
                                if (data.startedAt) {
                                    setStartedAt(Number(data.startedAt));
                                }
                                if (typeof data.score === "number") {
                                    setPlayers({
                                        "SelfPacedBattle.useEffect.connectWs": (prev)=>prev.map({
                                                "SelfPacedBattle.useEffect.connectWs": (p)=>p.isMe || p.id === currentUserId ? {
                                                        ...p,
                                                        score: data.score
                                                    } : p
                                            }["SelfPacedBattle.useEffect.connectWs"])
                                    }["SelfPacedBattle.useEffect.connectWs"]);
                                }
                            }
                            // Server confirms individual question advance and sets personal start time
                            if (data.type === "PLAYER_QUESTION_STARTED") {
                                if (typeof data.currentIndex === "number") {
                                    setCurrentIndex(data.currentIndex);
                                }
                                if (data.startedAt) {
                                    setStartedAt(Number(data.startedAt));
                                }
                            }
                            // Live Leaderboard sync across all players in room
                            if (data.type === "PLAYER_SCORE_UPDATED" || data.type === "SCORE_UPDATED") {
                                if (Array.isArray(data.leaderboard)) {
                                    const formattedPlayers = data.leaderboard.map({
                                        "SelfPacedBattle.useEffect.connectWs.formattedPlayers": (item, idx)=>({
                                                id: item.id || item.userId || item.playerId,
                                                name: item.name || item.sender || `Player ${idx + 1}`,
                                                initials: (item.name || "P").substring(0, 2).toUpperCase(),
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][idx % __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"].length],
                                                score: item.score || 0,
                                                streak: item.streak || 0,
                                                isMe: (item.id || item.userId || item.playerId) === currentUserId,
                                                isLeader: idx === 0
                                            })
                                    }["SelfPacedBattle.useEffect.connectWs.formattedPlayers"]);
                                    setPlayers(formattedPlayers);
                                } else if (data.playerId && typeof data.score === "number") {
                                    setPlayers({
                                        "SelfPacedBattle.useEffect.connectWs": (prev)=>prev.map({
                                                "SelfPacedBattle.useEffect.connectWs": (p)=>p.id === data.playerId || p.isMe && data.playerId === currentUserId ? {
                                                        ...p,
                                                        score: data.score
                                                    } : p
                                            }["SelfPacedBattle.useEffect.connectWs"])
                                    }["SelfPacedBattle.useEffect.connectWs"]);
                                }
                            }
                            // Chat Broadcasts
                            if (data.type === "BATTLE_ACTION" || data.type === "CHAT_MESSAGE") {
                                setChat({
                                    "SelfPacedBattle.useEffect.connectWs": (prev)=>[
                                            ...prev,
                                            {
                                                id: Date.now() + Math.random(),
                                                player: data.sender || "Anonymous",
                                                initials: (data.sender || "AN").substring(0, 2).toUpperCase(),
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][prev.length % __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"].length],
                                                text: data.message,
                                                ts: new Date(data.timestamp || Date.now()).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                            }
                                        ]
                                }["SelfPacedBattle.useEffect.connectWs"]);
                            }
                        } catch (err) {
                            console.error("Failed to parse incoming WS message:", err);
                        }
                    }
                })["SelfPacedBattle.useEffect.connectWs"];
                socket.onclose = ({
                    "SelfPacedBattle.useEffect.connectWs": ()=>{
                        if (isMounted) setTimeout(connectWs, 2000);
                    }
                })["SelfPacedBattle.useEffect.connectWs"];
            }
            connectWs();
            return ({
                "SelfPacedBattle.useEffect": ()=>{
                    isMounted = false;
                    if (socket) socket.close();
                    socketRef.current = null;
                }
            })["SelfPacedBattle.useEffect"];
        }
    }["SelfPacedBattle.useEffect"], [
        battleId,
        currentUserId,
        studentName
    ]);
    // Reset answer states on question change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfPacedBattle.useEffect": ()=>{
            if (!currentQuestion) return;
            setSelected(null);
            setRevealed(false);
        }
    }["SelfPacedBattle.useEffect"], [
        currentIndex,
        currentQuestion
    ]);
    // Individual countdown timer tick
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfPacedBattle.useEffect": ()=>{
            if (!currentQuestion) return;
            const limit = currentQuestion.timeLimit;
            setTimeLeft(computeTimeLeft(limit, startedAt));
            if (revealed) return;
            const interval = setInterval({
                "SelfPacedBattle.useEffect.interval": ()=>{
                    const remaining = computeTimeLeft(limit, startedAt);
                    setTimeLeft(remaining);
                    if (remaining <= 0) {
                        setRevealed(true);
                    }
                }
            }["SelfPacedBattle.useEffect.interval"], 1000);
            return ({
                "SelfPacedBattle.useEffect": ()=>clearInterval(interval)
            })["SelfPacedBattle.useEffect"];
        }
    }["SelfPacedBattle.useEffect"], [
        startedAt,
        currentQuestion,
        revealed
    ]);
    // Chat auto-scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SelfPacedBattle.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["SelfPacedBattle.useEffect"], [
        chat
    ]);
    function handleSelect(i) {
        if (revealed || selected !== null) return;
        setSelected(i);
        processAnswer(i);
    }
    function processAnswer(userChoice) {
        setRevealed(true);
        const isCorrect = userChoice === currentQuestion.correct;
        const pointsToAdd = isCorrect ? currentQuestion.points : 0;
        const newScore = (myPlayer?.score || 0) + pointsToAdd;
        // Local optimistic update
        setPlayers((prev)=>prev.map((p)=>p.isMe || p.id === currentUserId ? {
                    ...p,
                    score: newScore,
                    streak: isCorrect ? p.streak + 1 : 0
                } : p));
        // Broadcast score submission over WebSocket
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                mode: "SELF_PACED",
                type: "SUBMIT_SCORE",
                battleId,
                playerId: currentUserId,
                sender: studentName,
                score: newScore,
                pointsAdded: pointsToAdd,
                isCorrect,
                questionId: currentQuestion.id
            }));
        }
    }
    // Advance player independently to the next question
    function handleNextQuestion() {
        const isLastQuestion = currentIndex >= questions.length - 1;
        const nextIndex = currentIndex + 1;
        if (isLastQuestion) {
            navigate("results");
            return;
        }
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                mode: "SELF_PACED",
                type: "ADVANCE_SELF_PACED_QUESTION",
                battleId,
                playerId: currentUserId,
                sender: studentName,
                currentIndex: nextIndex,
                score: myPlayer?.score || 0
            }));
        } else {
            setCurrentIndex(nextIndex);
            setStartedAt(Date.now());
        }
    }
    // Chat message submission
    function sendChat() {
        if (!chatInput.trim()) return;
        const message = chatInput.trim();
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                mode: "SELF_PACED",
                type: "BATTLE_ACTION",
                battleId,
                playerId: currentUserId,
                sender: studentName,
                message
            }));
        } else {
            setChat((prev)=>[
                    ...prev,
                    {
                        id: Date.now(),
                        player: studentName,
                        initials: studentName.substring(0, 2).toUpperCase(),
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVATAR_COLORS"][0],
                        text: message,
                        ts: new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }
                ]);
        }
        setChatInput("");
    }
    if (!currentQuestion) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$StudentTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentTopBar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    background: `radial-gradient(ellipse at 20% 20%, rgba(91,61,246,0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.1) 0%, transparent 50%), ${__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].navy}`,
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
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigo,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 3px 12px rgba(91,61,246,0.4)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow,
                                            color: "transparent",
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                            lineNumber: 409,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 397,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 13,
                                                    color: "rgba(255,255,255,0.5)",
                                                    margin: 0
                                                },
                                                children: "Question"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 412,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 19,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0
                                                },
                                                children: [
                                                    currentQuestion.number,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "rgba(255,255,255,0.3)"
                                                        },
                                                        children: [
                                                            "/ ",
                                                            questions.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 42
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 415,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$CountdownBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CountdownBar"], {
                                timeLeft: timeLeft,
                                timeLimit: currentQuestion.timeLimit
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            background: "rgba(46,212,122,0.15)",
                                            border: "1.5px solid rgba(46,212,122,0.35)",
                                            borderRadius: 20,
                                            padding: "5px 12px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                size: 13,
                                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 435,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green
                                                },
                                                children: "SELF-PACED"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 436,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
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
                                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow,
                                                color: "transparent"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 452,
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
                                                    currentQuestion.points,
                                                    " pts"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 453,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 441,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            gap: 0,
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "20px",
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
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 8,
                                                    marginBottom: 12
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigoLight,
                                                        border: "1.5px solid rgba(91,61,246,0.3)",
                                                        borderRadius: 8,
                                                        padding: "3px 10px",
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: "#A08FFF"
                                                    },
                                                    children: currentQuestion.subject
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 474,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Fredoka, sans-serif",
                                                    fontSize: 24,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0
                                                },
                                                children: currentQuestion.text
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 10,
                                            flex: 1
                                        },
                                        children: currentQuestion.options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$AnswerButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnswerBtn"], {
                                                index: i,
                                                text: opt,
                                                selected: selected === i,
                                                revealed: revealed,
                                                isCorrect: i === currentQuestion.correct,
                                                disabled: revealed || selected !== null,
                                                onClick: ()=>handleSelect(i)
                                            }, i, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 498,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, this),
                                    revealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 14,
                                            padding: "14px 18px",
                                            borderRadius: 18,
                                            background: selected === currentQuestion.correct ? "rgba(46,212,122,0.15)" : "rgba(255,71,87,0.12)",
                                            border: `2px solid ${selected === currentQuestion.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red}`,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 28
                                                },
                                                children: selected === currentQuestion.correct ? "🎉" : "❌"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 525,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Fredoka, sans-serif",
                                                            fontSize: 18,
                                                            fontWeight: 700,
                                                            color: selected === currentQuestion.correct ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red,
                                                            margin: 0
                                                        },
                                                        children: selected === currentQuestion.correct ? `Correct! +${currentQuestion.points} pts` : "Wrong Answer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 13,
                                                            color: "rgba(255,255,255,0.6)",
                                                            margin: 0
                                                        },
                                                        children: [
                                                            "Correct answer: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                style: {
                                                                    color: "#fff"
                                                                },
                                                                children: currentQuestion.options[currentQuestion.correct]
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleNextQuestion,
                                                style: {
                                                    marginLeft: "auto",
                                                    background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigo,
                                                    border: "none",
                                                    borderRadius: 12,
                                                    padding: "10px 18px",
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 6
                                                },
                                                children: [
                                                    currentIndex < questions.length - 1 ? "Next Question" : "View Results",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 462,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 240,
                                    minWidth: 240,
                                    background: "rgba(0,0,0,0.2)",
                                    borderLeft: "1.5px solid rgba(255,255,255,0.06)",
                                    display: "flex",
                                    flexDirection: "column"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "14px",
                                            borderBottom: "1.5px solid rgba(255,255,255,0.06)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "Fredoka, sans-serif",
                                                fontSize: 17,
                                                fontWeight: 700,
                                                color: "#fff"
                                            },
                                            children: "Live Standings"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                            lineNumber: 572,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 571,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            overflowY: "auto",
                                            padding: "10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            ...players
                                        ].sort((a, b)=>b.score - a.score).map((p, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$LeaderRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeaderRow"], {
                                                player: {
                                                    ...p,
                                                    rank: idx + 1
                                                }
                                            }, p.id, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                                lineNumber: 580,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 140,
                            background: "rgba(0,0,0,0.3)",
                            borderTop: "1.5px solid rgba(255,255,255,0.07)",
                            display: "flex",
                            flexDirection: "column"
                        },
                        children: [
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
                                    chat.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$ChatBubble$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatBubble"], {
                                            msg: m
                                        }, m.id, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                            lineNumber: 598,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: chatEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 596,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "8px 10px",
                                    display: "flex",
                                    gap: 7,
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: chatInput,
                                        onChange: (e)=>setChatInput(e.target.value),
                                        onKeyDown: (e)=>e.key === "Enter" && sendChat(),
                                        placeholder: "Send a message to the room…",
                                        style: {
                                            flex: 1,
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1.5px solid rgba(255,255,255,0.1)",
                                            borderRadius: 10,
                                            padding: "7px 12px",
                                            color: "#fff"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: sendChat,
                                        style: {
                                            width: 32,
                                            height: 32,
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].indigo,
                                            border: "none",
                                            borderRadius: 9,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            size: 14,
                                            color: "#fff"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                        lineNumber: 617,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                        lineNumber: 587,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_OwnPace.tsx",
        lineNumber: 370,
        columnNumber: 5
    }, this);
}
_s(SelfPacedBattle, "ZYHMnOD9nLt1Ajap9+qfbwiZJ08=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = SelfPacedBattle;
var _c;
__turbopack_context__.k.register(_c, "SelfPacedBattle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TeamBattle",
    ()=>TeamBattle,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TeamBattle({ battleId = '', onLeaveBattle }) {
    _s();
    const [selectedOption, setSelectedOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('B');
    // Variable tracking all individual answers submitted by team members
    const [teamMemberAnswers, setTeamMemberAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            memberId: '1',
            memberName: 'Alex M.',
            selectedOption: 'B',
            submittedAt: Date.now() - 3000
        },
        {
            memberId: '2',
            memberName: 'Ana R.',
            selectedOption: 'B',
            submittedAt: Date.now() - 2000
        },
        {
            memberId: '3',
            memberName: 'Ben A.',
            selectedOption: 'A',
            submittedAt: Date.now() - 1000
        }
    ]);
    // WebSocket Listener Simulation for Realtime Team Answers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeamBattle.useEffect": ()=>{
        /* Example WebSocket Listener:
    const ws = new WebSocket(`wss://your-backend.com/team-battles/${battleId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'MEMBER_ANSWER_SUBMITTED') {
        setTeamMemberAnswers((prev) => {
          const filtered = prev.filter(a => a.memberId !== data.answer.memberId);
          return [...filtered, data.answer];
        });
      }
    };
    return () => ws.close();
    */ }
    }["TeamBattle.useEffect"], [
        battleId
    ]);
    // Handle local user option selection
    const handleSelectOption = (optionKey)=>{
        setSelectedOption(optionKey);
        const myAnswer = {
            memberId: '1',
            memberName: 'You (Alex M.)',
            selectedOption: optionKey,
            submittedAt: Date.now()
        };
        setTeamMemberAnswers((prev)=>{
            const existing = prev.filter((a)=>a.memberId !== myAnswer.memberId);
            return [
                ...existing,
                myAnswer
            ];
        });
    // Send payload via socket to other team members
    // socket.send(JSON.stringify({ type: 'SUBMIT_ANSWER', answer: myAnswer }));
    };
    // Compute option distribution percentages from teamMemberAnswers
    const getOptionPercentage = (optionKey)=>{
        if (teamMemberAnswers.length === 0) return 0;
        const count = teamMemberAnswers.filter((a)=>a.selectedOption === optionKey).length;
        return Math.round(count / teamMemberAnswers.length * 100);
    };
    const options = [
        {
            key: 'A',
            text: 'O(n)'
        },
        {
            key: 'B',
            text: 'O(log n)'
        },
        {
            key: 'C',
            text: 'O(n log n)'
        },
        {
            key: 'D',
            text: 'O(1)'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#131524] text-white flex flex-col font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "px-6 py-3 flex items-center justify-between border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 font-extrabold text-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "size-7 bg-[#5B3DF6] rounded-lg flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                size: 16,
                                fill: "#FFF",
                                color: "transparent"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        "QuizArena - Team Mode"
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-5 grid grid-cols-[1fr_280px] gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-[#1C1F33] border border-white/10 rounded-2xl p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-[#5B3DF6]/20 text-[#5B3DF6] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase",
                                        children: "Computer Science"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-xl font-bold",
                                        children: "What is the time complexity of searching for an element in a balanced Binary Search Tree?"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3",
                                children: options.map((opt)=>{
                                    const isSelected = selectedOption === opt.key;
                                    const percentage = getOptionPercentage(opt.key);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>handleSelectOption(opt.key),
                                        className: `relative p-4 rounded-xl border flex items-center justify-between cursor-pointer overflow-hidden ${isSelected ? 'bg-[#632A38] border-[#FF5C5C]' : 'bg-white/[0.03] border-white/10'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 z-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "size-7 bg-white/10 rounded-lg flex items-center justify-center font-extrabold text-sm",
                                                        children: opt.key
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: opt.text
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-extrabold text-xs z-10 text-[#FF5C5C]",
                                                children: [
                                                    percentage,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, opt.key, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 109,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full bg-[#2ED47A] text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                        size: 18,
                                        fill: "#000"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this),
                                    " Confirm Final Answer ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 133,
                                        columnNumber: 66
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#1C1F33] border border-white/10 rounded-2xl p-4 flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-extrabold text-[#8F93A8] uppercase flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    " Team Answers Received (",
                                    teamMemberAnswers.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2",
                                children: teamMemberAnswers.map((ans)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/5 p-2.5 rounded-lg flex items-center justify-between border border-white/5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold text-white/80",
                                                children: ans.memberName
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                lineNumber: 149,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-black bg-[#5B3DF6] px-2 py-0.5 rounded text-white",
                                                children: ans.selectedOption
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, ans.memberId, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/Battle_TeamMode.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(TeamBattle, "xG1pHkFAjsMGWNhof6lTbeeOUJU=");
_c = TeamBattle;
const __TURBOPACK__default__export__ = TeamBattle;
var _c;
__turbopack_context__.k.register(_c, "TeamBattle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnswerBtn",
    ()=>AnswerBtn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)");
;
;
;
function AnswerBtn({ index, text, selected, revealed, isCorrect, disabled, onClick, votePct }) {
    const col = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPTION_COLORS"][index % __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OPTION_COLORS"].length];
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
        border = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green;
        shadow = "0 0 0 3px rgba(46,212,122,0.4), 0 8px 24px rgba(46,212,122,0.3)";
        textCol = "#fff";
        badgeBg = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green;
        badgeCol = "#fff";
    }
    if (revealed && selected && !isCorrect) {
        bg = "rgba(255,71,87,0.12)";
        border = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red;
        shadow = "none";
        textCol = "rgba(255,255,255,0.6)";
        badgeBg = __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].red;
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
                lineNumber: 88,
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
                    lineNumber: 120,
                    columnNumber: 34
                }, this) : LABELS[index]
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
                lineNumber: 102,
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
                lineNumber: 122,
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/AnswerButton.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = AnswerBtn;
var _c;
__turbopack_context__.k.register(_c, "AnswerBtn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBubble",
    ()=>ChatBubble
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx",
                lineNumber: 6,
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
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx",
                        lineNumber: 25,
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
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/ChatBubble.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = ChatBubble;
var _c;
__turbopack_context__.k.register(_c, "ChatBubble");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_COLORS",
    ()=>AVATAR_COLORS,
    "C",
    ()=>C,
    "INIT_CHAT",
    ()=>INIT_CHAT,
    "INIT_PLAYERS",
    ()=>INIT_PLAYERS,
    "MEDALS",
    ()=>MEDALS,
    "OPTION_COLORS",
    ()=>OPTION_COLORS,
    "REACTIONS",
    ()=>REACTIONS
]);
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
const INIT_CHAT = [];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountdownBar",
    ()=>CountdownBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)");
;
;
function CountdownBar({ timeLeft, timeLimit }) {
    const pct = timeLeft / timeLimit * 100;
    const color = pct > 50 ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].green : pct > 25 ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow : __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].coral;
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx",
                lineNumber: 16,
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
                    background: urgent ? `radial-gradient(circle, ${__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].coral}33, transparent)` : "transparent",
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/CountdownBar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = CountdownBar;
var _c;
__turbopack_context__.k.register(_c, "CountdownBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeaderRow",
    ()=>LeaderRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Constants.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Score$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Score.tsx [app-client] (ecmascript)");
;
;
;
;
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
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDALS"][player.rank - 1]
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                    lineNumber: 31,
                    columnNumber: 11
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                    lineNumber: 33,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                lineNumber: 29,
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                lineNumber: 46,
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
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                        lineNumber: 67,
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
                                fill: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].coral,
                                color: "transparent"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].coral
                                },
                                children: [
                                    player.streak,
                                    "× streak"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: isTop ? __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["C"].yellow : player.isMe ? "#fff" : "rgba(255,255,255,0.7)",
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$studentONLY$2f$LiveBattleCOMPONENTONLY$2f$Score$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedScore"], {
                    value: player.score
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/LeaderRow.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = LeaderRow;
var _c;
__turbopack_context__.k.register(_c, "LeaderRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Score.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedScore",
    ()=>AnimatedScore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
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
        fileName: "[project]/quizarenaremastered/frontend/src/components/studentONLY/LiveBattleCOMPONENTONLY/Score.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
_s(AnimatedScore, "TympJ/N89M5uDB8lo348V1TGVq4=");
_c = AnimatedScore;
var _c;
__turbopack_context__.k.register(_c, "AnimatedScore");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=quizarenaremastered_frontend_src_components_studentONLY_1dh8lye._.js.map