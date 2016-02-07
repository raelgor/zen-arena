/* global log */
/* global GeoIP */
/* global co */
/* global appConfig */
/* global app */
'use strict';

const config = require('../config');

app.router.use((req, res, next) => {
    
    // If path looks like file, move on
    if(/(\.[a-z0-9]{2,4})$/i.test(req.path)) 
        return next();
    
    // Auth user if not static

    // Language check
    co(function*(){
        
        if(!req.cookies.lang || !~appConfig.app_languages.indexOf(req.cookies.lang)) {
            
            let address = appConfig.use_xfwd ? req.headers['x-forwarded-for'] : req.connection.remoteAddress;
            
            let trace = req.headers['user-agent'] && 
                (yield GeoIP.get(address));
            
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
app.router.all('/api*', (req, res, next) => res.end('under construction'));

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
    
    let html = app.templates.index({
        navigation: {
            themeImage: '/img/mainbg.jpg',
            logo: '/img/logo.png',
            searchText: global.text.core[req.lang].menu_search.text,
            buttons: [
                { text: global.text.core[req.lang].menu_1.text, href: appConfig.main_menu[0].href },
                { text: global.text.core[req.lang].menu_2.text, href: appConfig.main_menu[1].href },
                { text: global.text.core[req.lang].menu_3.text, href: appConfig.main_menu[2].href }
            ],
            signUpText: global.text.core[req.lang].menu_signup.text,
            signInText: global.text.core[req.lang].menu_signin.text,
            orText: global.text.core[req.lang].menu_or.text
        },
        global: {
            fullSiteUrl: appConfig.app_protocol + '://' + appConfig.domain_name,
            favicon: '/img/favicon.png',
            domain: appConfig.domain_name
        },
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