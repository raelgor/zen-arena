/* global APIRoute */
'use strict';

var r = new APIRoute();

r.setName('adminFilter');

module.exports = r;

r.setHandler((response, req, res, next) => {
   if(~appConfig.admins.indexOf(+req.__user.get('id')))
      next();
   else
      response.error('error_request_requires_admin');
});
