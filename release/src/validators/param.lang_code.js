'use strict';

module.exports = function (req, res, next, value) {

   if (languageCodes.has(value)) next();else res.end('{"error":"error_unknown_lang_code"}');
};