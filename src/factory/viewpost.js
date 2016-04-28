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
module.exports = (coreText, user, depth, post_id) => co(function*(){
   log.debug('factory.viewpost: Making...');
   var timer = new Timer();

   var html = '';

   depth = depth || 2;

   switch (+depth) {
      case 1:
         html = yield factory.post(
            +post_id,
            coreText,
            user && +user.get('id')
         );
         break;
      case 2:
         html = templates.feed({
            coreText,
            data: {
               leftColumn: yield factory.post(
                  +post_id,
                  coreText,
                  user && +user.get('id')
               ),
               rightColumn: yield factory.rightcol(coreText, user)
            }
         });
         break;
      default:

   }

   log.debug(`factory.viewpost: Done. (${timer.click()}ms)`);
   return html;
});
