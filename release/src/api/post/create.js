'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('postcreate');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var uid, text, date, id, post;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  uid = req.__user.get('id');
                  text = String(req.body.message.text);
                  date = Date.now();
                  _context.next = 5;
                  return increment('posts', 'id');

               case 5:
                  id = _context.sent;
                  post = {
                     id: id,
                     text: text,
                     date_created: date,
                     date_published: date,
                     published: true,
                     publisher: +uid
                  };
                  _context.next = 9;
                  return mongos.collection('posts').insert(post);

               case 9:
                  _context.next = 11;
                  return mongos.collection('feeds').insert({
                     ns_origin: 'user',
                     type: 'feed',
                     date_added: date,
                     post_id: id,
                     owner_id: +uid
                  });

               case 11:
                  _context.next = 13;
                  return cache.zadd('feed:user:' + uid + ':feed', date, id);

               case 13:
                  _context.next = 15;
                  return factory.post.make(req, id, coreTextCache[req.lang], uid);

               case 15:
                  _context.t0 = _context.sent;
                  response.responseData = {
                     message: 'OK',
                     html: _context.t0
                  };


                  response.end();

               case 18:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});