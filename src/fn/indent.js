'use strict';

module.exports = (req, offset) => {

   let i = req && !isNaN(req._depth) ? (req._depth += offset) : 1;

   let exp = '';

   if(i)
      while(i--)
         exp += ' ';

   return exp;

};
