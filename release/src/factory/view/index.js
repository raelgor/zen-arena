'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('viewindex');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, user, depth, lang) {
   var html;
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               html = '';

               if (user) {
                  _context.next = 7;
                  break;
               }

               _context.next = 4;
               return factory.home.make(req, coreText);

            case 4:
               html = _context.sent;
               _context.next = 19;
               break;

            case 7:
               depth = depth || 2;

               _context.t0 = +depth;
               _context.next = _context.t0 === 2 ? 11 : _context.t0 === 1 ? 15 : 19;
               break;

            case 11:
               _context.next = 13;
               return factory.feed.make(req, coreText, user, lang);

            case 13:
               html = _context.sent;
               return _context.abrupt('break', 19);

            case 15:
               _context.next = 17;
               return factory.feedLeftColumn.make(req, coreText, user);

            case 17:
               html = _context.sent;
               return _context.abrupt('break', 19);

            case 19:
               return _context.abrupt('return', html);

            case 20:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}