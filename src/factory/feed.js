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

   var result = templates.feed({
      coreText,
      data: {
         leftColumn: yield factory.feedLeftColumn(coreText, user),
         rightColumn: yield factory.rightcol(coreText, user)
      }
   });

   log.debug(`factory.feed: Done. (${timer.click()}ms)`);
   return result;
}).catch(log.error);
