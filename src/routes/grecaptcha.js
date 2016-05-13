'use strict';

var r = new APIRoute();

r.setName('grecaptcha');

module.exports = r;

r.prependRoute(routes.detectAddress.route);

r.setHandler((response, req, res, next) => co(function*(){

   if(TEST_MODE)
      return next();

   if(req.body && req.body.message && req.body.message.grecaptcha)
      if(yield verify_grecaptcha(req.body.message.grecaptcha, req._address))
         return next();

   return response.error('error_bad_recaptcha');

}));
