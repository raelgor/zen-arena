'use strict';

try{

   global.templates = {};

   loaddirSync(
      './templates',
      'templates',
      '.jade',
      filePath => jade.compileFile(`./src/${filePath}`)
   );

}catch(error){
   log.error(error);
}
