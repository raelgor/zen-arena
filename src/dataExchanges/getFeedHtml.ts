import * as express from 'express';

export default async function getFeedHtml(
  req: any,
  coreText: any,
  uid: number,
  ns_origin: string,
  owner_id: number,
  type: string,
  skip: number,
  limit: number
): Promise<string> {

  var cache = instance.cache;
  var mongos = instance.mongos;

      var cacheKey = `feed:${ns_origin}:${owner_id}:${type}`;
      var html = '';
      var postIds;

      if(+(await cache.exists(cacheKey)))
         postIds = await cache.zrevrange(cacheKey, skip, +skip + (+limit));
      else {
         let posts = await mongos.collection('feeds').find({
            ns_origin,
            owner_id: +owner_id,
            type
         }).sort({date:1}).toArray();

         if(posts instanceof Array)
            for(let post of posts)
               await cache.zadd(cacheKey, post.date_added, post.post_id);
      }

      postIds = await cache.zrevrange(cacheKey, skip, +skip + (+limit));

      if(postIds instanceof Array)
         for(let id of postIds) {
            let postHtml = await factory.post.make(req, +id, coreText, +uid);
            !postHtml && (await cache.zrem(cacheKey, id));
            html += postHtml;
         }

      return html;

};
