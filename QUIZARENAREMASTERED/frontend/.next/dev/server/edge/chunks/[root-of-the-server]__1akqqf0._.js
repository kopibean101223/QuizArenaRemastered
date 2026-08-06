(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__1akqqf0._.js",
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/quizarenaremastered/frontend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/quizarenaremastered/frontend/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    let response = (void 0).next({
        request: {
            headers: request.headers
        }
    });
    // 1. Initialize Supabase client
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$quizarenaremastered$2f$frontend$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hewrwersffxbswgjrhaf.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhld3J3ZXJzZmZ4YnN3Z2pyaGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NTE4MjEsImV4cCI6MjA5OTMyNzgyMX0.q5WKiGuDxIzzJdZK6JgrAVkG-BL51lzwndMaype8-Vg"), {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                response = (void 0).next({
                    request
                });
                cookiesToSet.forEach(({ name, value, options })=>response.cookies.set(name, value, options));
            }
        }
    });
    // IMPORTANT: MUST use getUser() to validate auth on server
    const { data: { user } } = await supabase.auth.getUser();
    const url = request.nextUrl.clone();
    // 2. Resolve requested page state safely
    const pageParam = url.searchParams.get('page')?.toLowerCase();
    const pathName = url.pathname.toLowerCase().replace(/^\/+|\/+$/g, '') // Strips leading/trailing slashes clean
    ;
    // Explicitly identify routes
    const isAuthPage = pageParam === 'login' || pageParam === 'register' || pathName === 'login' || pathName === 'register';
    const isRolePage = pageParam === 'role' || pathName === 'role';
    const isRootPath = !pageParam && pathName === '';
    // Helper to construct clean redirect URL while PRESERVING updated auth cookies
    const redirectWithNoCache = (targetPage, extraParam)=>{
        const targetUrl = request.nextUrl.clone();
        targetUrl.pathname = '/';
        targetUrl.search = ''; // Clear existing params
        targetUrl.searchParams.set('page', targetPage);
        if (extraParam) {
            targetUrl.searchParams.set(extraParam.key, extraParam.val);
        }
        const redirectRes = (void 0).redirect(targetUrl);
        // FIX: Copy all updated session cookies from `response` to the redirect response
        response.cookies.getAll().forEach((cookie)=>{
            redirectRes.cookies.set(cookie.name, cookie.value, cookie);
        });
        // Prevent browser back-button caching
        redirectRes.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
        return redirectRes;
    };
    // ----------------------------------------------------
    // CASE A: Unauthenticated User
    // ----------------------------------------------------
    if (!user) {
        if (!isAuthPage) {
            return redirectWithNoCache('login');
        }
        return response;
    }
    // ----------------------------------------------------
    // CASE B: Authenticated User -> Lookup Role
    // ----------------------------------------------------
    let role = user.user_metadata?.role;
    if (!role) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('user_id', user.id).maybeSingle();
        role = profile?.role;
    }
    // ----------------------------------------------------
    // CASE C: Authenticated User WITHOUT Role
    // ----------------------------------------------------
    if (!role) {
        if (!isRolePage) {
            return redirectWithNoCache('role');
        }
        return response;
    }
    // ----------------------------------------------------
    // CASE D: Authenticated User WITH Role
    // ----------------------------------------------------
    const defaultPage = role === 'professor' ? 'dashboard' : 'lobby';
    // Block logged-in users from accessing Auth, Role selection, or Root '/'
    if (isAuthPage || isRolePage || isRootPath) {
        return redirectWithNoCache(defaultPage);
    }
    // Role authorization checks
    if ((pageParam === 'dashboard' || pathName === 'dashboard') && role !== 'professor') {
        return redirectWithNoCache('lobby', {
            key: 'error',
            val: 'unauthorized_professor'
        });
    }
    if ((pageParam === 'lobby' || pathName === 'lobby') && role !== 'student') {
        return redirectWithNoCache('dashboard', {
            key: 'error',
            val: 'unauthorized_student'
        });
    }
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    return response;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__1akqqf0._.js.map