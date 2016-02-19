/* global co, make_client_data, make_default_meta_data, dataTransporter */
'use strict';

module.exports = (req, res, core_text) => co(function*(){

   // Meta data
   var meta = make_default_meta_data(core_text);

   // Template data for jade
   var template_data = { core_text, template: 'unsubscribe_success' };

   // Default client data
   var client_data = make_client_data(req, core_text);

   // Extra client data for this page
   var extra_client_data = { };

   client_data.page_data = extra_client_data;

   var token = req.path.split('/')[2];

   extra_client_data.token = token;

   if(token) {

      var user = yield dataTransporter.getUser({ unsubscribe_all_token: String(token) });

      if(user) {

         user.set('unsubscribe_all_email', true);
         yield user.updateRecord();

      }

   }

   return { meta, template_data, client_data };

});
