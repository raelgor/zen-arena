'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('ad');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, id) {
   var ad, _result, result;

   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.next = 2;
               return cache.exists('ad:' + id);

            case 2:
               if (! +_context.sent) {
                  _context.next = 8;
                  break;
               }

               _context.next = 5;
               return cache.hgetall('ad:' + id);

            case 5:
               ad = _context.sent;
               _context.next = 14;
               break;

            case 8:
               _context.next = 10;
               return mongos.collection('ads').find({
                  id: +id
               }).toArray();

            case 10:
               _result = _context.sent;

               ad = _result[0];
               _context.next = 14;
               return cache.hmset('ad:' + id, ad);

            case 14:

               // Build
               result = templates.ad({
                  coreText: coreText,
                  ad: ad
               });
               return _context.abrupt('return', result);

            case 16:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}