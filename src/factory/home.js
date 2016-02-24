/* global co, templates */
'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.home
 * @param {object} coreText The core application text to use.
 * @returns Promise
 */
module.exports = coreText => co(function(){
   return templates.home({coreText});
});
