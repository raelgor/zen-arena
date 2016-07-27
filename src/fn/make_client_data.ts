import make_user_data from '../fn/make_user_data';

export default function make_client_data(req, core_text) {
   return {
      user_data: req.__user && make_user_data(req.__user),
      csrf_token: req.__user && req.__session ? req.__session.csrf_token : undefined,
      grecaptcha_site_key: appConfig.grecaptcha.site_key,
      fb_api_version: appConfig.fb_app.api_version,
      fb_app_id: appConfig.fb_app.app_id,
      core_text,
      lang: req.lang,
      lang_country_code: appLanguageCodeIndex[req.lang].country_code,
      lang_name: appLanguageCodeIndex[req.lang].name,
      base_url: `${appConfig.site_protocol}://${appConfig.domain_name}:${appConfig.port}/`,
      google_client_id: appConfig.google_oauth.client_id,
      min_pass_length: appConfig.password_range.min,
      max_pass_length: appConfig.password_range.max,
      page_data: {},
      games: coreDbData.games,
      app_countries: appConfig.app_countries,
      geolocation: {
         country: (req.__user && req.__user.get('country')) || req.cookies.country_code,
         city: (req.__user && req.__user.get('city')) || req.cookies.city_code
      }
   };
};
