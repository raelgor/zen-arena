/* global Route, appConfig */
'use strict';

var route = new Route((response, req, res, next) => {

   if(!req.lang)
      req.lang =
         ~appConfig.app_languages.indexOf(req.cookies.lang) ?
         req.cookies.lang :
         appConfig.default_lang;

   next();

});

module.exports = route;
