/* global co, PageRoute, factory, dataTransporter */
'use strict';

/**
 * Request handler of the unsubscribeall page.
 * @method pageHandlers.unsubscribeall
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new PageRoute(response => co(function*() {

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

  response.responseData = yield factory.index(
     response.pageData,
     yield factory.unsubscribeall(response.pageData.coreText)
  );

  response.end();

}));
