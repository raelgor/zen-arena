/* global co, PageRoute, factory, log */
'use strict';

/**
 * Request handler of the home page.
 * @method pageHandlers.home
 * @param {Response} response The response object.
 * @returns undefined
 */
var route = new PageRoute(response => co(function*() {

   log.debug('pageHandlers.post: Making response...');

   response.responseData = yield factory.index.make(
       response.request,
       response.pageData,
       yield factory.viewpost.make(
         response.request,
         response.pageData.coreText,
         response.request.__user,
         0,
         response.request.params.post_id)
     );

  response.end();

}).catch(log.error));

module.exports = route;
