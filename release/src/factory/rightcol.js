'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('rightcol');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, user, lang) {
   var result;
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.t0 = templates;
               _context.t1 = coreText;
               _context.t2 = user && user.record;
               _context.t3 = lang;
               _context.t4 = appConfig.copyright_stamp;
               _context.next = 7;
               return data.getRandomAdViews(req, coreText, user && user.get('id'), 2);

            case 7:
               _context.t5 = _context.sent;
               _context.t6 = {
                  user: _context.t2,
                  lang: _context.t3,
                  copyright_stamp: _context.t4,
                  ads: _context.t5
               };
               _context.t7 = {
                  coreText: _context.t1,
                  data: _context.t6
               };
               result = _context.t0.rightcol.call(_context.t0, _context.t7);
               return _context.abrupt('return', result);

            case 12:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}