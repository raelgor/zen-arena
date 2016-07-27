import APIRoute from '../classes/APIRoute';

var r = new APIRoute();

r.setName('adminFilter');

export default r;

r.setHandler((response, req, res, next) => {
   if(~appConfig.admins.indexOf(+req.__user.get('id')))
      next();
   else
      response.error('error_request_requires_admin');
});
