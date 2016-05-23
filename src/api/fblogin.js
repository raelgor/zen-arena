'use strict';

var r = new APIRoute();

r.setName('fblogin');

r.prependRoute(assertBody({
   message: {
      access_token: '1'
   }
}));

module.exports = r;

r.setHandler((response, req, res) => co(function*(){

   var access_token = req.body.message.access_token;

   var user_fb_info = yield job.getFacebookProfile(access_token);

   if(!user_fb_info.id)
      return response.error('error_bad_fb_access_token');

   var $or = [{ fbid: user_fb_info.id }];
   user_fb_info.email && $or.push({ email: user_fb_info.email });

   var user = yield data.getUser({ $or });

   var lang_hint;
   if(req.cookies.lang && ~appLanguagesCodes.indexOf(req.cookies.lang))
      lang_hint = req.cookies.lang;

   if(!user)
      user = yield make_user_from_fb_info(user_fb_info, lang_hint);
   else
      if(user.get('fbid') != user_fb_info.id)
         yield data.updateUser(
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
