'use strict';

module.exports = id => co(function*(){

   var comment;

   // Get comment info
   if(+(yield cache.exists(`commentview:${id}`)))
      comment = yield cache.hgetall(`commentview:${id}`);
   else {
      comment = yield mongos.collection('comments').find({id:+id}).toArray();
      comment = comment[0];
      if(comment) {
         comment.likes = yield mongos
                              .collection('comment_likes')
                              .find({ comment_id: +id })
                              .count();
         yield cache.hmset(`commentview:${id}`, comment);
      }
   }

   return comment;

}).catch(e => instance.emit('error', e));
