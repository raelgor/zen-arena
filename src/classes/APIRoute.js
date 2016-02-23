/* global Route, JSONResponse */
'use strict';

/**
 * @class APIRoute
 * @extends Route
 * @desc A class for API routes with a custom {@link JSONResponse} object.
 * @param {function} handler The main API call handler.
 * @returns {APIRoute}
 */
module.exports = class APIRoute extends Route {

   constructor(handler) {

      super(handler);

   }

   /**
    * Returns the handler function wrapped to include a JSONResponse object.
    * @function handle
    * @memberof APIRoute
    * @param {function} handler The name of the main handler of this API call.
    * @returns function
    */
   handle(handler) {
      return (req, res, next) => {
         handler(new JSONResponse(req, res), req, res, next);
      };
   }

};
