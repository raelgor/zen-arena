/* global appConfig, make_core_text */
'use strict';

module.exports = (req, res) => {

   let valid_request = req.params && req.params.lang;

   if(!valid_request)
      return res.end(JSON.stringify({error: 'err_invalid_request'}));

   if(!~appConfig.app_languages.indexOf(req.params.lang))
      return res.end(JSON.stringify({error: 'err_invalid_language'}));

   res.end(JSON.stringify(make_core_text(req.params.lang)));

};
