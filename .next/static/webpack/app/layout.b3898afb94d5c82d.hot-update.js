"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"df1442b520c2\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzP2ZhNDAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJkZjE0NDJiNTIwYzJcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/components/theme-switcher.tsx":
/*!*******************************************!*\
  !*** ./app/components/theme-switcher.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeSwitcher: function() { return /* binding */ ThemeSwitcher; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/select/dist/chunk-ZFWMN6TD.mjs\");\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/listbox/dist/chunk-VHPYXGWP.mjs\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-themes */ \"(app-pages-browser)/./node_modules/next-themes/dist/index.module.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n// app/components/ThemeSwitcher.tsx\n/* __next_internal_client_entry_do_not_use__ ThemeSwitcher auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction ThemeSwitcher() {\n    _s();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        setMounted(true);\n    }, []);\n    if (!mounted) return null;\n    const themes = [\n        {\n            value: \"light\",\n            label: \"Light\"\n        },\n        {\n            value: \"dark\",\n            label: \"Dark\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_3__.select_default, {\n        size: \"md\",\n        value: theme || \"light\",\n        items: themes,\n        onChange: (e)=>setTheme(e.target.value),\n        children: (theme)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_4__.listbox_item_base_default, {\n                value: theme.value,\n                children: theme.label\n            }, theme.value, false, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, this)\n    }, void 0, false, {\n        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n_s(ThemeSwitcher, \"CybB+IJKIQO7hXpeRHYgsUfxw+s=\", false, function() {\n    return [\n        next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme\n    ];\n});\n_c = ThemeSwitcher;\nvar _c;\n$RefreshReg$(_c, \"ThemeSwitcher\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQW1DOzs7QUFHb0I7QUFDaEI7QUFDSztBQUVyQyxTQUFTSzs7SUFDZCxNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR0gsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxFQUFFSSxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHUCxxREFBUUE7SUFFcENDLGdEQUFTQSxDQUFDO1FBQ1JJLFdBQVc7SUFDYixHQUFHLEVBQUU7SUFFTCxJQUFJLENBQUNELFNBQVMsT0FBTztJQUVyQixNQUFNSSxTQUFTO1FBQ2I7WUFBRUMsT0FBTztZQUFTQyxPQUFPO1FBQVE7UUFDakM7WUFBRUQsT0FBTztZQUFRQyxPQUFPO1FBQU87S0FDaEM7SUFFRCxxQkFDRSw4REFBQ1osNkRBQU1BO1FBQ0xhLE1BQUs7UUFDTEYsT0FBT0gsU0FBUztRQUNoQk0sT0FBT0o7UUFDUEssVUFBVSxDQUFDQyxJQUFNUCxTQUFTTyxFQUFFQyxNQUFNLENBQUNOLEtBQUs7a0JBRXZDLENBQUNILHNCQUNBLDhEQUFDUCx3RUFBVUE7Z0JBQW1CVSxPQUFPSCxNQUFNRyxLQUFLOzBCQUM3Q0gsTUFBTUksS0FBSztlQURHSixNQUFNRyxLQUFLOzs7Ozs7Ozs7O0FBTXBDO0dBN0JnQk47O1FBRWNILGlEQUFRQTs7O0tBRnRCRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy90aGVtZS1zd2l0Y2hlci50c3g/ZmY5OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvY29tcG9uZW50cy9UaGVtZVN3aXRjaGVyLnRzeFxuXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlbGVjdCwgU2VsZWN0SXRlbSB9IGZyb20gXCJAbmV4dHVpLW9yZy9yZWFjdFwiO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tIFwibmV4dC10aGVtZXNcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIFRoZW1lU3dpdGNoZXIoKSB7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyB0aGVtZSwgc2V0VGhlbWUgfSA9IHVzZVRoZW1lKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRNb3VudGVkKHRydWUpO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFtb3VudGVkKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0aGVtZXMgPSBbXG4gICAgeyB2YWx1ZTogXCJsaWdodFwiLCBsYWJlbDogXCJMaWdodFwiIH0sXG4gICAgeyB2YWx1ZTogXCJkYXJrXCIsIGxhYmVsOiBcIkRhcmtcIiB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdFxuICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgIHZhbHVlPXt0aGVtZSB8fCBcImxpZ2h0XCJ9XG4gICAgICBpdGVtcz17dGhlbWVzfVxuICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUaGVtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAgeyh0aGVtZSkgPT4gKFxuICAgICAgICA8U2VsZWN0SXRlbSBrZXk9e3RoZW1lLnZhbHVlfSB2YWx1ZT17dGhlbWUudmFsdWV9PlxuICAgICAgICAgIHt0aGVtZS5sYWJlbH1cbiAgICAgICAgPC9TZWxlY3RJdGVtPlxuICAgICAgKX1cbiAgICA8L1NlbGVjdD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJTZWxlY3QiLCJTZWxlY3RJdGVtIiwidXNlVGhlbWUiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlRoZW1lU3dpdGNoZXIiLCJtb3VudGVkIiwic2V0TW91bnRlZCIsInRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZXMiLCJ2YWx1ZSIsImxhYmVsIiwic2l6ZSIsIml0ZW1zIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/theme-switcher.tsx\n"));

/***/ })

});