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


                  oauth2Client.setCredentials({ access_token: access_token });

                  _context.next = 4;
                  return new Promise(function (resolve) {
                     return plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, response) {
                        return resolve(response);
                     });
                  });

               case 4:
                  profile = _context.sent;

                  if (profile.id) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_go_access_token'));

               case 7:
                  _context.next = 9;
                  return job.updateUserGoogleData(req.__user, profile);

               case 9:

                  response.responseData = {
                     message: 'ok',
                     name: profile.displayName
                  };

                  response.end();

               case 11:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});