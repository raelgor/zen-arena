'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('feedLeftColumn');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText, user) {
   var feedPosts, result;
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.next = 2;
               return data.getFeedHtml(req, coreText,
               // Auth user
               user.get('id'),
               // Namespace origin
               'user',
               // Owner id
               user.get('id'),
               // Feed type (wall/feed)
               'feed',
               // Skip
               0,
               // Limit
               10);

            case 2:
               feedPosts = _context.sent;
               result = templates.feedLeftColumn({
                  coreText: coreText,
                  data: {
                     userImage: user.get('image'),
                     feedPosts: feedPosts
                  }
               });
               return _context.abrupt('return', result);

            case 5:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}