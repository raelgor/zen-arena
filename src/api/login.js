/* global co, dataTransporter, dataTransporter, bcrypt */
/* global log_user_in */
'use strict';

module.exports = (req, res) => co(function*(){

   if(!res._recaptcha)
      return res._error('error_bad_recaptcha');

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid &&
      req.body.message.password;

   if(!valid_request)
      return res._error('error_invalid_request');

   var user = yield dataTransporter.getUser({
         $or: [
            { username: String(req.body.message.uid) },
            { email: String(req.body.message.uid) },
            { phone: String(req.body.message.uid) }
         ]
      });

   if(!user || !user.get('password'))
      return res._error('error_unknown_auth_combo');

   var correct_password = yield new Promise(
      resolve => bcrypt.compare(req.body.message.password, user.get('password'),
         (error, result) => resolve(result)));

   if(!correct_password)
      return res._error('error_unknown_auth_combo');

   log_user_in(res, user);

});
