/* global appConfig, make_core_text, APIRoute */
'use strict';

var route = new APIRoute((response, req) => {

   let valid_request = req.params && req.params.lang;

   if(!valid_request)
      return response.error('error_invalid_request');

   if(!~appConfig.app_languages.indexOf(req.params.lang))
      return response.error('error_invalid_language');

   response.responseData = make_core_text(req.params.lang);
   response.end();

});

module.exports = route;
