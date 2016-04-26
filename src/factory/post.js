/* global co, templates, dataTransporter, User, log, Timer */
/* global cache, factory */
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
   log.debug('factory.post: Making...');
   var timer = new Timer();

   var data = cache.hgetall(`postview:${id}`);

   if(!data.id) {

      log.debug('factory.post: Not in cache. Getting post by id...');

      data = yield dataTransporter.getPost(id);

      data.likes = yield dataTransporter
                           .dbc
                           .collection('post_likes')
                           .find({ post_id: id })
                           .count();

      data.comments = yield dataTransporter
                           .dbc
                           .collection('comments')
                           .find({ post_id: id })
                           .count();

      data.shares = 0;

      log.debug(`factory.post: Done. (${timer.click()}ms) Getting record by namespace...`);
      var publisher = yield dataTransporter.getRecordByNamespace(+data.publisher);

      log.debug(`factory.post: Done. (${timer.click()}ms) Setting view variables...`);
      data.publisher_namespace = publisher.namespace || publisher.get('id');

      if(publisher instanceof User) {
         data.publisher_namespace = publisher.get('username') || publisher.get('id');
         data.publisher_image = publisher.get('image');
         data.publisher_display_name = publisher.displayName();
      }

      yield cache.hmset(`postview:${id}`, data);

   } else log.debug('factory.post: Found in cache.');

   if(uid) {
      data.selfLiked = yield cache.get(`postselflike:${id}:${uid}`);

      if(!data.selfLiked) {

         let result = yield dataTransporter.dbc.collection('post_likes').find({
            post_id: +id,
            user_id: +uid
         }).count();

         data.selfLiked = result;

         yield cache.set(`postselflike:${id}:${uid}`, data.selfLiked);

      }

      data.selfLiked = +data.selfLiked;
   }

   log.debug(`factory.post: Done. Loading recent comments...`);

   var NUM_OF_COMM = 2;
   data.commentsHtml = [];

   if(+(yield cache.exists(`commentpool:${data.id}`))) {

      let totalComments = +(yield cache.zcount(`commentpool:${data.id}`,'-inf','+inf'));
      let commentIds = yield cache.zrange(
         `commentpool:${data.id}`,
         totalComments-NUM_OF_COMM,
         totalComments);

      data.commentsHtml = commentIds;

   } else {

      let comments = yield dataTransporter
         .dbc
         .collection('comments')
         .find({ post_id: +data.id })
         .sort({date:1})
         .toArray();

      for(let comment of comments)
         yield cache.zadd(`commentpool:${data.id}`, comment.date, comment.id);

      while(NUM_OF_COMM--) {
         let comment = comments.pop();
         comment && data.commentsHtml.push(comment.id);
      }
      data.commentsHtml.reverse();
   }

   log.debug(`factory.post: Done. (${timer.click()}ms) Building html...`);

   for(let index in data.commentsHtml)
      data.commentsHtml[index] = yield factory.comment(data.commentsHtml[index], coreText, uid);

   if(+uid === +data.publisher)
      data.isOwner = true;

   var result = templates.post({
      coreText,
      data
   });

   log.debug(`factory.post: Done. (${timer.click()}ms)`);
   return result;
});
