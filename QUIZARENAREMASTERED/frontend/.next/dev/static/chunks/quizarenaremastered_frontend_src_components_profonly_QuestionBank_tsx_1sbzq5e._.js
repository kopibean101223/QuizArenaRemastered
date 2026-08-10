(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionBank",
    ()=>QuestionBank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/ProfSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/toggle-left.js [app-client] (ecmascript) <export default as ToggleLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/align-left.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/folder.js [app-client] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/sigma.js [app-client] (ecmascript) <export default as Sigma>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
;
// ─── Dynamic Color Helper ──────────────────────────────────────────────────────
function getTopicStyle(topicName) {
    const palettes = [
        {
            bg: "rgba(91,61,246,0.1)",
            text: "#5B3DF6",
            dot: "#5B3DF6"
        },
        {
            bg: "rgba(46,212,122,0.12)",
            text: "#18A058",
            dot: "#2ED47A"
        },
        {
            bg: "rgba(255,107,74,0.1)",
            text: "#C8441E",
            dot: "#FF6B4A"
        },
        {
            bg: "rgba(91,200,246,0.15)",
            text: "#076E9A",
            dot: "#5BC8F6"
        },
        {
            bg: "rgba(255,41,117,0.12)",
            text: "#D4195A",
            dot: "#FF2975"
        },
        {
            bg: "rgba(157,78,221,0.12)",
            text: "#7B2CBF",
            dot: "#9D4EDD"
        }
    ];
    let hash = 0;
    for(let i = 0; i < topicName.length; i++){
        hash = topicName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % palettes.length;
    return palettes[index];
}
function TopicBadge({ topic }) {
    const s = getTopicStyle(topic);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: s.bg,
            color: s.text,
            borderRadius: 7,
            padding: "3px 8px",
            fontFamily: "Manrope,sans-serif",
            fontSize: 11,
            fontWeight: 700,
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: s.dot,
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            topic
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = TopicBadge;
// ─── Tokens ────────────────────────────────────────────────────────────────────
const C = {
    indigo: "#5B3DF6",
    indigoLight: "rgba(91,61,246,0.08)",
    indigoBorder: "rgba(91,61,246,0.2)",
    coral: "#FF6B4A",
    coralLight: "rgba(255,107,74,0.1)",
    coralBorder: "rgba(255,107,74,0.25)",
    yellow: "#FFC93C",
    yellowLight: "rgba(255,201,60,0.14)",
    yellowBorder: "rgba(255,201,60,0.35)",
    green: "#2ED47A",
    greenLight: "rgba(46,212,122,0.12)",
    greenBorder: "rgba(46,212,122,0.3)",
    red: "#FF4757",
    redLight: "rgba(255,71,87,0.1)",
    redBorder: "rgba(255,71,87,0.2)",
    navy: "#1B1E2B",
    offWhite: "#FAFAFC",
    white: "#FFFFFF",
    muted: "#717182",
    border: "rgba(0,0,0,0.07)",
    inputBg: "#F3F3F7"
};
// ─── Data ──────────────────────────────────────────────────────────────────────
const SUBJECTS = [
    "All Subjects",
    "Mathematics",
    "Physics",
    "Computer Science",
    "History",
    "Biology"
];
const DIFFICULTIES = [
    "All Difficulties",
    "Easy",
    "Medium",
    "Hard"
];
const QTYPES = [
    "All Types",
    "Multiple Choice",
    "True / False",
    "Identification",
    "Short Answer",
    "Coding",
    "Mathematics"
];
const SORT_OPTIONS = [
    "Newest First",
    "Oldest First",
    "A → Z",
    "Z → A",
    "Difficulty ↑",
    "Difficulty ↓"
];
const SUBJECT_STYLE = {
    Mathematics: {
        bg: "rgba(91,61,246,0.1)",
        text: "#5B3DF6",
        dot: "#5B3DF6"
    },
    Physics: {
        bg: "rgba(255,107,74,0.1)",
        text: "#C8441E",
        dot: "#FF6B4A"
    },
    "Computer Science": {
        bg: "rgba(46,212,122,0.12)",
        text: "#18A058",
        dot: "#2ED47A"
    },
    History: {
        bg: "rgba(255,201,60,0.15)",
        text: "#9A6C00",
        dot: "#FFC93C"
    },
    Biology: {
        bg: "rgba(91,200,246,0.15)",
        text: "#076E9A",
        dot: "#5BC8F6"
    }
};
const DIFF_STYLE = {
    Easy: {
        bg: C.greenLight,
        text: "#18A058",
        border: C.greenBorder
    },
    Medium: {
        bg: C.yellowLight,
        text: "#9A6C00",
        border: C.yellowBorder
    },
    Hard: {
        bg: C.coralLight,
        text: "#C8441E",
        border: C.coralBorder
    }
};
const QTYPE_ICON = {
    "Multiple Choice": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 81,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "True / False": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__["ToggleLeft"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 82,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Identification": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 83,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Short Answer": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 84,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Coding": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 85,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Mathematics": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__["Sigma"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 86,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0))
};
const PAGE_SIZE = 8;
function SubjectBadge({ subject }) {
    const s = SUBJECT_STYLE[subject] ?? {
        bg: C.indigoLight,
        text: C.indigo,
        dot: C.indigo
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: s.bg,
            color: s.text,
            borderRadius: 7,
            padding: "3px 8px",
            fontFamily: "Manrope,sans-serif",
            fontSize: 11,
            fontWeight: 700,
            whiteSpace: "nowrap"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: s.dot,
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            subject
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c1 = SubjectBadge;
function DiffBadge({ difficulty }) {
    const s = DIFF_STYLE[difficulty] ?? {
        bg: C.indigoLight,
        text: C.indigo,
        border: C.indigoBorder
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            background: s.bg,
            color: s.text,
            border: `1.5px solid ${s.border}`,
            borderRadius: 7,
            padding: "3px 9px",
            fontFamily: "Manrope,sans-serif",
            fontSize: 11,
            fontWeight: 700,
            whiteSpace: "nowrap"
        },
        children: difficulty
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c2 = DiffBadge;
function TypeChip({ type }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: C.inputBg,
            color: C.muted,
            borderRadius: 7,
            padding: "3px 8px",
            fontFamily: "Manrope,sans-serif",
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap"
        },
        children: [
            QTYPE_ICON[type],
            type
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_c3 = TypeChip;
// ─── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange, width, placeholder }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dropdown.useEffect": ()=>{
            const h = {
                "Dropdown.useEffect.h": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
                }
            }["Dropdown.useEffect.h"];
            document.addEventListener("mousedown", h);
            return ({
                "Dropdown.useEffect": ()=>document.removeEventListener("mousedown", h)
            })["Dropdown.useEffect"];
        }
    }["Dropdown.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            position: "relative",
            width
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                style: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    background: C.white,
                    border: `1.5px solid ${open ? C.indigo : C.border}`,
                    borderRadius: 11,
                    padding: "8px 12px",
                    fontFamily: "Manrope,sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: value.startsWith("All") ? C.muted : C.navy,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "border-color 0.15s"
                },
                children: [
                    placeholder && value.startsWith("All") ? placeholder : value,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 13,
                        color: C.muted,
                        style: {
                            transform: open ? "rotate(180deg)" : "none",
                            transition: "transform 0.15s",
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: "calc(100% + 5px)",
                    left: 0,
                    width: "100%",
                    minWidth: 160,
                    background: C.white,
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 13,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    zIndex: 120,
                    padding: "5px",
                    overflowY: "auto",
                    maxHeight: 240
                },
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onChange(opt);
                            setOpen(false);
                        },
                        style: {
                            width: "100%",
                            background: opt === value ? C.indigoLight : "transparent",
                            border: "none",
                            borderRadius: 8,
                            padding: "8px 11px",
                            fontFamily: "Manrope,sans-serif",
                            fontSize: 13,
                            fontWeight: opt === value ? 700 : 500,
                            color: opt === value ? C.indigo : C.navy,
                            cursor: "pointer",
                            textAlign: "left"
                        },
                        children: opt
                    }, opt, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 158,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(Dropdown, "t4ZsC+YUoO3/Ij2kmAXjjTymoXI=");
_c4 = Dropdown;
// ─── Filter chip ───────────────────────────────────────────────────────────────
function FilterChip({ label, active, count, onClick, onClear }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: active ? C.indigoLight : C.white,
            border: `1.5px solid ${active ? C.indigo : C.border}`,
            borderRadius: 20,
            padding: "6px 12px",
            cursor: "pointer",
            fontFamily: "Manrope,sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: active ? C.indigo : C.muted,
            transition: "all 0.15s",
            whiteSpace: "nowrap"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                size: 11,
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            label,
            count != null && count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    background: C.indigo,
                    color: "#fff",
                    borderRadius: 50,
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "1px 5px",
                    lineHeight: 1.4
                },
                children: count
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 185,
                columnNumber: 9
            }, this),
            active && onClear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                onClick: (e)=>{
                    e.stopPropagation();
                    onClear();
                },
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(91,61,246,0.2)",
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    cursor: "pointer",
                    color: C.indigo,
                    marginLeft: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 8,
                    strokeWidth: 3
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_c5 = FilterChip;
// ─── Preview Modal ─────────────────────────────────────────────────────────────
function PreviewModal({ q, onClose }) {
    _s1();
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const diffS = DIFF_STYLE[q.difficulty];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "rgba(27,30,43,0.4)",
                    backdropFilter: "blur(3px)"
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    background: C.white,
                    borderRadius: 24,
                    width: "100%",
                    maxWidth: 520,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: `linear-gradient(135deg,${C.indigo},#4228D4)`,
                            padding: "20px 24px 18px",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            marginBottom: 6,
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: "rgba(255,255,255,0.18)",
                                                    borderRadius: 7,
                                                    padding: "3px 9px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: "rgba(255,255,255,0.9)"
                                                },
                                                children: "Question Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 217,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    background: diffS.bg,
                                                    color: diffS.text,
                                                    border: `1.5px solid ${diffS.border}`,
                                                    borderRadius: 7,
                                                    padding: "3px 9px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 11,
                                                    fontWeight: 700
                                                },
                                                children: q.difficulty
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypeChip, {
                                                type: q.type
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 225,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 15,
                                            fontWeight: 700,
                                            color: "#fff",
                                            margin: 0,
                                            lineHeight: 1.5
                                        },
                                        children: q.text
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                style: {
                                    background: "rgba(255,255,255,0.15)",
                                    border: "none",
                                    borderRadius: 10,
                                    padding: 7,
                                    cursor: "pointer",
                                    color: "#fff",
                                    display: "flex",
                                    flexShrink: 0
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16,
                                    strokeWidth: 2.5
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 12,
                            padding: "12px 24px",
                            borderBottom: `1.5px solid ${C.border}`,
                            flexWrap: "wrap",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopicBadge, {
                                topic: q.topic
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectBadge, {
                                subject: q.subject
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    color: C.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 12,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 600
                                        },
                                        children: [
                                            q.timeLimit,
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    color: C.muted
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                        size: 12,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 600
                                        },
                                        children: [
                                            q.points,
                                            " pt",
                                            q.points !== 1 ? "s" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "20px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            overflowY: "auto",
                            maxHeight: 320
                        },
                        children: q.choices && q.choices.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "Manrope,sans-serif",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: C.muted,
                                        margin: 0,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em"
                                    },
                                    children: "Choose the correct answer"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                q.choices.map((ch, i)=>{
                                    const isAnswer = ch === q.answer;
                                    const isPicked = ch === picked;
                                    const showResult = picked !== null;
                                    let bg = C.white, border = C.border, textColor = C.navy;
                                    if (showResult && isAnswer) {
                                        bg = C.greenLight;
                                        border = C.greenBorder;
                                        textColor = "#18A058";
                                    } else if (showResult && isPicked && !isAnswer) {
                                        bg = C.redLight;
                                        border = C.redBorder;
                                        textColor = C.red;
                                    } else if (isPicked) {
                                        bg = C.indigoLight;
                                        border = C.indigo;
                                        textColor = C.indigo;
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPicked(ch),
                                        style: {
                                            width: "100%",
                                            background: bg,
                                            border: `1.5px solid ${border}`,
                                            borderRadius: 14,
                                            padding: "12px 16px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            cursor: "pointer",
                                            transition: "all 0.15s",
                                            textAlign: "left"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: "50%",
                                                    background: isPicked || showResult && isAnswer ? border : "rgba(0,0,0,0.06)",
                                                    border: `2px solid ${border}`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 800,
                                                    color: textColor
                                                },
                                                children: [
                                                    "A",
                                                    "B",
                                                    "C",
                                                    "D"
                                                ][i]
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 272,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    color: textColor
                                                },
                                                children: ch
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 278,
                                                columnNumber: 21
                                            }, this),
                                            showResult && isAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 16,
                                                color: "#18A058",
                                                style: {
                                                    marginLeft: "auto"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 281,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, ch, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 267,
                                        columnNumber: 19
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                            lineNumber: 255,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "Manrope,sans-serif",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: C.muted,
                                        margin: "0 0 8px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em"
                                    },
                                    children: "Answer"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.greenLight,
                                        borderRadius: 14,
                                        padding: "14px 16px",
                                        border: `1.5px solid ${C.greenBorder}`
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: q.type === "Coding" ? "monospace" : "Manrope,sans-serif",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "#18A058",
                                            margin: 0,
                                            whiteSpace: "pre-wrap"
                                        },
                                        children: q.answer
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                q.type === "Coding" && q.testCases && q.testCases.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: C.muted,
                                                margin: "0 0 8px",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em"
                                            },
                                            children: "Test Cases"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 300,
                                            columnNumber: 20
                                        }, this),
                                        q.testCases.map((tc, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: C.inputBg,
                                                    borderRadius: 12,
                                                    padding: "10px 14px",
                                                    marginBottom: 8,
                                                    display: "flex",
                                                    gap: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    fontWeight: 700,
                                                                    color: C.muted,
                                                                    display: "block",
                                                                    marginBottom: 2
                                                                },
                                                                children: "Input"
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "monospace",
                                                                    fontSize: 13,
                                                                    color: C.navy
                                                                },
                                                                children: tc.input
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 26
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    fontWeight: 700,
                                                                    color: C.muted,
                                                                    display: "block",
                                                                    marginBottom: 2
                                                                },
                                                                children: "Expected Output"
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "monospace",
                                                                    fontSize: 13,
                                                                    color: C.navy
                                                                },
                                                                children: tc.expectedOutput
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 303,
                                                columnNumber: 23
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s1(PreviewModal, "wClLWMl0GDIqmyo1fVV4mZamcxU=");
_c6 = PreviewModal;
// ─── Add Topic Modal ───────────────────────────────────────────────────────────
function TopicModal({ onClose, onSave }) {
    _s2();
    const [topicName, setTopicName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Mathematics");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "rgba(27,30,43,0.45)",
                    backdropFilter: "blur(3px)"
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    background: C.white,
                    borderRadius: 24,
                    width: "100%",
                    maxWidth: 400,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: `linear-gradient(135deg,${C.indigo},#4228D4)`,
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 17,
                                            fontWeight: 800,
                                            color: "#fff",
                                            margin: 0
                                        },
                                        children: "Add New Topic"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            color: "rgba(255,255,255,0.6)",
                                            margin: "3px 0 0"
                                        },
                                        children: "Organize your questions"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                style: {
                                    background: "rgba(255,255,255,0.15)",
                                    border: "none",
                                    borderRadius: 10,
                                    padding: 7,
                                    cursor: "pointer",
                                    color: "#fff",
                                    display: "flex"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16,
                                    strokeWidth: 2.5
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "22px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: C.navy
                                        },
                                        children: "Topic Name"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: topicName,
                                        onChange: (e)=>setTopicName(e.target.value),
                                        placeholder: "e.g. Advanced Calculus",
                                        style: {
                                            background: C.inputBg,
                                            border: "2px solid transparent",
                                            borderRadius: 12,
                                            padding: "10px 14px",
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: C.navy,
                                            outline: "none",
                                            boxSizing: "border-box",
                                            width: "100%"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: C.navy
                                        },
                                        children: "Subject"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 356,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                        value: subject,
                                        options: SUBJECTS.slice(1),
                                        onChange: setSubject
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "14px 24px 20px",
                            borderTop: `1.5px solid ${C.border}`,
                            display: "flex",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                style: {
                                    flex: 1,
                                    background: C.inputBg,
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "11px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: C.muted,
                                    cursor: "pointer"
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    if (topicName.trim()) onSave(topicName.trim(), subject);
                                },
                                style: {
                                    flex: 2,
                                    background: C.coral,
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "11px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#fff",
                                    cursor: "pointer",
                                    boxShadow: `0 4px 14px rgba(255,107,74,0.3)`
                                },
                                children: "Save Topic"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_s2(TopicModal, "d+xQh/HhfmddQvB6d80ZidQgpcg=");
_c7 = TopicModal;
// ─── Add / Edit Question Modal ────────────────────────────────────────────────
function QuestionModal({ editing, defaultTopic, onClose, onSaveSuccess }) {
    _s3();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.text ?? "");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.subject ?? "Mathematics");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.difficulty ?? "Easy");
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.type ?? "Multiple Choice");
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.topic ?? (defaultTopic || "Algebra"));
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.answer ?? "");
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(editing?.points ?? 1));
    const [timeLimit, setTimeLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(editing?.timeLimit ?? ([
        "Coding",
        "Mathematics"
    ].includes(type) ? 300 : 60)));
    const [choices, setChoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.choices ?? [
        "",
        "",
        "",
        ""
    ]);
    const [testCases, setTestCases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.testCases ?? [
        {
            input: "",
            expectedOutput: ""
        }
    ]);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionModal.useEffect": ()=>{
            if (!editing) setTimeLimit([
                "Coding",
                "Mathematics"
            ].includes(type) ? "300" : "60");
        }
    }["QuestionModal.useEffect"], [
        type,
        editing
    ]);
    const handleSave = async ()=>{
        // If editing, check if any fields were actually changed. If none, just close.
        if (editing) {
            const hasChanged = text !== editing.text || subject !== editing.subject || difficulty !== editing.difficulty || type !== editing.type || topic !== editing.topic || answer !== editing.answer || points !== String(editing.points) || timeLimit !== String(editing.timeLimit) || JSON.stringify(choices) !== JSON.stringify(editing.choices) || JSON.stringify(testCases) !== JSON.stringify(editing.testCases);
            if (!hasChanged) {
                onClose();
                return;
            }
        }
        setIsSaving(true);
        try {
            const payload = {
                id: editing?.id,
                text,
                subject,
                difficulty,
                type,
                topic,
                answer,
                points: Number(points),
                timeLimit: Number(timeLimit),
                choices: [
                    "Coding",
                    "Mathematics",
                    "Identification",
                    "Short Answer"
                ].includes(type) ? [] : choices,
                testCases: type === "Coding" ? testCases : []
            };
            const method = editing ? "PUT" : "POST";
            const res = await fetch("/api/questions", {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Failed to save question");
            const savedQuestion = await res.json();
            onSaveSuccess(savedQuestion, !!editing);
        } catch (err) {
            console.error(err);
        } finally{
            setIsSaving(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    position: "absolute",
                    inset: 0,
                    background: "rgba(27,30,43,0.45)",
                    backdropFilter: "blur(3px)"
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 447,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    background: C.white,
                    borderRadius: 24,
                    width: "100%",
                    maxWidth: 560,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "90vh",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: `linear-gradient(135deg,${C.indigo},#4228D4)`,
                            padding: "20px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontFamily: "Manrope,sans-serif",
                                        fontSize: 17,
                                        fontWeight: 800,
                                        color: "#fff",
                                        margin: 0
                                    },
                                    children: editing ? "Edit Question" : "Add New Question"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                style: {
                                    background: "rgba(255,255,255,0.15)",
                                    border: "none",
                                    borderRadius: 10,
                                    padding: 7,
                                    cursor: "pointer",
                                    color: "#fff"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16,
                                    strokeWidth: 2.5
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 459,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowY: "auto",
                            padding: "22px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: C.navy
                                        },
                                        children: "Question Text"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: text,
                                        onChange: (e)=>setText(e.target.value),
                                        placeholder: "Enter question...",
                                        rows: 3,
                                        style: {
                                            background: C.inputBg,
                                            border: "2px solid transparent",
                                            borderRadius: 12,
                                            padding: "10px 14px",
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 14,
                                            color: C.navy,
                                            outline: "none",
                                            width: "100%"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Subject"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 472,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: subject,
                                                options: SUBJECTS.slice(1),
                                                onChange: setSubject
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 473,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Difficulty"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 476,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: difficulty,
                                                options: DIFFICULTIES.slice(1),
                                                onChange: setDifficulty
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 477,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Question Type"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 483,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: type,
                                                options: QTYPES.slice(1),
                                                onChange: setType
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 484,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 482,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Topic"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 487,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: topic,
                                                onChange: (e)=>setTopic(e.target.value),
                                                disabled: !!defaultTopic,
                                                style: {
                                                    background: C.inputBg,
                                                    border: "none",
                                                    borderRadius: 11,
                                                    padding: "8px 12px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    color: defaultTopic ? C.muted : C.navy,
                                                    width: "100%",
                                                    boxSizing: "border-box"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 488,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 481,
                                columnNumber: 11
                            }, this),
                            type === "Multiple Choice" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: C.navy
                                        },
                                        children: "Answer Choices"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this),
                                    choices.map((ch, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: ch,
                                            onChange: (e)=>{
                                                const n = [
                                                    ...choices
                                                ];
                                                n[i] = e.target.value;
                                                setChoices(n);
                                            },
                                            placeholder: `Choice ${[
                                                "A",
                                                "B",
                                                "C",
                                                "D"
                                            ][i]}`,
                                            style: {
                                                background: C.inputBg,
                                                border: "none",
                                                borderRadius: 8,
                                                padding: "8px 12px",
                                                marginBottom: 4,
                                                outline: "none"
                                            }
                                        }, i, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 497,
                                            columnNumber: 18
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this),
                            type === "Coding" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Test Cases"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 506,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setTestCases([
                                                        ...testCases,
                                                        {
                                                            input: "",
                                                            expectedOutput: ""
                                                        }
                                                    ]),
                                                style: {
                                                    background: "none",
                                                    border: "none",
                                                    color: C.indigo,
                                                    fontSize: 12,
                                                    cursor: "pointer",
                                                    fontWeight: 700
                                                },
                                                children: "+ Add Case"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 507,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, this),
                                    testCases.map((tc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: tc.input,
                                                    onChange: (e)=>{
                                                        const n = [
                                                            ...testCases
                                                        ];
                                                        n[i].input = e.target.value;
                                                        setTestCases(n);
                                                    },
                                                    placeholder: "Input (e.g. [1, 2])",
                                                    style: {
                                                        flex: 1,
                                                        background: C.inputBg,
                                                        border: "none",
                                                        borderRadius: 8,
                                                        padding: 8,
                                                        outline: "none"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: tc.expectedOutput,
                                                    onChange: (e)=>{
                                                        const n = [
                                                            ...testCases
                                                        ];
                                                        n[i].expectedOutput = e.target.value;
                                                        setTestCases(n);
                                                    },
                                                    placeholder: "Expected (e.g. 3)",
                                                    style: {
                                                        flex: 1,
                                                        background: C.inputBg,
                                                        border: "none",
                                                        borderRadius: 8,
                                                        padding: 8,
                                                        outline: "none"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 510,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: C.navy
                                        },
                                        children: type === "Coding" ? "Correct Solution (Code)" : type === "Mathematics" ? "Final Answer / Formula" : "Correct Answer"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 519,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: answer,
                                        onChange: (e)=>setAnswer(e.target.value),
                                        rows: type === "Coding" ? 4 : 1,
                                        style: {
                                            background: C.greenLight,
                                            border: `2px solid ${C.greenBorder}`,
                                            borderRadius: 10,
                                            padding: "10px 14px",
                                            fontFamily: type === "Coding" ? "monospace" : "Manrope,sans-serif",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#18A058",
                                            outline: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 518,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Points"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 528,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: points,
                                                onChange: (e)=>setPoints(e.target.value),
                                                type: "number",
                                                style: {
                                                    background: C.inputBg,
                                                    border: "none",
                                                    borderRadius: 10,
                                                    padding: "10px 14px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    color: C.navy,
                                                    outline: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 529,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.navy
                                                },
                                                children: "Time Limit (sec)"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 533,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: timeLimit,
                                                onChange: (e)=>setTimeLimit(e.target.value),
                                                type: "number",
                                                style: {
                                                    background: C.inputBg,
                                                    border: "none",
                                                    borderRadius: 10,
                                                    padding: "10px 14px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    color: C.navy,
                                                    outline: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 534,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 532,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 463,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "14px 24px 20px",
                            borderTop: `1.5px solid ${C.border}`,
                            display: "flex",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                style: {
                                    flex: 1,
                                    background: C.inputBg,
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "11px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: C.muted,
                                    cursor: "pointer"
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleSave,
                                disabled: isSaving,
                                style: {
                                    flex: 2,
                                    background: C.coral,
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "11px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#fff",
                                    cursor: "pointer"
                                },
                                children: isSaving ? "Saving..." : editing ? "Save Changes" : "Save to Database"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 542,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 540,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 446,
        columnNumber: 5
    }, this);
}
_s3(QuestionModal, "gHddQuAw5BjC4TviV+YZ+FxSbSk=");
_c8 = QuestionModal;
function QuestionBank() {
    _s4();
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customTopics, setCustomTopics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeTopic, setActiveTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subjectF, setSubjectF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Subjects");
    const [diffF, setDiffF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Difficulties");
    const [typeF, setTypeF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Types");
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Newest First");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editQ, setEditQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [showAddQuestion, setShowAddQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAddTopic, setShowAddTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [hoveredRow, setHoveredRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showFilterPanel, setShowFilterPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load custom topics from LocalStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBank.useEffect": ()=>{
            const saved = localStorage.getItem("quiz_custom_topics");
            if (saved) {
                try {
                    setCustomTopics(JSON.parse(saved));
                } catch (e) {}
            }
        }
    }["QuestionBank.useEffect"], []);
    // Fetch approved questions from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionBank.useEffect": ()=>{
            async function fetchApprovedQuestions() {
                try {
                    const res = await fetch("/api/questions");
                    if (!res.ok) throw new Error("Failed to fetch questions");
                    const data = await res.json();
                    if (data && data.length > 0) {
                        const formattedQuestions = data.map({
                            "QuestionBank.useEffect.fetchApprovedQuestions.formattedQuestions": (q)=>{
                                // FIX for [object Object] displaying in inputs
                                let parsedChoices = [];
                                try {
                                    let rawChoices = q.choices;
                                    if (typeof rawChoices === 'string') rawChoices = JSON.parse(rawChoices);
                                    if (Array.isArray(rawChoices)) {
                                        parsedChoices = rawChoices.map({
                                            "QuestionBank.useEffect.fetchApprovedQuestions.formattedQuestions": (c)=>{
                                                if (typeof c === 'string') return c;
                                                if (typeof c === 'object' && c !== null) return c.text || c.label || "";
                                                return "";
                                            }
                                        }["QuestionBank.useEffect.fetchApprovedQuestions.formattedQuestions"]);
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
                                    tags: [
                                        "AI-Generated",
                                        q.topic || "General"
                                    ],
                                    createdAt: q.createdAt ? q.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]
                                };
                            }
                        }["QuestionBank.useEffect.fetchApprovedQuestions.formattedQuestions"]);
                        setQuestions(formattedQuestions);
                    }
                } catch (err) {
                    console.error("Error loading user questions:", err);
                }
            }
            fetchApprovedQuestions();
        }
    }["QuestionBank.useEffect"], []);
    // Add new topic and save to LocalStorage
    const handleAddTopic = (name, subject)=>{
        const updated = [
            ...customTopics,
            {
                name,
                subject
            }
        ];
        setCustomTopics(updated);
        localStorage.setItem("quiz_custom_topics", JSON.stringify(updated));
        setShowAddTopic(false);
    };
    // Callback when a question is saved (new or updated)
    const handleQuestionSaved = (newQ, isUpdate)=>{
        if (isUpdate) {
            setQuestions((prev)=>prev.map((q)=>q.id === newQ.id ? newQ : q));
        } else {
            setQuestions((prev)=>[
                    newQ,
                    ...prev
                ]);
        }
        // Remove custom topic from LocalStorage once a question anchors it in DB
        setCustomTopics((prev)=>{
            const filtered = prev.filter((t)=>t.name !== newQ.topic);
            localStorage.setItem("quiz_custom_topics", JSON.stringify(filtered));
            return filtered;
        });
        setShowAddQuestion(false);
        setEditQ(undefined);
    };
    const allTopicCards = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "QuestionBank.useMemo[allTopicCards]": ()=>{
            const map = new Map();
            questions.forEach({
                "QuestionBank.useMemo[allTopicCards]": (q)=>{
                    const tName = q.topic || "General";
                    if (!map.has(tName)) {
                        map.set(tName, {
                            name: tName,
                            subject: q.subject,
                            count: 1
                        });
                    } else {
                        map.get(tName).count += 1;
                    }
                }
            }["QuestionBank.useMemo[allTopicCards]"]);
            customTopics.forEach({
                "QuestionBank.useMemo[allTopicCards]": (t)=>{
                    if (!map.has(t.name)) {
                        map.set(t.name, {
                            name: t.name,
                            subject: t.subject,
                            count: 0
                        });
                    }
                }
            }["QuestionBank.useMemo[allTopicCards]"]);
            return Array.from(map.values()).sort({
                "QuestionBank.useMemo[allTopicCards]": (a, b)=>a.name.localeCompare(b.name)
            }["QuestionBank.useMemo[allTopicCards]"]);
        }
    }["QuestionBank.useMemo[allTopicCards]"], [
        questions,
        customTopics
    ]);
    // ─── DERIVED STATE VARIABLES SECURELY PLACED HERE ───
    const activeFilters = [
        subjectF,
        diffF,
        typeF
    ].filter((v)=>!v.startsWith("All")).length;
    const filtered = questions.filter((q)=>{
        const s = search.toLowerCase();
        const matchSearch = !s || q.text.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s);
        return q.topic === activeTopic && matchSearch && (subjectF === "All Subjects" || q.subject === subjectF) && (diffF === "All Difficulties" || q.difficulty === diffF) && (typeF === "All Types" || q.type === typeF);
    }).sort((a, b)=>{
        if (sort === "A → Z") return a.text.localeCompare(b.text);
        if (sort === "Z → A") return b.text.localeCompare(a.text);
        const dOrder = [
            "Easy",
            "Medium",
            "Hard"
        ];
        if (sort === "Difficulty ↑") return dOrder.indexOf(a.difficulty) - dOrder.indexOf(b.difficulty);
        if (sort === "Difficulty ↓") return dOrder.indexOf(b.difficulty) - dOrder.indexOf(a.difficulty);
        if (sort === "Oldest First") return a.id - b.id;
        return b.id - a.id;
    });
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const curPage = Math.min(page, totalPages);
    const paged = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
    const allPageSelected = paged.length > 0 && paged.every((q)=>selected.has(q.id));
    const someSelected = selected.size > 0;
    function toggleAll() {
        if (allPageSelected) {
            setSelected((s)=>{
                const n = new Set(s);
                paged.forEach((q)=>n.delete(q.id));
                return n;
            });
        } else {
            setSelected((s)=>{
                const n = new Set(s);
                paged.forEach((q)=>n.add(q.id));
                return n;
            });
        }
    }
    function toggleRow(id) {
        setSelected((s)=>{
            const n = new Set(s);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
        });
    }
    const topicQuestions = questions.filter((q)=>q.topic === activeTopic);
    const totalByDiff = {
        Easy: topicQuestions.filter((q)=>q.difficulty === "Easy").length,
        Medium: topicQuestions.filter((q)=>q.difficulty === "Medium").length,
        Hard: topicQuestions.filter((q)=>q.difficulty === "Hard").length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            background: C.offWhite,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfSidebar"], {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 725,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.white,
                            borderBottom: `1.5px solid ${C.border}`,
                            padding: "0 24px",
                            height: 62,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    flex: 1
                                },
                                children: [
                                    activeTopic ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setActiveTopic(null);
                                            setPage(1);
                                            setSearch("");
                                        },
                                        style: {
                                            background: "none",
                                            border: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: C.muted,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                size: 16,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 737,
                                                columnNumber: 18
                                            }, this),
                                            " Back to Topics"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 733,
                                        columnNumber: 16
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 19,
                                            fontWeight: 800,
                                            color: C.navy,
                                            margin: 0
                                        },
                                        children: "Question Topics"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 740,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "relative",
                                            maxWidth: 280,
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 14,
                                                color: C.muted,
                                                strokeWidth: 2,
                                                style: {
                                                    position: "absolute",
                                                    left: 11,
                                                    top: "50%",
                                                    transform: "translateY(-50%)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 744,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: activeTopic ? "Search questions..." : "Search topics...",
                                                value: search,
                                                onChange: (e)=>{
                                                    setSearch(e.target.value);
                                                    setPage(1);
                                                },
                                                style: {
                                                    width: "100%",
                                                    background: C.inputBg,
                                                    border: "2px solid transparent",
                                                    borderRadius: 11,
                                                    padding: "8px 12px 8px 32px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    color: C.navy,
                                                    outline: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 745,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 743,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 731,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 9,
                                    flexShrink: 0
                                },
                                children: [
                                    activeTopic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: 6,
                                                    alignItems: "center"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                        label: "Subject",
                                                        active: subjectF !== "All Subjects",
                                                        onClick: ()=>setShowFilterPanel((v)=>!v),
                                                        onClear: ()=>{
                                                            setSubjectF("All Subjects");
                                                            setPage(1);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 757,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                        label: "Difficulty",
                                                        active: diffF !== "All Difficulties",
                                                        onClick: ()=>setShowFilterPanel((v)=>!v),
                                                        onClear: ()=>{
                                                            setDiffF("All Difficulties");
                                                            setPage(1);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 759,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                        label: "Type",
                                                        active: typeF !== "All Types",
                                                        onClick: ()=>setShowFilterPanel((v)=>!v),
                                                        onClear: ()=>{
                                                            setTypeF("All Types");
                                                            setPage(1);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 761,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: sort,
                                                options: SORT_OPTIONS,
                                                onChange: setSort,
                                                width: 148
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 755,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>activeTopic ? setShowAddQuestion(true) : setShowAddTopic(true),
                                        style: {
                                            background: C.coral,
                                            border: "none",
                                            borderRadius: 11,
                                            padding: "9px 15px",
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "#fff",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 15,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 769,
                                                columnNumber: 15
                                            }, this),
                                            activeTopic ? "Add Question" : "Add Topic"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 767,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 753,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 729,
                        columnNumber: 9
                    }, this),
                    showFilterPanel && activeTopic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.white,
                            borderBottom: `1.5px solid ${C.border}`,
                            padding: "14px 24px",
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-end",
                            flexWrap: "wrap"
                        },
                        children: [
                            [
                                {
                                    label: "Subject",
                                    v: subjectF,
                                    set: (v)=>{
                                        setSubjectF(v);
                                        setPage(1);
                                    },
                                    opts: [
                                        "All Subjects",
                                        ...SUBJECTS.slice(1)
                                    ]
                                },
                                {
                                    label: "Difficulty",
                                    v: diffF,
                                    set: (v)=>{
                                        setDiffF(v);
                                        setPage(1);
                                    },
                                    opts: DIFFICULTIES
                                },
                                {
                                    label: "Question Type",
                                    v: typeF,
                                    set: (v)=>{
                                        setTypeF(v);
                                        setPage(1);
                                    },
                                    opts: QTYPES
                                }
                            ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                        minWidth: 150
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: C.muted,
                                                textTransform: "uppercase"
                                            },
                                            children: f.label
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 783,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                            value: f.v,
                                            options: f.opts,
                                            onChange: f.set,
                                            width: 160
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 784,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, f.label, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowFilterPanel(false),
                                style: {
                                    background: C.inputBg,
                                    border: "none",
                                    borderRadius: 10,
                                    padding: "8px 14px",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.muted,
                                    cursor: "pointer",
                                    alignSelf: "flex-end"
                                },
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                lineNumber: 787,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 776,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "20px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                        },
                        children: activeTopic === null ? /* ── VIEW 1: TOPIC GRID ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: 16
                            },
                            children: [
                                allTopicCards.filter((t)=>!search || t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())).map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            setActiveTopic(topic.name);
                                            setPage(1);
                                        },
                                        style: {
                                            background: C.white,
                                            borderRadius: 18,
                                            border: `1.5px solid ${C.border}`,
                                            padding: "20px 24px",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 12,
                                            boxShadow: "0 2px 14px rgba(0,0,0,0.03)",
                                            transition: "transform 0.15s, box-shadow 0.15s"
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.transform = "translateY(-3px)";
                                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.transform = "none";
                                            e.currentTarget.style.boxShadow = "0 2px 14px rgba(0,0,0,0.03)";
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "flex-start"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: C.indigoLight,
                                                            color: C.indigo,
                                                            padding: 10,
                                                            borderRadius: 12
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                                                            size: 20,
                                                            strokeWidth: 2.5
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopicBadge, {
                                                        topic: topic.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 803,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontFamily: "Manrope,sans-serif",
                                                            fontSize: 16,
                                                            fontWeight: 800,
                                                            color: C.navy,
                                                            margin: "8px 0 4px"
                                                        },
                                                        children: topic.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope,sans-serif",
                                                            fontSize: 13,
                                                            color: C.muted,
                                                            margin: 0
                                                        },
                                                        children: [
                                                            topic.count,
                                                            " Question",
                                                            topic.count !== 1 ? 's' : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 811,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 809,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, topic.name, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                        lineNumber: 799,
                                        columnNumber: 17
                                    }, this)),
                                allTopicCards.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        gridColumn: "1 / -1",
                                        padding: "60px 24px",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"], {
                                            size: 36,
                                            color: C.muted,
                                            strokeWidth: 1.5
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 817,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: C.navy,
                                                margin: 0
                                            },
                                            children: "No topics found"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 818,
                                            columnNumber: 20
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 13,
                                                color: C.muted,
                                                margin: 0
                                            },
                                            children: "Add a new topic to get started."
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 819,
                                            columnNumber: 20
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 816,
                                    columnNumber: 18
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                            lineNumber: 795,
                            columnNumber: 13
                        }, this) : /* ── VIEW 2: FULL QUESTION LIST FOR SELECTED TOPIC ── */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 12
                                    },
                                    children: [
                                        {
                                            label: "Total in Topic",
                                            val: topicQuestions.length,
                                            bg: C.indigoLight,
                                            color: C.indigo
                                        },
                                        {
                                            label: "Easy",
                                            val: totalByDiff.Easy,
                                            bg: C.greenLight,
                                            color: "#18A058"
                                        },
                                        {
                                            label: "Medium",
                                            val: totalByDiff.Medium,
                                            bg: C.yellowLight,
                                            color: "#9A6C00"
                                        },
                                        {
                                            label: "Hard",
                                            val: totalByDiff.Hard,
                                            bg: C.coralLight,
                                            color: "#C8441E"
                                        }
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                background: C.white,
                                                borderRadius: 14,
                                                padding: "12px 16px",
                                                border: `1.5px solid ${C.border}`,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        background: s.color
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 836,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "Manrope,sans-serif",
                                                                fontSize: 20,
                                                                fontWeight: 800,
                                                                color: s.color,
                                                                margin: 0,
                                                                lineHeight: 1
                                                            },
                                                            children: s.val
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                            lineNumber: 838,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "Manrope,sans-serif",
                                                                fontSize: 11,
                                                                fontWeight: 600,
                                                                color: C.muted,
                                                                margin: "2px 0 0"
                                                            },
                                                            children: s.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 837,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, s.label, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 834,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 827,
                                    columnNumber: 15
                                }, this),
                                someSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.navy,
                                        borderRadius: 14,
                                        padding: "11px 18px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 12,
                                        boxShadow: "0 4px 16px rgba(27,30,43,0.18)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "#fff"
                                                    },
                                                    children: [
                                                        selected.size,
                                                        " question",
                                                        selected.size !== 1 ? "s" : "",
                                                        " selected"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setSelected(new Set()),
                                                    style: {
                                                        background: "rgba(255,255,255,0.1)",
                                                        border: "none",
                                                        borderRadius: 7,
                                                        padding: "4px 10px",
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        color: "rgba(255,255,255,0.6)",
                                                        cursor: "pointer"
                                                    },
                                                    children: "Deselect all"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 856,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 852,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8
                                            },
                                            children: [
                                                {
                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        size: 14,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 863,
                                                        columnNumber: 29
                                                    }, this),
                                                    label: "Export",
                                                    bg: "rgba(255,255,255,0.12)",
                                                    col: "#fff"
                                                },
                                                {
                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 14,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 864,
                                                        columnNumber: 29
                                                    }, this),
                                                    label: "Import",
                                                    bg: "rgba(255,255,255,0.12)",
                                                    col: "#fff"
                                                },
                                                {
                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        size: 14,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 865,
                                                        columnNumber: 29
                                                    }, this),
                                                    label: "Duplicate",
                                                    bg: "rgba(255,255,255,0.12)",
                                                    col: "#fff"
                                                },
                                                {
                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 14,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 866,
                                                        columnNumber: 29
                                                    }, this),
                                                    label: "Delete",
                                                    bg: C.redLight,
                                                    col: C.red
                                                }
                                            ].map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 6,
                                                        background: btn.bg,
                                                        border: "none",
                                                        borderRadius: 9,
                                                        padding: "7px 13px",
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: btn.col,
                                                        cursor: "pointer"
                                                    },
                                                    children: [
                                                        btn.icon,
                                                        btn.label
                                                    ]
                                                }, btn.label, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 868,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 861,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 849,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.white,
                                        borderRadius: 18,
                                        border: `1.5px solid ${C.border}`,
                                        overflow: "hidden",
                                        boxShadow: "0 2px 14px rgba(0,0,0,0.04)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "40px 1fr 140px 110px 130px 100px",
                                                padding: "10px 16px",
                                                borderBottom: `1.5px solid ${C.border}`,
                                                background: "#F8F8FC",
                                                gap: 8,
                                                alignItems: "center"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: toggleAll,
                                                    style: {
                                                        background: "none",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: allPageSelected ? C.indigo : C.muted,
                                                        padding: 0
                                                    },
                                                    children: allPageSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                        size: 16,
                                                        strokeWidth: 2.5,
                                                        color: C.indigo
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 40
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                        size: 16,
                                                        strokeWidth: 2,
                                                        color: C.muted
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 102
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 888,
                                                    columnNumber: 19
                                                }, this),
                                                [
                                                    "Question",
                                                    "Subject",
                                                    "Difficulty",
                                                    "Type",
                                                    "Actions"
                                                ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope,sans-serif",
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: C.muted,
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.08em",
                                                            textAlign: i === 4 ? "right" : "left"
                                                        },
                                                        children: h
                                                    }, h, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 885,
                                            columnNumber: 17
                                        }, this),
                                        paged.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: "60px 24px",
                                                textAlign: "center",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                    size: 36,
                                                    color: C.muted,
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 907,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 15,
                                                        fontWeight: 700,
                                                        color: C.navy,
                                                        margin: 0
                                                    },
                                                    children: "No questions found"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 908,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 13,
                                                        color: C.muted,
                                                        margin: 0
                                                    },
                                                    children: "Try adjusting your search or filters, or add a new question to this topic."
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 910,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 905,
                                            columnNumber: 19
                                        }, this) : paged.map((q, ri)=>{
                                            const isSelected = selected.has(q.id);
                                            const isHovered = hoveredRow === q.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onMouseEnter: ()=>setHoveredRow(q.id),
                                                onMouseLeave: ()=>setHoveredRow(null),
                                                style: {
                                                    display: "grid",
                                                    gridTemplateColumns: "40px 1fr 140px 110px 130px 100px",
                                                    padding: "13px 16px",
                                                    gap: 8,
                                                    alignItems: "center",
                                                    cursor: "default",
                                                    background: isSelected ? "rgba(91,61,246,0.04)" : isHovered ? "#FAFAFC" : "#fff",
                                                    borderBottom: ri < paged.length - 1 ? `1px solid ${C.border}` : "none",
                                                    transition: "background 0.12s"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>toggleRow(q.id),
                                                        style: {
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: isSelected ? C.indigo : C.muted,
                                                            padding: 0
                                                        },
                                                        children: isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                            size: 16,
                                                            strokeWidth: 2.5,
                                                            color: C.indigo
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                            lineNumber: 930,
                                                            columnNumber: 39
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                            size: 16,
                                                            strokeWidth: 2,
                                                            color: isHovered ? C.navy : C.muted,
                                                            style: {
                                                                opacity: isHovered ? 0.4 : 0.3
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                            lineNumber: 930,
                                                            columnNumber: 101
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 926,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 4,
                                                            minWidth: 0
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontFamily: "Manrope,sans-serif",
                                                                    fontSize: 13,
                                                                    fontWeight: 600,
                                                                    color: C.navy,
                                                                    margin: 0,
                                                                    lineHeight: 1.4,
                                                                    overflow: "hidden",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: 2,
                                                                    WebkitBoxOrient: "vertical",
                                                                    textOverflow: "ellipsis"
                                                                },
                                                                children: q.text
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 934,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    gap: 5,
                                                                    flexWrap: "wrap",
                                                                    marginTop: 4
                                                                },
                                                                children: [
                                                                    q.type
                                                                ].filter(Boolean).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            background: C.inputBg,
                                                                            borderRadius: 5,
                                                                            padding: "2px 7px",
                                                                            fontFamily: "Manrope, sans-serif",
                                                                            fontSize: 10,
                                                                            fontWeight: 600,
                                                                            color: C.muted
                                                                        },
                                                                        children: [
                                                                            "#",
                                                                            t.replace(/\s+/g, '')
                                                                        ]
                                                                    }, t, true, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                        lineNumber: 941,
                                                                        columnNumber: 29
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 939,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 933,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectBadge, {
                                                        subject: q.subject
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 948,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffBadge, {
                                                        difficulty: q.difficulty
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypeChip, {
                                                        type: q.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 4,
                                                            justifyContent: "flex-end",
                                                            opacity: isHovered || isSelected ? 1 : 0.35,
                                                            transition: "opacity 0.12s"
                                                        },
                                                        children: [
                                                            {
                                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                    size: 14,
                                                                    strokeWidth: 2
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                    lineNumber: 955,
                                                                    columnNumber: 33
                                                                }, this),
                                                                tip: "Preview",
                                                                cb: ()=>setPreview(q),
                                                                bg: C.indigoLight,
                                                                col: C.indigo
                                                            },
                                                            {
                                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                    size: 13,
                                                                    strokeWidth: 2
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                    lineNumber: 957,
                                                                    columnNumber: 33
                                                                }, this),
                                                                tip: "Edit",
                                                                cb: ()=>setEditQ(q),
                                                                bg: C.yellowLight,
                                                                col: "#9A6C00"
                                                            },
                                                            {
                                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 13,
                                                                    strokeWidth: 2
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                    lineNumber: 959,
                                                                    columnNumber: 33
                                                                }, this),
                                                                tip: "Delete",
                                                                cb: ()=>{},
                                                                bg: C.redLight,
                                                                col: C.red
                                                            }
                                                        ].map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: btn.cb,
                                                                title: btn.tip,
                                                                style: {
                                                                    background: btn.bg,
                                                                    border: "none",
                                                                    borderRadius: 8,
                                                                    padding: "6px",
                                                                    cursor: "pointer",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    color: btn.col
                                                                },
                                                                children: btn.icon
                                                            }, btn.tip, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                                lineNumber: 962,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, q.id, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                lineNumber: 917,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 881,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: C.white,
                                        borderRadius: 14,
                                        padding: "13px 18px",
                                        border: `1.5px solid ${C.border}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: C.muted,
                                                margin: 0
                                            },
                                            children: [
                                                "Showing ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: C.navy
                                                    },
                                                    children: [
                                                        (curPage - 1) * PAGE_SIZE + 1,
                                                        "–",
                                                        Math.min(curPage * PAGE_SIZE, filtered.length)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 979,
                                                    columnNumber: 27
                                                }, this),
                                                " ",
                                                "of ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    style: {
                                                        color: C.navy
                                                    },
                                                    children: filtered.length
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 980,
                                                    columnNumber: 22
                                                }, this),
                                                " questions",
                                                activeFilters > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        setSubjectF("All Subjects");
                                                        setDiffF("All Difficulties");
                                                        setTypeF("All Types");
                                                        setPage(1);
                                                    },
                                                    style: {
                                                        background: "none",
                                                        border: "none",
                                                        color: C.indigo,
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        cursor: "pointer",
                                                        marginLeft: 8,
                                                        padding: 0
                                                    },
                                                    children: "Clear filters"
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 982,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 978,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 5,
                                                alignItems: "center"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                                    disabled: curPage === 1,
                                                    style: {
                                                        background: curPage === 1 ? C.inputBg : C.white,
                                                        border: `1.5px solid ${C.border}`,
                                                        borderRadius: 9,
                                                        padding: "6px 9px",
                                                        cursor: curPage === 1 ? "default" : "pointer",
                                                        color: curPage === 1 ? C.muted : C.navy,
                                                        display: "flex",
                                                        opacity: curPage === 1 ? 0.4 : 1
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                        size: 14,
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 995,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 19
                                                }, this),
                                                Array.from({
                                                    length: totalPages
                                                }, (_, i)=>i + 1).filter((p)=>p === 1 || p === totalPages || Math.abs(p - curPage) <= 1).reduce((acc, p, i, arr)=>{
                                                    if (i > 0 && p - arr[i - 1] > 1) acc.push("…");
                                                    acc.push(p);
                                                    return acc;
                                                }, []).map((p, i)=>p === "…" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope,sans-serif",
                                                            fontSize: 13,
                                                            color: C.muted,
                                                            padding: "0 4px"
                                                        },
                                                        children: "…"
                                                    }, `e${i}`, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 1005,
                                                        columnNumber: 24
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPage(p),
                                                        style: {
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 9,
                                                            background: p === curPage ? C.indigo : C.white,
                                                            border: `1.5px solid ${p === curPage ? C.indigo : C.border}`,
                                                            fontFamily: "Manrope,sans-serif",
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: p === curPage ? "#fff" : C.navy,
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        },
                                                        children: p
                                                    }, p, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 1007,
                                                        columnNumber: 25
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                                    disabled: curPage === totalPages,
                                                    style: {
                                                        background: curPage === totalPages ? C.inputBg : C.white,
                                                        border: `1.5px solid ${C.border}`,
                                                        borderRadius: 9,
                                                        padding: "6px 9px",
                                                        cursor: curPage === totalPages ? "default" : "pointer",
                                                        color: curPage === totalPages ? C.muted : C.navy,
                                                        display: "flex",
                                                        opacity: curPage === totalPages ? 0.4 : 1
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        size: 14,
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                        lineNumber: 1022,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                                    lineNumber: 1017,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                            lineNumber: 989,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                                    lineNumber: 976,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                            lineNumber: 825,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                        lineNumber: 792,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 726,
                columnNumber: 7
            }, this),
            preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewModal, {
                q: preview,
                onClose: ()=>setPreview(null)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 1031,
                columnNumber: 19
            }, this),
            (showAddQuestion || editQ) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionModal, {
                defaultTopic: activeTopic || undefined,
                editing: editQ,
                onClose: ()=>{
                    setShowAddQuestion(false);
                    setEditQ(undefined);
                },
                onSaveSuccess: handleQuestionSaved
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 1033,
                columnNumber: 9
            }, this),
            showAddTopic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopicModal, {
                onClose: ()=>setShowAddTopic(false),
                onSave: handleAddTopic
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
                lineNumber: 1040,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/QuestionBank.tsx",
        lineNumber: 724,
        columnNumber: 5
    }, this);
}
_s4(QuestionBank, "Nt03lMIW4qxMPAr+QbiUhr4oZhU=");
_c9 = QuestionBank;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "TopicBadge");
__turbopack_context__.k.register(_c1, "SubjectBadge");
__turbopack_context__.k.register(_c2, "DiffBadge");
__turbopack_context__.k.register(_c3, "TypeChip");
__turbopack_context__.k.register(_c4, "Dropdown");
__turbopack_context__.k.register(_c5, "FilterChip");
__turbopack_context__.k.register(_c6, "PreviewModal");
__turbopack_context__.k.register(_c7, "TopicModal");
__turbopack_context__.k.register(_c8, "QuestionModal");
__turbopack_context__.k.register(_c9, "QuestionBank");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=quizarenaremastered_frontend_src_components_profonly_QuestionBank_tsx_1sbzq5e._.js.map