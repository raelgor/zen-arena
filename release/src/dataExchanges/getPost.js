'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (id) {
  return co(_regenerator2.default.mark(function _callee() {
    var post, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return cache.hgetall('post:' + id);

          case 2:
            post = _context.sent;

            if (!(!post || !post.id)) {
              _context.next = 13;
              break;
            }

            _context.next = 6;
            return mongos.collection('posts').find({ id: +id }).toArray();

          case 6:
            result = _context.sent;


            post = result[0];

            if (post) {
              _context.next = 11;
              break;
            }

            log.debug('data.getPost(' + id + '): Post not found.');
            return _context.abrupt('return', null);

          case 11:
            _context.next = 13;
            return cache.hmset('post:' + id, post);

          case 13:
            return _context.abrupt('return', post);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};