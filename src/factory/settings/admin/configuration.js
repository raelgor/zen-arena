'use strict';

var f = new Factory();

f.setName('settings.admin.configuration');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, uid){

   return templates.settings.page.admin.configuration({
      coreText: req.coreText,
      user: req.__user.record,
      appConfig
   });

}
