'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('view.selector');
f.setGenerator(generator);

module.exports = f;

function generator(req, which) {
   var html, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, group;

   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               html = '';
               _iteratorNormalCompletion = true;
               _didIteratorError = false;
               _iteratorError = undefined;
               _context.prev = 4;


               for (_iterator = which[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  group = _step.value;

                  html += templates.settings.groups[group]({ coreText: req.coreText });
               }_context.next = 12;
               break;

            case 8:
               _context.prev = 8;
               _context.t0 = _context['catch'](4);
               _didIteratorError = true;
               _iteratorError = _context.t0;

            case 12:
               _context.prev = 12;
               _context.prev = 13;

               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }

            case 15:
               _context.prev = 15;

               if (!_didIteratorError) {
                  _context.next = 18;
                  break;
               }

               throw _iteratorError;

            case 18:
               return _context.finish(15);

            case 19:
               return _context.finish(12);

            case 20:
               return _context.abrupt('return', html);

            case 21:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this, [[4, 8, 12, 20], [13,, 15, 19]]);
}