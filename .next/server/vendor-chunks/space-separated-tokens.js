"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/space-separated-tokens";
exports.ids = ["vendor-chunks/space-separated-tokens"];
exports.modules = {

/***/ "(ssr)/./node_modules/space-separated-tokens/index.js":
/*!******************************************************!*\
  !*** ./node_modules/space-separated-tokens/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parse: () => (/* binding */ parse),\n/* harmony export */   stringify: () => (/* binding */ stringify)\n/* harmony export */ });\n/**\n * Parse space-separated tokens to an array of strings.\n *\n * @param {string} value\n *   Space-separated tokens.\n * @returns {Array<string>}\n *   List of tokens.\n */ function parse(value) {\n    const input = String(value || \"\").trim();\n    return input ? input.split(/[ \\t\\n\\r\\f]+/g) : [];\n}\n/**\n * Serialize an array of strings as space separated-tokens.\n *\n * @param {Array<string|number>} values\n *   List of tokens.\n * @returns {string}\n *   Space-separated tokens.\n */ function stringify(values) {\n    return values.join(\" \").trim();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3BhY2Utc2VwYXJhdGVkLXRva2Vucy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7O0NBT0MsR0FDTSxTQUFTQSxNQUFNQyxLQUFLO0lBQ3pCLE1BQU1DLFFBQVFDLE9BQU9GLFNBQVMsSUFBSUcsSUFBSTtJQUN0QyxPQUFPRixRQUFRQSxNQUFNRyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7QUFDbEQ7QUFFQTs7Ozs7OztDQU9DLEdBQ00sU0FBU0MsVUFBVUMsTUFBTTtJQUM5QixPQUFPQSxPQUFPQyxJQUFJLENBQUMsS0FBS0osSUFBSTtBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2Rlc2lnbi1lbmdpbmVlci8uL25vZGVfbW9kdWxlcy9zcGFjZS1zZXBhcmF0ZWQtdG9rZW5zL2luZGV4LmpzP2Q2YjgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJzZSBzcGFjZS1zZXBhcmF0ZWQgdG9rZW5zIHRvIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiAgIFNwYWNlLXNlcGFyYXRlZCB0b2tlbnMuXG4gKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cbiAqICAgTGlzdCBvZiB0b2tlbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSh2YWx1ZSkge1xuICBjb25zdCBpbnB1dCA9IFN0cmluZyh2YWx1ZSB8fCAnJykudHJpbSgpXG4gIHJldHVybiBpbnB1dCA/IGlucHV0LnNwbGl0KC9bIFxcdFxcblxcclxcZl0rL2cpIDogW11cbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhcyBzcGFjZSBzZXBhcmF0ZWQtdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nfG51bWJlcj59IHZhbHVlc1xuICogICBMaXN0IG9mIHRva2Vucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNwYWNlLXNlcGFyYXRlZCB0b2tlbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodmFsdWVzKSB7XG4gIHJldHVybiB2YWx1ZXMuam9pbignICcpLnRyaW0oKVxufVxuIl0sIm5hbWVzIjpbInBhcnNlIiwidmFsdWUiLCJpbnB1dCIsIlN0cmluZyIsInRyaW0iLCJzcGxpdCIsInN0cmluZ2lmeSIsInZhbHVlcyIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/space-separated-tokens/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/space-separated-tokens/index.js":
/*!******************************************************!*\
  !*** ./node_modules/space-separated-tokens/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parse: () => (/* binding */ parse),\n/* harmony export */   stringify: () => (/* binding */ stringify)\n/* harmony export */ });\n/**\n * Parse space-separated tokens to an array of strings.\n *\n * @param {string} value\n *   Space-separated tokens.\n * @returns {Array<string>}\n *   List of tokens.\n */ function parse(value) {\n    const input = String(value || \"\").trim();\n    return input ? input.split(/[ \\t\\n\\r\\f]+/g) : [];\n}\n/**\n * Serialize an array of strings as space separated-tokens.\n *\n * @param {Array<string|number>} values\n *   List of tokens.\n * @returns {string}\n *   Space-separated tokens.\n */ function stringify(values) {\n    return values.join(\" \").trim();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc3BhY2Utc2VwYXJhdGVkLXRva2Vucy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7O0NBT0MsR0FDTSxTQUFTQSxNQUFNQyxLQUFLO0lBQ3pCLE1BQU1DLFFBQVFDLE9BQU9GLFNBQVMsSUFBSUcsSUFBSTtJQUN0QyxPQUFPRixRQUFRQSxNQUFNRyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7QUFDbEQ7QUFFQTs7Ozs7OztDQU9DLEdBQ00sU0FBU0MsVUFBVUMsTUFBTTtJQUM5QixPQUFPQSxPQUFPQyxJQUFJLENBQUMsS0FBS0osSUFBSTtBQUM5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2Rlc2lnbi1lbmdpbmVlci8uL25vZGVfbW9kdWxlcy9zcGFjZS1zZXBhcmF0ZWQtdG9rZW5zL2luZGV4LmpzP2Q2YjgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJzZSBzcGFjZS1zZXBhcmF0ZWQgdG9rZW5zIHRvIGFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gKiAgIFNwYWNlLXNlcGFyYXRlZCB0b2tlbnMuXG4gKiBAcmV0dXJucyB7QXJyYXk8c3RyaW5nPn1cbiAqICAgTGlzdCBvZiB0b2tlbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZSh2YWx1ZSkge1xuICBjb25zdCBpbnB1dCA9IFN0cmluZyh2YWx1ZSB8fCAnJykudHJpbSgpXG4gIHJldHVybiBpbnB1dCA/IGlucHV0LnNwbGl0KC9bIFxcdFxcblxcclxcZl0rL2cpIDogW11cbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhcyBzcGFjZSBzZXBhcmF0ZWQtdG9rZW5zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nfG51bWJlcj59IHZhbHVlc1xuICogICBMaXN0IG9mIHRva2Vucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNwYWNlLXNlcGFyYXRlZCB0b2tlbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodmFsdWVzKSB7XG4gIHJldHVybiB2YWx1ZXMuam9pbignICcpLnRyaW0oKVxufVxuIl0sIm5hbWVzIjpbInBhcnNlIiwidmFsdWUiLCJpbnB1dCIsIlN0cmluZyIsInRyaW0iLCJzcGxpdCIsInN0cmluZ2lmeSIsInZhbHVlcyIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/space-separated-tokens/index.js\n");

/***/ })

};
;