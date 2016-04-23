/* global dataTransporter, loaddirSync, co, log, config, postman */
/* global path, make_mongo_url, redis */
'use strict';

// Worker process title
process.title = 'zen-arena-cs';

// Load dependencies
require('./dependencies');

log('Starting worker...');

process.on('message', message => co(function*(){

   log('Configuration message received. Initializing...');

   global.config = message.config;

   global.cache = redis.createClient(
   message.clientConfig.config.cacheClients,
   { debugMode: false });

   log('Connecting to mongos...');

   yield dataTransporter.connectMongos(make_mongo_url(config.systemDatabase));

   log('Getting configuration...');

   yield require('./cache');

   log('Loading postman...');

   postman.init();

   log('Loading api routes...');

   /**
   * Index of {@link APIRoute} objects.
   * @namespace api
   */
   loaddirSync('./api', 'api');

   log('Starting server...');

   // Start server
   global.app = new global.Server({
      bind: message.clientConfig.config.bind_ip,
      port: message.clientConfig.config.port,
      ws: true,
      static: path.resolve(__dirname + '/../assets')
   });

   yield new Promise(r => global.app.on('start', r));

   log('Loading templates...');

   // Load jade templates
   require('./templates');

   log('Loading routes...');

   // Set up routes
   /**
   * Index of {@link PageRoute} objects.
   * @namespace pageHandlers
   */
   loaddirSync('./pageHandlers', 'pageHandlers');
   require('./routes');

   log.green('Done. Worker initialized.');

}));
