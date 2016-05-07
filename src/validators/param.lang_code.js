'use strict';

module.exports = (req, res, next, value) => {
   
   if(languageCodes.has(value))
      next();
   else
      res.end('{"error":"error_unknown_lang_code"}');

};
