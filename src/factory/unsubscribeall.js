/* global co, templates, templates */
'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.unsubscribeall
 * @param {object} coreText The core application text to use.
 * @returns Promise
 */
module.exports = coreText => co(() => {
   return templates.unsubscribeall({coreText});
});
