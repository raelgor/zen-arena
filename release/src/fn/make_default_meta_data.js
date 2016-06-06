'use strict';

module.exports = function (core_text) {

   return {

      title: core_text.title,
      og_image: '/img/og.jpg',
      og_description: core_text.og_description,
      og_site_name: appConfig.site_name,
      og_locale: appConfig.og_locale

   };
};