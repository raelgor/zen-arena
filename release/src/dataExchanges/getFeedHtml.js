'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, coreText, uid, ns_origin, owner_id, type, skip, limit) {
   return co(_regenerator2.default.mark(function _callee() {
      var cacheKey, html, postIds, posts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _post, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _id, postHtml;

      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  cacheKey = 'feed:' + ns_origin + ':' + owner_id + ':' + type;
                  html = '';
                  _context.next = 4;
                  return cache.exists(cacheKey);

               case 4:
                  if (! +_context.sent) {
                     _context.next = 10;
                     break;
                  }

                  _context.next = 7;
                  return cache.zrevrange(cacheKey, skip, +skip + +limit);

               case 7:
                  postIds = _context.sent;
                  _context.next = 40;
                  break;

               case 10:
                  _context.next = 12;
                  return mongos.collection('feeds').find({
                     ns_origin: ns_origin,
                     owner_id: +owner_id,
                     type: type
                  }).sort({ date: 1 }).toArray();

               case 12:
                  posts = _context.sent;

                  if (!(posts instanceof Array)) {
                     _context.next = 40;
                     break;
                  }

                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 17;
                  _iterator = posts[Symbol.iterator]();

               case 19:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                     _context.next = 26;
                     break;
                  }

                  _post = _step.value;
                  _context.next = 23;
                  return cache.zadd(cacheKey, _post.date_added, _post.post_id);

               case 23:
                  _iteratorNormalCompletion = true;
                  _context.next = 19;
                  break;

               case 26:
                  _context.next = 32;
                  break;

               case 28:
                  _context.prev = 28;
                  _context.t0 = _context['catch'](17);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

               case 32:
                  _context.prev = 32;
                  _context.prev = 33;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                     _iterator.return();
                  }

               case 35:
                  _context.prev = 35;

                  if (!_didIteratorError) {
                     _context.next = 38;
                     break;
                  }

                  throw _iteratorError;

               case 38:
                  return _context.finish(35);

               case 39:
                  return _context.finish(32);

               case 40:
                  _context.next = 42;
                  return cache.zrevrange(cacheKey, skip, +skip + +limit);

               case 42:
                  postIds = _context.sent;

                  if (!(postIds instanceof Array)) {
                     _context.next = 76;
                     break;
                  }

                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context.prev = 47;
                  _iterator2 = postIds[Symbol.iterator]();

               case 49:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                     _context.next = 62;
                     break;
                  }

                  _id = _step2.value;
                  _context.next = 53;
                  return factory.post.make(req, +_id, coreText, +uid);

               case 53:
                  postHtml = _context.sent;
                  _context.t1 = !postHtml;

                  if (!_context.t1) {
                     _context.next = 58;
                     break;
                  }

                  _context.next = 58;
                  return cache.zrem(cacheKey, _id);

               case 58:
                  html += postHtml;

               case 59:
                  _iteratorNormalCompletion2 = true;
                  _context.next = 49;
                  break;

               case 62:
                  _context.next = 68;
                  break;

               case 64:
                  _context.prev = 64;
                  _context.t2 = _context['catch'](47);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context.t2;

               case 68:
                  _context.prev = 68;
                  _context.prev = 69;

                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                     _iterator2.return();
                  }

               case 71:
                  _context.prev = 71;

                  if (!_didIteratorError2) {
                     _context.next = 74;
                     break;
                  }

                  throw _iteratorError2;

               case 74:
                  return _context.finish(71);

               case 75:
                  return _context.finish(68);

               case 76:
                  return _context.abrupt('return', html);

               case 77:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[17, 28, 32, 40], [33,, 35, 39], [47, 64, 68, 76], [69,, 71, 75]]);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
};