"use strict";

function uuid(multiplier) {
    // ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    function b(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, b).split('-').join('');
    }
    var result = b();
    if (multiplier) while (--multiplier) {
        result += b();
    }return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uuid;
;