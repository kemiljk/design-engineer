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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"8d5986115e72\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzP2ZhNDAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCI4ZDU5ODYxMTVlNzJcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./app/components/theme-switcher.tsx":
/*!*******************************************!*\
  !*** ./app/components/theme-switcher.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeSwitcher: function() { return /* binding */ ThemeSwitcher; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/select/dist/chunk-ZFWMN6TD.mjs\");\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/listbox/dist/chunk-VHPYXGWP.mjs\");\n/* harmony import */ var _barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=MoonIcon,SunIcon!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/sun.js\");\n/* harmony import */ var _barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=MoonIcon,SunIcon!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/moon.js\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-themes */ \"(app-pages-browser)/./node_modules/next-themes/dist/index.module.js\");\n// app/components/ThemeSwitcher.tsx\n/* __next_internal_client_entry_do_not_use__ ThemeSwitcher auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction ThemeSwitcher() {\n    _s();\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme)();\n    const themes = [\n        {\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                className: \"size-4\"\n            }, void 0, false, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n                lineNumber: 12,\n                columnNumber: 13\n            }, this),\n            value: \"light\",\n            label: \"Light\"\n        },\n        {\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_MoonIcon_SunIcon_lucide_react__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                className: \"size-4\"\n            }, void 0, false, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n                lineNumber: 13,\n                columnNumber: 13\n            }, this),\n            value: \"dark\",\n            label: \"Dark\"\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_4__.select_default, {\n        size: \"sm\",\n        variant: \"faded\",\n        value: theme,\n        placeholder: theme,\n        items: themes,\n        radius: \"lg\",\n        onChange: (e)=>setTheme(e.target.value),\n        children: (theme)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_5__.listbox_item_base_default, {\n                value: theme.value,\n                startContent: theme.icon,\n                children: theme.label\n            }, theme.value, false, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n                lineNumber: 27,\n                columnNumber: 9\n            }, this)\n    }, void 0, false, {\n        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/theme-switcher.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(ThemeSwitcher, \"5ABGV54qnXKp6rHn7MS/8MjwRhQ=\", false, function() {\n    return [\n        next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme\n    ];\n});\n_c = ThemeSwitcher;\nvar _c;\n$RefreshReg$(_c, \"ThemeSwitcher\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQW1DOzs7QUFHb0I7QUFDTjtBQUNWO0FBRWhDLFNBQVNLOztJQUNkLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBR0gscURBQVFBO0lBRXBDLE1BQU1JLFNBQVM7UUFDYjtZQUFFQyxvQkFBTSw4REFBQ04sNEZBQU9BO2dCQUFDTyxXQUFVOzs7Ozs7WUFBYUMsT0FBTztZQUFTQyxPQUFPO1FBQVE7UUFDdkU7WUFBRUgsb0JBQU0sOERBQUNQLDRGQUFRQTtnQkFBQ1EsV0FBVTs7Ozs7O1lBQWFDLE9BQU87WUFBUUMsT0FBTztRQUFPO0tBQ3ZFO0lBRUQscUJBQ0UsOERBQUNaLDZEQUFNQTtRQUNMYSxNQUFLO1FBQ0xDLFNBQVE7UUFDUkgsT0FBT0w7UUFDUFMsYUFBYVQ7UUFDYlUsT0FBT1I7UUFDUFMsUUFBTztRQUNQQyxVQUFVLENBQUNDLElBQU1aLFNBQVNZLEVBQUVDLE1BQU0sQ0FBQ1QsS0FBSztrQkFFdkMsQ0FBQ0wsc0JBQ0EsOERBQUNMLHdFQUFVQTtnQkFFVFUsT0FBT0wsTUFBTUssS0FBSztnQkFDbEJVLGNBQWNmLE1BQU1HLElBQUk7MEJBRXZCSCxNQUFNTSxLQUFLO2VBSlBOLE1BQU1LLEtBQUs7Ozs7Ozs7Ozs7QUFTMUI7R0E3QmdCTjs7UUFDY0QsaURBQVFBOzs7S0FEdEJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL3RoZW1lLXN3aXRjaGVyLnRzeD9mZjk5Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9jb21wb25lbnRzL1RoZW1lU3dpdGNoZXIudHN4XG5cInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgU2VsZWN0LCBTZWxlY3RJdGVtIH0gZnJvbSBcIkBuZXh0dWktb3JnL3JlYWN0XCI7XG5pbXBvcnQgeyBNb29uSWNvbiwgU3VuSWNvbiB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSBcIm5leHQtdGhlbWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVtZVN3aXRjaGVyKCkge1xuICBjb25zdCB7IHRoZW1lLCBzZXRUaGVtZSB9ID0gdXNlVGhlbWUoKTtcblxuICBjb25zdCB0aGVtZXMgPSBbXG4gICAgeyBpY29uOiA8U3VuSWNvbiBjbGFzc05hbWU9XCJzaXplLTRcIiAvPiwgdmFsdWU6IFwibGlnaHRcIiwgbGFiZWw6IFwiTGlnaHRcIiB9LFxuICAgIHsgaWNvbjogPE1vb25JY29uIGNsYXNzTmFtZT1cInNpemUtNFwiIC8+LCB2YWx1ZTogXCJkYXJrXCIsIGxhYmVsOiBcIkRhcmtcIiB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPFNlbGVjdFxuICAgICAgc2l6ZT1cInNtXCJcbiAgICAgIHZhcmlhbnQ9XCJmYWRlZFwiXG4gICAgICB2YWx1ZT17dGhlbWV9XG4gICAgICBwbGFjZWhvbGRlcj17dGhlbWV9XG4gICAgICBpdGVtcz17dGhlbWVzfVxuICAgICAgcmFkaXVzPVwibGdcIlxuICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRUaGVtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgPlxuICAgICAgeyh0aGVtZSkgPT4gKFxuICAgICAgICA8U2VsZWN0SXRlbVxuICAgICAgICAgIGtleT17dGhlbWUudmFsdWV9XG4gICAgICAgICAgdmFsdWU9e3RoZW1lLnZhbHVlfVxuICAgICAgICAgIHN0YXJ0Q29udGVudD17dGhlbWUuaWNvbn1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGVtZS5sYWJlbH1cbiAgICAgICAgPC9TZWxlY3RJdGVtPlxuICAgICAgKX1cbiAgICA8L1NlbGVjdD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJTZWxlY3QiLCJTZWxlY3RJdGVtIiwiTW9vbkljb24iLCJTdW5JY29uIiwidXNlVGhlbWUiLCJUaGVtZVN3aXRjaGVyIiwidGhlbWUiLCJzZXRUaGVtZSIsInRoZW1lcyIsImljb24iLCJjbGFzc05hbWUiLCJ2YWx1ZSIsImxhYmVsIiwic2l6ZSIsInZhcmlhbnQiLCJwbGFjZWhvbGRlciIsIml0ZW1zIiwicmFkaXVzIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0Iiwic3RhcnRDb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/theme-switcher.tsx\n"));

/***/ })

});