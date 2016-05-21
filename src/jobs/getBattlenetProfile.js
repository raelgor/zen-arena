'use strict';
module.exports = code => co(function*(){

   var result;

   var Authorization =
      'Basic ' +
      new Buffer(appConfig.battle_net.key + ':' + appConfig.battle_net.secret)
         .toString('base64');

   var rdata = {
      redirect_uri: appConfig.battle_net.callbackUrl,
      grant_type: 'authorization_code',
      code
   };

   var authResponse =
      yield post('https://eu.battle.net/oauth/token', rdata, { Authorization });

   if(authResponse && authResponse.access_token)
      result =
         yield get(`https://eu.api.battle.net/account/user?access_token=${authResponse.access_token}`);

   try {
      result = JSON.parse(result);
   } catch (err) { }

   return result;

}).catch(error => instance.emit('error', error));
