'use strict';

try{

   global.templates = {};

   for(let file of fs.readdirSync('./src/templates'))
      if(/\.jade$/i.test(file))
         global.templates[file.split('.jade')[0]] =
            jade.compileFile(`./src/templates/${file}`);

}catch(error){
   log.error(error);
}
