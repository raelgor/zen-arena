'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.home
 * @param {object} coreText The core application text to use.
 * @param {object} uid The authenticated user.
 * @returns Promise
 */
module.exports = (coreText, user) => co(function*(){
   log.debug('factory.rightcol: Making...');
   var timer = new Timer();

   var result = templates.rightcol({
      coreText,
      data: {
         user: user.record,
         ads: yield dataTransporter.getRandomAdViews(
            coreText,
            user && user.get('id'),
            2
         )
      }
   });

   log.debug(`factory.rightcol: Done. (${timer.click()}ms)`);
   return result;
}).catch(log.error);
