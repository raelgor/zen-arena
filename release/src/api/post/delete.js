'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('postdelete');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var uid, id, post, comments, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, comment;

      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  uid = req.__user.get('id');
                  id = req.params.post_id;
                  _context.next = 4;
                  return data.getPost(+id);

               case 4:
                  post = _context.sent;

                  if (!(+uid !== +post.publisher)) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_not_authorized_to_delete'));

               case 7:
                  _context.next = 9;
                  return mongos.collection('comments').find({ post_id: +id }).toArray();

               case 9:
                  comments = _context.sent;
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 13;
                  _iterator = comments[Symbol.iterator]();

               case 15:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                     _context.next = 22;
                     break;
                  }

                  comment = _step.value;
                  _context.next = 19;
                  return delete_comment(comment.id);

               case 19:
                  _iteratorNormalCompletion = true;
                  _context.next = 15;
                  break;

               case 22:
                  _context.next = 28;
                  break;

               case 24:
                  _context.prev = 24;
                  _context.t0 = _context['catch'](13);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

               case 28:
                  _context.prev = 28;
                  _context.prev = 29;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                     _iterator.return();
                  }

               case 31:
                  _context.prev = 31;

                  if (!_didIteratorError) {
                     _context.next = 34;
                     break;
                  }

                  throw _iteratorError;

               case 34:
                  return _context.finish(31);

               case 35:
                  return _context.finish(28);

               case 36:
                  _context.next = 38;
                  return mongos.collection('posts').remove({ id: +id });

               case 38:
                  _context.next = 40;
                  return mongos.collection('feeds').remove({ post_id: +id });

               case 40:
                  _context.next = 42;
                  return mongos.collection('post_likes').remove({ post_id: +id }, { multi: true });

               case 42:
                  _context.next = 44;
                  return cache.del('post:' + id);

               case 44:
                  _context.next = 46;
                  return cache.del('postview:' + id);

               case 46:
                  _context.next = 48;
                  return cache.del('commentpool:' + id);

               case 48:

                  // Return geo info
                  response.responseData = { message: 'OK' };

                  response.end();

               case 50:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[13, 24, 28, 36], [29,, 31, 35]]);
   }));
});