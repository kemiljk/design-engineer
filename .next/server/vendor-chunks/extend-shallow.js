"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/extend-shallow";
exports.ids = ["vendor-chunks/extend-shallow"];
exports.modules = {

/***/ "(rsc)/./node_modules/extend-shallow/index.js":
/*!**********************************************!*\
  !*** ./node_modules/extend-shallow/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar isObject = __webpack_require__(/*! is-extendable */ \"(rsc)/./node_modules/is-extendable/index.js\");\nmodule.exports = function extend(o /*, objects*/ ) {\n    if (!isObject(o)) {\n        o = {};\n    }\n    var len = arguments.length;\n    for(var i = 1; i < len; i++){\n        var obj = arguments[i];\n        if (isObject(obj)) {\n            assign(o, obj);\n        }\n    }\n    return o;\n};\nfunction assign(a, b) {\n    for(var key in b){\n        if (hasOwn(b, key)) {\n            a[key] = b[key];\n        }\n    }\n}\n/**\n * Returns true if the given `key` is an own property of `obj`.\n */ function hasOwn(obj, key) {\n    return Object.prototype.hasOwnProperty.call(obj, key);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZXh0ZW5kLXNoYWxsb3cvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFFQSxJQUFJQSxXQUFXQyxtQkFBT0EsQ0FBQztBQUV2QkMsT0FBT0MsT0FBTyxHQUFHLFNBQVNDLE9BQU9DLEVBQUMsV0FBVyxHQUFYO0lBQ2hDLElBQUksQ0FBQ0wsU0FBU0ssSUFBSTtRQUFFQSxJQUFJLENBQUM7SUFBRztJQUU1QixJQUFJQyxNQUFNQyxVQUFVQyxNQUFNO0lBQzFCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJSCxLQUFLRyxJQUFLO1FBQzVCLElBQUlDLE1BQU1ILFNBQVMsQ0FBQ0UsRUFBRTtRQUV0QixJQUFJVCxTQUFTVSxNQUFNO1lBQ2pCQyxPQUFPTixHQUFHSztRQUNaO0lBQ0Y7SUFDQSxPQUFPTDtBQUNUO0FBRUEsU0FBU00sT0FBT0MsQ0FBQyxFQUFFQyxDQUFDO0lBQ2xCLElBQUssSUFBSUMsT0FBT0QsRUFBRztRQUNqQixJQUFJRSxPQUFPRixHQUFHQyxNQUFNO1lBQ2xCRixDQUFDLENBQUNFLElBQUksR0FBR0QsQ0FBQyxDQUFDQyxJQUFJO1FBQ2pCO0lBQ0Y7QUFDRjtBQUVBOztDQUVDLEdBRUQsU0FBU0MsT0FBT0wsR0FBRyxFQUFFSSxHQUFHO0lBQ3RCLE9BQU9FLE9BQU9DLFNBQVMsQ0FBQ0MsY0FBYyxDQUFDQyxJQUFJLENBQUNULEtBQUtJO0FBQ25EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVzaWduLWVuZ2luZWVyLy4vbm9kZV9tb2R1bGVzL2V4dGVuZC1zaGFsbG93L2luZGV4LmpzPzVjZGMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCdpcy1leHRlbmRhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKG8vKiwgb2JqZWN0cyovKSB7XG4gIGlmICghaXNPYmplY3QobykpIHsgbyA9IHt9OyB9XG5cbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuXG4gICAgaWYgKGlzT2JqZWN0KG9iaikpIHtcbiAgICAgIGFzc2lnbihvLCBvYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn07XG5cbmZ1bmN0aW9uIGFzc2lnbihhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGhhc093bihiLCBrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBga2V5YCBpcyBhbiBvd24gcHJvcGVydHkgb2YgYG9iamAuXG4gKi9cblxuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuIl0sIm5hbWVzIjpbImlzT2JqZWN0IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJleHRlbmQiLCJvIiwibGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaSIsIm9iaiIsImFzc2lnbiIsImEiLCJiIiwia2V5IiwiaGFzT3duIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/extend-shallow/index.js\n");

/***/ })

};
;