/* global co, make_client_data, make_default_meta_data, get_user, update_user */
/* global postman */
'use strict';

module.exports = (req, res, core_text) => co(function*(){

   // Meta data
   var meta = make_default_meta_data(core_text);

   // Template data for jade
   var template_data = { core_text, template: 'verifyemail' };

   // Default client data
   var client_data = make_client_data(req, core_text);

   // Extra client data for this page
   var extra_client_data = {};

   client_data.page_data = extra_client_data;

   if(req.params.token) {
      let user = yield get_user({ verify_email_token: String(req.params.token) });
      if(user && !user.email_verified){
         user.email_verified = true;
         postman.welcome(user);
         yield update_user(user);
      }
   }

   return { meta, template_data, client_data };

});
