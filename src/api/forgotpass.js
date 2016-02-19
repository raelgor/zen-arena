/* global dataTransporter, co, appConfig, uuid, postman */
'use strict';

module.exports = (req, res) => co(function*(){

   if(!res._recaptcha)
      return res._error('error_bad_recaptcha');

   // Check if request is valid
   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid;

   if(!valid_request)
      return res._error('error_invalid_request');

   // Find user
   var user = yield dataTransporter.getUser({
      email: String(req.body.message.uid)
   });

   if(!user)
      return res._error('error_no_user');

   // Check if we can send another recover email
   if(user.get('fpass_cd') && user.get('fpass_cd') > Date.now())
      return res._error('error_fpass_on_cooldown');

   user.set('fpass_cd', Date.now() + appConfig.forgot_password_interval);
   user.set('fpass_token', uuid(2));

   // Update user
   yield user.updateRecord();

   // Send email
   var email_status = yield postman.sendForgotPasswordEmail(user);

   // Return success
   if(email_status && email_status.accepted && email_status.accepted.length) {
      res.__response.message = 'OK';
      res._end();
   } else {
      res._error('error_failed_to_send_email');
   }

});
