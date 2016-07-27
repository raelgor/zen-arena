import User from '../classes/User';

export default async function(user: User, profile: any) {

   user.set('goid', profile.id);

   for(let field in profile)
      if(typeof profile[field] !== 'object')
         user.set(`_gp_${field}`, profile[field]);

   if(profile.name) {

      if(profile.name.familyName && !user.get('last_name'))
         user.set('last_name', profile.name.familyName);

      if(profile.name.givenName && !user.get('first_name'))
         user.set('first_name', profile.name.givenName);

   }

   if(!user.get('first_name') && profile.displayName)
      user.set('first_name', profile.displayName.split(' ')[0] || '');

   if(!user.get('last_name') && profile.displayName)
      user.set('last_name', profile.displayName.split(' ').pop() || '');

   if(profile.gender && !user.get('gender'))
      user.set('gender', profile.gender);

   if(profile.emails && profile.emails[0] && profile.emails[0].value) {
      user.set('_gp_email', profile.emails[0].value);
      if(!user.get('email'))
         user.set('email', profile.emails[0].value);
   }

   if(profile.image && profile.image.url) {
      user.set('_gp_image', profile.image.url);
      if(user.get('image_type') == 'none') {
         user.set('image_type', 'g_plus_link');
         user.set('image', profile.image.url.replace(/([\?\&])sz=[0-9]+/,'$1sz=500'));
      }
   }

   if(profile.emails && profile.emails[0] && profile.emails[0].value && user.get('email') == profile.email)
      user.set('email_verified', true);

   return await user.updateRecord();

}
