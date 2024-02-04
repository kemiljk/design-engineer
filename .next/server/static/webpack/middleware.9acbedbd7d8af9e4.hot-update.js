"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/index.js\");\n\n// This example protects all routes including api/trpc routes\n// Please edit this to allow other routes to be public as needed.\n// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__.authMiddleware)({\n    publicRoutes: (req)=>!req.url.includes(\"/stats\")\n}));\nconst config = {\n    matcher: [\n        \"/((?!.+\\\\.[\\\\w]+$|_next).*)\",\n        \"/\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFFL0MsNkRBQTZEO0FBQzdELGlFQUFpRTtBQUNqRSxzSEFBc0g7QUFDdEgsaUVBQWVBLDZEQUFjQSxDQUFDO0lBQzVCQyxjQUFjLENBQUNDLE1BQVEsQ0FBQ0EsSUFBSUMsR0FBRyxDQUFDQyxRQUFRLENBQUM7QUFDM0MsRUFBRSxFQUFDO0FBRUksTUFBTUMsU0FBUztJQUNwQkMsU0FBUztRQUFDO1FBQStCO1FBQUs7S0FBa0I7QUFDbEUsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9taWRkbGV3YXJlLnRzPzQyMmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0aE1pZGRsZXdhcmUgfSBmcm9tIFwiQGNsZXJrL25leHRqc1wiO1xuXG4vLyBUaGlzIGV4YW1wbGUgcHJvdGVjdHMgYWxsIHJvdXRlcyBpbmNsdWRpbmcgYXBpL3RycGMgcm91dGVzXG4vLyBQbGVhc2UgZWRpdCB0aGlzIHRvIGFsbG93IG90aGVyIHJvdXRlcyB0byBiZSBwdWJsaWMgYXMgbmVlZGVkLlxuLy8gU2VlIGh0dHBzOi8vY2xlcmsuY29tL2RvY3MvcmVmZXJlbmNlcy9uZXh0anMvYXV0aC1taWRkbGV3YXJlIGZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGNvbmZpZ3VyaW5nIHlvdXIgTWlkZGxld2FyZVxuZXhwb3J0IGRlZmF1bHQgYXV0aE1pZGRsZXdhcmUoe1xuICBwdWJsaWNSb3V0ZXM6IChyZXEpID0+ICFyZXEudXJsLmluY2x1ZGVzKFwiL3N0YXRzXCIpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG1hdGNoZXI6IFtcIi8oKD8hLitcXFxcLltcXFxcd10rJHxfbmV4dCkuKilcIiwgXCIvXCIsIFwiLyhhcGl8dHJwYykoLiopXCJdLFxufTtcbiJdLCJuYW1lcyI6WyJhdXRoTWlkZGxld2FyZSIsInB1YmxpY1JvdXRlcyIsInJlcSIsInVybCIsImluY2x1ZGVzIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});