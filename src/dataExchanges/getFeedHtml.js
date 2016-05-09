'use strict';

module.exports = (req, coreText, uid, ns_origin, owner_id, type, skip, limit) =>
   co(function*(){

      var cacheKey = `feed:${ns_origin}:${owner_id}:${type}`;
      var html = '';
      var postIds;

      if(+(yield cache.exists(cacheKey)))
         postIds = yield cache.zrevrange(cacheKey, skip, +skip + (+limit));
      else {
         let posts = yield mongos.collection('feeds').find({
            ns_origin,
            owner_id: +owner_id,
            type
         }).sort({date:1}).toArray();

         if(posts instanceof Array)
            for(let post of posts)
               yield cache.zadd(cacheKey, post.date_added, post.post_id);
      }

      postIds = yield cache.zrevrange(cacheKey, skip, +skip + (+limit));

      if(postIds instanceof Array)
         for(let id of postIds) {
            let postHtml = yield factory.post.make(req, +id, coreText, +uid);
            !postHtml && (yield cache.zrem(cacheKey, id));
            html += postHtml;
         }

      return html;

}).catch(e => instance.emit('error', e));
