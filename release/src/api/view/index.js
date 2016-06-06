'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('viewindex');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return factory.view.index.make(req, coreTextCache[req.lang], req.__user, req.body.message.depth, req.lang);

               case 2:
                  _context.t0 = _context.sent;
                  response.responseData = {
                     html: _context.t0
                  };


                  response.end();

               case 5:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (e) {
      return instance.emit('error', e);
   });
});