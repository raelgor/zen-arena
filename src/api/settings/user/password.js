'use strict';

var r = new APIRoute();

r.setName('settings.user.password');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

r.prependRoute(assertBody({
   message: {
      new_password: '1'
   }
}));

module.exports = r;

r.setHandler((response, req) => co(function*(){

   if(req.__user.get('password'))
      if(!(yield req.__user.testPassword(req.body.message.current_password)))
         return response.error('error_wrong_password');

   yield req.__user.setPassword(req.body.message.new_password);
   yield req.__user.updateRecord();

   response.responseData = {
      message: 'ok'
   };

   response.end();

}));
