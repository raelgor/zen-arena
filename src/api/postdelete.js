/* global APIRoute, routes, co, dataTransporter, delete_comment, cache */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var uid = req.__user.get('id');
   var id = req.params.post_id;

   var post = yield dataTransporter.getPost(+id);

   if(+uid !== +post.publisher)
      return response.error('error_not_authorized_to_delete');

   var comments = yield dataTransporter.dbc.collection('comments').find({post_id:+id}).toArray();

   for(let comment of comments)
      yield delete_comment(comment.id);

   yield dataTransporter.dbc.collection('posts').remove({id:+id});
   yield dataTransporter.dbc.collection('feeds').remove({post_id:+id});
   yield dataTransporter.dbc.collection('post_likes').remove({post_id:+id},{multi:true});

   yield cache.del(`post:${id}`);
   yield cache.del(`postview:${id}`);
   yield cache.del(`commentpool:${id}`);

   // Return geo info
   response.responseData = { message: 'OK' };

   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
