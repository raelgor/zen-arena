/* global co, User, increment, appConfig, on_user_created */
'use strict';

const utilizable_fields = ['first_name', 'last_name', 'gender', 'email'];

module.exports = (fb_info, language) => co(function*() {

   var user = new User();
   var id = yield increment('ns_id', 'id');

   for(let field in fb_info)
      if(~utilizable_fields.indexOf(field))
         user.set(field, fb_info[field]);

   if(!user.get('first_name') && fb_info.name)
      user.set('first_name', fb_info.name.split(' ')[0] || '');

   if(!user.get('last_name') && fb_info.name)
      user.set('last_name', fb_info.name.split(' ').pop() || '');

   user.set('fbid', fb_info.id);
   user.set('id', id);
   user.set('date_joined', new Date().toISOString());
   user.set('lang', language || appConfig.default_lang);
   user.set('image_type', 'fb_link');
   user.set('image',
      `https://graph.facebook.com/${user.get('fbid')}/picture?type=large`);

   if(user.get('email'))
      user.set('email_verified', true);

   yield user.insertRecord();

   yield on_user_created(user);

   return user;

});
