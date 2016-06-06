'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (skel) {

   return function (req, res, next) {

      var result = compareObjects(skel, req.body);

      if (result) next();else new JSONResponse(req, res).error('error_invalid_parameters');

      function compareObjects(a, b) {
         for (var key in a) {
            if (!(key in b) || (0, _typeof3.default)(a[key]) !== (0, _typeof3.default)(b[key])) return false;else if ((0, _typeof3.default)(a[key]) === 'object') if (!compareObjects(a[key], b[key])) return false;
         }return true;
      }
   };
};