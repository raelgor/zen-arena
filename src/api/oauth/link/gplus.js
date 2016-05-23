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

   oauth2Client.setCredentials({ access_token });

   var profile = yield new Promise(resolve =>
      plus.people.get(
         { userId: 'me', auth: oauth2Client },
         (err, response) => resolve(response)));

   if(!profile.id)
      return response.error('error_bad_go_access_token');

   yield job.updateUserGoogleData(req.__user, profile);

   response.responseData = {
      message: 'ok',
      name: profile.displayName
   };

   response.end();

}));
