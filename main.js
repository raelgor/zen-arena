/*
zen-arena
Developed by Kosmas Papadatos
*/
'use strict';

const os = require('os');
const numOfCores = global.numOfCores = os.cpus().length;
const log = require('./src/log');
const cluster = global.cluster = require('cluster');
const colors = require('colors/safe');
const packageInfo = require('./package');
const uuid = require('./src/fn/uuid');
const co = require('co');
const mongodb = require('mongodb');
const fs = require('fs');
const make_mongo_url = require('./src/fn/make_mongo_url');

const roleHandlerMap = {
   'app' : './src/app.js',
   'balancer' : './src/balancer.js'
};

// Set master process title
process.title = 'zen-arena-cm';

// Client configuration file
var config;

// Client ID
var clientID;

// Persistent connection to the System Database
var systemDB;

log(`Initializing zen-arena client ${packageInfo.version} ...`);

try {

   log(`Loading configuration from config file...`);

   config = global.config = require('./config');

   log.green(`Configuration loaded.`);

   log(`Loading client ID...`);

   try {

      clientID = fs.readFileSync('./id').toString('utf8');
      log.magenta(clientID);

   } catch (err) {

      log.warn(`No client ID found. Generating...`);

      clientID = uuid();

      log.magenta(clientID);

      log.warn(`Writing to file...`);

      fs.writeFileSync('./id', clientID);

      log.warn(`Done.`);

   }

   co(init);

} catch(err) {

   log(`Load failed: ${colors.red(err)}`);
   process.exit();

}

function* init() {

   log(`Connecting to system database...`);

   while(!systemDB)
      try {
         systemDB = yield mongodb.connect(make_mongo_url(config.systemDatabase));
      } catch (err) {
         log.warn('Could not connect to system database. Retrying in 1s...');
         yield new Promise(r => setTimeout(r, 1e3));
      }

   var clientConfig = yield systemDB.collection('clients').find({id:clientID}).toArray();

   if(!clientConfig.length)
      yield systemDB.collection('clients').insert({ id: clientID });
   else
      clientConfig = clientConfig[0];

   if(!clientConfig.role) {
      log.warn(`No client configuration in database. Client idle.`);
      return;
   }

   log(`Role: ${colors.magenta(clientConfig.role.toUpperCase())}`);
   log(`Instances: ${colors.magenta(clientConfig.instances)}`);

   require(roleHandlerMap[clientConfig.role])(clientConfig);

   log.green('Master process initialized.');

}
