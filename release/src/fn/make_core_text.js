'use strict';

module.exports = function (lang) {
   var result = {};
   for (var key in global.text.core[lang]) {
      result[key] = global.text.core[lang][key].text;
   }return result;
};