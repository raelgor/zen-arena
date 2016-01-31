/* global app */
'use strict';

process.title = 'zen-arena-cs';

const zenx = require('zenx');
const os = require('os');
const path = require('path');
const interfaces = os.networkInterfaces();
const defaultInterface = 'eth0' in interfaces ? interfaces.eth0[0].address : 'localhost';

// Start server
global.app = new zenx.Server({
	bind: defaultInterface,
	port: 10000,
	ws: true,
	static: path.resolve(__dirname + '/../assets')
});

app.config = {
    defaultInterface
};

// Connect to cache servers
//require('./cache');

// Load jade templates
require('./templates');

// Set up routes
require('./routes');

