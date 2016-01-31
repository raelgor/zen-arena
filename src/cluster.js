'use strict';

process.title = 'zen-arena-cs';

const zenx = require('zenx');
const config = require('../config');
const path = require('path');

// Start server
global.app = new zenx.Server({
	bind: config.address,
	port: config.port,
	ws: true,
	static: path.resolve(__dirname + '/../assets')
});

// Load jade templates
require('./templates');

// Set up routes
require('./routes');

