'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (token) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  fb.setAccessToken(token);

                  return _context.abrupt('return', new Promise(function (resolve) {
                     return fb.api('/me', {
                        fields: ['id', 'name', 'first_name', 'last_name', 'gender', 'email']
                     }, resolve);
                  }));

               case 2:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (error) {
      return instance.emit('error', error);
   });
};