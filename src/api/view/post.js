'use strict';

var r = new APIRoute();

r.setName('viewpost');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler((response,req) => co(function*(){

   response.responseData = {
      html: yield factory.view.post.make(
         req,
         coreTextCache[req.lang],
         req.__user,
         req.body.message.depth,
         req.params.post_id
      )
   };

   response.end();

}).catch(e => instance.emit('error', e)));
