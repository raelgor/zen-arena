'use strict';

try {

   global.templates = {};

   loaddirSync('./templates', 'templates', '.jade', function (filePath) {
      return jade.compileFile('./src/' + filePath);
   });
} catch (error) {
   log.error(error);
}