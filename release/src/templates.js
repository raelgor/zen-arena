"use strict";

var jade = require('jade');
global["templates"] = {};
loaddirSync('./templates', 'templates', '.jade', function (filePath) {
  return jade.compileFile("./src/" + filePath);
});