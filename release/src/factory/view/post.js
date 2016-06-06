'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('viewpost');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, user, depth, post_id) {
   var html;
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               html = '';


               depth = depth || 2;

               _context.t0 = +depth;
               _context.next = _context.t0 === 1 ? 5 : _context.t0 === 2 ? 9 : 21;
               break;

            case 5:
               _context.next = 7;
               return factory.post.make(req, +post_id, coreText, user && +user.get('id'));

            case 7:
               html = _context.sent;
               return _context.abrupt('break', 21);

            case 9:
               _context.t1 = templates;
               _context.t2 = coreText;
               _context.next = 13;
               return factory.post.make(req, +post_id, coreText, user && +user.get('id'));

            case 13:
               _context.t3 = _context.sent;
               _context.next = 16;
               return factory.rightcol.make(req, coreText, user, req.lang);

            case 16:
               _context.t4 = _context.sent;
               _context.t5 = {
                  leftColumn: _context.t3,
                  rightColumn: _context.t4
               };
               _context.t6 = {
                  coreText: _context.t2,
                  data: _context.t5
               };
               html = _context.t1.feed.call(_context.t1, _context.t6);
               return _context.abrupt('break', 21);

            case 21:
               return _context.abrupt('return', html);

            case 22:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}