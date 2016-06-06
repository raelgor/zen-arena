'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('feed');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, user, lang) {
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.t0 = templates;
               _context.t1 = coreText;
               _context.next = 4;
               return factory.feedLeftColumn.make(req, coreText, user);

            case 4:
               _context.t2 = _context.sent;
               _context.next = 7;
               return factory.rightcol.make(req, coreText, user, lang);

            case 7:
               _context.t3 = _context.sent;
               _context.t4 = {
                  leftColumn: _context.t2,
                  rightColumn: _context.t3
               };
               _context.t5 = {
                  coreText: _context.t1,
                  data: _context.t4
               };
               return _context.abrupt('return', _context.t0.feed.call(_context.t0, _context.t5));

            case 11:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}