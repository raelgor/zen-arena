import PageRoute from '../classes/PageRoute';
import JSONResponse from '../classes/JSONResponse';

var r = new PageRoute();

r.setName('settings');
r.requiresAuth(true);

export default r;

r.setHandler(async function(response, req, res) {

   var category = (req.params.setting_category) || 'general';
   var states = [];
   var depth;

   var selectors = ['user'];

   ~appConfig.admins.indexOf(+req.__user.get('id')) &&
   selectors.push('admin');

   try {
      depth = req.body.message.depth;
   } catch(e) {}

   depth = depth || 0;

   states[0] =
      async function() {
         return await factory.index.make(
             response.request,
             response.pageData,
             await states[2]()
         );
      };

   states[1] =
      async function() {
         var target;
         if(req.params.setting_category_group)
            target = factory.settings[req.params.setting_category_group];
         else
            target = factory.settings.user;
         return await target[category].make(req);
      };

   states[2] =
      async function() {
         return templates.settings.container({
            coreText: req.coreText,
            data: {
               page: await states[1](),
               selector: await factory.settings.selector.make(req, selectors)
            }
         });
      };

   var result = await states[depth]();

   if(depth) {
      var jsonResponse = new JSONResponse(req, res);
      jsonResponse.responseData = { html: result };
      jsonResponse.end();
   } else {
      response.responseData = result;
      response.end();
   }

});
