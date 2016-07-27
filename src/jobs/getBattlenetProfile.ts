import get from '../fn/get';
import post from '../fn/post';

export default async function(code: string){

   var result;
   var parsedResponse: any;

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
      await post('https://eu.battle.net/oauth/token', rdata, { Authorization });

   try {
      parsedResponse = JSON.parse(authResponse);
   } catch(err) { }

   if(parsedResponse && parsedResponse.access_token)
      result =
         await get(`https://eu.api.battle.net/account/user?access_token=${parsedResponse.access_token}`);

   try {
      result = JSON.parse(result);
   } catch (err) { }

   return result;

}
