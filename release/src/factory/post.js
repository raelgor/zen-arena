'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('post');
f.setGenerator(generator);

module.exports = f;

function generator(req, id, coreText, uid) {
   var viewData, result;
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.next = 2;
               return data.getPostViewData(req, id, coreText, uid);

            case 2:
               viewData = _context.sent;
               result = !viewData ? '' : templates.post({
                  coreText: coreText,
                  data: viewData
               });
               return _context.abrupt('return', result);

            case 5:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}