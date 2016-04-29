/* global co, PageRoute, factory, dataTransporter, postman */
'use strict';

/**
 * Request handler of the verifyemail page.
 * @method pageHandlers.verifyemail
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new PageRoute(response => co(function*() {

   var token;

   try {
      token = response.request.params.token;
   } catch(err) {}

  response.responseData = yield factory.index.make(
     response.request,
     response.pageData,
     yield factory.verifyemail.make(response.request, response.pageData.coreText)
  );

  if(token) {
     let user = yield dataTransporter.getUser({
        verify_email_token: String(token)
     });

     if(user && !user.get('email_verified')){
        user.set('email_verified', true);
        postman.welcome(user);
        yield user.updateRecord();
     }
  }

  response.end();

}));
