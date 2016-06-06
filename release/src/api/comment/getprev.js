/* global APIRoute, routes, co, dataTransporter, cache, factory */
/* global make_core_text */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = new APIRoute(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var post_id, index, comments, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, comment, _index;

      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  post_id = req.params.post_id;
                  index = +req.params.earliest_index;
                  comments = [];


                  if (!post_id) response.error('error_no_id');

                  if (!index || isNaN(index)) response.error('error_no_index');

                  _context.next = 7;
                  return cache.exists('commentpool:' + post_id);

               case 7:
                  if (! +_context.sent) {
                     _context.next = 13;
                     break;
                  }

                  _context.next = 10;
                  return cache.zrange('commentpool:' + post_id, index - 9 < 0 ? 0 : index - 9, index);

               case 10:
                  comments = _context.sent;
                  _context.next = 43;
                  break;

               case 13:
                  _context.next = 15;
                  return dataTransporter.dbc.collection('comments').find({ post_id: +post_id }).sort({ date: 1 }).toArray();

               case 15:
                  result = _context.sent;
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 19;
                  _iterator = result[Symbol.iterator]();

               case 21:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                     _context.next = 29;
                     break;
                  }

                  comment = _step.value;
                  _context.next = 25;
                  return cache.zadd('commentpool:' + post_id, comment.date, comment.id);

               case 25:
                  comments.push(comment.id);

               case 26:
                  _iteratorNormalCompletion = true;
                  _context.next = 21;
                  break;

               case 29:
                  _context.next = 35;
                  break;

               case 31:
                  _context.prev = 31;
                  _context.t0 = _context['catch'](19);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

               case 35:
                  _context.prev = 35;
                  _context.prev = 36;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                     _iterator.return();
                  }

               case 38:
                  _context.prev = 38;

                  if (!_didIteratorError) {
                     _context.next = 41;
                     break;
                  }

                  throw _iteratorError;

               case 41:
                  return _context.finish(38);

               case 42:
                  return _context.finish(35);

               case 43:
                  _context.t1 = _regenerator2.default.keys(comments);

               case 44:
                  if ((_context.t2 = _context.t1()).done) {
                     _context.next = 51;
                     break;
                  }

                  _index = _context.t2.value;
                  _context.next = 48;
                  return factory.comment.make(req, comments[_index], coreTextCache[req.lang], req.__user && +req.__user.get('id'));

               case 48:
                  comments[_index] = _context.sent;
                  _context.next = 44;
                  break;

               case 51:

                  // Return geo info
                  response.responseData = {
                     message: 'OK',
                     commentHtml: comments
                  };

                  response.end();

               case 53:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this, [[19, 31, 35, 43], [36,, 38, 42]]);
   }));
});

route.prependRoute(routes.authentication.route);

module.exports = route;