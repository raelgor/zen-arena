'use strict';
module.exports = lang => {
   let result = {};
   for(let key in global.text.core[lang])
      result[key] = global.text.core[lang][key].text;
   return result;
};
