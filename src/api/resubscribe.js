/* global co, dataTransporter, update_user, APIRoute */
'use strict';

/**
 * Resubscribes a user to emails using an `unsubscribe_all_token`.
 * @function resubscribe
 * @param {JSONResponse} response The response object.
 * @memberof api
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var valid_request = req.params.token;

   if(!valid_request)
      return response.error('error_invalid_request');

   var user = yield dataTransporter.getUser({
      unsubscribe_all_token: String(req.params.token)
   });

   if(!user)
      return response.error('error_bad_token');

   user.set('unsubscribe_all_email', false);

   yield update_user(user);

   response.responseData.message = 'OK';
   response.end();

}));

module.exports = route;
