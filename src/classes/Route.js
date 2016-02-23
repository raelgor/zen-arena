/* global Response, co */
'use strict';

/**
 * @class Route
 * @desc An express route wrapper with a custom {@link Response} object.
 * @param {function} handler The main API call handler.
 * @returns {Route}
 */
module.exports = class Route {

   constructor(handler) {

      /**
       * The handler function for this api call.
       * @function handler
       * @memberof APIRoute
       * @type function
       */
      this.handler = handler;

      /**
       * An array to store prepended routes.
       * @name pre
       * @memberof APIRoute
       * @type Array
       */
      this.pre = [];

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
         handler(new Response(req, res), req, res, next);
      };
   }

   /**
    * Returns the final route middleware to pass to an express application.
    * @name route
    * @memberof APIRoute
    * @type Array
    */
   get route() {
      return this.pre.concat(this.handle(this.handler));
   }

   /**
    * Prepends a function to this route's stack.
    * @function prependRoute
    * @memberof Route
    * @param {function|Array} routeHandler The function to prepend.
    * @returns {APIRoute}
    */
   prependRoute(routeHandler) {
      return this.pre.push(routeHandler);
   }

   /**
    * Takes this route manually and resolves when
    * @function take
    * @memberof Route
    * @param {object} request Express request object.
    * @param {object} response Express response object.
    * @returns {Promise}
    */
   take(req, res) {
      var route = this.route;
      return co(function*() {
         var chain = [];

         (function iterate(next){
            if(typeof next === 'function')
               chain.push(next);
            else if(next instanceof Array)
                  for(let child of next) iterate(child);
         })(route);

         for(let fn of chain)
            yield new Promise(resolve => fn(req, res, resolve));
      });
   }

};
