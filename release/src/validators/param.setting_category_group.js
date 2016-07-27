"use strict";

function default_1(req, res, next, value) {
    if (~['admin', 'games'].indexOf(value)) next();else res.end('{"error":"error_unknown_setting_category_group"}');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;