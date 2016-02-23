/* global APIRoute */
'use strict';

/**
 * Filters API requests that are not authorized by previous middleware.
 * @name authFilter
 * @memberof routes 
 */
module.exports = new APIRoute((response, req, res, next) => {
   if(req.__user)
      next();
   else
      response.error('error_request_requires_auth');
});
