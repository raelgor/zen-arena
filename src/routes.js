/* global config, GeoIP, cacheClient, co, appConfig, app */
'use strict';

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
        else
         req.__user = user; // @todo Refresh session

      }

      /*

         @todo
         If cookie.lang != user.lang make adjustments.
         Also send and receive core text if lang mismatch and update client.

      */

        // Language check
        if(!req.cookies.lang || !~appConfig.app_languages.indexOf(req.cookies.lang)) {

            let trace = req.headers['user-agent'] && appConfig.use_geoip &&
                (yield GeoIP.get(req._address));

            res.cookie('lang', trace || appConfig.default_lang, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });

            req.lang = trace || appConfig.default_lang;

        }

        req.lang = req.lang || req.cookies.lang;

        next();

    });

});

// Api route
app.router.all('/api*', (req, res, next) => {

   res.setHeader('content-type', 'application/json');

   if(isNaN(req.__rid = req.body.rid))
      return res.end(JSON.stringify({error: 'bad_request'}));
   else
      next();

});

app.router.post('/api/login', require('./api/login'));
app.router.post('/api/fblogin', require('./api/fblogin'));

// Calls below this require auth
app.router.all('/api*', (req, res, next) => {

    if(!req.user)
        return res.end(JSON.stringify({error: 'call_requires_auth'}));
    else
        next();

});

// Jade route
app.router.all('/', (req, res) => {

    // Parse path
    let path_parts = req.path && req.path.split('/');
    path_parts.shift();

    let dest = path_parts[0];

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

    function mk_core_text(lang) {
        var result = {};
        for(let key in global.text.core[lang])
            result[key] = global.text.core[lang][key].text;
        return result;
    }

    let core_text = mk_core_text(req.lang);

    let html = app.templates.index({
        navigation: {
            themeImage: '/img/mainbg.jpg',
            logo: '/img/logo.png',
            buttons: [
                { text: global.text.core[req.lang].menu_1.text, href: appConfig.main_menu[0].href },
                { text: global.text.core[req.lang].menu_2.text, href: appConfig.main_menu[1].href },
                { text: global.text.core[req.lang].menu_3.text, href: appConfig.main_menu[2].href }
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
            clientData: {
                user: req.user,
                grecaptcha_site_key: appConfig.grecaptcha.site_key,
                fb_api_version: appConfig.fb_app.api_version,
                fb_app_id: appConfig.fb_app.app_id,
                core_text
            }
        },
        core_text,
        meta: {
            title: global.text.core[req.lang].title.text
        },
        mainSection: {
            template : "home.jade",
            data: {
                tagline: global.text.core[req.lang].home_tagline.text
            }
        }
    });

    res.end(html);

});
