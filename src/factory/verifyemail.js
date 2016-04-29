'use strict';

var f = new Factory();

f.setName('ad');
f.setGenerator(generator);

module.exports = f;

function generator(req, coreText){
   return templates.verifyemail({coreText});
}
