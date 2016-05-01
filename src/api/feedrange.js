'use strict';

var r = new APIRoute();

r.setName('feedrange');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler((response,req) => co(function*(){

   var uid = req.__user && req.__user.get('id');
   var index = req.params.index;

   response.responseData = {
      html: yield dataTransporter.getFeedHtml(
         req,
         coreTextCache[req.lang],
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
