import Route from '../classes/Route';

var r = new Route();

r.setName('detectAddress');

export default r;

r.setHandler((response, req, res, next) => {

   if(req._address) next();

   // Detect address
   req._address =
      appConfig.use_xfwd ?
      req.headers['x-forwarded-for']
      :
      req.connection.remoteAddress;

   next();

});
