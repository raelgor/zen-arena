/* global co, templates, log, Timer */
'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.home
 * @param {object} coreText The core application text to use.
 * @param {object} uid The authenticated user.
 * @returns Promise
 */
module.exports = (coreText, uid) => co(function*(){
   log.debug('factory.feed: Making...');
   var timer = new Timer();

   var result = templates.feed({
      coreText,
      feed:'feed'
   });

   log.debug(`factory.feed: Done. (${timer.click()}ms)`);
   return result;
}).catch(log.error);
