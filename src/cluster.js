'use strict';

// Worker process title
process.title = 'zen-arena-cs';

// Load dependencies
require('./dependencies');

log('Starting worker...');

process.on('message', message => co(function*(){

   log('Configuration message received. Initializing...');

   global.config = message.config;
   global.DEBUG_MODE = message.DEBUG_MODE;

   global.cache = redis.createClient(
   message.clientConfig.config.cacheClients,
   { debugMode: false });

   cache.on('connect', () => log.green('Redis client connected.'));
   cache.on('error', err => log.error(`Redis client error: ${err}`));

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

   log('Loading msStatLogger...');
   require('./msStatLogger');

   log.green('Done. Worker initialized.');

}).catch(log.error));
