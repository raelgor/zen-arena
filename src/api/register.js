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

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid &&
      req.body.message.password;

   if(!valid_request)
      return response.error('error_invalid_request');

   var user = yield data.getUser({
      email: String(req.body.message.uid)
   });

   if(user)
      return response.error('error_user_exists');

   if(!/^[^\@\&\_\! ]+\@[^\@\&\_\! ]+$/.test(req.body.message.uid))
      return response.error('error_bad_email');

   var email = req.body.message.uid;
   user = new User({
      verify_email_token: uuid(2),
      email,
      unsubscribe_all_token: uuid(),
      lang: req.lang
   });

   var email_attempt = yield postman.verifyAccountEmail(user);

   if(!email_attempt || !email_attempt.accepted.length)
      return response.error('error_bad_email');

   var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
   var password = yield new Promise(resolve => bcrypt.hash(req.body.message.password, salt, (err, res) => resolve(res)));

   user.set('id', yield increment('ns_id', 'id'));
   user.set('password', password);
   user.set('date_joined', new Date().toISOString());

   yield user.insertRecord();

   yield on_user_created(user);

   log_user_in(response, user);
   
}));
