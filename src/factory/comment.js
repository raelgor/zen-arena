'use strict';

var f = new Factory();

f.setName('comment');
f.setGenerator(generator);

module.exports = f;

function* generator(req, id, coreText, uid){

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

   return result;

}
