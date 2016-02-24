/* global appConfig, Route */
'use strict';

/**
 * Detects the client's address and appends it to the request object.
 * @function routes.detectAddress
 * @param {Response} response The response object.
 * @returns undefined
 */
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
