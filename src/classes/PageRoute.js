/* global Route, appConfig, co, routes, Response, GeoIP, make_core_text */
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

      this.pre.push(routes.authentication.route);

   }

   /**
    * Returns the handler function wrapped to include a Response object.
    * @function handle
    * @memberof APIRoute
    * @param {function} handler The name of the main handler of this API call.
    * @returns function
    */
   handle(handler) {
      return (req, res, next) => co(function*(){
         // If we didn't get language info from a user, try to get from cookie
         if(!req.lang && ~appConfig.app_languages.indexOf(req.cookies.lang))
            req.lang = req.cookies.lang;

         // If we don't know anything about what language to use
         if(!req.lang)
            // Then if we don't have a language cookie, or it is invalid
            if(!req.cookies.lang || !~appConfig.app_languages.indexOf(req.cookies.lang))
               // Then if we can use GeoIP and this looks like a valid request
               if(appConfig.use_geoip && req.headers['user-agent']) {
                  // If we have no address, use the detectAddress route
                  if(!req._address)
                     yield routes.detectAddress.take(req, res);
                  // Get lang info from GeoIP service
                  req.lang = (yield GeoIP.get(req._address));
               }

         // If we didn't manage to find the language, fall back to default
         req.lang = req.lang || appConfig.default_lang;

         // If the cookie is wrong, fix it
         req.lang !== req.cookies.lang && res.cookie('lang', req.lang, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
         });

         var coreText = make_core_text(req.lang);

         var response = new Response(req, res);

         response.pageData = {
            coreText,
            meta: make_default_meta_data(coreText),
            clientData: make_client_data(req, coreText)
         };

         handler(response, req, res, next);
      });
   }

};
