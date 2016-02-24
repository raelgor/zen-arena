/* global co, APIRoute, verify_grecaptcha, routes */
'use strict';

/**
 * Ends the route if no valid recaptcha token exists.
 * @function routes.grecaptcha
 * @param {Response} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req, res, next) => co(function*(){

   if(req.body && req.body.message && req.body.message.grecaptcha)
      if(yield verify_grecaptcha(req.body.message.grecaptcha, req._address))
         return next();

   return response.error('error_bad_recaptcha');

}));

route.prependRoute(routes.detectAddress.route);

module.exports = route;
