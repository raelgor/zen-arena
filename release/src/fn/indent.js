"use strict";

function indent(req, offset, depthName) {
    var i = req && !isNaN(req._depth) ? req._depth += offset : 1;
    if (req && !isNaN(req._depth) && depthName) {
        req._depth_name = depthName;
    }
    var exp = '';
    if (i) while (i--) {
        exp += ' ';
    }return exp;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = indent;