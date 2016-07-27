import Route from '../classes/Route';

var r = new Route();

r.setName('sessionInfoMaker');

export default r;

r.setHandler(async function(response, req, res, next) {

   var geoipInfo;

   if(req.__user && !req.__user.get('country') && appConfig.use_geoip) {
      if(req.cookies.country_code) {
         req.__user.set('country', req.cookies.country_code);
         req.__user.updateRecord();
      }

      // If we have no address, use the detectAddress route
      if(!req._address)
         await routes.detectAddress.take(req, res);

      // Get country_code info from GeoIP service
      geoipInfo = await GeoIP.get(req, req._address);

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
   if(!req.lang && ~appLanguagesCodes.indexOf(req.cookies.lang))
      req.lang = req.cookies.lang;

   // If we don't know anything about what language to use
   if(!req.lang)
      // Then if we don't have a language cookie, or it is invalid
      if(!req.cookies.lang || !~appLanguagesCodes.indexOf(req.cookies.lang))
         // Then if we can use GeoIP and this looks like a valid request
         if(appConfig.use_geoip && req.headers['user-agent']) {
            // If we have no address, use the detectAddress route
            if(!req._address && !geoipInfo)
               await routes.detectAddress.take(req, res);
            // Get lang info from GeoIP service
            req.lang = (geoipInfo = geoipInfo || (await GeoIP.get(req, req._address))).language;
         }

   // If we didn't manage to find the language, fall back to default
   req.lang = req.lang || appConfig.default_lang;

   // If the cookie is wrong, fix it
   req.lang !== req.cookies.lang && res.cookie('lang', req.lang, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
   });

   next();

});
