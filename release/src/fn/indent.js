'use strict';

module.exports = function (req, offset, depthName) {

   var i = req && !isNaN(req._depth) ? req._depth += offset : 1;

   if (req && !isNaN(req._depth) && depthName) {
      req._depth_name = depthName;
   }

   var exp = '';

   if (i) while (i--) {
      exp += ' ';
   }return exp;
};