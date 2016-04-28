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
module.exports = (coreText, user, depth) => co(function*(){
   log.debug('factory.viewindex: Making...');
   var timer = new Timer();
   var html = '';

   if(!user)
      html = yield factory.home(coreText);
   else {
      depth = depth || 2;

      switch (+depth) {
         case 2:
            html = yield factory.feed(
               coreText,
               user
            );
            break;
         case 1:
            html = yield factory.feedLeftColumn(
               coreText,
               user
            );
            break;
         default:

      }

   }

   log.debug(`factory.viewindex: Done. (${timer.click()}ms)`);
   return html;
});
