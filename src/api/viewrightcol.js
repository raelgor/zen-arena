'use strict';

var r = new APIRoute();

r.setName('viewrightcol');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler((response,req) => co(function*(){

   response.responseData = {
      html: yield factory.rightcol.make(
         req,
         coreTextCache[req.lang],
         req.__user,
         req.lang
      )
   };

   response.end();

}).catch(log.error));
