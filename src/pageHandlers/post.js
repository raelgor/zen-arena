/* global co, PageRoute, factory, log */
'use strict';

var r = new PageRoute();

r.setName('post');

module.exports = r;

r.setHandler(response => co(function*() {

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
