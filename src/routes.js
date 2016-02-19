/* global GeoIP, co, appConfig, app */
/* global make_core_text, verify_grecaptcha */
/* global controllers */
'use strict';

const pageRoutes = [
   '/',
   '/unsubscribeall/:token',
   '/verifyemail/:token'
];

// Routes for non-static destinations
app.router.use(pageRoutes.concat(['/api*']), [
   require('./routes/cache_staller'),
   require('./routes/detect_ip'),
   require('./routes/authentication')
]);

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
app.router.all(pageRoutes, (req, res) => co(function*() {

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
