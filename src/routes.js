/* global log */
/* global GeoIP */
/* global co */
/* global appConfig */
/* global app */
'use strict';

const config = require('../config');

app.router.use((req, res, next) => {
    
    // Detect address
    req._address = appConfig.use_xfwd ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
    
    // If path looks like file, move on
    if(/(\.[a-z0-9]{2,4})$/i.test(req.path)) 
        return next();
    
    // Auth user if not static

    // Language check
    co(function*(){
        
        if(!req.cookies.lang || !~appConfig.app_languages.indexOf(req.cookies.lang)) {
            
            let trace = req.headers['user-agent'] && 
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
    
    if(isNaN(req.body.rid))
        return res.end(JSON.stringify({error: 'bad_request'}));
    else
        next();
    
});

app.router.post('/api/login', require('./api/login'));

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
        for(let key in global.text.core[req.lang])
            result[key] = global.text.core[req.lang][key].text;
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
            clientData: {
                user: req.user,
                grecaptcha_site_key: appConfig.grecaptcha.site_key,
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