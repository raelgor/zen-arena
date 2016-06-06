'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('feedrange');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var uid, index;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  uid = req.__user && req.__user.get('id');
                  index = req.params.index;
                  _context.next = 4;
                  return data.getFeedHtml(req, coreTextCache[req.lang],
                  // Auth user
                  uid,
                  // Namespace origin
                  'user',
                  // Owner id
                  uid,
                  // Feed type (wall/feed)
                  'feed',
                  // Skip
                  index,
                  // Limit
                  10);

               case 4:
                  _context.t0 = _context.sent;
                  response.responseData = {
                     html: _context.t0
                  };


                  response.end();

               case 7:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
});