'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('logout');

module.exports = r;

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.setHandler(function (response, req, res) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:

                  res.clearCookie('st');

                  _context.next = 3;
                  return dataTransporter.remove({
                     query: { session_token: req.__session.session_token },
                     collection: 'sessions'
                  });

               case 3:
                  _context.next = 5;
                  return cache.del('sessions:' + req.__session.session_token);

               case 5:
                  _context.next = 7;
                  return factory.view.index.make(req, coreTextCache[req.lang], null, 2, req.lang);

               case 7:
                  _context.t0 = _context.sent;
                  response.responseData = {
                     message: 'OK',
                     html: _context.t0
                  };


                  response.end();

               case 10:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});