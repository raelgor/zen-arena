/* global co, dataTransporter, APIRoute, routes */
'use strict';

var route = new APIRoute((response, req, res) => co(function*(){

   res.clearCookie('st');

   yield dataTransporter.updateUser(
      req.__user,
      { $unset: { [`sessions.${req.__session.session_token}`]: 1 }}
   );

   response.responseData.message = 'OK';
   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
