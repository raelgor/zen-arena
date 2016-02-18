/*
zen-arena
Developed by Kosmas Papadatos
*/
'use strict';

const zenx = require('zenx');
const os = require('os');
const cluster = require('cluster');
const colors = require('colors/safe');
const numOfCores = os.cpus().length;
const log = require('./src/log');

// Load configuration or throw
// @todo Make an error that points to documentation about the contents
// of config.json
const config = require('./config');

// Set master process title
process.title = 'zen-arena-cm';

const cacheServerUrl = config.cache_server.host + ':' + config.cache_server.port;
log(`Connecting to data server at ${colors.magenta(cacheServerUrl)}...`);

const transporter = new zenx.cache.Client(config.cache_server);

transporter.on('connected', () => {
   transporter.on('error', log);

   log('Connected. Forking workers...');

   cluster.setupMaster({ exec: __dirname + '/src/cluster.js' });

   // Start as many workers as the cores we have
   // @todo Make the number of workers configurable
   for(let i = 0; i < numOfCores; i++) {
      let worker = cluster.fork();

      worker.send({ config });

      worker.on('disconnect', () => {
         worker.kill('SIGTERM');
         cluster.fork().send({ config });
      });
   }

   log.green('Main process initialized.');
});
