/* global co, dataTransporter, APIRoute, routes, cache */
'use strict';

/**
 * Clears the user's session from record and purges auth cookies.
 * @function logout
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response, req, res) => co(function*(){

   res.clearCookie('st');
   
   yield dataTransporter.remove({
      query: { session_token: req.__session.session_token },
      collection: 'sessions'
   });

   yield cache.del(`sessions:${req.__session.session_token}`);

   response.responseData.message = 'OK';
   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
