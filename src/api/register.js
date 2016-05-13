'use strict';

var r = new APIRoute();

r.setName('register');

module.exports = r;

r.prependRoute(routes.grecaptcha.route);

r.prependRoute(assertBody({
   message: {
      uid: '1',
      password: '1'
   }
}));

r.setHandler((response, req) => co(function*(){

   // Validate email
   if(!req.body.message.password ||
      !new RegExp(`^(.){${appConfig.password_range.min},${appConfig.password_range.max}}$`)
         .test(req.body.message.password))
      return response.error('error_invalid_password');

   // Validate email
   if(!/^[^\@\&\_\! ]+\@[^\@\&\_\! ]+$/.test(req.body.message.uid))
      return response.error('error_bad_email');

   // Check if user exists
   var user = yield data.getUser({
      email: String(req.body.message.uid)
   });

   if(user)
      return response.error('error_user_exists');

   // Create user
   var email = req.body.message.uid;
   user = new User({
      verify_email_token: uuid(2),
      email,
      unsubscribe_all_token: uuid(),
      lang: req.lang
   });

   postman.verifyAccountEmail(user);

   var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
   var password = yield new Promise(resolve => bcrypt.hash(req.body.message.password, salt, (err, res) => resolve(res)));

   user.set('id', yield increment('ns_id', 'id'));
   user.set('password', password);
   user.set('date_joined', new Date().toISOString());

   yield user.insertRecord();

   yield on_user_created(user);

   // Create session
   log_user_in(response, user);

}));
