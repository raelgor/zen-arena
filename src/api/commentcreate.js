'use strict';

var r = new APIRoute();

r.setName('commentcreate');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler((response, req) => co(function*(){

   var post_id = req.params.post_id;

   if(!req.body.message.comment)
      return response.error('error_empty_comment');

   var comment = {
      user_id: +req.__user.get('id'),
      id: yield increment('comments','id'),
      post_id: +post_id,
      text: req.body.message.comment,
      date: Date.now()
   };

   if(!post_id)
      response.error('error_no_id');

   yield dataTransporter
            .dbc
            .collection(`comments`).insert(comment);

   yield cache.hincrby(`postview:${post_id}`, 'comments', 1);
   yield cache.zadd(`commentpool:${post_id}`, comment.date, comment.id);

   // Return geo info
   response.responseData = {
      message: 'OK',
      commentHtml: yield factory.comment.make(
         req,
         comment.id,
         coreTextCache[req.lang],
         +req.__user.get('id'))
   };

   response.end();

}));
