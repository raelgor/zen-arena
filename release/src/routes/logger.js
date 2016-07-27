"use strict";

var Route_1 = require('../classes/Route');
var Timer_1 = require('../classes/Timer');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Route_1.default(function (response, req, res, next) {
    log.debug('[request][' + req.path + '] Received.');
    req._timer = new Timer_1.default();
    req._depth = 0;
    res.on('finish', function () {
        var d = req._timer.click();
        msStats.log('request.' + req.path, d);
        log.debug('[request][' + req.path + '] Response end. (' + d + 'ms)');
    });
    next();
});