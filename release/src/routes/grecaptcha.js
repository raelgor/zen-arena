'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('grecaptcha');

module.exports = r;

r.prependRoute(routes.detectAddress.route);

r.setHandler(function (response, req, res, next) {
   return co(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  if (!TEST_MODE) {
                     _context.next = 2;
                     break;
                  }

                  return _context.abrupt('return', next());

               case 2:
                  if (!(req.body && req.body.message && req.body.message.grecaptcha)) {
                     _context.next = 7;
                     break;
                  }

                  _context.next = 5;
                  return verify_grecaptcha(req.body.message.grecaptcha, req._address);

               case 5:
                  if (!_context.sent) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', next());

               case 7:
                  return _context.abrupt('return', response.error('error_bad_recaptcha'));

               case 8:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});