'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('commentdelete');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var uid, id, comment, post;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  uid = req.__user.get('id');
                  id = req.params.comment_id;
                  _context.next = 4;
                  return data.getCommentView(id);

               case 4:
                  comment = _context.sent;

                  if (comment) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_no_such_comment'));

               case 7:
                  if (!(+uid === +comment.user_id)) {
                     _context.next = 11;
                     break;
                  }

                  comment.deletable = true;
                  _context.next = 15;
                  break;

               case 11:
                  _context.next = 13;
                  return data.getPost(comment.post_id);

               case 13:
                  post = _context.sent;

                  +post.publisher === +uid && (comment.deletable = true);

               case 15:
                  if (comment.deletable) {
                     _context.next = 17;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_not_authorized_to_delete'));

               case 17:
                  _context.next = 19;
                  return delete_comment(id);

               case 19:

                  // Return geo info
                  response.responseData = { message: 'OK' };

                  response.end();

               case 21:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});