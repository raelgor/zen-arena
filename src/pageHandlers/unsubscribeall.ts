import PageRoute from '../classes/PageRoute';

var r = new PageRoute();

r.setName('unsubscribeall');

export default r;

r.setHandler(async function(response) {

   var token;

   try{
      token = response.request.params.token;
   } catch(err) {}

   response.pageData.clientData.page_data.token = token;

   if(token) {
      var user = await data.getUser({
         unsubscribe_all_token: String(token)
      });

      if(user) {
         user.set('unsubscribe_all_email', true);
         await user.updateRecord();
      }
   }

  response.responseData = await factory.index.make(
     response.request,
     response.pageData,
     await factory.unsubscribeall.make(response.request, response.pageData.coreText)
  );

  response.end();

});
