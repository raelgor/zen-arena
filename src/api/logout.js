'use strict';

var r = new APIRoute();

r.setName('logout');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler((response, req, res) => co(function*(){

   res.clearCookie('st');

   yield dataTransporter.remove({
      query: { session_token: req.__session.session_token },
      collection: 'sessions'
   });

   yield cache.del(`sessions:${req.__session.session_token}`);

   response.responseData = {
      message: 'OK',
      html: yield factory.viewindex.make(
         req,
         coreTextCache[req.lang],
         null,
         2,
         req.lang
      )
   };

   response.end();

}));
