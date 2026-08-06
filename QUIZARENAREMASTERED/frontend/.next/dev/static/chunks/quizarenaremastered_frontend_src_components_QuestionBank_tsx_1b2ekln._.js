(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
;
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
const TOPICS = {
    Mathematics: [
        "Algebra",
        "Calculus",
        "Trigonometry",
        "Statistics",
        "Number Theory"
    ],
    Physics: [
        "Mechanics",
        "Thermodynamics",
        "Optics",
        "Electromagnetism",
        "Modern Physics"
    ],
    "Computer Science": [
        "Data Structures",
        "Algorithms",
        "Networking",
        "OOP",
        "Databases"
    ],
    History: [
        "Ancient",
        "Medieval",
        "Modern",
        "Philippine History",
        "World Wars"
    ],
    Biology: [
        "Genetics",
        "Cell Biology",
        "Ecology",
        "Evolution",
        "Anatomy"
    ]
};
const ALL_TOPICS = [
    "All Topics",
    ...new Set(Object.values(TOPICS).flat())
];
const QTYPES = [
    "All Types",
    "Multiple Choice",
    "True / False",
    "Identification",
    "Short Answer"
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
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 50,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "True / False": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$toggle$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleLeft$3e$__["ToggleLeft"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 51,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Identification": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 52,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0)),
    "Short Answer": /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"], {
        size: 11,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 53,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0))
};
const RAW_QUESTIONS = [
    {
        id: 1,
        text: "What is the derivative of f(x) = 3x² + 2x − 5?",
        subject: "Mathematics",
        difficulty: "Medium",
        topic: "Calculus",
        type: "Multiple Choice",
        points: 2,
        timeLimit: 30,
        choices: [
            "6x + 2",
            "3x + 2",
            "6x² + 2",
            "6x − 5"
        ],
        answer: "6x + 2",
        explanation: "Using the power rule: d/dx(3x²)=6x, d/dx(2x)=2, d/dx(−5)=0.",
        tags: [
            "Calculus",
            "Derivatives"
        ],
        createdAt: "2026-07-10"
    },
    {
        id: 2,
        text: "Newton's First Law of Motion is also known as the Law of ___.",
        subject: "Physics",
        difficulty: "Easy",
        topic: "Mechanics",
        type: "Identification",
        points: 1,
        timeLimit: 20,
        choices: [],
        answer: "Inertia",
        explanation: "Newton's First Law states that an object remains at rest unless acted on by a net force.",
        tags: [
            "Mechanics",
            "Newton"
        ],
        createdAt: "2026-07-09"
    },
    {
        id: 3,
        text: "Which data structure uses LIFO order?",
        subject: "Computer Science",
        difficulty: "Easy",
        topic: "Data Structures",
        type: "Multiple Choice",
        points: 1,
        timeLimit: 20,
        choices: [
            "Queue",
            "Stack",
            "Linked List",
            "Tree"
        ],
        answer: "Stack",
        explanation: "Last In, First Out — the last element pushed is the first to be popped.",
        tags: [
            "DSA",
            "Stack"
        ],
        createdAt: "2026-07-08"
    },
    {
        id: 4,
        text: "The Battle of Mactan took place in 1521. True or False?",
        subject: "History",
        difficulty: "Easy",
        topic: "Philippine History",
        type: "True / False",
        points: 1,
        timeLimit: 15,
        choices: [
            "True",
            "False"
        ],
        answer: "True",
        explanation: "The Battle of Mactan occurred on April 27, 1521, where Lapulapu defeated Ferdinand Magellan.",
        tags: [
            "Mactan",
            "Philippines"
        ],
        createdAt: "2026-07-07"
    },
    {
        id: 5,
        text: "Solve for x: 2x² − 8x + 6 = 0",
        subject: "Mathematics",
        difficulty: "Hard",
        topic: "Algebra",
        type: "Short Answer",
        points: 3,
        timeLimit: 60,
        choices: [],
        answer: "x = 1 or x = 3",
        explanation: "Factor: 2(x²−4x+3)=0 → 2(x−1)(x−3)=0 → x=1 or x=3.",
        tags: [
            "Algebra",
            "Quadratic"
        ],
        createdAt: "2026-07-06"
    },
    {
        id: 6,
        text: "What is the process by which plants make food using sunlight?",
        subject: "Biology",
        difficulty: "Easy",
        topic: "Ecology",
        type: "Identification",
        points: 1,
        timeLimit: 20,
        choices: [],
        answer: "Photosynthesis",
        explanation: "Plants convert CO₂ + H₂O + light energy into glucose and oxygen.",
        tags: [
            "Plants",
            "Photosynthesis"
        ],
        createdAt: "2026-07-05"
    },
    {
        id: 7,
        text: "In OOP, which principle restricts direct access to object components?",
        subject: "Computer Science",
        difficulty: "Medium",
        topic: "OOP",
        type: "Multiple Choice",
        points: 2,
        timeLimit: 25,
        choices: [
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Abstraction"
        ],
        answer: "Encapsulation",
        explanation: "Encapsulation hides internal state and requires all interaction through methods.",
        tags: [
            "OOP",
            "Encapsulation"
        ],
        createdAt: "2026-07-04"
    },
    {
        id: 8,
        text: "A thermodynamic process in which no heat is exchanged is called ___.",
        subject: "Physics",
        difficulty: "Medium",
        topic: "Thermodynamics",
        type: "Identification",
        points: 2,
        timeLimit: 25,
        choices: [],
        answer: "Adiabatic",
        explanation: "An adiabatic process is one where Q=0; the system is perfectly insulated.",
        tags: [
            "Thermodynamics",
            "Adiabatic"
        ],
        createdAt: "2026-07-03"
    },
    {
        id: 9,
        text: "State the Fundamental Theorem of Calculus in your own words.",
        subject: "Mathematics",
        difficulty: "Hard",
        topic: "Calculus",
        type: "Short Answer",
        points: 4,
        timeLimit: 90,
        choices: [],
        answer: "Differentiation and integration are inverse operations.",
        explanation: "The FTC links the concept of the derivative of a function to the concept of the integral.",
        tags: [
            "Calculus",
            "FTC"
        ],
        createdAt: "2026-07-02"
    },
    {
        id: 10,
        text: "World War II ended in 1945. True or False?",
        subject: "History",
        difficulty: "Easy",
        topic: "World Wars",
        type: "True / False",
        points: 1,
        timeLimit: 10,
        choices: [
            "True",
            "False"
        ],
        answer: "True",
        explanation: "WWII ended on September 2, 1945, with Japan's formal surrender.",
        tags: [
            "WWII",
            "World History"
        ],
        createdAt: "2026-07-01"
    },
    {
        id: 11,
        text: "What is the time complexity of binary search?",
        subject: "Computer Science",
        difficulty: "Medium",
        topic: "Algorithms",
        type: "Multiple Choice",
        points: 2,
        timeLimit: 25,
        choices: [
            "O(n)",
            "O(n²)",
            "O(log n)",
            "O(1)"
        ],
        answer: "O(log n)",
        explanation: "Binary search halves the search space each step, giving O(log n) complexity.",
        tags: [
            "Algorithms",
            "Complexity"
        ],
        createdAt: "2026-06-30"
    },
    {
        id: 12,
        text: "Describe Mendel's Law of Segregation.",
        subject: "Biology",
        difficulty: "Hard",
        topic: "Genetics",
        type: "Short Answer",
        points: 3,
        timeLimit: 60,
        choices: [],
        answer: "Alleles separate during gamete formation so each gamete carries one allele.",
        explanation: "During meiosis, the two alleles of each gene segregate from each other.",
        tags: [
            "Genetics",
            "Mendel"
        ],
        createdAt: "2026-06-29"
    },
    {
        id: 13,
        text: "The speed of light in a vacuum is approximately ___ m/s.",
        subject: "Physics",
        difficulty: "Medium",
        topic: "Optics",
        type: "Identification",
        points: 2,
        timeLimit: 20,
        choices: [],
        answer: "3 × 10⁸",
        explanation: "c ≈ 299,792,458 m/s, commonly approximated as 3 × 10⁸ m/s.",
        tags: [
            "Optics",
            "Speed of Light"
        ],
        createdAt: "2026-06-28"
    },
    {
        id: 14,
        text: "sin²θ + cos²θ = 1 is a Pythagorean identity. True or False?",
        subject: "Mathematics",
        difficulty: "Easy",
        topic: "Trigonometry",
        type: "True / False",
        points: 1,
        timeLimit: 15,
        choices: [
            "True",
            "False"
        ],
        answer: "True",
        explanation: "This is the fundamental Pythagorean trigonometric identity.",
        tags: [
            "Trigonometry",
            "Identity"
        ],
        createdAt: "2026-06-27"
    },
    {
        id: 15,
        text: "Which normal form eliminates transitive dependencies?",
        subject: "Computer Science",
        difficulty: "Hard",
        topic: "Databases",
        type: "Multiple Choice",
        points: 3,
        timeLimit: 30,
        choices: [
            "1NF",
            "2NF",
            "3NF",
            "BCNF"
        ],
        answer: "3NF",
        explanation: "Third Normal Form removes transitive functional dependencies.",
        tags: [
            "Databases",
            "Normalization"
        ],
        createdAt: "2026-06-26"
    }
];
const PAGE_SIZE = 8;
// ─── Tiny helpers ──────────────────────────────────────────────────────────────
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            subject
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_c = SubjectBadge;
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
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_c1 = DiffBadge;
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
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_c2 = TypeChip;
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
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 128,
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
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 143,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_s(Dropdown, "t4ZsC+YUoO3/Ij2kmAXjjTymoXI=");
_c3 = Dropdown;
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 167,
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 170,
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
                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                    lineNumber: 181,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
_c4 = FilterChip;
// ─── Preview Modal ─────────────────────────────────────────────────────────────
function PreviewModal({ q, onClose }) {
    _s1();
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const diffS = DIFF_STYLE[q.difficulty];
    const subS = SUBJECT_STYLE[q.subject] ?? {
        bg: C.indigoLight,
        text: C.indigo,
        dot: C.indigo
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
                    background: "rgba(27,30,43,0.4)",
                    backdropFilter: "blur(3px)"
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 196,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 205,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 209,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypeChip, {
                                                type: q.type
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 213,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 204,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 203,
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
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 201,
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectBadge, {
                                subject: q.subject
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 230,
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        size: 12,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            fontWeight: 600
                                        },
                                        children: q.topic
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 231,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 236,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 235,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 240,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 228,
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
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 249,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 265,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 271,
                                                columnNumber: 21
                                            }, this),
                                            showResult && isAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 16,
                                                color: "#18A058",
                                                style: {
                                                    marginLeft: "auto"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 274,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, ch, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, this);
                                }),
                                picked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.greenLight,
                                        borderRadius: 12,
                                        padding: "10px 14px",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 8,
                                        border: `1.5px solid ${C.greenBorder}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            size: 15,
                                            color: "#18A058",
                                            strokeWidth: 2.5,
                                            style: {
                                                flexShrink: 0,
                                                marginTop: 1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 281,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: "#18A058",
                                                        margin: 0
                                                    },
                                                    children: [
                                                        "Correct Answer: ",
                                                        q.answer
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 21
                                                }, this),
                                                q.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 500,
                                                        color: "#18A058",
                                                        margin: "3px 0 0",
                                                        opacity: 0.85,
                                                        lineHeight: 1.5
                                                    },
                                                    children: q.explanation
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 279,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                            lineNumber: 248,
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
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.greenLight,
                                        borderRadius: 14,
                                        padding: "14px 16px",
                                        border: `1.5px solid ${C.greenBorder}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: "#18A058",
                                                margin: 0
                                            },
                                            children: q.answer
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 298,
                                            columnNumber: 17
                                        }, this),
                                        q.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 12,
                                                fontWeight: 500,
                                                color: "#18A058",
                                                margin: "6px 0 0",
                                                opacity: 0.8,
                                                lineHeight: 1.5
                                            },
                                            children: q.explanation
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 301,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                            lineNumber: 293,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    q.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 24px 20px",
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap"
                        },
                        children: q.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: C.inputBg,
                                    borderRadius: 7,
                                    padding: "3px 9px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: C.muted
                                },
                                children: [
                                    "#",
                                    tag
                                ]
                            }, tag, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
_s1(PreviewModal, "wClLWMl0GDIqmyo1fVV4mZamcxU=");
_c5 = PreviewModal;
// ─── Add / Edit Question Modal ─────────────────────────────────────────────────
function QuestionModal({ editing, onClose }) {
    _s2();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.text ?? "");
    const [subject, setSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.subject ?? "Mathematics");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.difficulty ?? "Easy");
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.type ?? "Multiple Choice");
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.topic ?? "Algebra");
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.answer ?? "");
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(editing?.points ?? 1));
    const [timeLimit, setTimeLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(editing?.timeLimit ?? 20));
    const [choices, setChoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(editing?.choices ?? [
        "",
        "",
        "",
        ""
    ]);
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
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 338,
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
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 17,
                                            fontWeight: 800,
                                            color: "#fff",
                                            margin: 0
                                        },
                                        children: editing ? "Edit Question" : "Add New Question"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 12,
                                            color: "rgba(255,255,255,0.6)",
                                            margin: "3px 0 0"
                                        },
                                        children: "Fill in the question details below."
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 344,
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
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 342,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 362,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: text,
                                        onChange: (e)=>setText(e.target.value),
                                        placeholder: "Enter your question here…",
                                        rows: 3,
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
                                            resize: "vertical",
                                            boxSizing: "border-box",
                                            width: "100%"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    {
                                        label: "Subject",
                                        v: subject,
                                        set: setSubject,
                                        opts: SUBJECTS.slice(1)
                                    },
                                    {
                                        label: "Difficulty",
                                        v: difficulty,
                                        set: setDifficulty,
                                        opts: DIFFICULTIES.slice(1)
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 377,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: f.v,
                                                options: f.opts,
                                                onChange: f.set
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, f.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 376,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    {
                                        label: "Question Type",
                                        v: type,
                                        set: setType,
                                        opts: QTYPES.slice(1)
                                    },
                                    {
                                        label: "Topic",
                                        v: topic,
                                        set: setTopic,
                                        opts: TOPICS[subject] ?? ALL_TOPICS.slice(1)
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                                value: f.v,
                                                options: f.opts,
                                                onChange: f.set
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, f.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 389,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 384,
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
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    choices.map((ch, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: "50%",
                                                        background: C.indigoLight,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 11,
                                                        fontWeight: 800,
                                                        color: C.indigo,
                                                        flexShrink: 0
                                                    },
                                                    children: [
                                                        "A",
                                                        "B",
                                                        "C",
                                                        "D"
                                                    ][i]
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        flex: 1,
                                                        background: C.inputBg,
                                                        border: "2px solid transparent",
                                                        borderRadius: 10,
                                                        padding: "9px 12px",
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 13,
                                                        fontWeight: 500,
                                                        color: C.navy,
                                                        outline: "none"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 398,
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
                                        children: "Correct Answer"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: answer,
                                        onChange: (e)=>setAnswer(e.target.value),
                                        placeholder: "Enter the correct answer…",
                                        style: {
                                            background: C.greenLight,
                                            border: `2px solid ${C.greenBorder}`,
                                            borderRadius: 10,
                                            padding: "10px 14px",
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "#18A058",
                                            outline: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: 12
                                },
                                children: [
                                    {
                                        label: "Points",
                                        v: points,
                                        set: setPoints,
                                        placeholder: "e.g. 2"
                                    },
                                    {
                                        label: "Time Limit (sec)",
                                        v: timeLimit,
                                        set: setTimeLimit,
                                        placeholder: "e.g. 30"
                                    }
                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                children: f.label
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: f.v,
                                                onChange: (e)=>f.set(e.target.value),
                                                placeholder: f.placeholder,
                                                style: {
                                                    background: C.inputBg,
                                                    border: "2px solid transparent",
                                                    borderRadius: 10,
                                                    padding: "10px 14px",
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    color: C.navy,
                                                    outline: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, f.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 359,
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
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
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
                                children: editing ? "Save Changes" : "Add Question"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 337,
        columnNumber: 5
    }, this);
}
_s2(QuestionModal, "ppxHabiDG7IMBMDzPkML/QUDQzQ=");
_c6 = QuestionModal;
// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() {
    _s3();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$src$2f$components$2f$shared$2f$ProfSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfSidebar"], {}, void 0, false, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 462,
        columnNumber: 29
    }, this);
    //TURBOPACK unreachable
    ;
    const active = undefined, setActive = undefined;
    const items = undefined;
}
_s3(Sidebar, "M8UCowiSVnfHLd+Yt88C4qLCb/k=");
_c7 = Sidebar;
function QuestionBank() {
    _s4();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [subjectF, setSubjectF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Subjects");
    const [diffF, setDiffF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Difficulties");
    const [topicF, setTopicF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Topics");
    const [typeF, setTypeF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Types");
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Newest First");
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editQ, setEditQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [hoveredRow, setHoveredRow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showFilterPanel, setShowFilterPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Active filter count
    const activeFilters = [
        subjectF,
        diffF,
        topicF,
        typeF
    ].filter((v)=>!v.startsWith("All")).length;
    const filtered = RAW_QUESTIONS.filter((q)=>{
        const s = search.toLowerCase();
        const matchSearch = !s || q.text.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s) || q.tags.some((t)=>t.toLowerCase().includes(s));
        return matchSearch && (subjectF === "All Subjects" || q.subject === subjectF) && (diffF === "All Difficulties" || q.difficulty === diffF) && (topicF === "All Topics" || q.topic === topicF) && (typeF === "All Types" || q.type === typeF);
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
        return b.id - a.id; // Newest First
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
    // Summary counts
    const totalByDiff = {
        Easy: RAW_QUESTIONS.filter((q)=>q.difficulty === "Easy").length,
        Medium: RAW_QUESTIONS.filter((q)=>q.difficulty === "Medium").length,
        Hard: RAW_QUESTIONS.filter((q)=>q.difficulty === "Hard").length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            background: C.offWhite,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {}, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 574,
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
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "Manrope,sans-serif",
                                            fontSize: 19,
                                            fontWeight: 800,
                                            color: C.navy,
                                            margin: 0,
                                            whiteSpace: "nowrap"
                                        },
                                        children: "Question Bank"
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 581,
                                        columnNumber: 13
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 585,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search questions, topics, tags…",
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
                                                    outline: "none",
                                                    boxSizing: "border-box"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 587,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 584,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 580,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 597,
                                                columnNumber: 15
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 600,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterChip, {
                                                label: "Topic",
                                                active: topicF !== "All Topics",
                                                onClick: ()=>setShowFilterPanel((v)=>!v),
                                                onClear: ()=>{
                                                    setTopicF("All Topics");
                                                    setPage(1);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 603,
                                                columnNumber: 15
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 606,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 596,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                        value: sort,
                                        options: SORT_OPTIONS,
                                        onChange: setSort,
                                        width: 148
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setShowAdd(true),
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
                                            gap: 6,
                                            boxShadow: `0 3px 10px rgba(255,107,74,0.3)`,
                                            whiteSpace: "nowrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                size: 15,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 617,
                                                columnNumber: 15
                                            }, this),
                                            "Add Question"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 611,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 595,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this),
                    showFilterPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    opts: SUBJECTS
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
                                    label: "Topic",
                                    v: topicF,
                                    set: (v)=>{
                                        setTopicF(v);
                                        setPage(1);
                                    },
                                    opts: ALL_TOPICS
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
                                                fontFamily: "Manrope,sans-serif",
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: C.muted,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em"
                                            },
                                            children: f.label
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 633,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                            value: f.v,
                                            options: f.opts,
                                            onChange: f.set,
                                            width: 160
                                        }, void 0, false, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 635,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, f.label, true, {
                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                    lineNumber: 632,
                                    columnNumber: 15
                                }, this)),
                            activeFilters > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setSubjectF("All Subjects");
                                    setDiffF("All Difficulties");
                                    setTopicF("All Topics");
                                    setTypeF("All Types");
                                    setPage(1);
                                },
                                style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.red,
                                    padding: "8px 0",
                                    alignSelf: "flex-end"
                                },
                                children: "Clear all filters"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 639,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowFilterPanel(false),
                                style: {
                                    background: C.inputBg,
                                    border: "none",
                                    borderRadius: 10,
                                    padding: "8px 14px",
                                    fontFamily: "Manrope,sans-serif",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: C.muted,
                                    cursor: "pointer",
                                    alignSelf: "flex-end"
                                },
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 624,
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
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 12
                                },
                                children: [
                                    {
                                        label: "Total Questions",
                                        val: RAW_QUESTIONS.length,
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 668,
                                                columnNumber: 17
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
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                        lineNumber: 670,
                                                        columnNumber: 19
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
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 669,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.label, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 666,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 659,
                                columnNumber: 11
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 685,
                                                columnNumber: 17
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 684,
                                        columnNumber: 15
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 25
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 696,
                                                    columnNumber: 25
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 25
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 698,
                                                    columnNumber: 25
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 700,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 693,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 681,
                                columnNumber: 13
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
                                            gridTemplateColumns: "40px 1fr 140px 110px 130px 120px 100px",
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 20
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                    size: 16,
                                                    strokeWidth: 2,
                                                    color: C.muted
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 20
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 721,
                                                columnNumber: 15
                                            }, this),
                                            [
                                                "Question",
                                                "Subject",
                                                "Difficulty",
                                                "Topic",
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
                                                        textAlign: i === 5 ? "right" : "left"
                                                    },
                                                    children: h
                                                }, h, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 717,
                                        columnNumber: 13
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 743,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "Manrope,sans-serif",
                                                    fontSize: 13,
                                                    color: C.muted,
                                                    margin: 0
                                                },
                                                children: "Try adjusting your search or filters."
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 745,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 740,
                                        columnNumber: 15
                                    }, this) : paged.map((q, ri)=>{
                                        const isSelected = selected.has(q.id);
                                        const isHovered = hoveredRow === q.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onMouseEnter: ()=>setHoveredRow(q.id),
                                            onMouseLeave: ()=>setHoveredRow(null),
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "40px 1fr 140px 110px 130px 120px 100px",
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
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                        lineNumber: 767,
                                                        columnNumber: 24
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                        size: 16,
                                                        strokeWidth: 2,
                                                        color: isHovered ? C.navy : C.muted,
                                                        style: {
                                                            opacity: isHovered ? 0.4 : 0.3
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                        lineNumber: 768,
                                                        columnNumber: 24
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 19
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
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                            lineNumber: 773,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                gap: 5,
                                                                flexWrap: "wrap"
                                                            },
                                                            children: q.tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        background: C.inputBg,
                                                                        borderRadius: 5,
                                                                        padding: "2px 7px",
                                                                        fontFamily: "Manrope,sans-serif",
                                                                        fontSize: 10,
                                                                        fontWeight: 600,
                                                                        color: C.muted
                                                                    },
                                                                    children: [
                                                                        "#",
                                                                        t
                                                                    ]
                                                                }, t, true, {
                                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                                    lineNumber: 780,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                            lineNumber: 778,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 772,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SubjectBadge, {
                                                    subject: q.subject
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffBadge, {
                                                    difficulty: q.difficulty
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 789,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "Manrope,sans-serif",
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                        color: C.muted,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: q.topic
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypeChip, {
                                                    type: q.type
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 19
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
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                                lineNumber: 801,
                                                                columnNumber: 29
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
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                                lineNumber: 803,
                                                                columnNumber: 29
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
                                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                                lineNumber: 805,
                                                                columnNumber: 29
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
                                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, q.id, true, {
                                            fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                            lineNumber: 752,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 713,
                                columnNumber: 11
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 825,
                                                columnNumber: 23
                                            }, this),
                                            " ",
                                            "of ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                style: {
                                                    color: C.navy
                                                },
                                                children: filtered.length
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 826,
                                                columnNumber: 18
                                            }, this),
                                            " questions",
                                            activeFilters > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setSubjectF("All Subjects");
                                                    setDiffF("All Difficulties");
                                                    setTopicF("All Topics");
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
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 828,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 824,
                                        columnNumber: 13
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 841,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 836,
                                                columnNumber: 15
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 851,
                                                    columnNumber: 20
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 853,
                                                    columnNumber: 21
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
                                                    fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                    lineNumber: 868,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                                lineNumber: 863,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                        lineNumber: 835,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                                lineNumber: 822,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewModal, {
                q: preview,
                onClose: ()=>setPreview(null)
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 876,
                columnNumber: 17
            }, this),
            (showAdd || editQ) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionModal, {
                editing: editQ,
                onClose: ()=>{
                    setShowAdd(false);
                    setEditQ(undefined);
                }
            }, void 0, false, {
                fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
                lineNumber: 877,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/quizarenaremastered/frontend/src/components/QuestionBank.tsx",
        lineNumber: 573,
        columnNumber: 5
    }, this);
}
_s4(QuestionBank, "nMQb+rAZELojbTr0arUOCOeaBSc=");
_c8 = QuestionBank;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "SubjectBadge");
__turbopack_context__.k.register(_c1, "DiffBadge");
__turbopack_context__.k.register(_c2, "TypeChip");
__turbopack_context__.k.register(_c3, "Dropdown");
__turbopack_context__.k.register(_c4, "FilterChip");
__turbopack_context__.k.register(_c5, "PreviewModal");
__turbopack_context__.k.register(_c6, "QuestionModal");
__turbopack_context__.k.register(_c7, "Sidebar");
__turbopack_context__.k.register(_c8, "QuestionBank");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=quizarenaremastered_frontend_src_components_QuestionBank_tsx_1b2ekln._.js.map