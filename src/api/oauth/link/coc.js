'use strict';

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

r.setHandler((response, req) => co(function*(){

   var clanId = encodeURIComponent(req.body.message.clanId);

   var apiResponse = yield get(`https://api.clashofclans.com/v1/clans/${clanId}`, {
      Authorization: `Bearer ${appConfig.coc_token}`
   });

   if(apiResponse.members == 1 &&
      new RegExp(req.__user.get('coc_verification_code'), 'i').test(apiResponse.description)) {
      req.__user.set('cocid', apiResponse.memberList[0].tag);
      req.__user.set('_coc_name', apiResponse.memberList[0].name);
      req.__user.set('_coc_tag', apiResponse.memberList[0].tag);
      req.__user.set('_coc_nametag', apiResponse.memberList[0].name + apiResponse.memberList[0].tag);
      req.__user.updateRecord();
   } else
      return response.error('error_invalid_coc_link_request');

   response.responseData = {
      message: 'ok',
      name: req.__user.get('_coc_nametag')
   };

   response.end();

}).catch(error => instance.emit('error', error)));
