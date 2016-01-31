/* global app */
'use strict';

const config = require('../config');

// Auth user if not static

// Language check
app.router.use((req, res, next) => {
    return next();
    if(!req.cookie.lang)
        res.cookie('lang', config.defaultLang, { 
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            secure: true
        });
    
});

// Api route
app.router.all('/api*', (req, res, next) => res.end('under construction'));

// Jade route
app.router.all('/', (req, res) => {
    
    req.path
    
    let page = 'home.jade';
    
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
            fullSiteName: config.protocol + '://' + config.domain,
            favicon: '/img/favicon.png',
            domain: config.domain
        },
        meta: {
            title: 'ZenArena.com - The tournament network'
        }
    });
    
    res.end(html);
    
});