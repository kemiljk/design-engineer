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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"e9d76aae87e0\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzP2ZhNDAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJlOWQ3NmFhZTg3ZTBcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/components/theme-switcher.tsx":
/*!*******************************************!*\
  !*** ./app/components/theme-switcher.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeSwitcher: function() { return /* binding */ ThemeSwitcher; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/switch/dist/chunk-N4MZXI4F.mjs\");\n/* harmony import */ var _barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=MoonIcon,SunIcon!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/sun.js\");\n/* harmony import */ var _barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=MoonIcon,SunIcon!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/moon.js\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-themes */ \"(app-pages-browser)/./node_modules/next-themes/dist/index.module.js\");\n/* __next_internal_client_entry_do_not_use__ ThemeSwitcher auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction ThemeSwitcher() {\n    _s();\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme)();\n    const handleThemeChange = (value)=>{\n        const newTheme = value ? \"light\" : \"dark\";\n        setTheme(newTheme);\n        localStorage.setItem(\"theme\", newTheme);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_2__.switch_default, {\n        defaultSelected: true,\n        size: \"sm\",\n        color: \"primary\",\n        startContent: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n            lineNumber: 21,\n            columnNumber: 21\n        }, void 0),\n        endContent: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n            lineNumber: 22,\n            columnNumber: 19\n        }, void 0),\n        onValueChange: handleThemeChange\n    }, void 0, false, {\n        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(ThemeSwitcher, \"5ABGV54qnXKp6rHn7MS/8MjwRhQ=\", false, function() {\n    return [\n        next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme\n    ];\n});\n_c = ThemeSwitcher;\nvar _c;\n$RefreshReg$(_c, \"ThemeSwitcher\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUUyQztBQUNNO0FBQ1Y7QUFFaEMsU0FBU0k7O0lBQ2QsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHSCxxREFBUUE7SUFFcEMsTUFBTUksb0JBQW9CLENBQUNDO1FBQ3pCLE1BQU1DLFdBQVdELFFBQVEsVUFBVTtRQUNuQ0YsU0FBU0c7UUFDVEMsYUFBYUMsT0FBTyxDQUFDLFNBQVNGO0lBQ2hDO0lBRUEscUJBQ0UsOERBQUNULDZEQUFNQTtRQUNMWSxlQUFlO1FBQ2ZDLE1BQUs7UUFDTEMsT0FBTTtRQUNOQyw0QkFBYyw4REFBQ2IsNEZBQU9BOzs7OztRQUN0QmMsMEJBQVksOERBQUNmLDRGQUFRQTs7Ozs7UUFDckJnQixlQUFlVjs7Ozs7O0FBR3JCO0dBbkJnQkg7O1FBQ2NELGlEQUFRQTs7O0tBRHRCQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy90aGVtZS1zd2l0Y2hlci50c3g/ZmY5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSBcIkBuZXh0dWktb3JnL3JlYWN0XCI7XG5pbXBvcnQgeyBNb29uSWNvbiwgU3VuSWNvbiB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSBcIm5leHQtdGhlbWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVtZVN3aXRjaGVyKCkge1xuICBjb25zdCB7IHRoZW1lLCBzZXRUaGVtZSB9ID0gdXNlVGhlbWUoKTtcblxuICBjb25zdCBoYW5kbGVUaGVtZUNoYW5nZSA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIGNvbnN0IG5ld1RoZW1lID0gdmFsdWUgPyBcImxpZ2h0XCIgOiBcImRhcmtcIjtcbiAgICBzZXRUaGVtZShuZXdUaGVtZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0aGVtZVwiLCBuZXdUaGVtZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoXG4gICAgICBkZWZhdWx0U2VsZWN0ZWRcbiAgICAgIHNpemU9XCJzbVwiXG4gICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgc3RhcnRDb250ZW50PXs8U3VuSWNvbiAvPn1cbiAgICAgIGVuZENvbnRlbnQ9ezxNb29uSWNvbiAvPn1cbiAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRoZW1lQ2hhbmdlfVxuICAgIC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiU3dpdGNoIiwiTW9vbkljb24iLCJTdW5JY29uIiwidXNlVGhlbWUiLCJUaGVtZVN3aXRjaGVyIiwidGhlbWUiLCJzZXRUaGVtZSIsImhhbmRsZVRoZW1lQ2hhbmdlIiwidmFsdWUiLCJuZXdUaGVtZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJkZWZhdWx0U2VsZWN0ZWQiLCJzaXplIiwiY29sb3IiLCJzdGFydENvbnRlbnQiLCJlbmRDb250ZW50Iiwib25WYWx1ZUNoYW5nZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/theme-switcher.tsx\n"));

/***/ })

});