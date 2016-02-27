/* global routes, co, appConfig, GeoIP, Route, Timer, log */
'use strict';

/**
 * Attempts to fetch, detect and struct information about the session such as
 * country, locality and language.
 * @method routes.sessionInfoMaker
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new Route((response, req, res, next) => co(function*(){

   log.debug('sessionInfoMaker: Gathering info...');
   var timer = new Timer();

   var geoipInfo;

   if(req.__user && !req.__user.get('country') && appConfig.use_geoip) {
      if(req.cookies.country_code) {
         req.__user.set('country', req.cookies.country_code);
         req.__user.updateRecord();
      }

      // If we have no address, use the detectAddress route
      if(!req._address)
         yield routes.detectAddress.take(req, res);

      // Get country_code info from GeoIP service
      geoipInfo = yield GeoIP.get(req._address);

      if(geoipInfo.country_code) {
         req.__user.set('country', geoipInfo.country_code);
         req.__user.updateRecord();
         res.cookie('country_code', geoipInfo.country_code, {
            maxAge: 200 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
         });
      }
   }

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
            if(!req._address && !geoipInfo)
               yield routes.detectAddress.take(req, res);
            // Get lang info from GeoIP service
            req.lang = (geoipInfo = geoipInfo || (yield GeoIP.get(req._address))).language;
         }

   // If we didn't manage to find the language, fall back to default
   req.lang = req.lang || appConfig.default_lang;

   // If the cookie is wrong, fix it
   req.lang !== req.cookies.lang && res.cookie('lang', req.lang, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
   });

   log.debug(`sessionInfoMaker: Done. (${timer.click()}ms)`);
   next();

}));
