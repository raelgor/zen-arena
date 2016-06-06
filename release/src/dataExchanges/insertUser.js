'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (user) {
   return co(_regenerator2.default.mark(function _callee() {
      var queryResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  if (user instanceof User) user = user.record;

                  _context.next = 3;
                  return mongos.collection('users').insert(user);

               case 3:
                  queryResult = _context.sent;
                  return _context.abrupt('return', queryResult[0]);

               case 5:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};