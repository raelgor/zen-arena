'use strict';

/**
 * Returns the core application text for a specified language.
 * @function text
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response,req) => co(function*(){

   var uid = req.__user && req.__user.get('id');
   var index = req.params.index;

   response.responseData = {
      html: yield dataTransporter.getFeedHtml(
         make_core_text(req.lang),
         // Auth user
         uid,
         // Namespace origin
         'user',
         // Owner id
         uid,
         // Feed type (wall/feed)
         'feed',
         // Skip
         index,
         // Limit
         10
      )
   };

   response.end();

}).catch(log.error));

route.prependRoute(routes.authentication.route);

module.exports = route;
