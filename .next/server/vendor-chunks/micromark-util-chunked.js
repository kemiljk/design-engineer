"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-chunked";
exports.ids = ["vendor-chunks/micromark-util-chunked"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-chunked/dev/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/micromark-util-chunked/dev/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   push: () => (/* binding */ push),\n/* harmony export */   splice: () => (/* binding */ splice)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/constants.js\");\n\n/**\n * Like `Array#splice`, but smarter for giant arrays.\n *\n * `Array#splice` takes all items to be inserted as individual argument which\n * causes a stack overflow in V8 when trying to insert 100k items for instance.\n *\n * Otherwise, this does not return the removed items, and takes `items` as an\n * array instead of rest parameters.\n *\n * @template {unknown} T\n *   Item type.\n * @param {Array<T>} list\n *   List to operate on.\n * @param {number} start\n *   Index to remove/insert at (can be negative).\n * @param {number} remove\n *   Number of items to remove.\n * @param {Array<T>} items\n *   Items to inject into `list`.\n * @returns {undefined}\n *   Nothing.\n */ function splice(list, start, remove, items) {\n    const end = list.length;\n    let chunkStart = 0;\n    /** @type {Array<unknown>} */ let parameters;\n    // Make start between zero and `end` (included).\n    if (start < 0) {\n        start = -start > end ? 0 : end + start;\n    } else {\n        start = start > end ? end : start;\n    }\n    remove = remove > 0 ? remove : 0;\n    // No need to chunk the items if there’s only a couple (10k) items.\n    if (items.length < micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize) {\n        parameters = Array.from(items);\n        parameters.unshift(start, remove);\n        // @ts-expect-error Hush, it’s fine.\n        list.splice(...parameters);\n    } else {\n        // Delete `remove` items starting from `start`\n        if (remove) list.splice(start, remove);\n        // Insert the items in chunks to not cause stack overflows.\n        while(chunkStart < items.length){\n            parameters = items.slice(chunkStart, chunkStart + micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize);\n            parameters.unshift(start, 0);\n            // @ts-expect-error Hush, it’s fine.\n            list.splice(...parameters);\n            chunkStart += micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize;\n            start += micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize;\n        }\n    }\n}\n/**\n * Append `items` (an array) at the end of `list` (another array).\n * When `list` was empty, returns `items` instead.\n *\n * This prevents a potentially expensive operation when `list` is empty,\n * and adds items in batches to prevent V8 from hanging.\n *\n * @template {unknown} T\n *   Item type.\n * @param {Array<T>} list\n *   List to operate on.\n * @param {Array<T>} items\n *   Items to add to `list`.\n * @returns {Array<T>}\n *   Either `list` or `items`.\n */ function push(list, items) {\n    if (list.length > 0) {\n        splice(list, list.length, 0, items);\n        return list;\n    }\n    return items;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY2h1bmtlZC9kZXYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQkMsR0FDTSxTQUFTQyxPQUFPQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsTUFBTSxFQUFFQyxLQUFLO0lBQy9DLE1BQU1DLE1BQU1KLEtBQUtLLE1BQU07SUFDdkIsSUFBSUMsYUFBYTtJQUNqQiwyQkFBMkIsR0FDM0IsSUFBSUM7SUFFSixnREFBZ0Q7SUFDaEQsSUFBSU4sUUFBUSxHQUFHO1FBQ2JBLFFBQVEsQ0FBQ0EsUUFBUUcsTUFBTSxJQUFJQSxNQUFNSDtJQUNuQyxPQUFPO1FBQ0xBLFFBQVFBLFFBQVFHLE1BQU1BLE1BQU1IO0lBQzlCO0lBRUFDLFNBQVNBLFNBQVMsSUFBSUEsU0FBUztJQUUvQixtRUFBbUU7SUFDbkUsSUFBSUMsTUFBTUUsTUFBTSxHQUFHUCw0REFBU0EsQ0FBQ1Usa0JBQWtCLEVBQUU7UUFDL0NELGFBQWFFLE1BQU1DLElBQUksQ0FBQ1A7UUFDeEJJLFdBQVdJLE9BQU8sQ0FBQ1YsT0FBT0M7UUFDMUIsb0NBQW9DO1FBQ3BDRixLQUFLRCxNQUFNLElBQUlRO0lBQ2pCLE9BQU87UUFDTCw4Q0FBOEM7UUFDOUMsSUFBSUwsUUFBUUYsS0FBS0QsTUFBTSxDQUFDRSxPQUFPQztRQUUvQiwyREFBMkQ7UUFDM0QsTUFBT0ksYUFBYUgsTUFBTUUsTUFBTSxDQUFFO1lBQ2hDRSxhQUFhSixNQUFNUyxLQUFLLENBQ3RCTixZQUNBQSxhQUFhUiw0REFBU0EsQ0FBQ1Usa0JBQWtCO1lBRTNDRCxXQUFXSSxPQUFPLENBQUNWLE9BQU87WUFDMUIsb0NBQW9DO1lBQ3BDRCxLQUFLRCxNQUFNLElBQUlRO1lBRWZELGNBQWNSLDREQUFTQSxDQUFDVSxrQkFBa0I7WUFDMUNQLFNBQVNILDREQUFTQSxDQUFDVSxrQkFBa0I7UUFDdkM7SUFDRjtBQUNGO0FBRUE7Ozs7Ozs7Ozs7Ozs7OztDQWVDLEdBQ00sU0FBU0ssS0FBS2IsSUFBSSxFQUFFRyxLQUFLO0lBQzlCLElBQUlILEtBQUtLLE1BQU0sR0FBRyxHQUFHO1FBQ25CTixPQUFPQyxNQUFNQSxLQUFLSyxNQUFNLEVBQUUsR0FBR0Y7UUFDN0IsT0FBT0g7SUFDVDtJQUVBLE9BQU9HO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY2h1bmtlZC9kZXYvaW5kZXguanM/ODRkYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbnN0YW50c30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sJ1xuXG4vKipcbiAqIExpa2UgYEFycmF5I3NwbGljZWAsIGJ1dCBzbWFydGVyIGZvciBnaWFudCBhcnJheXMuXG4gKlxuICogYEFycmF5I3NwbGljZWAgdGFrZXMgYWxsIGl0ZW1zIHRvIGJlIGluc2VydGVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnQgd2hpY2hcbiAqIGNhdXNlcyBhIHN0YWNrIG92ZXJmbG93IGluIFY4IHdoZW4gdHJ5aW5nIHRvIGluc2VydCAxMDBrIGl0ZW1zIGZvciBpbnN0YW5jZS5cbiAqXG4gKiBPdGhlcndpc2UsIHRoaXMgZG9lcyBub3QgcmV0dXJuIHRoZSByZW1vdmVkIGl0ZW1zLCBhbmQgdGFrZXMgYGl0ZW1zYCBhcyBhblxuICogYXJyYXkgaW5zdGVhZCBvZiByZXN0IHBhcmFtZXRlcnMuXG4gKlxuICogQHRlbXBsYXRlIHt1bmtub3dufSBUXG4gKiAgIEl0ZW0gdHlwZS5cbiAqIEBwYXJhbSB7QXJyYXk8VD59IGxpc3RcbiAqICAgTGlzdCB0byBvcGVyYXRlIG9uLlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gKiAgIEluZGV4IHRvIHJlbW92ZS9pbnNlcnQgYXQgKGNhbiBiZSBuZWdhdGl2ZSkuXG4gKiBAcGFyYW0ge251bWJlcn0gcmVtb3ZlXG4gKiAgIE51bWJlciBvZiBpdGVtcyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0FycmF5PFQ+fSBpdGVtc1xuICogICBJdGVtcyB0byBpbmplY3QgaW50byBgbGlzdGAuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogICBOb3RoaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaWNlKGxpc3QsIHN0YXJ0LCByZW1vdmUsIGl0ZW1zKSB7XG4gIGNvbnN0IGVuZCA9IGxpc3QubGVuZ3RoXG4gIGxldCBjaHVua1N0YXJ0ID0gMFxuICAvKiogQHR5cGUge0FycmF5PHVua25vd24+fSAqL1xuICBsZXQgcGFyYW1ldGVyc1xuXG4gIC8vIE1ha2Ugc3RhcnQgYmV0d2VlbiB6ZXJvIGFuZCBgZW5kYCAoaW5jbHVkZWQpLlxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBlbmQgPyAwIDogZW5kICsgc3RhcnRcbiAgfSBlbHNlIHtcbiAgICBzdGFydCA9IHN0YXJ0ID4gZW5kID8gZW5kIDogc3RhcnRcbiAgfVxuXG4gIHJlbW92ZSA9IHJlbW92ZSA+IDAgPyByZW1vdmUgOiAwXG5cbiAgLy8gTm8gbmVlZCB0byBjaHVuayB0aGUgaXRlbXMgaWYgdGhlcmXigJlzIG9ubHkgYSBjb3VwbGUgKDEwaykgaXRlbXMuXG4gIGlmIChpdGVtcy5sZW5ndGggPCBjb25zdGFudHMudjhNYXhTYWZlQ2h1bmtTaXplKSB7XG4gICAgcGFyYW1ldGVycyA9IEFycmF5LmZyb20oaXRlbXMpXG4gICAgcGFyYW1ldGVycy51bnNoaWZ0KHN0YXJ0LCByZW1vdmUpXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIdXNoLCBpdOKAmXMgZmluZS5cbiAgICBsaXN0LnNwbGljZSguLi5wYXJhbWV0ZXJzKVxuICB9IGVsc2Uge1xuICAgIC8vIERlbGV0ZSBgcmVtb3ZlYCBpdGVtcyBzdGFydGluZyBmcm9tIGBzdGFydGBcbiAgICBpZiAocmVtb3ZlKSBsaXN0LnNwbGljZShzdGFydCwgcmVtb3ZlKVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBpdGVtcyBpbiBjaHVua3MgdG8gbm90IGNhdXNlIHN0YWNrIG92ZXJmbG93cy5cbiAgICB3aGlsZSAoY2h1bmtTdGFydCA8IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgcGFyYW1ldGVycyA9IGl0ZW1zLnNsaWNlKFxuICAgICAgICBjaHVua1N0YXJ0LFxuICAgICAgICBjaHVua1N0YXJ0ICsgY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgICAgKVxuICAgICAgcGFyYW1ldGVycy51bnNoaWZ0KHN0YXJ0LCAwKVxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIdXNoLCBpdOKAmXMgZmluZS5cbiAgICAgIGxpc3Quc3BsaWNlKC4uLnBhcmFtZXRlcnMpXG5cbiAgICAgIGNodW5rU3RhcnQgKz0gY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgICAgc3RhcnQgKz0gY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFwcGVuZCBgaXRlbXNgIChhbiBhcnJheSkgYXQgdGhlIGVuZCBvZiBgbGlzdGAgKGFub3RoZXIgYXJyYXkpLlxuICogV2hlbiBgbGlzdGAgd2FzIGVtcHR5LCByZXR1cm5zIGBpdGVtc2AgaW5zdGVhZC5cbiAqXG4gKiBUaGlzIHByZXZlbnRzIGEgcG90ZW50aWFsbHkgZXhwZW5zaXZlIG9wZXJhdGlvbiB3aGVuIGBsaXN0YCBpcyBlbXB0eSxcbiAqIGFuZCBhZGRzIGl0ZW1zIGluIGJhdGNoZXMgdG8gcHJldmVudCBWOCBmcm9tIGhhbmdpbmcuXG4gKlxuICogQHRlbXBsYXRlIHt1bmtub3dufSBUXG4gKiAgIEl0ZW0gdHlwZS5cbiAqIEBwYXJhbSB7QXJyYXk8VD59IGxpc3RcbiAqICAgTGlzdCB0byBvcGVyYXRlIG9uLlxuICogQHBhcmFtIHtBcnJheTxUPn0gaXRlbXNcbiAqICAgSXRlbXMgdG8gYWRkIHRvIGBsaXN0YC5cbiAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAqICAgRWl0aGVyIGBsaXN0YCBvciBgaXRlbXNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsaXN0LCBpdGVtcykge1xuICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgc3BsaWNlKGxpc3QsIGxpc3QubGVuZ3RoLCAwLCBpdGVtcylcbiAgICByZXR1cm4gbGlzdFxuICB9XG5cbiAgcmV0dXJuIGl0ZW1zXG59XG4iXSwibmFtZXMiOlsiY29uc3RhbnRzIiwic3BsaWNlIiwibGlzdCIsInN0YXJ0IiwicmVtb3ZlIiwiaXRlbXMiLCJlbmQiLCJsZW5ndGgiLCJjaHVua1N0YXJ0IiwicGFyYW1ldGVycyIsInY4TWF4U2FmZUNodW5rU2l6ZSIsIkFycmF5IiwiZnJvbSIsInVuc2hpZnQiLCJzbGljZSIsInB1c2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-chunked/dev/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/micromark-util-chunked/dev/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/micromark-util-chunked/dev/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   push: () => (/* binding */ push),\n/* harmony export */   splice: () => (/* binding */ splice)\n/* harmony export */ });\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(rsc)/./node_modules/micromark-util-symbol/lib/constants.js\");\n\n/**\n * Like `Array#splice`, but smarter for giant arrays.\n *\n * `Array#splice` takes all items to be inserted as individual argument which\n * causes a stack overflow in V8 when trying to insert 100k items for instance.\n *\n * Otherwise, this does not return the removed items, and takes `items` as an\n * array instead of rest parameters.\n *\n * @template {unknown} T\n *   Item type.\n * @param {Array<T>} list\n *   List to operate on.\n * @param {number} start\n *   Index to remove/insert at (can be negative).\n * @param {number} remove\n *   Number of items to remove.\n * @param {Array<T>} items\n *   Items to inject into `list`.\n * @returns {undefined}\n *   Nothing.\n */ function splice(list, start, remove, items) {\n    const end = list.length;\n    let chunkStart = 0;\n    /** @type {Array<unknown>} */ let parameters;\n    // Make start between zero and `end` (included).\n    if (start < 0) {\n        start = -start > end ? 0 : end + start;\n    } else {\n        start = start > end ? end : start;\n    }\n    remove = remove > 0 ? remove : 0;\n    // No need to chunk the items if there’s only a couple (10k) items.\n    if (items.length < micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize) {\n        parameters = Array.from(items);\n        parameters.unshift(start, remove);\n        // @ts-expect-error Hush, it’s fine.\n        list.splice(...parameters);\n    } else {\n        // Delete `remove` items starting from `start`\n        if (remove) list.splice(start, remove);\n        // Insert the items in chunks to not cause stack overflows.\n        while(chunkStart < items.length){\n            parameters = items.slice(chunkStart, chunkStart + micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize);\n            parameters.unshift(start, 0);\n            // @ts-expect-error Hush, it’s fine.\n            list.splice(...parameters);\n            chunkStart += micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize;\n            start += micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.constants.v8MaxSafeChunkSize;\n        }\n    }\n}\n/**\n * Append `items` (an array) at the end of `list` (another array).\n * When `list` was empty, returns `items` instead.\n *\n * This prevents a potentially expensive operation when `list` is empty,\n * and adds items in batches to prevent V8 from hanging.\n *\n * @template {unknown} T\n *   Item type.\n * @param {Array<T>} list\n *   List to operate on.\n * @param {Array<T>} items\n *   Items to add to `list`.\n * @returns {Array<T>}\n *   Either `list` or `items`.\n */ function push(list, items) {\n    if (list.length > 0) {\n        splice(list, list.length, 0, items);\n        return list;\n    }\n    return items;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY2h1bmtlZC9kZXYvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStDO0FBRS9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FxQkMsR0FDTSxTQUFTQyxPQUFPQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsTUFBTSxFQUFFQyxLQUFLO0lBQy9DLE1BQU1DLE1BQU1KLEtBQUtLLE1BQU07SUFDdkIsSUFBSUMsYUFBYTtJQUNqQiwyQkFBMkIsR0FDM0IsSUFBSUM7SUFFSixnREFBZ0Q7SUFDaEQsSUFBSU4sUUFBUSxHQUFHO1FBQ2JBLFFBQVEsQ0FBQ0EsUUFBUUcsTUFBTSxJQUFJQSxNQUFNSDtJQUNuQyxPQUFPO1FBQ0xBLFFBQVFBLFFBQVFHLE1BQU1BLE1BQU1IO0lBQzlCO0lBRUFDLFNBQVNBLFNBQVMsSUFBSUEsU0FBUztJQUUvQixtRUFBbUU7SUFDbkUsSUFBSUMsTUFBTUUsTUFBTSxHQUFHUCw0REFBU0EsQ0FBQ1Usa0JBQWtCLEVBQUU7UUFDL0NELGFBQWFFLE1BQU1DLElBQUksQ0FBQ1A7UUFDeEJJLFdBQVdJLE9BQU8sQ0FBQ1YsT0FBT0M7UUFDMUIsb0NBQW9DO1FBQ3BDRixLQUFLRCxNQUFNLElBQUlRO0lBQ2pCLE9BQU87UUFDTCw4Q0FBOEM7UUFDOUMsSUFBSUwsUUFBUUYsS0FBS0QsTUFBTSxDQUFDRSxPQUFPQztRQUUvQiwyREFBMkQ7UUFDM0QsTUFBT0ksYUFBYUgsTUFBTUUsTUFBTSxDQUFFO1lBQ2hDRSxhQUFhSixNQUFNUyxLQUFLLENBQ3RCTixZQUNBQSxhQUFhUiw0REFBU0EsQ0FBQ1Usa0JBQWtCO1lBRTNDRCxXQUFXSSxPQUFPLENBQUNWLE9BQU87WUFDMUIsb0NBQW9DO1lBQ3BDRCxLQUFLRCxNQUFNLElBQUlRO1lBRWZELGNBQWNSLDREQUFTQSxDQUFDVSxrQkFBa0I7WUFDMUNQLFNBQVNILDREQUFTQSxDQUFDVSxrQkFBa0I7UUFDdkM7SUFDRjtBQUNGO0FBRUE7Ozs7Ozs7Ozs7Ozs7OztDQWVDLEdBQ00sU0FBU0ssS0FBS2IsSUFBSSxFQUFFRyxLQUFLO0lBQzlCLElBQUlILEtBQUtLLE1BQU0sR0FBRyxHQUFHO1FBQ25CTixPQUFPQyxNQUFNQSxLQUFLSyxNQUFNLEVBQUUsR0FBR0Y7UUFDN0IsT0FBT0g7SUFDVDtJQUVBLE9BQU9HO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY2h1bmtlZC9kZXYvaW5kZXguanM/ODRkYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbnN0YW50c30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sJ1xuXG4vKipcbiAqIExpa2UgYEFycmF5I3NwbGljZWAsIGJ1dCBzbWFydGVyIGZvciBnaWFudCBhcnJheXMuXG4gKlxuICogYEFycmF5I3NwbGljZWAgdGFrZXMgYWxsIGl0ZW1zIHRvIGJlIGluc2VydGVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnQgd2hpY2hcbiAqIGNhdXNlcyBhIHN0YWNrIG92ZXJmbG93IGluIFY4IHdoZW4gdHJ5aW5nIHRvIGluc2VydCAxMDBrIGl0ZW1zIGZvciBpbnN0YW5jZS5cbiAqXG4gKiBPdGhlcndpc2UsIHRoaXMgZG9lcyBub3QgcmV0dXJuIHRoZSByZW1vdmVkIGl0ZW1zLCBhbmQgdGFrZXMgYGl0ZW1zYCBhcyBhblxuICogYXJyYXkgaW5zdGVhZCBvZiByZXN0IHBhcmFtZXRlcnMuXG4gKlxuICogQHRlbXBsYXRlIHt1bmtub3dufSBUXG4gKiAgIEl0ZW0gdHlwZS5cbiAqIEBwYXJhbSB7QXJyYXk8VD59IGxpc3RcbiAqICAgTGlzdCB0byBvcGVyYXRlIG9uLlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gKiAgIEluZGV4IHRvIHJlbW92ZS9pbnNlcnQgYXQgKGNhbiBiZSBuZWdhdGl2ZSkuXG4gKiBAcGFyYW0ge251bWJlcn0gcmVtb3ZlXG4gKiAgIE51bWJlciBvZiBpdGVtcyB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0FycmF5PFQ+fSBpdGVtc1xuICogICBJdGVtcyB0byBpbmplY3QgaW50byBgbGlzdGAuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogICBOb3RoaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaWNlKGxpc3QsIHN0YXJ0LCByZW1vdmUsIGl0ZW1zKSB7XG4gIGNvbnN0IGVuZCA9IGxpc3QubGVuZ3RoXG4gIGxldCBjaHVua1N0YXJ0ID0gMFxuICAvKiogQHR5cGUge0FycmF5PHVua25vd24+fSAqL1xuICBsZXQgcGFyYW1ldGVyc1xuXG4gIC8vIE1ha2Ugc3RhcnQgYmV0d2VlbiB6ZXJvIGFuZCBgZW5kYCAoaW5jbHVkZWQpLlxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBlbmQgPyAwIDogZW5kICsgc3RhcnRcbiAgfSBlbHNlIHtcbiAgICBzdGFydCA9IHN0YXJ0ID4gZW5kID8gZW5kIDogc3RhcnRcbiAgfVxuXG4gIHJlbW92ZSA9IHJlbW92ZSA+IDAgPyByZW1vdmUgOiAwXG5cbiAgLy8gTm8gbmVlZCB0byBjaHVuayB0aGUgaXRlbXMgaWYgdGhlcmXigJlzIG9ubHkgYSBjb3VwbGUgKDEwaykgaXRlbXMuXG4gIGlmIChpdGVtcy5sZW5ndGggPCBjb25zdGFudHMudjhNYXhTYWZlQ2h1bmtTaXplKSB7XG4gICAgcGFyYW1ldGVycyA9IEFycmF5LmZyb20oaXRlbXMpXG4gICAgcGFyYW1ldGVycy51bnNoaWZ0KHN0YXJ0LCByZW1vdmUpXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIdXNoLCBpdOKAmXMgZmluZS5cbiAgICBsaXN0LnNwbGljZSguLi5wYXJhbWV0ZXJzKVxuICB9IGVsc2Uge1xuICAgIC8vIERlbGV0ZSBgcmVtb3ZlYCBpdGVtcyBzdGFydGluZyBmcm9tIGBzdGFydGBcbiAgICBpZiAocmVtb3ZlKSBsaXN0LnNwbGljZShzdGFydCwgcmVtb3ZlKVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBpdGVtcyBpbiBjaHVua3MgdG8gbm90IGNhdXNlIHN0YWNrIG92ZXJmbG93cy5cbiAgICB3aGlsZSAoY2h1bmtTdGFydCA8IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgcGFyYW1ldGVycyA9IGl0ZW1zLnNsaWNlKFxuICAgICAgICBjaHVua1N0YXJ0LFxuICAgICAgICBjaHVua1N0YXJ0ICsgY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgICAgKVxuICAgICAgcGFyYW1ldGVycy51bnNoaWZ0KHN0YXJ0LCAwKVxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBIdXNoLCBpdOKAmXMgZmluZS5cbiAgICAgIGxpc3Quc3BsaWNlKC4uLnBhcmFtZXRlcnMpXG5cbiAgICAgIGNodW5rU3RhcnQgKz0gY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgICAgc3RhcnQgKz0gY29uc3RhbnRzLnY4TWF4U2FmZUNodW5rU2l6ZVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFwcGVuZCBgaXRlbXNgIChhbiBhcnJheSkgYXQgdGhlIGVuZCBvZiBgbGlzdGAgKGFub3RoZXIgYXJyYXkpLlxuICogV2hlbiBgbGlzdGAgd2FzIGVtcHR5LCByZXR1cm5zIGBpdGVtc2AgaW5zdGVhZC5cbiAqXG4gKiBUaGlzIHByZXZlbnRzIGEgcG90ZW50aWFsbHkgZXhwZW5zaXZlIG9wZXJhdGlvbiB3aGVuIGBsaXN0YCBpcyBlbXB0eSxcbiAqIGFuZCBhZGRzIGl0ZW1zIGluIGJhdGNoZXMgdG8gcHJldmVudCBWOCBmcm9tIGhhbmdpbmcuXG4gKlxuICogQHRlbXBsYXRlIHt1bmtub3dufSBUXG4gKiAgIEl0ZW0gdHlwZS5cbiAqIEBwYXJhbSB7QXJyYXk8VD59IGxpc3RcbiAqICAgTGlzdCB0byBvcGVyYXRlIG9uLlxuICogQHBhcmFtIHtBcnJheTxUPn0gaXRlbXNcbiAqICAgSXRlbXMgdG8gYWRkIHRvIGBsaXN0YC5cbiAqIEByZXR1cm5zIHtBcnJheTxUPn1cbiAqICAgRWl0aGVyIGBsaXN0YCBvciBgaXRlbXNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHVzaChsaXN0LCBpdGVtcykge1xuICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgc3BsaWNlKGxpc3QsIGxpc3QubGVuZ3RoLCAwLCBpdGVtcylcbiAgICByZXR1cm4gbGlzdFxuICB9XG5cbiAgcmV0dXJuIGl0ZW1zXG59XG4iXSwibmFtZXMiOlsiY29uc3RhbnRzIiwic3BsaWNlIiwibGlzdCIsInN0YXJ0IiwicmVtb3ZlIiwiaXRlbXMiLCJlbmQiLCJsZW5ndGgiLCJjaHVua1N0YXJ0IiwicGFyYW1ldGVycyIsInY4TWF4U2FmZUNodW5rU2l6ZSIsIkFycmF5IiwiZnJvbSIsInVuc2hpZnQiLCJzbGljZSIsInB1c2giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/micromark-util-chunked/dev/index.js\n");

/***/ })

};
;