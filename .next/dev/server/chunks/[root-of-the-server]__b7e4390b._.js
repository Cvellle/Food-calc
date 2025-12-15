module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/Next-App/src/i18n/routing.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/Desktop/Next-App/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware] (ecmascript) <export default as defineRouting>");
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        'en',
        'it',
        'sr'
    ],
    defaultLocale: 'en',
    localePrefix: process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never' ? 'never' : {
        mode: 'as-needed',
        prefixes: {
            it: '/it'
        }
    },
    domains: process.env.NEXT_PUBLIC_USE_CASE === 'domains' ? [
        {
            domain: 'example.com',
            defaultLocale: 'en',
            locales: [
                'en',
                'it',
                'sr'
            ]
        },
        {
            domain: 'example.de',
            defaultLocale: 'it',
            locales: [
                'it'
            ]
        }
    ] : undefined,
    pathnames: {
        '/': '/',
        '/client': '/client',
        '/about': '/about',
        '/client/redirect': '/client/redirect',
        '/nested': {
            en: '/nested',
            de: '/verschachtelt',
            es: '/anidada',
            ja: '/ネスト'
        },
        '/redirect': '/redirect',
        '/news/[articleId]': {
            en: '/news/[articleId]',
            de: '/neuigkeiten/[articleId]',
            es: '/noticias/[articleId]',
            ja: '/ニュース/[articleId]'
        },
        '/news/just-in': {
            en: '/news/just-in',
            de: '/neuigkeiten/aktuell',
            es: '/noticias/justo-en',
            ja: '/ニュース/現在'
        }
    },
    localeCookie: process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false' ? false : {
        // 200 days
        maxAge: 200 * 24 * 60 * 60
    }
});
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/Next-App/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next-App/src/i18n/routing.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next-App/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next-App/node_modules/next/server.js [middleware] (ecmascript)");
;
;
;
async function middleware(request) {
    const handleI18nRouting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"]);
    let response = handleI18nRouting(request);
    // Additional rewrite when v2 cookie is set
    if (response.ok) {
        // (not for errors or redirects)
        const [, locale, ...rest] = new URL(response.headers.get('x-middleware-rewrite') || request.url).pathname.split('/');
        const pathname = '/' + rest.join('/');
        if (pathname === '/about' && request.cookies.get('v2')?.value === 'true') {
            response = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2d$App$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL(`/${locale}/about/v2`, request.url), {
                headers: response.headers
            });
        }
    }
    return response;
}
const config = {
    matcher: [
        // Skip all paths that should not be internationalized
        '/((?!_next|.*/opengraph-image|.*\\..*).*)',
        // Necessary for base path to work
        '/'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b7e4390b._.js.map