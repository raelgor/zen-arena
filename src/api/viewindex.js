'use strict';

var r = new APIRoute();

r.setName('viewindex');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler((response,req) => co(function*(){

   response.responseData = {
      html: yield factory.viewindex.make(
         req,
         coreTextCache[req.lang],
         req.__user,
         req.body.message.depth,
         req.lang
      )
   };

   response.end();

}).catch(log.error));
