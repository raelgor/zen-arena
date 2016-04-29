/* global co, PageRoute, factory, log */
'use strict';

/**
 * Request handler of the home page.
 * @method pageHandlers.home
 * @param {Response} response The response object.
 * @returns undefined
 */
var route = new PageRoute(response => co(function*() {

   log.debug('pageHandlers.home: Making response...');

   if(!response.request.__user)
      response.responseData = yield factory.index.make(
         response.request,
         response.pageData,
         yield factory.home.make(
            response.request,
            response.pageData.coreText
     ));
    else
      response.responseData = yield factory.index.make(
          response.request,
          response.pageData,
          yield factory.feed.make(
            response.request,
            response.pageData.coreText,
            response.request.__user,
            response.request.lang
         )
     );

  response.end();

}).catch(log.error));

module.exports = route;
