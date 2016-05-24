'use strict';

var r = new APIRoute();

r.setName('oauth.unlink');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

module.exports = r;

var oauthKeyIndex = {
   fb: 'fbid',
   gplus: 'goid',
   bnet: 'bnetid',
   coc: 'cocid'
};

r.setHandler((response, req) => co(function*(){

   req.__user.set(oauthKeyIndex[req.params.oauth_account_id_key], '');
   yield req.__user.updateRecord();

   response.responseData = {
      message: 'ok'
   };

   response.end();

}));
