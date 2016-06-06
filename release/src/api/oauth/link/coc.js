'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('oauth.link.coc');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.prependRoute(assertBody({
   message: {
      clanId: '1'
   }
}));

module.exports = r;

r.setHandler(function (response, req) {
   return co(_regenerator2.default.mark(function _callee() {
      var clanId, apiResponse;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  clanId = encodeURIComponent(req.body.message.clanId);
                  _context.next = 3;
                  return get('https://api.clashofclans.com/v1/clans/' + clanId, {
                     Authorization: 'Bearer ' + appConfig.coc_token
                  });

               case 3:
                  apiResponse = _context.sent;


                  try {
                     apiResponse = JSON.parse(apiResponse);
                  } catch (err) {}

                  if (!(apiResponse.members == 1 && new RegExp(req.__user.get('coc_verification_code'), 'i').test(apiResponse.description))) {
                     _context.next = 13;
                     break;
                  }

                  req.__user.set('cocid', apiResponse.memberList[0].tag);
                  req.__user.set('_coc_name', apiResponse.memberList[0].name);
                  req.__user.set('_coc_tag', apiResponse.memberList[0].tag);
                  req.__user.set('_coc_nametag', apiResponse.memberList[0].name + apiResponse.memberList[0].tag);
                  req.__user.updateRecord();
                  _context.next = 14;
                  break;

               case 13:
                  return _context.abrupt('return', response.error('error_invalid_coc_link_request'));

               case 14:

                  response.responseData = {
                     message: 'ok',
                     name: req.__user.get('_coc_nametag')
                  };

                  response.end();

               case 16:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (error) {
      return instance.emit('error', error);
   });
});