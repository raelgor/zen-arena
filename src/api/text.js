'use strict';

var r = new APIRoute();

r.setName('text');

module.exports = r;

r.setHandler((response, req) => {

   let valid_request = req.params && req.params.lang;

   if(!valid_request)
      return response.error('error_invalid_request');

   if(!~appConfig.app_languages.indexOf(req.params.lang))
      return response.error('error_invalid_language');

   response.responseData = coreTextCache[req.params.lang];
   response.end();

});
