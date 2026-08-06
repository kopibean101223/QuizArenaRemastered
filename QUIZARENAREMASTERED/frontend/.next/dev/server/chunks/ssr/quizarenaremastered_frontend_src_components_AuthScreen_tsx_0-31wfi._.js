module.exports = [
"[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthScreen",
    ()=>AuthScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/context/AppContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/src/lib/services/authService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
"use client";
;
;
;
;
;
;
const C = {
    yellow: "#FFC93C",
    coral: "#FF6B4A",
    green: "#2ED47A",
    red: "#FF4757"
};
function ErrorText({ msg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-body flex items-center gap-1.5 text-xs font-semibold text-[#FF4757] mt-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                size: 12,
                strokeWidth: 2.5
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            msg
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
function FormError({ msg }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 rounded-[10px] border-[1.5px] border-[#FF4757]/30 bg-[#FF4757]/[0.08] px-3.5 py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                size: 15,
                color: C.red,
                strokeWidth: 2.5,
                className: "shrink-0"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-body text-[13px] font-semibold text-[#FF4757]",
                children: msg
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
const CONFETTI = [
    {
        x: 8,
        y: 12,
        size: 10,
        color: C.yellow,
        shape: "circle"
    },
    {
        x: 88,
        y: 8,
        size: 8,
        color: C.coral,
        shape: "circle"
    },
    {
        x: 15,
        y: 72,
        size: 6,
        color: "#2ED47A",
        shape: "square"
    },
    {
        x: 82,
        y: 68,
        size: 8,
        color: C.yellow,
        shape: "square"
    },
    {
        x: 50,
        y: 6,
        size: 6,
        color: "rgba(255,255,255,0.4)",
        shape: "circle"
    },
    {
        x: 92,
        y: 40,
        size: 5,
        color: C.green,
        shape: "circle"
    },
    {
        x: 4,
        y: 45,
        size: 7,
        color: C.coral,
        shape: "square"
    },
    {
        x: 72,
        y: 78,
        size: 9,
        color: "#fff",
        shape: "circle",
        opacity: 0.2
    },
    {
        x: 28,
        y: 88,
        size: 5,
        color: C.yellow,
        shape: "circle"
    },
    {
        x: 60,
        y: 82,
        size: 6,
        color: C.coral,
        shape: "square"
    }
];
const FLOAT_ANIMS = [
    "floatA",
    "floatB",
    "floatC",
    "floatA",
    "floatB",
    "floatC",
    "floatA",
    "floatB",
    "floatC",
    "floatA"
];
function TrophyIllustration() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 260 220",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "w-[180px] sm:w-[220px] lg:w-[260px] h-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "40",
                y: "150",
                width: "60",
                height: "60",
                rx: "8",
                fill: "rgba(255,255,255,0.15)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "100",
                y: "125",
                width: "60",
                height: "85",
                rx: "8",
                fill: "rgba(255,255,255,0.22)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "160",
                y: "165",
                width: "60",
                height: "45",
                rx: "8",
                fill: "rgba(255,255,255,0.12)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "70",
                y: "185",
                textAnchor: "middle",
                fontFamily: "Fredoka, sans-serif",
                fontSize: "18",
                fontWeight: "700",
                fill: "rgba(255,255,255,0.6)",
                children: "2"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "130",
                y: "158",
                textAnchor: "middle",
                fontFamily: "Fredoka, sans-serif",
                fontSize: "22",
                fontWeight: "700",
                fill: "#FFC93C",
                children: "1"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "190",
                y: "195",
                textAnchor: "middle",
                fontFamily: "Fredoka, sans-serif",
                fontSize: "16",
                fontWeight: "700",
                fill: "rgba(255,255,255,0.5)",
                children: "3"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z",
                fill: "#FFC93C"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M105 30 C95 30 85 38 85 52 C85 68 95 80 110 88 L110 102 L100 108 L100 116 L160 116 L160 108 L150 102 L150 88 C165 80 175 68 175 52 C175 38 165 30 155 30 Z",
                fill: "url(#trophyGrad)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M85 46 C72 46 66 52 66 60 C66 68 72 74 85 74",
                stroke: "#FFC93C",
                strokeWidth: "7",
                strokeLinecap: "round",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M175 46 C188 46 194 52 194 60 C194 68 188 74 175 74",
                stroke: "#FFC93C",
                strokeWidth: "7",
                strokeLinecap: "round",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "98",
                y: "114",
                width: "64",
                height: "10",
                rx: "3",
                fill: "#E8A800"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "94",
                y: "122",
                width: "72",
                height: "8",
                rx: "4",
                fill: "#E8A800"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "130,45 133,55 143,55 135,61 138,71 130,65 122,71 125,61 117,55 127,55",
                fill: "white",
                opacity: "0.9"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "50,40 52,46 58,46 53,50 55,56 50,52 45,56 47,50 42,46 48,46",
                fill: "#FFC93C",
                opacity: "0.9"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "210,30 212,35 217,35 213,38 215,43 210,40 205,43 207,38 203,35 208,35",
                fill: "white",
                opacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "40,100 41.5,104.5 46,104.5 42.5,107 44,111.5 40,109 36,111.5 37.5,107 34,104.5 38.5,104.5",
                fill: "#FF6B4A",
                opacity: "0.85"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                points: "218,95 219.5,99.5 224,99.5 220.5,102 222,106.5 218,104 214,106.5 215.5,102 212,99.5 216.5,99.5",
                fill: "#FFC93C",
                opacity: "0.8"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "76",
                y: "20",
                width: "8",
                height: "8",
                rx: "2",
                fill: "#FF6B4A",
                opacity: "0.9",
                transform: "rotate(20 80 24)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "180",
                y: "18",
                width: "7",
                height: "7",
                rx: "2",
                fill: "#2ED47A",
                opacity: "0.85",
                transform: "rotate(-15 183 21)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "60",
                cy: "68",
                r: "4",
                fill: "#FFC93C",
                opacity: "0.8"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "200",
                cy: "64",
                r: "4",
                fill: "white",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "88",
                y: "8",
                width: "6",
                height: "6",
                rx: "1",
                fill: "white",
                opacity: "0.35",
                transform: "rotate(30 91 11)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "166",
                y: "8",
                width: "6",
                height: "6",
                rx: "1",
                fill: "#FF6B4A",
                opacity: "0.6",
                transform: "rotate(-25 169 11)"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "trophyGrad",
                    x1: "105",
                    y1: "30",
                    x2: "175",
                    y2: "116",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: "rgba(255,255,255,0.3)"
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: "rgba(255,255,255,0)"
                        }, void 0, false, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function Field({ label, id, type = "text", placeholder, value, onChange, error, suffix, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "font-body text-[13px] font-bold text-[#1B1E2B]",
                children: label
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: id,
                        type: type,
                        placeholder: placeholder,
                        value: value,
                        onChange: (e)=>onChange(e.target.value),
                        disabled: disabled,
                        className: [
                            "font-body w-full rounded-[14px] px-4 py-[13px] text-[15px] font-medium text-[#1B1E2B]",
                            "outline-none border-2 transition-colors box-border disabled:opacity-50",
                            suffix ? "pr-12" : "",
                            error ? "bg-[#FF4757]/[0.05] border-[#FF4757]" : "bg-[#F3F3F7] border-transparent focus:border-[#5B3DF6]"
                        ].join(" ")
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    suffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-[#717182]",
                        children: suffix
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                msg: error
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 156,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
function RoleBtn({ active, icon, label, sub, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: [
            "flex-1 rounded-2xl border-[2.5px] px-3 py-3.5 flex flex-col items-center gap-1.5 transition-all",
            active ? "bg-[#5B3DF6] border-[#5B3DF6] shadow-[0_4px_14px_rgba(91,61,246,0.28)]" : "bg-[#F3F3F7] border-transparent shadow-none"
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    active ? "bg-white/[0.18] text-white" : "bg-[#5B3DF6]/10 text-[#5B3DF6]"
                ].join(" "),
                children: icon
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "font-heading text-[17px] font-semibold leading-none",
                    active ? "text-white" : "text-[#1B1E2B]"
                ].join(" "),
                children: label
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: [
                    "font-body text-[11px] font-medium leading-[1.3] text-center",
                    active ? "text-white/65" : "text-[#717182]"
                ].join(" "),
                children: sub
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
function SubmitBtn({ label, loading, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        disabled: loading,
        className: [
            "font-heading w-full rounded-2xl px-6 py-[15px] text-lg sm:text-[19px] font-semibold text-white",
            "flex items-center justify-center gap-2.5 tracking-[0.01em] transition-colors",
            loading ? "bg-[#FF6B4A]/60 cursor-default shadow-none" : "bg-[#FF6B4A] hover:bg-[#E8573A] cursor-pointer shadow-[0_5px_20px_rgba(255,107,74,0.38)]"
        ].join(" "),
        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    size: 20,
                    strokeWidth: 2.5,
                    className: "animate-spin"
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 232,
                    columnNumber: 11
                }, this),
                "Please wait…"
            ]
        }, void 0, true, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
            lineNumber: 231,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                label,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    size: 20,
                    strokeWidth: 2.5
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
            lineNumber: 236,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
function Tab({ label, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: [
            "font-heading flex-1 py-2.5 rounded-xl text-base sm:text-[17px] font-semibold transition-all",
            active ? "bg-white text-[#5B3DF6] shadow-[0_2px_10px_rgba(0,0,0,0.08)]" : "bg-transparent text-[#717182]"
        ].join(" "),
        children: label
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
function SuccessPanel({ title, message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4 py-8 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[72px] h-[72px] rounded-full bg-[#2ED47A]/[0.12] flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 36,
                    color: C.green,
                    strokeWidth: 2
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 272,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-heading text-2xl sm:text-[26px] font-bold text-[#1B1E2B] m-0",
                children: title
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-body text-sm text-[#717182] m-0 leading-relaxed",
                children: message
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
}
function SignUpForm() {
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPw, setShowPw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("student");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    function validate() {
        const e = {};
        if (!name.trim()) e.name = "Full name is required.";
        if (!email.trim()) {
            e.email = "UMak Gmail is required.";
        } else if (!email.endsWith("@umak.edu.ph")) {
            e.email = "Must be a valid UMak Gmail (@umak.edu.ph).";
        }
        if (!password) {
            e.password = "Password is required.";
        } else if (password.length < 8) {
            e.password = "Password must be at least 8 characters.";
        }
        return e;
    }
    async function handleSubmit() {
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUpUser"])(email, password, name, role);
            setSuccess(true);
        } catch (err) {
            setErrors({
                form: err.message || "Could not reach the server. Please try again."
            });
        } finally{
            setLoading(false);
        }
    }
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessPanel, {
                    title: "You're in the arena!",
                    message: "Account created successfully. Check your UMak Gmail to verify your account."
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSuccess(false),
                    className: "font-heading -mt-2 bg-[#5B3DF6] text-white rounded-2xl px-7 py-3 text-lg font-semibold cursor-pointer shadow-[0_4px_14px_rgba(91,61,246,0.3)]",
                    children: "Continue"
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
            lineNumber: 324,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:gap-[18px]",
        children: [
            errors.form && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormError, {
                msg: errors.form
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 341,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Full Name",
                id: "su-name",
                placeholder: "e.g. Maria Santos",
                value: name,
                onChange: setName,
                error: errors.name,
                disabled: loading
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "UMak Gmail",
                id: "su-email",
                type: "email",
                placeholder: "you@umak.edu.ph",
                value: email,
                onChange: setEmail,
                error: errors.email,
                disabled: loading
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Password",
                id: "su-password",
                type: showPw ? "text" : "password",
                placeholder: "Min. 8 characters",
                value: password,
                onChange: setPassword,
                error: errors.password,
                disabled: loading,
                suffix: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setShowPw((v)=>!v),
                    className: "bg-transparent border-none cursor-pointer p-0 text-[#717182] flex",
                    children: showPw ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                        size: 18,
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 376,
                        columnNumber: 23
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                        size: 18,
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 376,
                        columnNumber: 62
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                    lineNumber: 371,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-body text-[13px] font-bold text-[#1B1E2B]",
                        children: "I am a…"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleBtn, {
                                active: role === "student",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                    size: 20,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 386,
                                    columnNumber: 19
                                }, this),
                                label: "Student",
                                sub: "Join quiz battles",
                                onClick: ()=>setRole("student")
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleBtn, {
                                active: role === "professor",
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                    size: 20,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 393,
                                    columnNumber: 19
                                }, this),
                                label: "Professor",
                                sub: "Create & manage quizzes",
                                onClick: ()=>setRole("professor")
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmitBtn, {
                label: "Create Account",
                loading: loading,
                onClick: handleSubmit
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-body text-xs text-[#717182] text-center m-0 leading-relaxed",
                children: [
                    "By signing up you agree to QuizArena's",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "text-[#5B3DF6] font-bold no-underline",
                        children: "Terms"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    " ",
                    "and",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        className: "text-[#5B3DF6] font-bold no-underline",
                        children: "Privacy Policy"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 340,
        columnNumber: 5
    }, this);
}
function LoginForm() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPw, setShowPw] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    function validate() {
        const e = {};
        if (!email.trim()) e.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
        if (!password) e.password = "Password is required.";
        return e;
    }
    async function handleSubmit() {
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;
        setLoading(true);
        try {
            const role = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginUserAndFetchRole"])(email.trim(), password);
            setSuccess(true);
            // ✅ FIX: Match parameter routes defined in Middleware
            if (role?.toLowerCase() === 'professor') {
                router.push('/?page=dashboard');
            } else if (role?.toLowerCase() === 'student') {
                router.push('/?page=lobby');
            } else {
                router.push('/?page=role');
            }
        } catch (err) {
            setErrors({
                form: err.message || "Invalid email or password."
            });
            setLoading(false);
        }
    }
    async function handleGoogleAuth() {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$lib$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginWithGoogle"])();
        } catch (err) {
            setErrors({
                form: err.message || "Failed to initialize Google login."
            });
        }
    }
    if (success) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuccessPanel, {
            title: "Welcome back!",
            message: "Logging you in to the arena…"
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
            lineNumber: 463,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:gap-[18px]",
        children: [
            errors.form && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormError, {
                msg: errors.form
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 468,
                columnNumber: 23
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                label: "Email",
                id: "li-email",
                type: "email",
                placeholder: "you@umak.edu.ph",
                value: email,
                onChange: setEmail,
                error: errors.email,
                disabled: loading
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "li-password",
                                className: "font-body text-[13px] font-bold text-[#1B1E2B]",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 481,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "font-body text-xs font-bold text-[#5B3DF6] no-underline",
                                children: "Forgot Password?"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 480,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "li-password",
                                type: showPw ? "text" : "password",
                                placeholder: "Enter your password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                disabled: loading,
                                className: [
                                    "font-body w-full rounded-[14px] pl-4 pr-12 py-[13px] text-[15px] font-medium text-[#1B1E2B]",
                                    "outline-none border-2 box-border disabled:opacity-50",
                                    errors.password ? "bg-[#FF4757]/[0.05] border-[#FF4757]" : "bg-[#F3F3F7] border-transparent"
                                ].join(" ")
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowPw((v)=>!v),
                                className: "absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#717182] flex p-0",
                                children: showPw ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                    size: 18,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 507,
                                    columnNumber: 23
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    size: 18,
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 507,
                                    columnNumber: 62
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this),
                    errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                        msg: errors.password
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 510,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SubmitBtn, {
                label: "Log In",
                loading: loading,
                onClick: handleSubmit
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-black/10"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 516,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-body text-xs text-[#717182] font-semibold whitespace-nowrap",
                        children: "or continue with"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 h-px bg-black/10"
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 518,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 515,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleGoogleAuth,
                disabled: loading,
                className: "font-body w-full bg-[#FAFAFC] border-2 border-black/10 rounded-2xl px-6 py-3 text-[15px] font-bold text-[#1B1E2B] cursor-pointer flex items-center justify-center gap-2.5 box-border disabled:opacity-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 18 18",
                        fill: "none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 14.078 17.64 11.845 17.64 9.2z",
                                fill: "#4285F4"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 528,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z",
                                fill: "#34A853"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 529,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z",
                                fill: "#FBBC05"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z",
                                fill: "#EA4335"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 527,
                        columnNumber: 9
                    }, this),
                    "Continue with Google"
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 467,
        columnNumber: 5
    }, this);
}
function AuthScreen() {
    const { user, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$context$2f$AppContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("login");
    // ✅ FIX: Redirect existing sessions to parameter routes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading && user) {
            if (user.role === "professor") {
                router.push("/?page=dashboard");
            } else if (user.role === "student") {
                router.push("/?page=lobby");
            } else {
                router.push("/?page=role");
            }
        }
    }, [
        user,
        isLoading,
        router
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-[#FAFAFC]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                size: 36,
                className: "animate-spin text-[#5B3DF6]"
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 560,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
            lineNumber: 559,
            columnNumber: 7
        }, this);
    }
    if (user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatA { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px) rotate(0deg)} 50%{transform:translateY(-7px) rotate(-6deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
      `
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 569,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-body min-h-screen flex flex-col md:flex-row bg-[#FAFAFC]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center justify-center overflow-hidden\r\n\n                     w-full md:w-[46%] lg:w-[48%] shrink-0\r\n\n                     px-6 py-10 sm:px-10 sm:py-12 md:px-10 md:py-14\r\n\n                     bg-[linear-gradient(150deg,#5B3DF6_0%,#4228D4_60%,#331FA8_100%)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute -top-20 -right-20 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-white/[0.06]"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 583,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 sm:w-[260px] sm:h-[260px] rounded-full bg-[#FFC93C]/[0.08]"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:block",
                                children: CONFETTI.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute",
                                        style: {
                                            left: `${d.x}%`,
                                            top: `${d.y}%`,
                                            width: d.size,
                                            height: d.size,
                                            borderRadius: d.shape === "circle" ? "50%" : 3,
                                            background: d.color,
                                            opacity: d.opacity ?? 1,
                                            animation: `${FLOAT_ANIMS[i]} ${2.5 + i * 0.3}s ease-in-out infinite`
                                        }
                                    }, i, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 586,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-2 sm:mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-2xl bg-white/[0.15] backdrop-blur-sm flex items-center justify-center border-[1.5px] border-white/20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            fill: C.yellow,
                                            color: "transparent",
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 606,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-heading text-2xl sm:text-[30px] font-bold text-white tracking-[0.01em]",
                                        children: "QuizArena"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 609,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 605,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-2 max-w-[340px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-white leading-[1.2] mb-2 sm:mb-3",
                                        children: [
                                            "Battle your way to",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#FFC93C] inline-block",
                                                style: {
                                                    animation: "floatC 3s ease-in-out infinite"
                                                },
                                                children: "brilliance!"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                lineNumber: 617,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-body text-sm text-white/65 leading-relaxed m-0 hidden sm:block",
                                        children: "Live quiz battles powered by your UMak curriculum. Compete, learn, and climb the leaderboard."
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 621,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:block mt-2",
                                style: {
                                    animation: "floatC 4s ease-in-out infinite",
                                    filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.22))"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrophyIllustration, {}, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 630,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:flex gap-3 md:gap-5 mt-1 flex-wrap justify-center",
                                children: [
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                            fill: C.yellow,
                                            color: "transparent",
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 635,
                                            columnNumber: 23
                                        }, this),
                                        val: "2,400+",
                                        label: "Active Students"
                                    },
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            fill: C.yellow,
                                            color: "transparent",
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 636,
                                            columnNumber: 23
                                        }, this),
                                        val: "12K",
                                        label: "Quizzes Played"
                                    },
                                    {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            fill: C.yellow,
                                            color: "transparent",
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 637,
                                            columnNumber: 23
                                        }, this),
                                        val: "98%",
                                        label: "Satisfaction"
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 rounded-xl px-3.5 py-2 flex items-center gap-[7px] backdrop-blur-sm border border-white/[0.12]",
                                        children: [
                                            s.icon,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-heading text-[15px] sm:text-base font-bold text-white m-0 leading-none",
                                                        children: s.val
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-body text-[10px] font-semibold text-white/50 m-0",
                                                        children: s.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                lineNumber: 644,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 639,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                lineNumber: 633,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 overflow-y-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-[420px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 sm:mb-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "font-heading text-[26px] sm:text-[32px] font-bold text-[#1B1E2B] mb-1.5 leading-[1.2]",
                                            children: tab === "signup" ? "Join the arena! 🏆" : "Welcome back! ⚡"
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 656,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-body text-sm font-medium text-[#717182] m-0",
                                            children: tab === "signup" ? "Create your QuizArena account with your UMak Gmail." : "Log in to your account and get back to the leaderboard."
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 659,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 655,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#F3F3F7] rounded-2xl p-[5px] flex mb-6 sm:mb-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tab, {
                                            label: "Sign Up",
                                            active: tab === "signup",
                                            onClick: ()=>setTab("signup")
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 667,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tab, {
                                            label: "Log In",
                                            active: tab === "login",
                                            onClick: ()=>setTab("login")
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                            lineNumber: 668,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 666,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-3xl px-6 py-7 sm:px-8 sm:pt-8 sm:pb-7 shadow-[0_4px_28px_rgba(0,0,0,0.07)] border-[1.5px] border-black/5",
                                    children: tab === "signup" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SignUpForm, {}, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 672,
                                        columnNumber: 35
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginForm, {}, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 672,
                                        columnNumber: 52
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 671,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-body text-[13px] font-medium text-[#717182] text-center mt-5",
                                    children: tab === "signup" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            "Already have an account?",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTab("login"),
                                                className: "font-body bg-transparent border-none text-[#5B3DF6] font-bold cursor-pointer p-0 text-[13px]",
                                                children: "Log In"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                lineNumber: 679,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 677,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            "New to QuizArena?",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setTab("signup"),
                                                className: "font-body bg-transparent border-none text-[#5B3DF6] font-bold cursor-pointer p-0 text-[13px]",
                                                children: "Create Account"
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                                lineNumber: 689,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                        lineNumber: 687,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                                    lineNumber: 675,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                            lineNumber: 654,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                        lineNumber: 653,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/AuthScreen.tsx",
        lineNumber: 568,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=quizarenaremastered_frontend_src_components_AuthScreen_tsx_0-31wfi._.js.map