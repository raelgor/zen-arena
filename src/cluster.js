/* global app */
'use strict';

process.title = 'zen-arena-cs';

const zenx = require('zenx');
const os = require('os');
const path = require('path');
const config = require('../config');
const defaultInterface = config.bind_ip;
const port = config.port;

// Start server
global.app = new zenx.Server({
	bind: defaultInterface,
	port,
	ws: true,
	static: path.resolve(__dirname + '/../assets')
});

app.config = {
    defaultInterface,
    port
};

// Connect to cache servers
//require('./cache');

// Load jade templates
require('./templates');

// Set up routes
require('./routes');

