'use strict';

var f = new Factory();

f.setName('settings.user.general');
f.setGenerator(generator);

module.exports = f;

function* generator(req){

   return templates.settings.page.password({
      coreText: req.coreText
   });

}
