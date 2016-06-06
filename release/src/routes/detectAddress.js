/* global appConfig, Route */
'use strict';

var r = new Route();

r.setName('detectAddress');

module.exports = r;

r.setHandler(function (response, req, res, next) {

   if (req._address) next();

   // Detect address
   req._address = appConfig.use_xfwd ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;

   next();
});