/* global co, PageRoute, factory, dataTransporter, postman */
'use strict';

var r = new PageRoute();

r.setName('verifyemail');

module.exports = r;

r.setHandler(response => co(function*() {

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
