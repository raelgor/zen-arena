'use strict';

module.exports = class Instance extends EventEmitter2 {

   constructor(message) {

      super();

      var object = this;

      co(function*(){

         global.config = message.config;
         global.DEBUG_MODE = message.DEBUG_MODE;
         global.TEST_MODE = message.TEST_MODE;

         global.cache = redis.createClient(
            message.clientConfig.config.cacheClients,
            { debugMode: false });

         cache.on('connect', () => log.green('Redis client connected.'));
         cache.on('error', err => log.error(`Redis client error: ${err}`));

         log('Connecting to mongos...');

         yield dataTransporter.connectMongos(make_mongo_url(config.systemDatabase));

         global.mongos = yield new Promise(r =>
            mongodb.connect(make_mongo_url(config.systemDatabase),
               (err, db) => r(db)));

         log('Getting configuration...');

         yield require('../cache');

         log('Loading postman...');

         postman.init();

         log('Loading api routes...');

         loaddirSync('./api', 'api');

         log('Starting server...');

         // Start server
         global.app = new Server({
            bind: message.clientConfig.config.bind_ip,
            port: message.clientConfig.config.port,
            ws: true,
            static: path.resolve(__dirname + '/../../../assets')
         });

         yield new Promise(r => app.on('listening', r));

         log('Loading templates...');

         // Load jade templates
         require('../templates');

         log('Loading routes...');

         loaddirSync('./pageHandlers', 'pageHandlers');
         require('../routes');

         log('Loading msStatLogger...');
         require('../msStatLogger');

         require('../g_test')();

         log('Loading data namespace...');
         loaddirSync('./dataExchanges', 'data');

         object.emit('ready');

      }).catch(error => this.emit('error', error));

   }

};
