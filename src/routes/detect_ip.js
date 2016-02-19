/* global appConfig */
'use strict';

module.exports = (req, res, next) => {

   // Detect address
   req._address =
      appConfig.use_xfwd ?
      req.headers['x-forwarded-for']
      :
      req.connection.remoteAddress;

   next();

};
