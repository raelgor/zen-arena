/* global co, templates, dataTransporter, log, Timer, cache */
'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.post
 * @param {object} id The post's id.
 * @param {object} coreText The core application text to use.
 * @param {object} uid The user that owns this post. Used to get data like if
 this post is liked by them or not.
 * @returns Promise
 */
module.exports = (id, coreText, uid) => co(function*(){
   log.debug('factory.comment: Making...');
   var timer = new Timer();

   var comment = yield dataTransporter.getCommentView(id);

   // Get poster info
   var user_id = comment.user_id;

   var user = yield dataTransporter.getUser({id:+user_id});

   comment.userImage = user.get('image');
   comment.displayName = user.displayName();

   // Check if auth user has liked and if can delete
   if(uid) {
      if(+(yield cache.exists(`commentselflike:${id}:${uid}`)))
         comment.selfLiked = yield cache.get(`commentselflike:${id}:${uid}`);
      else {
         let result = yield dataTransporter.dbc.collection('comment_likes').find({
            comment_id: +id,
            user_id: +uid
         }).count();
         comment.selfLiked = +result;
         yield cache.set(`commentselflike:${id}:${uid}`, comment.selfLiked);
      }
      if(+uid === +comment.user_id) {
         comment.deletable = true;
      } else {
         let post = yield dataTransporter.getPost(comment.post_id);
         +post.publisher === +uid && (comment.deletable = true);
      }
   }
   
   // Build
   var result = templates.comment({
      coreText,
      comment
   });

   log.debug(`factory.comment: Done. (${timer.click()}ms)`);
   return result;
});
