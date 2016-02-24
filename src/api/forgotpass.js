/* global dataTransporter, co, appConfig, uuid, postman, APIRoute, routes */
'use strict';

/**
 * Generates a password reset link and sends it to the user.
 * @function forgotpass
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   // Check if request is valid
   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid;

   if(!valid_request)
      return response.error('error_invalid_request');

   // Find user
   var user = yield dataTransporter.getUser({
      email: String(req.body.message.uid)
   });

   if(!user)
      return response.error('error_no_user');

   // Check if we can send another recover email
   if(user.get('fpass_cd') && user.get('fpass_cd') > Date.now())
      return response.error('error_fpass_on_cooldown');

   user.set('fpass_cd', Date.now() + appConfig.forgot_password_interval);
   user.set('fpass_token', uuid(2));

   // Update user
   yield user.updateRecord();

   // Send email
   var email_status = yield postman.sendForgotPasswordEmail(user);

   // Return success
   if(email_status && email_status.accepted && email_status.accepted.length) {
      response.responseData = { message: 'OK' };
      response.end();
   } else
      response.error('error_failed_to_send_email');

}));

route.prependRoute(routes.grecaptcha.route);

module.exports = route;
