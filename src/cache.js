/* global app */
'use strict';

const CacheClient = require('zenx').cache.Client;
const co = require('co');

var client = app.cacheClient = new CacheClient({
    host: app.config.defaultInterface,
    port: 8082,
    protocol: 'http'
});

client.on('connected', () => co(function*(){
    
    var x = yield client.get({ query: {}, database: 'zenarena', collection: 'text' });
    
    console.log(x);
    
}));