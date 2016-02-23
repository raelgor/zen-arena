/* global Route, co, dataTransporter, appConfig, uuid */
'use strict';

module.exports = new Route((response, req, res, next) => co(function*(){

   // Auth user if not static
   if(req.cookies && req.cookies.st) {

      let user = yield dataTransporter.getUser({
         [`sessions.${req.cookies.st}`]: { $exists: 1 }
      });

      if(!user)
         res.clearCookie('st');
      else {

         req.__user = user;
         req.__session = user.getSession(req.cookies.st);

         // If user has a valid lang setting, set the request's lang
         if(user.get('lang') && ~appConfig.app_languages.indexOf(user.get('lang')))
            req.lang = user.get('lang');

         // If the user has no lang setting but we have a lang cookie,
         // set the user's lang
         if(!user.get('lang') && ~appConfig.app_languages.indexOf(req.cookies.lang))
            user.set('lang', req.cookies.lang);

         // If user still has no language
         if(!user.get('lang'))
            user.set('lang', appConfig.default_lang);

         // Refresh session
         req.__session.expires= Date.now() + appConfig.web_session_lifespan;

         // Make sure user has an unsubscribe all token
         if(!user.get('unsubscribe_all_token'))
            user.set('unsubscribe_all_token', uuid());

         // Update user
         yield user.updateRecord();

      }

   }

   next();

}));
