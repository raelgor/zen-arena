'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.home
 * @param {object} coreText The core application text to use.
 * @param {object} uid The authenticated user.
 * @returns Promise
 */
module.exports = (coreText, uid) => co(function*(){
   log.debug('factory.home: Making...');
   var timer = new Timer();
   var posts = [];

   for(let index of appConfig.home_posts)
      posts[index] = yield factory.post(index, coreText, uid);

   var result = templates.home({
      coreText,
      posts,
      partners: appConfig.partners
   });

   log.debug(`factory.home: Done. (${timer.click()}ms)`);
   return result;
}).catch(log.error);
