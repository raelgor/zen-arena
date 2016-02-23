/* global appConfig, Route */
'use strict';

module.exports = new Route((response, req, res, next) => {
   
   if(req._address) next();

   // Detect address
   req._address =
      appConfig.use_xfwd ?
      req.headers['x-forwarded-for']
      :
      req.connection.remoteAddress;

   next();

});
