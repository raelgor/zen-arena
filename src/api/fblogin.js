/* global co, fb, dataTransporter, appConfig, oauth_exploit_check */
/* global make_user_from_fb_info, log_user_in, APIRoute */
'use strict';

/**
 * Logs the user in or registers using Facebook OAuth 2.
 * @function fblogin
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response, req, res) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.access_token;

   if(!valid_request)
      return response.error('error_invalid_request');

   var access_token = req.body.message.access_token;

   var user_fb_info = yield new Promise(resolve => fb.api('/me', {
      fields: [
         'id',
         'name',
         'first_name',
         'last_name',
         'gender',
         'email'
      ], access_token
   }, resolve));

   if(!user_fb_info.id)
      return response.error('error_bad_fb_access_token');

   var $or = [{ fbid: user_fb_info.id }];
   user_fb_info.email && $or.push({ email: user_fb_info.email });

   var user = yield dataTransporter.getUser({ $or });

   var lang_hint;
   if(req.cookies.lang && ~appConfig.app_languages.indexOf(req.cookies.lang))
      lang_hint = req.cookies.lang;

   if(!user)
      user = yield make_user_from_fb_info(user_fb_info, lang_hint);
   else
      if(user.get('fbid') != user_fb_info.id)
         yield dataTransporter.updateUser(
            user,
            { $set: { fbid: user.set('fbid', user_fb_info.id) } }
         );

   yield oauth_exploit_check(user, 'fbid', user_fb_info.id);

   if(user_fb_info.email && (!user.get('email') || (user.get('email') === user_fb_info.email && !user.get('email_verified')))) {
      user.set('email', user_fb_info.email);
      user.set('email_verified', true);
      yield user.updateRecord();
   }

   if(req.cookies.lang !== user.get('lang'))
      res.cookie('lang', user.get('lang'), {
         maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   log_user_in(response, user);

}));

module.exports = route;
