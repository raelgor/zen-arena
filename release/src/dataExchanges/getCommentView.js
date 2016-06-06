'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (id) {
   return co(_regenerator2.default.mark(function _callee() {
      var comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return cache.exists('commentview:' + id);

               case 2:
                  if (! +_context.sent) {
                     _context.next = 8;
                     break;
                  }

                  _context.next = 5;
                  return cache.hgetall('commentview:' + id);

               case 5:
                  comment = _context.sent;
                  _context.next = 18;
                  break;

               case 8:
                  _context.next = 10;
                  return mongos.collection('comments').find({ id: +id }).toArray();

               case 10:
                  comment = _context.sent;

                  comment = comment[0];

                  if (!comment) {
                     _context.next = 18;
                     break;
                  }

                  _context.next = 15;
                  return mongos.collection('comment_likes').find({ comment_id: +id }).count();

               case 15:
                  comment.likes = _context.sent;
                  _context.next = 18;
                  return cache.hmset('commentview:' + id, comment);

               case 18:
                  return _context.abrupt('return', comment);

               case 19:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
};