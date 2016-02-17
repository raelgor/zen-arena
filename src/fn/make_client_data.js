/* global make_user_data, appConfig */
'use strict';

module.exports = (req, core_text) => {

   return {
      user_data: req.__user && make_user_data(req.__user),
      csrf_token: req.__user && req.__session ? req.__session.csrf_token : undefined,
      grecaptcha_site_key: appConfig.grecaptcha.site_key,
      fb_api_version: appConfig.fb_app.api_version,
      fb_app_id: appConfig.fb_app.app_id,
      core_text,
      lang: req.lang,
      base_url: `${appConfig.site_protocol}://${appConfig.domain_name}/`,
      google_client_id: appConfig.google_oauth.client_id,
      min_pass_length: appConfig.password_range.min,
      max_pass_length: appConfig.password_range.max
   };
   
};
