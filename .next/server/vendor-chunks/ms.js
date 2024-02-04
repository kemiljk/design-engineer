/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ms";
exports.ids = ["vendor-chunks/ms"];
exports.modules = {

/***/ "(ssr)/./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\n * Helpers.\n */ var s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */ module.exports = function(val, options) {\n    options = options || {};\n    var type = typeof val;\n    if (type === \"string\" && val.length > 0) {\n        return parse(val);\n    } else if (type === \"number\" && isFinite(val)) {\n        return options.long ? fmtLong(val) : fmtShort(val);\n    }\n    throw new Error(\"val is not a non-empty string or a valid number. val=\" + JSON.stringify(val));\n};\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */ function parse(str) {\n    str = String(str);\n    if (str.length > 100) {\n        return;\n    }\n    var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);\n    if (!match) {\n        return;\n    }\n    var n = parseFloat(match[1]);\n    var type = (match[2] || \"ms\").toLowerCase();\n    switch(type){\n        case \"years\":\n        case \"year\":\n        case \"yrs\":\n        case \"yr\":\n        case \"y\":\n            return n * y;\n        case \"weeks\":\n        case \"week\":\n        case \"w\":\n            return n * w;\n        case \"days\":\n        case \"day\":\n        case \"d\":\n            return n * d;\n        case \"hours\":\n        case \"hour\":\n        case \"hrs\":\n        case \"hr\":\n        case \"h\":\n            return n * h;\n        case \"minutes\":\n        case \"minute\":\n        case \"mins\":\n        case \"min\":\n        case \"m\":\n            return n * m;\n        case \"seconds\":\n        case \"second\":\n        case \"secs\":\n        case \"sec\":\n        case \"s\":\n            return n * s;\n        case \"milliseconds\":\n        case \"millisecond\":\n        case \"msecs\":\n        case \"msec\":\n        case \"ms\":\n            return n;\n        default:\n            return undefined;\n    }\n}\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtShort(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return Math.round(ms / d) + \"d\";\n    }\n    if (msAbs >= h) {\n        return Math.round(ms / h) + \"h\";\n    }\n    if (msAbs >= m) {\n        return Math.round(ms / m) + \"m\";\n    }\n    if (msAbs >= s) {\n        return Math.round(ms / s) + \"s\";\n    }\n    return ms + \"ms\";\n}\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtLong(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return plural(ms, msAbs, d, \"day\");\n    }\n    if (msAbs >= h) {\n        return plural(ms, msAbs, h, \"hour\");\n    }\n    if (msAbs >= m) {\n        return plural(ms, msAbs, m, \"minute\");\n    }\n    if (msAbs >= s) {\n        return plural(ms, msAbs, s, \"second\");\n    }\n    return ms + \" ms\";\n}\n/**\n * Pluralization helper.\n */ function plural(ms, msAbs, n, name) {\n    var isPlural = msAbs >= n * 1.5;\n    return Math.round(ms / n) + \" \" + name + (isPlural ? \"s\" : \"\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanM/M2E3OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oLT8oPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cbiJdLCJuYW1lcyI6WyJzIiwibSIsImgiLCJkIiwidyIsInkiLCJtb2R1bGUiLCJleHBvcnRzIiwidmFsIiwib3B0aW9ucyIsInR5cGUiLCJsZW5ndGgiLCJwYXJzZSIsImlzRmluaXRlIiwibG9uZyIsImZtdExvbmciLCJmbXRTaG9ydCIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0ciIsIlN0cmluZyIsIm1hdGNoIiwiZXhlYyIsIm4iLCJwYXJzZUZsb2F0IiwidG9Mb3dlckNhc2UiLCJ1bmRlZmluZWQiLCJtcyIsIm1zQWJzIiwiTWF0aCIsImFicyIsInJvdW5kIiwicGx1cmFsIiwibmFtZSIsImlzUGx1cmFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Q0FFQyxHQUVELElBQUlBLElBQUk7QUFDUixJQUFJQyxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUQsSUFBSTtBQUNaLElBQUlFLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUYsSUFBSTtBQUVaOzs7Ozs7Ozs7Ozs7Q0FZQyxHQUVERyxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsR0FBRyxFQUFFQyxPQUFPO0lBQ3BDQSxVQUFVQSxXQUFXLENBQUM7SUFDdEIsSUFBSUMsT0FBTyxPQUFPRjtJQUNsQixJQUFJRSxTQUFTLFlBQVlGLElBQUlHLE1BQU0sR0FBRyxHQUFHO1FBQ3ZDLE9BQU9DLE1BQU1KO0lBQ2YsT0FBTyxJQUFJRSxTQUFTLFlBQVlHLFNBQVNMLE1BQU07UUFDN0MsT0FBT0MsUUFBUUssSUFBSSxHQUFHQyxRQUFRUCxPQUFPUSxTQUFTUjtJQUNoRDtJQUNBLE1BQU0sSUFBSVMsTUFDUiwwREFDRUMsS0FBS0MsU0FBUyxDQUFDWDtBQUVyQjtBQUVBOzs7Ozs7Q0FNQyxHQUVELFNBQVNJLE1BQU1RLEdBQUc7SUFDaEJBLE1BQU1DLE9BQU9EO0lBQ2IsSUFBSUEsSUFBSVQsTUFBTSxHQUFHLEtBQUs7UUFDcEI7SUFDRjtJQUNBLElBQUlXLFFBQVEsbUlBQW1JQyxJQUFJLENBQ2pKSDtJQUVGLElBQUksQ0FBQ0UsT0FBTztRQUNWO0lBQ0Y7SUFDQSxJQUFJRSxJQUFJQyxXQUFXSCxLQUFLLENBQUMsRUFBRTtJQUMzQixJQUFJWixPQUFPLEFBQUNZLENBQUFBLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBRyxFQUFHSSxXQUFXO0lBQ3pDLE9BQVFoQjtRQUNOLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT2MsSUFBSW5CO1FBQ2IsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT21CLElBQUlwQjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9vQixJQUFJckI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9xQixJQUFJdEI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9zQixJQUFJdkI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU91QixJQUFJeEI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU93QjtRQUNUO1lBQ0UsT0FBT0c7SUFDWDtBQUNGO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU1gsU0FBU1ksRUFBRTtJQUNsQixJQUFJQyxRQUFRQyxLQUFLQyxHQUFHLENBQUNIO0lBQ3JCLElBQUlDLFNBQVMxQixHQUFHO1FBQ2QsT0FBTzJCLEtBQUtFLEtBQUssQ0FBQ0osS0FBS3pCLEtBQUs7SUFDOUI7SUFDQSxJQUFJMEIsU0FBUzNCLEdBQUc7UUFDZCxPQUFPNEIsS0FBS0UsS0FBSyxDQUFDSixLQUFLMUIsS0FBSztJQUM5QjtJQUNBLElBQUkyQixTQUFTNUIsR0FBRztRQUNkLE9BQU82QixLQUFLRSxLQUFLLENBQUNKLEtBQUszQixLQUFLO0lBQzlCO0lBQ0EsSUFBSTRCLFNBQVM3QixHQUFHO1FBQ2QsT0FBTzhCLEtBQUtFLEtBQUssQ0FBQ0osS0FBSzVCLEtBQUs7SUFDOUI7SUFDQSxPQUFPNEIsS0FBSztBQUNkO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU2IsUUFBUWEsRUFBRTtJQUNqQixJQUFJQyxRQUFRQyxLQUFLQyxHQUFHLENBQUNIO0lBQ3JCLElBQUlDLFNBQVMxQixHQUFHO1FBQ2QsT0FBTzhCLE9BQU9MLElBQUlDLE9BQU8xQixHQUFHO0lBQzlCO0lBQ0EsSUFBSTBCLFNBQVMzQixHQUFHO1FBQ2QsT0FBTytCLE9BQU9MLElBQUlDLE9BQU8zQixHQUFHO0lBQzlCO0lBQ0EsSUFBSTJCLFNBQVM1QixHQUFHO1FBQ2QsT0FBT2dDLE9BQU9MLElBQUlDLE9BQU81QixHQUFHO0lBQzlCO0lBQ0EsSUFBSTRCLFNBQVM3QixHQUFHO1FBQ2QsT0FBT2lDLE9BQU9MLElBQUlDLE9BQU83QixHQUFHO0lBQzlCO0lBQ0EsT0FBTzRCLEtBQUs7QUFDZDtBQUVBOztDQUVDLEdBRUQsU0FBU0ssT0FBT0wsRUFBRSxFQUFFQyxLQUFLLEVBQUVMLENBQUMsRUFBRVUsSUFBSTtJQUNoQyxJQUFJQyxXQUFXTixTQUFTTCxJQUFJO0lBQzVCLE9BQU9NLEtBQUtFLEtBQUssQ0FBQ0osS0FBS0osS0FBSyxNQUFNVSxPQUFRQyxDQUFBQSxXQUFXLE1BQU0sRUFBQztBQUM5RCIsImZpbGUiOiIoc3NyKS8uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/ms/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\n * Helpers.\n */ var s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */ module.exports = function(val, options) {\n    options = options || {};\n    var type = typeof val;\n    if (type === \"string\" && val.length > 0) {\n        return parse(val);\n    } else if (type === \"number\" && isFinite(val)) {\n        return options.long ? fmtLong(val) : fmtShort(val);\n    }\n    throw new Error(\"val is not a non-empty string or a valid number. val=\" + JSON.stringify(val));\n};\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */ function parse(str) {\n    str = String(str);\n    if (str.length > 100) {\n        return;\n    }\n    var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);\n    if (!match) {\n        return;\n    }\n    var n = parseFloat(match[1]);\n    var type = (match[2] || \"ms\").toLowerCase();\n    switch(type){\n        case \"years\":\n        case \"year\":\n        case \"yrs\":\n        case \"yr\":\n        case \"y\":\n            return n * y;\n        case \"weeks\":\n        case \"week\":\n        case \"w\":\n            return n * w;\n        case \"days\":\n        case \"day\":\n        case \"d\":\n            return n * d;\n        case \"hours\":\n        case \"hour\":\n        case \"hrs\":\n        case \"hr\":\n        case \"h\":\n            return n * h;\n        case \"minutes\":\n        case \"minute\":\n        case \"mins\":\n        case \"min\":\n        case \"m\":\n            return n * m;\n        case \"seconds\":\n        case \"second\":\n        case \"secs\":\n        case \"sec\":\n        case \"s\":\n            return n * s;\n        case \"milliseconds\":\n        case \"millisecond\":\n        case \"msecs\":\n        case \"msec\":\n        case \"ms\":\n            return n;\n        default:\n            return undefined;\n    }\n}\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtShort(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return Math.round(ms / d) + \"d\";\n    }\n    if (msAbs >= h) {\n        return Math.round(ms / h) + \"h\";\n    }\n    if (msAbs >= m) {\n        return Math.round(ms / m) + \"m\";\n    }\n    if (msAbs >= s) {\n        return Math.round(ms / s) + \"s\";\n    }\n    return ms + \"ms\";\n}\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */ function fmtLong(ms) {\n    var msAbs = Math.abs(ms);\n    if (msAbs >= d) {\n        return plural(ms, msAbs, d, \"day\");\n    }\n    if (msAbs >= h) {\n        return plural(ms, msAbs, h, \"hour\");\n    }\n    if (msAbs >= m) {\n        return plural(ms, msAbs, m, \"minute\");\n    }\n    if (msAbs >= s) {\n        return plural(ms, msAbs, s, \"second\");\n    }\n    return ms + \" ms\";\n}\n/**\n * Pluralization helper.\n */ function plural(ms, msAbs, n, name) {\n    var isPlural = msAbs >= n * 1.5;\n    return Math.round(ms / n) + \" \" + name + (isPlural ? \"s\" : \"\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXNpZ24tZW5naW5lZXIvLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanM/M2E3OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oLT8oPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cbiJdLCJuYW1lcyI6WyJzIiwibSIsImgiLCJkIiwidyIsInkiLCJtb2R1bGUiLCJleHBvcnRzIiwidmFsIiwib3B0aW9ucyIsInR5cGUiLCJsZW5ndGgiLCJwYXJzZSIsImlzRmluaXRlIiwibG9uZyIsImZtdExvbmciLCJmbXRTaG9ydCIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0ciIsIlN0cmluZyIsIm1hdGNoIiwiZXhlYyIsIm4iLCJwYXJzZUZsb2F0IiwidG9Mb3dlckNhc2UiLCJ1bmRlZmluZWQiLCJtcyIsIm1zQWJzIiwiTWF0aCIsImFicyIsInJvdW5kIiwicGx1cmFsIiwibmFtZSIsImlzUGx1cmFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7Q0FFQyxHQUVELElBQUlBLElBQUk7QUFDUixJQUFJQyxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUQsSUFBSTtBQUNaLElBQUlFLElBQUlELElBQUk7QUFDWixJQUFJRSxJQUFJRCxJQUFJO0FBQ1osSUFBSUUsSUFBSUYsSUFBSTtBQUVaOzs7Ozs7Ozs7Ozs7Q0FZQyxHQUVERyxPQUFPQyxPQUFPLEdBQUcsU0FBU0MsR0FBRyxFQUFFQyxPQUFPO0lBQ3BDQSxVQUFVQSxXQUFXLENBQUM7SUFDdEIsSUFBSUMsT0FBTyxPQUFPRjtJQUNsQixJQUFJRSxTQUFTLFlBQVlGLElBQUlHLE1BQU0sR0FBRyxHQUFHO1FBQ3ZDLE9BQU9DLE1BQU1KO0lBQ2YsT0FBTyxJQUFJRSxTQUFTLFlBQVlHLFNBQVNMLE1BQU07UUFDN0MsT0FBT0MsUUFBUUssSUFBSSxHQUFHQyxRQUFRUCxPQUFPUSxTQUFTUjtJQUNoRDtJQUNBLE1BQU0sSUFBSVMsTUFDUiwwREFDRUMsS0FBS0MsU0FBUyxDQUFDWDtBQUVyQjtBQUVBOzs7Ozs7Q0FNQyxHQUVELFNBQVNJLE1BQU1RLEdBQUc7SUFDaEJBLE1BQU1DLE9BQU9EO0lBQ2IsSUFBSUEsSUFBSVQsTUFBTSxHQUFHLEtBQUs7UUFDcEI7SUFDRjtJQUNBLElBQUlXLFFBQVEsbUlBQW1JQyxJQUFJLENBQ2pKSDtJQUVGLElBQUksQ0FBQ0UsT0FBTztRQUNWO0lBQ0Y7SUFDQSxJQUFJRSxJQUFJQyxXQUFXSCxLQUFLLENBQUMsRUFBRTtJQUMzQixJQUFJWixPQUFPLEFBQUNZLENBQUFBLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBRyxFQUFHSSxXQUFXO0lBQ3pDLE9BQVFoQjtRQUNOLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT2MsSUFBSW5CO1FBQ2IsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1lBQ0gsT0FBT21CLElBQUlwQjtRQUNiLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9vQixJQUFJckI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9xQixJQUFJdEI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU9zQixJQUFJdkI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU91QixJQUFJeEI7UUFDYixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztZQUNILE9BQU93QjtRQUNUO1lBQ0UsT0FBT0c7SUFDWDtBQUNGO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU1gsU0FBU1ksRUFBRTtJQUNsQixJQUFJQyxRQUFRQyxLQUFLQyxHQUFHLENBQUNIO0lBQ3JCLElBQUlDLFNBQVMxQixHQUFHO1FBQ2QsT0FBTzJCLEtBQUtFLEtBQUssQ0FBQ0osS0FBS3pCLEtBQUs7SUFDOUI7SUFDQSxJQUFJMEIsU0FBUzNCLEdBQUc7UUFDZCxPQUFPNEIsS0FBS0UsS0FBSyxDQUFDSixLQUFLMUIsS0FBSztJQUM5QjtJQUNBLElBQUkyQixTQUFTNUIsR0FBRztRQUNkLE9BQU82QixLQUFLRSxLQUFLLENBQUNKLEtBQUszQixLQUFLO0lBQzlCO0lBQ0EsSUFBSTRCLFNBQVM3QixHQUFHO1FBQ2QsT0FBTzhCLEtBQUtFLEtBQUssQ0FBQ0osS0FBSzVCLEtBQUs7SUFDOUI7SUFDQSxPQUFPNEIsS0FBSztBQUNkO0FBRUE7Ozs7OztDQU1DLEdBRUQsU0FBU2IsUUFBUWEsRUFBRTtJQUNqQixJQUFJQyxRQUFRQyxLQUFLQyxHQUFHLENBQUNIO0lBQ3JCLElBQUlDLFNBQVMxQixHQUFHO1FBQ2QsT0FBTzhCLE9BQU9MLElBQUlDLE9BQU8xQixHQUFHO0lBQzlCO0lBQ0EsSUFBSTBCLFNBQVMzQixHQUFHO1FBQ2QsT0FBTytCLE9BQU9MLElBQUlDLE9BQU8zQixHQUFHO0lBQzlCO0lBQ0EsSUFBSTJCLFNBQVM1QixHQUFHO1FBQ2QsT0FBT2dDLE9BQU9MLElBQUlDLE9BQU81QixHQUFHO0lBQzlCO0lBQ0EsSUFBSTRCLFNBQVM3QixHQUFHO1FBQ2QsT0FBT2lDLE9BQU9MLElBQUlDLE9BQU83QixHQUFHO0lBQzlCO0lBQ0EsT0FBTzRCLEtBQUs7QUFDZDtBQUVBOztDQUVDLEdBRUQsU0FBU0ssT0FBT0wsRUFBRSxFQUFFQyxLQUFLLEVBQUVMLENBQUMsRUFBRVUsSUFBSTtJQUNoQyxJQUFJQyxXQUFXTixTQUFTTCxJQUFJO0lBQzVCLE9BQU9NLEtBQUtFLEtBQUssQ0FBQ0osS0FBS0osS0FBSyxNQUFNVSxPQUFRQyxDQUFBQSxXQUFXLE1BQU0sRUFBQztBQUM5RCIsImZpbGUiOiIocnNjKS8uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ms/index.js\n");

/***/ })

};
;