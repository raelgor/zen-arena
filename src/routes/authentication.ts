import Route from '../classes/Route';
import uuid from '../fn/uuid';

var r = new Route();

r.setName('authentication');

export default r;

r.setHandler(async function(response, req, res, next) {

  var cache = instance.cache;
  var mongos = instance.mongos;

   // Auth user if not static
   if(req.cookies && req.cookies.st) {

      let user;
      let session = await cache.hgetall(`sessions:${req.cookies.st}`);

      if(!session.session_token) {
         let query = await mongos.collection('sessions').find({
            session_token: req.cookies.st
         }).toArray();

         session = query[0];

         if(session)
            await cache.hmset(`sessions:${session.session_token}`, session);
      }

      if(session)
         user = await data.getUser({ id: +session.user_id });

      if(!user) {
         log.debug(req, 'Cookies were invalid. Clearing...');
         res.clearCookie('st');
      } else {

         log.debug(req, 'User found. Gathering info...');

         req.__user = user;
         req.__session = session;

         // If user has a valid lang setting, set the request's lang
         if(user.get('lang') && ~appLanguagesCodes.indexOf(user.get('lang')))
            req.lang = user.get('lang');

         // If the user has no lang setting but we have a lang cookie,
         // set the user's lang
         if(!user.get('lang') && ~appLanguagesCodes.indexOf(req.cookies.lang))
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
         await user.updateRecord();

      }

   } else
      log.debug(req, 'No auth.');

   next();

});
