/* global templates, co */
'use strict';

/**
 * Produces html for the verify email view and returns it asynchronously.
 * @method factory.verifyemail
 * @param {object} coreText The core application text to use.
 * @returns Promise
 */
module.exports = coreText => co(() => {
   return templates.verifyemail({coreText});
});
