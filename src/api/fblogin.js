/* global co, fb, cacheClient, config */
/* global make_user_from_fb_info, log_user_in */
'use strict';

module.exports = (req, res) => co(function*(){

   var valid_request =
   req.body &&
   req.body.message &&
   req.body.message.access_token;

   if(!valid_request)
      return res.end(JSON.stringify({error: 'error_bad_request'}));

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
      return res.end(JSON.stringify({error: 'error_bad_request'}));

   var $or = [{ fbid: user_fb_info.id }];
   user_fb_info.email && $or.push({ email: user_fb_info.email });

   var user = yield cacheClient.get({
      query: { $or },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   user = user[0];

   if(!user) {
      user = yield make_user_from_fb_info(user_fb_info);
   }

   log_user_in(res, user);

});
