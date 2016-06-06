'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('home');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, uid) {
   var posts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, index, result;

   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               posts = [];
               _iteratorNormalCompletion = true;
               _didIteratorError = false;
               _iteratorError = undefined;
               _context.prev = 4;
               _iterator = appConfig.home_posts[Symbol.iterator]();

            case 6:
               if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
               }

               index = _step.value;
               _context.next = 10;
               return factory.post.make(req, index, coreText, uid);

            case 10:
               posts[index] = _context.sent;

            case 11:
               _iteratorNormalCompletion = true;
               _context.next = 6;
               break;

            case 14:
               _context.next = 20;
               break;

            case 16:
               _context.prev = 16;
               _context.t0 = _context['catch'](4);
               _didIteratorError = true;
               _iteratorError = _context.t0;

            case 20:
               _context.prev = 20;
               _context.prev = 21;

               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }

            case 23:
               _context.prev = 23;

               if (!_didIteratorError) {
                  _context.next = 26;
                  break;
               }

               throw _iteratorError;

            case 26:
               return _context.finish(23);

            case 27:
               return _context.finish(20);

            case 28:
               result = templates.home({
                  coreText: coreText,
                  posts: posts,
                  partners: appConfig.partners
               });
               return _context.abrupt('return', result);

            case 30:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this, [[4, 16, 20, 28], [21,, 23, 27]]);
}