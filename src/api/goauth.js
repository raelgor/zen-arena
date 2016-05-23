'use strict';

global.google = require('googleapis');
global.plus = google.plus('v1');
global.OAuth2 = google.auth.OAuth2;
global.oauth2Client = new OAuth2(appConfig.google_oauth.client_id,
                                appConfig.google_oauth.client_secret);

var r = new APIRoute();

r.setName('goauth');

module.exports = r;

r.setHandler((response, req, res) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.access_token;

   if(!valid_request)
      return response.error('error_invalid_request');

   var access_token = req.body.message.access_token;

   oauth2Client.setCredentials({ access_token });

   var user_go_info = yield new Promise(resolve =>
      plus.people.get(
         { userId: 'me', auth: oauth2Client },
         (err, response) => resolve(response)));

   if(!user_go_info.id)
      return response.error('error_bad_go_access_token');

   var $or = [{ goid: user_go_info.id }];

   user_go_info.emails &&
   user_go_info.emails[0] &&
   user_go_info.emails[0].value &&
   $or.push({ email: user_go_info.emails[0].value });

   var user = yield data.getUser({ $or });

   var lang_hint;
   if(req.cookies.lang && ~appLanguagesCodes.indexOf(req.cookies.lang))
      lang_hint = req.cookies.lang;

   if(!user)
      user = yield make_user_from_go_info(user_go_info, lang_hint);
   else
      if(user.get('goid') != user_go_info.id)
         yield data.updateUser(
            user,
            { $set: { goid: user.set('goid', user_go_info.id) } }
         );

   yield oauth_exploit_check(user, 'goid', user_go_info.id);

   if(user_go_info.emails[0].value && (!user.get('email') || (user.get('email') === user_go_info.emails[0].value && !user.get('email_verified')))) {
      user.set('email', user_go_info.emails[0].value);
      user.set('email_verified', true);
      yield user.updateRecord();
   }

   if(req.cookies.lang !== user.lang)
      res.cookie('lang', user.get('lang'), {
         maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   log_user_in(response, user);

}));
