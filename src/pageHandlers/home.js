/* global co, PageRoute, factory, log */
'use strict';

/**
 * Request handler of the home page.
 * @method pageHandlers.home
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new PageRoute(response => co(function*() {

   log.debug('pageHandlers.home: Making response...');

   response.responseData = yield factory.index(
      response.pageData,
      yield factory.home(response.pageData.coreText)
  );

  response.end();

}));
