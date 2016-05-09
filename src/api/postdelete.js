'use strict';

var r = new APIRoute();

r.setName('postdelete');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler((response, req) => co(function*(){

   var uid = req.__user.get('id');
   var id = req.params.post_id;

   var post = yield data.getPost(+id);

   if(+uid !== +post.publisher)
      return response.error('error_not_authorized_to_delete');

   var comments = yield mongos.collection('comments').find({post_id:+id}).toArray();

   for(let comment of comments)
      yield delete_comment(comment.id);

   yield mongos.collection('posts').remove({id:+id});
   yield mongos.collection('feeds').remove({post_id:+id});
   yield mongos.collection('post_likes').remove({post_id:+id},{multi:true});

   yield cache.del(`post:${id}`);
   yield cache.del(`postview:${id}`);
   yield cache.del(`commentpool:${id}`);

   // Return geo info
   response.responseData = { message: 'OK' };

   response.end();

}));
