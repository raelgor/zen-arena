/* global co, cacheClient, config, appConfig, update_user */
/* global log_user_in, make_user_from_go_info, oauth_exploit_check */
'use strict';

const google = require('googleapis');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(appConfig.google_oauth.client_id,
                                appConfig.google_oauth.client_secret);

module.exports = (req, res) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.access_token;

   if(!valid_request)
      return res._error('error_invalid_request');

   var access_token = req.body.message.access_token;

   oauth2Client.setCredentials({ access_token });

   var user_go_info = yield new Promise(resolve =>
      plus.people.get(
         { userId: 'me', auth: oauth2Client },
         (err, response) => resolve(response)));

   if(!user_go_info.id)
      return res._error('error_bad_go_access_token');

   var $or = [{ goid: user_go_info.id }];

   user_go_info.emails &&
   user_go_info.emails[0] &&
   user_go_info.emails[0].value &&
   $or.push({ email: user_go_info.emails[0].value });

   var user = yield cacheClient.get({
      query: { $or },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   user = user[0];

   var lang_hint;
   if(req.cookies.lang && ~appConfig.app_languages.indexOf(req.cookies.lang))
      lang_hint = req.cookies.lang;

   if(!user)
      user = yield make_user_from_go_info(user_go_info, lang_hint);
   else
      if(user.goid != user_go_info.id)
         yield cacheClient.update({
            query: { id: +user.id },
            update: { $set: { goid: user.goid = user_go_info.id } },
            database: config.cache_server.db_name,
            collection: 'users'
         });

   yield oauth_exploit_check(user, 'goid', user_go_info.id);

   if(user_go_info.emails[0].value && (!user.email || (user.email === user_go_info.emails[0].value && !user.email_verified))) {
      user.email = user_go_info.emails[0].value;
      user.email_verified = true;
      yield update_user(user);
   }

   if(req.cookies.lang !== user.lang)
      res.cookie('lang', user.lang, {
         maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   log_user_in(res, user);

});
