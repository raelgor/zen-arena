import PageRoute from '../classes/PageRoute';

var r = new PageRoute();

r.setName('home');

export default r;

r.setHandler(async function(response) {

   if(!response.request.__user)
      response.responseData = await factory.index.make(
         response.request,
         response.pageData,
         await factory.home.make(
            response.request,
            response.pageData.coreText
     ));
    else
      response.responseData = await factory.index.make(
          response.request,
          response.pageData,
          await factory.feed.make(
            response.request,
            response.pageData.coreText,
            response.request.__user,
            response.request.lang
         )
     );

  response.end();

});
