'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (code) {
   return co(_regenerator2.default.mark(function _callee() {
      var result, Authorization, rdata, authResponse;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  Authorization = 'Basic ' + new Buffer(appConfig.battle_net.key + ':' + appConfig.battle_net.secret).toString('base64');
                  rdata = {
                     redirect_uri: appConfig.battle_net.callbackUrl,
                     grant_type: 'authorization_code',
                     code: code
                  };
                  _context.next = 4;
                  return post('https://eu.battle.net/oauth/token', rdata, { Authorization: Authorization });

               case 4:
                  authResponse = _context.sent;


                  try {
                     authResponse = JSON.parse(authResponse);
                  } catch (err) {}

                  if (!(authResponse && authResponse.access_token)) {
                     _context.next = 10;
                     break;
                  }

                  _context.next = 9;
                  return get('https://eu.api.battle.net/account/user?access_token=' + authResponse.access_token);

               case 9:
                  result = _context.sent;

               case 10:

                  try {
                     result = JSON.parse(result);
                  } catch (err) {}

                  return _context.abrupt('return', result);

               case 12:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (error) {
      return instance.emit('error', error);
   });
};