'use strict';

var f = new Factory();

f.setName('index');
f.setGenerator(generator);

module.exports = f;

function generator(req, pageData, pageView) {
   return templates.index({
      navigation: {
         themeImage: '/img/mainbg.jpg',
         logo: '/img/logo.png',
         buttons: [{ attr: { 'data-html-menu_1': 1 }, text: pageData.coreText.menu_1, href: appConfig.main_menu[0].href }, { attr: { 'data-html-menu_2': 1 }, text: pageData.coreText.menu_2, href: appConfig.main_menu[1].href }, { attr: { 'data-html-menu_3': 1 }, text: pageData.coreText.menu_3, href: appConfig.main_menu[2].href }]
      },
      global: {
         fullSiteUrl: appConfig.site_protocol + '://' + appConfig.domain_name + (/^(80|443)$/.test(appConfig.port) ? '' : ':' + appConfig.port),
         favicon: '/img/favicon.png',
         domain: appConfig.domain_name,
         ga_tracking_code: appConfig.ga_tracking_code,
         language: pageData.clientData.lang,
         fb_app_id: appConfig.fb_app.app_id,
         fb_admins: appConfig.fb_app.fb_admins,
         fb_api_version: appConfig.fb_app.api_version,
         clientData: pageData.clientData,
         version: packageInfo.version,
         app_contact_email: appConfig.app_contact_email,
         social_links: appConfig.social_links,
         copyright_stamp: appConfig.copyright_stamp,
         google_maps_client_key: appConfig.google_maps_client_key
      },
      coreText: pageData.coreText,
      meta: pageData.meta,
      pageView: pageView
   });
}