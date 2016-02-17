/* global co, User, increment, cacheClient, config, appConfig, postman */
'use strict';

const utilizable_fields = ['first_name', 'last_name', 'gender', 'email'];

module.exports = (fb_info, language) => co(function*() {

   var user = new User();
   var id = yield increment('users', 'id');

   for(let field in fb_info)
      if(~utilizable_fields.indexOf(field))
         user[field] = fb_info[field];

   if(!user.first_name && fb_info.name)
      user.first_name = fb_info.name.split(' ')[0] || '';

   if(!user.last_name && fb_info.name)
      user.last_name = fb_info.name.split(' ').pop() || '';

   user.fbid = fb_info.id;
   user.id = id;
   user.date_joined = new Date().toISOString();
   user.lang = language || appConfig.default_lang;

   user.image_type = 'fb_link';
   user.image = `https://graph.facebook.com/${user.fbid}/picture?type=large`;

   yield cacheClient.update({
      query: { id },
      update: { $set: user },
      options: { upsert: true },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   postman.welcome(user);

   return user;

});
