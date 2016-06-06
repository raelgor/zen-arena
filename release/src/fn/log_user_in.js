/* global co, make_session, appConfig, make_user_login_data */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (response, user) {
   return co(_regenerator2.default.mark(function _callee() {
      var session;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return make_session(user);

               case 2:
                  session = _context.sent;

                  if (session) {
                     _context.next = 5;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_bad_request'));

               case 5:

                  response.response.cookie('st', session.session_token, {
                     maxAge: appConfig.web_session_lifespan,
                     httpOnly: true,
                     secure: true
                  });

                  response.responseData = make_user_login_data(user, session);
                  response.end();

               case 8:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
};