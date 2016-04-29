/* global Route, co, routes, Response, make_core_text, Timer, log */
/* global make_default_meta_data, make_client_data */
'use strict';

/**
 * @class PageRoute
 * @desc An express route wrapper with a custom {@link Response} object.
 * @param {function} handler The main API call handler.
 * @extends Route
 * @returns {PageRoute}
 */
module.exports = class PageRoute extends Route {

   constructor(handler) {

      super(handler);

      this._pre.push(routes.authentication.route);
      this._pre.push(routes.sessionInfoMaker.route);

   }

   /**
    * Returns the handler function wrapped to include a Response object.
    * @function handle
    * @memberof PageRoute
    * @param {function} handler The name of the main handler of this API call.
    * @returns function
    */
   handle(handler) {
      return (req, res, next) => co(function(){

         log.debug('pageHandler: Preparing handler...');
         var timer = new Timer();

         var coreText = make_core_text(req.lang);

         var response = new Response(req, res);

         response.pageData = {
            coreText,
            meta: make_default_meta_data(coreText),
            clientData: make_client_data(req, coreText)
         };

         log.debug(`pageHandler: Done. (${timer.click()}ms)`);
         handler(response, req, res, next);

      });
   }

};
