'use strict';

var r = new APIRoute();

r.setName('recoverpass');

module.exports = r;

r.setHandler((response, req) => co(function*(){

   // Validate request
   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.p &&
      req.body.message.token;

   if(!valid_request)
      return response.error('error_invalid_request');

   // Find user
   var token = req.body.message.token;
   var password = String(req.body.message.p);
   var user = yield data.getUser({
      fpass_token: String(token)
   });

   if(!user)
      return response.error('error_invalid_token');

   if(password.length > appConfig.password_range.max || password.length < appConfig.password_range.min)
      return response.error('error_invalid_password_size');

   // Update password
   var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
   var hash = yield new Promise(resolve => bcrypt.hash(password, salt, (err, res) => resolve(res)));

   user.set('password', hash);
   user.set('fpass_token', null);

   // Update user
   yield user.updateRecord();

   // Return
   response.responseData.message = 'OK';
   response.end();

}));
