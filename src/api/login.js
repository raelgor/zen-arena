'use strict';

var r = new APIRoute();

r.setName('login');

module.exports = r;

r.prependRoute(routes.grecaptcha.route);

r.setHandler((response, req) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid &&
      req.body.message.password;

   if(!valid_request)
      return response.error('error_invalid_request');

   var user = yield data.getUser({
         $or: [
            { username: String(req.body.message.uid) },
            { email: String(req.body.message.uid) },
            { phone: String(req.body.message.uid) }
         ]
      });

   if(!user || !user.get('password'))
      return response.error('error_unknown_auth_combo');

   var correct_password = yield user.testPassword(req.body.message.password);
   
   if(!correct_password)
      return response.error('error_unknown_auth_combo');

   log_user_in(response, user);

}));
