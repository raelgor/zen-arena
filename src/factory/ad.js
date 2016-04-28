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
module.exports = (coreText, id, uid) => co(function*(){
   log.debug('factory.ad: Making...');
   var timer = new Timer();

   var ad;

   if(+(yield cache.exists(`ad:${id}`))){
      ad = yield cache.hgetall(`ad:${id}`);
   } else {
      let result = yield dataTransporter.dbc.collection('ads').find({
         id: +id
      }).toArray();
      ad = result[0];
      yield cache.hmset(`ad:${id}`, ad);
   }

   // Build
   var result = templates.ad({
      coreText,
      ad
   });

   log.debug(`factory.ad: Done. (${timer.click()}ms)`);
   return result;
});
