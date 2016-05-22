'use strict';

var r = new PageRoute();

r.setName('settings');
r.requiresAuth(true);

module.exports = r;

r.setHandler((response, req, res) => co(function*() {

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
      () => co(function*(){
         return yield factory.index.make(
             response.request,
             response.pageData,
             yield states[2]()
         );
      });

   states[1] =
      () => co(function*(){
         var target;
         if(req.params.setting_category_group)
            target = factory.settings[req.params.setting_category_group];
         else
            target = factory.settings.user;
         return yield target[category].make(req);
      });

   states[2] =
      () => co(function*(){
         return templates.settings.container({
            coreText: req.coreText,
            data: {
               page: yield states[1](),
               selector: yield factory.settings.selector.make(req, selectors)
            }
         });
      });
      
   var result = yield states[depth]();

   if(depth) {
      var jsonResponse = new JSONResponse(req, res);
      jsonResponse.responseData = { html: result };
      jsonResponse.end();
   } else {
      response.responseData = result;
      response.end();
   }

}).catch(e => instance.emit('error', e)));
