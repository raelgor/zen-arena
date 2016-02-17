/* global co, make_client_data, make_default_meta_data */
'use strict';

module.exports = (req, res, core_text) => co(function*(){

   // Meta data
   var meta = make_default_meta_data(core_text);

   // Template data for jade
   var template_data = { core_text, template: 'home' };

   // Default client data
   var client_data = make_client_data(req, core_text);

   // Extra client data for this page
   var extra_client_data = {};

   client_data.page_data = extra_client_data;

   return { meta, template_data, client_data };

});
