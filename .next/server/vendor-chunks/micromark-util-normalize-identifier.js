"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-normalize-identifier";
exports.ids = ["vendor-chunks/micromark-util-normalize-identifier"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-normalize-identifier/dev/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-util-normalize-identifier/dev/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizeIdentifier: () => (/* binding */ normalizeIdentifier)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/values.js\");\n\n/**\n * Normalize an identifier (as found in references, definitions).\n *\n * Collapses markdown whitespace, trim, and then lower- and uppercase.\n *\n * Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their\n * lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different\n * uppercase character (U+0398 (`Θ`)).\n * So, to get a canonical form, we perform both lower- and uppercase.\n *\n * Using uppercase last makes sure keys will never interact with default\n * prototypal values (such as `constructor`): nothing in the prototype of\n * `Object` is uppercase.\n *\n * @param {string} value\n *   Identifier to normalize.\n * @returns {string}\n *   Normalized identifier.\n */ function normalizeIdentifier(value) {\n    return value// Collapse markdown whitespace.\n    .replace(/[\\t\\n\\r ]+/g, micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.values.space)// Trim.\n    .replace(/^ | $/g, \"\")// Some characters are considered “uppercase”, but if their lowercase\n    // counterpart is uppercased will result in a different uppercase\n    // character.\n    // Hence, to get that form, we perform both lower- and uppercase.\n    // Upper case makes sure keys will not interact with default prototypal\n    // methods: no method is uppercase.\n    .toLowerCase().toUpperCase();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtbm9ybWFsaXplLWlkZW50aWZpZXIvZGV2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQkMsR0FDTSxTQUFTQyxvQkFBb0JDLEtBQUs7SUFDdkMsT0FDRUEsS0FDRSxnQ0FBZ0M7S0FDL0JDLE9BQU8sQ0FBQyxlQUFlSCx5REFBTUEsQ0FBQ0ksS0FBSyxDQUNwQyxRQUFRO0tBQ1BELE9BQU8sQ0FBQyxVQUFVLEdBQ25CLHFFQUFxRTtJQUNyRSxpRUFBaUU7SUFDakUsYUFBYTtJQUNiLGlFQUFpRTtJQUNqRSx1RUFBdUU7SUFDdkUsbUNBQW1DO0tBQ2xDRSxXQUFXLEdBQ1hDLFdBQVc7QUFFbEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtbm9ybWFsaXplLWlkZW50aWZpZXIvZGV2L2luZGV4LmpzP2VkZDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2YWx1ZXN9IGZyb20gJ21pY3JvbWFyay11dGlsLXN5bWJvbCdcblxuLyoqXG4gKiBOb3JtYWxpemUgYW4gaWRlbnRpZmllciAoYXMgZm91bmQgaW4gcmVmZXJlbmNlcywgZGVmaW5pdGlvbnMpLlxuICpcbiAqIENvbGxhcHNlcyBtYXJrZG93biB3aGl0ZXNwYWNlLCB0cmltLCBhbmQgdGhlbiBsb3dlci0gYW5kIHVwcGVyY2FzZS5cbiAqXG4gKiBTb21lIGNoYXJhY3RlcnMgYXJlIGNvbnNpZGVyZWQg4oCcdXBwZXJjYXNl4oCdLCBzdWNoIGFzIFUrMDNGNCAoYM+0YCksIGJ1dCBpZiB0aGVpclxuICogbG93ZXJjYXNlIGNvdW50ZXJwYXJ0IChVKzAzQjggKGDOuGApKSBpcyB1cHBlcmNhc2VkIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50XG4gKiB1cHBlcmNhc2UgY2hhcmFjdGVyIChVKzAzOTggKGDOmGApKS5cbiAqIFNvLCB0byBnZXQgYSBjYW5vbmljYWwgZm9ybSwgd2UgcGVyZm9ybSBib3RoIGxvd2VyLSBhbmQgdXBwZXJjYXNlLlxuICpcbiAqIFVzaW5nIHVwcGVyY2FzZSBsYXN0IG1ha2VzIHN1cmUga2V5cyB3aWxsIG5ldmVyIGludGVyYWN0IHdpdGggZGVmYXVsdFxuICogcHJvdG90eXBhbCB2YWx1ZXMgKHN1Y2ggYXMgYGNvbnN0cnVjdG9yYCk6IG5vdGhpbmcgaW4gdGhlIHByb3RvdHlwZSBvZlxuICogYE9iamVjdGAgaXMgdXBwZXJjYXNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBJZGVudGlmaWVyIHRvIG5vcm1hbGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIE5vcm1hbGl6ZWQgaWRlbnRpZmllci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUlkZW50aWZpZXIodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZVxuICAgICAgLy8gQ29sbGFwc2UgbWFya2Rvd24gd2hpdGVzcGFjZS5cbiAgICAgIC5yZXBsYWNlKC9bXFx0XFxuXFxyIF0rL2csIHZhbHVlcy5zcGFjZSlcbiAgICAgIC8vIFRyaW0uXG4gICAgICAucmVwbGFjZSgvXiB8ICQvZywgJycpXG4gICAgICAvLyBTb21lIGNoYXJhY3RlcnMgYXJlIGNvbnNpZGVyZWQg4oCcdXBwZXJjYXNl4oCdLCBidXQgaWYgdGhlaXIgbG93ZXJjYXNlXG4gICAgICAvLyBjb3VudGVycGFydCBpcyB1cHBlcmNhc2VkIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IHVwcGVyY2FzZVxuICAgICAgLy8gY2hhcmFjdGVyLlxuICAgICAgLy8gSGVuY2UsIHRvIGdldCB0aGF0IGZvcm0sIHdlIHBlcmZvcm0gYm90aCBsb3dlci0gYW5kIHVwcGVyY2FzZS5cbiAgICAgIC8vIFVwcGVyIGNhc2UgbWFrZXMgc3VyZSBrZXlzIHdpbGwgbm90IGludGVyYWN0IHdpdGggZGVmYXVsdCBwcm90b3R5cGFsXG4gICAgICAvLyBtZXRob2RzOiBubyBtZXRob2QgaXMgdXBwZXJjYXNlLlxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC50b1VwcGVyQ2FzZSgpXG4gIClcbn1cbiJdLCJuYW1lcyI6WyJ2YWx1ZXMiLCJub3JtYWxpemVJZGVudGlmaWVyIiwidmFsdWUiLCJyZXBsYWNlIiwic3BhY2UiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-normalize-identifier/dev/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/micromark-util-normalize-identifier/dev/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micromark-util-normalize-identifier/dev/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizeIdentifier: () => (/* binding */ normalizeIdentifier)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(rsc)/./node_modules/micromark-util-symbol/lib/values.js\");\n\n/**\n * Normalize an identifier (as found in references, definitions).\n *\n * Collapses markdown whitespace, trim, and then lower- and uppercase.\n *\n * Some characters are considered “uppercase”, such as U+03F4 (`ϴ`), but if their\n * lowercase counterpart (U+03B8 (`θ`)) is uppercased will result in a different\n * uppercase character (U+0398 (`Θ`)).\n * So, to get a canonical form, we perform both lower- and uppercase.\n *\n * Using uppercase last makes sure keys will never interact with default\n * prototypal values (such as `constructor`): nothing in the prototype of\n * `Object` is uppercase.\n *\n * @param {string} value\n *   Identifier to normalize.\n * @returns {string}\n *   Normalized identifier.\n */ function normalizeIdentifier(value) {\n    return value// Collapse markdown whitespace.\n    .replace(/[\\t\\n\\r ]+/g, micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.values.space)// Trim.\n    .replace(/^ | $/g, \"\")// Some characters are considered “uppercase”, but if their lowercase\n    // counterpart is uppercased will result in a different uppercase\n    // character.\n    // Hence, to get that form, we perform both lower- and uppercase.\n    // Upper case makes sure keys will not interact with default prototypal\n    // methods: no method is uppercase.\n    .toLowerCase().toUpperCase();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtbm9ybWFsaXplLWlkZW50aWZpZXIvZGV2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrQkMsR0FDTSxTQUFTQyxvQkFBb0JDLEtBQUs7SUFDdkMsT0FDRUEsS0FDRSxnQ0FBZ0M7S0FDL0JDLE9BQU8sQ0FBQyxlQUFlSCx5REFBTUEsQ0FBQ0ksS0FBSyxDQUNwQyxRQUFRO0tBQ1BELE9BQU8sQ0FBQyxVQUFVLEdBQ25CLHFFQUFxRTtJQUNyRSxpRUFBaUU7SUFDakUsYUFBYTtJQUNiLGlFQUFpRTtJQUNqRSx1RUFBdUU7SUFDdkUsbUNBQW1DO0tBQ2xDRSxXQUFXLEdBQ1hDLFdBQVc7QUFFbEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtbm9ybWFsaXplLWlkZW50aWZpZXIvZGV2L2luZGV4LmpzP2VkZDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2YWx1ZXN9IGZyb20gJ21pY3JvbWFyay11dGlsLXN5bWJvbCdcblxuLyoqXG4gKiBOb3JtYWxpemUgYW4gaWRlbnRpZmllciAoYXMgZm91bmQgaW4gcmVmZXJlbmNlcywgZGVmaW5pdGlvbnMpLlxuICpcbiAqIENvbGxhcHNlcyBtYXJrZG93biB3aGl0ZXNwYWNlLCB0cmltLCBhbmQgdGhlbiBsb3dlci0gYW5kIHVwcGVyY2FzZS5cbiAqXG4gKiBTb21lIGNoYXJhY3RlcnMgYXJlIGNvbnNpZGVyZWQg4oCcdXBwZXJjYXNl4oCdLCBzdWNoIGFzIFUrMDNGNCAoYM+0YCksIGJ1dCBpZiB0aGVpclxuICogbG93ZXJjYXNlIGNvdW50ZXJwYXJ0IChVKzAzQjggKGDOuGApKSBpcyB1cHBlcmNhc2VkIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50XG4gKiB1cHBlcmNhc2UgY2hhcmFjdGVyIChVKzAzOTggKGDOmGApKS5cbiAqIFNvLCB0byBnZXQgYSBjYW5vbmljYWwgZm9ybSwgd2UgcGVyZm9ybSBib3RoIGxvd2VyLSBhbmQgdXBwZXJjYXNlLlxuICpcbiAqIFVzaW5nIHVwcGVyY2FzZSBsYXN0IG1ha2VzIHN1cmUga2V5cyB3aWxsIG5ldmVyIGludGVyYWN0IHdpdGggZGVmYXVsdFxuICogcHJvdG90eXBhbCB2YWx1ZXMgKHN1Y2ggYXMgYGNvbnN0cnVjdG9yYCk6IG5vdGhpbmcgaW4gdGhlIHByb3RvdHlwZSBvZlxuICogYE9iamVjdGAgaXMgdXBwZXJjYXNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogICBJZGVudGlmaWVyIHRvIG5vcm1hbGl6ZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIE5vcm1hbGl6ZWQgaWRlbnRpZmllci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUlkZW50aWZpZXIodmFsdWUpIHtcbiAgcmV0dXJuIChcbiAgICB2YWx1ZVxuICAgICAgLy8gQ29sbGFwc2UgbWFya2Rvd24gd2hpdGVzcGFjZS5cbiAgICAgIC5yZXBsYWNlKC9bXFx0XFxuXFxyIF0rL2csIHZhbHVlcy5zcGFjZSlcbiAgICAgIC8vIFRyaW0uXG4gICAgICAucmVwbGFjZSgvXiB8ICQvZywgJycpXG4gICAgICAvLyBTb21lIGNoYXJhY3RlcnMgYXJlIGNvbnNpZGVyZWQg4oCcdXBwZXJjYXNl4oCdLCBidXQgaWYgdGhlaXIgbG93ZXJjYXNlXG4gICAgICAvLyBjb3VudGVycGFydCBpcyB1cHBlcmNhc2VkIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IHVwcGVyY2FzZVxuICAgICAgLy8gY2hhcmFjdGVyLlxuICAgICAgLy8gSGVuY2UsIHRvIGdldCB0aGF0IGZvcm0sIHdlIHBlcmZvcm0gYm90aCBsb3dlci0gYW5kIHVwcGVyY2FzZS5cbiAgICAgIC8vIFVwcGVyIGNhc2UgbWFrZXMgc3VyZSBrZXlzIHdpbGwgbm90IGludGVyYWN0IHdpdGggZGVmYXVsdCBwcm90b3R5cGFsXG4gICAgICAvLyBtZXRob2RzOiBubyBtZXRob2QgaXMgdXBwZXJjYXNlLlxuICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgIC50b1VwcGVyQ2FzZSgpXG4gIClcbn1cbiJdLCJuYW1lcyI6WyJ2YWx1ZXMiLCJub3JtYWxpemVJZGVudGlmaWVyIiwidmFsdWUiLCJyZXBsYWNlIiwic3BhY2UiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/micromark-util-normalize-identifier/dev/index.js\n");

/***/ })

};
;