/* global Route, co, dataTransporter, appConfig, uuid, Timer, log, cache */
'use strict';

/**
 * A route that will create `req.__user` and `req.__session` if a
 * valid session is detected.
 * @method routes.authentication
 * @param {Response} response The response object.
 * @returns undefined
 */
module.exports = new Route((response, req, res, next) => co(function*(){

   log.debug('authentication: Authenticating...');
   var timer = new Timer();

   // Auth user if not static
   if(req.cookies && req.cookies.st) {

      let user;
      let session = yield cache.hgetall(`sessions:${req.cookies.st}`);

      if(!session.session_token) {
         let query = yield dataTransporter.get({
            session_token: req.cookies.st,
            collection: 'sessions'
         });

         session = query[0];

         if(session)
            yield cache.hmset(`sessions:${session.session_token}`, session);
      }

      if(session)
         user = yield dataTransporter.getUser({ id: +session.user_id });

      if(!user) {
         log.debug('authentication: Cookies were invalid. Clearing...');
         res.clearCookie('st');
      } else {

         log.debug('authentication: User found. Gathering info...');

         req.__user = user;
         req.__session = session;

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
         req.__session.expires = Date.now() + appConfig.web_session_lifespan;

         // Make sure user has an unsubscribe all token
         if(!user.get('unsubscribe_all_token'))
            user.set('unsubscribe_all_token', uuid());

         // Update user
         yield user.updateRecord();

      }

   } else
      log.debug('authentication: No auth.');

   log.debug(`authentication: Authentication finished. (${timer.click()}ms)`);
   next();

}));
