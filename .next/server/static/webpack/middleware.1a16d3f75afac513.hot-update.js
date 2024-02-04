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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/index.js\");\n\n// This example protects all routes including api/trpc routes\n// Please edit this to allow other routes to be public as needed.\n// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__.authMiddleware)({\n    // publicRoutes: (req) => !req.url.includes(\"/stats\"),\n    publicRoutes: (req)=>!req.url.includes(\"/old\")\n}));\nconst config = {\n    matcher: [\n        \"/((?!.+\\\\.[\\\\w]+$|_next).*)\",\n        \"/\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFFL0MsNkRBQTZEO0FBQzdELGlFQUFpRTtBQUNqRSxzSEFBc0g7QUFDdEgsaUVBQWVBLDZEQUFjQSxDQUFDO0lBQzVCLHNEQUFzRDtJQUN0REMsY0FBYyxDQUFDQyxNQUFRLENBQUNBLElBQUlDLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDO0FBQzNDLEVBQUUsRUFBQztBQUVJLE1BQU1DLFNBQVM7SUFDcEJDLFNBQVM7UUFBQztRQUErQjtRQUFLO0tBQWtCO0FBQ2xFLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dGhNaWRkbGV3YXJlIH0gZnJvbSBcIkBjbGVyay9uZXh0anNcIjtcblxuLy8gVGhpcyBleGFtcGxlIHByb3RlY3RzIGFsbCByb3V0ZXMgaW5jbHVkaW5nIGFwaS90cnBjIHJvdXRlc1xuLy8gUGxlYXNlIGVkaXQgdGhpcyB0byBhbGxvdyBvdGhlciByb3V0ZXMgdG8gYmUgcHVibGljIGFzIG5lZWRlZC5cbi8vIFNlZSBodHRwczovL2NsZXJrLmNvbS9kb2NzL3JlZmVyZW5jZXMvbmV4dGpzL2F1dGgtbWlkZGxld2FyZSBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBjb25maWd1cmluZyB5b3VyIE1pZGRsZXdhcmVcbmV4cG9ydCBkZWZhdWx0IGF1dGhNaWRkbGV3YXJlKHtcbiAgLy8gcHVibGljUm91dGVzOiAocmVxKSA9PiAhcmVxLnVybC5pbmNsdWRlcyhcIi9zdGF0c1wiKSxcbiAgcHVibGljUm91dGVzOiAocmVxKSA9PiAhcmVxLnVybC5pbmNsdWRlcyhcIi9vbGRcIiksXG59KTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgbWF0Y2hlcjogW1wiLygoPyEuK1xcXFwuW1xcXFx3XSskfF9uZXh0KS4qKVwiLCBcIi9cIiwgXCIvKGFwaXx0cnBjKSguKilcIl0sXG59O1xuIl0sIm5hbWVzIjpbImF1dGhNaWRkbGV3YXJlIiwicHVibGljUm91dGVzIiwicmVxIiwidXJsIiwiaW5jbHVkZXMiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});