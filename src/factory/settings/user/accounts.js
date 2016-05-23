'use strict';

var f = new Factory();

f.setName('settings.user.accounts');
f.setGenerator(generator);

module.exports = f;

function* generator(req){

   return templates.settings.page.accounts({
      coreText: req.coreText,
      user: req.__user.record,
      oauthOptions: [
         { id: 'fb', accDisplayInfo: '_fb_name', name: 'Facebook', image: "/img/oauthlogos/fb.png", connectedKey: 'fbid', descKey: 'connect_facebook_description' },
         { id: 'gplus', accDisplayInfo: '_gp_displayName',  name: 'Google+', image: "/img/oauthlogos/gplus.png", connectedKey: 'goid', descKey: 'connect_gplus_description' },
         { id: 'bnet', accDisplayInfo: '_bnet_battletag',  name: 'Battle.net', image: "/img/oauthlogos/battlenet.png", connectedKey: 'bnetid', descKey: 'connect_battlenet_description' },
         { id: 'coc',  name: 'Clash of Clans', image: "/img/oauthlogos/coc.png", connectedKey: 'cocid', descKey: 'connect_coc_description' }
      ]
   });

}
