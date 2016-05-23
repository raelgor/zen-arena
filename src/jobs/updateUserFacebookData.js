'use strict';
module.exports = (user, profile) => co(function*(){

   user.set('fbid', profile.id);

   for(let field in profile)
         user.set(`_fb_${field}`, profile[field]);

   if(user.get('image_type') == 'none') {
      user.set('image_type', 'fb_link');
      user.set('image',
         `https://graph.facebook.com/${profile.id}/picture?type=large`);
   }

   if(profile.email && user.get('email') == profile.email)
      user.set('email_verified', true);

   if(!user.get('email') && profile.email) {
      user.set('email', profile.email);
      user.set('email_verified', true);
   }

   if(profile.gender && !user.get('gender'))
      user.set('gender', profile.gender);

   if(!user.get('first_name') && profile.first_name)
      user.set('first_name', profile.first_name);

   if(!user.get('last_name') && profile.last_name)
      user.set('last_name', profile.last_name);

   if(!user.get('first_name') && profile.name)
      user.set('first_name', profile.name.split(' ')[0] || '');

   if(!user.get('last_name') && profile.name)
      user.set('last_name', profile.name.split(' ').pop() || '');

   return yield user.updateRecord();

}).catch(error => instance.emit('error', error));
