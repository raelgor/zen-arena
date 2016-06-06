'use strict';

module.exports = function (req, res, next, value) {

   if (~['admin', 'games'].indexOf(value)) next();else res.end('{"error":"error_unknown_setting_category_group"}');
};