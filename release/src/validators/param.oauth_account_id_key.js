"use strict";

function default_1(req, res, next, value) {
    if (~['fb', 'gplus', 'bnet', 'coc'].indexOf(value)) next();else res.end('{"error":"error_unknown_oauth_account_id_key"}');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;