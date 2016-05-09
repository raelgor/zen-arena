'use strict';

module.exports = (req, id, coreText, uid) => co(function*(){

   var viewData = cache.hgetall(`postview:${id}`);

   if(!viewData.id) {

      viewData = yield data.getPost(id);

      if(!viewData) {
         return '';
      }

      viewData.likes = yield mongos
                        .collection('post_likes')
                        .find({ post_id: id })
                        .count();

      viewData.comments = yield mongos
                           .collection('comments')
                           .find({ post_id: id })
                           .count();

      viewData.shares = 0;

      var publisher = yield data.getRecordByNamespace(req, +viewData.publisher);

      if(!publisher)
         return '';

      viewData.publisher_namespace = publisher.namespace || publisher.get('id');

      if(publisher instanceof User) {
         viewData.publisher_namespace = publisher.get('username') || publisher.get('id');
         viewData.publisher_image = publisher.get('image');
         viewData.publisher_display_name = publisher.displayName();
      }

      yield cache.hmset(`postview:${id}`, viewData);

   } else log.debug('factory.post: Found in cache.');

   if(uid) {
      viewData.selfLiked = yield cache.get(`postselflike:${id}:${uid}`);

      if(!viewData.selfLiked) {

         let result = yield mongos.collection('post_likes').find({
            post_id: +id,
            user_id: +uid
         }).count();

         viewData.selfLiked = result;

         yield cache.set(`postselflike:${id}:${uid}`, viewData.selfLiked);

      }

      viewData.selfLiked = +viewData.selfLiked;
   }

   var NUM_OF_COMM = 2;
   viewData.commentsHtml = [];

   if(+(yield cache.exists(`commentpool:${viewData.id}`))) {

      let totalComments = +(yield cache.zcount(`commentpool:${viewData.id}`,'-inf','+inf'));
      let commentIds = yield cache.zrange(
         `commentpool:${viewData.id}`,
         totalComments-NUM_OF_COMM,
         totalComments);

      viewData.commentsHtml = commentIds;

   } else {

      let comments = yield mongos
                           .collection('comments')
                           .find({ post_id: +viewData.id })
                           .sort({date:1})
                           .toArray();

      for(let comment of comments)
         yield cache.zadd(`commentpool:${viewData.id}`, comment.date, comment.id);

      while(NUM_OF_COMM--) {
         let comment = comments.pop();
         comment && viewData.commentsHtml.push(comment.id);
      }
      viewData.commentsHtml.reverse();
   }

   for(let index in viewData.commentsHtml)
      viewData.commentsHtml[index] =
         yield factory.comment.make(req, viewData.commentsHtml[index], coreText, uid);

   if(+uid === +viewData.publisher)
      viewData.isOwner = true;

   return viewData;

}).catch(e => instance.emit('error', e));
