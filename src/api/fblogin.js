/* global co, fb, cacheClient, config, appConfig */
/* global make_user_from_fb_info, log_user_in */
'use strict';

module.exports = (req, res) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.access_token;

   if(!valid_request)
      return res._error('error_invalid_request');

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
      return res._error('error_bad_fb_access_token');

   var $or = [{ fbid: user_fb_info.id }];
   user_fb_info.email && $or.push({ email: user_fb_info.email });

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
      user = yield make_user_from_fb_info(user_fb_info, lang_hint);
   else
      if(user.fbid != user_fb_info.id)
         yield cacheClient.update({
            query: { id: +user.id },
            update: { $set: { fbid: user.fbid = user_fb_info.id } },
            database: config.cache_server.db_name,
            collection: 'users'
         });

   if(req.cookies.lang !== user.lang)
      res.cookie('lang', user.lang, {
         maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true
      });

   log_user_in(res, user);

});
