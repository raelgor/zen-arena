"use strict";

var Route_1 = require('../classes/Route');
var r = new Route_1.default();
r.setName('detectAddress');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = r;
r.setHandler(function (response, req, res, next) {
    if (req._address) next();
    // Detect address
    req._address = appConfig.use_xfwd ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
    next();
});