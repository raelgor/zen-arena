/* global app */
'use strict';

const jade = require('jade');

app.templates = {
    
    index: jade.compileFile('./src/templates/index.jade')
    
}