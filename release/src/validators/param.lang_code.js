"use strict";

function default_1(req, res, next, value) {
    if (languageCodes.has(value)) next();else res.end('{"error":"error_unknown_lang_code"}');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;