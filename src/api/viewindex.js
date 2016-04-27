/* global co, APIRoute, factory, routes, log, make_core_text */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @function text
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response,req) => co(function*(){

   if(!response.request.__user)
      response.responseData = {
         html: yield factory.home(make_core_text(req.lang))
      };
    else
      response.responseData = {
          html: yield factory.feed(
            make_core_text(req.lang),
            response.request.__user.get('id'))
         };

   response.end();

}).catch(log.error));

route.prependRoute(routes.authentication.route);

module.exports = route;
