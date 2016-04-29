/* global APIRoute, routes, co, dataTransporter, delete_comment */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var uid = req.__user.get('id');
   var id = req.params.comment_id;
   var comment = yield dataTransporter.getCommentView(id);

   if(!comment)
      return response.error('error_no_such_comment');

   if(+uid === +comment.user_id) {
      comment.deletable = true;
   } else {
      let post = yield dataTransporter.getPost(comment.post_id);
      +post.publisher === +uid && (comment.deletable = true);
   }

   if(!comment.deletable)
      return response.error('error_not_authorized_to_delete');

   yield delete_comment(id);

   // Return geo info
   response.responseData = { message: 'OK' };

   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
