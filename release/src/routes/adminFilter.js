"use strict";

var APIRoute_1 = require('../classes/APIRoute');
var r = new APIRoute_1.default();
r.setName('adminFilter');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res, next) {
    if (~appConfig.admins.indexOf(+req.__user.get('id'))) next();else response.error('error_request_requires_admin');
});