'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.home
 * @param {object} coreText The core application text to use.
 * @param {object} uid The authenticated user.
 * @returns Promise
 */
module.exports = (coreText, user) => co(function*(){
   log.debug('factory.feed: Making...');
   var timer = new Timer();
   var feedPosts = yield dataTransporter.getFeedHtml(
      coreText,
      // Auth user
      user.get('id'),
      // Namespace origin
      'user',
      // Owner id
      user.get('id'),
      // Feed type (wall/feed)
      'feed',
      // Skip
      0,
      // Limit
      10
   );

   var result = templates.feedLeftColumn({
      coreText,
      data: {
         userImage: user.get('image'),
         feedPosts
      }
   });

   log.debug(`factory.feed: Done. (${timer.click()}ms)`);
   return result;
}).catch(log.error);
