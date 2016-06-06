'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generator].map(_regenerator2.default.mark);

var f = new Factory();

f.setName('settings.user.accounts');
f.setGenerator(generator);

module.exports = f;

function generator(req) {
   return _regenerator2.default.wrap(function generator$(_context) {
      while (1) {
         switch (_context.prev = _context.next) {
            case 0:
               return _context.abrupt('return', templates.settings.page.accounts({
                  coreText: req.coreText,
                  user: req.__user.record,
                  oauthOptions: [{ id: 'fb', accDisplayInfo: '_fb_name', name: 'Facebook', image: "/img/oauthlogos/fb.png", connectedKey: 'fbid', descKey: 'connect_facebook_description' }, { id: 'gplus', accDisplayInfo: '_gp_displayName', name: 'Google+', image: "/img/oauthlogos/gplus.png", connectedKey: 'goid', descKey: 'connect_gplus_description' }, { id: 'bnet', accDisplayInfo: '_bnet_battletag', name: 'Battle.net', image: "/img/oauthlogos/battlenet.png", connectedKey: 'bnetid', descKey: 'connect_battlenet_description' }, { id: 'coc', accDisplayInfo: '_coc_nametag', name: 'Clash of Clans', image: "/img/oauthlogos/coc.png", connectedKey: 'cocid', descKey: 'connect_coc_description' }]
               }));

            case 1:
            case 'end':
               return _context.stop();
         }
      }
   }, _marked[0], this);
}