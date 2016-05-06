'use strict';

module.exports = (req, res, next, value) => {

   if(languageCodes.has(value))
      next();
   else
      req._response.error('error_unknown_lang_code');

};
