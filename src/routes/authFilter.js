/* global APIRoute */
'use strict';

var r = new APIRoute();

r.setName('authFilter');

module.exports = r;

r.setHandler((response, req, res, next) => {
   if(req.__user)
      next();
   else
      response.error('error_request_requires_auth');
});
