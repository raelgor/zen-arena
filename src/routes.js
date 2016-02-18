/* global config, GeoIP, cacheClient, co, appConfig, app */
/* global make_core_text, verify_grecaptcha, update_user, uuid */
/* global controllers */
'use strict';

// Stall if cache is updating
app.router.use((req, res, next) => {
   if(global._cache_is_updating)
      global._on_cache_updated.then(next);
   else
      next();
});

app.router.use((req, res, next) => {

   // Detect address
   req._address = appConfig.use_xfwd ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;

   // If path looks like file, move on
   if(/(\.[a-z0-9]{2,4})$/i.test(req.path))
      return next();

   co(function*(){

      // Auth user if not static
      if(req.cookies && req.cookies.st) {

         let user = yield cacheClient.get({
            query: { [`sessions.${req.cookies.st}`]: { $exists: 1 } },
            collection: 'users',
            database: config.cache_server.db_name
         });

         user = user && user[0];

         if(!user)
            res.clearCookie('st');
         else {

            req.__user = user;
            req.__session = user.sessions[req.cookies.st];

            // If user has a valid lang setting, set the request's lang
            if(req.__user.lang && ~appConfig.app_languages.indexOf(req.__user.lang))
               req.lang = req.__user.lang;

            // If the user has no lang setting but we have a lang cookie,
            // set the user's lang
            if(!req.__user.lang && ~appConfig.app_languages.indexOf(req.cookies.lang))
               req.__user.lang = req.cookies.lang;

            // If user still has no language
            if(!req.__user.lang)
               req.__user.lang = appConfig.default_lang;

            // Delete object values
            delete req.__user._id;
            delete req.__user.date_joined;

            // Refresh session
            req.__session.expires= Date.now() + appConfig.web_session_lifespan;

            // Make sure user has an unsubscribe all token
            if(!user.unsubscribe_all_token)
               user.unsubscribe_all_token = uuid();

            // Update user
            yield update_user(user);

         }

      }

      next();

   });

});

// Api route
app.router.all('/api*', (req, res, next) => co(function*(){

   res.setHeader('content-type', 'application/json');

   res.__response = {};
   res._end = () => res.end(JSON.stringify(res.__response));

   res._error = message => {
      res.__response.error = message;
      res.end(JSON.stringify(res.__response));
   };

   if(!isNaN(req.__rid = req.body.rid))
      res.__response.rid = req.__rid;

   if(req.body && req.body.message && req.body.message.grecaptcha)
      if(!(yield verify_grecaptcha(req.body.message.grecaptcha, req._address)))
         return res._error('error_bad_recaptcha');
      else
         res._recaptcha = true;

   if(!req.lang)
      req.lang = ~appConfig.app_languages.indexOf(req.cookies.lang) ? req.cookies.lang : appConfig.default_lang;

   next();

}));

app.router.post('/api/login', require('./api/login'));
app.router.post('/api/goauth', require('./api/goauth'));
app.router.post('/api/fblogin', require('./api/fblogin'));
app.router.post('/api/text/:lang', require('./api/text'));
app.router.post('/api/register', require('./api/register'));
app.router.post('/api/forgotpass', require('./api/forgotpass'));
app.router.post('/api/recoverpass', require('./api/recoverpass'));
app.router.post('/api/resubscribe/:token', require('./api/resubscribe'));

// Calls below this require auth
app.router.all('/api*', (req, res, next) => {

   let valid_session = Boolean(req.__user);

   if(valid_session)
      try{
         valid_session = req.__session.csrf_token === req.body.csrf_token;
      } catch(error) { valid_session = false; }

   if(!valid_session)
      return res._error('error_call_invalid_or_requires_auth');
   else
      next();

});

app.router.post('/api/logout', require('./api/logout'));

// Jade route
app.router.all([
   '/',
   '/unsubscribeall/:token',
   '/verifyemail/:token'
], (req, res) => co(function*() {

   // Parse path
   let path_parts = req.path && req.path.split('/');
   path_parts.shift();

   let template = path_parts[0];

   if(!template || template === '/')
      template = 'home';

   // /games
   // Lists all supported games

   // /<game_namespace>
   // Lists all tournaments for that game

   // /teams/team_id/<team_name>
   // Team page

   // /
   // Home page or news feed

   // /news
   // Per language global news

   // /<player_id||player_username>
   // Player profile

   // /<place_id||place_nickname>
   // Place profile

   // 404
   // The 404 page

   // Maintenance page

   // If we didn't get language info from a user, try to get from cookie
   if(!req.lang && ~appConfig.app_languages.indexOf(req.cookies.lang))
      req.lang = req.cookies.lang;

   // If we don't know anything about what language to use
   if(!req.lang)
      // Then if we don't have a language cookie, or it is invalid
      if(!req.cookies.lang || !~appConfig.app_languages.indexOf(req.cookies.lang))
         // Then if we can use GeoIP and this looks like a valid request
         if(appConfig.use_geoip && req.headers['user-agent'])
            // Get lang info from GeoIP service
            req.lang = (yield GeoIP.get(req._address));

   // If we didn't manage to find the language, fall back to default
   req.lang = req.lang || appConfig.default_lang;

   // If the cookie is wrong, fix it
   req.lang !== req.cookies.lang && res.cookie('lang', req.lang, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
   });

   let core_text = make_core_text(req.lang);
   if(appConfig.maintenance_flag)
      return res.end(app.templates.maintenance({core_text}));

   let page_data = yield controllers[template](req, res, core_text);

   let html = app.templates.index({
      navigation: {
         themeImage: '/img/mainbg.jpg',
         logo: '/img/logo.png',
         buttons: [
            { attr: { 'data-html-menu_1' : 1 }, text: core_text.menu_1, href: appConfig.main_menu[0].href },
            { attr: { 'data-html-menu_2' : 1 }, text: core_text.menu_2, href: appConfig.main_menu[1].href },
            { attr: { 'data-html-menu_3' : 1 }, text: core_text.menu_3, href: appConfig.main_menu[2].href }
         ]
      },
      global: {
         fullSiteUrl: appConfig.site_protocol + '://' + appConfig.domain_name,
         favicon: '/img/favicon.png',
         domain: appConfig.domain_name,
         ga_tracking_code: appConfig.ga_tracking_code,
         language: req.lang,
         fb_app_id: appConfig.fb_app.app_id,
         fb_admins: appConfig.fb_app.fb_admins,
         fb_api_version: appConfig.fb_app.api_version,
         clientData: page_data.client_data
      },
      core_text,
      meta: page_data.meta,
      mainSection: page_data.template_data
   });

   res.end(html);

}));
