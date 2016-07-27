import Route from '../classes/Route';

var r = new Route();

r.setName('langCookieGetter');

export default r;

r.setHandler((response, req, res, next) => {

   if(!req.lang) {

      log.debug(req, 'No language. Trying to detect...');

      if(~appLanguagesCodes.indexOf(req.cookies.lang)) {

         log.debug(req, `Set language according to cookie. (${req.cookies.lang})`);
         req.lang = req.cookies.lang;

      } else {

         log.debug(req, 'Absent or invalid lang cookie. Falling back to default.');
         req.lang = appConfig.default_lang;

      }

   } else
      log.debug(req, 'Language exists. Did nothing.');

   req.coreText = coreTextCache[req.lang];

   next();

});
