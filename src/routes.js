/* global log */
/* global GeoIP */
/* global co */
/* global appConfig */
/* global app */
'use strict';

const config = require('../config');

// Auth user if not static

// Language check
app.router.use((req, res, next) => {
    
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
    
    log(`Got to / with lang ${req.lang} ...`);
    
    let html = app.templates.index({
        navigation: {
            themeImage: '/img/mainbg.jpg',
            logo: '/img/logo.png',
            buttons: [
                { text: 'Home', href: '/' },
                { text: 'Games', href: '/games' },
                { text: 'News', href: '/news' },
            ]
        },
        global: {
            fullSiteUrl: config.protocol + '://' + config.domain,
            favicon: '/img/favicon.png',
            domain: config.domain
        },
        meta: {
            title: 'ZenArena.com - The tournament network'
        },
        mainSection: {
            template : "home.jade",
            data: {}
        }
    });
    
    res.end(html);
    
});