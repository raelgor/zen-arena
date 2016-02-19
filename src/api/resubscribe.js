/* global co, dataTransporter, update_user */
'use strict';

module.exports = (req, res) => co(function*(){

   var valid_request = req.params.token;

   if(!valid_request)
      return res._error('error_invalid_request');

   var user = yield dataTransporter.getUser({
      unsubscribe_all_token: String(req.params.token)
   });

   if(!user)
      return res._error('error_bad_token');

   user.set('unsubscribe_all_email', false);

   yield update_user(user);

   res.__response.message = 'OK';
   res._end();

});
