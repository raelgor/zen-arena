import APIRoute from '../classes/APIRoute';
import verify_grecaptcha from '../fn/verify_grecaptcha';

var r = new APIRoute();

r.setName('grecaptcha');

export default r;

r.prependRoute(routes.detectAddress.route);

r.setHandler(async function(response, req, res, next){

   if(instance.flags.TEST_MODE)
      return next();

   if(req.body && req.body.message && req.body.message.grecaptcha)
      if(await verify_grecaptcha(req.body.message.grecaptcha, req._address))
         return next();

   return response.error('error_bad_recaptcha');

});
