/* global Route, appConfig */
'use strict';

/**
 * Detects the request language. 
 * @function routes.langCookieGetter
 * @param {Response} response The response object.
 * @returns undefined
 */
var route = new Route((response, req, res, next) => {

   if(!req.lang)
      req.lang =
         ~appConfig.app_languages.indexOf(req.cookies.lang) ?
         req.cookies.lang :
         appConfig.default_lang;

   next();

});

module.exports = route;
