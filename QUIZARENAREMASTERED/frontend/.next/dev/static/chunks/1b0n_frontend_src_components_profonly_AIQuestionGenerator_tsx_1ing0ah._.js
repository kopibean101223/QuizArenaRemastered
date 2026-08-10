(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIQuestionGenerator",
    ()=>AIQuestionGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/ProfSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-dot.js [app-client] (ecmascript) <export default as CircleDot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/align-left.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
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
    citationBorder: "rgba(91,61,246,0.16)"
};
// ─── Helpers ───────────────────────────────────────────────────────────────────
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
        border: "rgba(255,107,74,0.25)"
    }
};
const STATUS_STYLE = {
    pending: {
        bg: C.yellowLight,
        text: "#9A6C00",
        border: C.yellowBorder,
        label: "Pending"
    },
    approved: {
        bg: C.greenLight,
        text: "#18A058",
        border: C.greenBorder,
        label: "Approved"
    },
    rejected: {
        bg: C.redLight,
        text: C.red,
        border: C.redBorder,
        label: "Rejected"
    }
};
const DOC_STATUS = {
    uploading: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            size: 11,
            strokeWidth: 2.5,
            style: {
                animation: "spin 0.8s linear infinite"
            }
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
            lineNumber: 104,
            columnNumber: 23
        }, ("TURBOPACK compile-time value", void 0)),
        text: "Uploading",
        bg: C.indigoMid,
        color: C.indigo
    },
    processing: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            size: 11,
            strokeWidth: 2.5,
            style: {
                animation: "spin 0.8s linear infinite"
            }
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
            lineNumber: 105,
            columnNumber: 23
        }, ("TURBOPACK compile-time value", void 0)),
        text: "Processing",
        bg: C.yellowLight,
        color: "#9A6C00"
    },
    ready: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            size: 11,
            strokeWidth: 2.5
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
            lineNumber: 106,
            columnNumber: 23
        }, ("TURBOPACK compile-time value", void 0)),
        text: "Ready",
        bg: C.greenLight,
        color: "#18A058"
    }
};
const QTYPE_ICON = {
    "Multiple Choice": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 110,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Checkbox": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 111,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "True / False": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleDot$3e$__["CircleDot"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 112,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Identification": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 113,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Short Answer": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 114,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Coding": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 115,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Mathematics": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
        size: 10,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 116,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0))
};
function Sidebar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfSidebar"], {}, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 120,
        columnNumber: 10
    }, this);
}
_c = Sidebar;
// ─── Citation Panel ────────────────────────────────────────────────────────────
function CitationPanel({ citation, flagged, flagReason, onFlag }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isStrong = citation?.confidence === "strong";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.citationBg,
            border: `1.5px solid ${flagged ? "rgba(255,71,87,0.22)" : C.citationBorder}`,
            borderRadius: 14,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "11px 14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: 9,
                            background: C.indigoMid,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            size: 15,
                            color: C.indigo,
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginBottom: 3,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 800,
                                            color: C.indigo,
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase"
                                        },
                                        children: "Source Citation"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            background: isStrong ? C.greenLight : C.yellowLight,
                                            color: isStrong ? "#18A058" : "#9A6C00",
                                            border: `1.5px solid ${isStrong ? C.greenBorder : C.yellowBorder}`,
                                            borderRadius: 20,
                                            padding: "2px 8px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 10,
                                            fontWeight: 800
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: "50%",
                                                    background: isStrong ? "#18A058" : "#9A6C00"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            isStrong ? "Strong Match" : "Low Confidence"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.navy,
                                    margin: 0,
                                    lineHeight: 1.4,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: citation?.docName || "Syllabus Document"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 4,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 500,
                                            color: C.muted
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                size: 10,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            citation?.topic || "General"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 3,
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: C.indigo
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                                size: 10,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 156,
                                                columnNumber: 15
                                            }, this),
                                            citation?.pageRange || "Page 1",
                                            " ",
                                            citation?.paragraph ? `· ${citation.paragraph}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setExpanded((v)=>!v),
                        style: {
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: C.muted,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "2px 4px",
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            flexShrink: 0,
                            marginTop: 2
                        },
                        children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            size: 13,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 162,
                            columnNumber: 23
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 13,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 162,
                            columnNumber: 67
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "0 14px 12px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "rgba(255,255,255,0.7)",
                        border: `1.5px solid ${C.indigoBorder}`,
                        borderRadius: 10,
                        padding: "10px 13px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#3D3D5C",
                            margin: 0,
                            lineHeight: 1.65,
                            fontStyle: "italic"
                        },
                        children: [
                            '"',
                            citation?.excerpt || "No context provided.",
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(CitationPanel, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c1 = CitationPanel;
// ─── Question Card ─────────────────────────────────────────────────────────────
function QuestionCard({ q, onStatusChange, onFlag, onEdit }) {
    _s1();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editState, setEditState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        text: q.text,
        answer: q.answer,
        choices: q.choices || []
    });
    const statusS = STATUS_STYLE[q.status] || STATUS_STYLE.pending;
    const diffS = DIFF_STYLE[q.difficulty] || DIFF_STYLE.Medium;
    const labels = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
    ];
    const handleSaveEdit = ()=>{
        onEdit(q.id, editState);
        setIsEditing(false);
    };
    const updateChoice = (idx, text)=>{
        const newChoices = [
            ...editState.choices
        ];
        newChoices[idx].text = text;
        setEditState({
            ...editState,
            choices: newChoices
        });
    };
    const toggleCorrectChoice = (idx)=>{
        const newChoices = [
            ...editState.choices
        ];
        if (q.type !== "Checkbox") {
            newChoices.forEach((c, i)=>c.isCorrect = i === idx);
        } else {
            newChoices[idx].isCorrect = !newChoices[idx].isCorrect;
        }
        setEditState({
            ...editState,
            choices: newChoices
        });
    };
    const addChoice = ()=>{
        if (editState.choices.length >= labels.length) return;
        const newLabel = labels[editState.choices.length];
        setEditState({
            ...editState,
            choices: [
                ...editState.choices,
                {
                    label: newLabel,
                    text: "",
                    isCorrect: false
                }
            ]
        });
    };
    const removeChoice = (idx)=>{
        const newChoices = editState.choices.filter((_, i)=>i !== idx).map((c, i)=>({
                ...c,
                label: labels[i]
            }));
        setEditState({
            ...editState,
            choices: newChoices
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.white,
            borderRadius: 20,
            border: `1.5px solid ${q.status === "approved" ? C.greenBorder : q.status === "rejected" ? C.redBorder : C.border}`,
            boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
            overflow: "hidden",
            opacity: q.status === "rejected" ? 0.72 : 1,
            transition: "all 0.18s"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 18px 14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 6,
                                    marginBottom: 8,
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            background: statusS.bg,
                                            color: statusS.text,
                                            border: `1.5px solid ${statusS.border}`,
                                            borderRadius: 20,
                                            padding: "2px 9px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 800
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: "50%",
                                                    background: statusS.text
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this),
                                            statusS.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: diffS.bg,
                                            color: diffS.text,
                                            border: `1.5px solid ${diffS.border}`,
                                            borderRadius: 7,
                                            padding: "2px 8px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700
                                        },
                                        children: q.difficulty
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            background: C.inputBg,
                                            color: C.muted,
                                            borderRadius: 7,
                                            padding: "2px 8px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 600
                                        },
                                        children: [
                                            QTYPE_ICON[q.type] || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                size: 10,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 235,
                                                columnNumber: 38
                                            }, this),
                                            q.type
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.indigoLight,
                                            color: C.indigo,
                                            borderRadius: 7,
                                            padding: "2px 8px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700
                                        },
                                        children: q.topic
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: editState.text,
                                onChange: (e)=>setEditState({
                                        ...editState,
                                        text: e.target.value
                                    }),
                                style: {
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border: `1px solid ${C.indigoBorder}`,
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: C.navy,
                                    minHeight: "60px",
                                    resize: "vertical"
                                }
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: C.navy,
                                    margin: 0,
                                    lineHeight: 1.55
                                },
                                children: q.text
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setExpanded((v)=>!v),
                        style: {
                            background: C.inputBg,
                            border: "none",
                            borderRadius: 9,
                            padding: 7,
                            cursor: "pointer",
                            color: C.muted,
                            display: "flex",
                            flexShrink: 0
                        },
                        children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            size: 14,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 255,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            size: 14,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 255,
                            columnNumber: 69
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            (expanded || isEditing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    q.choices && q.choices.length > 0 || isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 18px 14px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6
                        },
                        children: [
                            editState.choices.map((ch, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        background: isEditing ? C.offWhite : ch.isCorrect ? C.greenLight : C.offWhite,
                                        border: `1.5px solid ${isEditing ? C.border : ch.isCorrect ? C.greenBorder : C.border}`,
                                        borderRadius: 11,
                                        padding: "8px 12px"
                                    },
                                    children: [
                                        isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: q.type === "Checkbox" ? "checkbox" : "radio",
                                            checked: ch.isCorrect,
                                            onChange: ()=>toggleCorrectChoice(idx),
                                            style: {
                                                cursor: "pointer",
                                                width: 16,
                                                height: 16
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 270,
                                            columnNumber: 21
                                        }, this) : q.type === "Checkbox" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 18,
                                                height: 18,
                                                borderRadius: 5,
                                                border: `2px solid ${ch.isCorrect ? "#18A058" : C.muted}`,
                                                background: ch.isCorrect ? "#18A058" : "transparent",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            },
                                            children: ch.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                size: 12,
                                                color: "#fff",
                                                strokeWidth: 3
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 279,
                                                columnNumber: 42
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 278,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: 22,
                                                height: 22,
                                                borderRadius: "50%",
                                                flexShrink: 0,
                                                background: ch.isCorrect ? C.green : "rgba(0,0,0,0.06)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 11,
                                                fontWeight: 800,
                                                color: ch.isCorrect ? "#fff" : C.muted
                                            },
                                            children: ch.label
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 282,
                                            columnNumber: 23
                                        }, this),
                                        isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: ch.text,
                                            onChange: (e)=>updateChoice(idx, e.target.value),
                                            style: {
                                                flex: 1,
                                                border: `1px solid ${C.border}`,
                                                borderRadius: "6px",
                                                padding: "6px 10px",
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 13,
                                                background: "#fff"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 289,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 13,
                                                fontWeight: ch.isCorrect ? 700 : 500,
                                                color: ch.isCorrect ? "#18A058" : C.navy
                                            },
                                            children: ch.text
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 296,
                                            columnNumber: 21
                                        }, this),
                                        isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeChoice(idx),
                                            style: {
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                color: C.red
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 300,
                                                columnNumber: 164
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 300,
                                            columnNumber: 21
                                        }, this),
                                        !isEditing && ch.isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 14,
                                            color: "#18A058",
                                            style: {
                                                marginLeft: "auto"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                            lineNumber: 302,
                                            columnNumber: 50
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 265,
                                    columnNumber: 17
                                }, this)),
                            isEditing && (editState.choices.length > 0 || q.type === "Multiple Choice" || q.type === "Checkbox") && editState.choices.length < 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addChoice,
                                style: {
                                    background: C.indigoLight,
                                    color: C.indigo,
                                    border: `1px dashed ${C.indigo}`,
                                    borderRadius: "8px",
                                    padding: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 5,
                                    cursor: "pointer",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 308,
                                        columnNumber: 19
                                    }, this),
                                    " Add Choice"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 307,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 263,
                        columnNumber: 13
                    }, this) : null,
                    (!editState.choices || editState.choices.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 18px 14px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: C.greenLight,
                                border: `1.5px solid ${C.greenBorder}`,
                                borderRadius: 11,
                                padding: "9px 13px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "Manrope, sans-serif",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "#18A058",
                                        margin: "0 0 3px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em"
                                    },
                                    children: "Answer"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 317,
                                    columnNumber: 17
                                }, this),
                                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: editState.answer,
                                    onChange: (e)=>setEditState({
                                            ...editState,
                                            answer: e.target.value
                                        }),
                                    style: {
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "8px",
                                        border: `1px solid ${C.greenBorder}`,
                                        fontFamily: "Manrope, sans-serif",
                                        fontSize: 13,
                                        minHeight: "50px",
                                        resize: "vertical"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 319,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "Manrope, sans-serif",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#18A058",
                                        margin: 0,
                                        lineHeight: 1.5
                                    },
                                    children: q.answer
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 325,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 316,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 315,
                        columnNumber: 13
                    }, this),
                    !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 18px 14px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CitationPanel, {
                            citation: q.citation,
                            flagged: q.flagged,
                            flagReason: q.flagReason,
                            onFlag: (reason)=>onFlag(q.id, reason)
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 333,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 332,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 261,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: `1.5px solid ${C.border}`,
                    padding: "11px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    background: "#FAFAFC"
                },
                children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 6,
                        width: "100%",
                        justifyContent: "flex-end"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                size: 13,
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 342,
                                columnNumber: 30
                            }, this),
                            label: "Save Changes",
                            bg: C.greenLight,
                            color: "#18A058",
                            border: C.greenBorder,
                            onClick: handleSaveEdit
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 13,
                                strokeWidth: 2.5
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 343,
                                columnNumber: 30
                            }, this),
                            label: "Cancel",
                            bg: C.redLight,
                            color: C.red,
                            border: C.redBorder,
                            onClick: ()=>{
                                setIsEditing(false);
                                setEditState({
                                    text: q.text,
                                    answer: q.answer,
                                    choices: q.choices || []
                                });
                            }
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                    lineNumber: 341,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                    size: 13,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 348,
                                    columnNumber: 32
                                }, this),
                                label: "Edit",
                                bg: C.yellowLight,
                                color: "#9A6C00",
                                onClick: ()=>setIsEditing(true)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 348,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        q.status !== "approved" && q.status !== "rejected" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 13,
                                        strokeWidth: 2.5
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 352,
                                        columnNumber: 34
                                    }, this),
                                    label: "Approve",
                                    bg: C.greenLight,
                                    color: "#18A058",
                                    border: C.greenBorder,
                                    onClick: ()=>onStatusChange(q.id, "approved")
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 352,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionBtn, {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        size: 13,
                                        strokeWidth: 2.5
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 353,
                                        columnNumber: 34
                                    }, this),
                                    label: "Reject",
                                    bg: C.redLight,
                                    color: C.red,
                                    border: C.redBorder,
                                    onClick: ()=>onStatusChange(q.id, "rejected")
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 353,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 351,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onStatusChange(q.id, "pending"),
                            style: {
                                background: "transparent",
                                border: `1.5px solid ${C.border}`,
                                borderRadius: 9,
                                padding: "6px 12px",
                                fontFamily: "Manrope, sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                color: C.muted,
                                cursor: "pointer"
                            },
                            children: "Reset to Pending"
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 356,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                    lineNumber: 346,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_s1(QuestionCard, "Xu2vdodmVT/4oaH/jzJDTGO5Q/8=");
_c2 = QuestionCard;
function ActionBtn({ icon, label, bg, color, border, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            background: bg,
            border: `1.5px solid ${border ?? "transparent"}`,
            borderRadius: 9,
            padding: "6px 12px",
            cursor: "pointer",
            fontFamily: "Manrope, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color
        },
        children: [
            icon,
            label
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
_c3 = ActionBtn;
// ─── Generate Config Panel ─────────────────────────────────────────────────────
function GeneratePanel({ docs, onGenerate, generating }) {
    _s2();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("5");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Medium");
    const [selectedQtypes, setSelectedQtypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "Multiple Choice"
    ]);
    const [selectedDoc, setSelectedDoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const readyDocs = docs.filter((d)=>d.status === "ready");
    const toggleQtype = (type)=>{
        setSelectedQtypes((prev)=>{
            if (prev.includes(type)) {
                if (prev.length === 1) return prev;
                return prev.filter((t)=>t !== type);
            } else {
                return [
                    ...prev,
                    type
                ];
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.white,
            borderRadius: 16,
            border: `1.5px solid ${C.border}`,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 14
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        size: 15,
                        color: C.indigo,
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 13,
                            fontWeight: 800,
                            color: C.navy
                        },
                        children: "Generate Settings"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 403,
                columnNumber: 7
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
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.muted,
                            textTransform: "uppercase",
                            letterSpacing: "0.07em"
                        },
                        children: "Source Document"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectedDoc("all"),
                                style: {
                                    background: selectedDoc === "all" ? C.indigoLight : C.offWhite,
                                    border: `1.5px solid ${selectedDoc === "all" ? C.indigo : C.border}`,
                                    borderRadius: 10,
                                    padding: "7px 12px",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: selectedDoc === "all" ? C.indigo : C.muted
                                },
                                children: [
                                    "All ready documents (",
                                    readyDocs.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 412,
                                columnNumber: 11
                            }, this),
                            readyDocs.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedDoc(d.id),
                                    style: {
                                        background: selectedDoc === d.id ? C.indigoLight : "transparent",
                                        border: `1.5px solid ${selectedDoc === d.id ? C.indigo : C.border}`,
                                        borderRadius: 10,
                                        padding: "7px 12px",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        fontFamily: "Manrope, sans-serif",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: selectedDoc === d.id ? C.indigo : C.navy,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    },
                                    children: d.filename
                                }, d.id, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 409,
                columnNumber: 7
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
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.muted,
                            textTransform: "uppercase",
                            letterSpacing: "0.07em"
                        },
                        children: "Questions to Generate"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 6
                        },
                        children: [
                            "3",
                            "5",
                            "10",
                            "15"
                        ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setCount(n),
                                style: {
                                    flex: 1,
                                    background: count === n ? C.indigo : C.offWhite,
                                    border: `1.5px solid ${count === n ? C.indigo : C.border}`,
                                    borderRadius: 9,
                                    padding: "7px 0",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: count === n ? "#fff" : C.navy,
                                    cursor: "pointer"
                                },
                                children: n
                            }, n, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 428,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 424,
                columnNumber: 7
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
                            fontFamily: "Manrope, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.muted,
                            textTransform: "uppercase",
                            letterSpacing: "0.07em"
                        },
                        children: "Difficulty"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 437,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 5
                        },
                        children: [
                            "Easy",
                            "Medium",
                            "Hard"
                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDifficulty(d),
                                style: {
                                    flex: 1,
                                    background: difficulty === d ? C.indigoLight : C.offWhite,
                                    border: `1.5px solid ${difficulty === d ? C.indigo : C.border}`,
                                    borderRadius: 8,
                                    padding: "6px 0",
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: difficulty === d ? C.indigo : C.muted,
                                    cursor: "pointer"
                                },
                                children: d
                            }, d, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 440,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 5
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
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: C.muted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.07em"
                                },
                                children: "Question Types"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: C.indigo
                                },
                                children: "Multi-select"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 451,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 5,
                            flexWrap: "wrap"
                        },
                        children: [
                            "Multiple Choice",
                            "True / False",
                            "Identification",
                            "Short Answer",
                            "Coding",
                            "Mathematics"
                        ].map((t)=>{
                            const isSelected = selectedQtypes.includes(t);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>toggleQtype(t),
                                style: {
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
                                },
                                children: [
                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 5,
                                            height: 5,
                                            borderRadius: "50%",
                                            background: C.indigo
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 476,
                                        columnNumber: 32
                                    }, this),
                                    t
                                ]
                            }, t, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 457,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onGenerate({
                        count,
                        difficulty,
                        qtypes: selectedQtypes,
                        docId: selectedDoc
                    }),
                disabled: generating || readyDocs.length === 0 || selectedQtypes.length === 0,
                style: {
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
                },
                children: generating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            size: 16,
                            strokeWidth: 2.5,
                            style: {
                                animation: "spin 0.8s linear infinite"
                            }
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 508,
                            columnNumber: 25
                        }, this),
                        "Generating…"
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                    lineNumber: 508,
                    columnNumber: 23
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            size: 16,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                            lineNumber: 508,
                            columnNumber: 134
                        }, this),
                        "Generate Questions"
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                    lineNumber: 508,
                    columnNumber: 132
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 485,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
}
_s2(GeneratePanel, "qms+RtwEmNjA2fS8v2rA0O8IIQ4=");
_c4 = GeneratePanel;
function AIQuestionGenerator() {
    _s3();
    const [docs, setDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [generating, setGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIQuestionGenerator.useEffect": ()=>{
            async function fetchInitialData() {
                try {
                    const response = await fetch("/api/rag/data");
                    if (response.ok) {
                        const data = await response.json();
                        setDocs(data.docs || []);
                        const normalizedQuestions = (data.questions || []).map({
                            "AIQuestionGenerator.useEffect.fetchInitialData.normalizedQuestions": (q)=>({
                                    ...q,
                                    status: String(q.status || "pending").toLowerCase()
                                })
                        }["AIQuestionGenerator.useEffect.fetchInitialData.normalizedQuestions"]);
                        setQuestions(normalizedQuestions);
                    }
                } catch (error) {
                    console.error("Failed to fetch initial database state", error);
                }
            }
            fetchInitialData();
        }
    }["AIQuestionGenerator.useEffect"], []);
    async function handleUpload(e) {
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
        const tempDoc = {
            id: tempId,
            filename: file.name,
            uploadDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            status: "processing",
            pages: 0,
            subject: "General"
        };
        setDocs((d)=>[
                tempDoc,
                ...d
            ]);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("/api/rag/upload", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Upload processing failed");
            }
            const savedDoc = await response.json();
            setDocs((d)=>d.map((x)=>x.id === tempId ? {
                        ...x,
                        id: savedDoc.id,
                        status: "ready",
                        pages: savedDoc.pages
                    } : x));
        } catch (error) {
            alert(error?.message || "Upload failed");
            setDocs((d)=>d.filter((x)=>x.id !== tempId));
        } finally{
            if (fileRef.current) fileRef.current.value = "";
            setIsUploading(false);
        }
    }
    const handleGenerate = async (config)=>{
        if (docs.length === 0) {
            alert("Please upload at least one syllabus document first.");
            return;
        }
        setGenerating(true);
        try {
            const activeDocId = config.docId === "all" ? docs[0].id : config.docId;
            const response = await fetch("/api/rag/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    count: parseInt(config.count, 10),
                    difficulty: config.difficulty,
                    types: config.qtypes,
                    document_id: activeDocId,
                    category: "General"
                })
            });
            const resData = await response.json().catch(()=>({}));
            if (!response.ok) {
                const errorMessage = resData?.detail || resData?.error || "Failed to generate questions.";
                throw new Error(errorMessage);
            }
            const normalizedData = (Array.isArray(resData) ? resData : resData.questions || []).map((q)=>({
                    ...q,
                    status: String(q.status || "pending").toLowerCase()
                }));
            setQuestions((prev)=>[
                    ...normalizedData,
                    ...prev
                ]);
        } catch (error) {
            console.error("Error generating questions:", error);
            alert(error.message || "Failed to generate questions.");
        } finally{
            setGenerating(false);
        }
    };
    const filtered = statusFilter === "all" ? questions : questions.filter((q)=>q.status === statusFilter);
    const counts = {
        all: questions.length,
        pending: questions.filter((q)=>q.status === "pending").length,
        approved: questions.filter((q)=>q.status === "approved").length,
        rejected: questions.filter((q)=>q.status === "rejected").length
    };
    const handleDeleteDoc = async (id)=>{
        setDocs((prev)=>prev.filter((d)=>d.id !== id));
        setQuestions((prev)=>prev.filter((q)=>q.docId !== id));
        try {
            await fetch(`/api/rag/doc?id=${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };
    const handleStatusChange = async (questionId, newStatus)=>{
        setQuestions((prev)=>prev.map((q)=>q.id === questionId ? {
                    ...q,
                    status: newStatus
                } : q));
        try {
            await fetch("/api/rag/status", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId,
                    status: newStatus.toUpperCase()
                })
            });
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };
    const handleBulkStatusChange = async (targetStatus)=>{
        const pendingQuestions = questions.filter((q)=>q.status === "pending");
        if (pendingQuestions.length === 0) return;
        const pendingIds = pendingQuestions.map((q)=>q.id);
        setQuestions((prev)=>prev.map((q)=>q.status === "pending" ? {
                    ...q,
                    status: targetStatus
                } : q));
        try {
            await fetch("/api/rag/status/bulk", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ids: pendingIds,
                    status: targetStatus.toUpperCase()
                })
            });
        } catch (error) {
            console.error("Failed to execute bulk status change:", error);
        }
    };
    const handleDeleteAllRejected = async ()=>{
        const rejectedQuestions = questions.filter((q)=>q.status === "rejected");
        if (rejectedQuestions.length === 0) return;
        setQuestions((prev)=>prev.filter((q)=>q.status !== "rejected"));
        try {
            await fetch("/api/rag/status/bulk", {
                method: "DELETE"
            });
        } catch (error) {
            console.error("Failed to delete rejected questions:", error);
        }
    };
    const handleEditQuestion = async (id, data)=>{
        setQuestions((prev)=>prev.map((q)=>q.id === id ? {
                    ...q,
                    ...data
                } : q));
        try {
            await fetch("/api/rag/edit", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    ...data
                })
            });
        } catch (error) {
            console.error("Failed to update question data:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progressPulse { 0%{width:10%} 50%{width:65%} 100%{width:10%} }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 733,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    height: "100vh",
                    background: C.offWhite,
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {}, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 738,
                        columnNumber: 9
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
                                            gap: 12
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: 10,
                                                    background: C.indigoLight,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    size: 17,
                                                    color: C.indigo,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                    lineNumber: 744,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 743,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 18,
                                                            fontWeight: 800,
                                                            color: C.navy,
                                                            margin: 0,
                                                            lineHeight: 1.2
                                                        },
                                                        children: "AI Question Generator"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            color: C.muted,
                                                            margin: 0
                                                        },
                                                        children: "Powered by your syllabus · every question cites its source"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 748,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 746,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 742,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    background: C.greenLight,
                                                    border: `1.5px solid ${C.greenBorder}`,
                                                    borderRadius: 20,
                                                    padding: "5px 12px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 12,
                                                        color: "#18A058",
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: "#18A058"
                                                        },
                                                        children: [
                                                            counts.approved,
                                                            " Approved"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 756,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 754,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    background: C.yellowLight,
                                                    border: `1.5px solid ${C.yellowBorder}`,
                                                    borderRadius: 20,
                                                    padding: "5px 12px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        size: 12,
                                                        color: "#9A6C00",
                                                        strokeWidth: 2.5
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 761,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: "#9A6C00"
                                                        },
                                                        children: [
                                                            counts.pending,
                                                            " Pending"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 760,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 741,
                                columnNumber: 11
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
                                            width: 300,
                                            minWidth: 300,
                                            borderRight: `1.5px solid ${C.border}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            overflow: "hidden",
                                            background: "#F5F5FA"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: "18px 16px 14px",
                                                    borderBottom: `1.5px solid ${C.border}`,
                                                    background: C.white
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            marginBottom: 12
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "Manrope, sans-serif",
                                                                    fontSize: 13,
                                                                    fontWeight: 800,
                                                                    color: C.navy
                                                                },
                                                                children: "Syllabus Documents"
                                                            }, void 0, false, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 773,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "Manrope, sans-serif",
                                                                    fontSize: 11,
                                                                    fontWeight: 700,
                                                                    color: C.muted,
                                                                    background: C.inputBg,
                                                                    borderRadius: 20,
                                                                    padding: "2px 8px"
                                                                },
                                                                children: [
                                                                    docs.length,
                                                                    " files"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 776,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 772,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        ref: fileRef,
                                                        type: "file",
                                                        accept: ".pdf,.docx",
                                                        onChange: handleUpload,
                                                        style: {
                                                            display: "none"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 780,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            if (!isUploading) fileRef.current?.click();
                                                        },
                                                        disabled: isUploading,
                                                        style: {
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
                                                        },
                                                        children: isUploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                    size: 14,
                                                                    strokeWidth: 2.5,
                                                                    style: {
                                                                        animation: "spin 0.8s linear infinite"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                    lineNumber: 805,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Uploading..."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                    size: 14,
                                                                    strokeWidth: 2.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                    lineNumber: 807,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Upload Syllabus"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 807,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 781,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            color: C.muted,
                                                            margin: "7px 0 0",
                                                            textAlign: "center"
                                                        },
                                                        children: "Accepts PDF files"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 771,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    overflowY: "auto",
                                                    padding: "12px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 8
                                                        },
                                                        children: docs.map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    padding: "10px 12px",
                                                                    background: C.offWhite,
                                                                    border: `1px solid ${C.border}`,
                                                                    borderRadius: 10
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            gap: 8,
                                                                            overflow: "hidden"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                size: 16,
                                                                                color: C.indigo,
                                                                                style: {
                                                                                    flexShrink: 0
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                                lineNumber: 820,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    fontWeight: 600,
                                                                                    color: C.navy,
                                                                                    overflow: "hidden",
                                                                                    textOverflow: "ellipsis",
                                                                                    whiteSpace: "nowrap"
                                                                                },
                                                                                children: doc.filename
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                                lineNumber: 821,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 819,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleDeleteDoc(doc.id),
                                                                        style: {
                                                                            background: "transparent",
                                                                            border: "none",
                                                                            cursor: "pointer",
                                                                            padding: 2,
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            flexShrink: 0
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            size: 14,
                                                                            color: C.muted
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                            lineNumber: 829,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 824,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, doc.id, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 818,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: 16,
                                                            background: C.indigoLight,
                                                            border: `1.5px solid ${C.indigoBorder}`,
                                                            borderRadius: 14,
                                                            padding: "12px 14px"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                gap: 8,
                                                                alignItems: "flex-start"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        width: 28,
                                                                        height: 28,
                                                                        borderRadius: 8,
                                                                        background: C.indigoMid,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        flexShrink: 0
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        size: 13,
                                                                        color: C.indigo,
                                                                        fill: C.indigo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 838,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                    lineNumber: 837,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontFamily: "Manrope, sans-serif",
                                                                                fontSize: 12,
                                                                                fontWeight: 800,
                                                                                color: C.indigo,
                                                                                margin: 0
                                                                            },
                                                                            children: "Transparency Feature"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                            lineNumber: 841,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            style: {
                                                                                fontFamily: "Manrope, sans-serif",
                                                                                fontSize: 11,
                                                                                fontWeight: 500,
                                                                                color: C.indigo,
                                                                                margin: "3px 0 0",
                                                                                lineHeight: 1.55,
                                                                                opacity: 0.8
                                                                            },
                                                                            children: "Every AI-generated question is traced to a specific page and section from your uploaded documents."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                            lineNumber: 842,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                    lineNumber: 840,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 836,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 835,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 815,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: "12px",
                                                    borderTop: `1.5px solid ${C.border}`
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeneratePanel, {
                                                    docs: docs,
                                                    onGenerate: handleGenerate,
                                                    generating: generating
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                    lineNumber: 851,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 850,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 770,
                                        columnNumber: 13
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
                                                    padding: "12px 20px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    gap: 12,
                                                    flexShrink: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 6
                                                        },
                                                        children: [
                                                            "all",
                                                            "pending",
                                                            "approved",
                                                            "rejected"
                                                        ].map((f)=>{
                                                            const labels = {
                                                                all: "All",
                                                                pending: "Pending",
                                                                approved: "Approved",
                                                                rejected: "Rejected"
                                                            };
                                                            const colors = {
                                                                all: {
                                                                    bg: statusFilter === "all" ? C.navy : C.inputBg,
                                                                    text: statusFilter === "all" ? "#fff" : C.muted
                                                                },
                                                                pending: {
                                                                    bg: statusFilter === "pending" ? C.yellowLight : C.inputBg,
                                                                    text: statusFilter === "pending" ? "#9A6C00" : C.muted
                                                                },
                                                                approved: {
                                                                    bg: statusFilter === "approved" ? C.greenLight : C.inputBg,
                                                                    text: statusFilter === "approved" ? "#18A058" : C.muted
                                                                },
                                                                rejected: {
                                                                    bg: statusFilter === "rejected" ? C.redLight : C.inputBg,
                                                                    text: statusFilter === "rejected" ? C.red : C.muted
                                                                }
                                                            };
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setStatusFilter(f),
                                                                style: {
                                                                    background: colors[f].bg,
                                                                    border: `1.5px solid ${statusFilter === f ? "transparent" : C.border}`,
                                                                    borderRadius: 20,
                                                                    padding: "5px 13px",
                                                                    fontFamily: "Manrope, sans-serif",
                                                                    fontSize: 12,
                                                                    fontWeight: 700,
                                                                    color: colors[f].text,
                                                                    cursor: "pointer",
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 5
                                                                },
                                                                children: [
                                                                    labels[f],
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            background: "rgba(0,0,0,0.08)",
                                                                            borderRadius: 20,
                                                                            padding: "0px 6px",
                                                                            fontSize: 10
                                                                        },
                                                                        children: counts[f]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 869,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, f, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 867,
                                                                columnNumber: 23
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: 7,
                                                            flexWrap: "wrap"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleBulkStatusChange("approved"),
                                                                disabled: counts.pending === 0,
                                                                style: {
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
                                                                    opacity: counts.pending === 0 ? 0.5 : 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 13,
                                                                        strokeWidth: 2.5
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 899,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    "Approve All Pending (",
                                                                    counts.pending,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 879,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleBulkStatusChange("rejected"),
                                                                disabled: counts.pending === 0,
                                                                style: {
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
                                                                    opacity: counts.pending === 0 ? 0.5 : 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        size: 13,
                                                                        strokeWidth: 2.5
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 923,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    "Reject All Pending (",
                                                                    counts.pending,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleDeleteAllRejected,
                                                                disabled: counts.rejected === 0,
                                                                style: {
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
                                                                    opacity: counts.rejected === 0 ? 0.5 : 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        size: 13,
                                                                        strokeWidth: 2.5
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                        lineNumber: 948,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    "Clear Rejected (",
                                                                    counts.rejected,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                                lineNumber: 928,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                        lineNumber: 878,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 856,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    overflowY: "auto",
                                                    padding: "18px 20px"
                                                },
                                                children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        padding: "80px 24px",
                                                        textAlign: "center"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            size: 40,
                                                            color: C.muted,
                                                            strokeWidth: 1.5
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 957,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 15,
                                                                fontWeight: 700,
                                                                color: C.navy,
                                                                margin: 0
                                                            },
                                                            children: "No questions here yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 958,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 13,
                                                                color: C.muted,
                                                                margin: 0,
                                                                maxWidth: 320
                                                            },
                                                            children: 'Upload a syllabus document and click "Generate Questions" to get started.'
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 959,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                    lineNumber: 956,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 14
                                                    },
                                                    children: filtered.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionCard, {
                                                            q: q,
                                                            onStatusChange: (id, s)=>handleStatusChange(id, s),
                                                            onEdit: handleEditQuestion,
                                                            onFlag: (id, reason)=>setQuestions((qs)=>qs.map((x)=>x.id === id ? {
                                                                            ...x,
                                                                            flagged: true,
                                                                            flagReason: reason
                                                                        } : x))
                                                        }, q.id, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                            lineNumber: 966,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                                lineNumber: 954,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                        lineNumber: 855,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                                lineNumber: 769,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                        lineNumber: 740,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
                lineNumber: 737,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/AIQuestionGenerator.tsx",
        lineNumber: 732,
        columnNumber: 5
    }, this);
}
_s3(AIQuestionGenerator, "n7296Q8v/Mg9/Hw/2I0fzmWwQLk=");
_c5 = AIQuestionGenerator;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "CitationPanel");
__turbopack_context__.k.register(_c2, "QuestionCard");
__turbopack_context__.k.register(_c3, "ActionBtn");
__turbopack_context__.k.register(_c4, "GeneratePanel");
__turbopack_context__.k.register(_c5, "AIQuestionGenerator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=1b0n_frontend_src_components_profonly_AIQuestionGenerator_tsx_1ing0ah._.js.map