'use strict';

var r = new APIRoute();

r.setName('resubscribe');

module.exports = r;

r.setHandler((response, req) => co(function*(){

   var valid_request = req.params.token;

   if(!valid_request)
      return response.error('error_invalid_request');

   var user = yield dataTransporter.getUser({
      unsubscribe_all_token: String(req.params.token)
   });

   if(!user)
      return response.error('error_bad_token');

   user.set('unsubscribe_all_email', false);

   yield user.updateRecord();

   response.responseData.message = 'OK';
   response.end();

}));
