/* global co, PageRoute, factory, dataTransporter */
'use strict';

var r = new PageRoute();

r.setName('unsubscribeall');

module.exports = r;

r.setHandler(response => co(function*() {

   var token;

   try{
      token = response.request.params.token;
   } catch(err) {}

   response.pageData.clientData.page_data.token = token;

   if(token) {
      var user = yield dataTransporter.getUser({
         unsubscribe_all_token: String(token)
      });

      if(user) {
         user.set('unsubscribe_all_email', true);
         yield user.updateRecord();
      }
   }

  response.responseData = yield factory.index.make(
     response.request,
     response.pageData,
     yield factory.unsubscribeall.make(response.request, response.pageData.coreText)
  );

  response.end();

}));
