'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('commentcreate');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var post_id, comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  post_id = req.params.post_id;

                  if (req.body.message.comment) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_empty_comment'));

               case 3:
                  _context.t0 = +req.__user.get('id');
                  _context.next = 6;
                  return increment('comments', 'id');

               case 6:
                  _context.t1 = _context.sent;
                  _context.t2 = +post_id;
                  _context.t3 = req.body.message.comment;
                  _context.t4 = Date.now();
                  comment = {
                     user_id: _context.t0,
                     id: _context.t1,
                     post_id: _context.t2,
                     text: _context.t3,
                     date: _context.t4
                  };


                  if (!post_id) response.error('error_no_id');

                  _context.next = 14;
                  return dataTransporter.dbc.collection('comments').insert(comment);

               case 14:
                  _context.next = 16;
                  return cache.hincrby('postview:' + post_id, 'comments', 1);

               case 16:
                  _context.next = 18;
                  return cache.zadd('commentpool:' + post_id, comment.date, comment.id);

               case 18:
                  _context.next = 20;
                  return factory.comment.make(req, comment.id, coreTextCache[req.lang], +req.__user.get('id'));

               case 20:
                  _context.t5 = _context.sent;
                  response.responseData = {
                     message: 'OK',
                     commentHtml: _context.t5
                  };


                  response.end();

               case 23:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});