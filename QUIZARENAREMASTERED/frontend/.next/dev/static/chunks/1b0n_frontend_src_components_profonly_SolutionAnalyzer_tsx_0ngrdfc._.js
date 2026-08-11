(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SolutionAnalyzer",
    ()=>SolutionAnalyzer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/components/shared/ProfSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
;
// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
    indigo: "#5B3DF6",
    indigoDeep: "#4228D4",
    indigoLight: "rgba(91,61,246,0.08)",
    indigoBorder: "rgba(91,61,246,0.2)",
    coral: "#FF6B4A",
    coralDeep: "#D44A2A",
    coralLight: "rgba(255,107,74,0.09)",
    coralBorder: "rgba(255,107,74,0.22)",
    yellow: "#FFC93C",
    yellowLight: "rgba(255,201,60,0.1)",
    green: "#2ED47A",
    greenLight: "rgba(46,212,122,0.1)",
    greenBorder: "rgba(46,212,122,0.25)",
    red: "#FF4757",
    redLight: "rgba(255,71,87,0.09)",
    redBorder: "rgba(255,71,87,0.22)",
    navy: "#1B1E2B",
    white: "#FFFFFF",
    bg: "#F7F8FC",
    surface: "#FFFFFF",
    border: "#E8EAF0",
    borderStrong: "#D0D4E0",
    text: "#1B1E2B",
    textMid: "#4A4E6A",
    textMuted: "#8A8EA8",
    sidebar: "#1B1E2B"
};
// ── Sidebar nav (shared) ───────────────────────────────────────────────────────
const NAV = [
    {
        icon: "📋",
        label: "My Sections"
    },
    {
        icon: "❓",
        label: "Question Bank"
    },
    {
        icon: "✨",
        label: "AI Generator"
    },
    {
        icon: "⚔️",
        label: "Matchmaking"
    },
    {
        icon: "🔬",
        label: "Solution Analyzer",
        active: true
    },
    {
        icon: "📊",
        label: "Analytics"
    },
    {
        icon: "⚙️",
        label: "Settings"
    }
];
function Sidebar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfSidebar"], {}, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 46,
        columnNumber: 29
    }, this);
    //TURBOPACK unreachable
    ;
}
_c = Sidebar;
// ── Misconception category chips ──────────────────────────────────────────────
const MISCONCEPTION_TYPES = [
    {
        label: "Sign Error",
        bg: "#FFF0F0",
        color: "#D64242",
        border: "#FFD0D0"
    },
    {
        label: "Off-by-One",
        bg: "#FFF5E8",
        color: "#C47A00",
        border: "#FFE0A0"
    },
    {
        label: "Syntax Error",
        bg: "#F0F0FF",
        color: "#5044CC",
        border: "#C8C4FF"
    },
    {
        label: "Logical Error",
        bg: "#F0FBF4",
        color: "#1A8C4E",
        border: "#A8E8C0"
    },
    {
        label: "Computational Mistake",
        bg: "#FFF0FA",
        color: "#A0359A",
        border: "#F0B0E8"
    },
    {
        label: "Conceptual Gap",
        bg: "#F0F8FF",
        color: "#1A72A8",
        border: "#A8D4F0"
    }
];
function MisconceptionBadge({ type, size = "md" }) {
    const t = MISCONCEPTION_TYPES.find((x)=>x.label === type) ?? MISCONCEPTION_TYPES[0];
    const pad = size === "sm" ? "2px 8px" : "4px 11px";
    const fs = size === "sm" ? 10 : 12;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            background: t.bg,
            color: t.color,
            border: `1.5px solid ${t.border}`,
            borderRadius: 20,
            padding: pad,
            fontFamily: "Manrope, sans-serif",
            fontSize: fs,
            fontWeight: 700,
            whiteSpace: "nowrap",
            flexShrink: 0
        },
        children: type
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c1 = MisconceptionBadge;
// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.surface,
            border: `1.5px solid ${C.border}`,
            borderRadius: 14,
            padding: "14px 18px",
            flex: 1,
            minWidth: 130,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.textMuted,
                    margin: "0 0 5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color,
                    margin: "0 0 2px",
                    lineHeight: 1
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 11,
                    color: C.textMuted,
                    margin: 0
                },
                children: sub
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 126,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_c2 = StatCard;
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
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("code");
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MOCK_CODE);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pending");
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function handleAnalyze() {
        setStatus("uploading");
        setTimeout(()=>setStatus("analyzed"), 2400);
    }
    const statusConfig = {
        idle: {
            label: "No File",
            bg: "#F5F5F5",
            color: C.textMuted,
            border: "#E0E0E0"
        },
        uploading: {
            label: "Analyzing…",
            bg: C.yellowLight,
            color: "#A07000",
            border: "rgba(255,201,60,0.3)"
        },
        pending: {
            label: "Pending",
            bg: C.yellowLight,
            color: "#A07000",
            border: "rgba(255,201,60,0.3)"
        },
        analyzed: {
            label: "Analyzed",
            bg: C.greenLight,
            color: C.greenDeep ?? C.green,
            border: C.greenBorder
        }
    };
    const sc = statusConfig[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: 20,
            flex: 1,
            minHeight: 0,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    overflow: "auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "16px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 13,
                                    fontWeight: 800,
                                    color: C.text,
                                    margin: "0 0 12px"
                                },
                                children: "Submission Type"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10
                                },
                                children: [
                                    [
                                        "image",
                                        "📷",
                                        "Handwritten / Image"
                                    ],
                                    [
                                        "code",
                                        "💻",
                                        "Code / Text"
                                    ]
                                ].map(([v, icon, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setMode(v),
                                        style: {
                                            flex: 1,
                                            padding: "11px 16px",
                                            borderRadius: 12,
                                            cursor: "pointer",
                                            background: mode === v ? C.indigoLight : C.bg,
                                            border: `2px solid ${mode === v ? C.indigo : C.border}`,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            transition: "all 0.15s"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 18
                                                },
                                                children: icon
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 186,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: mode === v ? C.indigo : C.textMid
                                                },
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, v, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    mode === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onDragOver: (e)=>{
                            e.preventDefault();
                            setDragging(true);
                        },
                        onDragLeave: ()=>setDragging(false),
                        onDrop: (e)=>{
                            e.preventDefault();
                            setDragging(false);
                            setStatus("pending");
                        },
                        onClick: ()=>fileRef.current?.click(),
                        style: {
                            background: dragging ? C.indigoLight : C.surface,
                            border: `2px dashed ${dragging ? C.indigo : C.borderStrong}`,
                            borderRadius: 16,
                            padding: "48px 28px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 12,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileRef,
                                type: "file",
                                accept: "image/*",
                                style: {
                                    display: "none"
                                },
                                onChange: ()=>setStatus("pending")
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 56,
                                    height: 56,
                                    borderRadius: 16,
                                    background: C.indigoLight,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                    size: 26,
                                    color: C.indigo,
                                    strokeWidth: 1.8
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 15,
                                            fontWeight: 800,
                                            color: C.text,
                                            margin: "0 0 4px"
                                        },
                                        children: dragging ? "Drop to upload" : "Drop image here, or click to browse"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            color: C.textMuted,
                                            margin: 0
                                        },
                                        children: "PNG, JPG, PDF — max 10 MB. Supports handwritten math & diagrams."
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8,
                                    marginTop: 4
                                },
                                children: [
                                    "Math Equations",
                                    "Flowcharts",
                                    "Code Snippets",
                                    "Diagrams"
                                ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.bg,
                                            border: `1px solid ${C.border}`,
                                            borderRadius: 20,
                                            padding: "3px 10px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: C.textMuted
                                        },
                                        children: t
                                    }, t, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 280
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "10px 16px",
                                    background: "#1E2130",
                                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                                                size: 14,
                                                color: "rgba(255,255,255,0.4)",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "rgba(255,255,255,0.5)"
                                                },
                                                children: "student_submission.py"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 6
                                        },
                                        children: [
                                            "Python",
                                            "JavaScript",
                                            "Java",
                                            "C++",
                                            "Math"
                                        ].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    padding: "2px 8px",
                                                    borderRadius: 6,
                                                    background: lang === "Python" ? "rgba(91,61,246,0.35)" : "rgba(255,255,255,0.06)",
                                                    border: `1px solid ${lang === "Python" ? "rgba(91,61,246,0.5)" : "transparent"}`,
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    color: lang === "Python" ? "#A08FFF" : "rgba(255,255,255,0.4)",
                                                    cursor: "pointer"
                                                },
                                                children: lang
                                            }, lang, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 246,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 236,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: code,
                                onChange: (e)=>setCode(e.target.value),
                                spellCheck: false,
                                style: {
                                    flex: 1,
                                    padding: "16px 20px",
                                    background: "#1A1D2E",
                                    border: "none",
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    color: "#C8D3F5",
                                    resize: "none",
                                    outline: "none",
                                    minHeight: 220
                                }
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleAnalyze,
                        disabled: status === "uploading",
                        style: {
                            background: status === "uploading" ? "rgba(91,61,246,0.5)" : `linear-gradient(135deg,${C.indigo},${C.indigoDeep})`,
                            border: "none",
                            borderRadius: 14,
                            padding: "14px 28px",
                            fontFamily: "Fredoka, sans-serif",
                            fontSize: 19,
                            fontWeight: 700,
                            color: "#fff",
                            cursor: status === "uploading" ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            boxShadow: status !== "uploading" ? "0 4px 16px rgba(91,61,246,0.35)" : "none",
                            transition: "all 0.15s"
                        },
                        children: status === "uploading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 18,
                                    strokeWidth: 2.5,
                                    style: {
                                        animation: "spin 1s linear infinite"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 276,
                                    columnNumber: 17
                                }, this),
                                " Analyzing…"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                            lineNumber: 276,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 18,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 278,
                                    columnNumber: 17
                                }, this),
                                " Analyze Submission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                            lineNumber: 278,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 280,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "16px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.textMuted,
                                    margin: "0 0 10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em"
                                },
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: sc.bg,
                                            color: sc.color,
                                            border: `1.5px solid ${sc.border}`,
                                            borderRadius: 20,
                                            padding: "5px 14px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 13,
                                            fontWeight: 700
                                        },
                                        children: sc.label
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    status === "analyzed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 18,
                                        color: C.green,
                                        strokeWidth: 2.5
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 296,
                                        columnNumber: 37
                                    }, this),
                                    status === "uploading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 18,
                                        color: C.yellow,
                                        style: {
                                            animation: "spin 1s linear infinite"
                                        },
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 297,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            status === "analyzed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6
                                },
                                children: [
                                    [
                                        "Questions graded",
                                        "1"
                                    ],
                                    [
                                        "Steps analyzed",
                                        "6"
                                    ],
                                    [
                                        "Errors found",
                                        "2"
                                    ],
                                    [
                                        "Confidence",
                                        "94%"
                                    ]
                                ].map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "5px 0",
                                            borderBottom: `1px solid ${C.border}`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    color: C.textMuted
                                                },
                                                children: k
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: C.text
                                                },
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "16px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.textMuted,
                                    margin: "0 0 10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em"
                                },
                                children: "Preview"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#1A1D2E",
                                    borderRadius: 12,
                                    padding: "14px",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    fontSize: 11,
                                    lineHeight: 1.7,
                                    fontFamily: "'Courier New', monospace"
                                },
                                children: [
                                    MOCK_CODE.split("\n").slice(0, 6).map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "rgba(255,255,255,0.2)",
                                                        minWidth: 16,
                                                        textAlign: "right",
                                                        userSelect: "none"
                                                    },
                                                    children: i + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: i === 1 || i === 6 ? "#FF6B8A" : "#C8D3F5",
                                                        background: i === 1 || i === 6 ? "rgba(255,71,87,0.08)" : "transparent",
                                                        borderRadius: 3,
                                                        paddingInline: 2
                                                    },
                                                    children: line
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "rgba(255,255,255,0.2)",
                                            marginTop: 4
                                        },
                                        children: "···"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 335,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 10,
                                    display: "flex",
                                    gap: 8,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.indigoLight,
                                            color: C.indigo,
                                            border: `1px solid ${C.indigoBorder}`,
                                            borderRadius: 20,
                                            padding: "2px 9px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 10,
                                            fontWeight: 700
                                        },
                                        children: "Python"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.bg,
                                            color: C.textMuted,
                                            border: `1px solid ${C.border}`,
                                            borderRadius: 20,
                                            padding: "2px 9px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 10,
                                            fontWeight: 600
                                        },
                                        children: "14 lines"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.redLight,
                                            color: C.red,
                                            border: `1px solid ${C.redBorder}`,
                                            borderRadius: 20,
                                            padding: "2px 9px",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 10,
                                            fontWeight: 700
                                        },
                                        children: "2 errors"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 344,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "14px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        background: "#5B3DF6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "Manrope, sans-serif",
                                        fontSize: 12,
                                        fontWeight: 800,
                                        color: "#fff"
                                    },
                                    children: "AC"
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 13,
                                                fontWeight: 700,
                                                color: C.text,
                                                margin: 0
                                            },
                                            children: "Ana Cruz"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 360,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 11,
                                                color: C.textMuted,
                                                margin: 0
                                            },
                                            children: "CS201-A · Q3 · Binary Search"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 362,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                            lineNumber: 353,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(SubmissionTab, "HF9JDlV18cCdaFXa6ia6vp57hl0=");
_c3 = SubmissionTab;
const STEPS = [
    {
        num: 1,
        label: "Function definition & parameters",
        code: "def binary_search(arr, target):",
        status: "correct"
    },
    {
        num: 2,
        label: "Pointer initialization",
        code: "left, right = 0, len(arr)",
        status: "incorrect",
        feedback: "right should be initialized to len(arr) - 1. Using len(arr) as the upper bound causes an index-out-of-range error when arr[mid] is accessed with mid = (0 + len(arr)) // 2.",
        errLine: 0
    },
    {
        num: 3,
        label: "While loop condition",
        code: "while left <= right:",
        status: "correct"
    },
    {
        num: 4,
        label: "Midpoint calculation",
        code: "mid = (left + right) // 2",
        status: "correct"
    },
    {
        num: 5,
        label: "Comparison & pointer update",
        code: "elif arr[mid] < target:\n    left = mid + 1\nelse:\n    right = mid - 1",
        status: "warning",
        feedback: "The right = mid - 1 update is correct here, but because of the initialization error in Step 2, the search range is off by one, causing incorrect results on edge-case inputs.",
        errLine: 3
    },
    {
        num: 6,
        label: "Return statement",
        code: "return -1",
        status: "correct"
    }
];
const GRADE_CONFIG = {
    grade: "C+",
    score: 68,
    color: C.yellow,
    bg: C.yellowLight,
    border: "rgba(255,201,60,0.35)"
};
function GradingTab() {
    _s1();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        2,
        5
    ]);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const toggle = (n)=>setExpanded((e)=>e.includes(n) ? e.filter((x)=>x !== n) : [
                ...e,
                n
            ]);
    const statusIcon = (s)=>{
        if (s === "correct") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            size: 18,
            color: C.green,
            strokeWidth: 2.5
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 413,
            columnNumber: 33
        }, this);
        if (s === "incorrect") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
            size: 18,
            color: C.red,
            strokeWidth: 2.5
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 414,
            columnNumber: 33
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            size: 18,
            color: C.yellow,
            strokeWidth: 2.5
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 415,
            columnNumber: 33
        }, this);
    };
    const statusBg = (s)=>s === "correct" ? C.greenLight : s === "incorrect" ? C.redLight : C.yellowLight;
    const statusBorder = (s)=>s === "correct" ? C.greenBorder : s === "incorrect" ? C.redBorder : "rgba(255,201,60,0.3)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: 20,
            flex: 1,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "14px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: C.textMuted,
                                            margin: "0 0 3px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em"
                                        },
                                        children: "Step-by-Step Review"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: C.text,
                                            margin: 0
                                        },
                                        children: "Binary Search · Ana Cruz · CS201-A"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center"
                                },
                                children: [
                                    [
                                        "correct",
                                        C.green,
                                        "2 Correct"
                                    ],
                                    [
                                        "incorrect",
                                        C.red,
                                        "1 Error"
                                    ],
                                    [
                                        "warning",
                                        C.yellow,
                                        "1 Warning"
                                    ]
                                ].map(([s, c, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5
                                        },
                                        children: [
                                            statusIcon(s),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: c
                                                },
                                                children: l
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 442,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 440,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this),
                    STEPS.map((step)=>{
                        const isOpen = expanded.includes(step.num);
                        const hasDetail = !!step.feedback;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: C.surface,
                                border: `1.5px solid ${hasDetail ? statusBorder(step.status) : C.border}`,
                                borderRadius: 16,
                                overflow: "hidden",
                                boxShadow: hasDetail ? `0 2px 12px ${statusBg(step.status)}` : "0 2px 8px rgba(0,0,0,0.03)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>hasDetail && toggle(step.num),
                                    style: {
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 12,
                                        padding: "14px 18px",
                                        cursor: hasDetail ? "pointer" : "default",
                                        background: isOpen ? statusBg(step.status) : "transparent",
                                        transition: "background 0.15s"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 28,
                                                height: 28,
                                                borderRadius: 8,
                                                background: C.bg,
                                                border: `1.5px solid ${C.border}`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                fontFamily: "Fredoka, sans-serif",
                                                fontSize: 15,
                                                fontWeight: 700,
                                                color: C.textMid,
                                                marginTop: 1
                                            },
                                            children: step.num
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 465,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flexShrink: 0,
                                                marginTop: 3
                                            },
                                            children: statusIcon(step.status)
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 473,
                                            columnNumber: 17
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
                                                        fontSize: 14,
                                                        fontWeight: 700,
                                                        color: C.text,
                                                        margin: "0 0 5px"
                                                    },
                                                    children: step.label
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: "#1A1D2E",
                                                        borderRadius: 8,
                                                        padding: "7px 12px",
                                                        fontFamily: "'Courier New', monospace",
                                                        fontSize: 12,
                                                        color: "#C8D3F5",
                                                        lineHeight: 1.6,
                                                        display: "flex",
                                                        flexDirection: "column"
                                                    },
                                                    children: step.code.split("\n").map((ln, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                background: i === (step.errLine ?? -1) ? "rgba(255,71,87,0.18)" : "transparent",
                                                                borderRadius: 4,
                                                                paddingInline: 2,
                                                                color: i === (step.errLine ?? -1) ? "#FF8090" : "#C8D3F5"
                                                            },
                                                            children: ln
                                                        }, i, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 475,
                                            columnNumber: 17
                                        }, this),
                                        hasDetail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flexShrink: 0,
                                                marginTop: 3,
                                                color: C.textMuted
                                            },
                                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 16,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 493,
                                                columnNumber: 31
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                size: 16,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 494,
                                                columnNumber: 32
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 492,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 459,
                                    columnNumber: 15
                                }, this),
                                isOpen && step.feedback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: "0 18px 16px 18px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 10,
                                            background: statusBg(step.status),
                                            border: `1.5px solid ${statusBorder(step.status)}`,
                                            borderRadius: 12,
                                            padding: "12px 14px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                size: 15,
                                                strokeWidth: 2,
                                                color: step.status === "incorrect" ? C.red : C.yellow,
                                                style: {
                                                    flexShrink: 0,
                                                    marginTop: 2
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 505,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 800,
                                                            color: step.status === "incorrect" ? C.red : C.yellow,
                                                            margin: "0 0 4px"
                                                        },
                                                        children: step.status === "incorrect" ? "Error Detected" : "Warning"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 13,
                                                            fontWeight: 500,
                                                            color: C.textMid,
                                                            margin: 0,
                                                            lineHeight: 1.65
                                                        },
                                                        children: step.feedback
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 507,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 502,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 501,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, step.num, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    overflowY: "auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `2px solid ${GRADE_CONFIG.border}`,
                            borderRadius: 18,
                            padding: "18px 20px",
                            background: GRADE_CONFIG.bg,
                            boxShadow: `0 4px 16px ${GRADE_CONFIG.bg}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: C.textMuted,
                                    margin: "0 0 8px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em"
                                },
                                children: "Overall Grade"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: 10
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Fredoka, sans-serif",
                                            fontSize: 52,
                                            fontWeight: 700,
                                            color: GRADE_CONFIG.color,
                                            lineHeight: 1
                                        },
                                        children: GRADE_CONFIG.grade
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 536,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Fredoka, sans-serif",
                                            fontSize: 28,
                                            fontWeight: 700,
                                            color: "rgba(0,0,0,0.3)"
                                        },
                                        children: [
                                            GRADE_CONFIG.score,
                                            "/100"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 538,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4
                                },
                                children: [
                                    [
                                        "Logic & Approach",
                                        "80%",
                                        C.green
                                    ],
                                    [
                                        "Correctness",
                                        "55%",
                                        C.red
                                    ],
                                    [
                                        "Code Quality",
                                        "70%",
                                        C.yellow
                                    ]
                                ].map(([label, pct, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: 3
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            color: C.textMid,
                                                            fontWeight: 600
                                                        },
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: color
                                                        },
                                                        children: pct
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 546,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 5,
                                                    background: "rgba(0,0,0,0.08)",
                                                    borderRadius: 50
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: "100%",
                                                        width: pct,
                                                        background: color,
                                                        borderRadius: 50,
                                                        transition: "width 0.6s ease-out"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 552,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 545,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 528,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "10px 14px",
                                    borderBottom: `1px solid ${C.border}`,
                                    background: C.bg
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: C.text
                                        },
                                        children: "Annotated View"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 566,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setZoom((z)=>Math.max(0.75, z - 0.1)),
                                                style: {
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: 6,
                                                    border: `1px solid ${C.border}`,
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: C.textMuted
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                                    size: 12,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    color: C.textMuted,
                                                    lineHeight: "26px"
                                                },
                                                children: [
                                                    Math.round(zoom * 100),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 575,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setZoom((z)=>Math.min(1.5, z + 0.1)),
                                                style: {
                                                    width: 26,
                                                    height: 26,
                                                    borderRadius: 6,
                                                    border: `1px solid ${C.border}`,
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: C.textMuted
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                                    size: 12,
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 577,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 568,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 564,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "12px",
                                    background: "#1A1D2E",
                                    overflow: "auto",
                                    transformOrigin: "top left"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        transform: `scale(${zoom})`,
                                        transformOrigin: "top left",
                                        transition: "transform 0.15s"
                                    },
                                    children: MOCK_CODE.split("\n").map((line, i)=>{
                                        const isErr = i === 1 || i === 7;
                                        const isWarn = i === 7;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: 8,
                                                position: "relative",
                                                background: isErr ? "rgba(255,71,87,0.1)" : "transparent",
                                                borderLeft: isErr ? `3px solid ${isWarn ? C.yellow : C.red}` : "3px solid transparent",
                                                paddingLeft: 4,
                                                marginLeft: -4
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "rgba(255,255,255,0.2)",
                                                        minWidth: 18,
                                                        fontFamily: "'Courier New', monospace",
                                                        fontSize: 12,
                                                        userSelect: "none",
                                                        flexShrink: 0
                                                    },
                                                    children: i + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Courier New', monospace",
                                                        fontSize: 12,
                                                        color: isErr ? isWarn ? "#FFD080" : "#FF8090" : "#C8D3F5",
                                                        lineHeight: 1.7,
                                                        flex: 1
                                                    },
                                                    children: line || " "
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 600,
                                                    columnNumber: 21
                                                }, this),
                                                isErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        position: "absolute",
                                                        right: -4,
                                                        top: 2,
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: "50%",
                                                        background: isWarn ? C.yellow : C.red,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "#fff",
                                                            fontSize: 9,
                                                            fontWeight: 800
                                                        },
                                                        children: "!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 593,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 587,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 585,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "10px 14px",
                                    borderTop: `1px solid ${C.border}`,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 5
                                },
                                children: [
                                    {
                                        color: C.red,
                                        label: "Line 2 — Index out of bounds (right = len(arr))"
                                    },
                                    {
                                        color: C.yellow,
                                        label: "Line 8 — Edge case failure due to Step 2 error"
                                    }
                                ].map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 7
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: e.color,
                                                    marginTop: 4,
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 622,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    color: C.textMid,
                                                    lineHeight: 1.5
                                                },
                                                children: e.label
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, e.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 621,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 423,
        columnNumber: 5
    }, this);
}
_s1(GradingTab, "bKHkh4xIWXQJmrkxEZTAjH4NXaI=");
_c4 = GradingTab;
const MISCONCEPTION_ROWS = [
    {
        id: 1,
        student: "Ana Cruz",
        initials: "AC",
        color: "#5B3DF6",
        question: "Q3 Binary Search",
        type: "Off-by-One",
        quiz: "Quiz 4",
        topic: "Searching",
        date: "Jul 24"
    },
    {
        id: 2,
        student: "Carlos Bato",
        initials: "CB",
        color: "#FF6B4A",
        question: "Q1 Loop Condition",
        type: "Logical Error",
        quiz: "Quiz 4",
        topic: "Loops",
        date: "Jul 24"
    },
    {
        id: 3,
        student: "Maria Santos",
        initials: "MS",
        color: "#2ED47A",
        question: "Q5 Recursion Base",
        type: "Off-by-One",
        quiz: "Quiz 4",
        topic: "Recursion",
        date: "Jul 24"
    },
    {
        id: 4,
        student: "Juan Dela T.",
        initials: "JD",
        color: "#FFC93C",
        question: "Q2 Pointer Init",
        type: "Sign Error",
        quiz: "Quiz 4",
        topic: "Searching",
        date: "Jul 24"
    },
    {
        id: 5,
        student: "Bea Reyes",
        initials: "BR",
        color: "#B06EF6",
        question: "Q4 Merge Sort",
        type: "Computational Mistake",
        quiz: "Quiz 3",
        topic: "Sorting",
        date: "Jul 20"
    },
    {
        id: 6,
        student: "Leo Tan",
        initials: "LT",
        color: "#5BC8F6",
        question: "Q1 Array Access",
        type: "Off-by-One",
        quiz: "Quiz 3",
        topic: "Arrays",
        date: "Jul 20"
    },
    {
        id: 7,
        student: "Ana Cruz",
        initials: "AC",
        color: "#5B3DF6",
        question: "Q2 Factorial",
        type: "Logical Error",
        quiz: "Quiz 3",
        topic: "Recursion",
        date: "Jul 20"
    },
    {
        id: 8,
        student: "Maria Santos",
        initials: "MS",
        color: "#2ED47A",
        question: "Q3 Stack Push",
        type: "Syntax Error",
        quiz: "Quiz 3",
        topic: "Stacks",
        date: "Jul 20"
    },
    {
        id: 9,
        student: "Carlos Bato",
        initials: "CB",
        color: "#FF6B4A",
        question: "Q5 Bubble Sort",
        type: "Computational Mistake",
        quiz: "Quiz 2",
        topic: "Sorting",
        date: "Jul 15"
    },
    {
        id: 10,
        student: "Juan Dela T.",
        initials: "JD",
        color: "#FFC93C",
        question: "Q4 Queue Dequeue",
        type: "Conceptual Gap",
        quiz: "Quiz 2",
        topic: "Queues",
        date: "Jul 15"
    }
];
const CHART_DATA = [
    {
        name: "Off-by-One",
        count: 14,
        color: "#C47A00"
    },
    {
        name: "Logical Error",
        count: 11,
        color: "#1A8C4E"
    },
    {
        name: "Sign Error",
        count: 8,
        color: "#D64242"
    },
    {
        name: "Syntax Error",
        count: 7,
        color: "#5044CC"
    },
    {
        name: "Comp. Mistake",
        count: 6,
        color: "#A0359A"
    },
    {
        name: "Conceptual Gap",
        count: 4,
        color: "#1A72A8"
    }
];
const FILTER_CLASSES = [
    "All Classes",
    "CS201-A",
    "CS201-B",
    "CS301-A"
];
const FILTER_TOPICS = [
    "All Topics",
    "Searching",
    "Sorting",
    "Recursion",
    "Arrays",
    "Loops"
];
const FILTER_QUIZZES = [
    "All Quizzes",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4"
];
const FILTER_TYPES = [
    "All Types",
    "Off-by-One",
    "Logical Error",
    "Sign Error",
    "Syntax Error",
    "Computational Mistake",
    "Conceptual Gap"
];
function CustomBarTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.surface,
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            padding: "8px 12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.text,
                    margin: "0 0 2px"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 673,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "Fredoka, sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.indigo,
                    margin: 0
                },
                children: [
                    payload[0].value,
                    " instances"
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 675,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 671,
        columnNumber: 5
    }, this);
}
_c5 = CustomBarTooltip;
function MisconceptionTab() {
    _s2();
    const [classFilter, setClassFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Classes");
    const [topicFilter, setTopicFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Topics");
    const [quizFilter, setQuizFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Quizzes");
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Types");
    const [exportHover, setExportHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filtered = MISCONCEPTION_ROWS.filter((r)=>(quizFilter === "All Quizzes" || r.quiz === quizFilter) && (topicFilter === "All Topics" || r.topic === topicFilter) && (typeFilter === "All Types" || r.type === typeFilter));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: 20,
            flex: 1,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    overflowY: "auto",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "16px 18px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: C.textMuted,
                                    margin: "0 0 10px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em"
                                },
                                children: "Student Answer"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 702,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 9,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 34,
                                            height: 34,
                                            borderRadius: "50%",
                                            background: "#5B3DF6",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: "#fff"
                                        },
                                        children: "AC"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 706,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: C.text,
                                                    margin: 0
                                                },
                                                children: "Ana Cruz"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 710,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 11,
                                                    color: C.textMuted,
                                                    margin: 0
                                                },
                                                children: "Q3 Binary Search · Quiz 4"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 712,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 709,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 705,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "#1A1D2E",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: 12,
                                    lineHeight: 1.7
                                },
                                children: [
                                    MOCK_CODE.split("\n").slice(0, 4).map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: i === 1 ? "rgba(255,71,87,0.12)" : "transparent",
                                                borderRadius: 3,
                                                paddingInline: 2,
                                                color: i === 1 ? "#FF8090" : "#C8D3F5"
                                            },
                                            children: l
                                        }, i, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 719,
                                            columnNumber: 15
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: "rgba(255,255,255,0.2)"
                                        },
                                        children: "···"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 724,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 716,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 700,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: `linear-gradient(145deg,rgba(91,61,246,0.07),rgba(91,61,246,0.02))`,
                            border: `2px solid ${C.indigoBorder}`,
                            borderRadius: 16,
                            padding: "16px 18px",
                            boxShadow: "0 4px 16px rgba(91,61,246,0.07)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                        size: 16,
                                        color: C.indigo,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 733,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 800,
                                            color: C.indigo,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em"
                                        },
                                        children: "AI Analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 734,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 732,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 6,
                                    marginBottom: 12
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MisconceptionBadge, {
                                        type: "Off-by-One"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MisconceptionBadge, {
                                        type: "Sign Error"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 739,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: C.textMid,
                                    margin: "0 0 12px",
                                    lineHeight: 1.7
                                },
                                children: [
                                    "The student initialized ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        style: {
                                            background: C.bg,
                                            borderRadius: 4,
                                            padding: "1px 5px",
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: 11
                                        },
                                        children: "right = len(arr)"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 745,
                                        columnNumber: 37
                                    }, this),
                                    " instead of ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        style: {
                                            background: C.bg,
                                            borderRadius: 4,
                                            padding: "1px 5px",
                                            fontFamily: "'Courier New', monospace",
                                            fontSize: 11
                                        },
                                        children: "len(arr) - 1"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 747,
                                        columnNumber: 50
                                    }, this),
                                    ", a classic off-by-one boundary error. This suggests the student understands the binary search concept but has an incomplete mental model of zero-indexed array bounds."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 743,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 800,
                                            color: C.text,
                                            margin: "0 0 4px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em"
                                        },
                                        children: "Suggested Remediation"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 754,
                                        columnNumber: 13
                                    }, this),
                                    [
                                        "Review 0-indexed array boundary rules",
                                        "Practice tracing invariants with dry-runs",
                                        "Assign off-by-one targeted exercises"
                                    ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 7
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 5,
                                                        height: 5,
                                                        borderRadius: "50%",
                                                        background: C.indigo,
                                                        marginTop: 5,
                                                        flexShrink: 0
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 761,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 12,
                                                        color: C.textMid,
                                                        lineHeight: 1.5
                                                    },
                                                    children: s
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 763,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, s, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 760,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 753,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 12,
                                    padding: "8px 12px",
                                    background: C.indigoLight,
                                    border: `1px solid ${C.indigoBorder}`,
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        size: 13,
                                        color: C.indigo,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 771,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: C.indigo
                                        },
                                        children: "Confidence: 94% · GPT-4o analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 772,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 768,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 729,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    overflowY: "auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                size: 14,
                                color: C.textMuted,
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 782,
                                columnNumber: 11
                            }, this),
                            [
                                [
                                    classFilter,
                                    setClassFilter,
                                    FILTER_CLASSES
                                ],
                                [
                                    topicFilter,
                                    setTopicFilter,
                                    FILTER_TOPICS
                                ],
                                [
                                    quizFilter,
                                    setQuizFilter,
                                    FILTER_QUIZZES
                                ],
                                [
                                    typeFilter,
                                    setTypeFilter,
                                    FILTER_TYPES
                                ]
                            ].map(([val, setter, options], fi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "relative"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: val,
                                            onChange: (e)=>setter(e.target.value),
                                            style: {
                                                appearance: "none",
                                                background: C.surface,
                                                border: `1.5px solid ${C.border}`,
                                                borderRadius: 20,
                                                padding: "6px 28px 6px 12px",
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: C.text,
                                                cursor: "pointer",
                                                outline: "none",
                                                boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                                            },
                                            children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: o,
                                                    children: o
                                                }, o, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 797,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 790,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            size: 12,
                                            color: C.textMuted,
                                            style: {
                                                position: "absolute",
                                                right: 9,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 800,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, fi, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 789,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onMouseEnter: ()=>setExportHover(true),
                                onMouseLeave: ()=>setExportHover(false),
                                style: {
                                    marginLeft: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 7,
                                    padding: "7px 16px",
                                    borderRadius: 20,
                                    cursor: "pointer",
                                    background: exportHover ? C.indigoLight : "transparent",
                                    border: `1.5px solid ${exportHover ? C.indigo : C.borderStrong}`,
                                    fontFamily: "Manrope, sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: exportHover ? C.indigo : C.textMid,
                                    transition: "all 0.15s"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 13,
                                        strokeWidth: 2.5
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 813,
                                        columnNumber: 13
                                    }, this),
                                    "Export Analytics"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 804,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            padding: "18px 20px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"], {
                                                size: 16,
                                                color: C.indigo,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 824,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 14,
                                                    fontWeight: 800,
                                                    color: C.text
                                                },
                                                children: "Common Misconceptions This Class"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 825,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 823,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: C.textMuted
                                        },
                                        children: "CS201-A · All Quizzes"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 828,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 821,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                width: "100%",
                                height: 190,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                                    data: CHART_DATA,
                                    layout: "vertical",
                                    margin: {
                                        top: 0,
                                        right: 40,
                                        bottom: 0,
                                        left: 20
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                            strokeDasharray: "3 3",
                                            horizontal: false,
                                            stroke: C.border
                                        }, "grid", false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 834,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                            type: "number",
                                            tick: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 11,
                                                fill: C.textMuted
                                            },
                                            axisLine: false,
                                            tickLine: false
                                        }, "x", false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 836,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                            dataKey: "name",
                                            type: "category",
                                            width: 110,
                                            tick: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 11,
                                                fill: C.textMid
                                            },
                                            axisLine: false,
                                            tickLine: false
                                        }, "y", false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 838,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomBarTooltip, {}, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 841,
                                                columnNumber: 47
                                            }, this)
                                        }, "tooltip", false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 841,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                            dataKey: "count",
                                            radius: [
                                                0,
                                                6,
                                                6,
                                                0
                                            ],
                                            barSize: 18,
                                            children: CHART_DATA.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                    fill: entry.color,
                                                    fillOpacity: 0.82
                                                }, `cell-${i}`, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 844,
                                                    columnNumber: 19
                                                }, this))
                                        }, "bar", false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 842,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, "misconception-bar", true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                    lineNumber: 832,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 831,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 819,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.surface,
                            border: `1.5px solid ${C.border}`,
                            borderRadius: 16,
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1.4fr 1fr 1fr 80px",
                                    gap: 0,
                                    padding: "11px 18px",
                                    background: C.bg,
                                    borderBottom: `1.5px solid ${C.border}`
                                },
                                children: [
                                    "Student",
                                    "Question",
                                    "Type",
                                    "Quiz",
                                    "Date"
                                ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope, sans-serif",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: C.textMuted,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            textAlign: i === 4 ? "center" : "left"
                                        },
                                        children: h
                                    }, h, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 859,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowY: "auto"
                                },
                                children: [
                                    filtered.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1.4fr 1fr 1fr 80px",
                                                gap: 0,
                                                padding: "11px 18px",
                                                alignItems: "center",
                                                borderBottom: idx < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                                                background: idx % 2 === 0 ? C.surface : C.bg,
                                                transition: "background 0.1s"
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.background = "#EFF1FC",
                                            onMouseLeave: (e)=>e.currentTarget.style.background = idx % 2 === 0 ? C.surface : C.bg,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 28,
                                                                height: 28,
                                                                borderRadius: "50%",
                                                                background: row.color,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 10,
                                                                fontWeight: 800,
                                                                color: "#fff",
                                                                flexShrink: 0
                                                            },
                                                            children: row.initials
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                            lineNumber: 879,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontFamily: "Manrope, sans-serif",
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: C.text,
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                whiteSpace: "nowrap"
                                                            },
                                                            children: row.student
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                            lineNumber: 883,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 878,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 12,
                                                        color: C.textMid,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: row.question
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 887,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MisconceptionBadge, {
                                                        type: row.type,
                                                        size: "sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 22
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 12,
                                                        color: C.textMuted,
                                                        fontWeight: 500
                                                    },
                                                    children: row.quiz
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 891,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope, sans-serif",
                                                        fontSize: 11,
                                                        color: C.textMuted,
                                                        textAlign: "center"
                                                    },
                                                    children: row.date
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                    lineNumber: 893,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, row.id, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 868,
                                            columnNumber: 15
                                        }, this)),
                                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: "32px",
                                            textAlign: "center"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope, sans-serif",
                                                fontSize: 14,
                                                color: C.textMuted
                                            },
                                            children: "No records match the selected filters."
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                            lineNumber: 899,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 898,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 866,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 852,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 779,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 695,
        columnNumber: 5
    }, this);
}
_s2(MisconceptionTab, "YXruK3JMiWfWdm/x0D4XxsP90Gg=");
_c6 = MisconceptionTab;
const TABS = [
    {
        id: "submission",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
            size: 15,
            strokeWidth: 2
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 913,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0)),
        label: "Submission",
        sub: "Upload & preview"
    },
    {
        id: "grading",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            size: 15,
            strokeWidth: 2
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 914,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0)),
        label: "Grading",
        sub: "Step-by-step review"
    },
    {
        id: "analysis",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
            size: 15,
            strokeWidth: 2
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
            lineNumber: 915,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0)),
        label: "Misconception Analysis",
        sub: "AI-powered insights"
    }
];
function SolutionAnalyzer() {
    _s3();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("submission");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes fadeIn{ 0%{opacity:0;transform:translateY(6px)} 100%{opacity:1;transform:translateY(0)} }
        select option { background: #fff; color: #1B1E2B; }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 923,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    height: "100vh",
                    overflow: "hidden",
                    fontFamily: "Manrope, sans-serif",
                    background: C.bg
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {}, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 930,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: C.surface,
                                    borderBottom: `1.5px solid ${C.border}`,
                                    padding: "14px 28px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 22,
                                                    fontWeight: 800,
                                                    color: C.text,
                                                    margin: 0
                                                },
                                                children: "Solution Analyzer"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 939,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope, sans-serif",
                                                    fontSize: 13,
                                                    color: C.textMuted,
                                                    margin: "3px 0 0"
                                                },
                                                children: "AI-powered grading & misconception detection"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 941,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 938,
                                        columnNumber: 13
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
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 7,
                                                    background: C.indigoLight,
                                                    border: `1.5px solid ${C.indigoBorder}`,
                                                    borderRadius: 20,
                                                    padding: "6px 14px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                        size: 13,
                                                        color: C.indigo,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: C.indigo
                                                        },
                                                        children: "AI Grading Active"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 947,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 7,
                                                    background: C.bg,
                                                    border: `1.5px solid ${C.border}`,
                                                    borderRadius: 20,
                                                    padding: "6px 14px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        size: 13,
                                                        color: C.textMuted,
                                                        strokeWidth: 2
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 957,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 12,
                                                            fontWeight: 600,
                                                            color: C.textMid
                                                        },
                                                        children: "CS201-A · 32 students"
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 958,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 954,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 946,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 935,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: C.surface,
                                    borderBottom: `1.5px solid ${C.border}`,
                                    padding: "0 28px",
                                    display: "flex",
                                    gap: 4,
                                    flexShrink: 0
                                },
                                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setTab(t.id),
                                        style: {
                                            padding: "13px 20px",
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            borderBottom: `3px solid ${tab === t.id ? C.indigo : "transparent"}`,
                                            transition: "border-color 0.15s",
                                            marginBottom: -1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: tab === t.id ? C.indigo : C.textMuted
                                                },
                                                children: t.icon
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 974,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: "left"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 13,
                                                            fontWeight: 800,
                                                            color: tab === t.id ? C.indigo : C.textMid,
                                                            margin: 0,
                                                            lineHeight: 1.2
                                                        },
                                                        children: t.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 976,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "Manrope, sans-serif",
                                                            fontSize: 11,
                                                            color: C.textMuted,
                                                            margin: 0,
                                                            lineHeight: 1.2
                                                        },
                                                        children: t.sub
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                                lineNumber: 975,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 968,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 965,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    padding: "20px 28px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    animation: "fadeIn 0.25s ease-out"
                                },
                                children: [
                                    tab === "submission" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmissionTab, {}, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 991,
                                        columnNumber: 36
                                    }, this),
                                    tab === "grading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GradingTab, {}, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 992,
                                        columnNumber: 36
                                    }, this),
                                    tab === "analysis" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MisconceptionTab, {}, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                        lineNumber: 993,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, tab, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                                lineNumber: 988,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                        lineNumber: 933,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
                lineNumber: 928,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/profonly/SolutionAnalyzer.tsx",
        lineNumber: 922,
        columnNumber: 5
    }, this);
}
_s3(SolutionAnalyzer, "tTRhmoy7nue6VCtXk/e6ablApY0=");
_c7 = SolutionAnalyzer;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "MisconceptionBadge");
__turbopack_context__.k.register(_c2, "StatCard");
__turbopack_context__.k.register(_c3, "SubmissionTab");
__turbopack_context__.k.register(_c4, "GradingTab");
__turbopack_context__.k.register(_c5, "CustomBarTooltip");
__turbopack_context__.k.register(_c6, "MisconceptionTab");
__turbopack_context__.k.register(_c7, "SolutionAnalyzer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=1b0n_frontend_src_components_profonly_SolutionAnalyzer_tsx_0ngrdfc._.js.map