"use strict";

function default_1(req, res, next, value) {
    if (~['accounts', 'password', 'merge', 'configuration'].indexOf(value)) next();else res.end('{"error":"error_unknown_setting_category"}');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;