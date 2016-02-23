/* global co, PageRoute, factory */
'use strict';

module.exports = new PageRoute(response => co(function*() {
   
  response.responseData = yield factory.index(
     response.pageData,
     yield factory.home(response.pageData.coreText)
  );

  response.end();

}));
