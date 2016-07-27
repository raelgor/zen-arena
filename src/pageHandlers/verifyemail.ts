import PageRoute from '../classes/PageRoute';

var r = new PageRoute();

r.setName('verifyemail');

export default r;

r.setHandler(async function(response) {

   var token;

   try {
      token = response.request.params.token;
   } catch(err) {}

  response.responseData = await factory.index.make(
     response.request,
     response.pageData,
     await factory.verifyemail.make(response.request, response.pageData.coreText)
  );

  if(token) {
     let user = await data.getUser({
        verify_email_token: String(token)
     });

     if(user && !user.get('email_verified')){
        user.set('email_verified', true);
        postman.welcome(user);
        await user.updateRecord();
     }
  }

  response.response.redirect('/');

});
