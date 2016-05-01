'use strict';

var r = new APIRoute();

r.setName('postcreate');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

module.exports = r;

r.setHandler((response, req) => co(function*(){

   var uid = req.__user.get('id');
   var text = String(req.body.message.text);
   var date = Date.now();
   var id = yield increment('posts', 'id');
   var post = {
      id,
      text: text,
      date_created: date,
      date_published: date,
      published: true,
      publisher: +uid
   };

   yield dataTransporter.dbc.collection('posts').insert(post);

   yield dataTransporter.dbc.collection('feeds').insert({
      ns_origin: 'user',
      type: 'feed',
      date_added: date,
      post_id: id,
      owner_id: +uid
   });

   yield cache.zadd(`feed:user:${uid}:feed`, date, id);

   // Return geo info
   response.responseData = {
      message: 'OK',
      html: yield factory.post.make(req, id, coreTextCache[req.lang], uid)
   };

   response.end();

}));
