'use strict';

var f = new Factory();

f.setName('settings.user.accounts');
f.setGenerator(generator);

module.exports = f;

function* generator(req){

   return templates.settings.page.accounts({
      coreText: req.coreText
   });

}
