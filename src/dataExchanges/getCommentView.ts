'use strict';

export default async function getCommentView(id: number) {

   var comment;

   // Get comment info
   if(+(await instance.cache.exists(`commentview:${id}`)))
      comment = await instance.cache.hgetall(`commentview:${id}`);
   else {
      comment = await instance.mongos.collection('comments').find({id:+id}).toArray();
      comment = comment[0];
      if(comment) {
         comment.likes = await instance.mongos
                              .collection('comment_likes')
                              .find({ comment_id: +id })
                              .count();
         await instance.cache.hmset(`commentview:${id}`, comment);
      }
   }

   return comment;

}
