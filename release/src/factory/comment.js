'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('comment');
f.setGenerator(generator);

module.exports = f;

function generator(req, id, coreText, uid) {
   var comment, user_id, user, _result, post, result;

   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               _context.next = 2;
               return data.getCommentView(id);

            case 2:
               comment = _context.sent;


               // Get poster info
               user_id = comment.user_id;
               _context.next = 6;
               return data.getUser({ id: +user_id });

            case 6:
               user = _context.sent;


               comment.userImage = user.get('image');
               comment.displayName = user.displayName();

               // Check if auth user has liked and if can delete

               if (!uid) {
                  _context.next = 32;
                  break;
               }

               _context.next = 12;
               return cache.exists('commentselflike:' + id + ':' + uid);

            case 12:
               if (! +_context.sent) {
                  _context.next = 18;
                  break;
               }

               _context.next = 15;
               return cache.get('commentselflike:' + id + ':' + uid);

            case 15:
               comment.selfLiked = _context.sent;
               _context.next = 24;
               break;

            case 18:
               _context.next = 20;
               return mongos.collection('comment_likes').find({
                  comment_id: +id,
                  user_id: +uid
               }).count();

            case 20:
               _result = _context.sent;

               comment.selfLiked = +_result;
               _context.next = 24;
               return cache.set('commentselflike:' + id + ':' + uid, comment.selfLiked);

            case 24:
               if (!(+uid === +comment.user_id)) {
                  _context.next = 28;
                  break;
               }

               comment.deletable = true;
               _context.next = 32;
               break;

            case 28:
               _context.next = 30;
               return data.getPost(comment.post_id);

            case 30:
               post = _context.sent;

               +post.publisher === +uid && (comment.deletable = true);

            case 32:

               // Build
               result = templates.comment({
                  coreText: coreText,
                  comment: comment
               });
               return _context.abrupt('return', result);

            case 34:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}