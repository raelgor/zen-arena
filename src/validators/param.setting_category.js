'use strict';

module.exports = (req, res, next, value) => {

   if(~[
      'accounts',
      'password',
      'merge'
   ].indexOf(value))
      next();
   else
      res.end('{"error":"error_unknown_setting_category"}');

};
