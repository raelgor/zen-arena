/* global co, User, increment, cacheClient, config, appConfig, on_user_created */
'use strict';

module.exports = (go_info, language) => co(function*() {

   var user = new User();
   var id = yield increment('users', 'id');

   if(go_info.name) {

      if(go_info.name.familyName)
         user.last_name = go_info.name.familyName;

      if(go_info.name.givenName)
         user.first_name = go_info.name.givenName;

   }

   if(!user.first_name && go_info.displayName)
      user.first_name = go_info.displayName.split(' ')[0] || '';

   if(!user.last_name && go_info.displayName)
      user.last_name = go_info.displayName.split(' ').pop() || '';

   user.goid = go_info.id;
   user.id = id;
   user.date_joined = new Date().toISOString();
   user.lang = language || appConfig.default_lang;

   if(go_info.gender)
      user.gender = go_info.gender;

   if(go_info.emails && go_info.emails[0] && go_info.emails[0].value)
      user.email = go_info.emails[0].value;

   if(go_info.image && go_info.image.url) {
      user.image_type = 'g_plus_link';
      user.image = go_info.image.url.replace(/([\?\&])sz=[0-9]+/,'$1sz=500');
   }

   yield cacheClient.update({
      query: { id },
      update: { $set: user },
      options: { upsert: true },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   yield on_user_created(user);

   return user;

});
