/* global jade */
'use strict';

try{
   global.templates = {
       index: jade.compileFile('./src/templates/index.jade'),
       maintenance: jade.compileFile('./src/templates/maintenance.jade'),
       home: jade.compileFile('./src/templates/home.jade'),
       unsubscribeall: jade.compileFile('./src/templates/unsubscribeall.jade'),
       verifyemail: jade.compileFile('./src/templates/verifyemail.jade')
   };
}catch(error){
   console.log(error);
}
