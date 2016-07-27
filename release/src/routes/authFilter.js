"use strict";

var APIRoute_1 = require('../classes/APIRoute');
var r = new APIRoute_1.default();
r.setName('authFilter');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res, next) {
    if (req.__user) next();else response.error('error_request_requires_auth');
});