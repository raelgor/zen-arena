'use strict';

var r = new APIRoute();

r.setName('text');

module.exports = r;

r.setHandler((response, req, res) => {

   let valid_request = req.params && req.params.lang;

   if(!valid_request)
      return response.error('error_invalid_request');

   if(!~appLanguagesCodes.indexOf(req.params.lang))
      return response.error('error_invalid_language');

   response.responseData = coreTextCache[req.params.lang];

   res.cookie('lang', req.params.lang, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
   });

   response.end();

});
