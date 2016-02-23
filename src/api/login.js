/* global co, dataTransporter, dataTransporter, bcrypt, routes */
/* global log_user_in, APIRoute */
'use strict';

var route = new APIRoute((response, req) => co(function*(){

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid &&
      req.body.message.password;

   if(!valid_request)
      return response.error('error_invalid_request');

   var user = yield dataTransporter.getUser({
         $or: [
            { username: String(req.body.message.uid) },
            { email: String(req.body.message.uid) },
            { phone: String(req.body.message.uid) }
         ]
      });

   if(!user || !user.get('password'))
      return response.error('error_unknown_auth_combo');

   var correct_password = yield new Promise(
      resolve => bcrypt.compare(req.body.message.password, user.get('password'),
         (error, result) => resolve(result)));

   if(!correct_password)
      return response.error('error_unknown_auth_combo');

   log_user_in(response, user);

}));

route.prependRoute(routes.grecaptcha.route);

module.exports = route;
