'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (collection, id) {
   return co(_regenerator2.default.mark(function _callee() {
      var entry;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return mongos.collection('counters').findAndModify({ collection: collection, id: id }, [], { $inc: { seq: 1 } }, {
                     upsert: true,
                     new: true
                  });

               case 2:
                  entry = _context.sent;
                  return _context.abrupt('return', entry.value.seq);

               case 4:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};