'use strict';

var f = new Factory();

f.setName('settings.user.general');
f.setGenerator(generator);

module.exports = f;

function* generator(req, coreText, uid){

   return templates.settings.page.general({
      coreText: req.coreText,
      user: req.__user.record
   });

}
