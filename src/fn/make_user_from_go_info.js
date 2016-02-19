/* global co, User, increment, appConfig, on_user_created */
'use strict';

module.exports = (go_info, language) => co(function*() {

   var user = new User();
   var id = yield increment('users', 'id');

   if(go_info.name) {

      if(go_info.name.familyName)
         user.set('last_name', go_info.name.familyName);

      if(go_info.name.givenName)
         user.set('first_name', go_info.name.givenName);

   }

   if(!user.get('first_name') && go_info.displayName)
      user.set('first_name', go_info.displayName.split(' ')[0] || '');

   if(!user.get('last_name') && go_info.displayName)
      user.set('last_name', go_info.displayName.split(' ').pop() || '');

   user.set('goid', go_info.id);
   user.set('id', id);
   user.set('date_joined', new Date().toISOString());
   user.set('lang', language || appConfig.default_lang);

   if(go_info.gender)
      user.set('gender', go_info.gender);

   if(go_info.emails && go_info.emails[0] && go_info.emails[0].value)
      user.set('email', go_info.emails[0].value);

   if(go_info.image && go_info.image.url) {
      user.set('image_type', 'g_plus_link');
      user.set('image', go_info.image.url.replace(/([\?\&])sz=[0-9]+/,'$1sz=500'));
   }

   if(user.email)
      user.set('email_verified', true);

   yield user.insertRecord();

   yield on_user_created(user);

   return user;

});
