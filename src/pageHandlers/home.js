'use strict';

var r = new PageRoute();

r.setName('home');

module.exports = r;

r.setHandler(response => co(function*() {

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
