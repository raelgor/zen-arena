import APIRoute from '../classes/APIRoute';

var r = new APIRoute();

r.setName('authFilter');

export default r;

r.setHandler((response, req, res, next) => {
   if(req.__user)
      next();
   else
      response.error('error_request_requires_auth');
});
