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

   requiresAuth(bool) {
      this._reqAuth = bool;
   }

   noAuthHandler(response){
      return co(function*(){

         response.responseData = yield factory.index.make(
             response.request,
             response.pageData,
             '<script>$(window).ready(function(){za.login.promptLogin(function(){window.location.reload()})})</script>'
           );

        response.end();

      }).catch(e => instance.emit('error', e));
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

         var coreText = coreTextCache[req.lang];

         var response = new Response(req, res);

         req.coreText = coreText;

         response.pageData = {
            coreText,
            meta: make_default_meta_data(coreText),
            clientData: make_client_data(req, coreText)
         };

         if(this._reqAuth && !req.__user)
            handler = this.noAuthHandler;

         if(DEBUG_MODE && this.name) {
            let dn = `[pageRoute][${this.name}]`;
            let i = indent(req, 1, dn);
            let t = new Timer();
            let resolved;
            log.debug(`${i}${dn} Starting...`);

            let _finished = () => {
               if(resolved) return;
               resolved = true;
               let d = t.click();
               msStats.log(`pageRoute.${this.name}`, d);
               indent(req, -1);
               log.debug(`${i}${dn} Finished. (${d}ms)`);
            };

            let _next = (...a) => {
               _finished();
               next(...a);
            };

            let result = handler(response, req, res, _next);

            if(result && 'then' in result)
               result.then(_finished);
            else
               _finished();

         }
         else
            handler(response, req, res, next);

      }.bind(this));
   }

};
