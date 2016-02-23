/* global co, templates, appConfig */
'use strict';

module.exports = (pageData, pageView) => co(function() {
   
     return templates.index({
        navigation: {
           themeImage: '/img/mainbg.jpg',
           logo: '/img/logo.png',
           buttons: [
              { attr: { 'data-html-menu_1' : 1 }, text: pageData.coreText.menu_1, href: appConfig.main_menu[0].href },
              { attr: { 'data-html-menu_2' : 1 }, text: pageData.coreText.menu_2, href: appConfig.main_menu[1].href },
              { attr: { 'data-html-menu_3' : 1 }, text: pageData.coreText.menu_3, href: appConfig.main_menu[2].href }
           ]
        },
        global: {
           fullSiteUrl: appConfig.site_protocol + '://' + appConfig.domain_name,
           favicon: '/img/favicon.png',
           domain: appConfig.domain_name,
           ga_tracking_code: appConfig.ga_tracking_code,
           language: pageData.clientData.lang,
           fb_app_id: appConfig.fb_app.app_id,
           fb_admins: appConfig.fb_app.fb_admins,
           fb_api_version: appConfig.fb_app.api_version,
           clientData: pageData.clientData
        },
        coreText: pageData.coreText,
        meta: pageData.meta,
        pageView
     });

});
