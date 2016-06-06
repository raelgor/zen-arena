'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('oauth.link.fb');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.prependRoute(assertBody({
   message: {
      access_token: '1'
   }
}));

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var access_token, profile;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  access_token = req.body.message.access_token;
                  _context.next = 3;
                  return job.getFacebookProfile(access_token);

               case 3:
                  profile = _context.sent;

                  if (profile.id) {
                     _context.next = 6;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_fb_access_token'));

               case 6:
                  _context.next = 8;
                  return job.updateUserFacebookData(req.__user, profile);

               case 8:

                  response.responseData = {
                     message: 'ok',
                     name: profile.name
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