"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/stories/[slug]/page",{

/***/ "(app-pages-browser)/./app/components/story-title.tsx":
/*!****************************************!*\
  !*** ./app/components/story-title.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   StoryTitle: function() { return /* binding */ StoryTitle; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/dom/motion.mjs\");\n/* __next_internal_client_entry_do_not_use__ StoryTitle auto */ \nvar _s = $RefreshSig$();\n\n\nfunction throttle(func, limit) {\n    let inThrottle;\n    return function() {\n        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){\n            args[_key] = arguments[_key];\n        }\n        if (!inThrottle) {\n            func.apply(this, args);\n            inThrottle = true;\n            setTimeout(()=>inThrottle = false, limit);\n        }\n    };\n}\nconst StoryTitle = (param)=>{\n    let { story } = param;\n    _s();\n    const [isSticky, setSticky] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const checkStickiness = ()=>{\n        if (ref.current) {\n            setSticky(ref.current.getBoundingClientRect().top <= 12);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(()=>{\n        const debouncedHandleScroll = throttle(checkStickiness, 10); // Adjust debounce time as needed\n        window.addEventListener(\"scroll\", debouncedHandleScroll);\n        return ()=>{\n            window.removeEventListener(\"scroll\", debouncedHandleScroll);\n        };\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"sticky top-1 z-[9999999] h-full\",\n        ref: ref,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.h1, {\n            className: \"flex flex-col items-start text-5xl tracking-tight text-black dark:text-white\",\n            animate: {\n                scale: isSticky ? 0.5 : 1,\n                fontWeight: isSticky ? 600 : 800,\n                x: isSticky ? -240 : 0\n            },\n            transition: {\n                duration: 0.2\n            },\n            children: story.title\n        }, void 0, false, {\n            fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/story-title.tsx\",\n            lineNumber: 40,\n            columnNumber: 7\n        }, undefined)\n    }, story.id, false, {\n        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/story-title.tsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, undefined);\n};\n_s(StoryTitle, \"snCF1WA1PesI0S7kIVgqGv1jaiM=\");\n_c = StoryTitle;\nvar _c;\n$RefreshReg$(_c, \"StoryTitle\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3N0b3J5LXRpdGxlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ2lFO0FBQzFCO0FBR3ZDLFNBQVNLLFNBQ1BDLElBQU8sRUFDUEMsS0FBYTtJQUViLElBQUlDO0lBQ0osT0FBTztRQUFxQjtZQUFHQyxLQUFILHVCQUFzQjs7UUFDaEQsSUFBSSxDQUFDRCxZQUFZO1lBQ2ZGLEtBQUtJLEtBQUssQ0FBQyxJQUFJLEVBQUVEO1lBQ2pCRCxhQUFhO1lBQ2JHLFdBQVcsSUFBT0gsYUFBYSxPQUFRRDtRQUN6QztJQUNGO0FBQ0Y7QUFFTyxNQUFNSyxhQUFhO1FBQUMsRUFBRUMsS0FBSyxFQUF5Qjs7SUFDekQsTUFBTSxDQUFDQyxVQUFVQyxVQUFVLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU1hLE1BQU1kLDZDQUFNQSxDQUFpQjtJQUVuQyxNQUFNZSxrQkFBa0I7UUFDdEIsSUFBSUQsSUFBSUUsT0FBTyxFQUFFO1lBQ2ZILFVBQVVDLElBQUlFLE9BQU8sQ0FBQ0MscUJBQXFCLEdBQUdDLEdBQUcsSUFBSTtRQUN2RDtJQUNGO0lBRUFuQixzREFBZUEsQ0FBQztRQUNkLE1BQU1vQix3QkFBd0JoQixTQUFTWSxpQkFBaUIsS0FBSyxpQ0FBaUM7UUFDOUZLLE9BQU9DLGdCQUFnQixDQUFDLFVBQVVGO1FBQ2xDLE9BQU87WUFDTEMsT0FBT0UsbUJBQW1CLENBQUMsVUFBVUg7UUFDdkM7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0k7UUFBbUJDLFdBQVU7UUFBa0NWLEtBQUtBO2tCQUNuRSw0RUFBQ1osaURBQU1BLENBQUN1QixFQUFFO1lBQ1JELFdBQVk7WUFDWkUsU0FBUztnQkFDUEMsT0FBT2YsV0FBVyxNQUFNO2dCQUN4QmdCLFlBQVloQixXQUFXLE1BQU07Z0JBQzdCaUIsR0FBR2pCLFdBQVcsQ0FBQyxNQUFNO1lBQ3ZCO1lBQ0FrQixZQUFZO2dCQUFFQyxVQUFVO1lBQUk7c0JBRTNCcEIsTUFBTXFCLEtBQUs7Ozs7OztPQVZOckIsTUFBTXNCLEVBQUU7Ozs7O0FBY3RCLEVBQUU7R0FqQ1d2QjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9zdG9yeS10aXRsZS50c3g/YjEyNyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgKiBhcyBUeXBlIGZyb20gXCJAL2xpYi90eXBlc1wiO1xuXG5mdW5jdGlvbiB0aHJvdHRsZTxGIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPihcbiAgZnVuYzogRixcbiAgbGltaXQ6IG51bWJlcixcbik6ICguLi5hcmdzOiBQYXJhbWV0ZXJzPEY+KSA9PiB2b2lkIHtcbiAgbGV0IGluVGhyb3R0bGU6IGJvb2xlYW47XG4gIHJldHVybiBmdW5jdGlvbiAodGhpczogYW55LCAuLi5hcmdzOiBQYXJhbWV0ZXJzPEY+KSB7XG4gICAgaWYgKCFpblRocm90dGxlKSB7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgaW5UaHJvdHRsZSA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IChpblRocm90dGxlID0gZmFsc2UpLCBsaW1pdCk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgU3RvcnlUaXRsZSA9ICh7IHN0b3J5IH06IHsgc3Rvcnk6IFR5cGUuU3RvcnkgfSkgPT4ge1xuICBjb25zdCBbaXNTdGlja3ksIHNldFN0aWNreV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgY2hlY2tTdGlja2luZXNzID0gKCkgPT4ge1xuICAgIGlmIChyZWYuY3VycmVudCkge1xuICAgICAgc2V0U3RpY2t5KHJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8PSAxMik7XG4gICAgfVxuICB9O1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGVib3VuY2VkSGFuZGxlU2Nyb2xsID0gdGhyb3R0bGUoY2hlY2tTdGlja2luZXNzLCAxMCk7IC8vIEFkanVzdCBkZWJvdW5jZSB0aW1lIGFzIG5lZWRlZFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRlYm91bmNlZEhhbmRsZVNjcm9sbCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGRlYm91bmNlZEhhbmRsZVNjcm9sbCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBrZXk9e3N0b3J5LmlkfSBjbGFzc05hbWU9XCJzdGlja3kgdG9wLTEgei1bOTk5OTk5OV0gaC1mdWxsXCIgcmVmPXtyZWZ9PlxuICAgICAgPG1vdGlvbi5oMVxuICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sIGl0ZW1zLXN0YXJ0IHRleHQtNXhsIHRyYWNraW5nLXRpZ2h0IHRleHQtYmxhY2sgZGFyazp0ZXh0LXdoaXRlYH1cbiAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgIHNjYWxlOiBpc1N0aWNreSA/IDAuNSA6IDEsXG4gICAgICAgICAgZm9udFdlaWdodDogaXNTdGlja3kgPyA2MDAgOiA4MDAsXG4gICAgICAgICAgeDogaXNTdGlja3kgPyAtMjQwIDogMCxcbiAgICAgICAgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4yIH19XG4gICAgICA+XG4gICAgICAgIHtzdG9yeS50aXRsZX1cbiAgICAgIDwvbW90aW9uLmgxPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUxheW91dEVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwibW90aW9uIiwidGhyb3R0bGUiLCJmdW5jIiwibGltaXQiLCJpblRocm90dGxlIiwiYXJncyIsImFwcGx5Iiwic2V0VGltZW91dCIsIlN0b3J5VGl0bGUiLCJzdG9yeSIsImlzU3RpY2t5Iiwic2V0U3RpY2t5IiwicmVmIiwiY2hlY2tTdGlja2luZXNzIiwiY3VycmVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsImRlYm91bmNlZEhhbmRsZVNjcm9sbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJhbmltYXRlIiwic2NhbGUiLCJmb250V2VpZ2h0IiwieCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInRpdGxlIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/story-title.tsx\n"));

/***/ })

});