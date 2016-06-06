'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, id, coreText, uid) {
   return co(_regenerator2.default.mark(function _callee() {
      var viewData, publisher, result, NUM_OF_COMM, totalComments, commentIds, comments, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _comment, comment, index;

      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  viewData = cache.hgetall('postview:' + id);

                  if (viewData.id) {
                     _context.next = 25;
                     break;
                  }

                  _context.next = 4;
                  return data.getPost(id);

               case 4:
                  viewData = _context.sent;

                  if (viewData) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', '');

               case 7:
                  _context.next = 9;
                  return mongos.collection('post_likes').find({ post_id: id }).count();

               case 9:
                  viewData.likes = _context.sent;
                  _context.next = 12;
                  return mongos.collection('comments').find({ post_id: id }).count();

               case 12:
                  viewData.comments = _context.sent;


                  viewData.shares = 0;

                  _context.next = 16;
                  return data.getRecordByNamespace(req, +viewData.publisher);

               case 16:
                  publisher = _context.sent;

                  if (publisher) {
                     _context.next = 19;
                     break;
                  }

                  return _context.abrupt('return', '');

               case 19:

                  viewData.publisher_namespace = publisher.namespace || publisher.get('id');

                  if (publisher instanceof User) {
                     viewData.publisher_namespace = publisher.get('username') || publisher.get('id');
                     viewData.publisher_image = publisher.get('image');
                     viewData.publisher_display_name = publisher.displayName();
                  }

                  _context.next = 23;
                  return cache.hmset('postview:' + id, viewData);

               case 23:
                  _context.next = 26;
                  break;

               case 25:
                  log.debug('factory.post: Found in cache.');

               case 26:
                  if (!uid) {
                     _context.next = 38;
                     break;
                  }

                  _context.next = 29;
                  return cache.get('postselflike:' + id + ':' + uid);

               case 29:
                  viewData.selfLiked = _context.sent;

                  if (viewData.selfLiked) {
                     _context.next = 37;
                     break;
                  }

                  _context.next = 33;
                  return mongos.collection('post_likes').find({
                     post_id: +id,
                     user_id: +uid
                  }).count();

               case 33:
                  result = _context.sent;


                  viewData.selfLiked = result;

                  _context.next = 37;
                  return cache.set('postselflike:' + id + ':' + uid, viewData.selfLiked);

               case 37:

                  viewData.selfLiked = +viewData.selfLiked;

               case 38:
                  NUM_OF_COMM = 2;

                  viewData.commentsHtml = [];

                  _context.next = 42;
                  return cache.exists('commentpool:' + viewData.id);

               case 42:
                  if (! +_context.sent) {
                     _context.next = 52;
                     break;
                  }

                  _context.next = 45;
                  return cache.zcount('commentpool:' + viewData.id, '-inf', '+inf');

               case 45:
                  totalComments = +_context.sent;
                  _context.next = 48;
                  return cache.zrange('commentpool:' + viewData.id, totalComments - NUM_OF_COMM, totalComments);

               case 48:
                  commentIds = _context.sent;


                  viewData.commentsHtml = commentIds;

                  _context.next = 83;
                  break;

               case 52:
                  _context.next = 54;
                  return mongos.collection('comments').find({ post_id: +viewData.id }).sort({ date: 1 }).toArray();

               case 54:
                  comments = _context.sent;
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 58;
                  _iterator = comments[Symbol.iterator]();

               case 60:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                     _context.next = 67;
                     break;
                  }

                  _comment = _step.value;
                  _context.next = 64;
                  return cache.zadd('commentpool:' + viewData.id, _comment.date, _comment.id);

               case 64:
                  _iteratorNormalCompletion = true;
                  _context.next = 60;
                  break;

               case 67:
                  _context.next = 73;
                  break;

               case 69:
                  _context.prev = 69;
                  _context.t0 = _context['catch'](58);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

               case 73:
                  _context.prev = 73;
                  _context.prev = 74;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                     _iterator.return();
                  }

               case 76:
                  _context.prev = 76;

                  if (!_didIteratorError) {
                     _context.next = 79;
                     break;
                  }

                  throw _iteratorError;

               case 79:
                  return _context.finish(76);

               case 80:
                  return _context.finish(73);

               case 81:

                  while (NUM_OF_COMM--) {
                     comment = comments.pop();

                     comment && viewData.commentsHtml.push(comment.id);
                  }
                  viewData.commentsHtml.reverse();

               case 83:
                  _context.t1 = _regenerator2.default.keys(viewData.commentsHtml);

               case 84:
                  if ((_context.t2 = _context.t1()).done) {
                     _context.next = 91;
                     break;
                  }

                  index = _context.t2.value;
                  _context.next = 88;
                  return factory.comment.make(req, viewData.commentsHtml[index], coreText, uid);

               case 88:
                  viewData.commentsHtml[index] = _context.sent;
                  _context.next = 84;
                  break;

               case 91:

                  if (+uid === +viewData.publisher) viewData.isOwner = true;

                  return _context.abrupt('return', viewData);

               case 93:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[58, 69, 73, 81], [74,, 76, 80]]);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
};