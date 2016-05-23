'use strict';

var r = new APIRoute();

r.setName('oauth.link.fb');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.prependRoute(assertBody({
   message: {
      access_token: '1'
   }
}));

module.exports = r;

r.setHandler((response, req) => co(function*(){

   var access_token = req.body.message.access_token;

   var user_fb_info = yield job.getFacebookProfile(access_token);

   if(!user_fb_info.id)
      return response.error('error_bad_fb_access_token');

   response.responseData = {
      message: 'ok',
      name: user_fb_info.name
   };

   response.end();

}));
