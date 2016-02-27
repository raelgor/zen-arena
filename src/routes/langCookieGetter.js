/* global Route, appConfig, log, Timer */
'use strict';

/**
 * Detects the request language.
 * @function routes.langCookieGetter
 * @param {Response} response The response object.
 * @returns undefined
 */
var route = new Route((response, req, res, next) => {

   var timer = new Timer();

   if(!req.lang) {

      log.debug('langCookieGetter: No language. Trying to detect...');

      if(~appConfig.app_languages.indexOf(req.cookies.lang)) {

         log.debug(`langCookieGetter: Set language according to cookie. (${req.cookies.lang})`);
         req.lang = req.cookies.lang;

      } else {

         log.debug('langCookieGetter: Absent or invalid lang cookie. Falling back to default.');
         req.lang = appConfig.default_lang;

      }

   } else
      log.debug('langCookieGetter: Language exists. Did nothing.');

   log.debug(`langCookieGetter: Done. (${timer.click()}ms)`);
   next();

});

module.exports = route;
