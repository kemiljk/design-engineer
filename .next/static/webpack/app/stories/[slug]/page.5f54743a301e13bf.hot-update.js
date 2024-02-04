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

/***/ "(app-pages-browser)/./app/components/qna-block.tsx":
/*!**************************************!*\
  !*** ./app/components/qna-block.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   QnABlock: function() { return /* binding */ QnABlock; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _nextui_org_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextui-org/react */ \"(app-pages-browser)/./node_modules/@nextui-org/avatar/dist/chunk-XBMXQVV7.mjs\");\n/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-markdown */ \"(app-pages-browser)/./node_modules/react-markdown/lib/index.js\");\n/* __next_internal_client_entry_do_not_use__ QnABlock auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst QnABlock = (param)=>{\n    let { story, metadata, qna } = param;\n    _s();\n    const questionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const [questionHeight, setQuestionHeight] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (questionRef.current) {\n            setQuestionHeight(questionRef.current.offsetHeight);\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"mt-6 space-y-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                ref: questionRef,\n                className: \"sticky top-14 flex h-max items-center gap-4 bg-white py-2 dark:bg-black\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_2__.avatar_default, {\n                        className: \"bg-zinc-100 dark:bg-zinc-800\",\n                        src: metadata.logo.imgix_url\n                    }, void 0, false, {\n                        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        className: \"text-lg font-medium leading-snug text-black dark:text-white md:text-xl \",\n                        children: qna.question\n                    }, void 0, false, {\n                        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-start gap-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_nextui_org_react__WEBPACK_IMPORTED_MODULE_2__.avatar_default, {\n                        className: \"sticky\",\n                        style: {\n                            top: questionHeight + 56\n                        },\n                        src: story.metadata.design_engineer.metadata.image.imgix_url\n                    }, void 0, false, {\n                        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                        lineNumber: 42,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_markdown__WEBPACK_IMPORTED_MODULE_3__.Markdown, {\n                        className: \"space-y-4 text-zinc-700 dark:text-zinc-300\",\n                        children: qna.answer\n                    }, qna.question, false, {\n                        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, qna.question, true, {\n        fileName: \"/Users/karlkoch/Developer/design-engineer/app/components/qna-block.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, undefined);\n};\n_s(QnABlock, \"z9Y5C5SLFJVuR/xfNkSkt6xCk8E=\");\n_c = QnABlock;\nvar _c;\n$RefreshReg$(_c, \"QnABlock\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3FuYS1ibG9jay50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFMkQ7QUFDaEI7QUFDTDtBQUcvQixNQUFNTSxXQUFXO1FBQUMsRUFDdkJDLEtBQUssRUFDTEMsUUFBUSxFQUNSQyxHQUFHLEVBS0o7O0lBQ0MsTUFBTUMsY0FBY1IsNkNBQU1BLENBQWlCO0lBQzNDLE1BQU0sQ0FBQ1MsZ0JBQWdCQyxrQkFBa0IsR0FBR1QsK0NBQVFBLENBQUM7SUFFckRGLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSVMsWUFBWUcsT0FBTyxFQUFFO1lBQ3ZCRCxrQkFBa0JGLFlBQVlHLE9BQU8sQ0FBQ0MsWUFBWTtRQUNwRDtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDQztRQUF1QkMsV0FBVTs7MEJBQ2hDLDhEQUFDRDtnQkFDQ0UsS0FBS1A7Z0JBQ0xNLFdBQVU7O2tDQUVWLDhEQUFDWiw2REFBTUE7d0JBQ0xZLFdBQVU7d0JBQ1ZFLEtBQUtWLFNBQVNXLElBQUksQ0FBQ0MsU0FBUzs7Ozs7O2tDQUU5Qiw4REFBQ0M7d0JBQUdMLFdBQVU7a0NBQ1hQLElBQUlhLFFBQVE7Ozs7Ozs7Ozs7OzswQkFJakIsOERBQUNQO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ1osNkRBQU1BO3dCQUNMWSxXQUFVO3dCQUNWTyxPQUFPOzRCQUFFQyxLQUFLYixpQkFBaUI7d0JBQUc7d0JBQ2xDTyxLQUFLWCxNQUFNQyxRQUFRLENBQUNpQixlQUFlLENBQUNqQixRQUFRLENBQUNrQixLQUFLLENBQUNOLFNBQVM7Ozs7OztrQ0FFOUQsOERBQUNmLG9EQUFRQTt3QkFFUFcsV0FBVTtrQ0FFVFAsSUFBSWtCLE1BQU07dUJBSE5sQixJQUFJYSxRQUFROzs7Ozs7Ozs7Ozs7T0FyQmJiLElBQUlhLFFBQVE7Ozs7O0FBNkIxQixFQUFFO0dBaERXaEI7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2NvbXBvbmVudHMvcW5hLWJsb2NrLnRzeD83NTMyIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tIFwiQG5leHR1aS1vcmcvcmVhY3RcIjtcbmltcG9ydCBNYXJrZG93biBmcm9tIFwicmVhY3QtbWFya2Rvd25cIjtcbmltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkAvbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBRbkFCbG9jayA9ICh7XG4gIHN0b3J5LFxuICBtZXRhZGF0YSxcbiAgcW5hLFxufToge1xuICBzdG9yeTogVHlwZS5TdG9yeTtcbiAgbWV0YWRhdGE6IGFueTtcbiAgcW5hOiBUeXBlLlN0b3J5W1wibWV0YWRhdGFcIl1bXCJxbmFcIl1bXCJtZXRhZGF0YVwiXVtcInFuYVwiXVswXTtcbn0pID0+IHtcbiAgY29uc3QgcXVlc3Rpb25SZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbcXVlc3Rpb25IZWlnaHQsIHNldFF1ZXN0aW9uSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHF1ZXN0aW9uUmVmLmN1cnJlbnQpIHtcbiAgICAgIHNldFF1ZXN0aW9uSGVpZ2h0KHF1ZXN0aW9uUmVmLmN1cnJlbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYga2V5PXtxbmEucXVlc3Rpb259IGNsYXNzTmFtZT1cIm10LTYgc3BhY2UteS00XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17cXVlc3Rpb25SZWZ9XG4gICAgICAgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AtMTQgZmxleCBoLW1heCBpdGVtcy1jZW50ZXIgZ2FwLTQgYmctd2hpdGUgcHktMiBkYXJrOmJnLWJsYWNrXCJcbiAgICAgID5cbiAgICAgICAgPEF2YXRhclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXppbmMtMTAwIGRhcms6YmctemluYy04MDBcIlxuICAgICAgICAgIHNyYz17bWV0YWRhdGEubG9nby5pbWdpeF91cmx9XG4gICAgICAgIC8+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIGxlYWRpbmctc251ZyB0ZXh0LWJsYWNrIGRhcms6dGV4dC13aGl0ZSBtZDp0ZXh0LXhsIFwiPlxuICAgICAgICAgIHtxbmEucXVlc3Rpb259XG4gICAgICAgIDwvaDM+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00XCI+XG4gICAgICAgIDxBdmF0YXJcbiAgICAgICAgICBjbGFzc05hbWU9XCJzdGlja3lcIlxuICAgICAgICAgIHN0eWxlPXt7IHRvcDogcXVlc3Rpb25IZWlnaHQgKyA1NiB9fVxuICAgICAgICAgIHNyYz17c3RvcnkubWV0YWRhdGEuZGVzaWduX2VuZ2luZWVyLm1ldGFkYXRhLmltYWdlLmltZ2l4X3VybH1cbiAgICAgICAgPjwvQXZhdGFyPlxuICAgICAgICA8TWFya2Rvd25cbiAgICAgICAgICBrZXk9e3FuYS5xdWVzdGlvbn1cbiAgICAgICAgICBjbGFzc05hbWU9XCJzcGFjZS15LTQgdGV4dC16aW5jLTcwMCBkYXJrOnRleHQtemluYy0zMDBcIlxuICAgICAgICA+XG4gICAgICAgICAge3FuYS5hbnN3ZXJ9XG4gICAgICAgIDwvTWFya2Rvd24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIkF2YXRhciIsIk1hcmtkb3duIiwiUW5BQmxvY2siLCJzdG9yeSIsIm1ldGFkYXRhIiwicW5hIiwicXVlc3Rpb25SZWYiLCJxdWVzdGlvbkhlaWdodCIsInNldFF1ZXN0aW9uSGVpZ2h0IiwiY3VycmVudCIsIm9mZnNldEhlaWdodCIsImRpdiIsImNsYXNzTmFtZSIsInJlZiIsInNyYyIsImxvZ28iLCJpbWdpeF91cmwiLCJoMyIsInF1ZXN0aW9uIiwic3R5bGUiLCJ0b3AiLCJkZXNpZ25fZW5naW5lZXIiLCJpbWFnZSIsImFuc3dlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/qna-block.tsx\n"));

/***/ })

});