"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDef(value) {
    return value !== undefined && value !== null;
}
exports.isDef = isDef;
function isObj(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}
exports.isObj = isObj;
function isNumber(value) {
    return /^\d+$/.test(value);
}
exports.isNumber = isNumber;
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
exports.range = range;
